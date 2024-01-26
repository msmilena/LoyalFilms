# Errors
from src.utils.errors.CustomException import CustomException
# Database
from src.database.db import get_connection

from google.cloud.firestore_v1.base_query import FieldFilter, Or

from flask import jsonify


class ResenasService():

    @classmethod
    def get_resenas(cls, idpelicula):
        try:
            db=get_connection()
            resenas_ref = db.collection("resena").where(filter=FieldFilter("idpelicula", "==", idpelicula))
            resenas_data = resenas_ref.stream()
            resenas = [{"id": doc.id, **doc.to_dict()} for doc in resenas_data]
            return resenas       
        except CustomException as ex:
            raise CustomException(ex)
        
    @classmethod
    def crear_resena(cls, resena):
        
        try:
            db=get_connection()
            resena_nueva = {
             "contenido": resena.contenido,
             "fecha": resena.fecha,
             "idpelicula": resena.idpelicula,
             "idusuario": resena.idusuario if resena.idusuario else "",  # Si es None, establece una cadena vacía
            }
            update_time, resena_ref = db.collection("resena").add(resena_nueva)
            response_data = {"codigo": 200, "estado": "Éxito", "mensaje": "Reseña creada correctamente"}
            return response_data
        except CustomException as ex:
            raise CustomException(ex)
    @classmethod
    def editar_resena(cls, idresena, resena_actualizada):
        try:
            db=get_connection()
            resena_ref = db.collection("resena").document(idresena)
            resena = resena_ref.get()
            if resena.exists:
                resena_ref.update({
                'contenido':resena_actualizada.contenido,
                'fecha':resena_actualizada.fecha
            })
                resena_actualizada = resena_ref.get().to_dict()
                response_data={"codigo": 200, "estado": "Éxito", "mensaje": "Reseña actualizada correctamente", "resena": resena_actualizada}
            else:
                # La reseña no existe, retorna un error
                response_data={"codigo": 404, "estado": "Error", "mensaje": "Reseña no encontrada"}
            return response_data
        except CustomException as ex:
            raise CustomException(ex)
    @classmethod
    def eliminar_resena(cls, idresena):
        try:
            db=get_connection()
            resena_ref = db.collection("resena").document(idresena)
            resena = resena_ref.get()
            if resena.exists:
                resena_ref.delete()
                response_data={"codigo": 200, "estado": "Éxito", "mensaje": "Reseña eliminada correctamente"}
            else:
                # La reseña no existe, retorna un error
                response_data={"codigo": 404, "estado": "Error", "mensaje": "Reseña no encontrada"}
            return response_data
        except CustomException as ex:
            raise CustomException(ex)