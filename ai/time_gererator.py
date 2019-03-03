from datetime import datetime, timedelta

class Timestamp:
    def __init__(self, time, seconds):
        self.time = time
        self.seconds = seconds
        self.prediction = 0

    def set_prediction(self, prediction):
        self.prediction = prediction

    def get_time(self):
        return str(self.time[0]) + "-" + str(self.time[1])

    def get_prediction(self):
        return self.prediction

    def __repr__(self):
        return str(self.seconds)

def getSecs(hours,mins):
    return (hours * 3600  + mins * 60)/ float(60*60)

def generate_times(hours):
    times = []
    now = datetime.now()
    minutes = hours * 12
    times.append(Timestamp([now.hour, now.minute], getSecs(now.hour, now.minute)))

    for i in range(1, minutes):
        newTime = datetime.now() + timedelta(minutes=6*i)
        times.append(Timestamp([newTime.hour, newTime.minute],getSecs(newTime.hour, newTime.minute)))
        
    return times

