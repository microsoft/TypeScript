//
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

/// <reference path='..\services\services.ts' />
/// <reference path='..\services\shims.ts' />
/// <reference path='..\compiler\sys.ts' />
/// <reference path='external\mocha.d.ts'/>
/// <reference path='external\chai.d.ts'/>
/// <reference path='sourceMapRecorder.ts'/>

// this will work in the browser via browserify
var _chai: typeof chai = require('chai');
var assert: typeof _chai.assert = _chai.assert;
declare var __dirname: any; // Node-specific
var global = <any>Function("return this").call(null);

module Utils {
    var global = <any>Function("return this").call(null);

    // Setup some globals based on the current environment
    export enum ExecutionEnvironment {
        Node,
        Browser,
        CScript
    }

    export function getExecutionEnvironment() {
        if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
            return ExecutionEnvironment.CScript;
        } else if (process && (<any>process).execPath && (<any>process).execPath.indexOf("node") !== -1) {
            return ExecutionEnvironment.Node;
        } else {
            return ExecutionEnvironment.Browser;
        }
    }

    export var currentExecutionEnvironment = getExecutionEnvironment();

    export function evalFile(fileContents: string, filename: string, nodeContext?: any) {
        var environment = getExecutionEnvironment();
        switch (environment) {
            case ExecutionEnvironment.CScript:
            case ExecutionEnvironment.Browser:
                eval(fileContents);
                break;
            case ExecutionEnvironment.Node:
                var vm = require('vm');
                if (nodeContext) {
                    vm.runInNewContext(fileContents, nodeContext, filename);
                } else {
                    vm.runInThisContext(fileContents, filename);
                }
                break;
            default:
                throw new Error('Unknown context');
        }
    }

    /** Splits the given string on \r\n or on only \n if that fails */
    export function splitContentByNewlines(content: string) {
        // Split up the input file by line
        // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
        // we have to string-based splitting instead and try to figure out the delimiting chars
        var lines = content.split('\r\n');
        if (lines.length === 1) {
            lines = content.split('\n');
        }
        return lines;
    }

    /** Reads a file under /tests */
    export function readTestFile(path: string) {
        if (path.indexOf('tests') < 0) {
            path = "tests/" + path;
        }

        try {
            var content = sys.readFile(Harness.userSpecifiedroot + path);
        }
        catch (err) {
            return undefined;
        }

        return content;
    }

    export function memoize<T extends Function>(f: T): T {
        var cache: { [idx: string]: any } = {};

        return <any>(() => {
            var key = Array.prototype.join.call(arguments);
            var cachedResult = cache[key];
            if (cachedResult) {
                return cachedResult;
            } else {
                return cache[key] = f.apply(this, arguments);
            }
        });
    }
}

module Harness.Path {
    export function getFileName(fullPath: string) {
        return fullPath.replace(/^.*[\\\/]/, '');
    }

    export function filePath(fullPath: string) {
        fullPath = switchToForwardSlashes(fullPath);
        var components = fullPath.split("/");
        var path: string[] = components.slice(0, components.length - 1);
        return path.join("/") + "/";
    }

    export function switchToForwardSlashes(path: string) {
        return path.replace(/\\/g, "/").replace(/\/\//g, '/');
    }
}

module Harness {
    export interface IO {
        readFile(path: string): string;
        writeFile(path: string, contents: string): void;
        directoryName(path: string): string;
        createDirectory(path: string): void;
        fileExists(filename: string): boolean;
        directoryExists(path: string): boolean;
        deleteFile(filename: string): void;
        listFiles(path: string, filter: RegExp, options?: { recursive?: boolean }): string[];
        log(text: string): void;
        getMemoryUsage? (): number;
    }

    module IOImpl {
        declare class Enumerator {
            public atEnd(): boolean;
            public moveNext(): boolean;
            public item(): any;
            constructor(o: any);
        }

        export module CScript {
            var fso: any;
            if (global.ActiveXObject) {
                fso = new global.ActiveXObject("Scripting.FileSystemObject");
            } else {
                fso = {};
            }

            export var readFile: typeof IO.readFile = sys.readFile;
            export var writeFile: typeof IO.writeFile = sys.writeFile;
            export var directoryName: typeof IO.directoryName = fso.GetParentFolderName;
            export var directoryExists: typeof IO.directoryExists = fso.FolderExists;
            export var fileExists: typeof IO.fileExists = fso.FileExists;
            export var log: typeof IO.log = global.WScript && global.WScript.StdOut.WriteLine;

            export function createDirectory(path: string) {
                if (directoryExists(path)) {
                    fso.CreateFolder(path);
                }
            }

            export function deleteFile(path: string) {
                if (fileExists(path)) {
                    fso.DeleteFile(path, true); // true: delete read-only files
                }
            }

            export var listFiles: typeof IO.listFiles = (path, spec?, options?) => {
                options = options || <{ recursive?: boolean; }>{};
                function filesInFolder(folder: any, root: string): string[] {
                    var paths: string[] = [];
                    var fc: any;

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

            }
        }

        export module Node {
            declare var require: any;
            var fs: any, pathModule: any;
            if (require) {
                fs = require('fs');
                pathModule = require('path');
            } else {
                fs = pathModule = {};
            }

            export var readFile: typeof IO.readFile = sys.readFile;
            export var writeFile: typeof IO.writeFile = sys.writeFile;
            export var fileExists: typeof IO.fileExists = fs.existsSync;
            export var log: typeof IO.log = console.log;

            export function createDirectory(path: string) {
                if (!directoryExists(path)) {
                    fs.mkdirSync(path);
                }
            }

