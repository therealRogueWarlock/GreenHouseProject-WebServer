import {CommandCaller} from "./CommandCaller.js"

export class Greenhouse{

    static execFileName = "./WebServer/i2ctest";
    static lightFile = "./WebServer/set_light"
    static greenHouseExecFile = "./WebServer/greenhouse"
    static getGreenhouseStatus() {
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile+ " get_data");
        return out;
    }
    static setLightIntensity(value){
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile + " light " + value);
        return out;
    }


    static setHeater(value){
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile + " heater " + value);
        return out;
    }

    static setWindow(value){
        console.log(Greenhouse.greenHouseExecFile + " window " + value)
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile + " window " + value);
        return out;
    }

}