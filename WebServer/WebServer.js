
import http from 'http';
import fs from 'fs';
import path from 'path';
// Loading socket io module
import { Server as SocketServer } from 'socket.io';
import { Greenhouse } from './BBBDriverCall/Greenhouse.js'

export class WebServer {

    constructor() {
        this.listeners = new Map();

        this.listeners.set("ListenToGreenhouseStatus", [])

        this.server;
    }

    initServer() {

        if (this.server) return;

        // Initialize the server on port 8888
        this.server = http.createServer(function (req, res) {
            var file = ((req.url == '/') ? '/index.html' : req.url);
            var rootPath = "./WebInterface"
            var filePath = rootPath + file;
            var fileExtension = path.extname(filePath);
            var contentType = 'text/html';
            // If and when css is added to the website

            if (fileExtension == '.css') {
                contentType = 'text/css';
            }

            fs.exists(filePath, function (exists) {
                if (exists) {

                    fs.readFile(filePath, function (error, content) {
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
                    res.end('Page not found!!!');

                }
            })
        })


        return this;
    }

    startServer() {

        if (!this.server) return;
        var self = this;

        var socketIo = new SocketServer(this.server);
        // When communication is established

        socketIo.on('connection', function (socket) {

            console.log("Connected:" + socket.id);

            // Service methodes
            socket.on('getTemperatureAndHumidity', () => {

                socket.emit("returnTemperatureAndHumidity", TempAndHumidity.getTemperatureAndHumidity());

            });

            socket.on('toggleHeater', () => {

                
                socket.emit("returnEvent", "toggleHeater");

            });


            socket.on('ListenToGreenhouseStatus', () => {
                self.listeners.get("ListenToGreenhouseStatus").push(socket)
            });

            socket.on("disconnect", (reason) => {
                this.removeSocketListner(socket)
            });
        });

        setInterval(() => {
            self.transmitGreenhouseStatus();
        }, 2000)


        this.server.listen(8888);
        console.log("Server Running ...");

        return this;
    }

    transmitGreenhouseStatus() {
        var listenersArray = this.listeners.get("ListenToGreenhouseStatus");
        
        if (listenersArray.length < 1) return;

        console.log("get temp...")

        var data = Greenhouse.getGreenhouseStatus();

        listenersArray.forEach((socket) => {
            console.log("Brordcast to " + socket.id)
            socket.emit("returnGreenhouseStatus", data)
        })
    }

    removeSocketListner(socket){

        var listenersArray = this.listeners.get("ListenToGreenhouseStatus");

        let index = listenersArray.indexOf(socket);
        if (index !== -1) {
            console.log("remove: "+ socket.id + "at:" + index)
            listenersArray.splice(index, 1);
        }

    }


}



