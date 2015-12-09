declare var require: any, process: any;
var fs: any = require('fs');
var path: any = require('path');

function instrumentForRecording(fn: string, tscPath: string) {
    instrument(tscPath, `
ts.sys = Playback.wrapSystem(ts.sys);
ts.sys.startRecord("${ fn }");`, `ts.sys.endRecord();`);
}

function instrumentForReplay(logFilename: string, tscPath: string) {
    instrument(tscPath, `
ts.sys = Playback.wrapSystem(ts.sys);
ts.sys.startReplay("${ logFilename }");`);
}

function instrument(tscPath: string, prepareCode: string, cleanupCode: string = '') {
    var bak = tscPath + '.bak';
    fs.exists(bak, (backupExists: boolean) => {
        var filename = tscPath;
        if (backupExists) {
            filename = bak;
        }

        fs.readFile(filename, 'utf-8', (err: any, tscContent: string) => {
            if (err) throw err;

            fs.writeFile(bak, tscContent, (err: any) => {
                if (err) throw err;

                fs.readFile(path.resolve(path.dirname(tscPath) + '/loggedIO.js'), 'utf-8', (err: any, loggerContent: string) => {
                    if (err) throw err;

                    var invocationLine = 'ts.executeCommandLine(ts.sys.args);';
                    var index1 = tscContent.indexOf(invocationLine);
                    if (index1 < 0) {
                        throw new Error("Could not find " + invocationLine);
                    }

                    var index2 = index1 + invocationLine.length;
                    var newContent = tscContent.substr(0, index1) + loggerContent + prepareCode + invocationLine + cleanupCode + tscContent.substr(index2) + '\r\n';
                    fs.writeFile(tscPath, newContent);
                });
            });
        });
    });
}

var isJson = (arg: string) => arg.indexOf(".json") > 0;

var record = process.argv.indexOf('record');
var tscPath = process.argv[process.argv.length - 1];
if (record >= 0) {
    console.log('Instrumenting ' + tscPath + ' for recording');
    instrumentForRecording(process.argv[record + 1], tscPath);
} else if (process.argv.some(isJson)) {
    var filename = process.argv.filter(isJson)[0];
    instrumentForReplay(filename, tscPath);
}


