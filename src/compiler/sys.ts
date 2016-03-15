/// <reference path="core.ts"/>

namespace ts {
    export type FileWatcherCallback = (path: string, removed?: boolean) => void;
    export type DirectoryWatcherCallback = (path: string) => void;

    export interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        readFile(path: string, encoding?: string): string;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        watchFile?(path: Path, callback: FileWatcherCallback): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        resolvePath(path: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        readDirectory(path: string, extension?: string, exclude?: string[]): string[];
        getMemoryUsage?(): number;
        exit(exitCode?: number): void;
    }

    interface WatchedFile {
        filePath: Path;
        callback: FileWatcherCallback;
        mtime?: Date;
    }

    export interface FileWatcher {
        close(): void;
    }

    export interface DirectoryWatcher extends FileWatcher {
        directoryPath: Path;
        referenceCount: number;
    }

    declare var require: any;
    declare var module: any;
    declare var process: any;
    declare var global: any;
    declare var __filename: string;
    declare var Buffer: {
        new (str: string, encoding?: string): any;
    };

    declare class Enumerator {
        public atEnd(): boolean;
        public moveNext(): boolean;
        public item(): any;
        constructor(o: any);
    }

    declare var ChakraHost: {
        args: string[];
        currentDirectory: string;
        executingFile: string;
        newLine?: string;
        useCaseSensitiveFileNames?: boolean;
        echo(s: string): void;
        quit(exitCode?: number): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        resolvePath(path: string): string;
        readFile(path: string): string;
        writeFile(path: string, contents: string): void;
        readDirectory(path: string, extension?: string, exclude?: string[]): string[];
        watchFile?(path: string, callback: FileWatcherCallback): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
    };

