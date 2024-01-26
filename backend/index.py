from config import config
from src import init_app
from flask_cors import CORS

configuration = config['development']
app = init_app(configuration)

if __name__ == '__main__':
    CORS(app)
    app.run()