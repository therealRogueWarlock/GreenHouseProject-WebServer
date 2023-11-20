// Author: Sander Kirchert 304694
// Filename: main.js

import {WebServer} from "./WebServer/WebServer.js"

// initalize and start server, node.js intry point
new WebServer(8888).initServer().startServer();

