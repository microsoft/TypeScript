interface System {
    args: string[];
    newLine: string;
    write(s: string): void;
    writeErr(s: string): void;
    readFile(fileName: string): string;
    writeFile(fileName: string, data: string): void;
    resolvePath(path: string): string;
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    createDirectory(directoryName: string): void;
    getExecutingFilePath(): string;
    getCurrentDirectory(): string;
    getMemoryUsage(): number;
    exit(exitCode?: number): void;
    useCaseSensitiveFileNames: boolean;
}

enum ErrorCodes {
    UnsupportedFileEncoding = 1,
    CannotReadFile = 2,
}

declare var require: any;
declare var module: any;
declare var process: any;
declare var global: any;

var sys: System = (function () {
    function getWScriptSystem(): System {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var args: string[] = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }

        var fileStreamObjectPool: any[] = [];

        function getFileStreamObject(): any {
            if (fileStreamObjectPool.length > 0) {
                return fileStreamObjectPool.pop();
            }
            else {
                return new ActiveXObject("ADODB.Stream");
            }
        }

        function releaseFileStreamObject(obj: any) {
            fileStreamObjectPool.push(obj);
        }

        return {
            args: args,
            newLine: "\r\n",
            write(s: string): void {
                WScript.StdOut.Write(s);
            },
            writeErr(s: string): void {
                WScript.StdErr.Write(s);
            },
            readFile(fileName: string): string {
                var contents: string;
                try {
                    // Initially just read the first two bytes of the file to see if there's a bom.
                    var fileStream = getFileStreamObject();
                    fileStream.Open();
                    fileStream.Type = 2; // Text data

                    // Start reading individual chars without any interpretation.  That way we can check for a byte-order-mark.
                    fileStream.Charset = "x-ansi";

                    fileStream.LoadFromFile(fileName);
                    var byteOrderMarkSeq: string = fileStream.ReadText(2) || ""; // Read the BOM char-seq or fall back to an empty string
                    
                    // Position has to be at 0 before changing the encoding
                    fileStream.Position = 0;
                    if (byteOrderMarkSeq.charCodeAt(0) === 0xFE && byteOrderMarkSeq.charCodeAt(1) === 0xFF) {
                        // utf16-be
                        fileStream.Charset = "unicode";
                    }
                    else if (byteOrderMarkSeq.charCodeAt(0) === 0xFF && byteOrderMarkSeq.charCodeAt(1) === 0xFE) {
                        // utf16-le
                        fileStream.Charset = "unicode";
                    }
                    else if (byteOrderMarkSeq.charCodeAt(0) === 0xEF && byteOrderMarkSeq.charCodeAt(1) === 0xBB) {
                        // utf-8
                        fileStream.Charset = "utf-8";
                    }
                    else {
                        // Always read a file as utf8 if it has no bom.
                        fileStream.Charset = "utf-8";
                    }
                    contents = fileStream.ReadText(-1 /* Read from beginning to end-of-stream */);
                    fileStream.Close();
                    releaseFileStreamObject(fileStream);
                }
                catch (err) {
                    // -2147024809 is the javascript value for 0x80070057 which is the HRESULT for 
                    // "the parameter is incorrect".
                    if (err.number === -2147024809) {
                        err.code = ErrorCodes.UnsupportedFileEncoding;
                    }
                    else {
                        err.code = ErrorCodes.CannotReadFile;
                    }
                    throw err;
                }

                return contents;
            },
            writeFile(fileName: string, data: string): void {
                var textStream = getFileStreamObject();
                textStream.Charset = "utf-8";
                textStream.Open();
                textStream.WriteText(data, 0 /*do not add newline*/);
                textStream.SaveToFile(fileName, 2 /*overwrite*/);
                textStream.Close();
                releaseFileStreamObject(textStream);
            },
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
            getMemoryUsage() {
                return 0;
            },
            exit(exitCode?: number): void {
                WScript.Quit(exitCode);
            },
            useCaseSensitiveFileNames: false,
        };
    }
    function getNodeSystem(): System {
        var _fs = require("fs");
        var _path = require("path");
        var _os = require("os");
        var platform: string = _os.platform();
        // win32\win64 are case insensitive platforms, MacOS (darwin) by default is also case insensitive
        var useCaseSensitiveFileNames = platform !== "win32" && platform !== "win64" && platform !== "darwin";

        return {
            args: process.argv.slice(2),
            newLine: _os.EOL,
            write(s: string): void {
                process.stdout.write(s);
            },
            writeErr(s: string): void {
                process.stderr.write(s);
            },
            readFile(fileName: string): string {
                try {
                    var buffer = _fs.readFileSync(fileName);

                    // Make sure buffer got initialized and that we don't try to read into a completely empty file.
                    if (!buffer || buffer.length === 0) {
                        return "";
                    }

                    switch (buffer[0]) {
                        case 0xFE:
                            if (buffer[1] === 0xFF) {
                                // utf16-be. Reading the buffer as big endian is not supported, so convert it to 
                                // Little Endian first
                                var i = 0;
                                while ((i + 1) < buffer.length) {
                                    var temp = buffer[i];
                                    buffer[i] = buffer[i + 1];
                                    buffer[i + 1] = temp;
                                    i += 2;
                                }
                                return buffer.toString("utf16le", 2);
                            }
                            break;
                        case 0xFF:
                            if (buffer[1] === 0xFE) {
                                // utf16-le
                                return buffer.toString("utf16le", 2);
                            }
                            break;
                        case 0xEF:
                            if (buffer[1] === 0xBB) {
                                // utf-8
                                return buffer.toString("utf8", 3);
                            }
                    }
                
                    return buffer.toString("utf8", 0);
                }
                catch (err) {
                    err.code = ErrorCodes.CannotReadFile;
                    throw err;
                }
            },
            writeFile(fileName: string, data: string): void {
                // TODO (drosen): bring back the old environment code if necessary
                _fs.writeFileSync(fileName, data, "utf8");
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
                return process.mainModule.filename;
            },
            getCurrentDirectory() {
                return (<any>process).cwd();
            },
            getMemoryUsage() {
                global.gc();
                return process.memoryUsage().heapUsed;
            },
            exit(exitCode?: number): void {
                process.exit(exitCode);
            },
            useCaseSensitiveFileNames: useCaseSensitiveFileNames,
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

function getCanonicalFileName(fileName: string): string {
    // if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
    // otherwise use toLowerCase as a canonical form.
    return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
}