            export function deleteFile(path: string) {
                try {
                    fs.unlinkSync(path);
                } catch (e) {
                }
            }

            export function directoryExists(path: string): boolean {
                return fs.existsSync(path) && fs.statSync(path).isDirectory();
            }

            export function directoryName(path: string) {
                var dirPath = pathModule.dirname(path);

                // Node will just continue to repeat the root path, rather than return null
                if (dirPath === path) {
                    dirPath = null;
                } else {
                    return dirPath;
                }
            }

            export var listFiles: typeof IO.listFiles = (path, spec?, options?) => {
                options = options || <{ recursive?: boolean; }>{};

                function filesInFolder(folder: string): string[] {
                    var paths: string[] = [];

                    var files = fs.readdirSync(folder);
                    for (var i = 0; i < files.length; i++) {
                        var pathToFile = pathModule.join(folder, files[i]);
                        var stat = fs.statSync(pathToFile);
                        if (options.recursive && stat.isDirectory()) {
                            paths = paths.concat(filesInFolder(pathToFile));
                        }
                        else if (stat.isFile() && (!spec || files[i].match(spec))) {
                            paths.push(pathToFile);
                        }
                    }

                    return paths;
                }

                return filesInFolder(path);
            }

            export var getMemoryUsage: typeof IO.getMemoryUsage = () => {
                if (global.gc) {
                    global.gc();
                }
                return process.memoryUsage().heapUsed;
            }
        }

        export module Network {
            var serverRoot = "http://localhost:8888/";

            // Unused?
            var newLine = '\r\n';
            var currentDirectory = () => '';
            var supportsCodePage = () => false;

            module Http {
                function waitForXHR(xhr: XMLHttpRequest) {
                    while (xhr.readyState !== 4) { }
                    return { status: xhr.status, responseText: xhr.responseText };
                }

                /// Ask the server to use node's path.resolve to resolve the given path
                function getResolvedPathFromServer(path: string) {
                    var xhr = new XMLHttpRequest();
                    try {
                        xhr.open("GET", path + "?resolve", false);
                        xhr.send();
                    }
                    catch (e) {
                        return { status: 404, responseText: null };
                    }

                    return waitForXHR(xhr);
                }

                export interface XHRResponse {
                    status: number;
                    responseText: string;
                }

                /// Ask the server for the contents of the file at the given URL via a simple GET request
                export function getFileFromServerSync(url: string): XHRResponse {
                    var xhr = new XMLHttpRequest();
                    try {
                        xhr.open("GET", url, false);
                        xhr.send();
                    }
                    catch (e) {
                        return { status: 404, responseText: null };
                    }

                    return waitForXHR(xhr);
                }

                /// Submit a POST request to the server to do the given action (ex WRITE, DELETE) on the provided URL
                export function writeToServerSync(url: string, action: string, contents?: string): XHRResponse {
                    var xhr = new XMLHttpRequest();
                    try {
                        var action = '?action=' + action;
                        xhr.open('POST', url + action, false);
                        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                        xhr.send(contents);
                    }
                    catch (e) {
                        return { status: 500, responseText: null };
                    }

                    return waitForXHR(xhr);
                }
            }

            export function createDirectory(path: string) {
                // Do nothing (?)
            }

            export function deleteFile(path: string) {
                Http.writeToServerSync(serverRoot + path, 'DELETE', null);
            }

            export function directoryExists(path: string): boolean {
                return false;
            }

            function directoryNameImpl(path: string) {
                var dirPath = path;
                // root of the server
                if (dirPath.match(/localhost:\d+$/) || dirPath.match(/localhost:\d+\/$/)) {
                    dirPath = null;
                    // path + filename
                } else if (dirPath.indexOf('.') === -1) {
                    dirPath = dirPath.substring(0, dirPath.lastIndexOf('/'));
                    // path
                } else {
                    // strip any trailing slash
                    if (dirPath.match(/.*\/$/)) {
                        dirPath = dirPath.substring(0, dirPath.length - 2);
                    }
                    var dirPath = dirPath.substring(0, dirPath.lastIndexOf('/'));
                }

                return dirPath;
            }
            export var directoryName: typeof IO.directoryName = Utils.memoize(directoryNameImpl);

            export function fileExists(path: string): boolean {
                var response = Http.getFileFromServerSync(serverRoot + path);
                return response.status === 200;
            }

            export function _listFilesImpl(path: string, spec?: RegExp, options?: any) {
                var response = Http.getFileFromServerSync(serverRoot + path);
                if (response.status === 200) {
                    var results = response.responseText.split(',');
                    if (spec) {
                        return results.filter(file => spec.test(file));
                    } else {
                        return results;
                    }
                }
                else {
                    return [''];
                }
            };
            export var listFiles = Utils.memoize(_listFilesImpl);

            export var log = console.log;

            export function readFile(file: string) {
                var response = Http.getFileFromServerSync(serverRoot + file);
                if (response.status === 200) {
                    return response.responseText;
                } else {
                    return null;
                }
            }

            export function writeFile(path: string, contents: string) {
                Http.writeToServerSync(serverRoot + path, 'WRITE', contents);
            }
        }
    }

    export var IO: IO;
    switch (Utils.getExecutionEnvironment()) {
        case Utils.ExecutionEnvironment.CScript:
            IO = IOImpl.CScript;
            break;
        case Utils.ExecutionEnvironment.Node:
            IO = IOImpl.Node;
            break;
        case Utils.ExecutionEnvironment.Browser:
            IO = IOImpl.Network;
            break;
    }
}



module Harness {
    var tcServicesFilename = "typescriptServices.js";

