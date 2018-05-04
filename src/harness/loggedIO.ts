/// <reference path="..\..\src\compiler\sys.ts" />
/// <reference path="..\..\src\harness\harness.ts" />
/// <reference path="..\..\src\harness\harnessLanguageService.ts" />
/// <reference path="..\..\src\harness\runnerbase.ts" />
/// <reference path="..\..\src\harness\typeWriter.ts" />

interface FileInformation {
    contents?: string;
    contentsPath?: string;
    codepage: number;
    bom?: string;
}

interface FindFileResult {
}

interface IoLogFile {
    path: string;
    codepage: number;
    result?: FileInformation;
}

interface IoLog {
    timestamp: string;
    arguments: string[];
    executingPath: string;
    currentDirectory: string;
    useCustomLibraryFile?: boolean;
    filesRead: IoLogFile[];
    filesWritten: {
        path: string;
        contents?: string;
        contentsPath?: string;
        bom: boolean;
    }[];
    filesDeleted: string[];
    filesAppended: {
        path: string;
        contents?: string;
        contentsPath?: string;
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
        extensions: ReadonlyArray<string>,
        exclude: ReadonlyArray<string>,
        include: ReadonlyArray<string>,
        depth: number,
        result: ReadonlyArray<string>,
    }[];
    useCaseSensitiveFileNames?: boolean;
}

interface PlaybackControl {
    startReplayFromFile(logFileName: string): void;
    startReplayFromString(logContents: string): void;
    startReplayFromData(log: IoLog): void;
    endReplay(): void;
    startRecord(logFileName: string): void;
    endRecord(): void;
}

