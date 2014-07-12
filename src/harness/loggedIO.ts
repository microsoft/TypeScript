/// <reference path="..\..\src\compiler\sys.ts" />

interface FileInformation {
    contents: string;
    codepage: number;
}

interface FindFileResult {

}

interface IOLog {
    arguments: string[];
    executingPath: string;
    currentDirectory: string;
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
}

interface PlaybackControl {
    startReplayFromFile(logFilename: string): void;
    startReplayFromString(logContents: string): void;
    startReplayFromData(log: IOLog): void;
    endReplay(): void;
    startRecord(logFilename: string): void;
    endRecord(): void;
}

module Playback {
    var recordLog: IOLog = undefined;
    var replayLog: IOLog = undefined;
    var recordLogFilenameBase = '';

    interface Memoized<T> {
        (s: string): T;
        reset(): void;
    }

    function memoize<T>(func: (s: string) => T): Memoized<T> {
        var lookup: { [s: string]: T } = {};
        var run: Memoized<T> = <Memoized<T>>((s: string) => {
            if (lookup.hasOwnProperty(s)) return lookup[s];
            return lookup[s] = func(s);
        });
        run.reset = () => {
            lookup = null;
        };
    
        return run;
    }

    export interface PlaybackSystem extends System, PlaybackControl { }

    function createEmptyLog(): IOLog {
        return {
            arguments: [],
            currentDirectory: '',
            filesRead: [],
            filesWritten: [],
            filesDeleted: [],
            filesAppended: [],
            fileExists: [],
            filesFound: [],
            dirs: [],
            dirExists: [],
            dirsCreated: [],
            pathsResolved: [],
            executingPath: ''
        };
    }

    function initWrapper<T>(wrapper: PlaybackControl, underlying: T) {
        Object.keys(underlying).forEach(prop => {
            (<any>wrapper)[prop] = (<any>underlying)[prop];
        });

        wrapper.startReplayFromString = logString => {
            wrapper.startReplayFromData(JSON.parse(logString));
        };
        wrapper.startReplayFromData = log => {
            replayLog = log;
        };

        wrapper.endReplay = () => {
            replayLog = undefined;
        };

        wrapper.startRecord = (filenameBase) => {
            recordLogFilenameBase = filenameBase;
            recordLog = createEmptyLog();
        };
    }

    function recordReplay<T extends Function>(original: T, underlying: any) {
        function createWrapper(record: T, replay: T): T {
            return <any>(() => {
                if (replayLog !== undefined) {
                    return replay.apply(undefined, arguments);
                } else if (recordLog !== undefined) {
                    return record.apply(undefined, arguments);
                } else {
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
        var predicate = (entry: { result?: T }) => {
            return Object.getOwnPropertyNames(expectedFields).every((name) => (<any>entry)[name] === (<any>expectedFields)[name]);
        };
        var results = logArray.filter(entry => predicate(entry));
        if (results.length === 0) {
            if (defaultValue !== undefined) {
                return defaultValue;
            } else {
                throw new Error('No matching result in log array for: ' + JSON.stringify(expectedFields));
            }
        }
        return results[0].result;
    }

    function findResultByPath<T>(wrapper: { resolvePath(s: string): string }, logArray: { path: string; result?: T }[], expectedPath: string, defaultValue?: T): T {
        var results = logArray.filter(e => pathsAreEquivalent(e.path, expectedPath, wrapper));
        if (results.length === 0) {
            if (defaultValue === undefined) {
                console.log('Resolved path: ' + wrapper.resolvePath(expectedPath));
                console.log('Filenames were: ' + logArray.map(x => x.path).join(', '));
                throw new Error('No matching result in log array for path: ' + expectedPath);
            } else {
                return defaultValue;
            }
        }
        return results[0].result;
    }

    function pathsAreEquivalent(left: string, right: string, wrapper: { resolvePath(s: string): string }) {
        function areSame(a: string, b: string) {
            return Harness.Path.switchToForwardSlashes(a).toLowerCase() === Harness.Path.switchToForwardSlashes(b).toLowerCase();
        }
        return areSame(left, right) || areSame(wrapper.resolvePath(left), right) || areSame(left, wrapper.resolvePath(right)) || areSame(wrapper.resolvePath(left), wrapper.resolvePath(right));
    }

    function noOpReplay(name: string) {
        console.log("Swallowed write operation during replay: " + name);
    }

    export function wrapSystem(underlying: System): PlaybackSystem {
        var wrapper: PlaybackSystem = <any>{};
        initWrapper(wrapper, underlying);

        wrapper.startReplayFromFile = logFn => {
            wrapper.startReplayFromString(underlying.readFile(logFn));
        };
        wrapper.endRecord = () => {
            if (recordLog !== undefined) {
                var i = 0;
                var fn = () => recordLogFilenameBase + i + '.json';
                while (underlying.fileExists(fn())) i++;
                underlying.writeFile(fn(), JSON.stringify(recordLog));
                recordLog = undefined;
            }
        };

        Object.defineProperty(wrapper, 'args', {
            get() {
                if (replayLog !== undefined) {
                    return replayLog.arguments;
                } else if (recordLog !== undefined) {
                    recordLog.arguments = underlying.args;
                }
                return underlying.args;
            }
        });


        wrapper.fileExists = recordReplay(wrapper.fileExists, underlying)(
            (path) => callAndRecord(underlying.fileExists(path), recordLog.fileExists, { path: path }),
            memoize((path) => {
                // If we read from the file, it must exist
                if (findResultByPath(wrapper, replayLog.filesRead, path, null) !== null) {
                    return true;
                } else {
                    return findResultByFields(replayLog.fileExists, { path: path }, false);
                }
            })
        );

        wrapper.getExecutingFilePath = () => {
            if (replayLog !== undefined) {
                return replayLog.executingPath;
            } else if (recordLog !== undefined) {
                return recordLog.executingPath = underlying.getExecutingFilePath();
            } else {
                return underlying.getExecutingFilePath();
            }
        };

        wrapper.getCurrentDirectory = () => {
            if (replayLog !== undefined) {
                return replayLog.currentDirectory || '';
            } else if (recordLog !== undefined) {
                return recordLog.currentDirectory = underlying.getCurrentDirectory();
            } else {
                return underlying.getCurrentDirectory();
            }
        };

        wrapper.resolvePath = recordReplay(wrapper.resolvePath, underlying)(
            (path) => callAndRecord(underlying.resolvePath(path), recordLog.pathsResolved, { path: path }),
            memoize((path) => findResultByFields(replayLog.pathsResolved, { path: path }, replayLog.currentDirectory ? replayLog.currentDirectory + '/' + path : path)));

        wrapper.readFile = recordReplay(wrapper.readFile, underlying)(
            (path) => callAndRecord(underlying.readFile(path), recordLog.filesRead, { path: path, codepage: 0 }),
            memoize((path) => findResultByPath(wrapper, replayLog.filesRead, path).contents));

        wrapper.writeFile = recordReplay(wrapper.writeFile, underlying)(
            (path, contents) => callAndRecord(underlying.writeFile(path, contents), recordLog.filesWritten, { path: path, contents: contents, bom: false }),
            (path, contents) => noOpReplay('writeFile'));

        wrapper.exit = (exitCode) => {
            if (recordLog !== undefined) {
                wrapper.endRecord();
            }
            underlying.exit(exitCode);
        };

        return wrapper;
    }
}