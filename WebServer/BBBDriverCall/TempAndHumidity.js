import {CommandCaller} from "./CommandCaller.js"

export class TempAndHumidity{

    constructor (execFileName){
        console.log(execFileName);
        this.execFileName = execFileName;
    }

    getTemperatureAndHumidity() {
        var out = CommandCaller.systemSync(this.execFileName);
        console.log("out:" + out)
        return out;
    }

}