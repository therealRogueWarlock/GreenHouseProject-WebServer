// Author: Sander Kirchert 304694

import http from 'http';
import fs from 'fs';
import path from 'path';

// Loading socket io module
import { Server as SocketServer } from 'socket.io';
import { Greenhouse } from './BBBInterface/Greenhouse.js'

export class WebServer {

    constructor(port) {

        // declare a map to store socket listeners 
        this.listeners = new Map();
        // creating a empty array for Greenhouse Status listeners
        this.listeners.set("ListenToGreenhouseStatus", [])

        // Greenhouse state as Json
        this.greenhouseState = { "Humidity": 0, "Temperature": 0, "NaturalLight": 0, "WindowStatus": 0, "HeaterStatus": 0, "LightIntensity": 0 }

        this.port = port;

        this.server;

    }


    /**
         * Init HTTP server
         *
         * @returns this aka WebServer
    */
    initServer() {

        if (this.server) return;

        // Initialize the server on port 8888
        this.server = http.createServer(function (req, res) {
            var file = ((req.url == '/') ? '/index.html' : req.url);

            // Define path to what is requested
            var rootPath = "./WebInterface"
            var filePath = rootPath + file;
            var fileExtension = path.extname(filePath);
            var contentType = 'text/html';

            if (fileExtension == '.css') {
                contentType = 'text/css';
            }

            // check if the file exits and write to the request result if found
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


    /**
         * Start Socket server using the Http server, InitServer has to be called first
         *
         * @returns return output of cmd result
    */

    startServer() {

        if (!this.server) return;
        var self = this;

        var socketIo = new SocketServer(this.server);

        // When communication is established
        socketIo.on('connection', function (socket) {

            console.log("Connected:" + socket.id);

            // Listen Services 

            // add the socket to Listen to Greenhouse state if requested
            socket.on('ListenToGreenhouseStatus', () => {
                self.addGreenhouseListener(socket);
            });


            // Service methodes
            socket.on('setHeater', (data) => {

                // Call the greenhouse interface to set the heater state
                Greenhouse.setHeater(data)

                // Return send value, for debug perpus
                socket.emit("returnEvent", data);
            });


            socket.on('setWindow', (data) => {

                Greenhouse.setWindow(data)

                socket.emit("returnEvent", data);

            });

            socket.on('setLightIntensity', (data) => {

                Greenhouse.setLightIntensity(data)

                socket.emit("returnEvent", data);

            });

            // when socket disconnecting remove socket from listners
            socket.on("disconnect", (reason) => {
                self.removeGreenhouseListener(socket)
            });
        });

        // Initilize loop that trasmit green house state to all listeners in a given interval
        setInterval(() => {
            self.transmitGreenhouseStatus();
        }, 1500)


        // Start server 
        this.server.listen(this.port);
        console.log("Server Running ...");
        console.log(server.address());
        return this;
    }

   

    /**
        *Getting current Greenhouse status and trasmit to all sockets listening
    */
    transmitGreenhouseStatus() {

        this.listeners.forEach(function (value, key, map))

        var listenersArray = this.listeners.get("ListenToGreenhouseStatus");

        if (listenersArray.length < 1) return;

        var data = Greenhouse.getGreenhouseStatus();
        var dataJson = JSON.parse(data);

        this.greenhouseState = dataJson;

        listenersArray.forEach((socket) => {
            //console.log("Brordcast to " + socket.id)
            socket.emit("returnGreenhouseStatus", this.greenhouseState)
        })
    }


    addGreenhouseListener(socket) {
        this.listeners.get("ListenToGreenhouseStatus").push(socket);
    }


    /**
     * 
     * 
     * @param {*} socket 
     */
    removeGreenhouseListener(socket) {

        var listenersArray = this.listeners.get("ListenToGreenhouseStatus");

        let index = listenersArray.indexOf(socket);
        if (index !== -1) {
            console.log("remove: " + socket.id + "at:" + index)
            listenersArray.splice(index, 1);
        }

    }


}



