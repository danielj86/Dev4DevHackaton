__author__ = 'Nir'
#!/usr/bin/python

import thread
from threading import Timer
import serial
import time
import urllib
import urllib2
import json
from Queue import Queue

curr_value = 0
q = Queue()

def ReadSensorValue():
    ser = serial.Serial('COM17', 9600, timeout=0)

    while 1:
        try:
            value = ser.readline()
            print value
            if value is not "":
                q.put(value)
            thread.start_new_thread(SendSensorData,())
            time.sleep(2.5)

        except ser.SerialTimeoutException:
            print('Data could not be read')
        time.sleep(2.5)

def SendSensorData():
    try:
        # do POST
        url_2 = 'http://8.34.220.38/temp'
        curr_value = q.get()
        print curr_value

        data = { 'temperature': curr_value }

        req = urllib2.Request(url_2)
        req.add_header('Content-Type', 'application/json')

        response = urllib2.urlopen(req, json.dumps(data))
    except Exception:
        pass

# Create two threads as follows
try:
   thread.start_new_thread(ReadSensorValue,())

except:
   print "Error: unable to start thread"

while 1:
    pass