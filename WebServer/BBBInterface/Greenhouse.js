// Author: Sander Kirchert 304694
// Filename: Greenhouse.js

import {CommandCaller} from "./CommandCaller.js"


// Greenhouse interface to the CMD
export class Greenhouse{

    static greenHouseExecFile = "./WebServer/BBBInterface/greenhouse"
    
     /**
         * sync call to CMD, blocking 
         *
         * 
         * @returns Greenhouse status as json string {"Humidity":0, "Temperature":0, "NaturalLight":0, "WindowStatus":0, "HeaterStatus":0, "LightIntensity":0}
    */
    static getGreenhouseStatus() {
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile+ " get_data");
        return out;
    }

    /**
         * Set the light intensity of the artificial light
         * @param value 0 - 100 
         * @returns return output of cmd result
    */
    static setLightIntensity(value){
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile + " light " + value);
        return out;
    }

    /**
         * Set the heater,
         * 0 is off 1 is on 
         * @param value 0 or 1
         * @returns return output of cmd result
    */
    static setHeater(value){
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile + " heater " + value);
        return out;
    }


    /**
         * Set window state, 
         * 0 is closed 1 is open
         * @param value 0 or 1
         * @returns return output of cmd result
    */
    static setWindow(value){
        console.log(Greenhouse.greenHouseExecFile + " window " + value)
        var out = CommandCaller.systemSync(Greenhouse.greenHouseExecFile + " window " + value);
        return out;
    }

}