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
            user_data = user_ref.get()
            for doc in user_data:
            # Iterar sobre la lista de documentos
                doc_data = doc.to_dict()
                print(f"Datos del usuario: {doc_data}")
                if doc_data and doc_data['password'] == user.password:
                    return User( doc_data['username'], doc_data['password'], doc_data['isadmin'])
                return None
        except Exception as ex:
            raise CustomException(ex)