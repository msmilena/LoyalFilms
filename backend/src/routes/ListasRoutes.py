from flask import Blueprint, request, jsonify

# Errors
from src.utils.errors.CustomException import CustomException
# Security
from src.utils.Security import Security
# Services
from src.services.ListasService import ListasService 
#Models
from src.services.models.Lista import Lista
from src.services.models.Lista import peliculaLista

main = Blueprint('listas_blueprint', __name__)

@main.route('/crear', methods=['POST'])
def crear_lista():
    has_access = Security.verify_token(request.headers)
    if has_access:
    # para crear una lista necesita idusuario, nombre lista, descripcion lista
        try:
            data = request.json  # Accede a los datos JSON en lugar de los datos del formulario
            nombre_lista = data.get('nombreLista')
            descripcion_lista = data.get('descripcionLista')
            id_usuario = data.get('idusuario')
            if not nombre_lista:
                return jsonify({'message': "Falta el nombre de la lista", 'success': False}), 400
            if not descripcion_lista:
                return jsonify({'message': "Falta la descripción de la lista", 'success': False}), 400
            if not id_usuario:
                return jsonify({'message': "Falta el ID del usuario", 'success': False}), 400
            _lista = Lista( id_usuario, nombre_lista, descripcion_lista)
            lista_creada=ListasService.crear_lista(_lista)
            if lista_creada['success']:
                return jsonify({'success': True, 'message': lista_creada['message']})
            else:
                return jsonify({'success': False, 'message': lista_creada['message']}), 400
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    else:
       response = jsonify({'message': 'Unauthorized'})
       return response, 401
    

@main.route('/anadirPelicula', methods=['POST'])
def anadir_Pelicula():
    has_access = Security.verify_token(request.headers)
    if has_access:
    # para crear una lista necesita idusuario, nombre lista, descripcion lista
        try:
            data = request.json  # Accede a los datos JSON en lugar de los datos del formulario
            nombre_lista = data.get('nombreLista')
            id_usuario = data.get('idusuario')
            id_pelicula = data.get('idpelicula')
            nombre_pelicula = data.get('nombrePelicula')

            if not nombre_lista:
                return jsonify({'message': "Falta el nombre de la lista", 'success': False}), 400
            if not id_pelicula:
                return jsonify({'message': "Falta el ID de la película", 'success': False}), 400
            if not id_usuario:
                return jsonify({'message': "Falta el ID del usuario", 'success': False}), 400
            if not nombre_pelicula:
                return jsonify({'message': "Falta el nombre de la película", 'success': False}), 400
            
            _peliculaLista = peliculaLista( id_usuario, nombre_lista, id_pelicula, nombre_pelicula)
            pelicula_agregada=ListasService.anadir_pelicula(_peliculaLista)
            if pelicula_agregada['success']:
                return jsonify({'success': True, 'message': pelicula_agregada['message']})
            else:
                return jsonify({'success': False, 'message': pelicula_agregada['message']}), 400
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    else:
       response = jsonify({'message': 'Unauthorized'})
       return response, 401
    
@main.route('/obtenerListas', methods=['GET'])
def obtener_listas():
    has_access = Security.verify_token(request.headers)
    print("inicia")
    if has_access:
        print("en la ruta")
        #data = request.json  # Accede a los datos JSON en lugar de los datos del formulario
        
        #id_usuario = data.get('idusuario')
        id_usuario=request.args.get('idusuario')
        print("en la ruta", id_usuario)
        if not id_usuario:
                print("falta id")
                return jsonify({'message': "Falta el ID del usuario", 'success': False}), 400
                
        result = ListasService.obtener_listas(id_usuario)
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 404
    else:
       response = jsonify({'message': 'Unauthorized'})
       return response, 401

@main.route('/obtenerPeliculasLista', methods=['GET'])
def obtener_peliculas_lista():
    has_access = Security.verify_token(request.headers)
    if has_access:
        data = request.json
        print(data)
        id_usuario = data.get('idusuario')
        nombre_lista = data.get('nombreLista')

        if not id_usuario or not nombre_lista:
            return jsonify({'message': "Falta el ID del usuario o el nombre de la lista", 'success': False}), 400

        peliculas_lista = ListasService.obtener_peliculas_lista(id_usuario, nombre_lista)
        return jsonify(peliculas_lista)

    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
    
@main.route('/editarInfoLista', methods=['POST'])
def editar_lista():
    has_access = Security.verify_token(request.headers)
    if has_access:
        data = request.json
        id_usuario = data.get('idusuario')
        titulo_original = data.get('tituloOriginal')
        nuevo_titulo = data.get('nuevoTitulo')
        nueva_descripcion = data.get('nuevaDescripcion')

        if not id_usuario or not titulo_original or (not nuevo_titulo and not nueva_descripcion):
            return jsonify({'message': "Faltan datos necesarios para editar la lista", 'success': False}), 400

        resultado = ListasService.editar_lista(id_usuario, titulo_original, nuevo_titulo, nueva_descripcion)
        return jsonify(resultado)

    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
    
@main.route('/eliminarPelicula', methods=['POST'])
def eliminar_pelicula():
    has_access = Security.verify_token(request.headers)
    if has_access:
        data = request.json
        id_usuario = data.get('idusuario')
        nombre_lista = data.get('nombreLista')
        id_pelicula = data.get('idPelicula')

        if not id_usuario or not nombre_lista or not id_pelicula:
            return jsonify({'message': "Faltan datos necesarios para eliminar la película de la lista", 'success': False}), 400

        resultado = ListasService.eliminar_pelicula(id_usuario, nombre_lista, id_pelicula)
        return jsonify(resultado)

    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
    
@main.route('/eliminarLista', methods=['POST'])
def eliminar_lista():
    has_access = Security.verify_token(request.headers)
    if has_access:
        data = request.json
        id_usuario = data.get('idusuario')
        nombre_lista = data.get('nombreLista')

        if not id_usuario or not nombre_lista:
            return jsonify({'message': "Faltan datos necesarios para eliminar la lista", 'success': False}), 400

        resultado = ListasService.eliminar_lista_por_nombre(id_usuario, nombre_lista)
        return jsonify(resultado)

    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
    
@main.route('/verificarPeliculaEnListas', methods=['POST'])
def verificar_pelicula_en_listas():
    has_access = Security.verify_token(request.headers)
    if has_access:
        data = request.json
        id_usuario = data.get('idusuario')
        id_pelicula = data.get('idpelicula')
        
        if not id_usuario or not id_pelicula:
            return jsonify({'message': "Falta el ID del usuario o el ID de la película", 'success': False}), 400
        
        resultado = ListasService.verificar_pelicula_en_listas(id_usuario, id_pelicula)
        
        return jsonify(resultado), 200
        
    else:
       response = jsonify({'message': 'Unauthorized'})
       return response, 401