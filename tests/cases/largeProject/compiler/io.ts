//﻿
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='Enumerator.ts' />
///<reference path='process.ts' />

interface IResolvedFile {
    content: string;
    path: string;
}

interface IFileWatcher {
    close(): void;
}

interface IIO {
    readFile(path: string): string;
    writeFile(path: string, contents: string): void;
    createFile(path: string, useUTF8?: boolean): ITextWriter;
    deleteFile(path: string): void;
    dir(path: string, re?: RegExp, options?: { recursive?: boolean; }): string[];
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    createDirectory(path: string): void;
    resolvePath(path: string): string;
    dirName(path: string): string;
    findFile(rootPath: string, partialFilePath: string): IResolvedFile;
    print(str: string): void;
    printLine(str: string): void;
    arguments: string[];
    stderr: ITextWriter;
    stdout: ITextWriter;
    watchFile(filename: string, callback: (string) => void ): IFileWatcher;
    run(source: string, filename: string): void;
    getExecutingFilePath(): string;
    quit(exitCode?: number);
}

module IOUtils {
    // Creates the directory including its parent if not already present
    function createDirectoryStructure(ioHost: IIO, dirName: string) {
        if (ioHost.directoryExists(dirName)) {
            return;
        }

        var parentDirectory = ioHost.dirName(dirName);
        if (parentDirectory != "") {
            createDirectoryStructure(ioHost, parentDirectory);
        }
        ioHost.createDirectory(dirName);
    }

    // Creates a file including its directory structure if not already present
    export function createFileAndFolderStructure(ioHost: IIO, fileName: string, useUTF8?: boolean) {
        var path = ioHost.resolvePath(fileName);
        var dirName = ioHost.dirName(path);
        createDirectoryStructure(ioHost, dirName);
        return ioHost.createFile(path, useUTF8);
    }

    export function throwIOError(message: string, error: Error) {
        var errorMessage = message;
        if (error && error.message) {
            errorMessage += (" " + error.message);
        }
        throw new Error(errorMessage);
    }
}

// Declare dependencies needed for all supported hosts
declare function setTimeout(callback: () =>void , ms?: number);
declare var require: any;

