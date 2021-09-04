import datetime
import os
import connexion
import configparser
import pathlib
from flask_cors import CORS
from json import JSONEncoder


class Encoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime.date):
            return f"{o.isoformat()}Z"

        return o.__dict__


parent_dir = pathlib.Path(__file__).parent.resolve()
configFilename = os.path.join(parent_dir, "config.ini")
config = configparser.RawConfigParser()
config.read(configFilename)

dbString = config['DATABASE']['ConnectionString']

if dbString is None:
    raise ValueError("Database Connection String is required")


app = connexion.App(__name__, specification_dir="./")
CORS(app.app, origins="*")
app.add_api("swagger.yml")
app.app.json_encoder = Encoder

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
