import fs = require("fs");
import path = require("path");

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

function instrument(tscPath: string, prepareCode: string, cleanupCode = "") {
    const bak = `${tscPath}.bak`;
    const filename = fs.existsSync(bak) ? bak : tscPath;
    const tscContent = fs.readFileSync(filename, "utf-8");
    fs.writeFileSync(bak, tscContent);
    const loggerContent = fs.readFileSync(path.resolve(path.dirname(tscPath) + "/loggedIO.js"), "utf-8");
    const invocationLine = "ts.executeCommandLine(ts.sys, ts.noop, ts.sys.args);";
    const index1 = tscContent.indexOf(invocationLine);
    if (index1 < 0) {
        throw new Error(`Could not find ${invocationLine}`);
    }
    const index2 = index1 + invocationLine.length;
    const newContent = tscContent.substr(0, index1) + loggerContent + prepareCode + invocationLine + cleanupCode + tscContent.substr(index2) + "\r\n";
    fs.writeFileSync(tscPath, newContent);
}

const isJson = (arg: string) => arg.indexOf(".json") > 0;

const record = process.argv.indexOf("record");
const tscPath = process.argv[process.argv.length - 1];
if (record >= 0) {
    console.log(`Instrumenting ${tscPath} for recording`);
    instrumentForRecording(process.argv[record + 1], tscPath);
}
else if (process.argv.some(isJson)) {
    const filename = process.argv.filter(isJson)[0];
    instrumentForReplay(filename, tscPath);
}
