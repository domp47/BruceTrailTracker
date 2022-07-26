"""Controller for photos api."""
import pymongo
from flask import Response

from controllers.shared import PHOTOS_COLLECTIONS, con_string, db_name
from models.photo import Photo


def list_photos() -> []:
    """Get list of photos."""
    with pymongo.MongoClient(con_string) as client:
        mongo_db = client.get_database(db_name)
        collection = mongo_db.get_collection(PHOTOS_COLLECTIONS)

        photos = list(collection.find())

    return photos


def add_photo(body: dict):
    """Add a new photo."""
    photo = Photo(body)

    errs = photo.is_valid()
    if errs:
        return Response(errs, status=400)

    photo = photo.__dict__
    del photo["_id"]

    with pymongo.MongoClient(con_string) as client:
        mongo_db = client.get_database(db_name)
        collection = mongo_db.get_collection(PHOTOS_COLLECTIONS)

        collection.insert_one(photo)

    return Response(status=201)