    export var libFolder: string;
    switch (Utils.getExecutionEnvironment()) {
        case Utils.ExecutionEnvironment.CScript:
            libFolder = "built/local/";
            tcServicesFilename = "built/local/typescriptServices.js";
            break;
        case Utils.ExecutionEnvironment.Node:
            libFolder = "built/local/";
            tcServicesFilename = "built/local/typescriptServices.js";
            break;
        case Utils.ExecutionEnvironment.Browser:
            libFolder = "built/local/";
            tcServicesFilename = "built/local/typescriptServices.js";
            break;
        default:
            throw new Error('Unknown context');
    }
    export var tcServicesFile = IO.readFile(tcServicesFilename);

    export interface SourceMapEmitterCallback {
        (emittedFile: string, emittedLine: number, emittedColumn: number, sourceFile: string, sourceLine: number, sourceColumn: number, sourceName: string): void;
    }

    // Settings 
    export var userSpecifiedroot = "";

    /** Functionality for compiling TypeScript code */
    export module Compiler {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        export class WriterAggregator implements ITextWriter {
            public lines: string[] = [];
            public currentLine = <string>undefined;

            public Write(str: string) {
                // out of memory usage concerns avoid using + or += if we're going to do any manipulation of this string later
                this.currentLine = [(this.currentLine || ''), str].join('');
            }

            public WriteLine(str: string) {
                // out of memory usage concerns avoid using + or += if we're going to do any manipulation of this string later
                this.lines.push([(this.currentLine || ''), str].join(''));
                this.currentLine = undefined;
            }

            public Close() {
                if (this.currentLine !== undefined) { this.lines.push(this.currentLine); }
                this.currentLine = undefined;
            }

            public reset() {
                this.lines = [];
                this.currentLine = undefined;
            }
        }

        export interface IEmitterIOHost {
            writeFile(path: string, contents: string, writeByteOrderMark: boolean): void;
            resolvePath(path: string): string;
        }

        /** Mimics having multiple files, later concatenated to a single file. */
        export class EmitterIOHost implements IEmitterIOHost {
            private fileCollection: any = {};

            /** create file gets the whole path to create, so this works as expected with the --out parameter */
            public writeFile(s: string, contents: string, writeByteOrderMark: boolean): void {
                var writer: ITextWriter;
                if (this.fileCollection[s]) {
                    writer = <ITextWriter>this.fileCollection[s];
                }
                else {
                    writer = new Harness.Compiler.WriterAggregator();
                    this.fileCollection[s] = writer;
                }

                writer.Write(contents);
                writer.Close();
            }

            public resolvePath(s: string) { return s; }

            public reset() { this.fileCollection = {}; }

            public toArray(): { fileName: string; file: WriterAggregator; }[] {
                var result: { fileName: string; file: WriterAggregator; }[] = [];
                for (var p in this.fileCollection) {
                    if (this.fileCollection.hasOwnProperty(p)) {
                        var current = <Harness.Compiler.WriterAggregator>this.fileCollection[p];
                        if (current.lines.length > 0) {
                            if (p.indexOf('.d.ts') !== -1) { current.lines.unshift(['////[', Path.getFileName(p), ']'].join('')); }
                            result.push({ fileName: p, file: this.fileCollection[p] });
                        }
                    }
                }
                return result;
            }
        }

        export var defaultLibFileName = 'lib.d.ts';
        export var defaultLibSourceFile = ts.createSourceFile(defaultLibFileName, IO.readFile(libFolder + 'lib.core.d.ts'), /*languageVersion*/ ts.ScriptTarget.ES5, /*version:*/ "0");

        // Cache these between executions so we don't have to re-parse them for every test
        export var fourslashFilename = 'fourslash.ts';
        export var fourslashSourceFile: ts.SourceFile;

        export function getCanonicalFileName(fileName: string): string {
            return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }

        export function createCompilerHost(inputFiles: { unitName: string; content: string; }[],
            writeFile: (fn: string, contents: string, writeByteOrderMark: boolean) => void,
            scriptTarget: ts.ScriptTarget,
            useCaseSensitiveFileNames: boolean): ts.CompilerHost {

            // Local get canonical file name function, that depends on passed in parameter for useCaseSensitiveFileNames
            function getCanonicalFileName(fileName: string): string {
                return useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            }

            var filemap: { [filename: string]: ts.SourceFile; } = {};
            // Register input files
            function register(file: { unitName: string; content: string; }) {
                if (file.content !== undefined) {
                    var filename = Path.switchToForwardSlashes(file.unitName);
                    filemap[getCanonicalFileName(filename)] = ts.createSourceFile(filename, file.content, scriptTarget, /*version:*/ "0");
                }
            };
            inputFiles.forEach(register);

            return {
                getCurrentDirectory: sys.getCurrentDirectory,
                getCancellationToken: (): any => undefined,
                getSourceFile: (fn, languageVersion) => {
                    if (Object.prototype.hasOwnProperty.call(filemap, getCanonicalFileName(fn))) {
                        return filemap[getCanonicalFileName(fn)];
                    }
                    else if (fn === fourslashFilename) {
                        var tsFn = 'tests/cases/fourslash/' + fourslashFilename;
                        fourslashSourceFile = fourslashSourceFile || ts.createSourceFile(tsFn, Harness.IO.readFile(tsFn), scriptTarget, /*version*/ "0", /*isOpen*/ false);
                        return fourslashSourceFile;
                    }
                    else {
                        var lib = defaultLibFileName;
                        if (fn === defaultLibFileName) {
                            return defaultLibSourceFile;
                        }
                        // Don't throw here -- the compiler might be looking for a test that actually doesn't exist as part of the TC
                        return null;
                    }
                },
                getDefaultLibFilename: () => defaultLibFileName,
                writeFile: writeFile,
                getCanonicalFileName: getCanonicalFileName,
                useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
                getNewLine: ()=> sys.newLine
            };
        }

