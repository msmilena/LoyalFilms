# Database
from src.database.db import get_connection
# Errors
from src.utils.errors.CustomException import CustomException
# Models
from .models.User import User
from google.cloud.firestore_v1.base_query import FieldFilter, Or


class AuthService():

    @classmethod
    def login_user(cls, user ):
        try:
            db=get_connection()
            user_ref = db.collection('usuario').where(filter=FieldFilter("username", "==", user.username))
            print(user)
            user_data = user_ref.get()
            for doc in user_data:
            # Iterar sobre la lista de documentos
                doc_data = doc.to_dict()
                print(f"Datos del usuario: {doc_data}")
                # Verificar si 'isadmin' está presente en doc_data
                if 'isadmin' in doc_data:
                    is_admin_value = doc_data['isadmin']
                else:
                    is_admin_value = "False"
                if doc_data and doc_data['password'] == user.password:
                    return User( doc_data['username'], doc_data['password'], is_admin_value)
                return None
        except Exception as ex:
            raise CustomException(ex)
        
    @classmethod
    def register_user(cls, user ):
        try:
            db=get_connection()

           # Buscar usuarios existentes con el mismo nombre de usuario
            existing_user_ref = db.collection('usuario').where(filter=FieldFilter("username", "==", user.username))
            existing_user = existing_user_ref.get()

        # Verificar si existen usuarios con el mismo nombre de usuario
            if existing_user:
            # Devolver un mensaje indicando que el usuario ya existe
                return {'success': False, 'message': 'El usuario ya existe'}

        # Buscar usuarios existentes con el mismo correo electrónico
            existing_email_ref = db.collection('usuario').where(filter=FieldFilter("email", "==", user.email))
            existing_email = existing_email_ref.get()

        # Verificar si existen usuarios con el mismo correo electrónico
            if existing_email:
            # Devolver un mensaje indicando que el correo electrónico ya está en uso
                return {'success': False, 'message': 'El correo electrónico ya está en uso'}

            # Crear un nuevo documento de usuario en la base de datos
            usuario_nuevo = {
                "username": user.username,
                "email": user.email,
                "password": user.password
            }
            db.collection('usuario').add(usuario_nuevo)

            return {'success': True, 'message': 'Usuario registrado exitosamente'}
        except Exception as ex:
            raise CustomException(ex)