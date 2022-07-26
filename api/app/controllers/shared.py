"""Shared Module for all controllers."""
import configparser
import os
import pathlib

import pymongo

from models.hike import Hike

parent_dir = pathlib.Path(__file__).parent.resolve()
configFilename = os.path.join(parent_dir, "..", "config.ini")

config = configparser.RawConfigParser()
config.read(configFilename)
con_string = config["DATABASE"]["ConnectionString"]
db_name = config["DATABASE"]["Database"]

HIKE_COLLECTIONS = "hikes"
PHOTOS_COLLECTIONS = "photos"


def list_hikes() -> []:
    """Get all hikes in the db."""
    with pymongo.MongoClient(con_string) as client:
        mongo_db = client.get_database(db_name)
        collection = mongo_db.get_collection(HIKE_COLLECTIONS)

        hikes = [Hike(h) for h in collection.find()]

    return hikes