        export class HarnessCompiler {
            private inputFiles: { unitName: string; content: string }[] = [];
            private compileOptions: ts.CompilerOptions;
            private settings: Harness.TestCaseParser.CompilerSetting[] = [];

            private lastErrors: HarnessDiagnostic[];

            public reset() {
                this.inputFiles = [];
                this.settings = [];
                this.lastErrors = [];
            }

            public reportCompilationErrors() {
                return this.lastErrors;
            }

            public setCompilerSettingsFromOptions(tcSettings: ts.CompilerOptions) {
                this.settings = Object.keys(tcSettings).map(k => ({ flag: k, value: (<any>tcSettings)[k] }));
            }

            public setCompilerSettings(tcSettings: Harness.TestCaseParser.CompilerSetting[]) {
                this.settings = tcSettings;
            }

            public addInputFiles(files: { unitName: string; content: string }[]) {
                files.forEach(file => this.addInputFile(file));
            }

            public addInputFile(file: { unitName: string; content: string }) {
                this.inputFiles.push(file);
            }

            public setCompilerOptions(options?: ts.CompilerOptions) {
                this.compileOptions = options || { noResolve: false };
            }

            public emitAll(ioHost?: IEmitterIOHost) {
                this.compileFiles(this.inputFiles, [], (result) => {
                    result.files.forEach(file => {
                        ioHost.writeFile(file.fileName, file.code, false);
                    });
                    result.declFilesCode.forEach(file => {
                        ioHost.writeFile(file.fileName, file.code, false);
                    });
                    result.sourceMaps.forEach(file => {
                        ioHost.writeFile(file.fileName, file.code, false);
                    });
                }, () => { }, this.compileOptions);
            }

            public compileFiles(inputFiles: { unitName: string; content: string }[],
                otherFiles: { unitName: string; content: string }[],
                onComplete: (result: CompilerResult, checker: ts.TypeChecker) => void,
                settingsCallback?: (settings: ts.CompilerOptions) => void,
                options?: ts.CompilerOptions) {

                options = options || { noResolve: false };
                options.target = options.target || ts.ScriptTarget.ES3;
                options.module = options.module || ts.ModuleKind.None;
                options.noErrorTruncation = true;

                if (settingsCallback) {
                    settingsCallback(null);
                }

                var useCaseSensitiveFileNames = sys.useCaseSensitiveFileNames;
                this.settings.forEach(setting => {
                    switch (setting.flag.toLowerCase()) {
                        // "filename", "comments", "declaration", "module", "nolib", "sourcemap", "target", "out", "outdir", "noimplicitany", "noresolve"
                        case "module":
                        case "modulegentarget":
                            if (typeof setting.value === 'string') {
                                if (setting.value.toLowerCase() === 'amd') {
                                    options.module = ts.ModuleKind.AMD;
                                } else if (setting.value.toLowerCase() === 'commonjs') {
                                    options.module = ts.ModuleKind.CommonJS;
                                } else if (setting.value.toLowerCase() === 'unspecified') {
                                    options.module = ts.ModuleKind.None;
                                } else {
                                    throw new Error('Unknown module type ' + setting.value);
                                }
                            } else {
                                options.module = <any>setting.value;
                            }
                            break;

                        case "target":
                        case 'codegentarget':
                            if (typeof setting.value === 'string') {
                                if (setting.value.toLowerCase() === 'es3') {
                                    options.target = ts.ScriptTarget.ES3;
                                } else if (setting.value.toLowerCase() === 'es5') {
                                    options.target = ts.ScriptTarget.ES5;
                                } else {
                                    throw new Error('Unknown compile target ' + setting.value);
                                }
                            } else {
                                options.target = <any>setting.value;
                            }
                            break;

                        case 'noresolve':
                            options.noResolve = !!setting.value;
                            break;

                        case 'noimplicitany':
                            options.noImplicitAny = !!setting.value;
                            break;

                        case 'nolib':
                            options.noLib = !!setting.value;
                            break;

                        case 'out':
                        case 'outfileoption':
                            options.out = setting.value;
                            break;

                        case 'outdiroption':
                        case 'outdir':
                            options.outDir = setting.value;
                            break;

                        case 'sourceroot':
                            options.sourceRoot = setting.value;
                            break;

                        case 'sourcemap':
                            options.sourceMap = !!setting.value;
                            break;

                        case 'declaration':
                            options.declaration = !!setting.value;
                            break;

                        case 'newline':
                        case 'newlines':
                            sys.newLine = setting.value;
                            break;

                        case 'comments':
                            options.removeComments = setting.value === 'false';
                            break;

                        case 'usecasesensitivefilenames':
                            useCaseSensitiveFileNames = setting.value === 'true';
                            break;

                        case 'mapsourcefiles':
                        case 'maproot':
                        case 'generatedeclarationfiles':
                        case 'gatherDiagnostics':
                        case 'codepage':
                        case 'createFileLog':
                        case 'filename':
                        case 'propagateenumconstants':
                        case 'removecomments':
                        case 'watch':
                        case 'allowautomaticsemicoloninsertion':
                        case 'locale':
                            // Not supported yet
                            break;

                        case 'emitbom':
                            options.emitBOM = !!setting.value;
                            break;

                        case 'errortruncation':
                            options.noErrorTruncation = setting.value === 'false';
                            break;

                        default:
                            throw new Error('Unsupported compiler setting ' + setting.flag);
                    }
                });

                var filemap: { [name: string]: ts.SourceFile; } = {};
                var register = (file: { unitName: string; content: string; }) => {
                    if (file.content !== undefined) {
                        var filename = Path.switchToForwardSlashes(file.unitName);
                        filemap[getCanonicalFileName(filename)] = ts.createSourceFile(filename, file.content, options.target, /*version:*/ "0");
                    }
                };
                inputFiles.forEach(register);
                otherFiles.forEach(register);

                var fileOutputs: GeneratedFile[] = [];

                var programFiles = inputFiles.map(file => file.unitName);
                var program = ts.createProgram(programFiles, options, createCompilerHost(inputFiles.concat(otherFiles),
                    (fn, contents, writeByteOrderMark) => fileOutputs.push({ fileName: fn, code: contents, writeByteOrderMark: writeByteOrderMark }),
                    options.target,
                    useCaseSensitiveFileNames));

                var hadParseErrors = program.getDiagnostics().length > 0;

                var checker = program.getTypeChecker(/*fullTypeCheckMode*/ true);
                checker.checkProgram();

                // only emit if there weren't parse errors
                var emitResult: ts.EmitResult;
                if (!hadParseErrors) {
                    emitResult = checker.emitFiles();
                }

                var errors: HarnessDiagnostic[] = [];
                program.getDiagnostics().concat(checker.getDiagnostics()).concat(emitResult ? emitResult.errors : []).forEach(err => {
                    // TODO: new compiler formats errors after this point to add . and newlines so we'll just do it manually for now
                    errors.push(getMinimalDiagnostic(err));
                });
                this.lastErrors = errors;

                var result = new CompilerResult(fileOutputs, errors, program, sys.getCurrentDirectory(), emitResult ? emitResult.sourceMaps : undefined);
                onComplete(result, checker);

                // reset what newline means in case the last test changed it
                sys.newLine = '\r\n';
                return options;
            }