var IO = (function() {

    // Create an IO object for use inside WindowsScriptHost hosts
    // Depends on WSCript and FileSystemObject
    function getWindowsScriptHostIO(): IIO {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var streamObjectPool = [];

        function getStreamObject(): any { 
            if (streamObjectPool.length > 0) {
                return streamObjectPool.pop();
            }  else {
                return new ActiveXObject("ADODB.Stream");
            }
        }

        function releaseStreamObject(obj: any) { 
            streamObjectPool.push(obj);
        }

        var args = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }

        return {
            readFile: function(path) {
                try {
                    var streamObj = getStreamObject();
                    streamObj.Open();
                    streamObj.Type = 2; // Text data
                    streamObj.Charset = 'x-ansi'; // Assume we are reading ansi text
                    streamObj.LoadFromFile(path);
                    var bomChar = streamObj.ReadText(2); // Read the BOM char
                    streamObj.Position = 0; // Position has to be at 0 before changing the encoding
                    if ((bomChar.charCodeAt(0) == 0xFE && bomChar.charCodeAt(1) == 0xFF)
                        || (bomChar.charCodeAt(0) == 0xFF && bomChar.charCodeAt(1) == 0xFE)) {
                        streamObj.Charset = 'unicode';
                    } else if (bomChar.charCodeAt(0) == 0xEF && bomChar.charCodeAt(1) == 0xBB) {
                        streamObj.Charset = 'utf-8'; 
                    }

                    // Read the whole file
                    var str = streamObj.ReadText(-1 /* read from the current position to EOS */);
                    streamObj.Close();
                    releaseStreamObject(streamObj);
                    return <string>str;
                }
                catch (err) {
                    IOUtils.throwIOError("Error reading file \"" + path + "\".", err);
                }
            },

            writeFile: function(path, contents) {
                var file = this.createFile(path);
                file.Write(contents);
                file.Close();
            },

            fileExists: function(path: string): boolean {
                return fso.FileExists(path);
            },

            resolvePath: function(path: string): string {
                return fso.GetAbsolutePathName(path);
            },

            dirName: function(path: string): string {
                return fso.GetParentFolderName(path);
            },

            findFile: function(rootPath: string, partialFilePath: string): IResolvedFile {
                var path = fso.GetAbsolutePathName(rootPath) + "/" + partialFilePath;

                while (true) {
                    if (fso.FileExists(path)) {
                        try {
                            var content = this.readFile(path);
                            return { content: content, path: path };
                        }
                        catch (err) {
                            //Tools.CompilerDiagnostics.debugPrint("Could not find " + path + ", trying parent");
                        }
                    }
                    else {
                        rootPath = fso.GetParentFolderName(fso.GetAbsolutePathName(rootPath));

                        if (rootPath == "") {
                            return null;
                        }
                        else {
                            path = fso.BuildPath(rootPath, partialFilePath);
                        }
                    }
                }
            },

            deleteFile: function(path: string): void {
                try {
                    if (fso.FileExists(path)) {
                        fso.DeleteFile(path, true); // true: delete read-only files
                    }
                } catch (e) {
                    IOUtils.throwIOError("Couldn't delete file '" + path + "'.", e);
                }
            },

            createFile: function (path, useUTF8?) {
                try {
                    var streamObj = getStreamObject();
                    streamObj.Charset = useUTF8 ? 'utf-8' : 'x-ansi';
                    streamObj.Open();
                    return {
                        Write: function (str) { streamObj.WriteText(str, 0); },
                        WriteLine: function (str) { streamObj.WriteText(str, 1); },
                        Close: function() {
                            try {
                                streamObj.SaveToFile(path, 2);
                            } catch (saveError) {
                                IOUtils.throwIOError("Couldn't write to file '" + path + "'.", saveError);
                            }
                            finally {
                                if (streamObj.State != 0 /*adStateClosed*/) {
                                    streamObj.Close();
                                }
                                releaseStreamObject(streamObj);
                            }
                        }
                    };
                } catch (creationError) {
                    IOUtils.throwIOError("Couldn't write to file '" + path + "'.", creationError);
                }
            },

            directoryExists: function(path) {
                return <boolean>fso.FolderExists(path);
            },

            createDirectory: function(path) {
                try {
                    if (!this.directoryExists(path)) {
                        fso.CreateFolder(path);
                    }
                } catch (e) {
                    IOUtils.throwIOError("Couldn't create directory '" + path + "'.", e);
                }
            },

            dir: function(path, spec?, options?) {
                options = options || <{ recursive?: boolean; }>{};
                function filesInFolder(folder, root): string[]{
                    var paths = [];
                    var fc: Enumerator;

                    if (options.recursive) {
                        fc = new Enumerator(folder.subfolders);

                        for (; !fc.atEnd() ; fc.moveNext()) {
                            paths = paths.concat(filesInFolder(fc.item(), root + "/" + fc.item().Name));
                        }
                    }

                    fc = new Enumerator(folder.files);

                    for (; !fc.atEnd() ; fc.moveNext()) {
                        if (!spec || fc.item().Name.match(spec)) {
                            paths.push(root + "/" + fc.item().Name);
                        }
                    }

                    return paths;
                }

                var folder = fso.GetFolder(path);
                var paths = [];

                return filesInFolder(folder, path);
            },

            print: function(str) {
                WScript.StdOut.Write(str);
            },

            printLine: function(str) {
                WScript.Echo(str);
            },

            arguments: <string[]>args,
            stderr: WScript.StdErr,
            stdout: WScript.StdOut,
            watchFile: null,
            run: function(source, filename) {
                try {
                    eval(source);
                } catch (e) {
                    IOUtils.throwIOError("Error while executing file '" + filename + "'.", e);
                }
            },
            getExecutingFilePath: function () {
                return WScript.ScriptFullName;
            },
            quit: function (exitCode? : number = 0) {
                try {
                    WScript.Quit(exitCode);
                } catch (e) {
                }
            }
        }

    };

    // Create an IO object for use inside Node.js hosts
    // Depends on 'fs' and 'path' modules
    function getNodeIO(): IIO {

        var _fs = require('fs');
        var _path = require('path');
        var _module = require('module');

        return {
            readFile: function(file) {
                try {
                    var buffer = _fs.readFileSync(file);
                    switch (buffer[0]) {
                        case 0xFE:
                            if (buffer[1] == 0xFF) {
                                // utf16-be. Reading the buffer as big endian is not supported, so convert it to 
                                // Little Endian first
                                var i = 0;
                                while ((i + 1) < buffer.length) {
                                    var temp = buffer[i]
                                    buffer[i] = buffer[i + 1];
                                    buffer[i + 1] = temp;
                                    i += 2;
                                }
                                return buffer.toString("ucs2", 2);
                            }
                            break;
                        case 0xFF:
                            if (buffer[1] == 0xFE) {
                                // utf16-le 
                                return buffer.toString("ucs2", 2);
                            }
                            break;
                        case 0xEF:
                            if (buffer[1] == 0xBB) {
                                // utf-8
                                return buffer.toString("utf8", 3);
                            }
                    }
                    // Default behaviour
                    return buffer.toString();
                } catch (e) {
                    IOUtils.throwIOError("Error reading file \"" + file + "\".", e);
                }
            },

            writeFile: <(path: string, contents: string) => void >_fs.writeFileSync,
            deleteFile: function(path) {
                try {
                    _fs.unlinkSync(path);
                } catch (e) {
                    IOUtils.throwIOError("Couldn't delete file '" + path + "'.", e);
                }
            },
            fileExists: function(path): boolean {
                return _fs.existsSync(path);
            },
            createFile: function(path, useUTF8?) {
                function mkdirRecursiveSync(path) {
                    var stats = _fs.statSync(path);
                    if (stats.isFile()) {
                        IOUtils.throwIOError("\"" + path + "\" exists but isn't a directory.", null);
                    } else if (stats.isDirectory()) {
                        return;
                    } else {
                        mkdirRecursiveSync(_path.dirname(path));
                        _fs.mkdirSync(path, 0775);
                    }
                }

                mkdirRecursiveSync(_path.dirname(path));

                try {
                    var fd = _fs.openSync(path, 'w');
                } catch (e) {
                    IOUtils.throwIOError("Couldn't write to file '" + path + "'.", e);
                }
                return {
                    Write: function(str) { _fs.writeSync(fd, str); },
                    WriteLine: function(str) { _fs.writeSync(fd, str + '\r\n'); },
                    Close: function() { _fs.closeSync(fd); fd = null; }
                };
            },
            dir: function dir(path, spec?, options?) {
                options = options || <{ recursive?: boolean; }>{};

                function filesInFolder(folder: string): string[]{
                    var paths = [];

                    var files = _fs.readdirSync(folder);
                    for (var i = 0; i < files.length; i++) {
                        var stat = _fs.statSync(folder + "/" + files[i]);
                        if (options.recursive && stat.isDirectory()) {
                            paths = paths.concat(filesInFolder(folder + "/" + files[i]));
                        } else if (stat.isFile() && (!spec || files[i].match(spec))) {
                            paths.push(folder + "/" + files[i]);
                        }
                    }

                    return paths;
                }

                return filesInFolder(path);
            },
            createDirectory: function(path: string): void {
                try {
                    if (!this.directoryExists(path)) {
                        _fs.mkdirSync(path);
                    }
                } catch (e) {
                    IOUtils.throwIOError("Couldn't create directory '" + path + "'.", e);
                }
            },

            directoryExists: function(path: string): boolean {
                return _fs.existsSync(path) && _fs.lstatSync(path).isDirectory();
            },
            resolvePath: function(path: string): string {
                return _path.resolve(path);
            },
            dirName: function(path: string): string {
                return _path.dirname(path);
            },
            findFile: function(rootPath: string, partialFilePath): IResolvedFile {
                var path = rootPath + "/" + partialFilePath;

                while (true) {
                    if (_fs.existsSync(path)) {
                        try {
                            var content = this.readFile(path);
                            return { content: content, path: path };
                        } catch (err) {
                            //Tools.CompilerDiagnostics.debugPrint(("Could not find " + path) + ", trying parent");
                        }
                    }
                    else {
                        var parentPath = _path.resolve(rootPath, "..");

                        // Node will just continue to repeat the root path, rather than return null
                        if (rootPath === parentPath) {
                            return null;
                        }
                        else {
                            rootPath = parentPath;
                            path = _path.resolve(rootPath, partialFilePath);
                        }
                    }
                }
            },
            print: function(str) { process.stdout.write(str) },
            printLine: function(str) { process.stdout.write(str + '\n') },
            arguments: process.argv.slice(2),
            stderr: {
                Write: function(str) { process.stderr.write(str); },
                WriteLine: function(str) { process.stderr.write(str + '\n'); },
                Close: function() { }
            },
            stdout: {
                Write: function(str) { process.stdout.write(str); },
                WriteLine: function(str) { process.stdout.write(str + '\n'); },
                Close: function() { }
            },
            watchFile: function(filename: string, callback: (string) => void ): IFileWatcher {
                var firstRun = true;
                var processingChange = false;

                var fileChanged: any = function(curr, prev) {
                    if (!firstRun) {
                        if (curr.mtime < prev.mtime) {
                            return;
                        }

                        _fs.unwatchFile(filename, fileChanged);
                        if (!processingChange) {
                            processingChange = true;
                            callback(filename);
                            setTimeout(function() { processingChange = false; }, 100);
                        }
                    }
                    firstRun = false;
                    _fs.watchFile(filename, { persistent: true, interval: 500 }, fileChanged);
                };

                fileChanged();
                return {
                    filename: filename,
                    close: function() {
                        _fs.unwatchFile(filename, fileChanged);
                    }
                };
            },
            run: function(source, filename) {
                require.main.filename = filename;
                require.main.paths = _module._nodeModulePaths(_path.dirname(_fs.realpathSync(filename)));
                require.main._compile(source, filename);
            }, 
            getExecutingFilePath: function () {
                return process.mainModule.filename;
            },
            quit: process.exit
        }
    };

    if (typeof ActiveXObject === "function")
        return getWindowsScriptHostIO();
    else if (typeof require === "function")
        return getNodeIO();
    else
        return null; // Unsupported host
})();
