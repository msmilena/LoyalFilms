from flask import Flask, render_template, jsonify, redirect, url_for, request
import requests

from flask_wtf import FlaskForm
from wtforms import StringField, DateField, validators

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
class ResenaForm(FlaskForm):
    contenido = StringField('Contenido', validators=[validators.DataRequired(), validators.Length(min=1, max=1200)])
    fecha = DateField('Fecha', format='%Y-%m-%d', validators=[validators.DataRequired()])
    idpelicula = StringField('ID Película', validators=[validators.DataRequired(), validators.Length(min=1, max=255)])
    idusuario  = StringField('ID Usuario', validators=[validators.Optional(), validators.Length(max=255)])



app = Flask(__name__)
CORS(app)

api_key = 'eec91e51c2cbe9fd8e941f3bbc0fd811'

#RUTA PARA CREAR RESEÑA
@app.route('/resena', methods=['POST'])

# def crear_resena():
#     form = ResenaForm(request.form)
#     if form.validate():
#         # Los datos del formulario son válidos
#         resena = {
#             "contenido": form.contenido.data,
#             "fecha": form.fecha.data,
#             "idpelicula": form.idpelicula.data,
#             "idusuario": "idusuario": form.idusuario.data if form.idusuario.data else "",  # Si es None, establece una cadena vacía
#         }

#         # Aquí puedes realizar otras acciones, como almacenar en Firestore
#         # update_time, resena_ref = db.collection("resena").add(resena)
# Respuesta JSON exitosa
#         response_data = {"codigo": 200, "estado": "Éxito", "mensaje": "Reseña creada correctamente", "resena": resena}
#         return jsonify(response_data), 200
#     else:
#         # Los datos del formulario no son válidos, podrías devolver un código de error y mensajes de validación
#         response_data = {"codigo": 400, "estado": "Error", "mensaje": "Datos de formulario no válidos", "errores": form.errors}
#         return jsonify(response_data), 400


#RUTA PARA OBTENER RESEÑAS
@app.route('/resena/<idmovie>', methods=['GET'])

# def obtener_resenas(id_pelicula):
#     try:
#         # Realiza la consulta a Firestore para obtener las reseñas de la película
#         resenas_ref = db.collection("resena").where("idpelicula", "==", id_pelicula).stream()

#         # Convierte los documentos de Firestore a un formato JSON
#         resenas = [{"id": doc.id, **doc.to_dict()} for doc in resenas_ref]

#         # Retorna la respuesta JSON con las reseñas
#         return jsonify({"codigo": 200, "estado": "Éxito", "resenas": resenas}), 200

#     except Exception as e:
#         # Manejo de errores
#         return jsonify({"codigo": 500, "estado": "Error", "mensaje": str(e)}), 500

#


#RUTA PARA EDITAR RESEÑA
@app.route('/resena/<idresena>', methods=['PUT'])
# def editar_resena(idresena):
#     try:
#         # Obtén la reseña específica de Firestore
#         resena_ref = db.collection("resena").document(idresena)
#         resena = resena_ref.get()

#         if not resena.exists:
#             # La reseña no existe, retorna un error
#             return jsonify({"codigo": 404, "estado": "Error", "mensaje": "Reseña no encontrada"}), 404

#         # Obtiene los datos actuales de la reseña
#         datos_actuales = resena.to_dict()

#         # Actualiza los campos proporcionados en la solicitud
#         contenido_nuevo = request.json.get('contenido', datos_actuales['contenido'])
#         timestamp_nuevo = datetime.utcnow()  # Puedes ajustar cómo obtienes el timestamp según tus necesidades

#         # Realiza la actualización en Firestore
#         resena_ref.update({
#             'contenido': contenido_nuevo,
#             'timestamp': timestamp_nuevo
#         })

#         # Obtiene la reseña actualizada
#         resena_actualizada = resena_ref.get().to_dict()

#         # Retorna la respuesta JSON con la reseña actualizada
#         return jsonify({"codigo": 200, "estado": "Éxito", "mensaje": "Reseña actualizada correctamente", "resena": resena_actualizada}), 200

#     except Exception as e:
#         # Manejo de errores
#         return jsonify({"codigo": 500, "estado": "Error", "mensaje": str(e)}), 500



#RUTA PARA ELIMINAR RESEÑA
@app.route('/resena/<idresena>', methods=['DELETE'])
# def eliminar_resena(idresena):
#     try:
#         # Obtén la reseña específica de Firestore
#         resena_ref = db.collection("resena").document(idresena)
#         resena = resena_ref.get()

#         if not resena.exists:
#             # La reseña no existe, retorna un error
#             return jsonify({"codigo": 404, "estado": "Error", "mensaje": "Reseña no encontrada"}), 404

#         # Elimina la reseña de Firestore
#         resena_ref.delete()

#         # Retorna la respuesta JSON indicando que la reseña fue eliminada correctamente
#         return jsonify({"codigo": 200, "estado": "Éxito", "mensaje": "Reseña eliminada correctamente"}), 200

#     except Exception as e:
#         # Manejo de errores
#         return jsonify({"codigo": 500, "estado": "Error", "mensaje": str(e)}), 500

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


#RUTA PREDETERMINADA
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


@app.route('/prueba')
def prueba():
    
    
    url = "https://api.themoviedb.org/3/movie/343611?api_key=eec91e51c2cbe9fd8e941f3bbc0fd811"
    

    try:
        response = requests.get(url)
        response.raise_for_status()
        movie_data = response.json()
        return jsonify(movie_data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Error fetching movie: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
