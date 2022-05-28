import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
from sklearn import linear_model
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import PolynomialFeatures
import joblib

def plot2D(x,y):
    plt.scatter(x,y)
    plt.show()

def plot3D (*args):
    plt.rcParams['legend.fontsize'] = 10
    
    fig = plt.figure()
    ax = Axes3D(fig)
    
    ax.scatter(args[0], args[1], args[2], c='red', label='Data')

    if (len(args) == 4):
        ax.scatter(args[0], args[1], args[3], c='blue', label='Model')

    ax.set_title('Linear regression example') 
    ax.set_xlabel('Patient Height (inches)')
    ax.set_ylabel('Patient Weight (pounds)')
    ax.set_zlabel('Catheter Length (centimeters)')
    ax.legend()
    
    plt.show()

trainData = np.loadtxt("./data/train.txt")
testData = np.loadtxt("./data/test.txt")




xTrain = trainData[:, 0:8]
yTrain = trainData[:,8]

xTest = testData[:, 0:8]
yTest = testData[:,8]

poly = PolynomialFeatures(degree=6)
xTrain_ = poly.fit_transform(xTrain)
xTest_ = poly.fit_transform(xTest)


linreg = linear_model.LinearRegression()

linreg.fit(xTrain_,yTrain)
y_hat = linreg.predict(xTest_)
print('MSE = ', mean_squared_error(yTest,y_hat))
print('Score = ', linreg.score(xTest_, yTest))

filename = './model/model.sav'
joblib.dump(linreg, filename)


