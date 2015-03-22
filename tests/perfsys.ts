/// <reference path="..\src\compiler\sys.ts"/>
/// <reference path="..\src\compiler\types.ts"/>

module perftest {

    interface IOLog {
        resolvePath: ts.Map<string>;
        fileNames: string[];
    }

    export interface IO {
        getOut(): string;
    }

    export var readFile = ts.sys.readFile;
    var writeFile = ts.sys.writeFile;
    export var write = ts.sys.write;
    var resolvePath = ts.sys.resolvePath;
    export var getExecutingFilePath = ts.sys.getExecutingFilePath;
    export var getCurrentDirectory = ts.sys.getCurrentDirectory;
    var exit = ts.sys.exit;

    var args = ts.sys.args;

    // augment sys so first ts.executeCommandLine call will be finish silently
    ts.sys.write = (s: string) => { };
    ts.sys.exit = (code: number) => { };
    ts.sys.args = []

    export function restoreSys() {
        ts.sys.args = args;
        ts.sys.write = write;
    }

    export function hasLogIOFlag() {
        return args.length > 2 && args[0] === "--logio";
    }

    export function getArgsWithoutLogIOFlag() {
        return args.slice(2);
    }

    export function getArgsWithoutIOLogFile() {
        return args.slice(1);
    }

    var resolvePathLog: ts.Map<string> = {};
    
    export function interceptIO() {
        ts.sys.resolvePath = (s) => {
            var result = resolvePath(s);
            resolvePathLog[s] = result;
            return result;
        };
    }

    export function writeIOLog(fileNames: string[]) {
        var path = args[1];
        var log: IOLog = {
            fileNames: fileNames,
            resolvePath: resolvePathLog
        };

        writeFile(path, JSON.stringify(log));
    }

    export function prepare(): IO {
        var log = <IOLog>JSON.parse(readFile(args[0]));

        var files: ts.Map<string> = {};
        log.fileNames.forEach(f => { files[f] = readFile(f); })
        
        ts.sys.createDirectory = (s: string) => { };
        ts.sys.directoryExists = (s: string) => true;
        ts.sys.fileExists = (s: string) => true;

        var currentDirectory = ts.sys.getCurrentDirectory();
        ts.sys.getCurrentDirectory = () => currentDirectory;

        var executingFilePath = ts.sys.getExecutingFilePath();
        ts.sys.getExecutingFilePath = () => executingFilePath;

        ts.sys.readFile = (s: string) => {
            return files[s];
        }

        ts.sys.resolvePath = (s: string) => {
            var path = log.resolvePath[s];
            if (!path) {
                throw new Error("Unexpected path '" + s + "'");
            }
            return path
        }

        ts.sys.writeFile = (path: string, data: string) => { };

        var out: string = "";

        ts.sys.write = (s: string) => { out += s; };

        return {
            getOut: () => out,
        };
    }
}
