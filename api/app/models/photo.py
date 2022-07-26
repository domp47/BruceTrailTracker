"""Model to represent a photo."""
from dateutil import parser


class Photo:
    """A photo object in class form."""

    def __init__(self, body: dict = None):
        if not body:
            return

        self.id = self.try_get(body, "id", lambda x: int(x))
        self.timeStamp = self.try_get(body, "timeStamp", lambda x: parser.parse(x))
        self.location = self.try_get(body, "location")
        self.lat = self.try_get(body, "lat", lambda x: float(x))
        self.long = self.try_get(body, "long", lambda x: float(x))

    @staticmethod
    def try_get(body: dict, key: str, transform=None):
        """Try and get a key from a dict with optional transformation function."""
        if key in body:
            return transform(body[key]) if transform else body[key]

        return None

    def is_valid(self) -> []:
        """Determine whether the model is valid."""
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
