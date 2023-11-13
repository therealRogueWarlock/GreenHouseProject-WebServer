import child_process from 'child_process'

export class CommandCaller{


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