            public compileDeclarationFiles(inputFiles: { unitName: string; content: string; }[],
                otherFiles: { unitName: string; content: string; }[],
                result: CompilerResult,
                settingsCallback?: (settings: ts.CompilerOptions) => void,
                options?: ts.CompilerOptions) {
                if (options.declaration && result.errors.length === 0 && result.declFilesCode.length !== result.files.length) {
                    throw new Error('There were no errors and declFiles generated did not match number of js files generated');
                }

                // if the .d.ts is non-empty, confirm it compiles correctly as well
                if (options.declaration && result.errors.length === 0 && result.declFilesCode.length > 0) {
                    var declInputFiles: { unitName: string; content: string }[] = [];
                    var declOtherFiles: { unitName: string; content: string }[] = [];
                    var declResult: Harness.Compiler.CompilerResult;

                    ts.forEach(inputFiles, file => addDtsFile(file, declInputFiles));
                    ts.forEach(otherFiles, file => addDtsFile(file, declOtherFiles));
                    this.compileFiles(declInputFiles, declOtherFiles, function (compileResult) {
                        declResult = compileResult;
                    }, settingsCallback, options);

                    return { declInputFiles: declInputFiles, declOtherFiles: declOtherFiles, declResult: declResult };
                }

                function addDtsFile(file: { unitName: string; content: string }, dtsFiles: { unitName: string; content: string }[]) {
                    if (isDTS(file.unitName)) {
                        dtsFiles.push(file);
                    }
                    else if (isTS(file.unitName)) {
                        var declFile = findResultCodeFile(file.unitName);
                        if (!findUnit(declFile.fileName, declInputFiles) && !findUnit(declFile.fileName, declOtherFiles)) {
                            dtsFiles.push({ unitName: declFile.fileName, content: declFile.code });
                        }
                    }

                    function findResultCodeFile(fileName: string) {
                        var dTsFileName = ts.forEach(result.program.getSourceFiles(), sourceFile => {
                            if (sourceFile.filename === fileName) {
                                // Is this file going to be emitted separately
                                var sourceFileName: string;
                                if (ts.isExternalModule(sourceFile) || !options.out) {
                                    if (options.outDir) {
                                        var sourceFilePath = ts.getNormalizedPathFromPathComponents(ts.getNormalizedPathComponents(sourceFile.filename, result.currentDirectoryForProgram));
                                        sourceFilePath = sourceFilePath.replace(result.program.getCommonSourceDirectory(), "");
                                        sourceFileName = ts.combinePaths(options.outDir, sourceFilePath);
                                    }
                                    else {
                                        sourceFileName = sourceFile.filename;
                                    }
                                }
                                else {
                                    // Goes to single --out file
                                    sourceFileName = options.out;
                                }

                                return ts.removeFileExtension(sourceFileName) + ".d.ts";
                            }
                        });
                        
                        return ts.forEach(result.declFilesCode, declFile => declFile.fileName === dTsFileName ? declFile : undefined);
                    }

                    function findUnit(fileName: string, units: { unitName: string; content: string; }[]) {
                        return ts.forEach(units, unit => unit.unitName === fileName ? unit : undefined);
                    }
                }
            }
        }

        export function getMinimalDiagnostic(err: ts.Diagnostic): HarnessDiagnostic {
            var errorLineInfo = err.file ? err.file.getLineAndCharacterFromPosition(err.start) : { line: 0, character: 0 };
            return {
                filename: err.file && err.file.filename,
                start: err.start,
                end: err.start + err.length,
                line: errorLineInfo.line,
                character: errorLineInfo.character,
                message: err.messageText,
                category: ts.DiagnosticCategory[err.category].toLowerCase(),
                code: err.code
            };
        }