    export var sys: System = (function() {

        function getWScriptSystem(): System {

            const fso = new ActiveXObject("Scripting.FileSystemObject");

            const fileStream = new ActiveXObject("ADODB.Stream");
            fileStream.Type = 2 /*text*/;

            const binaryStream = new ActiveXObject("ADODB.Stream");
            binaryStream.Type = 1 /*binary*/;

            const args: string[] = [];
            for (let i = 0; i < WScript.Arguments.length; i++) {
                args[i] = WScript.Arguments.Item(i);
            }

            function readFile(fileName: string, encoding?: string): string {
                if (!fso.FileExists(fileName)) {
                    return undefined;
                }
                fileStream.Open();
                try {
                    if (encoding) {
                        fileStream.Charset = encoding;
                        fileStream.LoadFromFile(fileName);
                    }
                    else {
                        // Load file and read the first two bytes into a string with no interpretation
                        fileStream.Charset = "x-ansi";
                        fileStream.LoadFromFile(fileName);
                        const bom = fileStream.ReadText(2) || "";
                        // Position must be at 0 before encoding can be changed
                        fileStream.Position = 0;
                        // [0xFF,0xFE] and [0xFE,0xFF] mean utf-16 (little or big endian), otherwise default to utf-8
                        fileStream.Charset = bom.length >= 2 && (bom.charCodeAt(0) === 0xFF && bom.charCodeAt(1) === 0xFE || bom.charCodeAt(0) === 0xFE && bom.charCodeAt(1) === 0xFF) ? "unicode" : "utf-8";
                    }
                    // ReadText method always strips byte order mark from resulting string
                    return fileStream.ReadText();
                }
                catch (e) {
                    throw e;
                }
                finally {
                    fileStream.Close();
                }
            }

            function writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void {
                fileStream.Open();
                binaryStream.Open();
                try {
                    // Write characters in UTF-8 encoding
                    fileStream.Charset = "utf-8";
                    fileStream.WriteText(data);
                    // If we don't want the BOM, then skip it by setting the starting location to 3 (size of BOM).
                    // If not, start from position 0, as the BOM will be added automatically when charset==utf8.
                    if (writeByteOrderMark) {
                        fileStream.Position = 0;
                    }
                    else {
                        fileStream.Position = 3;
                    }
                    fileStream.CopyTo(binaryStream);
                    binaryStream.SaveToFile(fileName, 2 /*overwrite*/);
                }
                finally {
                    binaryStream.Close();
                    fileStream.Close();
                }
            }

            function getCanonicalPath(path: string): string {
                return path.toLowerCase();
            }

            function getNames(collection: any): string[] {
                const result: string[] = [];
                for (let e = new Enumerator(collection); !e.atEnd(); e.moveNext()) {
                    result.push(e.item().Name);
                }
                return result.sort();
            }

            function readDirectory(path: string, extension?: string, exclude?: string[]): string[] {
                const result: string[] = [];
                exclude = map(exclude, s => getCanonicalPath(combinePaths(path, s)));
                visitDirectory(path);
                return result;
                function visitDirectory(path: string) {
                    const folder = fso.GetFolder(path || ".");
                    const files = getNames(folder.files);
                    for (const current of files) {
                        const name = combinePaths(path, current);
                        if ((!extension || fileExtensionIs(name, extension)) && !contains(exclude, getCanonicalPath(name))) {
                            result.push(name);
                        }
                    }
                    const subfolders = getNames(folder.subfolders);
                    for (const current of subfolders) {
                        const name = combinePaths(path, current);
                        if (!contains(exclude, getCanonicalPath(name))) {
                            visitDirectory(name);
                        }
                    }
                }
            }

            return {
                args,
                newLine: "\r\n",
                useCaseSensitiveFileNames: false,
                write(s: string): void {
                    WScript.StdOut.Write(s);
                },
                readFile,
                writeFile,
                resolvePath(path: string): string {
                    return fso.GetAbsolutePathName(path);
                },
                fileExists(path: string): boolean {
                    return fso.FileExists(path);
                },
                directoryExists(path: string) {
                    return fso.FolderExists(path);
                },
                createDirectory(directoryName: string) {
                    if (!this.directoryExists(directoryName)) {
                        fso.CreateFolder(directoryName);
                    }
                },
                getExecutingFilePath() {
                    return WScript.ScriptFullName;
                },
                getCurrentDirectory() {
                    return new ActiveXObject("WScript.Shell").CurrentDirectory;
                },
                readDirectory,
                exit(exitCode?: number): void {
                    try {
                        WScript.Quit(exitCode);
                    }
                    catch (e) {
                    }
                }
            };
        }

        function getNodeSystem(): System {
            const _fs = require("fs");
            const _path = require("path");
            const _os = require("os");

            // average async stat takes about 30 microseconds
            // set chunk size to do 30 files in < 1 millisecond
            function createPollingWatchedFileSet(interval = 2500, chunkSize = 30) {
                let watchedFiles: WatchedFile[] = [];
                let nextFileToCheck = 0;
                let watchTimer: any;

                function getModifiedTime(fileName: string): Date {
                    return _fs.statSync(fileName).mtime;
                }

                function poll(checkedIndex: number) {
                    const watchedFile = watchedFiles[checkedIndex];
                    if (!watchedFile) {
                        return;
                    }

                    _fs.stat(watchedFile.filePath, (err: any, stats: any) => {
                        if (err) {
                            watchedFile.callback(watchedFile.filePath);
                        }
                        else if (watchedFile.mtime.getTime() !== stats.mtime.getTime()) {
                            watchedFile.mtime = getModifiedTime(watchedFile.filePath);
                            watchedFile.callback(watchedFile.filePath, watchedFile.mtime.getTime() === 0);
                        }
                    });
                }

                // this implementation uses polling and
                // stat due to inconsistencies of fs.watch
                // and efficiency of stat on modern filesystems
                function startWatchTimer() {
                    watchTimer = setInterval(() => {
                        let count = 0;
                        let nextToCheck = nextFileToCheck;
                        let firstCheck = -1;
                        while ((count < chunkSize) && (nextToCheck !== firstCheck)) {
                            poll(nextToCheck);
                            if (firstCheck < 0) {
                                firstCheck = nextToCheck;
                            }
                            nextToCheck++;
                            if (nextToCheck === watchedFiles.length) {
                                nextToCheck = 0;
                            }
                            count++;
                        }
                        nextFileToCheck = nextToCheck;
                    }, interval);
                }

                function addFile(filePath: Path, callback: FileWatcherCallback): WatchedFile {
                    const file: WatchedFile = {
                        filePath,
                        callback,
                        mtime: getModifiedTime(filePath)
                    };

                    watchedFiles.push(file);
                    if (watchedFiles.length === 1) {
                        startWatchTimer();
                    }
                    return file;
                }

                function removeFile(file: WatchedFile) {
                    watchedFiles = copyListRemovingItem(file, watchedFiles);
                }

                return {
                    getModifiedTime: getModifiedTime,
                    poll: poll,
                    startWatchTimer: startWatchTimer,
                    addFile: addFile,
                    removeFile: removeFile
                };
            }

            function createWatchedFileSet() {
                const dirWatchers = createFileMap<DirectoryWatcher>();
                // One file can have multiple watchers
                const fileWatcherCallbacks = createFileMap<FileWatcherCallback[]>();
                return { addFile, removeFile };

                function reduceDirWatcherRefCountForFile(filePath: Path) {
                    const dirPath = getDirectoryPath(filePath);
                    if (dirWatchers.contains(dirPath)) {
                        const watcher = dirWatchers.get(dirPath);
                        watcher.referenceCount -= 1;
                        if (watcher.referenceCount <= 0) {
                            watcher.close();
                            dirWatchers.remove(dirPath);
                        }
                    }
                }

                function addDirWatcher(dirPath: Path): void {
                    if (dirWatchers.contains(dirPath)) {
                        const watcher = dirWatchers.get(dirPath);
                        watcher.referenceCount += 1;
                        return;
                    }

                    const watcher: DirectoryWatcher = _fs.watch(
                        dirPath,
                        { persistent: true },
                        (eventName: string, relativeFileName: string) => fileEventHandler(eventName, relativeFileName, dirPath)
                    );
                    watcher.referenceCount = 1;
                    dirWatchers.set(dirPath, watcher);
                    return;
                }

                function addFileWatcherCallback(filePath: Path, callback: FileWatcherCallback): void {
                    if (fileWatcherCallbacks.contains(filePath)) {
                        fileWatcherCallbacks.get(filePath).push(callback);
                    }
                    else {
                        fileWatcherCallbacks.set(filePath, [callback]);
                    }
                }

                function addFile(filePath: Path, callback: FileWatcherCallback): WatchedFile {
                    addFileWatcherCallback(filePath, callback);
                    addDirWatcher(getDirectoryPath(filePath));

                    return { filePath, callback };
                }

                function removeFile(watchedFile: WatchedFile) {
                    removeFileWatcherCallback(watchedFile.filePath, watchedFile.callback);
                    reduceDirWatcherRefCountForFile(watchedFile.filePath);
                }

                function removeFileWatcherCallback(filePath: Path, callback: FileWatcherCallback) {
                    if (fileWatcherCallbacks.contains(filePath)) {
                        const newCallbacks = copyListRemovingItem(callback, fileWatcherCallbacks.get(filePath));
                        if (newCallbacks.length === 0) {
                            fileWatcherCallbacks.remove(filePath);
                        }
                        else {
                            fileWatcherCallbacks.set(filePath, newCallbacks);
                        }
                    }
                }

                /**
                 * @param watcherPath is the path from which the watcher is triggered.
                 */
                function fileEventHandler(eventName: string, relativeFileName: string, baseDirPath: Path) {
                    // When files are deleted from disk, the triggered "rename" event would have a relativefileName of "undefined"
                    const filePath = typeof relativeFileName !== "string"
                        ? undefined
                        : toPath(relativeFileName, baseDirPath, createGetCanonicalFileName(sys.useCaseSensitiveFileNames));
                    // Some applications save a working file via rename operations
                    if ((eventName === "change" || eventName === "rename") && fileWatcherCallbacks.contains(filePath)) {
                        for (const fileCallback of fileWatcherCallbacks.get(filePath)) {
                            fileCallback(filePath);
                        }
                    }
                }
            }

            // REVIEW: for now this implementation uses polling.
            // The advantage of polling is that it works reliably
            // on all os and with network mounted files.
            // For 90 referenced files, the average time to detect
            // changes is 2*msInterval (by default 5 seconds).
            // The overhead of this is .04 percent (1/2500) with
            // average pause of < 1 millisecond (and max
            // pause less than 1.5 milliseconds); question is
            // do we anticipate reference sets in the 100s and
            // do we care about waiting 10-20 seconds to detect
            // changes for large reference sets? If so, do we want
            // to increase the chunk size or decrease the interval
            // time dynamically to match the large reference set?
            const pollingWatchedFileSet = createPollingWatchedFileSet();
            const watchedFileSet = createWatchedFileSet();

            function isNode4OrLater(): boolean {
                return parseInt(process.version.charAt(1)) >= 4;
            }

            const platform: string = _os.platform();
            // win32\win64 are case insensitive platforms, MacOS (darwin) by default is also case insensitive
            const useCaseSensitiveFileNames = platform !== "win32" && platform !== "win64" && platform !== "darwin";

            function readFile(fileName: string, encoding?: string): string {
                if (!_fs.existsSync(fileName)) {
                    return undefined;
                }
                const buffer = _fs.readFileSync(fileName);
                let len = buffer.length;
                if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                    // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
                    // flip all byte pairs and treat as little endian.
                    len &= ~1;
                    for (let i = 0; i < len; i += 2) {
                        const temp = buffer[i];
                        buffer[i] = buffer[i + 1];
                        buffer[i + 1] = temp;
                    }
                    return buffer.toString("utf16le", 2);
                }
                if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                    // Little endian UTF-16 byte order mark detected
                    return buffer.toString("utf16le", 2);
                }
                if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                    // UTF-8 byte order mark detected
                    return buffer.toString("utf8", 3);
                }
                // Default is UTF-8 with no byte order mark
                return buffer.toString("utf8");
            }

