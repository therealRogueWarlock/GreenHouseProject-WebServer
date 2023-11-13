import CommandCaller from "./CommandCaller"

class TempAndHumidity{

    constructor (execFileName){
        this.execFileName = execFileName;
    }

    getTemperatureAndHumidity() {
        return CommandCaller.systemSync(this.execFileName)
    }

}