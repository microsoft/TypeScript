namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: program updates", () => {
        const scenario = "programUpdates";
        const configFilePath = "/a/b/tsconfig.json";
        const configFile: File = {
            path: configFilePath,
            content: `{}`
        };
        verifyTscWatch({
            scenario,
            subScenario: "create watch without config file",
            commandLineArgs: ["-w", "/a/b/c/app.ts"],
            sys: () => {
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
                return createWatchedSystem([appFile, moduleFile, libFile]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "can handle tsconfig file name with difference casing",
            commandLineArgs: ["-w", "-p", "/A/B/tsconfig.json"],
            sys: () => {
                const f1 = {
                    path: "/a/b/app.ts",
                    content: "let x = 1"
                };
                const config = {
                    path: configFilePath,
                    content: JSON.stringify({
                        include: ["app.ts"]
                    })
                };
                return createWatchedSystem([f1, libFile, config], { useCaseSensitiveFileNames: false });
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "create configured project without file list",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const configFile: File = {
                    path: configFilePath,
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
                return createWatchedSystem([configFile, libFile, file1, file2, file3]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "add new files to a configured program without file list",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => createWatchedSystem([commonFile1, libFile, configFile]),
            changes: [
                {
                    caption: "Create commonFile2",
                    change: sys => sys.writeFile(commonFile2.path, commonFile2.content),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "should ignore non-existing files specified in the config file",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const configFile: File = {
                    path: configFilePath,
                    content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
                };
                return createWatchedSystem([commonFile1, commonFile2, libFile, configFile]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "handle recreated files correctly",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                return createWatchedSystem([libFile, commonFile1, commonFile2, configFile]);
            },
            changes: [
                {
                    caption: "delete file2",
                    change: sys => sys.deleteFile(commonFile2.path),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "recreate file2",
                    change: sys => sys.writeFile(commonFile2.path, commonFile2.content),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "handles the missing files - that were added to program because they were added with tripleSlashRefs",
            commandLineArgs: ["-w", "/a/b/commonFile1.ts"],
            sys: () => {
                const file1: File = {
                    path: commonFile1.path,
                    content: `/// <reference path="commonFile2.ts"/>
                    let x = y`
                };
                return createWatchedSystem([file1, libFile]);
            },
            changes: [
                {
                    caption: "create file2",
                    change: sys => sys.writeFile(commonFile2.path, commonFile2.content),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "should reflect change in config file",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const configFile: File = {
                    path: configFilePath,
                    content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
                };
                return createWatchedSystem([libFile, commonFile1, commonFile2, configFile]);
            },
            changes: [
                {
                    caption: "Change config",
                    change: sys => sys.writeFile(configFilePath, `{
                        "compilerOptions": {},
                        "files": ["${commonFile1.path}"]
                    }`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "works correctly when config file is changed but its content havent",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const configFile: File = {
                    path: configFilePath,
                    content: `{
                        "compilerOptions": {},
                        "files": ["${commonFile1.path}", "${commonFile2.path}"]
                    }`
                };
                return createWatchedSystem([libFile, commonFile1, commonFile2, configFile]);
            },
            changes: [
                {
                    caption: "Modify config without changing content",
                    change: sys => sys.modifyFile(configFilePath, `{
                        "compilerOptions": {},
                        "files": ["${commonFile1.path}", "${commonFile2.path}"]
                    }`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "Updates diagnostics when '--noUnusedLabels' changes",
            commandLineArgs: ["-w", "-p", "/tsconfig.json"],
            sys: () => {
                const aTs: File = {
                    path: "/a.ts",
                    content: "label: while (1) {}"
                };
                const tsconfig: File = {
                    path: "/tsconfig.json",
                    content: JSON.stringify({
                        compilerOptions: { allowUnusedLabels: true }
                    })
                };
                return createWatchedSystem([libFile, aTs, tsconfig]);
            },
            changes: [
                {
                    caption: "Disable  allowUnsusedLabels",
                    change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                        compilerOptions: { allowUnusedLabels: false }
                    })),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Enable  allowUnsusedLabels",
                    change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                        compilerOptions: { allowUnusedLabels: true }
                    })),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "updates diagnostics and emit for decorators",
            commandLineArgs: ["-w"],
            sys: () => {
                const aTs: File = {
                    path: "/a.ts",
                    content: `import {B} from './b'
@((_) => {})
export class A {
    constructor(p: B) {}
}`,
                };
                const bTs: File = {
                    path: "/b.ts",
                    content: `export class B {}`,
                };
                const tsconfig: File = {
                    path: "/tsconfig.json",
                    content: JSON.stringify({
                        compilerOptions: { target: "es6", importsNotUsedAsValues: "error" }
                    })
                };
                return createWatchedSystem([libFile, aTs, bTs, tsconfig]);
            },
            changes: [
                {
                    caption: "Enable experimentalDecorators",
                    change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                        compilerOptions: { target: "es6", importsNotUsedAsValues: "error", experimentalDecorators: true }
                    })),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,

                },
                {
                    caption: "Enable emitDecoratorMetadata",
                    change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                        compilerOptions: { target: "es6", importsNotUsedAsValues: "error", experimentalDecorators: true, emitDecoratorMetadata: true }
                    })),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "files explicitly excluded in config file",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const configFile: File = {
                    path: configFilePath,
                    content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
                };
                const excludedFile1: File = {
                    path: "/a/c/excluedFile1.ts",
                    content: `let t = 1;`
                };
                return createWatchedSystem([libFile, commonFile1, commonFile2, excludedFile1, configFile]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "should properly handle module resolution changes in config file",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
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
                    path: configFilePath,
                    content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
                };
                return createWatchedSystem([libFile, file1, nodeModuleFile, classicModuleFile, configFile]);
            },
            changes: [
                {
                    caption: "Change module resolution to classic",
                    change: sys => sys.writeFile(configFile.path, `{
                        "compilerOptions": {
                            "moduleResolution": "classic"
                        },
                        "files": ["/a/b/file1.ts"]
                    }`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "should tolerate config file errors and still try to build a project",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const configFile: File = {
                    path: configFilePath,
                    content: `{
                        "compilerOptions": {
                            "module": "none",
                            "allowAnything": true
                        },
                        "someOtherProperty": {}
                    }`
                };
                return createWatchedSystem([commonFile1, commonFile2, libFile, configFile]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "changes in files are reflected in project structure",
            commandLineArgs: ["-w", "/a/b/f1.ts"],
            sys: () => {
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
                return createWatchedSystem([file1, file2, file3, libFile]);
            },
            changes: [
                {
                    caption: "Modify f2 to include f3",
                    // now inferred project should inclule file3
                    change: sys => sys.modifyFile("/a/b/f2.ts", `export * from "../c/f3"`),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "deleted files affect project structure",
            commandLineArgs: ["-w", "/a/b/f1.ts", "--noImplicitAny"],
            sys: () => {
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
                return createWatchedSystem([file1, file2, file3, libFile]);
            },
            changes: [
                {
                    caption: "Delete f2",
                    change: sys => sys.deleteFile("/a/b/f2.ts"),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "deleted files affect project structure-2",
            commandLineArgs: ["-w", "/a/b/f1.ts", "/a/c/f3.ts", "--noImplicitAny"],
            sys: () => {
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
                return createWatchedSystem([file1, file2, file3, libFile]);
            },
            changes: [
                {
                    caption: "Delete f2",
                    change: sys => sys.deleteFile("/a/b/f2.ts"),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "config file includes the file",
            commandLineArgs: ["-w", "-p", "/a/c/tsconfig.json"],
            sys: () => {
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
                return createWatchedSystem([file1, file2, file3, libFile, configFile]);
            },
            changes: emptyArray
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
            checkProgramActualFiles(watch.getCurrentProgram().getProgram(), [file2.path, file3.path]);

            const watch2 = createWatchOfFilesAndCompilerOptions([file1.path], host);
            checkProgramActualFiles(watch2.getCurrentProgram().getProgram(), [file1.path, file2.path, file3.path]);

            // Previous program shouldnt be updated
            checkProgramActualFiles(watch.getCurrentProgram().getProgram(), [file2.path, file3.path]);
            host.checkTimeoutQueueLength(0);
        });

        verifyTscWatch({
            scenario,
            subScenario: "can correctly update configured project when set of root files has changed (new file on disk)",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file1 = {
                    path: "/a/b/f1.ts",
                    content: "let x = 1"
                };
                return createWatchedSystem([file1, libFile, configFile]);
            },
            changes: [
                {
                    caption: "Write f2",
                    change: sys => sys.writeFile("/a/b/f2.ts", "let y = 1"),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "can correctly update configured project when set of root files has changed (new file in list of files)",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file1 = {
                    path: "/a/b/f1.ts",
                    content: "let x = 1"
                };
                const file2 = {
                    path: "/a/b/f2.ts",
                    content: "let y = 1"
                };
                const configFile = {
                    path: configFilePath,
                    content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts"] })
                };
                return createWatchedSystem([file1, file2, libFile, configFile]);
            },
            changes: [
                {
                    caption: "Modify config to make f2 as root too",
                    change: sys => sys.writeFile(configFilePath, JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "can update configured project when set of root files was not changed",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file1 = {
                    path: "/a/b/f1.ts",
                    content: "let x = 1"
                };
                const file2 = {
                    path: "/a/b/f2.ts",
                    content: "let y = 1"
                };
                const configFile = {
                    path: configFilePath,
                    content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
                };
                return createWatchedSystem([file1, file2, libFile, configFile]);
            },
            changes: [
                {
                    caption: "Modify config to set outFile option",
                    change: sys => sys.writeFile(configFilePath, JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "config file is deleted",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file1 = {
                    path: "/a/b/f1.ts",
                    content: "let x = 1;"
                };
                const file2 = {
                    path: "/a/b/f2.ts",
                    content: "let y = 2;"
                };
                return createWatchedSystem([file1, file2, libFile, configFile]);
            },
            changes: [
                {
                    caption: "Delete config file",
                    change: sys => sys.deleteFile(configFilePath),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "Proper errors document is not contained in project",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file1 = {
                    path: "/a/b/app.ts",
                    content: ""
                };
                const corruptedConfig = {
                    path: configFilePath,
                    content: "{"
                };
                return createWatchedSystem([file1, libFile, corruptedConfig]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "correctly handles changes in lib section of config file",
            commandLineArgs: ["-w", "-p", "/src/tsconfig.json"],
            sys: () => {
                const libES5 = {
                    path: "/compiler/lib.es5.d.ts",
                    content: `${libFile.content}
declare const eval: any`
                };
                const libES2015Promise = {
                    path: "/compiler/lib.es2015.promise.d.ts",
                    content: `declare class Promise<T> {}`
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
                return createWatchedSystem([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
            },
            changes: [
                {
                    caption: "Change the lib in config",
                    change: sys => sys.writeFile("/src/tsconfig.json", JSON.stringify(
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
                    ),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "should handle non-existing directories in config file",
            commandLineArgs: ["-w", "-p", "/a/tsconfig.json"],
            sys: () => {
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
                return createWatchedSystem([f, config, libFile]);
            },
            changes: emptyArray
        });

        function runQueuedTimeoutCallbacksTwice(sys: WatchedSystem) {
            sys.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
            sys.runQueuedTimeoutCallbacks(); // Actual update
        }

        const changeModuleFileToModuleFile1: TscWatchCompileChange = {
            caption: "Rename moduleFile to moduleFile1",
            change: sys => {
                sys.renameFile("/a/b/moduleFile.ts", "/a/b/moduleFile1.ts");
                sys.deleteFile("/a/b/moduleFile.js");
            },
            timeouts: runQueuedTimeoutCallbacksTwice
        };
        const changeModuleFile1ToModuleFile: TscWatchCompileChange = {
            caption: "Rename moduleFile1 back to moduleFile",
            change: sys => sys.renameFile("/a/b/moduleFile1.ts", "/a/b/moduleFile.ts"),
            timeouts: runQueuedTimeoutCallbacksTwice,
        };

        verifyTscWatch({
            scenario,
            subScenario: "rename a module file and rename back should restore the states for inferred projects",
            commandLineArgs: ["-w", "/a/b/file1.ts"],
            sys: () => {
                const moduleFile = {
                    path: "/a/b/moduleFile.ts",
                    content: "export function bar() { };"
                };
                const file1 = {
                    path: "/a/b/file1.ts",
                    content: 'import * as T from "./moduleFile"; T.bar();'
                };
                return createWatchedSystem([moduleFile, file1, libFile]);
            },
            changes: [
                changeModuleFileToModuleFile1,
                changeModuleFile1ToModuleFile
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "rename a module file and rename back should restore the states for configured projects",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const moduleFile = {
                    path: "/a/b/moduleFile.ts",
                    content: "export function bar() { };"
                };
                const file1 = {
                    path: "/a/b/file1.ts",
                    content: 'import * as T from "./moduleFile"; T.bar();'
                };
                return createWatchedSystem([moduleFile, file1, configFile, libFile]);
            },
            changes: [
                changeModuleFileToModuleFile1,
                changeModuleFile1ToModuleFile
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "types should load from config file path if config exists",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const f1 = {
                    path: "/a/b/app.ts",
                    content: "let x = 1"
                };
                const config = {
                    path: configFilePath,
                    content: JSON.stringify({ compilerOptions: { types: ["node"], typeRoots: [] } })
                };
                const node = {
                    path: "/a/b/node_modules/@types/node/index.d.ts",
                    content: "declare var process: any"
                };
                const cwd = {
                    path: "/a/c"
                };
                return createWatchedSystem([f1, config, node, cwd, libFile], { currentDirectory: cwd.path });
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "add the missing module file for inferred project-should remove the module not found error",
            commandLineArgs: ["-w", "/a/b/file1.ts"],
            sys: () => {
                const file1 = {
                    path: "/a/b/file1.ts",
                    content: 'import * as T from "./moduleFile"; T.bar();'
                };
                return createWatchedSystem([file1, libFile]);
            },
            changes: [
                {
                    caption: "Create module file",
                    change: sys => sys.writeFile("/a/b/moduleFile.ts", "export function bar() { }"),
                    timeouts: runQueuedTimeoutCallbacksTwice,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "Configure file diagnostics events are generated when the config file has errors",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file = {
                    path: "/a/b/app.ts",
                    content: "let x = 10"
                };
                const configFile = {
                    path: configFilePath,
                    content: `{
                        "compilerOptions": {
                            "foo": "bar",
                            "allowJS": true
                        }
                    }`
                };
                return createWatchedSystem([file, configFile, libFile]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "if config file doesnt have errors, they are not reported",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file = {
                    path: "/a/b/app.ts",
                    content: "let x = 10"
                };
                const configFile = {
                    path: configFilePath,
                    content: `{
                        "compilerOptions": {}
                    }`
                };
                return createWatchedSystem([file, configFile, libFile]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "Reports errors when the config file changes",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file = {
                    path: "/a/b/app.ts",
                    content: "let x = 10"
                };
                return createWatchedSystem([file, configFile, libFile]);
            },
            changes: [
                {
                    caption: "change config file to add error",
                    change: sys => sys.writeFile(configFilePath, `{
                        "compilerOptions": {
                            "haha": 123
                        }
                    }`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "change config file to remove error",
                    change: sys => sys.writeFile(configFilePath, `{
                        "compilerOptions": {
                        }
                    }`),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "non-existing directories listed in config file input array should be tolerated without crashing the server",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const configFile = {
                    path: configFilePath,
                    content: `{
                        "compilerOptions": {},
                        "include": ["app/*", "test/**/*", "something"]
                    }`
                };
                const file1 = {
                    path: "/a/b/file1.ts",
                    content: "let t = 10;"
                };
                return createWatchedSystem([file1, configFile, libFile]);
            },
            changes: emptyArray
        });

        verifyTscWatch({
            scenario,
            subScenario: "non-existing directories listed in config file input array should be able to handle @types if input file list is empty",
            commandLineArgs: ["-w", "-p", "/a/tsconfig.json"],
            sys: () => {
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
                return createWatchedSystem([f, config, t1, t2, libFile], { currentDirectory: getDirectoryPath(f.path) });
            },
            changes: emptyArray
        });

        it("should support files without extensions", () => {
            const f = {
                path: "/a/compile",
                content: "let x = 1"
            };
            const host = createWatchedSystem([f, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([f.path], host, { allowNonTsExtensions: true });
            checkProgramActualFiles(watch.getCurrentProgram().getProgram(), [f.path, libFile.path]);
        });

        verifyTscWatch({
            scenario,
            subScenario: "Options Diagnostic locations reported correctly with changes in configFile contents when options change",
            commandLineArgs: ["-w", "-p", configFilePath],
            sys: () => {
                const file = {
                    path: "/a/b/app.ts",
                    content: "let x = 10"
                };
                const configFile = {
                    path: configFilePath,
                    content: `
{
    // comment
    // More comment
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
}`
                };
                return createWatchedSystem([file, libFile, configFile]);
            },
            changes: [
                {
                    caption: "Remove the comment from config file",
                    change: sys => sys.writeFile(configFilePath, `
{
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
}`),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        describe("should not trigger recompilation because of program emit", () => {
            function verifyWithOptions(subScenario: string, options: CompilerOptions) {
                verifyTscWatch({
                    scenario,
                    subScenario: `should not trigger recompilation because of program emit/${subScenario}`,
                    commandLineArgs: ["-w", "-p", `${projectRoot}/tsconfig.json`],
                    sys: () => {
                        const file1: File = {
                            path: `${projectRoot}/file1.ts`,
                            content: "export const c = 30;"
                        };
                        const file2: File = {
                            path: `${projectRoot}/src/file2.ts`,
                            content: `import {c} from "file1"; export const d = 30;`
                        };
                        const tsconfig: File = {
                            path: `${projectRoot}/tsconfig.json`,
                            content: generateTSConfig(options, emptyArray, "\n")
                        };
                        return createWatchedSystem([file1, file2, libFile, tsconfig], { currentDirectory: projectRoot });
                    },
                    changes: emptyArray
                });
            }

            verifyWithOptions(
                "without outDir or outFile is specified",
                { module: ModuleKind.AMD }
            );

            verifyWithOptions(
                "with outFile",
                { module: ModuleKind.AMD, outFile: "build/outFile.js" }
            );

            verifyWithOptions(
                "when outDir is specified",
                { module: ModuleKind.AMD, outDir: "build" }
            );

            verifyWithOptions(
                "when outDir and declarationDir is specified",
                { module: ModuleKind.AMD, outDir: "build", declaration: true, declarationDir: "decls" }
            );

            verifyWithOptions(
                "declarationDir is specified",
                { module: ModuleKind.AMD, declaration: true, declarationDir: "decls" }
            );
        });

        verifyTscWatch({
            scenario,
            subScenario: "shouldnt report error about unused function incorrectly when file changes from global to module",
            commandLineArgs: ["-w", "/a/b/file.ts", "--noUnusedLocals"],
            sys: () => {
                const file: File = {
                    path: "/a/b/file.ts",
                    content: `function one() {}
function two() {
    return function three() {
        one();
    }
}`
                };
                return createWatchedSystem([file, libFile]);
            },
            changes: [
                {
                    caption: "Change file to module",
                    change: sys => sys.writeFile("/a/b/file.ts", `function one() {}
export function two() {
    return function three() {
        one();
    }
}`),
                    timeouts: runQueuedTimeoutCallbacks,

                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "watched files when file is deleted and new file is added as part of change",
            commandLineArgs: ["-w", "-p", "/home/username/project/tsconfig.json"],
            sys: () => {
                const projectLocation = "/home/username/project";
                const file: File = {
                    path: `${projectLocation}/src/file1.ts`,
                    content: "var a = 10;"
                };
                const configFile: File = {
                    path: `${projectLocation}/tsconfig.json`,
                    content: "{}"
                };
                return createWatchedSystem([file, libFile, configFile]);
            },
            changes: [
                {
                    caption: "Rename file1 to file2",
                    change: sys => sys.renameFile("/home/username/project/src/file1.ts", "/home/username/project/src/file2.ts"),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        function changeParameterTypeOfBFile(parameterName: string, toType: string): TscWatchCompileChange {
            return {
                caption: `Changed ${parameterName} type to ${toType}`,
                change: sys => replaceFileText(sys, `${projectRoot}/b.ts`, new RegExp(`${parameterName}\: [a-z]*`), `${parameterName}: ${toType}`),
                timeouts: runQueuedTimeoutCallbacks,
            };
        }

        verifyTscWatch({
            scenario,
            subScenario: "updates errors correctly when declaration emit is disabled in compiler options",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `import test from './b';
test(4, 5);`
                };
                const bFile: File = {
                    path: `${projectRoot}/b.ts`,
                    content: `function test(x: number, y: number) {
    return x + y / 5;
}
export default test;`
                };
                const tsconfigFile: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            module: "commonjs",
                            noEmit: true,
                            strict: true,
                        }
                    })
                };
                return createWatchedSystem([aFile, bFile, libFile, tsconfigFile], { currentDirectory: projectRoot });
            },
            changes: [
                changeParameterTypeOfBFile("x", "string"),
                changeParameterTypeOfBFile("x", "number"),
                changeParameterTypeOfBFile("y", "string"),
                changeParameterTypeOfBFile("y", "number"),
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "updates errors when strictNullChecks changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `declare function foo(): null | { hello: any };
foo().hello`
                };
                const config: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: {} })
                };
                return createWatchedSystem([aFile, config, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Enable strict null checks",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { strictNullChecks: true } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Set always strict false",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { strict: true, alwaysStrict: false } })), // Avoid changing 'alwaysStrict' or must re-bind
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Disable strict",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: {} })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "updates errors when noErrorTruncation changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `declare var v: {
    reallyLongPropertyName1: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName2: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName3: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName4: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName5: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName6: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName7: string | number | boolean | object | symbol | bigint;
};
v === 'foo';`
                };
                const config: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: {} })
                };
                return createWatchedSystem([aFile, config, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Enable noErrorTruncation",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { noErrorTruncation: true } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "updates diagnostics and emit when useDefineForClassFields changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `/a.ts`,
                    content: `class C { get prop() { return 1; } }
class D extends C { prop = 1; }`
                };
                const config: File = {
                    path: `/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { target: "es6" } })
                };
                return createWatchedSystem([aFile, config, libFile]);
            },
            changes: [
                {
                    caption: "Enable useDefineForClassFields",
                    change: sys => sys.writeFile(`/tsconfig.json`, JSON.stringify({ compilerOptions: { target: "es6", useDefineForClassFields: true } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "updates errors and emit when importsNotUsedAsValues changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `export class C {}`
                };
                const bFile: File = {
                    path: `${projectRoot}/b.ts`,
                    content: `import {C} from './a';
export function f(p: C) { return p; }`
                };
                const config: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: {} })
                };
                return createWatchedSystem([aFile, bFile, config, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: 'Set to "remove"',
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { importsNotUsedAsValues: "remove" } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: 'Set to "error"',
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { importsNotUsedAsValues: "error" } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: 'Set to "preserve"',
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { importsNotUsedAsValues: "preserve" } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });


        verifyTscWatch({
            scenario,
            subScenario: "updates errors when forceConsistentCasingInFileNames changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `/a.ts`,
                    content: `export class C {}`
                };
                const bFile: File = {
                    path: `/b.ts`,
                    content: `import {C} from './a'; import * as A from './A';`
                };
                const config: File = {
                    path: `/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: {} })
                };
                return createWatchedSystem([aFile, bFile, config, libFile], { useCaseSensitiveFileNames: false });
            },
            changes: [
                {
                    caption: "Enable forceConsistentCasingInFileNames",
                    change: sys => sys.writeFile(`/tsconfig.json`, JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "updates moduleResolution when resolveJsonModule changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `import * as data from './data.json'`
                };
                const jsonFile: File = {
                    path: `${projectRoot}/data.json`,
                    content: `{ "foo": 1 }`
                };
                const config: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { moduleResolution: "node" } })
                };
                return createWatchedSystem([aFile, jsonFile, config, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Enable resolveJsonModule",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { moduleResolution: "node", resolveJsonModule: true } })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "updates errors when ambient modules of program changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `declare module 'a' {
  type foo = number;
}`
                };
                const config: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: "{}"
                };
                return createWatchedSystem([aFile, config, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Create b.ts with same content",
                    // Create bts with same file contents
                    change: sys => sys.writeFile(`${projectRoot}/b.ts`, `declare module 'a' {
  type foo = number;
}`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "Delete b.ts",
                    change: sys => sys.deleteFile(`${projectRoot}/b.ts`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        describe("updates errors in lib file", () => {
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

            function verifyLibFileErrorsWith(subScenario: string, aFile: File) {
                function verifyLibErrors(subScenario: string, commandLineOptions: readonly string[]) {
                    verifyTscWatch({
                        scenario,
                        subScenario: `updates errors in lib file/${subScenario}`,
                        commandLineArgs: ["-w", aFile.path, ...commandLineOptions],
                        sys: () => createWatchedSystem([aFile, libFileWithDocument], { currentDirectory: projectRoot }),
                        changes: [
                            {
                                caption: "Remove document declaration from file",
                                change: sys => sys.writeFile(aFile.path, aFile.content.replace(fieldWithoutReadonly, "var x: string;")),
                                timeouts: runQueuedTimeoutCallbacks,
                            },
                            {
                                caption: "Rever the file to contain document declaration",
                                change: sys => sys.writeFile(aFile.path, aFile.content),
                                timeouts: runQueuedTimeoutCallbacks,
                            },
                        ]
                    });
                }

                verifyLibErrors(`${subScenario}/with default options`, emptyArray);
                verifyLibErrors(`${subScenario}/with skipLibCheck`, ["--skipLibCheck"]);
                verifyLibErrors(`${subScenario}/with skipDefaultLibCheck`, ["--skipDefaultLibCheck"]);
            }

            describe("when non module file changes", () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `${fieldWithoutReadonly}
var y: number;`
                };
                verifyLibFileErrorsWith("when non module file changes", aFile);
            });

            describe("when module file with global definitions changes", () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `export {}
declare global {
${fieldWithoutReadonly}
var y: number;
}`
                };
                verifyLibFileErrorsWith("when module file with global definitions changes", aFile);
            });
        });

        function changeWhenLibCheckChanges(compilerOptions: CompilerOptions): TscWatchCompileChange {
            const configFileContent = JSON.stringify({ compilerOptions });
            return {
                caption: `Changing config to ${configFileContent}`,
                change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, configFileContent),
                timeouts: runQueuedTimeoutCallbacks,
            };
        }

        verifyTscWatch({
            scenario,
            subScenario: "when skipLibCheck and skipDefaultLibCheck changes",
            commandLineArgs: ["-w"],
            sys: () => {
                const field = "fullscreen";
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `interface Document {
    ${field}: boolean;
}`
                };
                const bFile: File = {
                    path: `${projectRoot}/b.d.ts`,
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
                    path: `${projectRoot}/tsconfig.json`,
                    content: "{}"
                };
                return createWatchedSystem([aFile, bFile, configFile, libFileWithDocument], { currentDirectory: projectRoot });
            },
            changes: [
                changeWhenLibCheckChanges({ skipLibCheck: true }),
                changeWhenLibCheckChanges({ skipDefaultLibCheck: true }),
                changeWhenLibCheckChanges({}),
                changeWhenLibCheckChanges({ skipDefaultLibCheck: true }),
                changeWhenLibCheckChanges({ skipLibCheck: true }),
                changeWhenLibCheckChanges({}),
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "reports errors correctly with isolatedModules",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `export const a: string = "";`
                };
                const bFile: File = {
                    path: `${projectRoot}/b.ts`,
                    content: `import { a } from "./a";
const b: string = a;`
                };
                const configFile: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            isolatedModules: true
                        }
                    })
                };
                return createWatchedSystem([aFile, bFile, configFile, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Change shape of a",
                    change: sys => sys.writeFile(`${projectRoot}/a.ts`, `export const a: number = 1`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "reports errors correctly with file not in rootDir",
            commandLineArgs: ["-w"],
            sys: () => {
                const aFile: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `import { x } from "../b";`
                };
                const bFile: File = {
                    path: `/user/username/projects/b.ts`,
                    content: `export const x = 10;`
                };
                const configFile: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            rootDir: ".",
                            outDir: "lib"
                        }
                    })
                };
                return createWatchedSystem([aFile, bFile, configFile, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Make changes to file a",
                    change: sys => sys.writeFile(`${projectRoot}/a.ts`, `

import { x } from "../b";`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });
    });
}
