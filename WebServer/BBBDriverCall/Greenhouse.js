import {CommandCaller} from "./CommandCaller.js"

export class Greenhouse{

    static execFileName = "./WebServer/i2ctest";
    
    static getGreenhouseStatus() {
        var out = CommandCaller.systemSync(Greenhouse.execFileName);
        return out;
    }
s
}