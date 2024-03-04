from flask import Blueprint, request, jsonify

# Errors
from src.utils.errors.CustomException import CustomException
# Security
from src.utils.Security import Security
# Services
from src.services.UserService import UserService

from src.services.models.PerfilDatos import PerfilDatos

import re

main = Blueprint('user_blueprint', __name__)
# Expresiones regulares para validar el formato del correo electrónico y la contraseña
EMAIL_REGEX = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
PASSWORD_REGEX = r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'



@main.route('/info', methods=['GET'])
def get_infoUsuario():
    idUser = request.args.get('idUser')  # Obtén el idUser de los parámetros de la URL
    try:
        print(idUser)
        if idUser:
            infoUser = UserService.get_infoUsuario(idUser)
            print(infoUser)
            if infoUser is not None:
                return jsonify({'success': True,"userData": infoUser})
            else:
                response = jsonify({'message': 'Unauthorized'})
                return response, 401
        else:
            return jsonify({'message': 'Missing idUser parameter'}), 400
    except CustomException:
        return jsonify({'message': "ERROR", 'success': False})


@main.route('/guardarDatos', methods=['POST'])
def post_guardarDatos():
    data=request.json
    print(data)
    idUser=data.get("idUser")
    username = data.get("username")
    name = data.get("name")
    lastname = data.get('lastname')
    email = data.get("email")
    biografia = data.get('biografia')
    changeUsername = data.get("changeUsername")
    changeEmail = data.get('changeEmail')

    # Validación del formato del correo electrónico
    if not re.match(EMAIL_REGEX, email):
        return jsonify({'success': False, 'message': 'Ingrese un Correo Electronico valido'}), 400

    # Validación del formato de la contraseña
    #if not re.match(PASSWORD_REGEX, password):
     #   return jsonify({'success': False, 'message': 'La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra y un número'}), 400

    _userR = PerfilDatos(idUser,username,name,lastname, email,biografia,changeUsername,changeEmail)
    save_result = UserService.save_user(_userR)

    if save_result['success']:
       return jsonify({'success': True, 'message': 'Guardado de datos existoso'})
    else:
       return jsonify({'success': False, 'message': save_result['message']}), 400


       

@main.route('/editarContrasena', methods=['POST'])
def post_editarContrasena():
    data=request.json
    print(data)
    idUser=data.get("idUser")
    newpassword = data.get("newpassword")

    
    # Validación del formato de la contraseña
    if not re.match(PASSWORD_REGEX, newpassword):
       return jsonify({'success': False, 'message': 'La contrasena debe contener al menos 8 caracteres, incluyendo al menos una letra y un numero'}), 400

    
    save_result = UserService.edit_password(idUser, newpassword)

    if save_result['success']:
       return jsonify({'success': True, 'message': 'Cambio de contrasena exitoso'})
    else:
       return jsonify({'success': False, 'message': save_result['message']}), 400

@main.route('/eliminarPerfil', methods=['POST'])
def post_eliminarPerfil():
    data=request.json
    print(data)
    idUser=data.get("idUser")

    save_result = UserService.eliminarPerfil(idUser)

    if save_result['success']:
       return jsonify({'success': True, 'message': 'Eliminado exitoso'})
    else:
       return jsonify({'success': False, 'message': save_result['message']}), 400