namespace Playback {
    let recordLog: IoLog;
    let replayLog: IoLog;
    let replayFilesRead: ts.Map<IoLogFile> | undefined;
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
            lookup = undefined;
        };

        return run;
    }

    export interface PlaybackIO extends Harness.IO, PlaybackControl { }

    export interface PlaybackSystem extends ts.System, PlaybackControl { }

    function createEmptyLog(): IoLog {
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

    export function newStyleLogIntoOldStyleLog(log: IoLog, host: ts.System | Harness.IO, baseName: string) {
        for (const file of log.filesAppended) {
            if (file.contentsPath) {
                file.contents = host.readFile(ts.combinePaths(baseName, file.contentsPath));
                delete file.contentsPath;
            }
        }
        for (const file of log.filesWritten) {
            if (file.contentsPath) {
                file.contents = host.readFile(ts.combinePaths(baseName, file.contentsPath));
                delete file.contentsPath;
            }
        }
        for (const file of log.filesRead) {
            if (file.result.contentsPath) {
                // `readFile` strips away a BOM (and actually reinerprets the file contents according to the correct encoding)
                // - but this has the unfortunate sideeffect of removing the BOM from any outputs based on the file, so we readd it here.
                file.result.contents = (file.result.bom || "") + host.readFile(ts.combinePaths(baseName, file.result.contentsPath));
                delete file.result.contentsPath;
            }
        }
        return log;
    }

    const canonicalizeForHarness = ts.createGetCanonicalFileName(/*caseSensitive*/ false); // This is done so tests work on windows _and_ linux
    function sanitizeTestFilePath(name: string) {
        const path = ts.toPath(ts.normalizeSlashes(name.replace(/[\^<>:"|?*%]/g, "_")).replace(/\.\.\//g, "__dotdot/"), "", canonicalizeForHarness);
        if (ts.startsWith(path, "/")) {
            return path.substring(1);
        }
        return path;
    }

    export function oldStyleLogIntoNewStyleLog(log: IoLog, writeFile: typeof Harness.IO.writeFile, baseTestName: string) {
        if (log.filesAppended) {
            for (const file of log.filesAppended) {
                if (file.contents !== undefined) {
                    file.contentsPath = ts.combinePaths("appended", sanitizeTestFilePath(file.path));
                    writeFile(ts.combinePaths(baseTestName, file.contentsPath), file.contents);
                    delete file.contents;
                }
            }
        }
        if (log.filesWritten) {
            for (const file of log.filesWritten) {
                if (file.contents !== undefined) {
                    file.contentsPath = ts.combinePaths("written", sanitizeTestFilePath(file.path));
                    writeFile(ts.combinePaths(baseTestName, file.contentsPath), file.contents);
                    delete file.contents;
                }
            }
        }
        if (log.filesRead) {
            for (const file of log.filesRead) {
                const { contents } = file.result;
                if (contents !== undefined) {
                    file.result.contentsPath = ts.combinePaths("read", sanitizeTestFilePath(file.path));
                    writeFile(ts.combinePaths(baseTestName, file.result.contentsPath), contents);
                    const len = contents.length;
                    if (len >= 2 && contents.charCodeAt(0) === 0xfeff) {
                        file.result.bom = "\ufeff";
                    }
                    if (len >= 2 && contents.charCodeAt(0) === 0xfffe) {
                        file.result.bom = "\ufffe";
                    }
                    if (len >= 3 && contents.charCodeAt(0) === 0xefbb && contents.charCodeAt(1) === 0xbf) {
                        file.result.bom = "\uefbb\xbf";
                    }
                    delete file.result.contents;
                }
            }
        }
        return log;
    }

    function initWrapper(wrapper: PlaybackSystem, underlying: ts.System): void;
    function initWrapper(wrapper: PlaybackIO, underlying: Harness.IO): void;
    function initWrapper(wrapper: PlaybackSystem | PlaybackIO, underlying: ts.System | Harness.IO): void {
        ts.forEach(Object.keys(underlying), prop => {
            (<any>wrapper)[prop] = (<any>underlying)[prop];
        });

        wrapper.startReplayFromString = logString => {
            wrapper.startReplayFromData(JSON.parse(logString));
        };
        wrapper.startReplayFromData = log => {
            replayLog = log;
            // Remove non-found files from the log (shouldn't really need them, but we still record them for diagnostic purposes)
            replayLog.filesRead = replayLog.filesRead.filter(f => f.result.contents !== undefined);
            replayFilesRead = ts.createMap();
            for (const file of replayLog.filesRead) {
                replayFilesRead.set(ts.normalizeSlashes(file.path).toLowerCase(), file);
            }
        };

        wrapper.endReplay = () => {
            replayLog = undefined;
            replayFilesRead = undefined;
        };

        wrapper.startRecord = (fileNameBase) => {
            recordLogFileNameBase = fileNameBase;
            recordLog = createEmptyLog();
            recordLog.useCaseSensitiveFileNames = typeof underlying.useCaseSensitiveFileNames === "function" ? underlying.useCaseSensitiveFileNames() : underlying.useCaseSensitiveFileNames;
            if (typeof underlying.args !== "function") {
                recordLog.arguments = underlying.args;
            }
        };

        wrapper.startReplayFromFile = logFn => {
            wrapper.startReplayFromString(underlying.readFile(logFn));
        };
        wrapper.endRecord = () => {
            if (recordLog !== undefined) {
                let i = 0;
                const getBase = () => recordLogFileNameBase + i;
                while (underlying.fileExists(ts.combinePaths(getBase(), "test.json"))) i++;
                const newLog = oldStyleLogIntoNewStyleLog(recordLog, (path, str) => underlying.writeFile(path, str), getBase());
                underlying.writeFile(ts.combinePaths(getBase(), "test.json"), JSON.stringify(newLog, null, 4)); // tslint:disable-line:no-null-keyword
                const syntheticTsconfig = generateTsconfig(newLog);
                if (syntheticTsconfig) {
                    underlying.writeFile(ts.combinePaths(getBase(), "tsconfig.json"), JSON.stringify(syntheticTsconfig, null, 4)); // tslint:disable-line:no-null-keyword
                }
                recordLog = undefined;
            }
        };

        function generateTsconfig(newLog: IoLog): undefined | { compilerOptions: ts.CompilerOptions, files: string[] } {
            if (newLog.filesRead.some(file => /tsconfig.+json$/.test(file.path))) {
                return;
            }
            const files = [];
            for (const file of newLog.filesRead) {
                if (file.result.contentsPath &&
                    Harness.isDefaultLibraryFile(file.result.contentsPath) &&
                    /\.[tj]s$/.test(file.result.contentsPath)) {
                    files.push(file.result.contentsPath);
                }
            }
            return { compilerOptions: ts.parseCommandLine(newLog.arguments).options, files };
        }

        wrapper.fileExists = recordReplay(wrapper.fileExists, underlying)(
            path => callAndRecord(underlying.fileExists(path), recordLog.fileExists, { path }),
            memoize(path => {
                // If we read from the file, it must exist
                if (findFileByPath(path, /*throwFileNotFoundError*/ false)) {
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
                return recordLog.executingPath = underlying.getExecutingFilePath();
            }
            else {
                return underlying.getExecutingFilePath();
            }
        };

        wrapper.getCurrentDirectory = () => {
            if (replayLog !== undefined) {
                return replayLog.currentDirectory || "";
            }
            else if (recordLog !== undefined) {
                return recordLog.currentDirectory = underlying.getCurrentDirectory();
            }
            else {
                return underlying.getCurrentDirectory();
            }
        };

        wrapper.resolvePath = recordReplay(wrapper.resolvePath, underlying)(
            path => callAndRecord(underlying.resolvePath(path), recordLog.pathsResolved, { path }),
            memoize(path => findResultByFields(replayLog.pathsResolved, { path }, !ts.isRootedDiskPath(ts.normalizeSlashes(path)) && replayLog.currentDirectory ? replayLog.currentDirectory + "/" + path : ts.normalizeSlashes(path))));

        wrapper.readFile = recordReplay(wrapper.readFile, underlying)(
            (path: string) => {
                const result = underlying.readFile(path);
                const logEntry = { path, codepage: 0, result: { contents: result, codepage: 0 } };
                recordLog.filesRead.push(logEntry);
                return result;
            },
            memoize(path => findFileByPath(path, /*throwFileNotFoundError*/ true).contents));

        wrapper.readDirectory = recordReplay(wrapper.readDirectory, underlying)(
            (path, extensions, exclude, include, depth) => {
                const result = (<ts.System>underlying).readDirectory(path, extensions, exclude, include, depth);
                recordLog.directoriesRead.push({ path, extensions, exclude, include, depth, result });
                return result;
            },
            path => {
                // Because extensions is an array of all allowed extension, we will want to merge each of the replayLog.directoriesRead into one
                // if each of the directoriesRead has matched path with the given path (directory with same path but different extension will considered
                // different entry).
                // TODO (yuisu): We can certainly remove these once we recapture the RWC using new API
                const normalizedPath = ts.normalizePath(path).toLowerCase();
                return ts.flatMap(replayLog.directoriesRead, directory => {
                    if (ts.normalizeSlashes(directory.path).toLowerCase() === normalizedPath) {
                        return directory.result;
                    }
                });
            });

        wrapper.writeFile = recordReplay(wrapper.writeFile, underlying)(
            (path: string, contents: string) => callAndRecord(underlying.writeFile(path, contents), recordLog.filesWritten, { path, contents, bom: false }),
            () => noOpReplay("writeFile"));

        wrapper.exit = (exitCode) => {
            if (recordLog !== undefined) {
                wrapper.endRecord();
            }
            underlying.exit(exitCode);
        };

        wrapper.useCaseSensitiveFileNames = () => {
            if (replayLog !== undefined) {
                return !!replayLog.useCaseSensitiveFileNames;
            }
            return typeof underlying.useCaseSensitiveFileNames === "function" ? underlying.useCaseSensitiveFileNames() : underlying.useCaseSensitiveFileNames;
        };
    }

    function recordReplay<T extends ts.AnyFunction>(original: T, underlying: any) {
        function createWrapper(record: T, replay: T): T {
            // tslint:disable-next-line only-arrow-functions
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

    function findFileByPath(expectedPath: string, throwFileNotFoundError: boolean): FileInformation {
        const normalizedName = ts.normalizePath(expectedPath).toLowerCase();
        // Try to find the result through normal fileName
        const result = replayFilesRead.get(normalizedName);
        if (result) {
            return result.result;
        }

        // If we got here, we didn't find a match
        if (throwFileNotFoundError) {
            throw new Error("No matching result in log array for path: " + expectedPath);
        }
        else {
            return undefined;
        }
    }

    function noOpReplay(_name: string) {
        // console.log("Swallowed write operation during replay: " + name);
    }

    export function wrapIO(underlying: Harness.IO): PlaybackIO {
        const wrapper: PlaybackIO = <any>{};
        initWrapper(wrapper, underlying);

        wrapper.directoryName = notSupported;
        wrapper.createDirectory = notSupported;
        wrapper.directoryExists = notSupported;
        wrapper.deleteFile = notSupported;
        wrapper.listFiles = notSupported;

        return wrapper;

        function notSupported(): never {
            throw new Error("NotSupported");
        }
    }

    export function wrapSystem(underlying: ts.System): PlaybackSystem {
        const wrapper: PlaybackSystem = <any>{};
        initWrapper(wrapper, underlying);
        return wrapper;
    }
}
