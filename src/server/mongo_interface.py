from pymongo import MongoClient
import io


class MongoInterface:
    def __init__(self):
        self.client = MongoClient()
        self.coll = self.client.testdb.images

    # Convert an image to bytes and store it in mongo with its metadata
    def store_image(self, image, data):
        image_bytes = io.BytesIO()
        image.save(image_bytes, format='JPEG')
        new_image = {
            'data': image_bytes.getvalue(),
            'docID': data.get_filename(),
            'text': data.get_text(),
            'entities': data.get_entities(),
        }
        image_id = self.coll.insert_one(new_image).inserted_id
        return image_id

    # Retrieve an image based on its document ID
    def retrieve_image(self, docID):
        image = self.coll.find_one({'docID': docID})
        return image
    # Close the connection

    def close(self):
        self.client.close()
