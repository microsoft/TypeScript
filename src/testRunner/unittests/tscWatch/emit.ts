namespace ts.tscWatch {
    function getEmittedLineForMultiFileOutput(file: File, host: WatchedSystem) {
        return `TSFILE: ${file.path.replace(".ts", ".js")}${host.newLine}`;
    }

    function getEmittedLineForSingleFileOutput(filename: string, host: WatchedSystem) {
        return `TSFILE: ${filename}${host.newLine}`;
    }

    interface FileOrFolderEmit extends File {
        output?: string;
    }

    function getFileOrFolderEmit(file: File, getOutput?: (file: File) => string): FileOrFolderEmit {
        const result = file as FileOrFolderEmit;
        if (getOutput) {
            result.output = getOutput(file);
        }
        return result;
    }

    function getEmittedLines(files: FileOrFolderEmit[]) {
        const seen = createMap<true>();
        const result: string[] = [];
        for (const { output } of files) {
            if (output && !seen.has(output)) {
                seen.set(output, true);
                result.push(output);
            }
        }
        return result;
    }

    function checkAffectedLines(host: WatchedSystem, affectedFiles: FileOrFolderEmit[], allEmittedFiles: string[]) {
        const expectedAffectedFiles = getEmittedLines(affectedFiles);
        const expectedNonAffectedFiles = mapDefined(allEmittedFiles, line => contains(expectedAffectedFiles, line) ? undefined : line);
        checkOutputContains(host, expectedAffectedFiles);
        checkOutputDoesNotContain(host, expectedNonAffectedFiles);
    }

    describe("unittests:: tsc-watch:: emit with outFile or out setting", () => {
        function createWatchForOut(out?: string, outFile?: string) {
            const host = createWatchedSystem([]);
            const config: FileOrFolderEmit = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { listEmittedFiles: true }
                })
            };

            let getOutput: (file: File) => string;
            if (out) {
                config.content = JSON.stringify({
                    compilerOptions: { listEmittedFiles: true, out }
                });
                getOutput = __ => getEmittedLineForSingleFileOutput(out, host);
            }
            else if (outFile) {
                config.content = JSON.stringify({
                    compilerOptions: { listEmittedFiles: true, outFile }
                });
                getOutput = __ => getEmittedLineForSingleFileOutput(outFile, host);
            }
            else {
                getOutput = file => getEmittedLineForMultiFileOutput(file, host);
            }

            const f1 = getFileOrFolderEmit({
                path: "/a/a.ts",
                content: "let x = 1"
            }, getOutput);
            const f2 = getFileOrFolderEmit({
                path: "/a/b.ts",
                content: "let y = 1"
            }, getOutput);

            const files = [f1, f2, config, libFile];
            host.reloadFS(files);
            createWatchOfConfigFile(config.path, host);

            const allEmittedLines = getEmittedLines(files);
            checkOutputContains(host, allEmittedLines);
            host.clearOutput();

            f1.content = "let x = 11";
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkAffectedLines(host, [f1], allEmittedLines);
        }

        it("projectUsesOutFile should not be returned if not set", () => {
            createWatchForOut();
        });

        it("projectUsesOutFile should be true if out is set", () => {
            const outJs = "/a/out.js";
            createWatchForOut(outJs);
        });

        it("projectUsesOutFile should be true if outFile is set", () => {
            const outJs = "/a/out.js";
            createWatchForOut(/*out*/ undefined, outJs);
        });

        function verifyFilesEmittedOnce(useOutFile: boolean) {
            const file1: File = {
                path: "/a/b/output/AnotherDependency/file1.d.ts",
                content: "declare namespace Common.SomeComponent.DynamicMenu { enum Z { Full = 0,  Min = 1, Average = 2, } }"
            };
            const file2: File = {
                path: "/a/b/dependencies/file2.d.ts",
                content: "declare namespace Dependencies.SomeComponent { export class SomeClass { version: string; } }"
            };
            const file3: File = {
                path: "/a/b/project/src/main.ts",
                content: "namespace Main { export function fooBar() {} }"
            };
            const file4: File = {
                path: "/a/b/project/src/main2.ts",
                content: "namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }"
            };
            const configFile: File = {
                path: "/a/b/project/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: useOutFile ?
                        { outFile: "../output/common.js", target: "es5" } :
                        { outDir: "../output", target: "es5" },
                    files: [file1.path, file2.path, file3.path, file4.path]
                })
            };
            const files = [file1, file2, file3, file4];
            const allfiles = files.concat(configFile);
            const host = createWatchedSystem(allfiles);
            const originalWriteFile = host.writeFile.bind(host);
            const mapOfFilesWritten = createMap<number>();
            host.writeFile = (p: string, content: string) => {
                const count = mapOfFilesWritten.get(p);
                mapOfFilesWritten.set(p, count ? count + 1 : 1);
                return originalWriteFile(p, content);
            };
            createWatchOfConfigFile(configFile.path, host);
            if (useOutFile) {
                // Only out file
                assert.equal(mapOfFilesWritten.size, 1);
            }
            else {
                // main.js and main2.js
                assert.equal(mapOfFilesWritten.size, 2);
            }
            mapOfFilesWritten.forEach((value, key) => {
                assert.equal(value, 1, "Key: " + key);
            });
        }

        it("with --outFile and multiple declaration files in the program", () => {
            verifyFilesEmittedOnce(/*useOutFile*/ true);
        });

        it("without --outFile and multiple declaration files in the program", () => {
            verifyFilesEmittedOnce(/*useOutFile*/ false);
        });
    });

    describe("unittests:: tsc-watch:: emit for configured projects", () => {
        const file1Consumer1Path = "/a/b/file1Consumer1.ts";
        const moduleFile1Path = "/a/b/moduleFile1.ts";
        const configFilePath = "/a/b/tsconfig.json";
        interface InitialStateParams {
            /** custom config file options */
            configObj?: any;
            /** list of the files that will be emitted for first compilation */
            firstCompilationEmitFiles?: string[];
            /** get the emit file for file - default is multi file emit line */
            getEmitLine?(file: File, host: WatchedSystem): string;
            /** Additional files and folders to add */
            getAdditionalFileOrFolder?(): File[];
            /** initial list of files to emit if not the default list */
            firstReloadFileList?: string[];
        }
        function getInitialState({ configObj = {}, firstCompilationEmitFiles, getEmitLine, getAdditionalFileOrFolder, firstReloadFileList }: InitialStateParams = {}) {
            const host = createWatchedSystem([]);
            const getOutputName = getEmitLine ? (file: File) => getEmitLine(file, host) :
                (file: File) => getEmittedLineForMultiFileOutput(file, host);

            const moduleFile1 = getFileOrFolderEmit({
                path: moduleFile1Path,
                content: "export function Foo() { };",
            }, getOutputName);

            const file1Consumer1 = getFileOrFolderEmit({
                path: file1Consumer1Path,
                content: `import {Foo} from "./moduleFile1"; export var y = 10;`,
            }, getOutputName);

            const file1Consumer2 = getFileOrFolderEmit({
                path: "/a/b/file1Consumer2.ts",
                content: `import {Foo} from "./moduleFile1"; let z = 10;`,
            }, getOutputName);

            const moduleFile2 = getFileOrFolderEmit({
                path: "/a/b/moduleFile2.ts",
                content: `export var Foo4 = 10;`,
            }, getOutputName);

            const globalFile3 = getFileOrFolderEmit({
                path: "/a/b/globalFile3.ts",
                content: `interface GlobalFoo { age: number }`
            });

            const additionalFiles = getAdditionalFileOrFolder ?
                map(getAdditionalFileOrFolder(), file => getFileOrFolderEmit(file, getOutputName)) :
                [];

            (configObj.compilerOptions || (configObj.compilerOptions = {})).listEmittedFiles = true;
            const configFile = getFileOrFolderEmit({
                path: configFilePath,
                content: JSON.stringify(configObj)
            });

            const files = [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile, ...additionalFiles];
            let allEmittedFiles = getEmittedLines(files);
            host.reloadFS(firstReloadFileList ? getFiles(firstReloadFileList) : files);

            // Initial compile
            createWatchOfConfigFile(configFile.path, host);
            if (firstCompilationEmitFiles) {
                checkAffectedLines(host, getFiles(firstCompilationEmitFiles), allEmittedFiles);
            }
            else {
                checkOutputContains(host, allEmittedFiles);
            }
            host.clearOutput();

            return {
                moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile,
                files,
                getFile,
                verifyAffectedFiles,
                verifyAffectedAllFiles,
                getOutputName
            };

            function getFiles(filelist: string[]) {
                return map(filelist, getFile);
            }

            function getFile(fileName: string) {
                return find(files, file => file.path === fileName)!;
            }

            function verifyAffectedAllFiles() {
                host.reloadFS(files);
                host.checkTimeoutQueueLengthAndRun(1);
                checkOutputContains(host, allEmittedFiles);
                host.clearOutput();
            }

            function verifyAffectedFiles(expected: FileOrFolderEmit[], filesToReload?: FileOrFolderEmit[]) {
                if (!filesToReload) {
                    filesToReload = files;
                }
                else if (filesToReload.length > files.length) {
                    allEmittedFiles = getEmittedLines(filesToReload);
                }
                host.reloadFS(filesToReload);
                host.checkTimeoutQueueLengthAndRun(1);
                checkAffectedLines(host, expected, allEmittedFiles);
                host.clearOutput();
            }
        }

        it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                verifyAffectedFiles
            } = getInitialState();

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2]);

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { console.log('hi'); };`
            moduleFile1.content = `export var T: number;export function Foo() { console.log('hi'); };`;
            verifyAffectedFiles([moduleFile1]);
        });

        it("should be up-to-date with the reference map changes", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                verifyAffectedFiles
            } = getInitialState();

            // Change file1Consumer1 content to `export let y = Foo();`
            file1Consumer1.content = `export let y = Foo();`;
            verifyAffectedFiles([file1Consumer1]);

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer2]);

            // Add the import statements back to file1Consumer1
            file1Consumer1.content = `import {Foo} from "./moduleFile1";let y = Foo();`;
            verifyAffectedFiles([file1Consumer1]);

            // Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`
            moduleFile1.content = `export var T: number;export var T2: string;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer2, file1Consumer1]);

            // Multiple file edits in one go:

            // Change file1Consumer1 content to `export let y = Foo();`
            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            file1Consumer1.content = `export let y = Foo();`;
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2]);
        });

        it("should be up-to-date with deleted files", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                files,
                verifyAffectedFiles
            } = getInitialState();

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            moduleFile1.content = `export var T: number;export function Foo() { };`;

            // Delete file1Consumer2
            const filesToLoad = mapDefined(files, file => file === file1Consumer2 ? undefined : file);
            verifyAffectedFiles([moduleFile1, file1Consumer1], filesToLoad);
        });

        it("should be up-to-date with newly created files", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                files,
                verifyAffectedFiles,
                getOutputName
            } = getInitialState();

            const file1Consumer3 = getFileOrFolderEmit({
                path: "/a/b/file1Consumer3.ts",
                content: `import {Foo} from "./moduleFile1"; let y = Foo();`
            }, getOutputName);
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer3, file1Consumer2], files.concat(file1Consumer3));
        });

        it("should detect changes in non-root files", () => {
            const {
                moduleFile1, file1Consumer1,
                verifyAffectedFiles
            } = getInitialState({ configObj: { files: [file1Consumer1Path] }, firstCompilationEmitFiles: [file1Consumer1Path, moduleFile1Path] });

            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1]);

            // change file1 internal, and verify only file1 is affected
            moduleFile1.content += "var T1: number;";
            verifyAffectedFiles([moduleFile1]);
        });

        it("should return all files if a global file changed shape", () => {
            const {
                globalFile3, verifyAffectedAllFiles
            } = getInitialState();

            globalFile3.content += "var T2: string;";
            verifyAffectedAllFiles();
        });

        it("should always return the file itself if '--isolatedModules' is specified", () => {
            const {
                moduleFile1, verifyAffectedFiles
            } = getInitialState({ configObj: { compilerOptions: { isolatedModules: true } } });

            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1]);
        });

        it("should always return the file itself if '--out' or '--outFile' is specified", () => {
            const outFilePath = "/a/b/out.js";
            const {
                moduleFile1, verifyAffectedFiles
            } = getInitialState({
                configObj: { compilerOptions: { module: "system", outFile: outFilePath } },
                getEmitLine: (_, host) => getEmittedLineForSingleFileOutput(outFilePath, host)
            });

            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1]);
        });

        it("should return cascaded affected file list", () => {
            const file1Consumer1Consumer1: File = {
                path: "/a/b/file1Consumer1Consumer1.ts",
                content: `import {y} from "./file1Consumer1";`
            };
            const {
                moduleFile1, file1Consumer1, file1Consumer2, verifyAffectedFiles, getFile
            } = getInitialState({
                getAdditionalFileOrFolder: () => [file1Consumer1Consumer1]
            });

            const file1Consumer1Consumer1Emit = getFile(file1Consumer1Consumer1.path);
            file1Consumer1.content += "export var T: number;";
            verifyAffectedFiles([file1Consumer1, file1Consumer1Consumer1Emit]);

            // Doesnt change the shape of file1Consumer1
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2]);

            // Change both files before the timeout
            file1Consumer1.content += "export var T2: number;";
            moduleFile1.content = `export var T2: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2, file1Consumer1Consumer1Emit]);
        });

        it("should work fine for files with circular references", () => {
            // TODO: do not exit on such errors? Just continue to watch the files for update in watch mode

            const file1: File = {
                path: "/a/b/file1.ts",
                content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`
            };
            const file2: File = {
                path: "/a/b/file2.ts",
                content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`
            };
            const {
                configFile,
                getFile,
                verifyAffectedFiles
            } = getInitialState({
                firstCompilationEmitFiles: [file1.path, file2.path],
                getAdditionalFileOrFolder: () => [file1, file2],
                firstReloadFileList: [libFile.path, file1.path, file2.path, configFilePath]
            });
            const file1Emit = getFile(file1.path), file2Emit = getFile(file2.path);

            file1Emit.content += "export var t3 = 10;";
            verifyAffectedFiles([file1Emit, file2Emit], [file1, file2, libFile, configFile]);

        });

        it("should detect removed code file", () => {
            const referenceFile1: File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`
            };
            const {
                configFile,
                getFile,
                verifyAffectedFiles
            } = getInitialState({
                firstCompilationEmitFiles: [referenceFile1.path, moduleFile1Path],
                getAdditionalFileOrFolder: () => [referenceFile1],
                firstReloadFileList: [libFile.path, referenceFile1.path, moduleFile1Path, configFilePath]
            });

            const referenceFile1Emit = getFile(referenceFile1.path);
            verifyAffectedFiles([referenceFile1Emit], [libFile, referenceFile1Emit, configFile]);
        });

        it("should detect non-existing code file", () => {
            const referenceFile1: File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`
            };
            const {
                configFile,
                moduleFile2,
                getFile,
                verifyAffectedFiles
            } = getInitialState({
                firstCompilationEmitFiles: [referenceFile1.path],
                getAdditionalFileOrFolder: () => [referenceFile1],
                firstReloadFileList: [libFile.path, referenceFile1.path, configFilePath]
            });

            const referenceFile1Emit = getFile(referenceFile1.path);
            referenceFile1Emit.content += "export var yy = Foo();";
            verifyAffectedFiles([referenceFile1Emit], [libFile, referenceFile1Emit, configFile]);

            // Create module File2 and see both files are saved
            verifyAffectedFiles([referenceFile1Emit, moduleFile2], [libFile, moduleFile2, referenceFile1Emit, configFile]);
        });
    });

    describe("unittests:: tsc-watch:: emit file content", () => {
        interface EmittedFile extends File {
            shouldBeWritten: boolean;
        }
        function getEmittedFiles(files: FileOrFolderEmit[], contents: string[]): EmittedFile[] {
            return map(contents, (content, index) => {
                return {
                    content,
                    path: changeExtension(files[index].path, Extension.Js),
                    shouldBeWritten: true
                };
            }
            );
        }
        function verifyEmittedFiles(host: WatchedSystem, emittedFiles: EmittedFile[]) {
            for (const { path, content, shouldBeWritten } of emittedFiles) {
                if (shouldBeWritten) {
                    assert.isTrue(host.fileExists(path), `Expected file ${path} to be present`);
                    assert.equal(host.readFile(path), content, `Contents of file ${path} do not match`);
                }
                else {
                    assert.isNotTrue(host.fileExists(path), `Expected file ${path} to be absent`);
                }
            }
        }

        function verifyEmittedFileContents(newLine: string, inputFiles: File[], initialEmittedFileContents: string[],
            modifyFiles: (files: FileOrFolderEmit[], emitedFiles: EmittedFile[]) => FileOrFolderEmit[], configFile?: File) {
            const host = createWatchedSystem([], { newLine });
            const files = concatenate(
                map(inputFiles, file => getFileOrFolderEmit(file, fileToConvert => getEmittedLineForMultiFileOutput(fileToConvert, host))),
                configFile ? [libFile, configFile] : [libFile]
            );
            const allEmittedFiles = getEmittedLines(files);
            host.reloadFS(files);

            // Initial compile
            if (configFile) {
                createWatchOfConfigFile(configFile.path, host);
            }
            else {
                // First file as the root
                createWatchOfFilesAndCompilerOptions([files[0].path], host, { listEmittedFiles: true });
            }
            checkOutputContains(host, allEmittedFiles);

            const emittedFiles = getEmittedFiles(files, initialEmittedFileContents);
            verifyEmittedFiles(host, emittedFiles);
            host.clearOutput();

            const affectedFiles = modifyFiles(files, emittedFiles);
            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(1);
            checkAffectedLines(host, affectedFiles, allEmittedFiles);

            verifyEmittedFiles(host, emittedFiles);
        }

        function verifyNewLine(newLine: string) {
            const lines = ["var x = 1;", "var y = 2;"];
            const fileContent = lines.join(newLine);
            const f = {
                path: "/a/app.ts",
                content: fileContent
            };

            verifyEmittedFileContents(newLine, [f], [fileContent + newLine], modifyFiles);

            function modifyFiles(files: FileOrFolderEmit[], emittedFiles: EmittedFile[]) {
                files[0].content = fileContent + newLine + "var z = 3;";
                emittedFiles[0].content = files[0].content + newLine;
                return [files[0]];
            }
        }

        it("handles new lines: \\n", () => {
            verifyNewLine("\n");
        });

        it("handles new lines: \\r\\n", () => {
            verifyNewLine("\r\n");
        });

        it("should emit specified file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export function Foo() { return 10; }`
            };

            const file2 = {
                path: "/a/b/f2.ts",
                content: `import {Foo} from "./f1"; export let y = Foo();`
            };

            const file3 = {
                path: "/a/b/f3.ts",
                content: `import {y} from "./f2"; let x = y;`
            };

            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { listEmittedFiles: true } })
            };

            verifyEmittedFileContents("\r\n", [file1, file2, file3], [
                `"use strict";\r\nexports.__esModule = true;\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\n`,
                `"use strict";\r\nexports.__esModule = true;\r\nvar f1_1 = require("./f1");\r\nexports.y = f1_1.Foo();\r\n`,
                `"use strict";\r\nexports.__esModule = true;\r\nvar f2_1 = require("./f2");\r\nvar x = f2_1.y;\r\n`
            ], modifyFiles, configFile);

            function modifyFiles(files: FileOrFolderEmit[], emittedFiles: EmittedFile[]) {
                files[0].content += `export function foo2() { return 2; }`;
                emittedFiles[0].content += `function foo2() { return 2; }\r\nexports.foo2 = foo2;\r\n`;
                emittedFiles[2].shouldBeWritten = false;
                return files.slice(0, 2);
            }
        });

        it("Elides const enums correctly in incremental compilation", () => {
            const currentDirectory = "/user/someone/projects/myproject";
            const file1: File = {
                path: `${currentDirectory}/file1.ts`,
                content: "export const enum E1 { V = 1 }"
            };
            const file2: File = {
                path: `${currentDirectory}/file2.ts`,
                content: `import { E1 } from "./file1"; export const enum E2 { V = E1.V }`
            };
            const file3: File = {
                path: `${currentDirectory}/file3.ts`,
                content: `import { E2 } from "./file2"; const v: E2 = E2.V;`
            };
            const strictAndEsModule = `"use strict";\nexports.__esModule = true;\n`;
            verifyEmittedFileContents("\n", [file3, file2, file1], [
                `${strictAndEsModule}var v = 1 /* V */;\n`,
                strictAndEsModule,
                strictAndEsModule
            ], modifyFiles);

            function modifyFiles(files: FileOrFolderEmit[], emittedFiles: EmittedFile[]) {
                files[0].content += `function foo2() { return 2; }`;
                emittedFiles[0].content += `function foo2() { return 2; }\n`;
                emittedFiles[1].shouldBeWritten = false;
                emittedFiles[2].shouldBeWritten = false;
                return [files[0]];
            }
        });

        it("file is deleted and created as part of change", () => {
            const projectLocation = "/home/username/project";
            const file: File = {
                path: `${projectLocation}/app/file.ts`,
                content: "var a = 10;"
            };
            const fileJs = `${projectLocation}/app/file.js`;
            const configFile: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: JSON.stringify({
                    include: [
                        "app/**/*.ts"
                    ]
                })
            };
            const files = [file, configFile, libFile];
            const host = createWatchedSystem(files, { currentDirectory: projectLocation, useCaseSensitiveFileNames: true });
            createWatchOfConfigFile("tsconfig.json", host);
            verifyProgram();

            file.content += "\nvar b = 10;";

            host.reloadFS(files, { invokeFileDeleteCreateAsPartInsteadOfChange: true });
            host.runQueuedTimeoutCallbacks();
            verifyProgram();

            function verifyProgram() {
                assert.isTrue(host.fileExists(fileJs));
                assert.equal(host.readFile(fileJs), file.content + "\n");
            }
        });
    });

    describe("unittests:: tsc-watch:: emit with when module emit is specified as node", () => {
        it("when instead of filechanged recursive directory watcher is invoked", () => {
            const configFile: File = {
                path: "/a/rootFolder/project/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        module: "none",
                        allowJs: true,
                        outDir: "Static/scripts/"
                    },
                    include: [
                        "Scripts/**/*"
                    ],
                })
            };
            const outputFolder = "/a/rootFolder/project/Static/scripts/";
            const file1: File = {
                path: "/a/rootFolder/project/Scripts/TypeScript.ts",
                content: "var z = 10;"
            };
            const file2: File = {
                path: "/a/rootFolder/project/Scripts/Javascript.js",
                content: "var zz = 10;"
            };
            const files = [configFile, file1, file2, libFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
            file1.content = "var zz30 = 100;";
            host.reloadFS(files, { invokeDirectoryWatcherInsteadOfFileChanged: true });
            host.runQueuedTimeoutCallbacks();

            checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
            const outputFile1 = changeExtension((outputFolder + getBaseFileName(file1.path)), ".js");
            assert.isTrue(host.fileExists(outputFile1));
            assert.equal(host.readFile(outputFile1), file1.content + host.newLine);
        });
    });
}
