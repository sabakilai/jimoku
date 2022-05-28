from flask import Flask, request
import sys
import os
import json
from flask_cors import CORS, cross_origin

from api.utils.predict import predict

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@cross_origin()
@app.route("/")
def get():
    return json.dumps({'description': 'Jimoku AI API', 'status': 'ok'})

@cross_origin()
@app.route("/time/<hours>", methods=['GET'])
def post(hours):
    response = {}

    try:
        predictions = predict(hours)
        out = generate_response(predictions)

        response['success'] = True
        response['result'] = {}
        response['result']['data'] = out
        return json.dumps(response)
    except Exception as e:
        print(e)
        response['success'] = False
        return json.dumps(response)

def generate_response(predictions):
    result = []
    data = {}
    for prediction in predictions:
        hour = str(prediction.time[0])
        minute = str(prediction.time[1])
        time = hour + ':' + minute
        
        if((int(hour) >= 7 and int(hour) < 23) or (int(hour) == 6 and int(minute)>30 ) ):
            pred = round(prediction.get_prediction() * (80/float(120)) , 0)
            if (pred <0):
                pred = 0
        else:   
            pred = 0

        data['name'] = time
        data['Occupancy'] = pred
        result.append(data)
        data = {}

    return result
