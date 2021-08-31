from .config import Config, ProductionConfig, set_up_logging
from flask import Flask
from flask.helpers import get_root_path
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


import os
from os import environ
import logging


db = SQLAlchemy()
migrate = Migrate()


set_up_logging()
logger = logging.getLogger(__name__)


def create_app():
    """ creates the server"""
    server = Flask(__name__)
    if environ.get("ENV") == 'development':
        server.config.from_object(Config)
        logging.log(logging.INFO, server.config['SQLALCHEMY_DATABASE_URI'])
    if environ.get("ENV") == 'production':
        server.config.from_object(ProductionConfig)

    # Meta tags for viewport responsiveness
    register_extensions(server)
    register_blueprints(server)

    return server


def register_extensions(server):

    db.init_app(server)
    migrate.init_app(server, db)


def register_blueprints(server):
    from .routes import server_bp

    server.register_blueprint(server_bp)


if __name__ == '__main__':
    # assuming this file in <proj_root>/app
    ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
    OUTPUTS = os.path.join(ROOT_DIR, 'outputs')
    print(OUTPUTS)