        export function minimalDiagnosticsToString(diagnostics: HarnessDiagnostic[]) {
            // This is basically copied from tsc.ts's reportError to replicate what tsc does
            var errorOutput = "";
            ts.forEach(diagnostics, diagnotic => {
                if (diagnotic.filename) {
                    errorOutput += diagnotic.filename + "(" + diagnotic.line + "," + diagnotic.character + "): ";
                }

                errorOutput += diagnotic.category + " TS" + diagnotic.code + ": " + diagnotic.message + sys.newLine;
            });

            return errorOutput;
        }

        export function getErrorBaseline(inputFiles: { unitName: string; content: string }[], diagnostics: HarnessDiagnostic[]) {

            var outputLines: string[] = [];
            // Count up all the errors we find so we don't miss any
            var totalErrorsReported = 0;

            function outputErrorText(error: Harness.Compiler.HarnessDiagnostic) {
                var errLines = RunnerBase.removeFullPaths(error.message)
                    .split('\n')
                    .map(s => s.length > 0 && s.charAt(s.length - 1) === '\r' ? s.substr(0, s.length - 1) : s)
                    .filter(s => s.length > 0)
                    .map(s => '!!! ' + error.category + " TS" + error.code + ": " + s);
                errLines.forEach(e => outputLines.push(e));

                totalErrorsReported++;
            }

            // Report global errors
            var globalErrors = diagnostics.filter(err => !err.filename);
            globalErrors.forEach(err => outputErrorText(err));

            // 'merge' the lines of each input file with any errors associated with it
            inputFiles.filter(f => f.content !== undefined).forEach(inputFile => {
                // Filter down to the errors in the file
                var fileErrors = diagnostics.filter(e => {
                    var errFn = e.filename;
                    return errFn && errFn === inputFile.unitName;
                });


                // Header
                outputLines.push('==== ' + inputFile.unitName + ' (' + fileErrors.length + ' errors) ====');

                // Make sure we emit something for every error
                var markedErrorCount = 0;
                // For each line, emit the line followed by any error squiggles matching this line
                // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
                // we have to string-based splitting instead and try to figure out the delimiting chars

                var lineStarts = ts.getLineStarts(inputFile.content);
                var lines = inputFile.content.split('\n');
                lines.forEach((line, lineIndex) => {
                    if (line.length > 0 && line.charAt(line.length - 1) === '\r') {
                        line = line.substr(0, line.length - 1);
                    }

                    var thisLineStart = lineStarts[lineIndex];
                    var nextLineStart: number;
                    // On the last line of the file, fake the next line start number so that we handle errors on the last character of the file correctly
                    if (lineIndex === lines.length - 1) {
                        nextLineStart = inputFile.content.length;
                    } else {
                        nextLineStart = lineStarts[lineIndex + 1];
                    }
                    // Emit this line from the original file
                    outputLines.push('    ' + line);
                    fileErrors.forEach(err => {
                        // Does any error start or continue on to this line? Emit squiggles
                        if ((err.end >= thisLineStart) && ((err.start < nextLineStart) || (lineIndex === lines.length - 1))) {
                            // How many characters from the start of this line the error starts at (could be positive or negative)
                            var relativeOffset = err.start - thisLineStart;
                            // How many characters of the error are on this line (might be longer than this line in reality)
                            var length = (err.end - err.start) - Math.max(0, thisLineStart - err.start);
                            // Calculate the start of the squiggle
                            var squiggleStart = Math.max(0, relativeOffset);
                            // TODO/REVIEW: this doesn't work quite right in the browser if a multi file test has files whose names are just the right length relative to one another
                            outputLines.push('    ' + line.substr(0, squiggleStart).replace(/[^\s]/g, ' ') + new Array(Math.min(length, line.length - squiggleStart) + 1).join('~'));

                            // If the error ended here, or we're at the end of the file, emit its message
                            if ((lineIndex === lines.length - 1) || nextLineStart > err.end) {
                                // Just like above, we need to do a split on a string instead of on a regex
                                // because the JS engine does regexes wrong

                                outputErrorText(err);
                                markedErrorCount++;
                            }
                        }
                    });
                });

                // Verify we didn't miss any errors in this file
                assert.equal(markedErrorCount, fileErrors.length, 'count of errors in ' + inputFile.unitName);
            });

            // Verify we didn't miss any errors in total
            assert.equal(totalErrorsReported, diagnostics.length, 'total number of errors');

            return minimalDiagnosticsToString(diagnostics) +
                sys.newLine + sys.newLine + outputLines.join('\r\n');
        }

        /* TODO: Delete?
        export function makeDefaultCompilerSettings(options?: { useMinimalDefaultLib: boolean; noImplicitAny: boolean; }) {
            var useMinimalDefaultLib = options ? options.useMinimalDefaultLib : true;
            var noImplicitAny = options ? options.noImplicitAny : false;
            var settings = new TypeScript.CompilationSettings();
            settings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;
            settings.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
            settings.noLib = useMinimalDefaultLib;
            settings.noResolve = false;
            settings.noImplicitAny = noImplicitAny;
            return settings;
        }
        */

        /** The harness' compiler instance used when tests are actually run. Reseting or changing settings of this compiler instance must be done within a test case (i.e., describe/it) */
        var harnessCompiler: HarnessCompiler;

        /** Returns the singleton harness compiler instance for generating and running tests.
            If required a fresh compiler instance will be created, otherwise the existing singleton will be re-used.
        */
        export function getCompiler(opts?: { useExistingInstance: boolean; optionsForFreshInstance?: { useMinimalDefaultLib: boolean; noImplicitAny: boolean; } }) {
            return harnessCompiler = harnessCompiler || new HarnessCompiler();
        }

