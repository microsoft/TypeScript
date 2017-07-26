/// <reference path="..\harness.ts" />
/// <reference path="..\..\compiler\tscLib.ts" />
/// <reference path="..\virtualFileSystemWithWatch.ts" />

namespace ts.tscWatch {

    export import WatchedSystem = ts.TestFSWithWatch.TestServerHost;
    export type TestServerHostCreationParameters = ts.TestFSWithWatch.TestServerHostCreationParameters;
    export type File = ts.TestFSWithWatch.File;
    export type FileOrFolder = ts.TestFSWithWatch.FileOrFolder;
    export type Folder = ts.TestFSWithWatch.Folder;
    export type FSEntry = ts.TestFSWithWatch.FSEntry;
    export import createWatchedSystem = ts.TestFSWithWatch.createWatchedSystem;
    export import checkFileNames = ts.TestFSWithWatch.checkFileNames;
    export import libFile = ts.TestFSWithWatch.libFile;
    export import checkWatchedFiles = ts.TestFSWithWatch.checkWatchedFiles;
    export import checkWatchedDirectories = ts.TestFSWithWatch.checkWatchedDirectories;
    export import checkOutputContains = ts.TestFSWithWatch.checkOutputContains;
    export import checkOutputDoesNotContain = ts.TestFSWithWatch.checkOutputDoesNotContain;

    export function checkProgramActualFiles(program: Program, expectedFiles: string[]) {
        checkFileNames(`Program actual files`, program.getSourceFiles().map(file => file.fileName), expectedFiles);
    }

    export function checkProgramRootFiles(program: Program, expectedFiles: string[]) {
        checkFileNames(`Program rootFileNames`, program.getRootFileNames(), expectedFiles);
    }

    export function createWatchWithConfig(configFilePath: string, host: WatchedSystem) {
        const configFileResult = parseConfigFile(configFilePath, {}, host);
        return createWatchModeWithConfigFile(configFileResult, {}, host);
    }

