# Errors
from src.utils.errors.CustomException import CustomException
#Request
import requests



api_key = 'eec91e51c2cbe9fd8e941f3bbc0fd811'

class PeliculasService():

    @classmethod
    def get_movies(cls):
        try:
            url = "https://api.themoviedb.org/3/discover/movie"
            
            params = {
                "language": "es",
                "page": 1,
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