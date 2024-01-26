from flask import Blueprint, request, jsonify

# Errors
from src.utils.errors.CustomException import CustomException
# Security
from src.utils.Security import Security
# Services
from src.services.ResenasService import ResenasService

from src.services.models.Resenas import Resenas

from src.services.models.Resenas import Resenas_nueva

import datetime

import pytz

main = Blueprint('resenas_blueprint', __name__)


@main.route('/<idpelicula>' , methods=['GET'])
def get_resenas(idpelicula):
    
    has_access = Security.verify_token(request.headers)
    #print(has_access)
    if has_access:
        try:
            resenas = ResenasService.get_resenas(idpelicula)
            if (len(resenas) > 0):
                return jsonify(resenas)
            else:
                return jsonify({'message': "NOTFOUND", 'success': True})
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
    
@main.route('/' , methods=['POST'])
def crear_resenas():
    tz = pytz.timezone("America/Lima")
    has_access = Security.verify_token(request.headers)
    #print(has_access)
    if has_access:
        try:
            #print(request.form)
            contenido=request.form['contenido']
            fecha=datetime.datetime.now(tz=tz)
            idpelicula=request.form['idpelicula']
            idusuario=request.form["idusuario"]
            #print(contenido)
            _resena=Resenas(contenido, fecha, idpelicula, idusuario)
            response=ResenasService.crear_resena(_resena)
            return jsonify(response)
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
    
@main.route('/<idresena>' , methods=['PUT'])
def editar_resenas(idresena):
    tz = pytz.timezone("America/Lima")
    has_access = Security.verify_token(request.headers)
    #print(has_access)
    if has_access:
        try:
            contenido=request.form['contenido']
            fecha=datetime.datetime.now(tz=tz)
            _resena_nueva=Resenas_nueva(contenido, fecha)
            response=ResenasService.editar_resena(idresena, _resena_nueva)
            return jsonify(response)
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
@main.route('/<idresena>' , methods=['DELETE'])
def eliminar_resenas(idresena):
    tz = pytz.timezone("America/Lima")
    has_access = Security.verify_token(request.headers)
    #print(has_access)
    if has_access:
        try:
            response=ResenasService.eliminar_resena(idresena)
            return jsonify(response)
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401