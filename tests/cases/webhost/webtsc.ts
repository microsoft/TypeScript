///<reference path='..\..\..\src\compiler\core\environment.ts'/>
///<reference path='..\..\..\src\compiler\io.ts'/>
///<reference path='..\..\..\src\compiler\tsc.ts'/>

module TypeScript.WebTsc {

    declare var RealActiveXObject: { new (s: string): any };
    
    function getBrowserIO(env: IEnvironment, fso: any, currentDir: string, stdOut: ITextWriter, stdErr: ITextWriter): IIO {
        return {
            appendFile: function (path: string, content: string) {
                var txtFile = fso.OpenTextFile(path, 8 /* append */, true /* create if file doesn't exist */);
                txtFile.Write(content);
                txtFile.Close();
            },


            readFile: function (path: string, codepage: number): FileInformation {
                return env.readFile(path, codepage);
            },

            writeFile: function (path: string, contents: string, writeByteOrderMark: boolean) {
                env.writeFile(path, contents, writeByteOrderMark);
            },

            fileExists: function (path: string): boolean {
                return fso.FileExists(path);
            },

            resolvePath: function (path: string): string {
                return fso.GetAbsolutePathName(path);
            },

            dirName: function (path: string): string {
                return fso.GetParentFolderName(path);
            },

            findFile: function (rootPath: string, partialFilePath: string): IFindFileResult {
                var path = fso.GetAbsolutePathName(rootPath) + "/" + partialFilePath;

                while (true) {
                    if (fso.FileExists(path)) {
                        return { fileInformation: this.readFile(path), path: path };
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

            deleteFile: function (path: string): void {
                try {
                    if (fso.FileExists(path)) {
                        fso.DeleteFile(path, true); // true: delete read-only files
                    }
                } catch (e) {
                    IOUtils.throwIOError(TypeScript.getDiagnosticMessage(TypeScript.DiagnosticCode.Could_not_delete_file_0, [path]), e);
                }
            },

            directoryExists: function (path) {
                return <boolean>fso.FolderExists(path);
            },

            createDirectory: function (path) {
                try {
                    if (!this.directoryExists(path)) {
                        fso.CreateFolder(path);
                    }
                } catch (e) {
                    IOUtils.throwIOError(TypeScript.getDiagnosticMessage(TypeScript.DiagnosticCode.Could_not_create_directory_0, [path]), e);
                }
            },

            dir: function (path, spec?, options?) {
                options = options || <{ recursive?: boolean; }>{};
                function filesInFolder(folder: any, root: string): string[] {
                    var paths: string[] = [];
                    var fc: Enumerator;

                    if (options.recursive) {
                        fc = new Enumerator(folder.subfolders);

                        for (; !fc.atEnd(); fc.moveNext()) {
                            paths = paths.concat(filesInFolder(fc.item(), root + "/" + fc.item().Name));
                        }
                    }

                    fc = new Enumerator(folder.files);

                    for (; !fc.atEnd(); fc.moveNext()) {
                        if (!spec || fc.item().Name.match(spec)) {
                            paths.push(root + "/" + fc.item().Name);
                        }
                    }

                    return paths;
                }

                var folder = fso.GetFolder(path);
                var paths: string[] = [];

                return filesInFolder(folder, path);
            },

            print: function (str) {
                WScript.StdOut.Write(str);
            },

            printLine: function (str) {
                WScript.Echo(str);
            },

            arguments: [],
            stderr: stdErr,
            stdout: stdOut,
            watchFile: null,
            run: function (source, fileName) {
                try {
                    eval(source);
                } catch (e) {
                    IOUtils.throwIOError(TypeScript.getDiagnosticMessage(TypeScript.DiagnosticCode.Error_while_executing_file_0, [fileName]), e);
                }
            },
            getExecutingFilePath: function () {
                return currentDir + "\\tsc.js";
            },
            quit: function (exitCode: number = 0) {
            }
        };

    };

    function getBrowserEnv(currentDir: string, fso: any): IEnvironment {
        return {
            // On windows, the newline sequence is always "\r\n";
            newLine: "\r\n",

            currentDirectory: (): string => {
                return currentDir;
            },

            supportsCodePage: () => {
                return false;//(<any>WScript).ReadFile;
            },

            readFile: function (path: string, codepage: number): FileInformation {
                try {
                    var file = fso.OpenTextFile(path, 1);
                    var contents: string = file.ReadAll();
                    return new FileInformation(contents, ByteOrderMark.None);
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
                var file = fso.CreateTextFile(path, true); // overwrite
                file.Write(contents);
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

            arguments: [],
            
            standardOut: WScript.StdOut,
        };
    };

    class CommandLineParser extends OptionsParser {
        public arguments: string[];

        public constructor(io: IIO) {
            super(io, "");
        }

        public parse(arguments: string[]) {
            this.arguments = arguments;
        }
    }

    export function prepareCompiler(currentDir: string, stdOut: ITextWriter, stdErr: ITextWriter) {
        var fso = new RealActiveXObject("Scripting.FileSystemObject");
        var env = getBrowserEnv(currentDir, fso);
        var io = getBrowserIO(env, fso, currentDir, stdOut, stdErr);
        return function (commandLine: string) {
            var parser = new CommandLineParser(io);
            parser.parseString(commandLine);
            io.arguments = parser.arguments;
            env.arguments = parser.arguments;

            var batchCompiler = new BatchCompiler(io);
            batchCompiler.batchCompile();
        }
    }
}
