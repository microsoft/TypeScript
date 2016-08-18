/// <reference path="..\src\compiler\sys.ts"/>
/// <reference path="..\src\compiler\types.ts"/>

namespace perftest {
    interface IOLog {
        resolvePath: ts.Map<string>;
        fileNames: string[];
    }

    export interface IO {
        getOut(): string;
    }

    export const readFile = ts.sys.readFile;
    const writeFile = ts.sys.writeFile;
    export const write = ts.sys.write;
    const resolvePath = ts.sys.resolvePath;
    export const getExecutingFilePath = ts.sys.getExecutingFilePath;
    export const getCurrentDirectory = ts.sys.getCurrentDirectory;
    // const exit = ts.sys.exit;

    const args = ts.sys.args;

    // augment sys so first ts.executeCommandLine call will be finish silently
    ts.sys.write = (s: string) => { };
    ts.sys.exit = (code: number) => { };
    ts.sys.args = [];

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

    const resolvePathLog: ts.Map<string> = {};

    export function interceptIO() {
        ts.sys.resolvePath = (s) => {
            const result = resolvePath(s);
            resolvePathLog[s] = result;
            return result;
        };
    }

    export function writeIOLog(fileNames: string[]) {
        const path = args[1];
        const log: IOLog = {
            fileNames: fileNames,
            resolvePath: resolvePathLog
        };

        writeFile(path, JSON.stringify(log));
    }

    export function prepare(): IO {
        const log = <IOLog>JSON.parse(readFile(args[0]));

        const files: ts.Map<string> = {};
        log.fileNames.forEach(f => { files[f] = readFile(f); });

        ts.sys.createDirectory = (s: string) => { };
        ts.sys.directoryExists = (s: string) => true;
        ts.sys.fileExists = (s: string) => true;

        const currentDirectory = ts.sys.getCurrentDirectory();
        ts.sys.getCurrentDirectory = () => currentDirectory;

        const executingFilePath = ts.sys.getExecutingFilePath();
        ts.sys.getExecutingFilePath = () => executingFilePath;

        ts.sys.readFile = (s: string) => {
            return files[s];
        };

        ts.sys.resolvePath = (s: string) => {
            const path = log.resolvePath[s];
            if (!path) {
                throw new Error("Unexpected path '" + s + "'");
            }
            return path;
        };

        ts.sys.writeFile = (path: string, data: string) => { };

        let out = "";

        ts.sys.write = (s: string) => { out += s; };

        return {
            getOut: () => out,
        };
    }
}
