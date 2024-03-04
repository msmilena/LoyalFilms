
# Database
from src.database.db import get_connection
# Errors
from src.utils.errors.CustomException import CustomException
# Models
from .models.User import User
from google.cloud.firestore_v1.base_query import FieldFilter


#Request
import requests
import json


class UserService():

    @classmethod
    def get_infoUsuario(cls, idUser):
        try:
            db = get_connection()
            user_ref = db.collection('usuario').document(idUser)
            user_data = user_ref.get()
            if user_data.exists:
                doc_data = user_data.to_dict()
                print(doc_data)
                return doc_data
            return None
        except Exception as ex:
            raise CustomException(ex)

    @classmethod
    def save_user(cls, user ):
        try:
            db=get_connection()
            
            if(user.changeUsername):
           # Buscar usuarios existentes con el mismo nombre de usuario
                existing_user_ref = db.collection('usuario').where(filter=FieldFilter("username", "==", user.username))
                existing_user = existing_user_ref.get()

            # Verificar si existen usuarios con el mismo nombre de usuario
                if existing_user:
                # Devolver un mensaje indicando que el usuario ya existe
                    return {'success': False, 'message': 'El usuario ya existe'}

            if(user.changeEmail):
            # Buscar usuarios existentes con el mismo correo electrónico
                existing_email_ref = db.collection('usuario').where(filter=FieldFilter("email", "==", user.email))
                existing_email = existing_email_ref.get()

            # Verificar si existen usuarios con el mismo correo electrónico
                if existing_email:
                # Devolver un mensaje indicando que el correo electrónico ya está en uso
                    return {'success': False, 'message': 'El correo electronico ya esta en uso'}

            
            db.collection('usuario').document(user.idUser).update({
                "username": user.username,
                "email": user.email,
                "name": user.name,
                "lastname": user.lastname,
                "biografia": user.biografia,
            })

            return {'success': True, 'message': 'Cambios guardados exitosamente'}
        except Exception as ex:
            raise CustomException(ex)

    @classmethod
    def edit_password(cls, idUser,newpassword):
        try:
            db = get_connection()
            db.collection('usuario').document(idUser).update({
                "password": newpassword
            })

            return {'success': True, 'message': 'Cambio de contrasena exitoso'}
        except Exception as ex:
            raise CustomException(ex)
          
    @classmethod
    def eliminarPerfil(cls, idUser):
        try:
            db = get_connection()
            db.collection('usuario').document(idUser).delete()

            return {'success': True, 'message': 'Eliminacion de perfil exitosa'}
        except Exception as ex:
            raise CustomException(ex)
          
 