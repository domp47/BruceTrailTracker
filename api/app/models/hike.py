from dateutil import parser


class Hike:
    def __init__(self, body: dict = None):
        if not body:
            return

        self.id = self.try_get(body, "id", lambda x: int(x))
        self.name = self.try_get(body, "name")
        self.startLat = self.try_get(body, "startLat", lambda x: float(x))
        self.startLong = self.try_get(body, "startLong", lambda x: float(x))
        self.endLat = self.try_get(body, "endLat", lambda x: float(x))
        self.endLong = self.try_get(body, "endLong", lambda x: float(x))
        self.startTime = self.try_get(body, "startTime", lambda x: parser.parse(x))
        self.endTime = self.try_get(body, "endTime", lambda x: parser.parse(x))
        self.polyline = ""
        self.distance = 0

    @staticmethod
    def try_get(body: dict, key: str, transform=None):
        if key in body:
            return transform(body[key]) if transform else body[key]
        else:
            return None

    def is_valid(self) -> []:
        errors = []

        if not self.name:
            errors.append("Name is required")
        if not self.startLat:
            errors.append("Start Latitude is required")
        if not self.startLong:
            errors.append("Start Longitude is required")
        if not self.endLat:
            errors.append("End Latitude is required")
        if not self.endLong:
            errors.append("End Longitude is required")
        if not self.startTime:
            errors.append("Start Time is required")
        if not self.endTime:
            errors.append("End Time is required")

        return errors
