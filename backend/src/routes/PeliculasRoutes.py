from flask import Blueprint, request, jsonify

# Errors
from src.utils.errors.CustomException import CustomException
# Security
from src.utils.Security import Security
# Services
from src.services.PeliculasService import PeliculasService

main = Blueprint('movies_blueprint', __name__)


@main.route('/tendencias', methods=['GET'])
def get_movies():
   # has_access = Security.verify_token(request.headers)
    #print(has_access)
   # if has_access:
        try:
            movies = PeliculasService.get_movies()
            if (len(movies) > 0):
                return jsonify(movies)
            else:
                return jsonify({'message': "NOTFOUND", 'success': True})
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    #else:
       # response = jsonify({'message': 'Unauthorized'})
       # return response, 401
        
@main.route('/buscar', methods=['GET'])
def buscar_pelicula():
    try:
        # Obtener el término de búsqueda desde los parámetros de la solicitud
        palabra = request.args.get('palabra', '')
        
        # Verificar si se proporciona un término de búsqueda
        if not palabra:
            return jsonify({'message': "Ingrese un término de búsqueda", 'success': False})
        
        # Realizar la búsqueda de películas por título
        movies = PeliculasService.buscar_pelicula(palabra)
        
        if len(movies) > 0:
            return jsonify(movies)
        else:
            return jsonify({'message': "No se encontraron resultados", 'success': True})
    except CustomException:
        return jsonify({'message': "ERROR", 'success': False})
    
@main.route('/nuevas', methods=['GET'])
def get_nuevas_peliculas():
    try:
        movies = PeliculasService.get_nuevas_peliculas()
        if (len(movies) > 0):
            return jsonify(movies)
        else:
            return jsonify({'message': "NOTFOUND", 'success': True})
    except CustomException:
        return jsonify({'message': "ERROR", 'success': False})
    

@main.route('/genero', methods=['GET'])
def get_peliculas_genero():
    try:
        genero = request.args.get('genero', '')
        if not genero:
            return jsonify({'message': "Ingrese un género", 'success': False})
        movies = PeliculasService.get_peliculas_genero(genero)
        if (len(movies) > 0):
            return jsonify(movies)
        else:
            return jsonify({'message': "NOTFOUND", 'success': True})
    except CustomException:
        return jsonify({'message': "ERROR", 'success': False})
    
@main.route('/informacion', methods=['GET'])
def informacion_pelicula():
    try:
        id_pelicula = request.args.get('id', '')
        print(id_pelicula)
        if not id:
            print('No hay un id de película')
            return jsonify({'message': "No hay un id de película", 'success': False})
        movies = PeliculasService.get_informacion(id_pelicula)
        print(movies)
        if movies != None:

            return jsonify(movies)
        else:
            return jsonify({'message': "NOTFOUND", 'success': True})
    except CustomException:
        return jsonify({'message': "ERROR", 'success': False})