
export class CommandCaller{

    static child_process = require('child_process');

    static systemSync(cmd) {
        return child_process.execSync(cmd).toString();
    }

    static async systemASync(cmd, callback) {
        child_process.exec(cmd, function (error, stdout, stderr) {
           //You should handle error or pass it to the callback
           callback(stdout); 
        });
    }
}