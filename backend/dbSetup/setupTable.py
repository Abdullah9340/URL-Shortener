import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()


db = psycopg2.connect(os.environ["DATABASE_URL"])
myCursor = db.cursor()

def createTable():
    myCursor.execute("CREATE TABLE IF NOT EXISTS urls (id SERIAL PRIMARY KEY, url VARCHAR(255) NOT NULL, short VARCHAR(255) NOT NULL)")
    db.commit()
    print("Table created")
    return "Table created"

createTable()