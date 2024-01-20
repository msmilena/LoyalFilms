from flask import Flask, render_template, jsonify
import requests

from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#from google.cloud.firestore_admin_v1.base_query import FieldFilter, Or
# cred = credentials.Certificate("token/loyalfilsm-firebase-adminsdk-c3vxb-294f23391f.json")
# firebase_admin.initialize_app(cred)
# db = firestore.client()
# usuario = {"username": "Tokyo", "password": "50bb11b76", "isadmin": False}
# update_time, usuario_ref = db.collection("usuario").add(usuario)
# print(f"Added document with id {usuario_ref.id}")
     

app = Flask(__name__)
CORS(app)

api_key = 'eec91e51c2cbe9fd8e941f3bbc0fd811'
#RUTA PARA CREAR RESEÑA
@app.route('/resena', methods=['POST'])

#RUTA PARA OBTENER RESEÑAS
@app.route('/resena/<idmovie>', methods=['GET'])

#RUTA PARA EDITAR RESEÑA
@app.route('/resena', methods=['UPDATE'])


#RUTA PARA OBTENER LA LISTA DE PELICULAS
@app.route('/movies', methods=['GET'])
def read_movies():
    url = "https://api.themoviedb.org/3/discover/movie"
    
    params = {
        "language": "es",
        "page": 1,
        "sort_by": "popularity.desc",
        "api_key": api_key  # Include your API key as a query parameter
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        
        # Check if the response contains the expected information
        if 'results' in data:
            movies_info = data['results']
        else:
            # If the response does not contain the expected information, set movies_info as an empty list
            movies_info = []
    except requests.exceptions.RequestException as e:
        # Handle any request error, such as a failed connection
        print(f"Error in the request: {e}")
        movies_info = []

    return jsonify(movies_info) 

@app.route('/')
def index():
    api_key = 'eec91e51c2cbe9fd8e941f3bbc0fd811'  # Replace with your TMDb API key
    
    url = "https://api.themoviedb.org/3/discover/movie"
    
    params = {
        "language": "en-US",
        "page": 1,
        "sort_by": "popularity.desc",
        "api_key": api_key  # Include your API key as a query parameter
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        
        # Check if the response contains the expected information
        if 'results' in data:
            movies_info = data['results']
        else:
            # If the response does not contain the expected information, set movies_info as an empty list
            movies_info = []
    except requests.exceptions.RequestException as e:
        # Handle any request error, such as a failed connection
        print(f"Error in the request: {e}")
        movies_info = []

    return jsonify(movies_info)

if __name__ == '__main__':
    app.run(debug=True)
