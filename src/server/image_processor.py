import os
from PIL import Image
import pytesseract
import spacy
from mongo_interface import MongoInterface
from neo4j_interface import Neo4jInterface

from time import time
IMAGES_FOLDER_FILEPATH = "./data/images"
nlp = spacy.load('en_core_web_sm')
num_files_processed = 0
START_TIME = time()

# Data class for images and their metadata


class ImageData:
    def __init__(self, filename, text, entities):
        self.filename = filename
        self.text = text
        self.entities = entities

    def get_filename(self):
        return self.filename

    def get_text(self):
        return self.text

    def get_entities(self):
        return self.entities

# Process an image and extract entities


def process_image(image, filename):
    print("Processing", filename + "...")
    print("Processing OCR...")
    # Pytesseract OCR to extract text from the image
    image_text = pytesseract.image_to_string(image)
    print("Processing NER...")
    # SpaCy NER to extract entities from the image's text
    processed_document = nlp(image_text)
    # Only choose entities that are organizations or people
    people_and_organizations = [
        str(ent) for ent in processed_document.ents if ent.label_ in [
            'ORG', 'PERSON']]
    data = ImageData(filename, image_text, people_and_organizations)
    return data

# Crawl through a directory recursively, process it, and store that data


def parse_directory(folder_filepath, neo4j, mongo):
    global num_files_processed
    files = os.listdir(folder_filepath)
    for file in files[:5]:
        file_filepath = folder_filepath + "/" + file
        if "." in file_filepath[1:]:
            print("Parsing", file_filepath)
            image = Image.open(file_filepath)
            # Process the image
            image_data = process_image(image, file)
            # Store the image in Mongo
            mongo.store_image(image, image_data)
            # Store the NER data in Neo4j
            neo4j.add_document(image_data)
            num_files_processed += 1
            time_elapsed = (time() - START_TIME)
            # Processing diagnostics
            print(
                "Total number of files processed:",
                num_files_processed,
                "file(s)")
            print("Total time elapsed:", time_elapsed, "second(s)")
            print("Average number of files processed per second:",
                  num_files_processed / time_elapsed, "\n")
        else:
            parse_directory(file_filepath, neo4j, mongo)


# Run to process images directory
if __name__ == '__main__':
    neo4j = Neo4jInterface()
    mongo = MongoInterface()
    parse_directory(IMAGES_FOLDER_FILEPATH, neo4j, mongo)
    neo4j.close()
    mongo.close()
