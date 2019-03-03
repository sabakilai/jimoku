from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import SocketServer
import json
import cgi
from predict import predict

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
    def do_HEAD(self):
        self._set_headers()
        
    # GET sends back a Hello world message
    def do_GET(self):
        self._set_headers()
        self.wfile.write(json.dumps({'description': 'Jimoku AI API', 'status': 'ok'}))
        
    # POST echoes the message adding a JSON field
    def do_POST(self):
        ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
        length = int(self.headers.getheader('content-length'))
        postvars = cgi.parse_qs(self.rfile.read(length), keep_blank_values=1)

        hours = int(postvars['hours'][0])

        predictions = predict(hours)
        out = generate_response(predictions)
        result = {}
        result['data'] = out
        
        self._set_headers()
        self.wfile.write(json.dumps(result))
        
def run(server_class=HTTPServer, handler_class=Server, port=8008):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    
    print ('Starting httpd on port',  port)
    httpd.serve_forever()

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
    
if __name__ == "__main__":
    from sys import argv
    
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()