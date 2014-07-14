interface System {
    args: string[];
    newLine: string;
    useCaseSensitiveFileNames: boolean;
    write(s: string): void;
    writeErr(s: string): void;
    readFile(fileName: string): string;
    writeFile(fileName: string, data: string): boolean;
    resolvePath(path: string): string;
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    createDirectory(directoryName: string): void;
    getExecutingFilePath(): string;
    getCurrentDirectory(): string;
    getMemoryUsage(): number;
    exit(exitCode?: number): void;
}

declare var require: any;
declare var module: any;
declare var process: any;
declare var global: any;

var sys: System = (function () {

    function getWScriptSystem(): System {

        var fso = new ActiveXObject("Scripting.FileSystemObject");

        var fileStream = new ActiveXObject("ADODB.Stream");
        var binaryStream = new ActiveXObject("ADODB.Stream");

        var args: string[] = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }

        function readFile(fileName: string): string {
            if (fso.FileExists(fileName)) {
                fileStream.Open();
                try {
                    // Load file in binary mode to ensure no byte order mark is added
                    fileStream.Type = 1;
                    fileStream.LoadFromFile(fileName);
                    // Read the first two bytes into a string with no interpretation
                    fileStream.Type = 2;
                    fileStream.Charset = "x-ansi";
                    var bom = fileStream.ReadText(2) || "";
                    // Position must be at 0 before encoding can be changed
                    fileStream.Position = 0;
                    // [0xFF,0xFE] and [0xFE,0xFF] mean utf-16 (little or big endian), otherwise default to utf-8
                    fileStream.Charset = bom.length >= 2 && (bom.charCodeAt(0) === 0xFF && bom.charCodeAt(1) === 0xFE || bom.charCodeAt(0) === 0xFE && bom.charCodeAt(1) === 0xFF) ? "unicode" : "utf-8";
                    // ReadText method always strips byte order mark from resulting string
                    var result = fileStream.ReadText();
                    fileStream.Close();
                    return result;
                }
                catch (e) {
                    fileStream.Close();
                }
            }
            return undefined;
        }

        function writeFile(fileName: string, data: string): boolean {
            fileStream.Open();
            binaryStream.Open();
            try {
                fileStream.Type = 2;
                fileStream.Charset = "utf-8";
                fileStream.WriteText(data);
                // Skip byte order mark and copy remaining text to binary stream
                binaryStream.Type = 1;
                fileStream.Position = 3;
                fileStream.CopyTo(binaryStream);
                binaryStream.SaveToFile(fileName, 2 /*overwrite*/);
                binaryStream.Close();
                fileStream.Close();
                return true;
            }
            catch (e) {
                binaryStream.Close();
                fileStream.Close();
            }
            return false;
        }

        return {
            args: args,
            newLine: "\r\n",
            useCaseSensitiveFileNames: false,
            write(s: string): void {
                WScript.StdOut.Write(s);
            },
            writeErr(s: string): void {
                WScript.StdErr.Write(s);
            },
            readFile: readFile,
            writeFile: writeFile,
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
            }
        };
    }
    function getNodeSystem(): System {
        var _fs = require("fs");
        var _path = require("path");
        var _os = require('os');

        function readFile(fileName: string): string {
            if (_fs.existsSync(fileName)) {
                try {
                    var buffer = _fs.readFileSync(fileName);
                    var len = buffer.length;
                    if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                        len &= ~1;
                        for (var i = 0; i < len; i += 2) {
                            var temp = buffer[i];
                            buffer[i] = buffer[i + 1];
                            buffer[i + 1] = temp;
                        }
                        return buffer.toString("utf16le", 2);
                    }
                    if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                        return buffer.toString("utf16le", 2);
                    }
                    if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                        return buffer.toString("utf8", 3);
                    }
                    return buffer.toString("utf8");
                }
                catch (e) {
                }
            }
            return undefined;
        }

        function writeFile(fileName: string, data: string): boolean {
            try {
                _fs.writeFileSync(fileName, data, "utf8");
                return true;
            }
            catch (e) {
            }
            return false;
        }

        return {
            args: process.argv.slice(2),
            newLine: _os.EOL,
            useCaseSensitiveFileNames: true,
            write(s: string): void {
                process.stdout.write(s);
            },
            writeErr(s: string): void {
                process.stderr.write(s);
            },
            readFile: readFile,
            writeFile: writeFile,
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

function getCanonicalFileName(fileName: string): string {
    // if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
    // otherwise use toLowerCase as a canonical form.
    return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
}
