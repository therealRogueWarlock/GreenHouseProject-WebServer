// Author: Sander Kirchert 304694

import child_process from 'child_process'



//utility classes to call CMD commands
export class CommandCaller{

    /**
         * sync call to CMD, blocking 
         *
         * @param cmd string writen to CMD  
         * @returns command result as string
    */
    static systemSync(cmd) {
        return child_process.execSync(cmd).toString();
    }

    /**
         * Async call to CMD, Non blocking 
         *
         * @param cmd string writen to CMD  
         * @param {*} callback Callback funtion called when command has executed, that takes the cmd output
         * @returns void
    */
    static async systemASync(cmd, callback) {
        child_process.exec(cmd, function (error, stdout, stderr) {
           //You should handle error or pass it to the callback
           callback(error, stdout, stderr); 
        });
    }
}