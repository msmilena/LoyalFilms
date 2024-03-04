# Errors
from src.utils.errors.CustomException import CustomException
#Request
import requests
import json



api_key = 'eec91e51c2cbe9fd8e941f3bbc0fd811'
movie_attributes = []

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
               # print(data)
                # Check if the response contains the expected information
                if 'title' in data:
                    # Make a request to get the credits
                    try:
                        response_credits = requests.get(urlcredits, params=paramsCredits)
                        response_credits.raise_for_status()  # Raise an exception for HTTP errors
                        data_credits = response_credits.json()
                        #print(data_credits)
                        # Check if the response contains the credits information
                        if 'credits' in data_credits:
                            # Append the credits to the original data
                            data['credits'] = data_credits['credits']
                            director = next((person for person in data['credits']['crew'] if person['job'] == 'Director'), None)  
                            # saca los tres primeros actores
                            cast = data['credits']['cast'][:3]
                            puntaje = data['vote_average']/2
                            porcentaje = round(((puntaje / 5) * 100), 2)
                            year_release = data['release_date'][:4]
                            movie_attributes = {
                                'title': data['title'],          
                                'overview': data['overview'],
                                'release_date': data['release_date'],
                                'vote_average': data['vote_average'],
                                'porcentaje' : porcentaje,
                                'puntaje' : puntaje,
                                'poster_path': data['poster_path'],
                                'director': director['name'] if director else None,
                                'cast': [actor['name'] for actor in cast],
                                'actor1': cast[0]['name'],
                                'actor2': cast[1]['name'],
                                'actor3': cast[2]['name'],
                                'year_release': year_release,

                            }

                            #print(movie_attributes)
                        return movie_attributes
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

        except CustomException as ex:
            raise CustomException(ex)
