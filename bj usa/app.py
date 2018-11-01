import os

import pandas as pd
import numpy as np
import sqlite3

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples


@app.route("/")
def index():
    # getStates("heyhet")
    """Return the homepage."""
    return render_template("index.html")


@app.route("/plot")
def plot():
    
    return render_template("plot.html")

@app.route("/states")
def names():


    # engine = sqlalchemy.create_engine("mysql+pymysql://root:2Banadult@localhost:3306/bj")

    # df = pd.read_sql("state_data", engine)
    conn = sqlite3.connect("db/benNjerrys.db")
    df = pd.read_sql("select * from clean_data", conn)
    df.fillna(0, inplace=True)
    # Use Pandas to perform the sql query
    # stmt = db.session.query(Samples).statement
    # df = pd.read_sql_query(stmt, db.session.bind)
    print(df)

    state = {}
    for result in df:
        print(result)

    print(state)
    return df.to_json(orient="records")


@app.route("/heatmap")
def heatmap():

    return render_template("heatmap.html")


if __name__ == "__main__":
    app.run()
