# OCR Document File System

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Back End](#back-end)
  - [`image_processor.py`](#image_processorpy)
  - [`mongo_interface.py`](#mongo_interfacepy)
  - [`neo4j_interface.py`](#neo4j_interfacepy)
  - [`server.py`](#serverpy)
- [Front End](#front-end)
  - [`App.js`](#appjs)
  - [`SearchBar.js`](#searchbarjs)
  - [`Entity.js`](#entityjs)
  - [`Document.js`](#documentjs)
- [Document Processing Sequence](#document-processing-sequence)
- [Setup Instructions](#setup-instructions)
  - [Back-End Setup](#back-end-setup)
  - [Front-End Setup](#front-end-setup)

## Overview
The OCR Document File System is a full-stack application that enables users to view and search scanned documents for specific entities within those documents. It uses Optical Character Recognition (OCR) to extract text from document images and Named-Entity Recognition (NER) to identify relevant entities.

## Features
- **Text extraction**: Utilizes Tesseract OCR to convert images of scanned documents into searchable text.
- **Entity recognition**: Leverages SpaCy NER to extract entities from the extracted text.
- **Search functionality**: Allows users to search for documents or entities via a user-friendly interface.
- **Document and entity relationships**: Stores document-entity relationships in a graph database for efficient retrieval and visualization.

## Technology Stack
- **Front End**: React.js
- **OCR**: Tesseract
- **NER**: SpaCy
- **Back-End API**: Flask
- **Image Storage**: MongoDB
- **Graph Database**: Neo4j

## Back End

### `image_processor.py`
   - Locates scanned document images from the `data/images/` directory.
   - Extracts text from images using OCR (Tesseract).
   - Extracts entities from the text using NER (SpaCy).
   - Stores images, text, and entities in MongoDB.
   - Constructs a graph in Neo4j consisting of documents and related entities.

### `mongo_interface.py`
   - Acts as an interface between the back-end system and MongoDB.
   - Contains methods for storing and retrieving images and associated data.

### `neo4j_interface.py`
   - Serves as an interface between the back-end system and Neo4j.
   - Provides methods for creating nodes and relationships, and for querying entities and their related nodes.

### `server.py`
   - Implements the back-end API using Flask.
   - Provides routes for retrieving specific entities or documents.

## Front End

### `App.js`
   - Handles routing for the React.js web application.

### `SearchBar.js`
   - Allows users to search for specific entities or documents.
   - Redirects to the appropriate entity or document page.

### `Entity.js`
   - Displays details about a specific entity.
   - Lists related documents (via `RelatedDocuments.js`) and other entities that appear in the same documents (via `RelatedEntities.js`).

### `Document.js`
   - Displays the scanned document image and a list of entities mentioned in the document (via `EntitiesMentioned.js`).

## Document Processing Sequence
![Sequence Diagram](/assets/Document%20Processing%20Sequence%20Diagram.PNG)

---

## Setup Instructions

### Back-End Setup

1. **Navigate to the server directory**:
   - From the root of the project, run the following command:
     ```bash
     cd src/server
     ```

2. **Insert scanned documents**:
   - Place the scanned document images into the `data/images` directory.

3. **Create a `.env` file**:
   - Navigate back to the server directory:
     ```bash
     cd ../..
     ```
   - Create a `.env` file and define the following variables:
     - `NEO4J_URI`: The URI of your Neo4j database (e.g., `bolt://localhost:7687`).
     - `NEO4J_USER`: Your Neo4j username (e.g., `neo4j`).
     - `NEO4J_PASS`: Your Neo4j password (set during the Neo4j installation process).

4. **Set up the Neo4j and MongoDB databases**:
   - Follow the instructions below to install and run the databases:
     - [Neo4j Installation Guide](https://neo4j.com/docs/getting-started/get-started-with-neo4j/)
     - [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/#std-label-tutorial-installation)

5. **Set up Tesseract**:
   - Follow the instructions below to install Tesseract:
     - [Tesseract Installation Guide](https://tesseract-ocr.github.io/tessdoc/Installation.html)

6. **Install python dependencies**:
     ```bash
     pip install -r requirements.txt
     ```

7. **Configure mongo_interface.py**:
   - By default, the `mongo_interface.py` file is configured to use `testdb.images`. You can either use this database or update line 8 of `mongo_interface.py` to match your preferred database and collection.

8. **Populate the database**:
   - Run the following command to populate the database with the scanned documents:
     ```bash
     python image_processor.py
     ```

9. **Start the server**:
   - Run the server to expose the API:
     ```bash
     python server.py
     ```

### Front-End Setup

1. **Navigate to the client directory**:
   - From the root of the project, navigate to the client folder:
     ```bash
     cd src/client
     ```

2. **Install dependencies**:
   - Run the following command to install all required dependencies:
     ```bash
     npm install
     ```

3. **Start the front-end application**:
   - Run the following command to start the React.js application:
     ```bash
     npm start
     ```
