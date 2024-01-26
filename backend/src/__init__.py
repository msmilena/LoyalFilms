from flask import Flask
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
# Routes
from .routes import AuthRoutes
from .routes import PeliculasRoutes
from .routes import ResenasRoutes
from .routes import StaticRoutes


app = Flask(__name__)


cred = credentials.Certificate(r"C:\Users\fabri\OneDrive\Escritorio\projects\LoyalFilms\backend\src\token\loyalfilsm-firebase-adminsdk-c3vxb-294f23391f.json")
firebase_admin.initialize_app(cred)




print("ARCHIVO INIT")
def init_app(config):
    # Configuration
    app.config.from_object(config)
    app.config['WTF_CSRF_ENABLED'] = False
    # Blueprints
    app.register_blueprint(AuthRoutes.main, url_prefix='/auth')
    app.register_blueprint(PeliculasRoutes.main, url_prefix='/movies')
    app.register_blueprint(ResenasRoutes.main, url_prefix='/resenas')
    app.register_blueprint(StaticRoutes.main, url_prefix='/')

    return app