            function writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void {
                // If a BOM is required, emit one
                if (writeByteOrderMark) {
                    data = "\uFEFF" + data;
                }

                let fd: number;

                try {
                    fd = _fs.openSync(fileName, "w");
                    _fs.writeSync(fd, data, undefined, "utf8");
                }
                finally {
                    if (fd !== undefined) {
                        _fs.closeSync(fd);
                    }
                }
            }

            function getCanonicalPath(path: string): string {
                return useCaseSensitiveFileNames ? path : path.toLowerCase();
            }

            function readDirectory(path: string, extension?: string, exclude?: string[]): string[] {
                const result: string[] = [];
                exclude = map(exclude, s => getCanonicalPath(combinePaths(path, s)));
                visitDirectory(path);
                return result;
                function visitDirectory(path: string) {
                    const files = _fs.readdirSync(path || ".").sort();
                    const directories: string[] = [];
                    for (const current of files) {
                        const name = combinePaths(path, current);
                        if (!contains(exclude, getCanonicalPath(name))) {
                            // fs.statSync would throw an exception if the file is a symlink
                            // whose linked file doesn't exist.
                            try {
                                const stat = _fs.statSync(name);
                                if (stat.isFile()) {
                                    if (!extension || fileExtensionIs(name, extension)) {
                                        result.push(name);
                                    }
                                }
                                else if (stat.isDirectory()) {
                                    directories.push(name);
                                }
                            }
                            catch (e) { }
                        }
                    }
                    for (const current of directories) {
                        visitDirectory(current);
                    }
                }
            }

