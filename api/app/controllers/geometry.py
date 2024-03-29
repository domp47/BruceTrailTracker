"""Do earth geometry calculations."""
import csv
import os
import pathlib
from math import asin, cos, pi, sqrt

import polyline

from controllers.shared import list_hikes

coord_filenames = [
    "1-niagaraSection.csv",
    "2-IroquoiaSection.csv",
    "3-TorontoSection.csv",
    "4-CaledonHillsSection.csv",
    "5-DufferinHi-LandSection.csv",
    "6-AdventureSection.csv",
    "7-BeaverValleySection.csv",
    "8-SydenhamSection.csv",
    "9-PeninsulaSection.csv",
]
parent_dir = pathlib.Path(__file__).parent.resolve()
cords = []


def distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Get the distance between two coordinates."""
    p = pi / 180
    a = 0.5 - cos((lat2 - lat1) * p) / 2 + cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p)) / 2
    # 2*R*asin...
    return 12742.0144 * asin(sqrt(a))


def calc_distance(vertices) -> float:
    """Calculate the distance between a list of vertices."""
    dis = 0
    prev_cord = None
    for cord in vertices:
        if prev_cord:
            dis += distance(prev_cord[0], prev_cord[1], cord[0], cord[1])

        prev_cord = cord

    return dis


for coord_file in coord_filenames:
    with open(os.path.join(parent_dir, "../coordinateFiles", coord_file), newline="") as csv_file:
        coord_reader = csv.DictReader(csv_file)

        for coord in coord_reader:
            lat = float(coord["Latitude"])
            long = float(coord["Longitude"])
            cords.append((lat, long))

total_distance = calc_distance(cords)


def find_closest_coord(latitude: float, longitude: float) -> (float, float):
    """Given a coord find the closest coord on the bruce trail."""
    min_dis = 9999999999
    closest_cord = None

    for cord in cords:
        dis = distance(latitude, longitude, cord[0], cord[1])

        if dis < min_dis:
            min_dis = dis
            closest_cord = cord

    return closest_cord


def get_polyline_from_coord(start_latitude: float, start_longitude: float, end_latitude: float, end_longitude: float):
    """Get the bruce trail polyline from a start and endpoint."""
    start_idx = cords.index((start_latitude, start_longitude))
    end_idx = cords.index((end_latitude, end_longitude))

    poly_cords = cords[start_idx : end_idx + 1]

    dis = 0
    p_cord = None
    for cord in poly_cords:
        if p_cord:
            dis += distance(p_cord[0], p_cord[1], cord[0], cord[1])

        p_cord = cord

    return polyline.encode(poly_cords), dis


def calc_polys_distances(hikes: []):
    """Calculate distance of all hikes."""
    hiked_cords = []

    for hike in hikes:
        start_idx = cords.index((hike.startLat, hike.startLong))
        end_idx = cords.index((hike.endLat, hike.endLong))

        hiked_cords.append(cords[start_idx : end_idx + 1])

    unique_paths = set()
    hiked_distance = 0
    hiked_lines = []
    for hike in hiked_cords:
        hiked_lines.append(polyline.encode(hike))

        p_cord = None
        for cord in hike:
            if p_cord and (p_cord, cord) not in unique_paths:
                hiked_distance += distance(p_cord[0], p_cord[1], cord[0], cord[1])
                unique_paths.add((p_cord, cord))

            p_cord = cord

    return hiked_distance, hiked_lines


def get_polylines():
    """Get the polylines for the ui to show."""
    hikes = list_hikes()

    completed_poly = []
    completed_dis = 0

    if hikes:
        completed_dis, completed_poly = calc_polys_distances(hikes)

    resp = {
        "completed": {"polyline": completed_poly, "distance": completed_dis},
        "total": {"polyline": polyline.encode(cords), "distance": total_distance},
    }

    return resp
