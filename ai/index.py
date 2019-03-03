import pickle
from sklearn.preprocessing import PolynomialFeatures
import numpy as np
import sys

MONDAY_ARR = [1,0,0,0,0,0,0]
TUESDAY_ARR = [0,1,0,0,0,0,0]
WEDNESDAY_ARR = [0,0,1,0,0,0,0]
THRUSDAY_ARR = [0,0,0,1,0,0,0]
FRIDAY_ARR = [0,0,0,0,1,0,0]
SATURDAY_ARR = [0,0,0,0,0,1,0]
SUNDAY_ARR = [0,0,0,0,0,0,1]

MONDAY = 'mon'
TUESDAY = 'tue'
WEDNESDAY = 'wed'
THRUSDAY = 'thu'
FRIDAY = 'fri'
SATURDAY = 'sat'
SUNDAY = 'sun'

week_day = sys.argv[1]
hours = sys.argv[2]

input_array = []

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



input_array.append(time)

filename = './model/model.sav'
x = np.array([input_array])

poly = PolynomialFeatures(degree=9)
x_ = poly.fit_transform(x)

loaded_model = pickle.load(open(filename, 'rb'))
out =  loaded_model.predict(x_)
print(out[0])