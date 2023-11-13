import {WebServer} from "./WebServer/WebServer.js"


new WebServer().InitServer().StartServer();

setInterval(() => {
    console.log('Infinite Loop Test interval n:', i++);
}, 2000)