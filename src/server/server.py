from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from neo4j_interface import Neo4jInterface
from mongo_interface import MongoInterface
from bson import json_util
import json

app = Flask(__name__)
cors = CORS(app)
neo4j = Neo4jInterface()
mongo = MongoInterface()


@app.route('/entity')
# Endpoint to search for a specific entity
def search_entity():
    entity = request.args.get('entity')
    print(entity)
    result = neo4j.search_entity(entity)
    non_null_results = []
    for record in result:
        if record['docId'] is not None:
            record['image'] = mongo.retrieve_image(
                record.get('docId')).get('data')
            non_null_results.append(record)
    return json.loads(json_util.dumps(non_null_results))


@app.route('/document')
# Endpoint to search for a specific document
def document():
    docId = request.args.get('documentId')
    print(docId)
    result = mongo.retrieve_image(docId)
    return json.loads(json_util.dumps(result))


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8000)
