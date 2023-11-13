import {CommandCaller} from "./CommandCaller.js"

export class TempAndHumidity{

    static execFileName = "./WebServer/i2ctest";
    
    static getTemperatureAndHumidity() {
        var out = CommandCaller.systemSync(TempAndHumidity.execFileName);
        return out;
    }

}