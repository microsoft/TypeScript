namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: program updates", () => {
        it("create watch without config file", () => {
            const appFile: File = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };

            const moduleFile: File = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            const host = createWatchedSystem([appFile, moduleFile, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([appFile.path], host);

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
            const watch = createWatchOfConfigFile(upperCaseConfigFilePath, host);
            checkProgramActualFiles(watch(), [combinePaths(getDirectoryPath(upperCaseConfigFilePath), getBaseFileName(f1.path))]);
        });

        it("create configured project without file list", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
            };
            const file1: File = {
                path: "/a/b/c/f1.ts",
                content: "let x = 1"
            };
            const file2: File = {
                path: "/a/b/d/f2.ts",
                content: "let y = 1"
            };
            const file3: File = {
                path: "/a/b/e/f3.ts",
                content: "let z = 1"
            };

            const host = createWatchedSystem([configFile, libFile, file1, file2, file3]);
            const watch = createWatchProgram(createWatchCompilerHostOfConfigFile(configFile.path, {}, host, /*createProgram*/ undefined, notImplemented));

            checkProgramActualFiles(watch.getCurrentProgram().getProgram(), [file1.path, libFile.path, file2.path]);
            checkProgramRootFiles(watch.getCurrentProgram().getProgram(), [file1.path, file2.path]);
            checkWatchedFiles(host, [configFile.path, file1.path, file2.path, libFile.path]);
            const configDir = getDirectoryPath(configFile.path);
            checkWatchedDirectories(host, [configDir, combinePaths(configDir, projectSystem.nodeModulesAtTypes)], /*recursive*/ true);
        });

        // TODO: if watching for config file creation
        // it("add and then remove a config file in a folder with loose files", () => {
        // });

        it("add new files to a configured program without file list", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([commonFile1, libFile, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            const configDir = getDirectoryPath(configFile.path);
            checkWatchedDirectories(host, [configDir, combinePaths(configDir, projectSystem.nodeModulesAtTypes)], /*recursive*/ true);

            checkProgramRootFiles(watch(), [commonFile1.path]);

            // add a new ts file
            host.reloadFS([commonFile1, commonFile2, libFile, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("should ignore non-existing files specified in the config file", () => {
            const configFile: File = {
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
            const watch = createWatchOfConfigFile(configFile.path, host);

            const commonFile3 = "/a/b/commonFile3.ts";
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile3]);
            checkProgramActualFiles(watch(), [commonFile1.path]);
        });

        it("handle recreated files correctly", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([commonFile1, commonFile2, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
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
            const commonFile2Name = "commonFile2.ts";
            const file1: File = {
                path: "/a/b/commonFile1.ts",
                content: `/// <reference path="${commonFile2Name}"/>
                    let x = y`
            };
            const host = createWatchedSystem([file1, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);

            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, libFile.path]);
            checkOutputErrorsInitial(host, [
                getDiagnosticOfFileFromProgram(watch(), file1.path, file1.content.indexOf(commonFile2Name), commonFile2Name.length, Diagnostics.File_0_not_found, commonFile2.path),
                getDiagnosticOfFileFromProgram(watch(), file1.path, file1.content.indexOf("y"), 1, Diagnostics.Cannot_find_name_0, "y")
            ]);

            host.reloadFS([file1, commonFile2, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, libFile.path, commonFile2.path]);
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("should reflect change in config file", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [commonFile1, commonFile2, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
            configFile.content = `{
                "compilerOptions": {},
                "files": ["${commonFile1.path}"]
            }`;

            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(1); // reload the configured project
            checkProgramRootFiles(watch(), [commonFile1.path]);
        });

        it("works correctly when config file is changed but its content havent", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [libFile, commonFile1, commonFile2, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramActualFiles(watch(), [libFile.path, commonFile1.path, commonFile2.path]);
            checkOutputErrorsInitial(host, emptyArray);

            host.modifyFile(configFile.path, configFile.content);
            host.checkTimeoutQueueLengthAndRun(1); // reload the configured project

            checkProgramActualFiles(watch(), [libFile.path, commonFile1.path, commonFile2.path]);
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("Updates diagnostics when '--noUnusedLabels' changes", () => {
            const aTs: File = { path: "/a.ts", content: "label: while (1) {}" };
            const files = [libFile, aTs];
            const paths = files.map(f => f.path);
            const options = (allowUnusedLabels: boolean) => `{ "compilerOptions": { "allowUnusedLabels": ${allowUnusedLabels} } }`;
            const tsconfig: File = { path: "/tsconfig.json", content: options(/*allowUnusedLabels*/ true) };

            const host = createWatchedSystem([...files, tsconfig]);
            const watch = createWatchOfConfigFile(tsconfig.path, host);

            checkProgramActualFiles(watch(), paths);
            checkOutputErrorsInitial(host, emptyArray);

            host.modifyFile(tsconfig.path, options(/*allowUnusedLabels*/ false));
            host.checkTimeoutQueueLengthAndRun(1); // reload the configured project

            checkProgramActualFiles(watch(), paths);
            checkOutputErrorsIncremental(host, [
                getDiagnosticOfFileFromProgram(watch(), aTs.path, 0, "label".length, Diagnostics.Unused_label),
            ]);

            host.modifyFile(tsconfig.path, options(/*allowUnusedLabels*/ true));
            host.checkTimeoutQueueLengthAndRun(1); // reload the configured project
            checkProgramActualFiles(watch(), paths);
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("files explicitly excluded in config file", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
            };
            const excludedFile1: File = {
                path: "/a/c/excluedFile1.ts",
                content: `let t = 1;`
            };

            const host = createWatchedSystem([commonFile1, commonFile2, excludedFile1, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("should properly handle module resolution changes in config file", () => {
            const file1: File = {
                path: "/a/b/file1.ts",
                content: `import { T } from "module1";`
            };
            const nodeModuleFile: File = {
                path: "/a/b/node_modules/module1.ts",
                content: `export interface T {}`
            };
            const classicModuleFile: File = {
                path: "/a/module1.ts",
                content: `export interface T {}`
            };
            const configFile: File = {
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
            const watch = createWatchOfConfigFile(configFile.path, host);
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
            const configFile: File = {
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
            const watch = createWatchOfConfigFile(configFile.path, host);
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
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);
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
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);
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
            const watch = createWatchOfFilesAndCompilerOptions([file1.path, file3.path], host);
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
            const watch = createWatchOfConfigFile(configFile.path, host);

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
            const watch = createWatchOfFilesAndCompilerOptions([file2.path, file3.path], host);
            checkProgramActualFiles(watch(), [file2.path, file3.path]);

            const watch2 = createWatchOfFilesAndCompilerOptions([file1.path], host);
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
            const watch = createWatchOfConfigFile(configFile.path, host);
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
            const watch = createWatchOfConfigFile(configFile.path, host);

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
            const watch = createWatchOfConfigFile(configFile.path, host);
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
            const host = createWatchedSystem([file1, file2, libFile, config]);
            const watch = createWatchOfConfigFile(config.path, host);

            checkProgramActualFiles(watch(), [file1.path, file2.path, libFile.path]);
            checkOutputErrorsInitial(host, emptyArray);

            host.reloadFS([file1, file2, libFile]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkOutputErrorsIncrementalWithExit(host, [
                getDiagnosticWithoutFile(Diagnostics.File_0_not_found, config.path)
            ], ExitStatus.DiagnosticsPresent_OutputsSkipped);
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
            const watch = createWatchOfConfigFile(corruptedConfig.path, host);

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
                        compilerOptions: {
                            module: "commonjs",
                            target: "es5",
                            noImplicitAny: true,
                            sourceMap: false,
                            lib: [
                                "es5"
                            ]
                        }
                    })
            };
            const config2 = {
                path: config1.path,
                content: JSON.stringify(
                    {
                        compilerOptions: {
                            module: "commonjs",
                            target: "es5",
                            noImplicitAny: true,
                            sourceMap: false,
                            lib: [
                                "es5",
                                "es2015.promise"
                            ]
                        }
                    })
            };
            const host = createWatchedSystem([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
            const watch = createWatchOfConfigFile(config1.path, host);

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
            const watch = createWatchOfConfigFile(config.path, host);
            checkProgramActualFiles(watch(), [f.path]);
        });

        it("rename a module file and rename back should restore the states for inferred projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();'
            };
            const host = createWatchedSystem([moduleFile, file1, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);
            checkOutputErrorsInitial(host, emptyArray);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), file1, "./moduleFile")
            ]);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("rename a module file and rename back should restore the states for configured projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();'
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([moduleFile, file1, configFile, libFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, emptyArray);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), file1, "./moduleFile")
            ]);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
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
            const watch = createWatchOfConfigFile(config.path, host);

            checkProgramActualFiles(watch(), [f1.path, node.path]);
        });

        it("add the missing module file for inferred project: should remove the `module not found` error", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();'
            };
            const host = createWatchedSystem([file1, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);

            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), file1, "./moduleFile")
            ]);

            host.reloadFS([file1, moduleFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
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
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, [
                getUnknownCompilerOption(watch(), configFile, "foo"),
                getUnknownCompilerOption(watch(), configFile, "allowJS")
            ]);
        });

        it("If config file doesnt have errors, they are not reported", () => {
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
            createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, emptyArray);
        });

        it("Reports errors when the config file changes", () => {
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
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, emptyArray);

            configFile.content = `{
                    "compilerOptions": {
                        "haha": 123
                    }
                }`;
            host.reloadFS([file, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, [
                getUnknownCompilerOption(watch(), configFile, "haha")
            ]);

            configFile.content = `{
                    "compilerOptions": {}
                }`;
            host.reloadFS([file, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
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
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramActualFiles(watch(), emptyArray);
            checkOutputErrorsInitial(host, [
                "error TS18003: No inputs were found in config file '/a/b/tsconfig.json'. Specified 'include' paths were '[\"app/*\",\"test/**/*\",\"something\"]' and 'exclude' paths were '[]'.\n"
            ]);
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
            const watch = createWatchOfConfigFile(config.path, host);

            checkProgramActualFiles(watch(), emptyArray);
            checkOutputErrorsInitial(host, [
                "tsconfig.json(1,24): error TS18002: The 'files' list in config file '/a/tsconfig.json' is empty.\n"
            ]);
        });

        it("should support files without extensions", () => {
            const f = {
                path: "/a/compile",
                content: "let x = 1"
            };
            const host = createWatchedSystem([f, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([f.path], host, { allowNonTsExtensions: true });
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
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: configFileContentWithComment
            };

            const files = [file, libFile, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);
            const errors = () => [
                getDiagnosticOfFile(watch().getCompilerOptions().configFile!, configFile.content.indexOf('"allowJs"'), '"allowJs"'.length, Diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "declaration"),
                getDiagnosticOfFile(watch().getCompilerOptions().configFile!, configFile.content.indexOf('"declaration"'), '"declaration"'.length, Diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "declaration")
            ];
            const intialErrors = errors();
            checkOutputErrorsInitial(host, intialErrors);

            configFile.content = configFileContentWithoutCommentLine;
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            const nowErrors = errors();
            checkOutputErrorsIncremental(host, nowErrors);
            assert.equal(nowErrors[0].start, intialErrors[0].start! - configFileContentComment.length);
            assert.equal(nowErrors[1].start, intialErrors[1].start! - configFileContentComment.length);
        });

        describe("should not trigger should not trigger recompilation because of program emit", () => {
            function verifyWithOptions(options: CompilerOptions, outputFiles: ReadonlyArray<string>) {
                const proj = "/user/username/projects/myproject";
                const file1: File = {
                    path: `${proj}/file1.ts`,
                    content: "export const c = 30;"
                };
                const file2: File = {
                    path: `${proj}/src/file2.ts`,
                    content: `import {c} from "file1"; export const d = 30;`
                };
                const tsconfig: File = {
                    path: `${proj}/tsconfig.json`,
                    content: generateTSConfig(options, emptyArray, "\n")
                };
                const host = createWatchedSystem([file1, file2, libFile, tsconfig], { currentDirectory: proj });
                const watch = createWatchOfConfigFile(tsconfig.path, host, /*maxNumberOfFilesToIterateForInvalidation*/1);
                checkProgramActualFiles(watch(), [file1.path, file2.path, libFile.path]);

                outputFiles.forEach(f => host.fileExists(f));

                // This should be 0
                host.checkTimeoutQueueLengthAndRun(0);
            }

            it("without outDir or outFile is specified", () => {
                verifyWithOptions({ module: ModuleKind.AMD }, ["file1.js", "src/file2.js"]);
            });

            it("with outFile", () => {
                verifyWithOptions({ module: ModuleKind.AMD, outFile: "build/outFile.js" }, ["build/outFile.js"]);
            });

            it("when outDir is specified", () => {
                verifyWithOptions({ module: ModuleKind.AMD, outDir: "build" }, ["build/file1.js", "build/src/file2.js"]);
            });

            it("when outDir and declarationDir is specified", () => {
                verifyWithOptions({ module: ModuleKind.AMD, outDir: "build", declaration: true, declarationDir: "decls" },
                    ["build/file1.js", "build/src/file2.js", "decls/file1.d.ts", "decls/src/file2.d.ts"]);
            });

            it("declarationDir is specified", () => {
                verifyWithOptions({ module: ModuleKind.AMD, declaration: true, declarationDir: "decls" },
                    ["file1.js", "src/file2.js", "decls/file1.d.ts", "decls/src/file2.d.ts"]);
            });
        });

        it("shouldnt report error about unused function incorrectly when file changes from global to module", () => {
            const getFileContent = (asModule: boolean) => `
                    function one() {}
                    ${asModule ? "export " : ""}function two() {
                      return function three() {
                        one();
                      }
                    }`;
            const file: File = {
                path: "/a/b/file.ts",
                content: getFileContent(/*asModule*/ false)
            };
            const files = [file, libFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfFilesAndCompilerOptions([file.path], host, {
                noUnusedLocals: true
            });
            checkProgramActualFiles(watch(), files.map(file => file.path));
            checkOutputErrorsInitial(host, []);

            file.content = getFileContent(/*asModule*/ true);
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), files.map(file => file.path));
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("watched files when file is deleted and new file is added as part of change", () => {
            const projectLocation = "/home/username/project";
            const file: File = {
                path: `${projectLocation}/src/file1.ts`,
                content: "var a = 10;"
            };
            const configFile: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: "{}"
            };
            const files = [file, libFile, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);
            verifyProgram();

            file.path = file.path.replace("file1", "file2");
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            verifyProgram();

            function verifyProgram() {
                checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
                checkWatchedDirectories(host, [], /*recursive*/ false);
                checkWatchedDirectories(host, [projectLocation, `${projectLocation}/node_modules/@types`], /*recursive*/ true);
                checkWatchedFiles(host, files.map(f => f.path));
            }
        });

        it("updates errors correctly when declaration emit is disabled in compiler options", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const aFile: File = {
                path: `${currentDirectory}/a.ts`,
                content: `import test from './b';
test(4, 5);`
            };
            const bFileContent = `function test(x: number, y: number) {
    return x + y / 5;
}
export default test;`;
            const bFile: File = {
                path: `${currentDirectory}/b.ts`,
                content: bFileContent
            };
            const tsconfigFile: File = {
                path: `${currentDirectory}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "commonjs",
                        noEmit: true,
                        strict: true,
                    }
                })
            };
            const files = [aFile, bFile, libFile, tsconfigFile];
            const host = createWatchedSystem(files, { currentDirectory });
            const watch = createWatchOfConfigFile("tsconfig.json", host);
            checkOutputErrorsInitial(host, emptyArray);

            changeParameterType("x", "string", [
                getDiagnosticOfFileFromProgram(watch(), aFile.path, aFile.content.indexOf("4"), 1, Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1, "4", "string")
            ]);
            changeParameterType("y", "string", [
                getDiagnosticOfFileFromProgram(watch(), aFile.path, aFile.content.indexOf("5"), 1, Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1, "5", "string"),
                getDiagnosticOfFileFromProgram(watch(), bFile.path, bFile.content.indexOf("y /"), 1, Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type)
            ]);

            function changeParameterType(parameterName: string, toType: string, expectedErrors: ReadonlyArray<Diagnostic>) {
                const newContent = bFileContent.replace(new RegExp(`${parameterName}\: [a-z]*`), `${parameterName}: ${toType}`);

                verifyErrorsWithBFileContents(newContent, expectedErrors);
                verifyErrorsWithBFileContents(bFileContent, emptyArray);
            }

            function verifyErrorsWithBFileContents(content: string, expectedErrors: ReadonlyArray<Diagnostic>) {
                host.writeFile(bFile.path, content);
                host.runQueuedTimeoutCallbacks();
                checkOutputErrorsIncremental(host, expectedErrors);
            }
        });

        it("updates errors when strictNullChecks changes", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const aFile: File = {
                path: `${currentDirectory}/a.ts`,
                content: `declare function foo(): null | { hello: any };
foo().hello`
            };
            const config: File = {
                path: `${currentDirectory}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: {} })
            };
            const files = [aFile, config, libFile];
            const host = createWatchedSystem(files, { currentDirectory });
            const watch = createWatchOfConfigFile("tsconfig.json", host);
            checkProgramActualFiles(watch(), [aFile.path, libFile.path]);
            checkOutputErrorsInitial(host, emptyArray);
            const modifiedTimeOfAJs = host.getModifiedTime(`${currentDirectory}/a.js`);
            host.writeFile(config.path, JSON.stringify({ compilerOptions: { strictNullChecks: true } }));
            host.runQueuedTimeoutCallbacks();
            const expectedStrictNullErrors = [
                getDiagnosticOfFileFromProgram(watch(), aFile.path, aFile.content.lastIndexOf("foo()"), 5, Diagnostics.Object_is_possibly_null)
            ];
            checkOutputErrorsIncremental(host, expectedStrictNullErrors);
            // File a need not be rewritten
            assert.equal(host.getModifiedTime(`${currentDirectory}/a.js`), modifiedTimeOfAJs);
            host.writeFile(config.path, JSON.stringify({ compilerOptions: { strict: true, alwaysStrict: false } })); // Avoid changing 'alwaysStrict' or must re-bind
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, expectedStrictNullErrors);
            // File a need not be rewritten
            assert.equal(host.getModifiedTime(`${currentDirectory}/a.js`), modifiedTimeOfAJs);
            host.writeFile(config.path, JSON.stringify({ compilerOptions: {} }));
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
            // File a need not be rewritten
            assert.equal(host.getModifiedTime(`${currentDirectory}/a.js`), modifiedTimeOfAJs);
        });

        it("updates errors when ambient modules of program changes", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const aFile: File = {
                path: `${currentDirectory}/a.ts`,
                content: `declare module 'a' {
  type foo = number;
}`
            };
            const config: File = {
                path: `${currentDirectory}/tsconfig.json`,
                content: "{}"
            };
            const files = [aFile, config, libFile];
            const host = createWatchedSystem(files, { currentDirectory });
            const watch = createWatchOfConfigFile("tsconfig.json", host);
            checkProgramActualFiles(watch(), [aFile.path, libFile.path]);
            checkOutputErrorsInitial(host, emptyArray);

            // Create bts with same file contents
            const bTsPath = `${currentDirectory}/b.ts`;
            host.writeFile(bTsPath, aFile.content);
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), [aFile.path, "b.ts", libFile.path]);
            checkOutputErrorsIncremental(host, [
                "a.ts(2,8): error TS2300: Duplicate identifier 'foo'.\n",
                "b.ts(2,8): error TS2300: Duplicate identifier 'foo'.\n"
            ]);

            // Delete bTs
            host.deleteFile(bTsPath);
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), [aFile.path, libFile.path]);
            checkOutputErrorsIncremental(host, emptyArray);
        });

        describe("updates errors in lib file", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const field = "fullscreen";
            const fieldWithoutReadonly = `interface Document {
	${field}: boolean;
}`;

            const libFileWithDocument: File = {
                path: libFile.path,
                content: `${libFile.content}
interface Document {
    readonly ${field}: boolean;
}`
            };

            function getDiagnostic(program: Program, file: File) {
                return getDiagnosticOfFileFromProgram(program, file.path, file.content.indexOf(field), field.length, Diagnostics.All_declarations_of_0_must_have_identical_modifiers, field);
            }

            function verifyLibFileErrorsWith(aFile: File) {
                const files = [aFile, libFileWithDocument];

                function verifyLibErrors(options: CompilerOptions) {
                    const host = createWatchedSystem(files, { currentDirectory });
                    const watch = createWatchOfFilesAndCompilerOptions([aFile.path], host, options);
                    checkProgramActualFiles(watch(), [aFile.path, libFile.path]);
                    checkOutputErrorsInitial(host, getErrors());

                    host.writeFile(aFile.path, aFile.content.replace(fieldWithoutReadonly, "var x: string;"));
                    host.runQueuedTimeoutCallbacks();
                    checkProgramActualFiles(watch(), [aFile.path, libFile.path]);
                    checkOutputErrorsIncremental(host, emptyArray);

                    host.writeFile(aFile.path, aFile.content);
                    host.runQueuedTimeoutCallbacks();
                    checkProgramActualFiles(watch(), [aFile.path, libFile.path]);
                    checkOutputErrorsIncremental(host, getErrors());

                    function getErrors() {
                        return [
                            ...(options.skipLibCheck || options.skipDefaultLibCheck ? [] : [getDiagnostic(watch(), libFileWithDocument)]),
                            getDiagnostic(watch(), aFile)
                        ];
                    }
                }

                it("with default options", () => {
                    verifyLibErrors({});
                });
                it("with skipLibCheck", () => {
                    verifyLibErrors({ skipLibCheck: true });
                });
                it("with skipDefaultLibCheck", () => {
                    verifyLibErrors({ skipDefaultLibCheck: true });
                });
            }

            describe("when non module file changes", () => {
                const aFile: File = {
                    path: `${currentDirectory}/a.ts`,
                    content: `${fieldWithoutReadonly}
var y: number;`
                };
                verifyLibFileErrorsWith(aFile);
            });

            describe("when module file with global definitions changes", () => {
                const aFile: File = {
                    path: `${currentDirectory}/a.ts`,
                    content: `export {}
declare global {
${fieldWithoutReadonly}
var y: number;
}`
                };
                verifyLibFileErrorsWith(aFile);
            });
        });

        it("when skipLibCheck and skipDefaultLibCheck changes", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const field = "fullscreen";
            const aFile: File = {
                path: `${currentDirectory}/a.ts`,
                content: `interface Document {
	${field}: boolean;
}`
            };
            const bFile: File = {
                path: `${currentDirectory}/b.d.ts`,
                content: `interface Document {
	${field}: boolean;
}`
            };
            const libFileWithDocument: File = {
                path: libFile.path,
                content: `${libFile.content}
interface Document {
    readonly ${field}: boolean;
}`
            };
            const configFile: File = {
                path: `${currentDirectory}/tsconfig.json`,
                content: "{}"
            };

            const files = [aFile, bFile, configFile, libFileWithDocument];

            const host = createWatchedSystem(files, { currentDirectory });
            const watch = createWatchOfConfigFile("tsconfig.json", host);
            verifyProgramFiles();
            checkOutputErrorsInitial(host, [
                getDiagnostic(libFileWithDocument),
                getDiagnostic(aFile),
                getDiagnostic(bFile)
            ]);

            verifyConfigChange({ skipLibCheck: true }, [aFile]);
            verifyConfigChange({ skipDefaultLibCheck: true }, [aFile, bFile]);
            verifyConfigChange({}, [libFileWithDocument, aFile, bFile]);
            verifyConfigChange({ skipDefaultLibCheck: true }, [aFile, bFile]);
            verifyConfigChange({ skipLibCheck: true }, [aFile]);
            verifyConfigChange({}, [libFileWithDocument, aFile, bFile]);

            function verifyConfigChange(compilerOptions: CompilerOptions, errorInFiles: ReadonlyArray<File>) {
                host.writeFile(configFile.path, JSON.stringify({ compilerOptions }));
                host.runQueuedTimeoutCallbacks();
                verifyProgramFiles();
                checkOutputErrorsIncremental(host, errorInFiles.map(getDiagnostic));
            }

            function getDiagnostic(file: File) {
                return getDiagnosticOfFileFromProgram(watch(), file.path, file.content.indexOf(field), field.length, Diagnostics.All_declarations_of_0_must_have_identical_modifiers, field);
            }

            function verifyProgramFiles() {
                checkProgramActualFiles(watch(), [aFile.path, bFile.path, libFile.path]);
            }
        });

        it("reports errors correctly with isolatedModules", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const aFile: File = {
                path: `${currentDirectory}/a.ts`,
                content: `export const a: string = "";`
            };
            const bFile: File = {
                path: `${currentDirectory}/b.ts`,
                content: `import { a } from "./a";
const b: string = a;`
            };
            const configFile: File = {
                path: `${currentDirectory}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        isolatedModules: true
                    }
                })
            };

            const files = [aFile, bFile, libFile, configFile];

            const host = createWatchedSystem(files, { currentDirectory });
            const watch = createWatchOfConfigFile("tsconfig.json", host);
            verifyProgramFiles();
            checkOutputErrorsInitial(host, emptyArray);
            assert.equal(host.readFile(`${currentDirectory}/a.js`), `"use strict";
exports.__esModule = true;
exports.a = "";
`, "Contents of a.js");
            assert.equal(host.readFile(`${currentDirectory}/b.js`), `"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var b = a_1.a;
`, "Contents of b.js");
            const modifiedTime = host.getModifiedTime(`${currentDirectory}/b.js`);

            host.writeFile(aFile.path, `export const a: number = 1`);
            host.runQueuedTimeoutCallbacks();
            verifyProgramFiles();
            checkOutputErrorsIncremental(host, [
                getDiagnosticOfFileFromProgram(watch(), bFile.path, bFile.content.indexOf("b"), 1, Diagnostics.Type_0_is_not_assignable_to_type_1, "number", "string")
            ]);
            assert.equal(host.readFile(`${currentDirectory}/a.js`), `"use strict";
exports.__esModule = true;
exports.a = 1;
`, "Contents of a.js");
            assert.equal(host.getModifiedTime(`${currentDirectory}/b.js`), modifiedTime, "Timestamp of b.js");

            function verifyProgramFiles() {
                checkProgramActualFiles(watch(), [aFile.path, bFile.path, libFile.path]);
            }
        });
    });
}
