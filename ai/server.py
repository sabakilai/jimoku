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
    for prediction in predictions:
        hour = str(prediction.time[0])
        minute = str(prediction.time[1])
        time = hour + '-' + minute

        
        if(int(hour) >= 8 and int(hour) <= 21):
            
            pred = round(prediction.get_prediction(), 0)

        else:   
            pred = 0

        
        result.append([time, pred])

    return result
    
if __name__ == "__main__":
    from sys import argv
    
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()