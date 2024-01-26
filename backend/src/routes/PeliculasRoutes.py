from flask import Blueprint, request, jsonify

# Errors
from src.utils.errors.CustomException import CustomException
# Security
from src.utils.Security import Security
# Services
from src.services.PeliculasService import PeliculasService

main = Blueprint('movies_blueprint', __name__)


@main.route('/', methods=['GET'])
def get_movies():
    has_access = Security.verify_token(request.headers)
    #print(has_access)
    if has_access:
        try:
            movies = PeliculasService.get_movies()
            if (len(movies) > 0):
                return jsonify(movies)
            else:
                return jsonify({'message': "NOTFOUND", 'success': True})
        except CustomException:
            return jsonify({'message': "ERROR", 'success': False})
    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401