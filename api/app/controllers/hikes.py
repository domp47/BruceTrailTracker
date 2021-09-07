import mysql.connector
from flask import Response

import controllers.shared
from controllers.geometry import find_closest_coord, get_polyline_from_coord
from models.hike import Hike
from controllers.shared import dbParams


def list_hikes() -> []:
    hikes = controllers.shared.list_hikes()

    for hike in hikes:
        hike.polyline, hike.distance = get_polyline_from_coord(hike.startLat, hike.startLong, hike.endLat, hike.endLong)

    return hikes


def add_hike(body: dict) -> Response:
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

    sql = """
        INSERT INTO trailTracker.hike
        (name, start_time, end_time, start_lat, start_long, end_lat, end_long)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
        """
    with mysql.connector.connect(**dbParams) as conn:
        with conn.cursor() as cursor:
            cursor.execute(sql, (hike.name, hike.startTime, hike.endTime, hike.startLat, hike.startLong, hike.endLat, hike.endLong))
        conn.commit()

    return Response(status=201)
