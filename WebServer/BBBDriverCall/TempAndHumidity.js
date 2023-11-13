import {CommandCaller} from "./CommandCaller.js"

export class TempAndHumidity{

    constructor (execFileName){
        this.execFileName = execFileName;
    }

    getTemperatureAndHumidity() {
        return CommandCaller.systemSync(this.execFileName)
    }

}