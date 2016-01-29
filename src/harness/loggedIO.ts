/// <reference path="..\..\src\compiler\sys.ts" />
/// <reference path="..\..\src\harness\harness.ts" />
/// <reference path="..\..\src\harness\runnerbase.ts" />
/* tslint:disable:no-null */

interface FileInformation {
    contents: string;
    codepage: number;
}

interface FindFileResult {

}

interface IOLog {
    timestamp: string;
    arguments: string[];
    executingPath: string;
    currentDirectory: string;
    useCustomLibraryFile?: boolean;
    filesRead: {
        path: string;
        codepage: number;
        result?: FileInformation;
    }[];
    filesWritten: {
        path: string;
        contents: string;
        bom: boolean;
    }[];
    filesDeleted: string[];
    filesAppended: {
        path: string;
        contents: string;
    }[];
    fileExists: {
        path: string;
        result?: boolean;
    }[];
    filesFound: {
        path: string;
        pattern: string;
        result?: FindFileResult;
    }[];
    dirs: {
        path: string;
        re: string;
        re_m: boolean;
        re_g: boolean;
        re_i: boolean;
        opts: { recursive?: boolean; };
        result?: string[];
    }[];
    dirExists: {
        path: string;
        result?: boolean;
    }[];
    dirsCreated: string[];
    pathsResolved: {
        path: string;
        result?: string;
    }[];
    directoriesRead: {
        path: string,
        extension: string,
        exclude: string[],
        result: string[]
    }[];
}

interface PlaybackControl {
    startReplayFromFile(logFileName: string): void;
    startReplayFromString(this: PlaybackControl, logContents: string): void;
    startReplayFromData(this: PlaybackControl, log: IOLog): void;
    endReplay(): void;
    startRecord(logFileName: string): void;
    endRecord(this: PlaybackControl): void;
}

namespace Playback {
    let recordLog: IOLog = undefined;
    let replayLog: IOLog = undefined;
    let recordLogFileNameBase = "";

    interface Memoized<T> {
        (s: string): T;
        reset(): void;
    }

    function memoize<T>(func: (s: string) => T): Memoized<T> {
        let lookup: { [s: string]: T } = {};
        const run: Memoized<T> = <Memoized<T>>((s: string) => {
            if (lookup.hasOwnProperty(s)) return lookup[s];
            return lookup[s] = func(s);
        });
        run.reset = () => {
            lookup = null;
        };

        return run;
    }

    export interface PlaybackIO extends Harness.IO, PlaybackControl { }

    export interface PlaybackSystem extends ts.System, PlaybackControl { }

    function createEmptyLog(): IOLog {
        return {
            timestamp: (new Date()).toString(),
            arguments: [],
            currentDirectory: "",
            filesRead: [],
            directoriesRead: [],
            filesWritten: [],
            filesDeleted: [],
            filesAppended: [],
            fileExists: [],
            filesFound: [],
            dirs: [],
            dirExists: [],
            dirsCreated: [],
            pathsResolved: [],
            executingPath: ""
        };
    }

    function initWrapper(wrapper: PlaybackSystem, underlying: ts.System): void;
    function initWrapper(wrapper: PlaybackIO, underlying: Harness.IO): void;
    function initWrapper(wrapper: PlaybackSystem | PlaybackIO, underlying: ts.System | Harness.IO): void {
        // TODO: Define a common interface over ts.System | Harness.IO and stop passing a union type.
        const underlyingShim: any = underlying;
        ts.forEach(Object.keys(underlying), prop => {
            (<any>wrapper)[prop] = (<any>underlying)[prop];
        });

        wrapper.startReplayFromString = logString => {
            wrapper.startReplayFromData(JSON.parse(logString));
        };
        wrapper.startReplayFromData = log => {
            replayLog = log;
            // Remove non-found files from the log (shouldn't really need them, but we still record them for diganostic purposes)
            replayLog.filesRead = replayLog.filesRead.filter(f => f.result.contents !== undefined);
        };

        wrapper.endReplay = () => {
            replayLog = undefined;
        };

        wrapper.startRecord = (fileNameBase) => {
            recordLogFileNameBase = fileNameBase;
            recordLog = createEmptyLog();

            if (typeof underlying.args !== "function") {
                recordLog.arguments = <string[]>underlying.args;
            }
        };

        wrapper.startReplayFromFile = logFn => {
            wrapper.startReplayFromString(underlyingShim.readFile(logFn));
        };
        wrapper.endRecord = () => {
            if (recordLog !== undefined) {
                let i = 0;
                const fn = () => recordLogFileNameBase + i + ".json";
                while (underlyingShim.fileExists(fn())) i++;
                underlyingShim.writeFile(fn(), JSON.stringify(recordLog));
                recordLog = undefined;
            }
        };

        wrapper.fileExists = recordReplay(wrapper.fileExists, underlying)(
            path => callAndRecord(underlyingShim.fileExists(path), recordLog.fileExists, { path }),
            memoize(path => {
                // If we read from the file, it must exist
                if (findResultByPath(wrapper, replayLog.filesRead, path, null) !== null) {
                    return true;
                }
                else {
                    return findResultByFields(replayLog.fileExists, { path }, /*defaultValue*/ false);
                }
            })
        );

        wrapper.getExecutingFilePath = () => {
            if (replayLog !== undefined) {
                return replayLog.executingPath;
            }
            else if (recordLog !== undefined) {
                return recordLog.executingPath = underlyingShim.getExecutingFilePath();
            }
            else {
                return underlyingShim.getExecutingFilePath();
            }
        };

        wrapper.getCurrentDirectory = () => {
            if (replayLog !== undefined) {
                return replayLog.currentDirectory || "";
            }
            else if (recordLog !== undefined) {
                return recordLog.currentDirectory = underlyingShim.getCurrentDirectory();
            }
            else {
                return underlyingShim.getCurrentDirectory();
            }
        };

        wrapper.resolvePath = recordReplay(wrapper.resolvePath, underlying)(
            path => callAndRecord(underlyingShim.resolvePath(path), recordLog.pathsResolved, { path }),
            memoize(path => findResultByFields(replayLog.pathsResolved, { path }, !ts.isRootedDiskPath(ts.normalizeSlashes(path)) && replayLog.currentDirectory ? replayLog.currentDirectory + "/" + path : ts.normalizeSlashes(path))));

        wrapper.readFile = recordReplay(wrapper.readFile, underlying)(
            path => {
                const result = underlyingShim.readFile(path);
                const logEntry = { path, codepage: 0, result: { contents: result, codepage: 0 } };
                recordLog.filesRead.push(logEntry);
                return result;
            },
            memoize(path => findResultByPath(wrapper, replayLog.filesRead, path).contents));

        wrapper.readDirectory = recordReplay(wrapper.readDirectory, underlying)(
            (path, extension, exclude) => {
                const result = (<ts.System>underlying).readDirectory(path, extension, exclude);
                const logEntry = { path, extension, exclude, result };
                recordLog.directoriesRead.push(logEntry);
                return result;
            },
            (path, extension, exclude) => findResultByPath(wrapper, replayLog.directoriesRead.filter(d => d.extension === extension && ts.arrayIsEqualTo(d.exclude, exclude)), path));

        wrapper.writeFile = recordReplay(wrapper.writeFile, underlying)(
            (path: string, contents: string) => callAndRecord(underlyingShim.writeFile(path, contents), recordLog.filesWritten, { path, contents, bom: false }),
            (path: string, contents: string) => noOpReplay("writeFile"));

        wrapper.exit = (exitCode) => {
            if (recordLog !== undefined) {
                wrapper.endRecord();
            }
            underlyingShim.exit(exitCode);
        };
    }

