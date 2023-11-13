
import http from 'http';
import fs from 'fs';
import path from 'path';
 // Loading socket io module
import {Server as socketServer} from 'socket.io';

export class WebServer {

    constructor() {
        this.server;
    }

    InitServer() {

        if(this.server) return;

        // Initialize the server on port 8888
        this.server = http.createServer(function (req, res) {
        
            var file = '' + ((req.url == '/') ? '../WebInterface/index.html' : req.url);
            console.log(file);
            var fileExtension = path.extname(file);
            var contentType = 'text/html';
            // If and when css is added to the website
            /*
            if(fileExtension == '.css'){
                contentType = 'text/css';
            }
            */

            fs.readFile("index.html", function (error, content) {
                if (!error) {
                    console.log("error on load")
                    // Page found, write content
                    res.writeHead(200, { 'content-type': contentType });
                    res.end(content);
                }else {
                    // Page not found
                    res.writeHead(404);
                    console.log("file does not exist")
                    res.end('Page not found!!!');
                    
                }
            })
        })

        // Loading socket io module
        var socketIo = new socketServer(this.server);

        // When communication is established
        socketIo.on('connection', function (socket) {
            console.log(socket.id);
            // Service methodes
            socket.on('getTemperatureAndHumidity', () => {

                socket.emit("returnTemperatureAndHumidity", getTemperatureAndHumidity());

            });

        });

        return this;
    }

    StartServer(){
        this.server.listen(8888);
        console.log("Server Running ...");
        return this;
    }


}