            return {
                args: process.argv.slice(2),
                newLine: _os.EOL,
                useCaseSensitiveFileNames: useCaseSensitiveFileNames,
                write(s: string): void {
                    process.stdout.write(s);
                },
                readFile,
                writeFile,
                watchFile: (filePath, callback) => {
                    // Node 4.0 stablized the `fs.watch` function on Windows which avoids polling
                    // and is more efficient than `fs.watchFile` (ref: https://github.com/nodejs/node/pull/2649
                    // and https://github.com/Microsoft/TypeScript/issues/4643), therefore
                    // if the current node.js version is newer than 4, use `fs.watch` instead.
                    const watchSet = isNode4OrLater() ? watchedFileSet : pollingWatchedFileSet;
                    const watchedFile = watchSet.addFile(filePath, callback);
                    return {
                        close: () => watchSet.removeFile(watchedFile)
                    };
                },
                watchDirectory: (path, callback, recursive) => {
                    // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
                    // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
                    let options: any;
                    if (isNode4OrLater() && (process.platform === "win32" || process.platform === "darwin")) {
                        options = { persistent: true, recursive: !!recursive };
                    }
                    else {
                        options = { persistent: true };
                    }

                    return _fs.watch(
                        path,
                        options,
                        (eventName: string, relativeFileName: string) => {
                            // In watchDirectory we only care about adding and removing files (when event name is
                            // "rename"); changes made within files are handled by corresponding fileWatchers (when
                            // event name is "change")
                            if (eventName === "rename") {
                                // When deleting a file, the passed baseFileName is null
                                callback(!relativeFileName ? relativeFileName : normalizePath(combinePaths(path, relativeFileName)));
                            };
                        }
                    );
                },
                resolvePath: function(path: string): string {
                    return _path.resolve(path);
                },
                fileExists(path: string): boolean {
                    return _fs.existsSync(path);
                },
                directoryExists(path: string) {
                    return _fs.existsSync(path) && _fs.statSync(path).isDirectory();
                },
                createDirectory(directoryName: string) {
                    if (!this.directoryExists(directoryName)) {
                        _fs.mkdirSync(directoryName);
                    }
                },
                getExecutingFilePath() {
                    return __filename;
                },
                getCurrentDirectory() {
                    return process.cwd();
                },
                readDirectory,
                getMemoryUsage() {
                    if (global.gc) {
                        global.gc();
                    }
                    return process.memoryUsage().heapUsed;
                },
                exit(exitCode?: number): void {
                    process.exit(exitCode);
                }
            };
        }

        function getChakraSystem(): System {

            return {
                newLine: ChakraHost.newLine || "\r\n",
                args: ChakraHost.args,
                useCaseSensitiveFileNames: !!ChakraHost.useCaseSensitiveFileNames,
                write: ChakraHost.echo,
                readFile(path: string, encoding?: string) {
                    // encoding is automatically handled by the implementation in ChakraHost
                    return ChakraHost.readFile(path);
                },
                writeFile(path: string, data: string, writeByteOrderMark?: boolean) {
                    // If a BOM is required, emit one
                    if (writeByteOrderMark) {
                        data = "\uFEFF" + data;
                    }

                    ChakraHost.writeFile(path, data);
                },
                resolvePath: ChakraHost.resolvePath,
                fileExists: ChakraHost.fileExists,
                directoryExists: ChakraHost.directoryExists,
                createDirectory: ChakraHost.createDirectory,
                getExecutingFilePath: () => ChakraHost.executingFile,
                getCurrentDirectory: () => ChakraHost.currentDirectory,
                readDirectory: ChakraHost.readDirectory,
                exit: ChakraHost.quit,
            };
        }

        if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
            return getWScriptSystem();
        }
        else if (typeof process !== "undefined" && process.nextTick && !process.browser && typeof require !== "undefined") {
            // process and process.nextTick checks if current environment is node-like
            // process.browser check excludes webpack and browserify
            return getNodeSystem();
        }
        else if (typeof ChakraHost !== "undefined") {
            return getChakraSystem();
        }
        else {
            return undefined; // Unsupported host
        }
    })();
}
