import joblib
from sklearn.preprocessing import PolynomialFeatures
import numpy as np
from api.utils.time_generator import generate_times
import datetime

def predict(hours):
    MONDAY_ARR = [1,0,0,0,0,0,0]
    TUESDAY_ARR = [0,1,0,0,0,0,0]
    WEDNESDAY_ARR = [0,0,1,0,0,0,0]
    THRUSDAY_ARR = [0,0,0,1,0,0,0]
    FRIDAY_ARR = [0,0,0,0,1,0,0]
    SATURDAY_ARR = [0,0,0,0,0,1,0]
    SUNDAY_ARR = [0,0,0,0,0,0,1]

    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THRUSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7
    filename = '../ai/model/model.sav'

    input_array = []
    X = []

    week_day = datetime.datetime.today().weekday()

    if week_day == MONDAY:
        input_array = MONDAY_ARR
    elif week_day == TUESDAY:
        input_array = TUESDAY_ARR
    elif week_day == WEDNESDAY:
        input_array = WEDNESDAY_ARR
    elif week_day == THRUSDAY:
        input_array = THRUSDAY_ARR
    elif week_day == FRIDAY:
        input_array = FRIDAY_ARR
    elif week_day == SATURDAY:
        input_array = SATURDAY_ARR
    else:
        input_array = SUNDAY_ARR

    times = generate_times(int(hours))

    for time in times:
        input_array.append(time.seconds)
        X.append(np.array(input_array))
        input_array = input_array[:-1]

    poly = PolynomialFeatures(degree=6)
    X = poly.fit_transform(X)

    loaded_model = joblib.load(filename)

    out =  loaded_model.predict(X)

    for i in range(0, len(out)):
        times[i].set_prediction(out[i])

    return times
