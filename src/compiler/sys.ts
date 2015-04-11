/// <reference path="core.ts"/>

module ts {
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
        readDirectory(path: string, extension?: string): string[];
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

    declare class Enumerator {
        public atEnd(): boolean;
        public moveNext(): boolean;
        public item(): any;
        constructor(o: any);
    }

    export var sys: System = (function () {

        function getWScriptSystem(): System {

            var fso = new ActiveXObject("Scripting.FileSystemObject");

            var fileStream = new ActiveXObject("ADODB.Stream");
            fileStream.Type = 2 /*text*/;

            var binaryStream = new ActiveXObject("ADODB.Stream");
            binaryStream.Type = 1 /*binary*/;

            var args: string[] = [];
            for (var i = 0; i < WScript.Arguments.length; i++) {
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
                        var bom = fileStream.ReadText(2) || "";
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
                var result: string[] = [];
                for (var e = new Enumerator(collection); !e.atEnd(); e.moveNext()) {
                    result.push(e.item().Name);
                }
                return result.sort();
            }

            function readDirectory(path: string, extension?: string): string[] {
                var result: string[] = [];
                visitDirectory(path);
                return result;
                function visitDirectory(path: string) {
                    var folder = fso.GetFolder(path || ".");
                    var files = getNames(folder.files);
                    for (let name of files) {
                        if (!extension || fileExtensionIs(name, extension)) {
                            result.push(combinePaths(path, name));
                        }
                    }
                    var subfolders = getNames(folder.subfolders);
                    for (let current of subfolders) {
                        visitDirectory(combinePaths(path, current));
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
            var _fs = require("fs");
            var _path = require("path");
            var _os = require('os');

            var platform: string = _os.platform();
            // win32\win64 are case insensitive platforms, MacOS (darwin) by default is also case insensitive
            var useCaseSensitiveFileNames = platform !== "win32" && platform !== "win64" && platform !== "darwin";

            function readFile(fileName: string, encoding?: string): string {
                if (!_fs.existsSync(fileName)) {
                    return undefined;
                }
                var buffer = _fs.readFileSync(fileName);
                var len = buffer.length;
                if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                    // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
                    // flip all byte pairs and treat as little endian.
                    len &= ~1;
                    for (var i = 0; i < len; i += 2) {
                        var temp = buffer[i];
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
                    data = '\uFEFF' + data;
                }

                _fs.writeFileSync(fileName, data, "utf8");
            }

            function readDirectory(path: string, extension?: string): string[] {
                var result: string[] = [];
                visitDirectory(path);
                return result;
                function visitDirectory(path: string) {
                    var files = _fs.readdirSync(path || ".").sort();
                    var directories: string[] = [];
                    for (let current of files) {
                        var name = combinePaths(path, current);
                        var stat = _fs.lstatSync(name);
                        if (stat.isFile()) {
                            if (!extension || fileExtensionIs(name, extension)) {
                                result.push(name);
                            }
                        }
                        else if (stat.isDirectory()) {
                            directories.push(name);
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
                    // 1 is a standard descriptor for stdout
                    _fs.writeSync(1, s);
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
                    };
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
        else if (typeof module !== "undefined" && module.exports) {
            return getNodeSystem();
        }
        else {
            return undefined; // Unsupported host
        }
    })();
}