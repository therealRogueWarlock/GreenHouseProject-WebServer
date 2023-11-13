
import http from 'http';
import fs from 'fs';
import path from 'path';
 // Loading socket io module
import {io} from 'socket.io';

export class WebServer {

    constructor() {
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
        var socketIo = new io(server);

        // When communication is established
        socketIo.on('connection', function (socket) {
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



