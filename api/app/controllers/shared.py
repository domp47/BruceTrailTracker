import configparser
import mysql.connector
import pathlib
import os
from models.hike import Hike

parent_dir = pathlib.Path(__file__).parent.resolve()
configFilename = os.path.join(parent_dir, "..", "config.ini")

config = configparser.RawConfigParser()
config.read(configFilename)
dbString = config['DATABASE']['ConnectionString']
dbParams = dict(entry.split('=') for entry in dbString.split(';'))


def list_hikes() -> []:
    hikes = []

    select_str = \
        "SELECT id, name, start_time, end_time, start_lat, start_long, end_lat, end_long FROM trailTracker.hike"

    # with mysql.connector.connect(**dbParams) as conn:
    #     with conn.cursor() as cursor:
    #         cursor.execute(select_str)

    #         row = cursor.fetchone()
    #         while row:
    #             hike = Hike()
    #             hike.id = row[0]
    #             hike.name = row[1]
    #             hike.startTime = row[2]
    #             hike.endTime = row[3]
    #             hike.startLat = row[4]
    #             hike.startLong = row[5]
    #             hike.endLat = row[6]
    #             hike.endLong = row[7]

    #             hikes.append(hike)
    #             row = cursor.fetchone()

    return hikes
