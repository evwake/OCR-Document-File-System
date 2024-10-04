from neo4j import GraphDatabase

import os
from dotenv import load_dotenv, dotenv_values


class Neo4jInterface:

    def __init__(self):
        load_dotenv()
        self.driver = GraphDatabase.driver(
            os.getenv('NEO4J_URI'), auth=(
                os.getenv('NEO4J_USER'), os.getenv('NEO4J_PASS')))

    def close(self):
        self.driver.close()

    # Add a document to the graph database
    def add_document(self, document_info):
        with self.driver.session() as session:
            result = session.execute_write(
                self.add_new_document, document_info)
            print(result)

    # Search for a document in the graph database
    def search_entity(self, entity):
        with self.driver.session() as session:
            result = session.execute_write(
                self.search_entities_by_document, entity)
            return result

    # Static method to create entities and relationships in the graph database
    # when adding a document
    @staticmethod
    def add_new_document(tx, document_info):
        result = tx.run(
            'MERGE (d:Document {docId: $docId, text: $text})',
            docId=document_info.get_filename(),
            text=document_info.get_text())
        for entity in document_info.get_entities():
            tx.run(
                'MATCH (d:Document {docId: $docId}) MERGE (e:Entity {name: $entity}) MERGE (e)-[:MENTIONED_IN]->(d)',
                docId=document_info.get_filename(),
                entity=entity)
        return result

    # Static method to search entities and relationships in the graph database
    @staticmethod
    def search_entities_by_document(tx, entity):
        asssociated_docs_and_entities = tx.run(
            'OPTIONAL MATCH (e:Entity {name: $entity})-[:MENTIONED_IN]->(d:Document) OPTIONAL MATCH (e)-[:MENTIONED_IN]->(d)<-[:MENTIONED_IN]-(n:Entity) RETURN d.docId AS `docId`, COLLECT(n.name) AS `other_entities`',
            entity=entity)
        search_results = [{'docId': record.get('docId'), 'other_entities': record.get(
            'other_entities')} for record in asssociated_docs_and_entities]
        return search_results
