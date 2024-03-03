# Errors
from src.utils.errors.CustomException import CustomException
#Models
from src.services.models.Lista import Lista
from src.services.models.Lista import peliculaLista
# Database
from src.database.db import get_connection
from google.cloud.firestore_v1.base_query import FieldFilter
#Request
import requests
import json



api_key = 'eec91e51c2cbe9fd8e941f3bbc0fd811'

class ListasService():
   
    @classmethod
    def crear_lista(cls, Lista):
        try:
            db=get_connection()
            #verificamops si el usuario ya tiene una lista con ese nombre
            existing_list_ref = db.collection('listas').where(filter=FieldFilter("idusuario", "==", Lista.idusuario)).where(filter=FieldFilter("nombre","==", Lista.nombre))
            existing_list = existing_list_ref.get()
            if existing_list:
            # Devolver un mensaje indicando que la lista ya existe
                return {'success': False, 'message': 'El usuario ya tiene una lista con ese nombre'}  
            # Crear un nuevo documento de lista en la base de datos
            lista_nueva = {
                "idusuario": Lista.idusuario,
                "nombre": Lista.nombre,
                "descripcion": Lista.descripcion
            }
            db.collection('listas').add(lista_nueva)
            return {'success': True, 'message': 'Lista nueva creada correctamente'}
        except Exception as ex:
            raise CustomException(ex)
    @classmethod
    def añadir_pelicula(cls, peliculaLista):
        try:
            db = get_connection()
            id_usuario = peliculaLista.idusuario
            nombre_lista = peliculaLista.nombrelista
            id_pelicula = peliculaLista.idpelicula
            nombre_pelicula = peliculaLista.nombrepelicula
            # Verificar si el usuario tiene una lista con el nombre proporcionado
            existing_list_ref = db.collection('listas').where(filter=FieldFilter('idusuario', '==', id_usuario)).where(filter=FieldFilter('nombre', '==', nombre_lista))
            existing_list = existing_list_ref.get()

            if not existing_list:
                # Devolver un mensaje indicando que la lista no existe
                return {'success': False, 'message': f'El usuario no tiene una lista con el nombre {nombre_lista}'}

            # Obtener el ID del documento de la lista
            lista_id = existing_list[0].id
            # Verificar si la película ya existe en la colección de películas de la lista
            existing_movie_ref = db.collection('listas').document(lista_id).collection('peliculas').where(filter=FieldFilter('idpelicula', '==', id_pelicula)).where(filter=FieldFilter('nombre', '==', peliculaLista.nombrepelicula))
            #print(lista_id)
            existing_movie = existing_movie_ref.get()
            # print(existing_movie)
            # print(existing_movie_ref)
            if existing_movie:
                # Devolver un mensaje indicando que la película ya existe en la lista
                return {'success': False, 'message': f'La película ya existe en la lista'}

            # Si la película no existe, agregarla a la colección de películas de la lista
            db.collection('listas').document(lista_id).collection('peliculas').add({
                "idpelicula": id_pelicula,
                "nombre": nombre_pelicula,
                # Añade otros campos de la película aquí
            })

            return {'success': True, 'message': 'Película añadida correctamente a la lista'}

        except Exception as ex:
            #print(ex)
            raise CustomException(ex)
        
    @classmethod
    def obtener_listas(cls, idusuario):
        try:
            db = get_connection()

            # Realizar una consulta para obtener todas las listas del usuario
            listas_ref = db.collection('listas').where(filter=FieldFilter('idusuario', '==', idusuario))
            listas = listas_ref.get()

            # Verificar si se encontraron listas para el usuario
            if not listas:
                # Devolver un mensaje indicando que el usuario no tiene listas
                return {'success': False, 'message': f'El usuario con ID {idusuario} no tiene listas'}

            # Recopilar los datos de las listas encontradas
            listas_usuario = []
            for lista in listas:
                lista_data = lista.to_dict()
                lista_data['id'] = lista.id

                # Obtener la información de la colección asociada a la lista
                peliculas_ref = lista.reference.collection('peliculas')
                peliculas = peliculas_ref.get()

                # Recopilar los datos de las películas de la colección asociada
                peliculas_lista = []
                for pelicula in peliculas:
                    pelicula_data = pelicula.to_dict()
                    pelicula_data['id'] = pelicula.id
                    peliculas_lista.append(pelicula_data)

                lista_data['peliculas'] = peliculas_lista

                listas_usuario.append(lista_data)

            return {'success': True, 'listas': listas_usuario}

        except Exception as ex:
            raise CustomException(ex)

    @classmethod
    def obtener_peliculas_lista(cls, idusuario, nombre_lista):
        try:
            db = get_connection()

            # Obtener la referencia de la lista específica
            lista_ref = db.collection('listas').where(filter=FieldFilter('idusuario', '==', idusuario)).where(filter=FieldFilter('nombre', '==', nombre_lista))
            lista_docs = lista_ref.get()

            if not lista_docs:
                return {'success': False, 'message': f'No se encontró la lista "{nombre_lista}" para el usuario con ID {idusuario}'}

            # Solo debería haber un documento de lista con ese nombre para ese usuario
            lista_doc = lista_docs[0]

            # Obtener las películas asociadas a la lista
            peliculas_ref = lista_doc.reference.collection('peliculas')
            peliculas_docs = peliculas_ref.get()

            # Recopilar los datos de las películas
            peliculas_lista = []
            for pelicula_doc in peliculas_docs:
                pelicula_data = pelicula_doc.to_dict()
                pelicula_data['id'] = pelicula_doc.id
                peliculas_lista.append(pelicula_data)

            return {'success': True, 'peliculas': peliculas_lista}

        except Exception as ex:
            raise CustomException(ex)
    @classmethod
    def editar_lista(cls, idusuario, titulo_original, nuevo_titulo=None, nueva_descripcion=None):
        try:
            db = get_connection()

            # Obtener la referencia de la lista específica
            lista_ref = db.collection('listas').where('idusuario', '==', idusuario).where('nombre', '==', titulo_original)
            lista_docs = lista_ref.get()

            if not lista_docs:
                return {'success': False, 'message': f'No se encontró la lista "{titulo_original}" para el usuario con ID {idusuario}'}

            # Solo debería haber un documento de lista con ese título original para ese usuario
            lista_doc = lista_docs[0].reference

            # Actualizar la información de la lista si se proporciona
            if nuevo_titulo:
                lista_doc.update({'nombre': nuevo_titulo})
            if nueva_descripcion:
                lista_doc.update({'descripcion': nueva_descripcion})

            return {'success': True, 'message': 'Lista actualizada correctamente'}

        except Exception as ex:
            raise CustomException(ex)
    @classmethod
    def eliminar_pelicula(cls, idusuario, nombre_lista, id_pelicula):
        try:
            db = get_connection()

            # Verificar si la lista existe
            lista_ref = db.collection('listas').where('idusuario', '==', idusuario).where('nombre', '==', nombre_lista)
            lista_docs = lista_ref.get()
            if not lista_docs:
                return {'success': False, 'message': f'No se encontró la lista "{nombre_lista}" para el usuario con ID {idusuario}'}

            # Obtener la referencia de la película en la lista y eliminarla
            lista_doc = lista_docs[0].reference
            lista_data = lista_doc.get().to_dict()
            peliculas = lista_data.get('peliculas', [])
            for pelicula in peliculas:
                if pelicula.get('id') == id_pelicula:
                    peliculas.remove(pelicula)
                    lista_doc.update({'peliculas': peliculas})
                    return {'success': True, 'message': 'Película eliminada de la lista correctamente'}

            return {'success': False, 'message': f'No se encontró la película con ID {id_pelicula} en la lista'}

        except Exception as ex:
            raise CustomException(ex)
    @classmethod
    def eliminar_lista_por_nombre(cls, id_usuario, nombre_lista):
        try:
            db = get_connection()

            # Buscar la lista por el nombre y el ID de usuario
            lista_ref = db.collection('listas').where('idusuario', '==', id_usuario).where('nombre', '==', nombre_lista)
            lista_docs = lista_ref.get()

            if not lista_docs:
                return {'success': False, 'message': f'No se encontró la lista "{nombre_lista}" del usuario con ID {id_usuario}'}

            # Eliminar todas las listas encontradas (en caso de que haya duplicados)
            for lista_doc in lista_docs:
                lista_doc.reference.delete()

            return {'success': True, 'message': f'Lista "{nombre_lista}" eliminada correctamente'}

        except Exception as ex:
            raise CustomException(ex)
