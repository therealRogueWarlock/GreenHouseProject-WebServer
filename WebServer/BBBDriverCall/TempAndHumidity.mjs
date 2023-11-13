import CommandCaller from "./CommandCaller.mjs"

export class TempAndHumidity{

    constructor (execFileName){
        this.execFileName = execFileName;
    }

    getTemperatureAndHumidity() {
        return CommandCaller.systemSync(this.execFileName)
    }

}