    describe("tsc-watch program updates", () => {
        const commonFile1: FileOrFolder = {
            path: "/a/b/commonFile1.ts",
            content: "let x = 1"
        };
        const commonFile2: FileOrFolder = {
            path: "/a/b/commonFile2.ts",
            content: "let y = 1"
        };

        it("create watch without config file", () => {
            const appFile: FileOrFolder = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };

            const moduleFile: FileOrFolder = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            const host = createWatchedSystem([appFile, moduleFile, libFile]);
            const watch = createWatchModeWithoutConfigFile([appFile.path], {}, host);

            checkProgramActualFiles(watch(), [appFile.path, libFile.path, moduleFile.path]);

            // TODO: Should we watch creation of config files in the root file's file hierarchy?

            // const configFileLocations = ["/a/b/c/", "/a/b/", "/a/", "/"];
            // const configFiles = flatMap(configFileLocations, location => [location + "tsconfig.json", location + "jsconfig.json"]);
            // checkWatchedFiles(host, configFiles.concat(libFile.path, moduleFile.path));
        });

        it("can handle tsconfig file name with difference casing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    include: ["app.ts"]
                })
            };

            const host = createWatchedSystem([f1, config], { useCaseSensitiveFileNames: false });
            const upperCaseConfigFilePath = combinePaths(getDirectoryPath(config.path).toUpperCase(), getBaseFileName(config.path));
            const watch = createWatchWithConfig(upperCaseConfigFilePath, host);
            checkProgramActualFiles(watch(), [f1.path]);
        });

        it("create configured project without file list", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
            };
            const file1: FileOrFolder = {
                path: "/a/b/c/f1.ts",
                content: "let x = 1"
            };
            const file2: FileOrFolder = {
                path: "/a/b/d/f2.ts",
                content: "let y = 1"
            };
            const file3: FileOrFolder = {
                path: "/a/b/e/f3.ts",
                content: "let z = 1"
            };

            const host = createWatchedSystem([configFile, libFile, file1, file2, file3]);
            const configFileResult = parseConfigFile(configFile.path, {}, host);
            assert.equal(configFileResult.errors.length, 0, `expect no errors in config file, got ${JSON.stringify(configFileResult.errors)}`);

            const watch = createWatchModeWithConfigFile(configFileResult, {}, host);

            checkProgramActualFiles(watch(), [file1.path, libFile.path, file2.path]);
            checkProgramRootFiles(watch(), [file1.path, file2.path]);
            checkWatchedFiles(host, [configFile.path, file1.path, file2.path, libFile.path]);
            checkWatchedDirectories(host, [getDirectoryPath(configFile.path)], /*recursive*/ true);
        });

        // TODO: if watching for config file creation
        // it("add and then remove a config file in a folder with loose files", () => {
        // });

        it("add new files to a configured program without file list", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([commonFile1, libFile, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);
            checkWatchedDirectories(host, ["/a/b"], /*recursive*/ true);

            checkProgramRootFiles(watch(), [commonFile1.path]);

            // add a new ts file
            host.reloadFS([commonFile1, commonFile2, libFile, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("should ignore non-existing files specified in the config file", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
            };
            const host = createWatchedSystem([commonFile1, commonFile2, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);

            const commonFile3 = "/a/b/commonFile3.ts";
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile3]);
            checkProgramActualFiles(watch(), [commonFile1.path]);
        });

        it("handle recreated files correctly", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([commonFile1, commonFile2, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);

            // delete commonFile2
            host.reloadFS([commonFile1, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [commonFile1.path]);

            // re-add commonFile2
            host.reloadFS([commonFile1, commonFile2, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("handles the missing files - that were added to program because they were added with ///<ref", () => {
            const file1: FileOrFolder = {
                path: "/a/b/commonFile1.ts",
                content: `/// <reference path="commonFile2.ts"/>
                    let x = y`
            };
            const host = createWatchedSystem([file1, libFile]);
            const watch = createWatchModeWithoutConfigFile([file1.path], {}, host);

            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, libFile.path]);
            const errors = [
                `a/b/commonFile1.ts(1,22): error TS6053: File '${commonFile2.path}' not found.${host.newLine}`,
                `a/b/commonFile1.ts(2,29): error TS2304: Cannot find name 'y'.${host.newLine}`
            ];
            checkOutputContains(host, errors);
            host.clearOutput();

            host.reloadFS([file1, commonFile2, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, libFile.path, commonFile2.path]);
            checkOutputDoesNotContain(host, errors);
        });

        it("should reflect change in config file", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [commonFile1, commonFile2, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchWithConfig(configFile.path, host);

            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
            configFile.content = `{
                "compilerOptions": {},
                "files": ["${commonFile1.path}"]
            }`;

            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(1); // reload the configured project
            checkProgramRootFiles(watch(), [commonFile1.path]);
        });

        it("files explicitly excluded in config file", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
            };
            const excludedFile1: FileOrFolder = {
                path: "/a/c/excluedFile1.ts",
                content: `let t = 1;`
            };

            const host = createWatchedSystem([commonFile1, commonFile2, excludedFile1, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("should properly handle module resolution changes in config file", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.ts",
                content: `import { T } from "module1";`
            };
            const nodeModuleFile: FileOrFolder = {
                path: "/a/b/node_modules/module1.ts",
                content: `export interface T {}`
            };
            const classicModuleFile: FileOrFolder = {
                path: "/a/module1.ts",
                content: `export interface T {}`
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
            };
            const files = [file1, nodeModuleFile, classicModuleFile, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchWithConfig(configFile.path, host);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, nodeModuleFile.path]);

            configFile.content = `{
                "compilerOptions": {
                    "moduleResolution": "classic"
                },
                "files": ["${file1.path}"]
            }`;
            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, classicModuleFile.path]);
        });

        it("should tolerate config file errors and still try to build a project", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6",
                        "allowAnything": true
                    },
                    "someOtherProperty": {}
                }`
            };
            const host = createWatchedSystem([commonFile1, commonFile2, libFile, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("changes in files are reflected in project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export let x = 1`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchModeWithoutConfigFile([file1.path], {}, host);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);

            const modifiedFile2 = {
                path: file2.path,
                content: `export * from "../c/f3"` // now inferred project should inclule file3
            };

            host.reloadFS([file1, modifiedFile2, file3]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, modifiedFile2.path, file3.path]);
        });

        it("deleted files affect project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export * from "../c/f3"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchModeWithoutConfigFile([file1.path], {}, host);
            checkProgramActualFiles(watch(), [file1.path, file2.path, file3.path]);

            host.reloadFS([file1, file3]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkProgramActualFiles(watch(), [file1.path]);
        });

        it("deleted files affect project structure - 2", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export * from "../c/f3"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchModeWithoutConfigFile([file1.path, file3.path], {}, host);
            checkProgramActualFiles(watch(), [file1.path, file2.path, file3.path]);

            host.reloadFS([file1, file3]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkProgramActualFiles(watch(), [file1.path, file3.path]);
        });

        it("config file includes the file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: `import {x} from "../b/f1"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: "export let y = 1"
            };
            const configFile = {
                path: "/a/c/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] })
            };

            const host = createWatchedSystem([file1, file2, file3, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);

            checkProgramRootFiles(watch(), [file2.path, file3.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path, file3.path]);
        });

        it("correctly migrate files between projects", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `
                export * from "../c/f2";
                export * from "../d/f3";`
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: "export let x = 1;"
            };
            const file3 = {
                path: "/a/d/f3.ts",
                content: "export let y = 1;"
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchModeWithoutConfigFile([file2.path, file3.path], {}, host);
            checkProgramActualFiles(watch(), [file2.path, file3.path]);

            const watch2 = createWatchModeWithoutConfigFile([file1.path], {}, host);
            checkProgramActualFiles(watch2(), [file1.path, file2.path, file3.path]);

            // Previous program shouldnt be updated
            checkProgramActualFiles(watch(), [file2.path, file3.path]);
            host.checkTimeoutQueueLength(0);
        });

        it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };

            const host = createWatchedSystem([file1, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);
            checkProgramActualFiles(watch(), [file1.path]);

            host.reloadFS([file1, file2, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkProgramActualFiles(watch(), [file1.path, file2.path]);
            checkProgramRootFiles(watch(), [file1.path, file2.path]);
        });

        it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts"] })
            };

            const host = createWatchedSystem([file1, file2, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);

            checkProgramActualFiles(watch(), [file1.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path, file2.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);
        });

        it("can update configured project when set of root files was not changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            const host = createWatchedSystem([file1, file2, configFile]);
            const watch = createWatchWithConfig(configFile.path, host);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path, file2.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);
        });

        it("config file is deleted", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 2;"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const host = createWatchedSystem([file1, file2, config]);
            const watch = createWatchWithConfig(config.path, host);

            checkProgramActualFiles(watch(), [file1.path, file2.path]);

            host.clearOutput();
            host.reloadFS([file1, file2]);
            host.checkTimeoutQueueLengthAndRun(1);

            assert.equal(host.exitCode, ExitStatus.DiagnosticsPresent_OutputsSkipped);
            checkOutputContains(host, [`error TS6053: File '${config.path}' not found.${host.newLine}`]);
        });

        it("Proper errors: document is not contained in project", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const corruptedConfig = {
                path: "/a/b/tsconfig.json",
                content: "{"
            };
            const host = createWatchedSystem([file1, corruptedConfig]);
            const watch = createWatchWithConfig(corruptedConfig.path, host);

            checkProgramActualFiles(watch(), [file1.path]);
        });

        it("correctly handles changes in lib section of config file", () => {
            const libES5 = {
                path: "/compiler/lib.es5.d.ts",
                content: "declare const eval: any"
            };
            const libES2015Promise = {
                path: "/compiler/lib.es2015.promise.d.ts",
                content: "declare class Promise<T> {}"
            };
            const app = {
                path: "/src/app.ts",
                content: "var x: Promise<string>;"
            };
            const config1 = {
                path: "/src/tsconfig.json",
                content: JSON.stringify(
                    {
                        "compilerOptions": {
                            "module": "commonjs",
                            "target": "es5",
                            "noImplicitAny": true,
                            "sourceMap": false,
                            "lib": [
                                "es5"
                            ]
                        }
                    })
            };
            const config2 = {
                path: config1.path,
                content: JSON.stringify(
                    {
                        "compilerOptions": {
                            "module": "commonjs",
                            "target": "es5",
                            "noImplicitAny": true,
                            "sourceMap": false,
                            "lib": [
                                "es5",
                                "es2015.promise"
                            ]
                        }
                    })
            };
            const host = createWatchedSystem([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
            const watch = createWatchWithConfig(config1.path, host);

            checkProgramActualFiles(watch(), [libES5.path, app.path]);

            host.reloadFS([libES5, libES2015Promise, app, config2]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramActualFiles(watch(), [libES5.path, libES2015Promise.path, app.path]);
        });

        it("should handle non-existing directories in config file", () => {
            const f = {
                path: "/a/src/app.ts",
                content: "let x = 1;"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {},
                    include: [
                        "src/**/*",
                        "notexistingfolder/*"
                    ]
                })
            };
            const host = createWatchedSystem([f, config]);
            const watch = createWatchWithConfig(config.path, host);
            checkProgramActualFiles(watch(), [f.path]);
        });

        it("rename a module file and rename back should restore the states for inferred projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createWatchedSystem([moduleFile, file1, libFile]);
            createWatchModeWithoutConfigFile([file1.path], {}, host);
            const error = "a/b/file1.ts(1,20): error TS2307: Cannot find module \'./moduleFile\'.\n";
            checkOutputDoesNotContain(host, [error]);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputContains(host, [error]);

            host.clearOutput();
            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputDoesNotContain(host, [error]);
        });

        it("rename a module file and rename back should restore the states for configured projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([moduleFile, file1, configFile, libFile]);
            createWatchWithConfig(configFile.path, host);

            const error = `error TS6053: File '${moduleFile.path}' not found.${host.newLine}`;
            checkOutputDoesNotContain(host, [error]);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputContains(host, [error]);

            host.clearOutput();
            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputDoesNotContain(host, [error]);
        });

        it("types should load from config file path if config exists", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { types: ["node"], typeRoots: [] } })
            };
            const node = {
                path: "/a/b/node_modules/@types/node/index.d.ts",
                content: "declare var process: any"
            };
            const cwd = {
                path: "/a/c"
            };
            const host = createWatchedSystem([f1, config, node, cwd], { currentDirectory: cwd.path });
            const watch = createWatchWithConfig(config.path, host);

            checkProgramActualFiles(watch(), [f1.path, node.path]);
        });

        it("add the missing module file for inferred project: should remove the `module not found` error", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createWatchedSystem([file1, libFile]);
            createWatchModeWithoutConfigFile([file1.path], {}, host);

            const error = `a/b/file1.ts(1,20): error TS2307: Cannot find module \'./moduleFile\'.${host.newLine}`;
            checkOutputContains(host, [error]);
            host.clearOutput();

            host.reloadFS([file1, moduleFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputDoesNotContain(host, [error]);
        });

        it("Configure file diagnostics events are generated when the config file has errors", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {
                            "foo": "bar",
                            "allowJS": true
                        }
                    }`
            };

            const host = createWatchedSystem([file, configFile, libFile]);
            createWatchWithConfig(configFile.path, host);
            checkOutputContains(host, [
                `a/b/tsconfig.json(3,29): error TS5023: Unknown compiler option \'foo\'.${host.newLine}`,
                `a/b/tsconfig.json(4,29): error TS5023: Unknown compiler option \'allowJS\'.${host.newLine}`
            ]);
        });

        it("Configure file diagnostics events are generated when the config file doesn't have errors", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {}
                    }`
            };

            const host = createWatchedSystem([file, configFile, libFile]);
            createWatchWithConfig(configFile.path, host);
            checkOutputDoesNotContain(host, [
                `a/b/tsconfig.json(3,29): error TS5023: Unknown compiler option \'foo\'.${host.newLine}`,
                `a/b/tsconfig.json(4,29): error TS5023: Unknown compiler option \'allowJS\'.${host.newLine}`
            ]);
        });

        it("Configure file diagnostics events are generated when the config file changes", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {}
                    }`
            };

            const host = createWatchedSystem([file, configFile, libFile]);
            createWatchWithConfig(configFile.path, host);
            const error = `a/b/tsconfig.json(3,25): error TS5023: Unknown compiler option 'haha'.${host.newLine}`;
            checkOutputDoesNotContain(host, [error]);

            configFile.content = `{
                    "compilerOptions": {
                        "haha": 123
                    }
                }`;
            host.reloadFS([file, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputContains(host, [error]);

            host.clearOutput();
            configFile.content = `{
                    "compilerOptions": {}
                }`;
            host.reloadFS([file, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputDoesNotContain(host, [error]);
        });

        it("non-existing directories listed in config file input array should be tolerated without crashing the server", () => {
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {},
                        "include": ["app/*", "test/**/*", "something"]
                    }`
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "let t = 10;"
            };

            const host = createWatchedSystem([file1, configFile, libFile]);
            const watch = createWatchWithConfig(configFile.path, host);

            checkProgramActualFiles(watch(), [libFile.path]);
        });

        it("non-existing directories listed in config file input array should be able to handle @types if input file list is empty", () => {
            const f = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compiler: {},
                    files: []
                })
            };
            const t1 = {
                path: "/a/node_modules/@types/typings/index.d.ts",
                content: `export * from "./lib"`
            };
            const t2 = {
                path: "/a/node_modules/@types/typings/lib.d.ts",
                content: `export const x: number`
            };
            const host = createWatchedSystem([f, config, t1, t2], { currentDirectory: getDirectoryPath(f.path) });
            const watch = createWatchWithConfig(config.path, host);

            checkProgramActualFiles(watch(), [t1.path, t2.path]);
        });

        it("should support files without extensions", () => {
            const f = {
                path: "/a/compile",
                content: "let x = 1"
            };
            const host = createWatchedSystem([f, libFile]);
            const watch = createWatchModeWithoutConfigFile([f.path], { allowNonTsExtensions: true }, host);
            checkProgramActualFiles(watch(), [f.path, libFile.path]);
        });

        it("Options Diagnostic locations reported correctly with changes in configFile contents when options change", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFileContentBeforeComment = `{`;
            const configFileContentComment = `
                    // comment
                    // More comment`;
            const configFileContentAfterComment = `
                    "compilerOptions": {
                        "allowJs": true,
                        "declaration": true
                    }
                }`;
            const configFileContentWithComment = configFileContentBeforeComment + configFileContentComment + configFileContentAfterComment;
            const configFileContentWithoutCommentLine = configFileContentBeforeComment + configFileContentAfterComment;

            const line = 5;
            const errors = (line: number) => [
                `a/b/tsconfig.json(${line},25): error TS5053: Option \'allowJs\' cannot be specified with option \'declaration\'.\n`,
                `a/b/tsconfig.json(${line + 1},25): error TS5053: Option \'allowJs\' cannot be specified with option \'declaration\'.\n`
            ];

            const configFile = {
                path: "/a/b/tsconfig.json",
                content: configFileContentWithComment
            };

            const host = createWatchedSystem([file, libFile, configFile]);
            createWatchWithConfig(configFile.path, host);
            checkOutputContains(host, errors(line));
            checkOutputDoesNotContain(host, errors(line - 2));
            host.clearOutput();

            configFile.content = configFileContentWithoutCommentLine;
            host.reloadFS([file, configFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputContains(host, errors(line - 2));
            checkOutputDoesNotContain(host, errors(line));
        });
    });

    describe("tsc-watch emit", () => {
        it("emit with outFile or out setting projectUsesOutFile should not be returned if not set", () => {
            const f1 = {
                path: "/a/a.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/b.ts",
                content: "let y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { listEmittedFiles: true }
                })
            };
            const files = [f1, f2, config, libFile];
            const host = createWatchedSystem([f1, f2, config, libFile]);
            createWatchWithConfig(config.path, host);
            const emittedF1 = `TSFILE: ${f1.path.replace(".ts", ".js")}${host.newLine}`;
            const emittedF2 = `TSFILE: ${f2.path.replace(".ts", ".js")}${host.newLine}`;
            checkOutputContains(host, [emittedF1, emittedF2]);
            host.clearOutput();

            f1.content = "let x = 11";
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkOutputContains(host, [emittedF1]);
            checkOutputDoesNotContain(host, [emittedF2]);
        });

        it("emit with outFile or out setting projectUsesOutFile should be true if out is set", () => {
            const outJS = "/a/out.js";
            const f1 = {
                path: "/a/a.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/b.ts",
                content: "let y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { listEmittedFiles: true, out: outJS }
                })
            };
            const files = [f1, f2, config, libFile];
            const host = createWatchedSystem([f1, f2, config, libFile]);
            createWatchWithConfig(config.path, host);
            const emittedF1 = `TSFILE: ${outJS}${host.newLine}`;
            checkOutputContains(host, [emittedF1]);
            host.clearOutput();

            f1.content = "let x = 11";
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkOutputContains(host, [emittedF1]);
        });

        it("emit with outFile or out setting projectUsesOutFile should be true if outFile is set", () => {
            const outJs = "/a/out.js";
            const f1 = {
                path: "/a/a.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/b.ts",
                content: "let y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { listEmittedFiles: true, outFile: outJs }
                })
            };
            const files = [f1, f2, config, libFile];
            const host = createWatchedSystem([f1, f2, config, libFile]);
            createWatchWithConfig(config.path, host);
            const emittedF1 = `TSFILE: ${outJs}${host.newLine}`;
            checkOutputContains(host, [emittedF1]);
            host.clearOutput();

            f1.content = "let x = 11";
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkOutputContains(host, [emittedF1]);
        });
    });
}
