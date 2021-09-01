import mysql.connector
from flask import Response

import controllers.shared
from controllers.geometry import find_closest_coord
from models.hike import Hike
from controllers.shared import dbParams


def list_hikes() -> []:
    return controllers.shared.list_hikes()


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
        (start_time, end_time, start_lat, start_long, end_lat, end_long)
        VALUES (?, ?, ?, ?, ?, ?);
        """
    with mysql.connector.connect(**dbParams) as conn:
        with conn.cursor() as cursor:
            cursor.execute(sql, (hike.startTime, hike.endTime, hike.startLat, hike.startLong, hike.endLat, hike.endLong))

    return Response(status=201)
