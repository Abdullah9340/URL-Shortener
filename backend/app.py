from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import json
import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)

db = psycopg2.connect(os.environ["DATABASE_URL"])
myCursor = db.cursor(cursor_factory = psycopg2.extras.RealDictCursor)

def generateRandomShortUrl():
    import random
    import string
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

class url(Resource):
    def get(self):
        short = request.args.get("short")
        if short is None:
            return {"error": "No short url provided"}
        myCursor.execute("SELECT * FROM urls WHERE short = %s", (short,))
        result = myCursor.fetchone()
        if result is None:
            return {"error": "Short url not found"}
        return {"url": result['url']}

class addUrl(Resource):
    def post(self):
        body = request.get_json()
        url = body["url"]
        myCursor.execute("SELECT * FROM urls WHERE url = %s", (url,))
        if myCursor.rowcount != 0:
            return {"status" : "success", "short": myCursor.fetchone()['short']}
        
        short = ""
        while True:
            short = generateRandomShortUrl()
            myCursor.execute('SELECT * FROM urls WHERE short = %s', (short,))
            if myCursor.rowcount == 0:
                break
        myCursor.execute("INSERT INTO urls (url, short) VALUES (%s, %s)", (url, short))
        db.commit()
        return {"status": "success", "short": short}

    def get(self):
        myCursor.execute("SELECT * FROM urls")
        return myCursor.fetchall()

api.add_resource(addUrl, '/addUrl')
api.add_resource(url, '/')

if __name__ == "__main__":
  app.run(host='0.0.0.0', port='5000')
  