        // This does not need to exist strictly speaking, but many tests will need to be updated if it's removed
        export function compileString(code: string, unitName: string, callback: (result: CompilerResult) => void) {
            // NEWTODO: Re-implement 'compileString'
            throw new Error('compileString NYI');
            //var harnessCompiler = Harness.Compiler.getCompiler(Harness.Compiler.CompilerInstance.RunTime);
            //harnessCompiler.compileString(code, unitName, callback);
        }

        export interface HarnessDiagnostic {
            filename: string;
            start: number;
            end: number;
            line: number;
            character: number;
            message: string;
            category: string;
            code: number;
        }

        export interface GeneratedFile {
            fileName: string;
            code: string;
            writeByteOrderMark: boolean;
        }

        function stringEndsWith(str: string, end: string) {
            return str.substr(str.length - end.length) === end;
        }

        export function isTS(fileName: string) {
            return stringEndsWith(fileName, '.ts');
        }

        export function isDTS(fileName: string) {
            return stringEndsWith(fileName, '.d.ts');
        }

        export function isJS(fileName: string) {
            return stringEndsWith(fileName, '.js');
        }

        export function isJSMap(fileName: string) {
            return stringEndsWith(fileName, '.js.map');
        }

        /** Contains the code and errors of a compilation and some helper methods to check its status. */
        export class CompilerResult {
            public files: GeneratedFile[] = [];
            public errors: HarnessDiagnostic[] = [];
            public declFilesCode: GeneratedFile[] = [];
            public sourceMaps: GeneratedFile[] = [];

            /** @param fileResults an array of strings for the fileName and an ITextWriter with its code */
            constructor(fileResults: GeneratedFile[], errors: HarnessDiagnostic[], public program: ts.Program,
                public currentDirectoryForProgram: string, private sourceMapData: ts.SourceMapData[]) {
                var lines: string[] = [];

                fileResults.forEach(emittedFile => {
                    if (isDTS(emittedFile.fileName)) {
                        // .d.ts file, add to declFiles emit
                        this.declFilesCode.push(emittedFile);
                    } else if (isJS(emittedFile.fileName)) {
                        // .js file, add to files
                        this.files.push(emittedFile);
                    } else if (isJSMap(emittedFile.fileName)) {
                        this.sourceMaps.push(emittedFile);
                    } else {
                        throw new Error('Unrecognized file extension for file ' + emittedFile.fileName);
                    }
                });

                this.errors = errors;
            }

            public getSourceMapRecord() {
                if (this.sourceMapData) {
                    return Harness.SourceMapRecoder.getSourceMapRecord(this.sourceMapData, this.program, this.files);
                }
            }

            public isErrorAt(line: number, column: number, message: string) {
                for (var i = 0; i < this.errors.length; i++) {
                    if ((this.errors[i].line + 1) === line && (this.errors[i].character + 1) === column && this.errors[i].message === message)
                        return true;
                }

                return false;
            }
        }
    }

    export module TestCaseParser {
        /** all the necessary information to set the right compiler settings */
        export interface CompilerSetting {
            flag: string;
            value: string;
        }

        /** All the necessary information to turn a multi file test into useful units for later compilation */
        export interface TestUnitData {
            content: string;
            name: string;
            fileOptions: any;
            originalFilePath: string;
            references: string[];
        }

        // Regex for parsing options in the format "@Alpha: Value of any sort"
        var optionRegex = /^[\/]{2}\s*@(\w+)\s*:\s*(\S*)/gm;  // multiple matches on multiple lines

        // List of allowed metadata names
        var fileMetadataNames = ["filename", "comments", "declaration", "module", "nolib", "sourcemap", "target", "out", "outdir", "noimplicitany", "noresolve", "newline", "newlines", "emitbom", "errortruncation", "usecasesensitivefilenames"];

        function extractCompilerSettings(content: string): CompilerSetting[] {

            var opts: CompilerSetting[] = [];

            var match: RegExpExecArray;
            while ((match = optionRegex.exec(content)) != null) {
                opts.push({ flag: match[1], value: match[2] });
            }

            return opts;
        }

        /** Given a test file containing // @Filename directives, return an array of named units of code to be added to an existing compiler instance */
        export function makeUnitsFromTest(code: string, fileName: string): { settings: CompilerSetting[]; testUnitData: TestUnitData[]; } {
            var settings = extractCompilerSettings(code);

            // List of all the subfiles we've parsed out
            var files: TestUnitData[] = [];

            var lines = Utils.splitContentByNewlines(code);

            // Stuff related to the subfile we're parsing
            var currentFileContent: string = null;
            var currentFileOptions: any = {};
            var currentFileName: any = null;
            var refs: string[] = [];

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var testMetaData = optionRegex.exec(line);
                if (testMetaData) {
                    // Comment line, check for global/file @options and record them
                    optionRegex.lastIndex = 0;
                    var fileNameIndex = fileMetadataNames.indexOf(testMetaData[1].toLowerCase());
                    if (fileNameIndex === -1) {
                        throw new Error('Unrecognized metadata name "' + testMetaData[1] + '". Available file metadata names are: ' + fileMetadataNames.join(', '));
                    } else if (fileNameIndex === 0) {
                        currentFileOptions[testMetaData[1]] = testMetaData[2];
                    } else {
                        continue;
                    }

                    // New metadata statement after having collected some code to go with the previous metadata
                    if (currentFileName) {
                        // Store result file
                        var newTestFile =
                            {
                                content: currentFileContent,
                                name: currentFileName,
                                fileOptions: currentFileOptions,
                                originalFilePath: fileName,
                                references: refs
                            };
                        files.push(newTestFile);

                        // Reset local data
                        currentFileContent = null;
                        currentFileOptions = {};
                        currentFileName = testMetaData[2];
                        refs = [];
                    } else {
                        // First metadata marker in the file
                        currentFileName = testMetaData[2];
                    }
                } else {
                    // Subfile content line
                    // Append to the current subfile content, inserting a newline needed
                    if (currentFileContent === null) {
                        currentFileContent = '';
                    } else {
                        // End-of-line
                        currentFileContent = currentFileContent + '\n';
                    }
                    currentFileContent = currentFileContent + line;
                }
            }