    function recordReplay<T extends Function>(original: T, underlying: any) {
        function createWrapper(record: T, replay: T): T {
            return <any>(function () {
                if (replayLog !== undefined) {
                    return replay.apply(undefined, arguments);
                }
                else if (recordLog !== undefined) {
                    return record.apply(undefined, arguments);
                }
                else {
                    return original.apply(underlying, arguments);
                }
            });
        }
        return createWrapper;
    }

    function callAndRecord<T, U>(underlyingResult: T, logArray: U[], logEntry: U): T {
        if (underlyingResult !== undefined) {
            (<any>logEntry).result = underlyingResult;
        }
        logArray.push(logEntry);
        return underlyingResult;
    }

    function findResultByFields<T>(logArray: { result?: T }[], expectedFields: {}, defaultValue?: T): T {
        const predicate = (entry: { result?: T }) => {
            return Object.getOwnPropertyNames(expectedFields).every((name) => (<any>entry)[name] === (<any>expectedFields)[name]);
        };
        const results = logArray.filter(entry => predicate(entry));
        if (results.length === 0) {
            if (defaultValue !== undefined) {
                return defaultValue;
            }
            else {
                throw new Error("No matching result in log array for: " + JSON.stringify(expectedFields));
            }
        }
        return results[0].result;
    }

    function findResultByPath<T>(wrapper: { resolvePath(s: string): string }, logArray: { path: string; result?: T }[], expectedPath: string, defaultValue?: T): T {
        const normalizedName = ts.normalizePath(expectedPath).toLowerCase();
        // Try to find the result through normal fileName
        for (let i = 0; i < logArray.length; i++) {
            if (ts.normalizeSlashes(logArray[i].path).toLowerCase() === normalizedName) {
                return logArray[i].result;
            }
        }
        // Fallback, try to resolve the target paths as well
        if (replayLog.pathsResolved.length > 0) {
            const normalizedResolvedName = wrapper.resolvePath(expectedPath).toLowerCase();
            for (let i = 0; i < logArray.length; i++) {
                if (wrapper.resolvePath(logArray[i].path).toLowerCase() === normalizedResolvedName) {
                    return logArray[i].result;
                }
            }
        }

        // If we got here, we didn't find a match
        if (defaultValue === undefined) {
            throw new Error("No matching result in log array for path: " + expectedPath);
        }
        else {
            return defaultValue;
        }
    }

    function noOpReplay(name: string) {
        // console.log("Swallowed write operation during replay: " + name);
    }

    export function wrapIO(underlying: Harness.IO): PlaybackIO {
        const wrapper: PlaybackIO = <any>{};
        initWrapper(wrapper, underlying);

        wrapper.directoryName = (path): string => { throw new Error("NotSupported"); };
        wrapper.createDirectory = (path): void => { throw new Error("NotSupported"); };
        wrapper.directoryExists = (path): boolean => { throw new Error("NotSupported"); };
        wrapper.deleteFile = (path): void => { throw new Error("NotSupported"); };
        wrapper.listFiles = (path, filter, options): string[] => { throw new Error("NotSupported"); };

        return wrapper;
    }

    export function wrapSystem(underlying: ts.System): PlaybackSystem {
        const wrapper: PlaybackSystem = <any>{};
        initWrapper(wrapper, underlying);
        return wrapper;
    }
}