/// <reference path="core.ts"/>

namespace ts {
    export interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        readFile(path: string, encoding?: string): string;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        watchFile?(path: string, callback: (path: string) => void): FileWatcher;
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

    export interface FileWatcher {
        close(): void;
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

    export var sys: System = (function () {

        function getWScriptSystem(): System {

            let fso = new ActiveXObject("Scripting.FileSystemObject");

            let fileStream = new ActiveXObject("ADODB.Stream");
            fileStream.Type = 2 /*text*/;

            let binaryStream = new ActiveXObject("ADODB.Stream");
            binaryStream.Type = 1 /*binary*/;

            let args: string[] = [];
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
                        let bom = fileStream.ReadText(2) || "";
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

            function getNames(collection: any): string[]{
                let result: string[] = [];
                for (let e = new Enumerator(collection); !e.atEnd(); e.moveNext()) {
                    result.push(e.item().Name);
                }
                return result.sort();
            }

            function readDirectory(path: string, extension?: string, exclude?: string[]): string[] {
                let result: string[] = [];
                exclude = map(exclude, s => getCanonicalPath(combinePaths(path, s)));
                visitDirectory(path);
                return result;
                function visitDirectory(path: string) {
                    let folder = fso.GetFolder(path || ".");
                    let files = getNames(folder.files);
                    for (let current of files) {
                        let name = combinePaths(path, current);
                        if ((!extension || fileExtensionIs(name, extension)) && !contains(exclude, getCanonicalPath(name))) {
                            result.push(name);
                        }
                    }
                    let subfolders = getNames(folder.subfolders);
                    for (let current of subfolders) {
                        let name = combinePaths(path, current);
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

            const platform: string = _os.platform();
            // win32\win64 are case insensitive platforms, MacOS (darwin) by default is also case insensitive
            const useCaseSensitiveFileNames = platform !== "win32" && platform !== "win64" && platform !== "darwin";

            function readFile(fileName: string, encoding?: string): string {
                if (!_fs.existsSync(fileName)) {
                    return undefined;
                }
                let buffer = _fs.readFileSync(fileName);
                let len = buffer.length;
                if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                    // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
                    // flip all byte pairs and treat as little endian.
                    len &= ~1;
                    for (let i = 0; i < len; i += 2) {
                        let temp = buffer[i];
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

                _fs.writeFileSync(fileName, data, "utf8");
            }

            function getCanonicalPath(path: string): string {
                return useCaseSensitiveFileNames ? path.toLowerCase() : path;
            }

            function readDirectory(path: string, extension?: string, exclude?: string[]): string[] {
                let result: string[] = [];
                exclude = map(exclude, s => getCanonicalPath(combinePaths(path, s)));
                visitDirectory(path);
                return result;
                function visitDirectory(path: string) {
                    let files = _fs.readdirSync(path || ".").sort();
                    let directories: string[] = [];
                    for (let current of files) {
                        let name = combinePaths(path, current);
                        if (!contains(exclude, getCanonicalPath(name))) {
                            let stat = _fs.statSync(name);
                            if (stat.isFile()) {
                                if (!extension || fileExtensionIs(name, extension)) {
                                    result.push(name);
                                }
                            }
                            else if (stat.isDirectory()) {
                                directories.push(name);
                            }
                        }
                    }
                    for (let current of directories) {
                        visitDirectory(current);
                    }
                }
            }

            return {
                args: process.argv.slice(2),
                newLine: _os.EOL,
                useCaseSensitiveFileNames: useCaseSensitiveFileNames,
                write(s: string): void {  
                    const buffer = new Buffer(s, "utf8");  
                    let offset: number = 0;
                    let toWrite: number = buffer.length;
                    let written = 0;
                    // 1 is a standard descriptor for stdout
                    while ((written = _fs.writeSync(1, buffer, offset, toWrite)) < toWrite) {
                        offset += written;
                        toWrite -= written;
                    }
                },  
                readFile,
                writeFile,
                watchFile: (fileName, callback) => {
                    // watchFile polls a file every 250ms, picking up file notifications.
                    _fs.watchFile(fileName, { persistent: true, interval: 250 }, fileChanged);

                    return {
                        close() { _fs.unwatchFile(fileName, fileChanged); }
                    };

                    function fileChanged(curr: any, prev: any) {
                        if (+curr.mtime <= +prev.mtime) {
                            return;
                        }

                        callback(fileName);
                    }
                },
                resolvePath: function (path: string): string {
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
        if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
            return getWScriptSystem();
        }
        else if (typeof process !== "undefined" && process.nextTick && !process.browser && typeof require !== "undefined") {
            // process and process.nextTick checks if current environment is node-like
            // process.browser check excludes webpack and browserify
            return getNodeSystem();
        }
        else {
            return undefined; // Unsupported host
        }
    })();
}
