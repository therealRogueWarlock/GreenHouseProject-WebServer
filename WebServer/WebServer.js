import {require} from "require"



export class WebServer {

    

    constructor() {
        //Loading modules
        this.http = require('../node_modules/http');
        this.fs = require('../node_modules/fs');
        this.path = require('../node_modules/path');
        
        this.server;
    }

    InitServer() {

        if(this.server) return;

        // Initialize the server on port 8888
        this.server = http.createServer(function (req, res) {

            var file = '.' + ((req.url == '/') ? '/index.html' : req.url);
            var fileExtension = path.extname(file);
            var contentType = 'text/html';
            // If and when css is added to the website
            
            if(fileExtension == '.css'){
                contentType = 'text/css';
            }

            fs.exists(file, function (exists) {
                if (exists) {
                    fs.readFile(file, function (error, content) {
                        if (!error) {
                            // Page found, write content
                            res.writeHead(200, { 'content-type': contentType });
                            res.end(content);
                        }
                    })
                }
                else {
                    // Page not found
                    res.writeHead(404);
                    res.end('Page not found');
                }
            })
        })

        // Loading socket io module
        var io = require('socket.io')(server);

        // When communication is established
        io.on('connection', function (socket) {
            console.log(socket.id);
            // Service methodes
            socket.on('getTemperatureAndHumidity', () => {

                socket.emit("returnTemperatureAndHumidity", getTemperatureAndHumidity());

            });

        });

        return this.server;
    }

    StartServer(){
        this.server.listen(8888);
        console.log("Server Running ...");
        return this.server;
    }


}



