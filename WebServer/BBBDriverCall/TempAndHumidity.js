import {CommandCaller} from "./CommandCaller.js"

export class TempAndHumidity{

    static execFileName = "./i2ctest";
    
    static getTemperatureAndHumidity() {
        var out = CommandCaller.systemSync(execFileName);
        console.log("out:" + out)
        return out;
    }

}