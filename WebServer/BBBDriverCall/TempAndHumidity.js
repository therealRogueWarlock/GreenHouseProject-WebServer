import {CommandCaller} from "./CommandCaller.js"

export class TempAndHumidity{

    constructor (execFileName){
        console.log(execFileName)
        this.execFileName = execFileName;
    }

    getTemperatureAndHumidity() {
        return CommandCaller.systemSync(this.execFileName)
    }

}