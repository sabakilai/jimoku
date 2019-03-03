import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

import pickle

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

xTrain = trainData[:, 0:9]
yTrain = trainData[:,8]

x = []
y = []

for data in xTrain:
    if data[0] == 1:
        x.append(data[7])
    if data[0] == 1:
        y.append(data[8])

plot2D(x, y)

