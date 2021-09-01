import mysql.connector
from flask import Response

from models.photo import Photo
from controllers.shared import dbParams


def list_photos() -> []:
    photos = []

    select_str = "SELECT id, time_stamp, location, lat, 'long' FROM trailTracker.photo"

    with mysql.connector.connect(**dbParams) as conn:
        with conn.cursor() as cursor:
            cursor.execute(select_str)

            row = cursor.fetchone()
            while row:
                photo = Photo()
                photo.id = row[0]
                photo.timeStamp = row[1]
                photo.location = row[2]
                photo.lat = row[3]
                photo.long = row[4]

                photos.append(photo)
                row = cursor.fetchone()

    return photos


def add_photo(body: dict):
    photo = Photo(body)

    errs = photo.is_valid()
    if errs:
        return Response(errs, status=400)

    sql = """
        INSERT INTO trailTracker.photo 
        (time_stamp, location, lat, long)
        VALUES (?,?,?,?);
        """

    with mysql.connector.connect(**dbParams) as conn:
        with conn.cursor() as cursor:
            cursor.execute(sql, (photo.timeStamp, photo.location, photo.lat, photo.long))

    return Response(status=201)