            // normalize the fileName for the single file case
            currentFileName = files.length > 0 ? currentFileName : Path.getFileName(fileName);

            // EOF, push whatever remains
            var newTestFile2 = {
                content: currentFileContent || '',
                name: currentFileName,
                fileOptions: currentFileOptions,
                originalFilePath: fileName,
                references: refs
            };
            files.push(newTestFile2);

            return { settings: settings, testUnitData: files };
        }
    }

    /** Support class for baseline files */
    export module Baseline {
        var firstRun = true;

        export interface BaselineOptions {
            LineEndingSensitive?: boolean;
            Subfolder?: string;
        }

        export function localPath(fileName: string, subfolder?: string) {
            return baselinePath(fileName, 'local', subfolder);
        }

        function referencePath(fileName: string, subfolder?: string) {
            return baselinePath(fileName, 'reference', subfolder);
        }

        function baselinePath(fileName: string, type: string, subfolder?: string) {
            if (subfolder !== undefined) {
                return Harness.userSpecifiedroot + 'tests/baselines/' + subfolder + '/' + type + '/' + fileName;
            } else {
                return Harness.userSpecifiedroot + 'tests/baselines/' + type + '/' + fileName;
            }
        }

        var fileCache: { [idx: string]: boolean } = {};
        function generateActual(actualFilename: string, generateContent: () => string): string {
            // For now this is written using TypeScript, because sys is not available when running old test cases.
            // But we need to move to sys once we have
            // Creates the directory including its parent if not already present
            function createDirectoryStructure(dirName: string) {
                if (fileCache[dirName] || IO.directoryExists(dirName)) {
                    fileCache[dirName] = true;
                    return;
                }

                var parentDirectory = IO.directoryName(dirName);
                if (parentDirectory != "") {
                    createDirectoryStructure(parentDirectory);
                }
                IO.createDirectory(dirName);
                fileCache[dirName] = true;
            }
            var parentDir = IO.directoryName(actualFilename); // .../tests/baselines/local
            var parentParentDir = IO.directoryName(IO.directoryName(actualFilename)) // .../tests/baselines
            // Create folders if needed
            createDirectoryStructure(Harness.IO.directoryName(actualFilename));

            // Delete the actual file in case it fails
            if (IO.fileExists(actualFilename)) {
                IO.deleteFile(actualFilename);
            }

            var actual = generateContent();

            if (actual === undefined) {
                throw new Error('The generated content was "undefined". Return "null" if no baselining is required."');
            }

            // Store the content in the 'local' folder so we
            // can accept it later (manually)
            if (actual !== null) {
                IO.writeFile(actualFilename, actual);
            }

            return actual;
        }

        function compareToBaseline(actual: string, relativeFilename: string, opts: BaselineOptions) {
            // actual is now either undefined (the generator had an error), null (no file requested),
            // or some real output of the function
            if (actual === undefined) {
                // Nothing to do
                return;
            }

            var refFilename = referencePath(relativeFilename, opts && opts.Subfolder);

            if (actual === null) {
                actual = '<no content>';
            }

            var expected = '<no content>';
            if (IO.fileExists(refFilename)) {
                expected = IO.readFile(refFilename);
            }

            var lineEndingSensitive = opts && opts.LineEndingSensitive;

            if (!lineEndingSensitive) {
                expected = expected.replace(/\r\n?/g, '\n');
                actual = actual.replace(/\r\n?/g, '\n');
            }

            return { expected: expected, actual: actual };
        }

        function writeComparison(expected: string, actual: string, relativeFilename: string, actualFilename: string, descriptionForDescribe: string) {
            if (expected != actual) {
                // Overwrite & issue error
                var errMsg = 'The baseline file ' + relativeFilename + ' has changed';
                throw new Error(errMsg);
            }
        }

        export function runBaseline(
            descriptionForDescribe: string,
            relativeFilename: string,
            generateContent: () => string,
            runImmediately = false,
            opts?: BaselineOptions): void {

            var actual = <string>undefined;
            var actualFilename = localPath(relativeFilename, opts && opts.Subfolder);

            if (runImmediately) {
                actual = generateActual(actualFilename, generateContent);
                var comparison = compareToBaseline(actual, relativeFilename, opts);
                writeComparison(comparison.expected, comparison.actual, relativeFilename, actualFilename, descriptionForDescribe);
            } else {
                actual = generateActual(actualFilename, generateContent);

                var comparison = compareToBaseline(actual, relativeFilename, opts);
                writeComparison(comparison.expected, comparison.actual, relativeFilename, actualFilename, descriptionForDescribe);
            }
        }
    }

    export function isLibraryFile(filePath: string): boolean {
        return (Path.getFileName(filePath) === 'lib.d.ts') || (Path.getFileName(filePath) === 'lib.core.d.ts');
    }

    if (Error) (<any>Error).stackTraceLimit = 1;
}

// TODO: not sure why Utils.evalFile isn't working with this, eventually will concat it like old compiler instead of eval
eval(Harness.tcServicesFile);
