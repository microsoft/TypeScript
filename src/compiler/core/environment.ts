///<reference path='references.ts' />
///<reference path='..\enumerator.ts' />
///<reference path='..\process.ts' />

declare var Buffer: {
    new (str: string, encoding?: string): any;
}

module TypeScript {
    export var nodeMakeDirectoryTime = 0;
    export var nodeCreateBufferTime = 0;
    export var nodeWriteFileSyncTime = 0;

    export enum ByteOrderMark {
        None = 0,
        Utf8 = 1,
        Utf16BigEndian = 2,
        Utf16LittleEndian = 3,
    }

    export class FileInformation {
        constructor(public contents: string, public byteOrderMark: ByteOrderMark) {
        }
    }

    export interface IEnvironment {
        supportsCodePage(): boolean;
        readFile(path: string, codepage: number): FileInformation;
        writeFile(path: string, contents: string, writeByteOrderMark: boolean): void;
        deleteFile(path: string): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        listFiles(path: string, re?: RegExp, options?: { recursive?: boolean; }): string[];

        arguments: string[];
        standardOut: ITextWriter;

        currentDirectory(): string;
        newLine: string;
    }

    export var Environment = (function () {
        // Create an IO object for use inside WindowsScriptHost hosts
        // Depends on WSCript and FileSystemObject
        function getWindowsScriptHostEnvironment(): IEnvironment {
            try {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
            } catch (e) {
                return null;
            }

            var streamObjectPool: any[] = [];

            function getStreamObject(): any {
                if (streamObjectPool.length > 0) {
                    return streamObjectPool.pop();
                }
                else {
                    return new ActiveXObject("ADODB.Stream");
                }
            }

            function releaseStreamObject(obj: any) {
                streamObjectPool.push(obj);
            }

            var args: string[] = [];
            for (var i = 0; i < WScript.Arguments.length; i++) {
                args[i] = WScript.Arguments.Item(i);
            }

            return {
                // On windows, the newline sequence is always "\r\n";
                newLine: "\r\n",

                currentDirectory: (): string => {
                    return (<any>WScript).CreateObject("WScript.Shell").CurrentDirectory;
                },

                supportsCodePage: () => {
                    return (<any>WScript).ReadFile;
                },

                readFile: function (path: string, codepage: number): FileInformation {
                    try {
                        // If a codepage is requested, defer to our host to do the reading.  If it
                        // fails, fall back to our normal BOM/utf8 logic.
                        if (codepage !== null && this.supportsCodePage()) {
                            try {
                                var contents = (<any>WScript).ReadFile(path, codepage);
                                return new FileInformation(contents, ByteOrderMark.None);
                            }
                            catch (e) {
                                // We couldn't read it with that code page.  Fall back to the normal
                                // BOM/utf8 logic below.
                            }
                        }

                        // Initially just read the first two bytes of the file to see if there's a bom.
                        var streamObj = getStreamObject();
                        streamObj.Open();
                        streamObj.Type = 2; // Text data

                        // Start reading individual chars without any interpretation.  That way we can check for a bom.
                        streamObj.Charset = 'x-ansi';

                        streamObj.LoadFromFile(path);
                        var bomChar = streamObj.ReadText(2); // Read the BOM char

                        // Position has to be at 0 before changing the encoding
                        streamObj.Position = 0;

                        var byteOrderMark = ByteOrderMark.None;

                        if (bomChar.charCodeAt(0) === 0xFE && bomChar.charCodeAt(1) === 0xFF) {
                            streamObj.Charset = 'unicode';
                            byteOrderMark = ByteOrderMark.Utf16BigEndian;
                        }
                        else if (bomChar.charCodeAt(0) === 0xFF && bomChar.charCodeAt(1) === 0xFE) {
                            streamObj.Charset = 'unicode';
                            byteOrderMark = ByteOrderMark.Utf16LittleEndian;
                        }
                        else if (bomChar.charCodeAt(0) === 0xEF && bomChar.charCodeAt(1) === 0xBB) {
                            streamObj.Charset = 'utf-8';
                            byteOrderMark = ByteOrderMark.Utf8;
                        }
                        else {
                            // Always read a file as utf8 if it has no bom.
                            streamObj.Charset = 'utf-8';
                        }

                        // Read the whole file
                        var contents = streamObj.ReadText(-1 /* read from the current position to EOS */);
                        streamObj.Close();
                        releaseStreamObject(streamObj);
                        return new FileInformation(contents, byteOrderMark);
                    }
                    catch (err) {
                        // -2147024809 is the javascript value for 0x80070057 which is the HRESULT for 
                        // "the parameter is incorrect".
                        var message: string;
                        if (err.number === -2147024809) {
                            message = TypeScript.getDiagnosticMessage(TypeScript.DiagnosticCode.Unsupported_file_encoding, null);
                        }
                        else {
                            message = TypeScript.getDiagnosticMessage(TypeScript.DiagnosticCode.Cannot_read_file_0_1, [path, err.message]);
                        }

                        throw new Error(message);
                    }
                },

                writeFile: function (path: string, contents: string, writeByteOrderMark: boolean) {
                    // First, convert the text contents passed in to binary in UTF8 format.
                    var textStream = getStreamObject();
                    textStream.Charset = 'utf-8';
                    textStream.Open();
                    textStream.WriteText(contents, 0 /*do not add newline*/);

                    // If they don't want the BOM, then skip it (it will be added automatically
                    // when we write the utf8 bytes out above).
                    if (!writeByteOrderMark) {
                        textStream.Position = 3;
                    }
                    else {
                        textStream.Position = 0;
                    }

                    // Now, write all those bytes out to a file.
                    var fileStream = getStreamObject();
                    fileStream.Type = 1; //binary data.
                    fileStream.Open();

                    textStream.CopyTo(fileStream);

                    // Flush and save the file.
                    fileStream.Flush();
                    fileStream.SaveToFile(path, 2 /*overwrite*/);
                    fileStream.Close();

                    textStream.Flush();
                    textStream.Close();
                },

                fileExists: function (path: string): boolean {
                    return fso.FileExists(path);
                },

                deleteFile: function (path: string): void {
                    if (fso.FileExists(path)) {
                        fso.DeleteFile(path, true); // true: delete read-only files
                    }
                },

                directoryExists: function (path) {
                    return <boolean>fso.FolderExists(path);
                },

                listFiles: function (path, spec?, options?) {
                    options = options || <{ recursive?: boolean; }>{};
                    function filesInFolder(folder: any, root: string): string[] {
                        var paths: string[] = [];
                        var fc: Enumerator;

                        if (options.recursive) {
                            fc = new Enumerator(folder.subfolders);

                            for (; !fc.atEnd(); fc.moveNext()) {
                                paths = paths.concat(filesInFolder(fc.item(), root + "\\" + fc.item().Name));
                            }
                        }

                        fc = new Enumerator(folder.files);

                        for (; !fc.atEnd(); fc.moveNext()) {
                            if (!spec || fc.item().Name.match(spec)) {
                                paths.push(root + "\\" + fc.item().Name);
                            }
                        }

                        return paths;
                    }

                    var folder: any = fso.GetFolder(path);
                    var paths: string[] = [];

                    return filesInFolder(folder, path);
                },

                arguments: <string[]>args,

                standardOut: WScript.StdOut,
            };
        };

        function getNodeEnvironment(): IEnvironment {
            var _fs = require('fs');
            var _path = require('path');
            var _module = require('module');
            var _os = require('os');

            return {
                // On node pick up the newline character from the OS
                newLine: _os.EOL,

                currentDirectory: (): string => {
                    return (<any>process).cwd();
                },

                supportsCodePage: () => false,

                readFile: function (file: string, codepage: number): FileInformation {
                    if (codepage !== null) {
                        throw new Error(TypeScript.getDiagnosticMessage(TypeScript.DiagnosticCode.codepage_option_not_supported_on_current_platform, null));
                    }

                    var buffer = _fs.readFileSync(file);
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
                                return new FileInformation(buffer.toString("ucs2", 2), ByteOrderMark.Utf16BigEndian);
                            }
                            break;
                        case 0xFF:
                            if (buffer[1] === 0xFE) {
                                // utf16-le 
                                return new FileInformation(buffer.toString("ucs2", 2), ByteOrderMark.Utf16LittleEndian);
                            }
                            break;
                        case 0xEF:
                            if (buffer[1] === 0xBB) {
                                // utf-8
                                return new FileInformation(buffer.toString("utf8", 3), ByteOrderMark.Utf8);
                            }
                    }

                    // Default behaviour
                    return new FileInformation(buffer.toString("utf8", 0), ByteOrderMark.None);
                },

                writeFile: function (path: string, contents: string, writeByteOrderMark: boolean) {
                    function mkdirRecursiveSync(path: string) {
                        var stats = _fs.statSync(path);
                        if (stats.isFile()) {
                            throw "\"" + path + "\" exists but isn't a directory.";
                        }
                        else if (stats.isDirectory()) {
                            return;
                        }
                        else {
                            mkdirRecursiveSync(_path.dirname(path));
                            _fs.mkdirSync(path, 509 /*775 in octal*/);
                        }
                    }
                    var start = new Date().getTime();
                    mkdirRecursiveSync(_path.dirname(path));
                    TypeScript.nodeMakeDirectoryTime += new Date().getTime() - start;

                    if (writeByteOrderMark) {
                        contents = '\uFEFF' + contents;
                    }

                    var start = new Date().getTime();

                    var chunkLength = 4 * 1024;
                    var fileDescriptor = _fs.openSync(path, "w");
                    try {
                        for (var index = 0; index < contents.length; index += chunkLength) {
                            var bufferStart = new Date().getTime();
                            var buffer = new Buffer(contents.substr(index, chunkLength), "utf8");
                            TypeScript.nodeCreateBufferTime += new Date().getTime() - bufferStart;

                            _fs.writeSync(fileDescriptor, buffer, 0, buffer.length, null);
                        }
                    }
                    finally {
                        _fs.closeSync(fileDescriptor);
                    }

                    TypeScript.nodeWriteFileSyncTime += new Date().getTime() - start;
                },

                fileExists: function (path: string): boolean {
                    return _fs.existsSync(path);
                },

                deleteFile: function (path) {
                    try {
                        _fs.unlinkSync(path);
                    } catch (e) {
                    }
                },

                directoryExists: function (path: string): boolean {
                    return _fs.existsSync(path) && _fs.statSync(path).isDirectory();
                },

                listFiles: function dir(path, spec?, options?) {
                    options = options || <{ recursive?: boolean; }>{};

                    function filesInFolder(folder: string): string[] {
                        var paths: string[] = [];

                        var files = _fs.readdirSync(folder);
                        for (var i = 0; i < files.length; i++) {
                            var stat = _fs.statSync(folder + "\\" + files[i]);
                            if (options.recursive && stat.isDirectory()) {
                                paths = paths.concat(filesInFolder(folder + "\\" + files[i]));
                            }
                            else if (stat.isFile() && (!spec || files[i].match(spec))) {
                                paths.push(folder + "\\" + files[i]);
                            }
                        }

                        return paths;
                    }

                    return filesInFolder(path);
                },

                arguments: process.argv.slice(2),

                standardOut: {
                    Write: function (str) { process.stdout.write(str); },
                    WriteLine: function (str) { process.stdout.write(str + '\n'); },
                    Close: function () { }
                },
            };
        };

        if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
            return getWindowsScriptHostEnvironment();
        }
        else if (typeof module !== 'undefined' && module.exports) {
            return getNodeEnvironment();
        }
        else {
            return null; // Unsupported host
        }
    })();
}
