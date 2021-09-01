
class Photo:
    def __init__(self, body: dict = None):
        if not body:
            return

        self.id = int(self.try_get(body, "id"))
        self.timeStamp = self.try_get(body, "timeStamp")
        self.location = self.try_get(body, "location")
        self.lat = float(self.try_get(body, "lat"))
        self.long = float(self.try_get(body, "long"))

    @staticmethod
    def try_get(body: dict, key: str):
        if key in body:
            return body[key]
        else:
            return None

    def is_valid(self) -> []:
        errors = []

        if not self.timeStamp:
            errors.append("Time Stamp is required")
        if not self.location:
            errors.append("Photo Location is required")
        if not self.lat:
            errors.append("Latitude is required")
        if not self.long:
            errors.append("Longitude is required")

        return errors
