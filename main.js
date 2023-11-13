import {WebServer} from "./WebServer/WebServer.js"


new WebServer().InitServer().StartServer();

let i = 0;
setInterval(() => {
    console.log('Infinite Loop Test interval n:', i++);
}, 2000)