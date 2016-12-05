/// <reference path="core.ts"/>

namespace ts {
    export type FileWatcherCallback = (fileName: string, removed?: boolean) => void;
    export type DirectoryWatcherCallback = (fileName: string) => void;
    export interface WatchedFile {
        fileName: string;
        callback: FileWatcherCallback;
        mtime?: Date;
    }

    export interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        readFile(path: string, encoding?: string): string;
        getFileSize?(path: string): number;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        /**
         * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
         * use native OS file watching
         */
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        resolvePath(path: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: string[], exclude?: string[], include?: string[]): string[];
        getModifiedTime?(path: string): Date;
        createHash?(data: string): string;
        getMemoryUsage?(): number;
        exit(exitCode?: number): void;
        realpath?(path: string): string;
        /*@internal*/ getEnvironmentVariable(name: string): string;
        /*@internal*/ tryEnableSourceMapsForHost?(): void;
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout?(timeoutId: any): void;
    }

    export interface FileWatcher {
        close(): void;
    }

    export interface DirectoryWatcher extends FileWatcher {
        directoryName: string;
        referenceCount: number;
    }

    declare var require: any;
    declare var process: any;
    declare var global: any;
    declare var __filename: string;

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
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: string[], basePaths?: string[], excludeEx?: string, includeFileEx?: string, includeDirEx?: string): string[];
        watchFile?(path: string, callback: FileWatcherCallback): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        realpath(path: string): string;
        getEnvironmentVariable?(name: string): string;
    };

    export let sys: System = (function() {

        function getWScriptSystem(): System {

            const fso = new ActiveXObject("Scripting.FileSystemObject");
            const shell = new ActiveXObject("WScript.Shell");

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

            function getNames(collection: any): string[] {
                const result: string[] = [];
                for (let e = new Enumerator(collection); !e.atEnd(); e.moveNext()) {
                    result.push(e.item().Name);
                }
                return result.sort();
            }

            function getDirectories(path: string): string[] {
                const folder = fso.GetFolder(path);
                return getNames(folder.subfolders);
            }

            function getAccessibleFileSystemEntries(path: string): FileSystemEntries {
                try {
                    const folder = fso.GetFolder(path || ".");
                    const files = getNames(folder.files);
                    const directories = getNames(folder.subfolders);
                    return { files, directories };
                }
                catch (e) {
                    return { files: [], directories: [] };
                }
            }

            function readDirectory(path: string, extensions?: string[], excludes?: string[], includes?: string[]): string[] {
                return matchFiles(path, extensions, excludes, includes, /*useCaseSensitiveFileNames*/ false, shell.CurrentDirectory, getAccessibleFileSystemEntries);
            }

            const wscriptSystem: System = {
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
                    if (!wscriptSystem.directoryExists(directoryName)) {
                        fso.CreateFolder(directoryName);
                    }
                },
                getExecutingFilePath() {
                    return WScript.ScriptFullName;
                },
                getCurrentDirectory() {
                    return shell.CurrentDirectory;
                },
                getDirectories,
                getEnvironmentVariable(name: string) {
                    return new ActiveXObject("WScript.Shell").ExpandEnvironmentStrings(`%${name}%`);
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
            return wscriptSystem;
        }

        function getNodeSystem(): System {
            const _fs = require("fs");
            const _path = require("path");
            const _os = require("os");
            const _crypto = require("crypto");

            const useNonPollingWatchers = process.env["TSC_NONPOLLING_WATCHER"];

            function createWatchedFileSet() {
                const dirWatchers = createMap<DirectoryWatcher>();
                // One file can have multiple watchers
                const fileWatcherCallbacks = createMap<FileWatcherCallback[]>();
                return { addFile, removeFile };

                function reduceDirWatcherRefCountForFile(fileName: string) {
                    const dirName = getDirectoryPath(fileName);
                    const watcher = dirWatchers.get(dirName);
                    if (watcher) {
                        watcher.referenceCount -= 1;
                        if (watcher.referenceCount <= 0) {
                            watcher.close();
                            dirWatchers.delete(dirName);
                        }
                    }
                }

                function addDirWatcher(dirPath: string): void {
                    let watcher = dirWatchers.get(dirPath);
                    if (watcher) {
                        watcher.referenceCount += 1;
                        return;
                    }
                    watcher = _fs.watch(
                        dirPath,
                        { persistent: true },
                        (eventName: string, relativeFileName: string) => fileEventHandler(eventName, relativeFileName, dirPath)
                    );
                    watcher.referenceCount = 1;
                    dirWatchers.set(dirPath, watcher);
                    return;
                }

                function addFileWatcherCallback(filePath: string, callback: FileWatcherCallback): void {
                    multiMapAdd(fileWatcherCallbacks, filePath, callback);
                }

                function addFile(fileName: string, callback: FileWatcherCallback): WatchedFile {
                    addFileWatcherCallback(fileName, callback);
                    addDirWatcher(getDirectoryPath(fileName));

                    return { fileName, callback };
                }

                function removeFile(watchedFile: WatchedFile) {
                    removeFileWatcherCallback(watchedFile.fileName, watchedFile.callback);
                    reduceDirWatcherRefCountForFile(watchedFile.fileName);
                }

                function removeFileWatcherCallback(filePath: string, callback: FileWatcherCallback) {
                    multiMapRemove(fileWatcherCallbacks, filePath, callback);
                }

                function fileEventHandler(eventName: string, relativeFileName: string, baseDirPath: string) {
                    // When files are deleted from disk, the triggered "rename" event would have a relativefileName of "undefined"
                    const fileName = typeof relativeFileName !== "string"
                        ? undefined
                        : ts.getNormalizedAbsolutePath(relativeFileName, baseDirPath);
                    // Some applications save a working file via rename operations
                    if ((eventName === "change" || eventName === "rename")) {
                        const callbacks = fileWatcherCallbacks.get(fileName);
                        if (callbacks) {
                            for (const fileCallback of callbacks) {
                                fileCallback(fileName);
                            }
                        }
                    }
                }
            }
            const watchedFileSet = createWatchedFileSet();

            function isNode4OrLater(): boolean {
                return parseInt(process.version.charAt(1)) >= 4;
            }

            function isFileSystemCaseSensitive(): boolean {
                // win32\win64 are case insensitive platforms
                if (platform === "win32" || platform === "win64") {
                    return false;
                }
                // convert current file name to upper case / lower case and check if file exists
                // (guards against cases when name is already all uppercase or lowercase)
                return !fileExists(__filename.toUpperCase()) || !fileExists(__filename.toLowerCase());
            }

            const platform: string = _os.platform();
            const useCaseSensitiveFileNames = isFileSystemCaseSensitive();

            function readFile(fileName: string, _encoding?: string): string {
                if (!fileExists(fileName)) {
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

            function getAccessibleFileSystemEntries(path: string): FileSystemEntries {
                try {
                    const entries = _fs.readdirSync(path || ".").sort();
                    const files: string[] = [];
                    const directories: string[] = [];
                    for (const entry of entries) {
                        // This is necessary because on some file system node fails to exclude
                        // "." and "..". See https://github.com/nodejs/node/issues/4002
                        if (entry === "." || entry === "..") {
                            continue;
                        }
                        const name = combinePaths(path, entry);

                        let stat: any;
                        try {
                            stat = _fs.statSync(name);
                        }
                        catch (e) {
                            continue;
                        }

                        if (stat.isFile()) {
                            files.push(entry);
                        }
                        else if (stat.isDirectory()) {
                            directories.push(entry);
                        }
                    }
                    return { files, directories };
                }
                catch (e) {
                    return { files: [], directories: [] };
                }
            }

            function readDirectory(path: string, extensions?: string[], excludes?: string[], includes?: string[]): string[] {
                return matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, process.cwd(), getAccessibleFileSystemEntries);
            }

            const enum FileSystemEntryKind {
                File,
                Directory
            }

            function fileSystemEntryExists(path: string, entryKind: FileSystemEntryKind): boolean {
                try {
                    const stat = _fs.statSync(path);
                    switch (entryKind) {
                        case FileSystemEntryKind.File: return stat.isFile();
                        case FileSystemEntryKind.Directory: return stat.isDirectory();
                    }
                }
                catch (e) {
                    return false;
                }
            }

            function fileExists(path: string): boolean {
                return fileSystemEntryExists(path, FileSystemEntryKind.File);
            }

            function directoryExists(path: string): boolean {
                return fileSystemEntryExists(path, FileSystemEntryKind.Directory);
            }

            function getDirectories(path: string): string[] {
                return filter<string>(_fs.readdirSync(path), dir => fileSystemEntryExists(combinePaths(path, dir), FileSystemEntryKind.Directory));
            }

            const noOpFileWatcher: FileWatcher = { close: noop };
            const nodeSystem: System = {
                args: process.argv.slice(2),
                newLine: _os.EOL,
                useCaseSensitiveFileNames: useCaseSensitiveFileNames,
                write(s: string): void {
                    process.stdout.write(s);
                },
                readFile,
                writeFile,
                watchFile: (fileName, callback, pollingInterval) => {
                    if (useNonPollingWatchers) {
                        const watchedFile = watchedFileSet.addFile(fileName, callback);
                        return {
                            close: () => watchedFileSet.removeFile(watchedFile)
                        };
                    }
                    else {
                        _fs.watchFile(fileName, { persistent: true, interval: pollingInterval || 250 }, fileChanged);
                        return {
                            close: () => _fs.unwatchFile(fileName, fileChanged)
                        };
                    }

                    function fileChanged(curr: any, prev: any) {
                        if (+curr.mtime <= +prev.mtime) {
                            return;
                        }

                        callback(fileName);
                    }
                },
                watchDirectory: (directoryName, callback, recursive) => {
                    // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
                    // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
                    let options: any;
                    if (!directoryExists(directoryName)) {
                        return noOpFileWatcher;
                    }

                    if (isNode4OrLater() && (process.platform === "win32" || process.platform === "darwin")) {
                        options = { persistent: true, recursive: !!recursive };
                    }
                    else {
                        options = { persistent: true };
                    }

                    return _fs.watch(
                        directoryName,
                        options,
                        (eventName: string, relativeFileName: string) => {
                            // In watchDirectory we only care about adding and removing files (when event name is
                            // "rename"); changes made within files are handled by corresponding fileWatchers (when
                            // event name is "change")
                            if (eventName === "rename") {
                                // When deleting a file, the passed baseFileName is null
                                callback(!relativeFileName ? relativeFileName : normalizePath(combinePaths(directoryName, relativeFileName)));
                            };
                        }
                    );
                },
                resolvePath: function(path: string): string {
                    return _path.resolve(path);
                },
                fileExists,
                directoryExists,
                createDirectory(directoryName: string) {
                    if (!nodeSystem.directoryExists(directoryName)) {
                        _fs.mkdirSync(directoryName);
                    }
                },
                getExecutingFilePath() {
                    return __filename;
                },
                getCurrentDirectory() {
                    return process.cwd();
                },
                getDirectories,
                getEnvironmentVariable(name: string) {
                    return process.env[name] || "";
                },
                readDirectory,
                getModifiedTime(path) {
                    try {
                        return _fs.statSync(path).mtime;
                    }
                    catch (e) {
                        return undefined;
                    }
                },
                createHash(data) {
                    const hash = _crypto.createHash("md5");
                    hash.update(data);
                    return hash.digest("hex");
                },
                getMemoryUsage() {
                    if (global.gc) {
                        global.gc();
                    }
                    return process.memoryUsage().heapUsed;
                },
                getFileSize(path) {
                    try {
                        const stat = _fs.statSync(path);
                        if (stat.isFile()) {
                            return stat.size;
                        }
                    }
                    catch (e) { }
                    return 0;
                },
                exit(exitCode?: number): void {
                    process.exit(exitCode);
                },
                realpath(path: string): string {
                    return _fs.realpathSync(path);
                },
                tryEnableSourceMapsForHost() {
                    try {
                        require("source-map-support").install();
                    }
                    catch (e) {
                        // Could not enable source maps.
                    }
                },
                setTimeout,
                clearTimeout
            };
            return nodeSystem;
        }

        function getChakraSystem(): System {
            const realpath = ChakraHost.realpath && ((path: string) => ChakraHost.realpath(path));
            return {
                newLine: ChakraHost.newLine || "\r\n",
                args: ChakraHost.args,
                useCaseSensitiveFileNames: !!ChakraHost.useCaseSensitiveFileNames,
                write: ChakraHost.echo,
                readFile(path: string, _encoding?: string) {
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
                getDirectories: ChakraHost.getDirectories,
                getEnvironmentVariable: ChakraHost.getEnvironmentVariable || (() => ""),
                readDirectory: (path: string, extensions?: string[], excludes?: string[], includes?: string[]) => {
                    const pattern = getFileMatcherPatterns(path, excludes, includes, !!ChakraHost.useCaseSensitiveFileNames, ChakraHost.currentDirectory);
                    return ChakraHost.readDirectory(path, extensions, pattern.basePaths, pattern.excludePattern, pattern.includeFilePattern, pattern.includeDirectoryPattern);
                },
                exit: ChakraHost.quit,
                realpath
            };
        }

        function recursiveCreateDirectory(directoryPath: string, sys: System) {
            const basePath = getDirectoryPath(directoryPath);
            const shouldCreateParent = directoryPath !== basePath && !sys.directoryExists(basePath);
            if (shouldCreateParent) {
                recursiveCreateDirectory(basePath, sys);
            }
            if (shouldCreateParent || !sys.directoryExists(directoryPath)) {
                sys.createDirectory(directoryPath);
            }
        }

        let sys: System;
        if (typeof ChakraHost !== "undefined") {
            sys = getChakraSystem();
        }
        else if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
            sys = getWScriptSystem();
        }
        else if (typeof process !== "undefined" && process.nextTick && !process.browser && typeof require !== "undefined") {
            // process and process.nextTick checks if current environment is node-like
            // process.browser check excludes webpack and browserify
            sys = getNodeSystem();
        }
        if (sys) {
            // patch writefile to create folder before writing the file
            const originalWriteFile = sys.writeFile;
            sys.writeFile = function(path, data, writeBom) {
                const directoryPath = getDirectoryPath(normalizeSlashes(path));
                if (directoryPath && !sys.directoryExists(directoryPath)) {
                    recursiveCreateDirectory(directoryPath, sys);
                }
                originalWriteFile.call(sys, path, data, writeBom);
            };
        }
        return sys;
    })();

    if (sys && sys.getEnvironmentVariable) {
        Debug.currentAssertionLevel = /^development$/i.test(sys.getEnvironmentVariable("NODE_ENV"))
            ? AssertionLevel.Normal
            : AssertionLevel.None;
    }
}
