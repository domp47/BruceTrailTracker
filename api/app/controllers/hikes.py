"""Controller for hike api."""
import pymongo
from flask import Response

import controllers.shared
from controllers.geometry import find_closest_coord, get_polyline_from_coord
from controllers.shared import HIKE_COLLECTIONS, con_string, db_name
from models.hike import Hike


def list_hikes() -> []:
    """List all completed hikes."""
    hikes = controllers.shared.list_hikes()

    for hike in hikes:
        hike.polyline, hike.distance = get_polyline_from_coord(hike.startLat, hike.startLong, hike.endLat, hike.endLong)

    return hikes


def add_hike(body: dict) -> Response:
    """Add a new hike."""
    hike = Hike(body)

    s_coord = find_closest_coord(hike.startLat, hike.startLong)
    e_coord = find_closest_coord(hike.endLat, hike.endLong)

    hike.startLat = s_coord[0]
    hike.startLong = s_coord[1]
    hike.endLat = e_coord[0]
    hike.endLong = e_coord[1]

    errs = hike.is_valid()
    if errs:
        return Response(errs, status=400)

    hike = hike.__dict__
    del hike["_id"]

    with pymongo.MongoClient(con_string) as client:
        mongo_db = client.get_database(db_name)
        collection = mongo_db.get_collection(HIKE_COLLECTIONS)

        collection.insert_one(hike)

    return Response(status=201)


def get_hike_dis(body: dict):
    """Get the distance of a hike."""
    s_coord = find_closest_coord(body["startLat"], body["startLong"])
    e_coord = find_closest_coord(body["endLat"], body["endLong"])

    polyline, dis = get_polyline_from_coord(s_coord[0], s_coord[1], e_coord[0], e_coord[1])

    return {"polyline": polyline, "distance": dis}
