class Hike:
    def __init__(self, body: dict = None):
        if not body:
            return

        self.id = int(self.try_get(body, "id"))
        self.name = self.try_get(body, "name")
        self.startLat = float(self.try_get(body, "startLat"))
        self.startLong = float(self.try_get(body, "startLong"))
        self.endLat = float(self.try_get(body, "endLat"))
        self.endLong = float(self.try_get(body, "endLong"))
        self.startTime = self.try_get(body, "startTime")
        self.endTime = self.try_get(body, "endTime")
        self.polyline = ""
        self.distance = 0

    @staticmethod
    def try_get(body: dict, key: str):
        if key in body:
            return body[key]
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
