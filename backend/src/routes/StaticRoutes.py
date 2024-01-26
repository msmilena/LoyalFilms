from flask import Blueprint, request, jsonify, render_template

# Models
from src.services.models.User import User
# Security
from src.utils.Security import Security
# Services

main = Blueprint('static_blueprint', __name__)

@main.route('/')
def login_static():
        return render_template(r"index.html")

@main.route('/catalogo_peliculas')
def peliculas_static():
        return render_template(r"peliculas.html")
@main.route('/resenas_pelicula')
def resenas_static():
        return render_template(r"resenas.html")