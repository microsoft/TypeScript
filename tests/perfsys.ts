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

    // augment sys so first ts.executeCommandLine call will be finish silently
    ts.sys.write = (s: string) => { };
    ts.sys.exit = (code: number) => { };

    var resolvePathLog: ts.Map<string> = {};
    
    export function interceptIO() {
        ts.sys.resolvePath = (s) => {
            var result = resolvePath(s);
            resolvePathLog[s] = result;
            return result;
        };
    }

    export function writeIOLog(fileNames: string[], dstPath: string) {
        var log: IOLog = {
            fileNames: fileNames,
            resolvePath: resolvePathLog
        };

        writeFile(dstPath, JSON.stringify(log));
    }

    export function prepare(cmd: ts.ParsedCommandLine): IO {
        var content = readFile(cmd.fileNames[0]);
        if (content === undefined) {
            throw new Error('Invalid file: ' + cmd.fileNames[0])
        }
        try {
            var log = <IOLog>JSON.parse(content);
        } catch (err) {
            write("Invalid IO log file, expecting JSON")
        }

        cmd.fileNames = []
        var files: ts.Map<string> = {};
        log.fileNames.forEach(f => {
            files[f] = readFile(f);
            cmd.fileNames.push(f)
        })

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

        ts.sys.write = (s: string) => {
            out += s;
        };

        return {
            getOut: () => out,
        };
    }
}
