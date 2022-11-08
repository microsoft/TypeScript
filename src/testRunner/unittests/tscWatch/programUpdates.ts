import * as ts from "../../_namespaces/ts";
import * as Harness from "../../_namespaces/Harness";

describe("unittests:: tsc-watch:: program updates", () => {
    const scenario = "programUpdates";
    const configFilePath = "/a/b/tsconfig.json";
    const configFile: ts.tscWatch.File = {
        path: configFilePath,
        content: `{}`
    };
    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "create watch without config file",
        commandLineArgs: ["-w", "/a/b/c/app.ts"],
        sys: () => {
            const appFile: ts.tscWatch.File = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };

            const moduleFile: ts.tscWatch.File = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            return ts.tscWatch.createWatchedSystem([appFile, moduleFile, ts.tscWatch.libFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([f1, ts.tscWatch.libFile, config], { useCaseSensitiveFileNames: false });
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "create configured project without file list",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
            };
            const file1: ts.tscWatch.File = {
                path: "/a/b/c/f1.ts",
                content: "let x = 1"
            };
            const file2: ts.tscWatch.File = {
                path: "/a/b/d/f2.ts",
                content: "let y = 1"
            };
            const file3: ts.tscWatch.File = {
                path: "/a/b/e/f3.ts",
                content: "let z = 1"
            };
            return ts.tscWatch.createWatchedSystem([configFile, ts.tscWatch.libFile, file1, file2, file3]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "add new files to a configured program without file list",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => ts.tscWatch.createWatchedSystem([ts.tscWatch.commonFile1, ts.tscWatch.libFile, configFile]),
        changes: [
            {
                caption: "Create commonFile2",
                change: sys => sys.writeFile(ts.tscWatch.commonFile2.path, ts.tscWatch.commonFile2.content),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "should ignore non-existing files specified in the config file",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, ts.tscWatch.libFile, configFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "handle recreated files correctly",
        commandLineArgs: ["-w", "-p", configFilePath, "--explainFiles"],
        sys: () => {
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile]);
        },
        changes: [
            {
                caption: "change file to ensure signatures are updated",
                change: sys => sys.appendFile(ts.tscWatch.commonFile2.path, ";let xy = 10;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "delete file2",
                change: sys => sys.deleteFile(ts.tscWatch.commonFile2.path),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "recreate file2",
                change: sys => sys.writeFile(ts.tscWatch.commonFile2.path, ts.tscWatch.commonFile2.content),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "handles the missing files - that were added to program because they were added with tripleSlashRefs",
        commandLineArgs: ["-w", "/a/b/commonFile1.ts"],
        sys: () => {
            const file1: ts.tscWatch.File = {
                path: ts.tscWatch.commonFile1.path,
                content: `/// <reference path="commonFile2.ts"/>
                    let x = y`
            };
            return ts.tscWatch.createWatchedSystem([file1, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "create file2",
                change: sys => sys.writeFile(ts.tscWatch.commonFile2.path, ts.tscWatch.commonFile2.content),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "should reflect change in config file",
        commandLineArgs: ["-w", "-p", configFilePath, "--explainFiles"],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: `{
                    "compilerOptions": {},
                    "files": ["${ts.tscWatch.commonFile1.path}", "${ts.tscWatch.commonFile2.path}"]
                }`
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile]);
        },
        changes: [
            {
                caption: "change file to ensure signatures are updated",
                change: sys => sys.appendFile(ts.tscWatch.commonFile2.path, ";let xy = 10;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Change config",
                change: sys => sys.writeFile(configFilePath, `{
                        "compilerOptions": {},
                        "files": ["${ts.tscWatch.commonFile1.path}"]
                    }`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "works correctly when config file is changed but its content havent",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: `{
                        "compilerOptions": {},
                        "files": ["${ts.tscWatch.commonFile1.path}", "${ts.tscWatch.commonFile2.path}"]
                    }`
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile]);
        },
        changes: [
            {
                caption: "Modify config without changing content",
                change: sys => sys.modifyFile(configFilePath, `{
                        "compilerOptions": {},
                        "files": ["${ts.tscWatch.commonFile1.path}", "${ts.tscWatch.commonFile2.path}"]
                    }`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "Updates diagnostics when '--noUnusedLabels' changes",
        commandLineArgs: ["-w", "-p", "/tsconfig.json"],
        sys: () => {
            const aTs: ts.tscWatch.File = {
                path: "/a.ts",
                content: "label: while (1) {}"
            };
            const tsconfig: ts.tscWatch.File = {
                path: "/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { allowUnusedLabels: true }
                })
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, aTs, tsconfig]);
        },
        changes: [
            {
                caption: "Disable  allowUnsusedLabels",
                change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                    compilerOptions: { allowUnusedLabels: false }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Enable  allowUnsusedLabels",
                change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                    compilerOptions: { allowUnusedLabels: true }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates diagnostics and emit for decorators",
        commandLineArgs: ["-w"],
        sys: () => {
            const aTs: ts.tscWatch.File = {
                path: "/a.ts",
                content: `import {B} from './b'
@((_) => {})
export class A {
    constructor(p: B) {}
}`,
            };
            const bTs: ts.tscWatch.File = {
                path: "/b.ts",
                content: `export class B {}`,
            };
            const tsconfig: ts.tscWatch.File = {
                path: "/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { target: "es6", importsNotUsedAsValues: "error" }
                })
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, aTs, bTs, tsconfig]);
        },
        changes: [
            {
                caption: "Enable experimentalDecorators",
                change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                    compilerOptions: { target: "es6", importsNotUsedAsValues: "error", experimentalDecorators: true }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,

            },
            {
                caption: "Enable emitDecoratorMetadata",
                change: sys => sys.modifyFile("/tsconfig.json", JSON.stringify({
                    compilerOptions: { target: "es6", importsNotUsedAsValues: "error", experimentalDecorators: true, emitDecoratorMetadata: true }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "files explicitly excluded in config file",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
            };
            const excludedFile1: ts.tscWatch.File = {
                path: "/a/c/excluedFile1.ts",
                content: `let t = 1;`
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, excludedFile1, configFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "should properly handle module resolution changes in config file",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const file1: ts.tscWatch.File = {
                path: "/a/b/file1.ts",
                content: `import { T } from "module1";`
            };
            const nodeModuleFile: ts.tscWatch.File = {
                path: "/a/b/node_modules/module1.ts",
                content: `export interface T {}`
            };
            const classicModuleFile: ts.tscWatch.File = {
                path: "/a/module1.ts",
                content: `export interface T {}`
            };
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, file1, nodeModuleFile, classicModuleFile, configFile]);
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
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "should tolerate config file errors and still try to build a project",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: `{
                        "compilerOptions": {
                            "module": "none",
                            "allowAnything": true
                        },
                        "someOtherProperty": {}
                    }`
            };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, ts.tscWatch.libFile, configFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "changes in files are reflected in project structure",
        commandLineArgs: ["-w", "/a/b/f1.ts", "--explainFiles"],
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
            return ts.tscWatch.createWatchedSystem([file1, file2, file3, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Modify f2 to include f3",
                // now inferred project should inclule file3
                change: sys => sys.modifyFile("/a/b/f2.ts", `export * from "../c/f3"`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, file2, file3, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Delete f2",
                change: sys => sys.deleteFile("/a/b/f2.ts"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, file2, file3, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Delete f2",
                change: sys => sys.deleteFile("/a/b/f2.ts"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, file2, file3, ts.tscWatch.libFile, configFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "change module to none",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export {}\ndeclare global {}"
            };
            return ts.tscWatch.createWatchedSystem([file1, ts.tscWatch.libFile, configFile]);
        },
        changes: [{
            caption: "change `module` to 'none'",
            timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            change: sys => {
                sys.writeFile(configFilePath, JSON.stringify({ compilerOptions: { module: "none" } }));
            }
        }]
    });

    it("two watch programs are not affected by each other", () => {
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
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, file1, file2, file3]));
        const host = ts.tscWatch.createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [file2.path, file3.path],
            system: sys,
            options: { allowNonTsExtensions: true },
            cb,
            watchOptions: undefined
        });
        ts.createWatchProgram(host);
        baseline.push(`${sys.getExecutingFilePath()} --w ${file2.path} ${file3.path}`);
        ts.tscWatch.watchBaseline({
            baseline,
            getPrograms,
            oldPrograms: ts.emptyArray,
            sys,
            oldSnap,
        });

        const {cb: cb2, getPrograms: getPrograms2 } = ts.commandLineCallbacks(sys);
        const oldSnap2 = sys.snap();
        baseline.push("createing separate watcher");
        ts.createWatchProgram(ts.tscWatch.createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles:[file1.path],
            system: sys,
            options: { allowNonTsExtensions: true },
            cb: cb2,
            watchOptions: undefined
        }));
        ts.tscWatch.watchBaseline({
            baseline,
            getPrograms: getPrograms2,
            oldPrograms: ts.emptyArray,
            sys,
            oldSnap: oldSnap2,
        });

        sys.checkTimeoutQueueLength(0);
        baseline.push(`First program is not updated:: ${getPrograms() === ts.emptyArray}`);
        baseline.push(`Second program is not updated:: ${getPrograms2() === ts.emptyArray}`);
        Harness.Baseline.runBaseline(`tscWatch/${scenario}/two-watch-programs-are-not-affected-by-each-other.js`, baseline.join("\r\n"));
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "can correctly update configured project when set of root files has changed (new file on disk)",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            return ts.tscWatch.createWatchedSystem([file1, ts.tscWatch.libFile, configFile]);
        },
        changes: [
            {
                caption: "Write f2",
                change: sys => sys.writeFile("/a/b/f2.ts", "let y = 1"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, file2, ts.tscWatch.libFile, configFile]);
        },
        changes: [
            {
                caption: "Modify config to make f2 as root too",
                change: sys => sys.writeFile(configFilePath, JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "correctly parses wild card directories from implicit glob when two keys differ only in directory seperator",
        commandLineArgs: ["-w", "--extendedDiagnostics"],
        sys: () => {
            const file1 = {
                path: `${ts.tscWatch.projectRoot}/f1.ts`,
                content: "export const x = 1"
            };
            const file2 = {
                path: `${ts.tscWatch.projectRoot}/f2.ts`,
                content: "export const y = 1"
            };
            const configFile = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true }, include: ["./", "./**/*.json"] })
            };
            return ts.tscWatch.createWatchedSystem([file1, file2, ts.tscWatch.libFile, configFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Add new file",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/new-file.ts`, "export const z = 1;"),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(1),
            },
            {
                caption: "Import new file",
                change: sys => sys.prependFile(`${ts.tscWatch.projectRoot}/f1.ts`, `import { z } from "./new-file";`),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(1),
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "can correctly update configured project when set of root files has changed through include",
        commandLineArgs: ["-w", "-p", "."],
        sys: () => {
            const file1 = {
                path: `${ts.tscWatch.projectRoot}/Project/file1.ts`,
                content: "export const x = 10;"
            };
            const configFile = {
                path: `${ts.tscWatch.projectRoot}/Project/tsconfig.json`,
                content: JSON.stringify({ include: [".", "./**/*.json"] })
            };
            return ts.tscWatch.createWatchedSystem([file1, ts.tscWatch.libFile, configFile], { currentDirectory: `${ts.tscWatch.projectRoot}/Project` });
        },
        changes: [
            {
                caption: "Write file2",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/Project/file2.ts`, "export const y = 10;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, file2, ts.tscWatch.libFile, configFile]);
        },
        changes: [
            {
                caption: "Modify config to set outFile option",
                change: sys => sys.writeFile(configFilePath, JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "file in files is deleted",
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
            return ts.tscWatch.createWatchedSystem([file1, file2, ts.tscWatch.libFile, configFile]);
        },
        changes: [
            {
                caption: "Delete f2",
                change: sys => sys.deleteFile("/a/b/f2.ts"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, file2, ts.tscWatch.libFile, configFile]);
        },
        changes: [
            {
                caption: "Delete config file",
                change: sys => sys.deleteFile(configFilePath),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, ts.tscWatch.libFile, corruptedConfig]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "correctly handles changes in lib section of config file",
        commandLineArgs: ["-w", "-p", "/src/tsconfig.json"],
        sys: () => {
            const libES5 = {
                path: "/compiler/lib.es5.d.ts",
                content: `${ts.tscWatch.libFile.content}
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
            return ts.tscWatch.createWatchedSystem([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
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
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([f, config, ts.tscWatch.libFile]);
        },
        changes: ts.emptyArray
    });

    function runQueuedTimeoutCallbacksTwice(sys: ts.tscWatch.WatchedSystem) {
        sys.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
        sys.runQueuedTimeoutCallbacks(); // Actual update
    }

    const changeModuleFileToModuleFile1: ts.tscWatch.TscWatchCompileChange = {
        caption: "Rename moduleFile to moduleFile1",
        change: sys => {
            sys.renameFile("/a/b/moduleFile.ts", "/a/b/moduleFile1.ts");
            sys.deleteFile("/a/b/moduleFile.js");
        },
        timeouts: runQueuedTimeoutCallbacksTwice
    };
    const changeModuleFile1ToModuleFile: ts.tscWatch.TscWatchCompileChange = {
        caption: "Rename moduleFile1 back to moduleFile",
        change: sys => sys.renameFile("/a/b/moduleFile1.ts", "/a/b/moduleFile.ts"),
        timeouts: runQueuedTimeoutCallbacksTwice,
    };

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([moduleFile, file1, ts.tscWatch.libFile]);
        },
        changes: [
            changeModuleFileToModuleFile1,
            changeModuleFile1ToModuleFile
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([moduleFile, file1, configFile, ts.tscWatch.libFile]);
        },
        changes: [
            changeModuleFileToModuleFile1,
            changeModuleFile1ToModuleFile
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([f1, config, node, cwd, ts.tscWatch.libFile], { currentDirectory: cwd.path });
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "add the missing module file for inferred project-should remove the module not found error",
        commandLineArgs: ["-w", "/a/b/file1.ts"],
        sys: () => {
            const file1 = {
                path: "/a/b/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();'
            };
            return ts.tscWatch.createWatchedSystem([file1, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Create module file",
                change: sys => sys.writeFile("/a/b/moduleFile.ts", "export function bar() { }"),
                timeouts: runQueuedTimeoutCallbacksTwice,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file, configFile, ts.tscWatch.libFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file, configFile, ts.tscWatch.libFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "Reports errors when the config file changes",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            return ts.tscWatch.createWatchedSystem([file, configFile, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "change config file to add error",
                change: sys => sys.writeFile(configFilePath, `{
                        "compilerOptions": {
                            "haha": 123
                        }
                    }`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: "change config file to remove error",
                change: sys => sys.writeFile(configFilePath, `{
                        "compilerOptions": {
                        }
                    }`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file1, configFile, ts.tscWatch.libFile]);
        },
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([f, config, t1, t2, ts.tscWatch.libFile], { currentDirectory: ts.getDirectoryPath(f.path) });
        },
        changes: ts.emptyArray
    });

    it("should support files without extensions", () => {
        const f = {
            path: "/a/compile",
            content: "let x = 1"
        };
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem([f, ts.tscWatch.libFile]));
        const watch = ts.createWatchProgram(ts.tscWatch.createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [f.path],
            system: sys,
            options: { allowNonTsExtensions: true },
            cb,
            watchOptions: undefined
        }));
        ts.tscWatch.runWatchBaseline({
            scenario,
            subScenario: "should support files without extensions",
            commandLineArgs: ["--w", f.path],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: ts.emptyArray,
            watchOrSolution: watch
        });
    });

    ts.tscWatch.verifyTscWatch({
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
            return ts.tscWatch.createWatchedSystem([file, ts.tscWatch.libFile, configFile]);
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
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ]
    });

    describe("should not trigger recompilation because of program emit", () => {
        function verifyWithOptions(subScenario: string, options: ts.CompilerOptions) {
            ts.tscWatch.verifyTscWatch({
                scenario,
                subScenario: `should not trigger recompilation because of program emit/${subScenario}`,
                commandLineArgs: ["-w", "-p", `${ts.tscWatch.projectRoot}/tsconfig.json`],
                sys: () => {
                    const file1: ts.tscWatch.File = {
                        path: `${ts.tscWatch.projectRoot}/file1.ts`,
                        content: "export const c = 30;"
                    };
                    const file2: ts.tscWatch.File = {
                        path: `${ts.tscWatch.projectRoot}/src/file2.ts`,
                        content: `import {c} from "file1"; export const d = 30;`
                    };
                    const tsconfig: ts.tscWatch.File = {
                        path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                        content: JSON.stringify({
                            compilerOptions: ts.compilerOptionsToConfigJson(options)
                        })
                    };
                    return ts.tscWatch.createWatchedSystem([file1, file2, ts.tscWatch.libFile, tsconfig], { currentDirectory: ts.tscWatch.projectRoot });
                },
                changes: [
                    ts.tscWatch.noopChange,
                    {
                        caption: "Add new file",
                        change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/src/file3.ts`, `export const y = 10;`),
                        timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2), // To update program and failed lookups
                    },
                    ts.tscWatch.noopChange,
                ]
            });
        }

        verifyWithOptions(
            "without outDir or outFile is specified",
            { module: ts.ModuleKind.AMD }
        );

        verifyWithOptions(
            "with outFile",
            { module: ts.ModuleKind.AMD, outFile: "build/outFile.js" }
        );

        verifyWithOptions(
            "when outDir is specified",
            { module: ts.ModuleKind.AMD, outDir: "build" }
        );

        verifyWithOptions(
            "without outDir or outFile is specified with declaration enabled",
            { module: ts.ModuleKind.AMD, declaration: true }
        );

        verifyWithOptions(
            "when outDir and declarationDir is specified",
            { module: ts.ModuleKind.AMD, outDir: "build", declaration: true, declarationDir: "decls" }
        );

        verifyWithOptions(
            "declarationDir is specified",
            { module: ts.ModuleKind.AMD, declaration: true, declarationDir: "decls" }
        );
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "shouldnt report error about unused function incorrectly when file changes from global to module",
        commandLineArgs: ["-w", "/a/b/file.ts", "--noUnusedLocals"],
        sys: () => {
            const file: ts.tscWatch.File = {
                path: "/a/b/file.ts",
                content: `function one() {}
function two() {
    return function three() {
        one();
    }
}`
            };
            return ts.tscWatch.createWatchedSystem([file, ts.tscWatch.libFile]);
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
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,

            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "watched files when file is deleted and new file is added as part of change",
        commandLineArgs: ["-w", "-p", "/home/username/project/tsconfig.json"],
        sys: () => {
            const projectLocation = "/home/username/project";
            const file: ts.tscWatch.File = {
                path: `${projectLocation}/src/file1.ts`,
                content: "var a = 10;"
            };
            const configFile: ts.tscWatch.File = {
                path: `${projectLocation}/tsconfig.json`,
                content: "{}"
            };
            return ts.tscWatch.createWatchedSystem([file, ts.tscWatch.libFile, configFile]);
        },
        changes: [
            {
                caption: "Rename file1 to file2",
                change: sys => sys.renameFile("/home/username/project/src/file1.ts", "/home/username/project/src/file2.ts"),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ]
    });

    function changeParameterTypeOfBFile(parameterName: string, toType: string): ts.tscWatch.TscWatchCompileChange {
        return {
            caption: `Changed ${parameterName} type to ${toType}`,
            change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/b.ts`, new RegExp(`${parameterName}\: [a-z]*`), `${parameterName}: ${toType}`),
            timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
        };
    }

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates errors correctly when declaration emit is disabled in compiler options",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `import test from './b';
test(4, 5);`
            };
            const bFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/b.ts`,
                content: `function test(x: number, y: number) {
    return x + y / 5;
}
export default test;`
            };
            const tsconfigFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "commonjs",
                        noEmit: true,
                        strict: true,
                    }
                })
            };
            return ts.tscWatch.createWatchedSystem([aFile, bFile, ts.tscWatch.libFile, tsconfigFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            changeParameterTypeOfBFile("x", "string"),
            changeParameterTypeOfBFile("x", "number"),
            changeParameterTypeOfBFile("y", "string"),
            changeParameterTypeOfBFile("y", "number"),
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates errors when strictNullChecks changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `declare function foo(): null | { hello: any };
foo().hello`
            };
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: {} })
            };
            return ts.tscWatch.createWatchedSystem([aFile, config, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Enable strict null checks",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { strictNullChecks: true } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: "Set always strict false",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { strict: true, alwaysStrict: false } })), // Avoid changing 'alwaysStrict' or must re-bind
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: "Disable strict",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: {} })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates errors when noErrorTruncation changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
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
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: {} })
            };
            return ts.tscWatch.createWatchedSystem([aFile, config, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Enable noErrorTruncation",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { noErrorTruncation: true } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates diagnostics and emit when useDefineForClassFields changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `/a.ts`,
                content: `class C { get prop() { return 1; } }
class D extends C { prop = 1; }`
            };
            const config: ts.tscWatch.File = {
                path: `/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { target: "es6" } })
            };
            return ts.tscWatch.createWatchedSystem([aFile, config, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Enable useDefineForClassFields",
                change: sys => sys.writeFile(`/tsconfig.json`, JSON.stringify({ compilerOptions: { target: "es6", useDefineForClassFields: true } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates errors and emit when importsNotUsedAsValues changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `export class C {}`
            };
            const bFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/b.ts`,
                content: `import {C} from './a';
export function f(p: C) { return p; }`
            };
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: {} })
            };
            return ts.tscWatch.createWatchedSystem([aFile, bFile, config, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: 'Set to "remove"',
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { importsNotUsedAsValues: "remove" } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: 'Set to "error"',
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { importsNotUsedAsValues: "error" } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: 'Set to "preserve"',
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { importsNotUsedAsValues: "preserve" } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });


    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates errors when forceConsistentCasingInFileNames changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `/a.ts`,
                content: `export class C {}`
            };
            const bFile: ts.tscWatch.File = {
                path: `/b.ts`,
                content: `import {C} from './a'; import * as A from './A';`
            };
            const config: ts.tscWatch.File = {
                path: `/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: {} })
            };
            return ts.tscWatch.createWatchedSystem([aFile, bFile, config, ts.tscWatch.libFile], { useCaseSensitiveFileNames: false });
        },
        changes: [
            {
                caption: "Enable forceConsistentCasingInFileNames",
                change: sys => sys.writeFile(`/tsconfig.json`, JSON.stringify({ compilerOptions: { forceConsistentCasingInFileNames: true } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates moduleResolution when resolveJsonModule changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `import * as data from './data.json'`
            };
            const jsonFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/data.json`,
                content: `{ "foo": 1 }`
            };
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { moduleResolution: "node" } })
            };
            return ts.tscWatch.createWatchedSystem([aFile, jsonFile, config, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Enable resolveJsonModule",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({ compilerOptions: { moduleResolution: "node", resolveJsonModule: true } })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates errors when ambient modules of program changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `declare module 'a' {
  type foo = number;
}`
            };
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            return ts.tscWatch.createWatchedSystem([aFile, config, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Create b.ts with same content",
                // Create bts with same file contents
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/b.ts`, `declare module 'a' {
  type foo = number;
}`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: "Delete b.ts",
                change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/b.ts`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    describe("updates errors in lib file", () => {
        const field = "fullscreen";
        const fieldWithoutReadonly = `interface Document {
    ${field}: boolean;
}`;

        const libFileWithDocument: ts.tscWatch.File = {
            path: ts.tscWatch.libFile.path,
            content: `${ts.tscWatch.libFile.content}
interface Document {
    readonly ${field}: boolean;
}`
        };

        function verifyLibFileErrorsWith(subScenario: string, aFile: ts.tscWatch.File) {
            function verifyLibErrors(subScenario: string, commandLineOptions: readonly string[]) {
                ts.tscWatch.verifyTscWatch({
                    scenario,
                    subScenario: `updates errors in lib file/${subScenario}`,
                    commandLineArgs: ["-w", aFile.path, ...commandLineOptions],
                    sys: () => ts.tscWatch.createWatchedSystem([aFile, libFileWithDocument], { currentDirectory: ts.tscWatch.projectRoot }),
                    changes: [
                        {
                            caption: "Remove document declaration from file",
                            change: sys => sys.writeFile(aFile.path, aFile.content.replace(fieldWithoutReadonly, "var x: string;")),
                            timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                        },
                        {
                            caption: "Rever the file to contain document declaration",
                            change: sys => sys.writeFile(aFile.path, aFile.content),
                            timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
                        },
                    ]
                });
            }

            verifyLibErrors(`${subScenario}/with default options`, ts.emptyArray);
            verifyLibErrors(`${subScenario}/with skipLibCheck`, ["--skipLibCheck"]);
            verifyLibErrors(`${subScenario}/with skipDefaultLibCheck`, ["--skipDefaultLibCheck"]);
        }

        describe("when non module file changes", () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `${fieldWithoutReadonly}
var y: number;`
            };
            verifyLibFileErrorsWith("when non module file changes", aFile);
        });

        describe("when module file with global definitions changes", () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `export {}
declare global {
${fieldWithoutReadonly}
var y: number;
}`
            };
            verifyLibFileErrorsWith("when module file with global definitions changes", aFile);
        });
    });

    function changeWhenLibCheckChanges(compilerOptions: ts.CompilerOptions): ts.tscWatch.TscWatchCompileChange {
        const configFileContent = JSON.stringify({ compilerOptions });
        return {
            caption: `Changing config to ${configFileContent}`,
            change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, configFileContent),
            timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
        };
    }

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "when skipLibCheck and skipDefaultLibCheck changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const field = "fullscreen";
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `interface Document {
    ${field}: boolean;
}`
            };
            const bFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/b.d.ts`,
                content: `interface Document {
    ${field}: boolean;
}`
            };
            const libFileWithDocument: ts.tscWatch.File = {
                path: ts.tscWatch.libFile.path,
                content: `${ts.tscWatch.libFile.content}
interface Document {
    readonly ${field}: boolean;
}`
            };
            const configFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: "{}"
            };
            return ts.tscWatch.createWatchedSystem([aFile, bFile, configFile, libFileWithDocument], { currentDirectory: ts.tscWatch.projectRoot });
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

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "reports errors correctly with isolatedModules",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `export const a: string = "";`
            };
            const bFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/b.ts`,
                content: `import { a } from "./a";
