import settings
from flask import Flask
from flask import (request, jsonify)
from middleware import send_to_cerebellum
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app) 
app.debug = True


@app.route("/")
def index():
    return ('Flask API is running on port ')


@app.route('/get_response', methods=['POST'])
def get_response():
    
    query = request.form.get('query')
    response_data = send_to_cerebellum(query, ask_universe=True)
    
    return response_data

@app.route("/get_response_rag", methods=['POST'])
def get_response_rag():
    
    query = request.form.get('query')
    response_data = send_to_cerebellum(query, ask_universe=False)
    
    return response_data


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=settings.API_DEBUG)
