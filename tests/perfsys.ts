/// <reference path="..\src\compiler\sys.ts"/>
module perftest {

    interface IOLog {
        resolvePath: ts.Map<string>;
        fileNames: string[];
    }

    export interface IO {
        getOut(): string;
    }

    export var readFile = sys.readFile;
    var writeFile = sys.writeFile;
    export var write = sys.write;
    var resolvePath = sys.resolvePath;
    export var getExecutingFilePath = sys.getExecutingFilePath;
    export var getCurrentDirectory = sys.getCurrentDirectory;
    var exit = sys.exit;

    var args = sys.args;

    // augment sys so first ts.executeCommandLine call will be finish silently
    sys.write = (s: string) => { };
    sys.exit = (code: number) => { };
    sys.args = []

    export function restoreSys() {
        sys.args = args;
        sys.write = write;
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
        sys.resolvePath = (s) => {
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
        
        sys.createDirectory = (s: string) => { };
        sys.directoryExists = (s: string) => true;
        sys.fileExists = (s: string) => true;

        var currentDirectory = sys.getCurrentDirectory();
        sys.getCurrentDirectory = () => currentDirectory;

        var executingFilePath = sys.getExecutingFilePath();
        sys.getExecutingFilePath = () => executingFilePath;

        sys.readFile = (s: string) => {
            return files[s];
        }

        sys.resolvePath = (s: string) => {
            var path = log.resolvePath[s];
            if (!path) {
                throw new Error("Unexpected path '" + s + "'");
            }
            return path
        }

        sys.writeFile = (path: string, data: string) => { };        

        var out: string = "";

        sys.write = (s: string) => { out += s; };

        return {
            getOut: () => out,
        };
    }
}