const b: string = a;`
            };
            const configFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        isolatedModules: true
                    }
                })
            };
            return ts.tscWatch.createWatchedSystem([aFile, bFile, configFile, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Change shape of a",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/a.ts`, `export const a: number = 1`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "reports errors correctly with file not in rootDir",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: `import { x } from "../b";`
            };
            const bFile: ts.tscWatch.File = {
                path: `/user/username/projects/b.ts`,
                content: `export const x = 10;`
            };
            const configFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        rootDir: ".",
                        outDir: "lib"
                    }
                })
            };
            return ts.tscWatch.createWatchedSystem([aFile, bFile, configFile, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Make changes to file a",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/a.ts`, `

import { x } from "../b";`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "updates emit on jsx option change",
        commandLineArgs: ["-w"],
        sys: () => {
            const index: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/index.tsx`,
                content: `declare var React: any;\nconst d = <div />;`
            };
            const configFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        jsx: "preserve"
                    }
                })
            };
            return ts.tscWatch.createWatchedSystem([index, configFile, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Update 'jsx' to 'react'",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, '{ "compilerOptions": { "jsx": "react" } }'),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "extended source files are watched",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const firstExtendedConfigFile: ts.tscWatch.File = {
                path: "/a/b/first.tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        strict: true
                    }
                })
            };
            const secondExtendedConfigFile: ts.tscWatch.File = {
                path: "/a/b/second.tsconfig.json",
                content: JSON.stringify({
                    extends: "./first.tsconfig.json"
                })
            };
            const configFile: ts.tscWatch.File = {
                path: configFilePath,
                content: JSON.stringify({
                    compilerOptions: {},
                    files: [ts.tscWatch.commonFile1.path, ts.tscWatch.commonFile2.path]
                })
            };
            return ts.tscWatch.createWatchedSystem([
                ts.tscWatch.libFile, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2, configFile, firstExtendedConfigFile, secondExtendedConfigFile
            ]);
        },
        changes: [
            {
                caption: "Change config to extend another config",
                change: sys => sys.modifyFile(configFilePath, JSON.stringify({
                    extends: "./second.tsconfig.json",
                    compilerOptions: {},
                    files: [ts.tscWatch.commonFile1.path, ts.tscWatch.commonFile2.path]
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Change first extended config",
                change: sys => sys.modifyFile("/a/b/first.tsconfig.json", JSON.stringify({
                    compilerOptions: {
                        strict: false,
                    }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Change second extended config",
                change: sys => sys.modifyFile("/a/b/second.tsconfig.json", JSON.stringify({
                    extends: "./first.tsconfig.json",
                    compilerOptions: {
                        strictNullChecks: true,
                    }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Change config to stop extending another config",
                change: sys => sys.modifyFile(configFilePath, JSON.stringify({
                    compilerOptions: {},
                    files: [ts.tscWatch.commonFile1.path, ts.tscWatch.commonFile2.path]
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "when creating new file in symlinked folder",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/client/folder1/module1.ts`,
                content: `export class Module1Class { }`
            };
            const module2: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/folder2/module2.ts`,
                content: `import * as M from "folder1/module1";`
            };
            const symlink: ts.tscWatch.SymLink = {
                path: `${ts.tscWatch.projectRoot}/client/linktofolder2`,
                symLink: `${ts.tscWatch.projectRoot}/folder2`,
            };
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        baseUrl: "client",
                        paths: { "*": ["*"] },
                    },
                    include: ["client/**/*", "folder2"]
                })
            };
            return ts.tscWatch.createWatchedSystem([module1, module2, symlink, config, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Add module3 to folder2",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/client/linktofolder2/module3.ts`, `import * as M from "folder1/module1";`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "when new file is added to the referenced project",
        commandLineArgs: ["-w", "-p", `${ts.tscWatch.projectRoot}/projects/project2/tsconfig.json`, "--extendedDiagnostics"],
        sys: () => {
            const config1: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/projects/project1/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "none",
                        composite: true
                    },
                    exclude: ["temp"]
                })
            };
            const class1: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/projects/project1/class1.ts`,
                content: `class class1 {}`
            };
            // Built file
            const class1Dt: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/projects/project1/class1.d.ts`,
                content: `declare class class1 {}`
            };
            const config2: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/projects/project2/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "none",
                        composite: true
                    },
                    references: [
                        { path: "../project1" }
                    ]
                })
            };
            const class2: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/projects/project2/class2.ts`,
                content: `class class2 {}`
            };
            return ts.tscWatch.createWatchedSystem([config1, class1, config2, class2, ts.tscWatch.libFile, class1Dt]);
        },
        changes: [
            {
                caption: "Add class3 to project1",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.ts`, `class class3 {}`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Add output of class3",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Add excluded file to project1",
                change: sys => sys.ensureFileOrFolder({ path: `${ts.tscWatch.projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                timeouts: sys => sys.checkTimeoutQueueLength(0),
            },
            {
                caption: "Delete output of class3",
                change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.d.ts`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Add output of class3",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "when creating extensionless file",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/index.ts`,
                content: ``
            };
            const config: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: `{}`
            };
            return ts.tscWatch.createWatchedSystem([module1, config, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Create foo in project root",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/foo`, ``),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
        ]
    });
});
