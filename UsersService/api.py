from flask import Flask, jsonify, url_for, redirect, request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource

app = Flask(__name__)
# app.config["MONGO_DBNAME"] = "Gimber"
app.config["MONGO_URI"] = "mongodb://localhost:27017/Gimber"
mongo = PyMongo(app)
APP_URL = "http://127.0.0.1:5000"

@app.route('/api/v1/Users', methods=['GET'])
def get_users():

    data = []
    cursor = mongo.db.Gimber.find()

    print jsonify(cursor)
    return cursor

@app.route('/api/v1/Users', methods=['POST'])
def insert_user():
    data = request.get_json()
    
    if not data:
        data = {"response": "ERROR"}
        return jsonify(data)
    else:
        id = data.get('id')
        if id:
            if mongo.db.Gimber.find_one({"id": id}):
                return {"response": "tweet already exists."}
            else:
                mongo.db.Gimber.insert(data)
        else:
            return {"response": "id number missing"}

    return redirect(url_for("get_users"))

@app.route('/api/v1/Users/<id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    mongo.db.Gimber.update({'id': id}, {'$set': data})
    return redirect( url_for("get_users") )

@app.route('/api/v1/Users/<id>', methods=['DELETE'])
def delete_user( id ):
    mongo.db.Gimber.remove({'id': id})
    return redirect(url_for("Gimber"))


if __name__ == "__main__":
    app.run(debug=True)