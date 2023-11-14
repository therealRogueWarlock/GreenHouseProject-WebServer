import {CommandCaller} from "./CommandCaller.js"

export class Greenhouse{

    static execFileName = "./WebServer/i2ctest";
    static lightFile = "./WebServer/set_light"
    static getGreenhouseStatus() {
        var out = CommandCaller.systemSync(Greenhouse.execFileName);
        return out;
    }
    static setLightIntensity(value){
        var out = CommandCaller.systemSync(Greenhouse.lightFile + " " + value);
        return out;
    }
}