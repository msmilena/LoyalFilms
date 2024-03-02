# Errors
from src.utils.errors.CustomException import CustomException
#Request
import requests
import json



api_key = 'eec91e51c2cbe9fd8e941f3bbc0fd811'

class PeliculasService():

    @classmethod
    def get_movies(cls):
        try:
            url = "https://api.themoviedb.org/3/discover/movie"
            
            params = {
                "language": "es",
                # "page": 1,
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

            return movies_info 
        
        except CustomException as ex:
            raise CustomException(ex)
    
    @classmethod
    def buscar_pelicula(cls, palabra):
        try:
            url = "https://api.themoviedb.org/3/search/movie"
            
            params = {
                "language": "es",
                "query": palabra,
                "sort_by": "popularity.desc",
                # "page": 1,
                
                "api_key": api_key  
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

            return movies_info 
        
        except CustomException as ex:
            raise CustomException(ex)
        
    @classmethod
    def get_nuevas_peliculas(cls):
        try:
            url = "https://api.themoviedb.org/3/movie/now_playing"
            
            params = {
                "language": "es",
                # "page": 1,
                
                "api_key": api_key  
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

            return movies_info 
        
        except CustomException as ex:
            raise CustomException(ex)

    @classmethod
    def get_peliculas_genero(cls, genero):
        try:
            url = "https://api.themoviedb.org/3/discover/movie"
            
            params = {
                "language": "es",
                "sort_by": "popularity.desc",
                "with_genres": genero,
                
                "api_key": api_key  
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

            return movies_info 
        
        except CustomException as ex:
            raise CustomException(ex)
        
        
    @classmethod
    def get_informacion(cls, id):
        try:
            url = "https://api.themoviedb.org/3/movie/"+ id 
            
            params = {
                "language": "es",                
                "api_key": api_key,
            }

            urlcredits = "https://api.themoviedb.org/3/movie/"+ id 

            paramsCredits = {
                "api_key": api_key,
                "append_to_response": "credits"
            }

            try:
                response = requests.get(url, params=params)
                response.raise_for_status()  # Raise an exception for HTTP errors
                data = response.json()

                # Check if the response contains the expected information
                if 'title' in data:
                    # Make a request to get the credits
                    try:
                        response_credits = requests.get(urlcredits, params=paramsCredits)
                        response_credits.raise_for_status()  # Raise an exception for HTTP errors
                        data_credits = response_credits.json()

                        # Check if the response contains the credits information
                        if 'credits' in data_credits:
                            # Append the credits to the original data
                            data['credits'] = data_credits['credits']

                        return data
                    except requests.exceptions.RequestException as e:
                        # Handle any request error, such as a failed connection
                        print(f"Error in the request for credits: {e}")
                        return None
                else:
                    print("La respuesta no contiene la información esperada.")
                    return None
            except requests.exceptions.RequestException as e:
                # Handle any request error, such as a failed connection
                print(f"Error in the request: {e}")
                return None

            print(url)
            try:
                response = requests.get(url, params=params)
                response.raise_for_status()  # Raise an exception for HTTP errors
                # Check if the response contains the expected information
                if response.status_code == 200:
                    try:
                        # Intentar cargar la respuesta como JSON
                        data = response.json()
                        print(data)
                        # Comprobar si la respuesta contiene la información esperada
                        if 'title' in data:
                            return data
                        else:
                            print("La respuesta no contiene la información esperada.")
                            return None
                    except json.JSONDecodeError as e:
                        print("La respuesta no es un JSON válido")
                        return None
                else:
                    print(f"Error en la solicitud: {response.status_code}")
                    return None
            except requests.exceptions.RequestException as e:
                # Handle any request error, such as a failed connection
                print(f"Error in the request: {e}")
                return None
        except CustomException as ex:
            raise CustomException(ex)
