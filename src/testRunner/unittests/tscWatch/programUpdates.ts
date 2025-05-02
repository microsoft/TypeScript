import { Baseline } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    commandLineCallbacks,
    createBaseline,
} from "../helpers/baseline.js";
import {
    compilerOptionsToConfigJson,
    getTypeScriptLibTestLocation,
} from "../helpers/contents.js";
import {
    createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline,
    noopChange,
    runWatchBaseline,
    TscWatchCompileChange,
    verifyTscWatch,
    watchBaseline,
} from "../helpers/tscWatch.js";
import {
    File,
    libFile,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: programUpdates::", () => {
    const scenario = "programUpdates";
    const configFilePath = "/user/username/workspace/solution/projects/project/tsconfig.json";
    const configFile: File = {
        path: configFilePath,
        content: `{}`,
    };
    const commonFile1: File = {
        path: "/user/username/workspace/solution/projects/project/commonFile1.ts",
        content: "let x = 1",
    };
    const commonFile2: File = {
        path: "/user/username/workspace/solution/projects/project/commonFile2.ts",
        content: "let y = 1",
    };
    verifyTscWatch({
        scenario,
        subScenario: "create watch without config file",
        commandLineArgs: ["-w", "/user/username/workspace/solution/projects/project/c/app.ts"],
        sys: () => {
            const appFile: File = {
                path: "/user/username/workspace/solution/projects/project/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `,
            };

            const moduleFile: File = {
                path: "/user/username/workspace/solution/projects/project/c/module.d.ts",
                content: `export let x: number`,
            };
            return TestServerHost.createWatchedSystem(
                [appFile, moduleFile],
                { currentDirectory: "/user/username/workspace/solution/projects/project" },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "can handle tsconfig file name with difference casing",
        commandLineArgs: ["-w", "-p", "/user/username/workspace/solution/PROJECTS/PROJECT/tsconfig.json"],
        sys: () => {
            const f1 = {
                path: "/user/username/workspace/solution/projects/project/app.ts",
                content: "let x = 1",
            };
            const config = {
                path: configFilePath,
                content: jsonToReadableText({
                    include: ["app.ts"],
                }),
            };
            return TestServerHost.createWatchedSystem(
                [f1, config],
                {
                    currentDirectory: "/user/username/workspace/solution",
                    useCaseSensitiveFileNames: false,
                },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "create configured project without file list",
        commandLineArgs: ["-w"],
        sys: () => {
            const configFile: File = {
                path: configFilePath,
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`,
            };
            const file1: File = {
                path: "/user/username/workspace/solution/projects/project/c/f1.ts",
                content: "let x = 1",
            };
            const file2: File = {
                path: "/user/username/workspace/solution/projects/project/d/f2.ts",
                content: "let y = 1",
            };
            const file3: File = {
                path: "/user/username/workspace/solution/projects/project/e/f3.ts",
                content: "let z = 1",
            };
            return TestServerHost.createWatchedSystem(
                [configFile, file1, file2, file3],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "add new files to a configured program without file list",
        commandLineArgs: ["-w"],
        sys: () =>
            TestServerHost.createWatchedSystem(
                [commonFile1, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            ),

        edits: [
            {
                caption: "Create commonFile2",
                edit: sys => sys.writeFile(commonFile2.path, commonFile2.content),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "should ignore non-existing files specified in the config file",
        commandLineArgs: ["-w"],
        sys: () => {
            const configFile: File = {
                path: configFilePath,
                content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`,
            };
            return TestServerHost.createWatchedSystem(
                [commonFile1, commonFile2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "handle recreated files correctly",
        commandLineArgs: ["-w", "--explainFiles"],
        sys: () => {
            return TestServerHost.createWatchedSystem(
                [commonFile1, commonFile2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "change file to ensure signatures are updated",
                edit: sys => sys.appendFile(commonFile2.path, ";let xy = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "delete file2",
                edit: sys => sys.deleteFile(commonFile2.path),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "recreate file2",
                edit: sys => sys.writeFile(commonFile2.path, commonFile2.content),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "handles the missing files - that were added to program because they were added with tripleSlashRefs",
        commandLineArgs: ["-w", "/user/username/workspace/solution/projects/project/commonFile1.ts"],
        sys: () => {
            const file1: File = {
                path: commonFile1.path,
                content: `/// <reference path="commonFile2.ts"/>
                    let x = y`,
            };
            return TestServerHost.createWatchedSystem(
                [file1],
                { currentDirectory: ts.getDirectoryPath(commonFile1.path) },
            );
        },
        edits: [
            {
                caption: "create file2",
                edit: sys => sys.writeFile(commonFile2.path, commonFile2.content),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "should reflect change in config file",
        commandLineArgs: ["-w", "--explainFiles"],
        sys: () => {
            const configFile: File = {
                path: configFilePath,
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`,
            };
            return TestServerHost.createWatchedSystem(
                [commonFile1, commonFile2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "change file to ensure signatures are updated",
                edit: sys => sys.appendFile(commonFile2.path, ";let xy = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Change config",
                edit: sys =>
                    sys.writeFile(
                        configFilePath,
                        `{
                        "compilerOptions": {},
                        "files": ["${commonFile1.path}"]
                    }`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "works correctly when config file is changed but its content havent",
        commandLineArgs: ["-w"],
        sys: () => {
            const configFile: File = {
                path: configFilePath,
                content: `{
                        "compilerOptions": {},
                        "files": ["${commonFile1.path}", "${commonFile2.path}"]
                    }`,
            };
            return TestServerHost.createWatchedSystem(
                [commonFile1, commonFile2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "Modify config without changing content",
                edit: sys =>
                    sys.modifyFile(
                        configFilePath,
                        `{
                        "compilerOptions": {},
                        "files": ["${commonFile1.path}", "${commonFile2.path}"]
                    }`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "Updates diagnostics when '--noUnusedLabels' changes",
        commandLineArgs: ["-w", "-p", "/user/username/workspace/solution/projects/project/tsconfig.json"],
        sys: () => {
            const aTs: File = {
                path: "/user/username/workspace/solution/projects/project/a.ts",
                content: "label: while (1) {}",
            };
            const tsconfig: File = {
                path: "/user/username/workspace/solution/projects/project/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: { allowUnusedLabels: true },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [aTs, tsconfig],
                { currentDirectory: "/user/username/workspace/solution/projects/project" },
            );
        },
        edits: [
            {
                caption: "Disable  allowUnsusedLabels",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { allowUnusedLabels: false },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Enable  allowUnsusedLabels",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { allowUnusedLabels: true },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "Updates diagnostics when '--allowArbitraryExtensions' changes",
        commandLineArgs: ["-w", "-p", "/user/username/workspace/solution/projects/project/tsconfig.json"],
        sys: () => {
            const aTs: File = {
                path: "/user/username/workspace/solution/projects/project/a.ts",
                content: "import {} from './b.css'",
            };
            const bCssTs: File = {
                path: "/user/username/workspace/solution/projects/project/b.d.css.ts",
                content: "declare const style: string;",
            };
            const tsconfig: File = {
                path: "/user/username/workspace/solution/projects/project/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: { allowArbitraryExtensions: true },
                    files: ["a.ts"],
                }),
            };
            return TestServerHost.createWatchedSystem(
                [aTs, bCssTs, tsconfig],
                { currentDirectory: "/user/username/workspace/solution/projects/project" },
            );
        },
        edits: [
            {
                caption: "Disable  allowArbitraryExtensions",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { allowArbitraryExtensions: false },
                            files: ["a.ts"],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Enable  allowArbitraryExtensions",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { allowArbitraryExtensions: true },
                            files: ["a.ts"],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates diagnostics and emit for decorators",
        commandLineArgs: ["-w"],
        sys: () => {
            const aTs: File = {
                path: "/user/username/workspace/solution/projects/project/a.ts",
                content: `import {B} from './b'
@((_) => {})
export class A {
    constructor(p: B) {}
}`,
            };
            const bTs: File = {
                path: "/user/username/workspace/solution/projects/project/b.ts",
                content: `export class B {}`,
            };
            const tsconfig: File = {
                path: "/user/username/workspace/solution/projects/project/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: { target: "es6", verbatimModuleSyntax: true },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [aTs, bTs, tsconfig],
                { currentDirectory: "/user/username/workspace/solution/projects/project" },
            );
        },
        edits: [
            {
                caption: "Enable experimentalDecorators",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { target: "es6", verbatimModuleSyntax: true, experimentalDecorators: true },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Enable emitDecoratorMetadata",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { target: "es6", verbatimModuleSyntax: true, experimentalDecorators: true, emitDecoratorMetadata: true },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
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
                    "exclude": ["/user/username/workspace/solution/projects/projectc"]
                }`,
            };
            const excludedFile1: File = {
                path: "/user/username/workspace/solution/projects/projectc/excluedFile1.ts",
                content: `let t = 1;`,
            };
            return TestServerHost.createWatchedSystem(
                [commonFile1, commonFile2, excludedFile1, configFile],
                { currentDirectory: "/user/username/workspace/solution/projects" },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "should properly handle module resolution changes in config file",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const file1: File = {
                path: "/user/username/workspace/solution/projects/project/file1.ts",
                content: `import { T } from "module1";`,
            };
            const nodeModuleFile: File = {
                path: "/user/username/workspace/solution/projects/project/node_modules/module1.ts",
                content: `export interface T {}`,
            };
            const classicModuleFile: File = {
                path: "/user/username/workspace/solution/projects/module1.ts",
                content: `export interface T {}`,
            };
            const configFile: File = {
                path: configFilePath,
                content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`,
            };
            return TestServerHost.createWatchedSystem(
                [file1, nodeModuleFile, classicModuleFile, configFile],
                { currentDirectory: "/user/username/workspace/solution/projects" },
            );
        },
        edits: [
            {
                caption: "Change module resolution to classic",
                edit: sys =>
                    sys.writeFile(
                        configFile.path,
                        `{
                        "compilerOptions": {
                            "moduleResolution": "classic"
                        },
                        "files": ["/user/username/workspace/solution/projects/project/file1.ts"]
                    }`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "should tolerate config file errors and still try to build a project",
        commandLineArgs: ["-w"],
        sys: () => {
            const configFile: File = {
                path: configFilePath,
                content: `{
                        "compilerOptions": {
                            "module": "none",
                            "allowAnything": true
                        },
                        "someOtherProperty": {}
                    }`,
            };
            return TestServerHost.createWatchedSystem(
                [commonFile1, commonFile2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "changes in files are reflected in project structure",
        commandLineArgs: ["-w", "/user/username/workspace/solution/projects/project/f1.ts", "--explainFiles"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: `export * from "./f2"`,
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/project/f2.ts",
                content: `export let x = 1`,
            };
            const file3 = {
                path: "/user/username/workspace/solution/projects/projectc/f3.ts",
                content: `export let y = 1;`,
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, file3],
                { currentDirectory: "/user/username/workspace/solution/projects" },
            );
        },
        edits: [
            {
                caption: "Modify f2 to include f3",
                // now inferred project should inclule file3
                edit: sys => sys.modifyFile("/user/username/workspace/solution/projects/project/f2.ts", `export * from "../projectc/f3"`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "deleted files affect project structure",
        commandLineArgs: ["-w", "/user/username/workspace/solution/projects/project/f1.ts", "--noImplicitAny"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: `export * from "./f2"`,
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/project/f2.ts",
                content: `export * from "../projectc/f3"`,
            };
            const file3 = {
                path: "/user/username/workspace/solution/projects/projectc/f3.ts",
                content: `export let y = 1;`,
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, file3],
                { currentDirectory: "/user/username/workspace/solution/projects" },
            );
        },
        edits: [
            {
                caption: "Delete f2",
                edit: sys => sys.deleteFile("/user/username/workspace/solution/projects/project/f2.ts"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "deleted files affect project structure-2",
        commandLineArgs: ["-w", "/user/username/workspace/solution/projects/project/f1.ts", "/user/username/workspace/solution/projects/projectc/f3.ts", "--noImplicitAny"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: `export * from "./f2"`,
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/project/f2.ts",
                content: `export * from "../projectc/f3"`,
            };
            const file3 = {
                path: "/user/username/workspace/solution/projects/projectc/f3.ts",
                content: `export let y = 1;`,
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, file3],
                { currentDirectory: "/user/username/workspace/solution/projects" },
            );
        },
        edits: [
            {
                caption: "Delete f2",
                edit: sys => sys.deleteFile("/user/username/workspace/solution/projects/project/f2.ts"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "config file includes the file",
        commandLineArgs: ["-w", "-p", "/user/username/workspace/solution/projects/projectc/tsconfig.json"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: "export let x = 5",
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/projectc/f2.ts",
                content: `import {x} from "../project/f1"`,
            };
            const file3 = {
                path: "/user/username/workspace/solution/projects/projectc/f3.ts",
                content: "export let y = 1",
            };
            const configFile = {
                path: "/user/username/workspace/solution/projects/projectc/tsconfig.json",
                content: jsonToReadableText({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] }),
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, file3, configFile],
                { currentDirectory: "/user/username/workspace/solution/projects" },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "change module to none",
        commandLineArgs: ["-w"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: "export {}\ndeclare global {}",
            };
            return TestServerHost.createWatchedSystem(
                [file1, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [{
            caption: "change `module` to 'none'",
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            edit: sys => {
                sys.writeFile(configFilePath, jsonToReadableText({ compilerOptions: { module: "none" } }));
            },
        }],
    });

    it("two watch programs are not affected by each other", () => {
        const file1 = {
            path: "/user/username/workspace/solution/projects/project/f1.ts",
            content: `
                export * from "../projectc/f2";
                export * from "../projectd/f3";`,
        };
        const file2 = {
            path: "/user/username/workspace/solution/projects/projectc/f2.ts",
            content: "export let x = 1;",
        };
        const file3 = {
            path: "/user/username/workspace/solution/projects/projectd/f3.ts",
            content: "export let y = 1;",
        };
        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [file1, file2, file3],
            { currentDirectory: "/user/username/workspace/solution/projects" },
        ));
        const host = createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [file2.path, file3.path],
            system: sys,
            options: { allowNonTsExtensions: true },
            cb,
            watchOptions: undefined,
        });
        ts.createWatchProgram(host);
        baseline.push(`${sys.getExecutingFilePath()} --w ${file2.path} ${file3.path}`);
        watchBaseline({
            baseline,
            getPrograms,
            oldPrograms: ts.emptyArray,
            sys,
        });

        const { cb: cb2, getPrograms: getPrograms2 } = commandLineCallbacks(sys);
        baseline.push("createing separate watcher");
        ts.createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [file1.path],
            system: sys,
            options: { allowNonTsExtensions: true },
            cb: cb2,
            watchOptions: undefined,
        }));
        watchBaseline({
            baseline,
            getPrograms: getPrograms2,
            oldPrograms: ts.emptyArray,
            sys,
        });

        baseline.push(`First program is not updated:: ${getPrograms() === ts.emptyArray}`);
        baseline.push(`Second program is not updated:: ${getPrograms2() === ts.emptyArray}`);
        Baseline.runBaseline(`tscWatch/${scenario}/two-watch-programs-are-not-affected-by-each-other.js`, baseline.join("\r\n"));
    });

    verifyTscWatch({
        scenario,
        subScenario: "can correctly update configured project when set of root files has changed (new file on disk)",
        commandLineArgs: ["-w"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: "let x = 1",
            };
            return TestServerHost.createWatchedSystem(
                [file1, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "Write f2",
                edit: sys => sys.writeFile("/user/username/workspace/solution/projects/project/f2.ts", "let y = 1"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "can correctly update configured project when set of root files has changed (new file in list of files)",
        commandLineArgs: ["-w"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: "let x = 1",
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/project/f2.ts",
                content: "let y = 1",
            };
            const configFile = {
                path: configFilePath,
                content: jsonToReadableText({ compilerOptions: {}, files: ["f1.ts"] }),
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "Modify config to make f2 as root too",
                edit: sys => sys.writeFile(configFilePath, jsonToReadableText({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "correctly parses wild card directories from implicit glob when two keys differ only in directory seperator",
        commandLineArgs: ["-w", "--extendedDiagnostics"],
        sys: () => {
            const file1 = {
                path: `/user/username/projects/myproject/f1.ts`,
                content: "export const x = 1",
            };
            const file2 = {
                path: `/user/username/projects/myproject/f2.ts`,
                content: "export const y = 1",
            };
            const configFile = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { composite: true }, include: ["./", "./**/*.json"] }),
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, configFile],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Add new file",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/new-file.ts`, "export const z = 1;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Import new file",
                edit: sys => sys.prependFile(`/user/username/projects/myproject/f1.ts`, `import { z } from "./new-file";`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "can correctly update configured project when set of root files has changed through include",
        commandLineArgs: ["-w", "-p", "."],
        sys: () => {
            const file1 = {
                path: `/user/username/projects/myproject/Project/file1.ts`,
                content: "export const x = 10;",
            };
            const configFile = {
                path: `/user/username/projects/myproject/Project/tsconfig.json`,
                content: jsonToReadableText({ include: [".", "./**/*.json"] }),
            };
            return TestServerHost.createWatchedSystem(
                [file1, configFile],
                { currentDirectory: `/user/username/projects/myproject/Project` },
            );
        },
        edits: [
            {
                caption: "Write file2",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/Project/file2.ts`, "export const y = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "can update configured project when set of root files was not changed",
        commandLineArgs: ["-w"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: "let x = 1",
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/project/f2.ts",
                content: "let y = 1",
            };
            const configFile = {
                path: configFilePath,
                content: jsonToReadableText({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] }),
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "Modify config to set outFile option",
                edit: sys => sys.writeFile(configFilePath, jsonToReadableText({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "file in files is deleted",
        commandLineArgs: ["-w"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: "let x = 1",
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/project/f2.ts",
                content: "let y = 1",
            };
            const configFile = {
                path: configFilePath,
                content: jsonToReadableText({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] }),
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "Delete f2",
                edit: sys => sys.deleteFile("/user/username/workspace/solution/projects/project/f2.ts"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "config file is deleted",
        commandLineArgs: ["-w"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/f1.ts",
                content: "let x = 1;",
            };
            const file2 = {
                path: "/user/username/workspace/solution/projects/project/f2.ts",
                content: "let y = 2;",
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "Delete config file",
                edit: sys => sys.deleteFile(configFilePath),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "Proper errors document is not contained in project",
        commandLineArgs: ["-w"],
        sys: () => {
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/app.ts",
                content: "",
            };
            const corruptedConfig = {
                path: configFilePath,
                content: "{",
            };
            return TestServerHost.createWatchedSystem(
                [file1, corruptedConfig],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "correctly handles changes in lib section of config file",
        commandLineArgs: ["-w"],
        sys: () => {
            const libES5 = {
                path: getTypeScriptLibTestLocation("es5"),
                content: `${libFile.content}
declare const eval: any`,
            };
            const libES2015Promise = {
                path: getTypeScriptLibTestLocation("es2015.promise"),
                content: `declare class Promise<T> {}`,
            };
            const app = {
                path: "/home/src/projects/project/app.ts",
                content: "var x: Promise<string>;",
            };
            const config1 = {
                path: "/home/src/projects/project/tsconfig.json",
                content: jsonToReadableText(
                    {
                        compilerOptions: {
                            module: "commonjs",
                            target: "es5",
                            noImplicitAny: true,
                            sourceMap: false,
                            lib: [
                                "es5",
                            ],
                        },
                    },
                ),
            };
            return TestServerHost.createWatchedSystem(
                [libES5, libES2015Promise, app, config1],
                { currentDirectory: "/home/src/projects/project" },
            );
        },
        edits: [
            {
                caption: "Change the lib in config",
                edit: sys =>
                    sys.writeFile(
                        "/home/src/projects/project/tsconfig.json",
                        jsonToReadableText(
                            {
                                compilerOptions: {
                                    module: "commonjs",
                                    target: "es5",
                                    noImplicitAny: true,
                                    sourceMap: false,
                                    lib: [
                                        "es5",
                                        "es2015.promise",
                                    ],
                                },
                            },
                        ),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "should handle non-existing directories in config file",
        commandLineArgs: ["-w", "-p", "/user/username/workspace/solution/projects/project/tsconfig.json"],
        sys: () => {
            const f = {
                path: "/user/username/workspace/solution/projects/project/src/app.ts",
                content: "let x = 1;",
            };
            const config = {
                path: "/user/username/workspace/solution/projects/project/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {},
                    include: [
                        "src/**/*",
                        "notexistingfolder/*",
                    ],
                }),
            };
            return TestServerHost.createWatchedSystem(
                [f, config],
                { currentDirectory: "/user/username/workspace/solution/projects/project" },
            );
        },
    });

    function runQueuedTimeoutCallbacksTwice(sys: TestServerHost) {
        sys.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
        sys.runQueuedTimeoutCallbacks(); // Actual update
    }

    const changeModuleFileToModuleFile1: TscWatchCompileChange = {
        caption: "Rename moduleFile to moduleFile1",
        edit: sys => {
            sys.renameFile("/users/username/projects/project/moduleFile.ts", "/users/username/projects/project/moduleFile1.ts");
            sys.deleteFile("/users/username/projects/project/moduleFile.js");
        },
        timeouts: runQueuedTimeoutCallbacksTwice,
    };
    const changeModuleFile1ToModuleFile: TscWatchCompileChange = {
        caption: "Rename moduleFile1 back to moduleFile",
        edit: sys => sys.renameFile("/users/username/projects/project/moduleFile1.ts", "/users/username/projects/project/moduleFile.ts"),
        timeouts: runQueuedTimeoutCallbacksTwice,
    };

    verifyTscWatch({
        scenario,
        subScenario: "rename a module file and rename back should restore the states for inferred projects",
        commandLineArgs: ["-w", "/users/username/projects/project/file1.ts"],
        sys: () => {
            const moduleFile = {
                path: "/users/username/projects/project/moduleFile.ts",
                content: "export function bar() { };",
            };
            const file1 = {
                path: "/users/username/projects/project/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();',
            };
            return TestServerHost.createWatchedSystem(
                [moduleFile, file1],
                { currentDirectory: "/users/username/projects/project" },
            );
        },
        edits: [
            changeModuleFileToModuleFile1,
            changeModuleFile1ToModuleFile,
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "rename a module file and rename back should restore the states for configured projects",
        commandLineArgs: ["-w", "-p", "/users/username/projects/project/tsconfig.json"],
        sys: () => {
            const moduleFile = {
                path: "/users/username/projects/project/moduleFile.ts",
                content: "export function bar() { };",
            };
            const file1 = {
                path: "/users/username/projects/project/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();',
            };
            const configFile = {
                path: "/users/username/projects/project/tsconfig.json",
                content: `{}`,
            };
            return TestServerHost.createWatchedSystem(
                [moduleFile, file1, configFile],
                { currentDirectory: "/users/username/projects/project" },
            );
        },
        edits: [
            changeModuleFileToModuleFile1,
            changeModuleFile1ToModuleFile,
        ],
    });

    describe("types from config file", () => {
        function verifyTypesLoad(includeTypeRoots: boolean) {
            verifyTscWatch({
                scenario,
                subScenario: includeTypeRoots ?
                    "types should not load from config file path if config exists but does not specifies typeRoots" :
                    "types should load from config file path if config exists",
                commandLineArgs: ["-w", "-p", configFilePath],
                sys: () => {
                    const f1 = {
                        path: "/user/username/workspace/solution/projects/project/app.ts",
                        content: "let x = 1",
                    };
                    const config = {
                        path: configFilePath,
                        content: jsonToReadableText({ compilerOptions: { types: ["node"], typeRoots: includeTypeRoots ? [] : undefined } }),
                    };
                    const node = {
                        path: "/user/username/workspace/solution/projects/project/node_modules/@types/node/index.d.ts",
                        content: "declare var process: any",
                    };
                    const cwd = {
                        path: "/user/username/workspace/solution/projects/projectc",
                    };
                    return TestServerHost.createWatchedSystem(
                        [f1, config, node, cwd],
                        { currentDirectory: cwd.path },
                    );
                },
            });
        }
        verifyTypesLoad(/*includeTypeRoots*/ false);
        verifyTypesLoad(/*includeTypeRoots*/ true);
    });

    verifyTscWatch({
        scenario,
        subScenario: "add the missing module file for inferred project-should remove the module not found error",
        commandLineArgs: ["-w", "/users/username/projects/project/file1.ts"],
        sys: () => {
            const file1 = {
                path: "/users/username/projects/project/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();',
            };
            return TestServerHost.createWatchedSystem(
                [file1],
                { currentDirectory: "/users/username/projects/project" },
            );
        },
        edits: [
            {
                caption: "Create module file",
                edit: sys => sys.writeFile("/users/username/projects/project/moduleFile.ts", "export function bar() { }"),
                timeouts: runQueuedTimeoutCallbacksTwice,
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "Configure file diagnostics events are generated when the config file has errors",
        commandLineArgs: ["-w"],
        sys: () => {
            const file = {
                path: "/user/username/workspace/solution/projects/project/app.ts",
                content: "let x = 10",
            };
            const configFile = {
                path: configFilePath,
                content: `{
                        "compilerOptions": {
                            "foo": "bar",
                            "allowJS": true
                        }
                    }`,
            };
            return TestServerHost.createWatchedSystem(
                [file, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "if config file doesnt have errors, they are not reported",
        commandLineArgs: ["-w"],
        sys: () => {
            const file = {
                path: "/user/username/workspace/solution/projects/project/app.ts",
                content: "let x = 10",
            };
            const configFile = {
                path: configFilePath,
                content: `{
                        "compilerOptions": {}
                    }`,
            };
            return TestServerHost.createWatchedSystem(
                [file, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "Reports errors when the config file changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const file = {
                path: "/user/username/workspace/solution/projects/project/app.ts",
                content: "let x = 10",
            };
            return TestServerHost.createWatchedSystem(
                [file, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "change config file to add error",
                edit: sys =>
                    sys.writeFile(
                        configFilePath,
                        `{
                        "compilerOptions": {
                            "haha": 123
                        }
                    }`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "change config file to remove error",
                edit: sys =>
                    sys.writeFile(
                        configFilePath,
                        `{
                        "compilerOptions": {
                        }
                    }`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "non-existing directories listed in config file input array should be tolerated without crashing the server",
        commandLineArgs: ["-w"],
        sys: () => {
            const configFile = {
                path: configFilePath,
                content: `{
                        "compilerOptions": {},
                        "include": ["app/*", "test/**/*", "something"]
                    }`,
            };
            const file1 = {
                path: "/user/username/workspace/solution/projects/project/file1.ts",
                content: "let t = 10;",
            };
            return TestServerHost.createWatchedSystem(
                [file1, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
    });

    verifyTscWatch({
        scenario,
        subScenario: "non-existing directories listed in config file input array should be able to handle @types if input file list is empty",
        commandLineArgs: ["-w", "-p", "/user/username/workspace/solution/projects/project/tsconfig.json"],
        sys: () => {
            const f = {
                path: "/user/username/workspace/solution/projects/project/app.ts",
                content: "let x = 1",
            };
            const config = {
                path: "/user/username/workspace/solution/projects/project/tsconfig.json",
                content: jsonToReadableText({
                    compiler: {},
                    files: [],
                }),
            };
            const t1 = {
                path: "/user/username/workspace/solution/projects/project/node_modules/@types/typings/index.d.ts",
                content: `export * from "./lib"`,
            };
            const t2 = {
                path: "/user/username/workspace/solution/projects/project/node_modules/@types/typings/lib.d.ts",
                content: `export const x: number`,
            };
            return TestServerHost.createWatchedSystem([f, config, t1, t2], { currentDirectory: ts.getDirectoryPath(f.path) });
        },
    });

    it("should support files without extensions", () => {
        const f = {
            path: "/user/username/workspace/solution/projects/project/compile",
            content: "let x = 1",
        };
        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [f],
            { currentDirectory: "/user/username/workspace/solution/projects/project" },
        ));
        const watch = ts.createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [f.path],
            system: sys,
            options: { allowNonTsExtensions: true },
            cb,
            watchOptions: undefined,
        }));
        runWatchBaseline({
            scenario,
            subScenario: "should support files without extensions",
            commandLineArgs: ["--w", f.path],
            sys,
            baseline,
            getPrograms,
            watchOrSolution: watch,
        });
    });

    verifyTscWatch({
        scenario,
        subScenario: "Options Diagnostic locations reported correctly with changes in configFile contents when options change",
        commandLineArgs: ["-w"],
        sys: () => {
            const file = {
                path: "/user/username/workspace/solution/projects/project/app.ts",
                content: "let x = 10",
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
}`,
            };
            return TestServerHost.createWatchedSystem(
                [file, configFile],
                { currentDirectory: ts.getDirectoryPath(configFilePath) },
            );
        },
        edits: [
            {
                caption: "Remove the comment from config file",
                edit: sys =>
                    sys.writeFile(
                        configFilePath,
                        `
{
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
}`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    describe("should not trigger recompilation because of program emit", () => {
        function verifyWithOptions(subScenario: string, options: ts.CompilerOptions) {
            verifyTscWatch({
                scenario,
                subScenario: `should not trigger recompilation because of program emit/${subScenario}`,
                commandLineArgs: ["-w", "-p", `/user/username/projects/myproject/tsconfig.json`],
                sys: () => {
                    const file1: File = {
                        path: `/user/username/projects/myproject/file1.ts`,
                        content: "export const c = 30;",
                    };
                    const file2: File = {
                        path: `/user/username/projects/myproject/src/file2.ts`,
                        content: `import {c} from "file1"; export const d = 30;`,
                    };
                    const tsconfig: File = {
                        path: `/user/username/projects/myproject/tsconfig.json`,
                        content: jsonToReadableText({
                            compilerOptions: compilerOptionsToConfigJson(options),
                        }),
                    };
                    return TestServerHost.createWatchedSystem(
                        [file1, file2, tsconfig],
                        { currentDirectory: "/user/username/projects/myproject" },
                    );
                },
                edits: [
                    noopChange,
                    {
                        caption: "Add new file",
                        edit: sys => sys.writeFile(`/user/username/projects/myproject/src/file3.ts`, `export const y = 10;`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(), // To update program and failed lookups
                    },
                    noopChange,
                ],
            });
        }

        verifyWithOptions(
            "without outDir or outFile is specified",
            { module: ts.ModuleKind.AMD },
        );

        verifyWithOptions(
            "with outFile",
            { module: ts.ModuleKind.AMD, outFile: "build/outFile.js" },
        );

        verifyWithOptions(
            "when outDir is specified",
            { module: ts.ModuleKind.AMD, outDir: "build" },
        );

        verifyWithOptions(
            "without outDir or outFile is specified with declaration enabled",
            { module: ts.ModuleKind.AMD, declaration: true },
        );

        verifyWithOptions(
            "when outDir and declarationDir is specified",
            { module: ts.ModuleKind.AMD, outDir: "build", declaration: true, declarationDir: "decls" },
        );

        verifyWithOptions(
            "declarationDir is specified",
            { module: ts.ModuleKind.AMD, declaration: true, declarationDir: "decls" },
        );
    });

    verifyTscWatch({
        scenario,
        subScenario: "shouldnt report error about unused function incorrectly when file changes from global to module",
        commandLineArgs: ["-w", "/user/username/workspace/solution/projects/project/file.ts", "--noUnusedLocals"],
        sys: () => {
            const file: File = {
                path: "/user/username/workspace/solution/projects/project/file.ts",
                content: `function one() {}
function two() {
    return function three() {
        one();
    }
}`,
            };
            return TestServerHost.createWatchedSystem(
                [file],
                { currentDirectory: "/user/username/workspace/solution/projects/project" },
            );
        },
        edits: [
            {
                caption: "Change file to module",
                edit: sys =>
                    sys.writeFile(
                        "/user/username/workspace/solution/projects/project/file.ts",
                        `function one() {}
export function two() {
    return function three() {
        one();
    }
}`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "watched files when file is deleted and new file is added as part of change",
        commandLineArgs: ["-w"],
        sys: () => {
            const projectLocation = "/home/username/workspaces/project";
            const file: File = {
                path: `${projectLocation}/src/file1.ts`,
                content: "var a = 10;",
            };
            const configFile: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: "{}",
            };
            return TestServerHost.createWatchedSystem(
                [file, configFile],
                { currentDirectory: projectLocation },
            );
        },
        edits: [
            {
                caption: "Rename file1 to file2",
                edit: sys => sys.renameFile("/home/username/workspaces/project/src/file1.ts", "/home/username/workspaces/project/src/file2.ts"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    function changeParameterTypeOfBFile(parameterName: string, toType: string): TscWatchCompileChange {
        return {
            caption: `Changed ${parameterName} type to ${toType}`,
            edit: sys => sys.replaceFileText(`/user/username/projects/myproject/b.ts`, new RegExp(`${parameterName}: [a-z]*`), `${parameterName}: ${toType}`),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        };
    }

    verifyTscWatch({
        scenario,
        subScenario: "updates errors correctly when declaration emit is disabled in compiler options",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `import test from './b';
test(4, 5);`,
            };
            const bFile: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `function test(x: number, y: number) {
    return x + y / 5;
}
export default test;`,
            };
            const tsconfigFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "commonjs",
                        noEmit: true,
                        strict: true,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, bFile, tsconfigFile],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            changeParameterTypeOfBFile("x", "string"),
            changeParameterTypeOfBFile("x", "number"),
            changeParameterTypeOfBFile("y", "string"),
            changeParameterTypeOfBFile("y", "number"),
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates errors when strictNullChecks changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `declare function foo(): null | { hello: any };
foo().hello`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: {} }),
            };
            return TestServerHost.createWatchedSystem([aFile, config], { currentDirectory: "/user/username/projects/myproject" });
        },
        edits: [
            {
                caption: "Enable strict null checks",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, jsonToReadableText({ compilerOptions: { strictNullChecks: true } })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Set always strict false",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, jsonToReadableText({ compilerOptions: { strict: true, alwaysStrict: false } })), // Avoid changing 'alwaysStrict' or must re-bind
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Disable strict",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, jsonToReadableText({ compilerOptions: {} })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates errors when noErrorTruncation changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `declare var v: {
    reallyLongPropertyName1: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName2: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName3: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName4: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName5: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName6: string | number | boolean | object | symbol | bigint;
    reallyLongPropertyName7: string | number | boolean | object | symbol | bigint;
};
v === 'foo';`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: {} }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Enable noErrorTruncation",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, jsonToReadableText({ compilerOptions: { noErrorTruncation: true } })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates diagnostics and emit when useDefineForClassFields changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/project/a.ts`,
                content: `class C { get prop() { return 1; } }
class D extends C { prop = 1; }`,
            };
            const config: File = {
                path: `/user/username/projects/project/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { target: "es6" } }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, config],
                { currentDirectory: "/user/username/projects/project" },
            );
        },
        edits: [
            {
                caption: "Enable useDefineForClassFields",
                edit: sys => sys.writeFile(`/user/username/projects/project/tsconfig.json`, jsonToReadableText({ compilerOptions: { target: "es6", useDefineForClassFields: true } })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates errors and emit when verbatimModuleSyntax changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `export class C {}`,
            };
            const bFile: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `import {C} from './a';
export function f(p: C) { return p; }`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: {} }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, bFile, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Enable verbatimModuleSyntax",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/tsconfig.json`,
                        jsonToReadableText({
                            compilerOptions: { verbatimModuleSyntax: true },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Disable verbatimModuleSyntax",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/tsconfig.json`,
                        jsonToReadableText({
                            compilerOptions: { verbatimModuleSyntax: false },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates errors when forceConsistentCasingInFileNames changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/project/a.ts`,
                content: `export class C {}`,
            };
            const bFile: File = {
                path: `/user/username/projects/project/b.ts`,
                content: `import {C} from './a'; import * as A from './A';`,
            };
            const config: File = {
                path: `/user/username/projects/project/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: false } }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, bFile, config],
                { useCaseSensitiveFileNames: false, currentDirectory: "/user/username/projects/project" },
            );
        },
        edits: [
            {
                caption: "Enable forceConsistentCasingInFileNames",
                edit: sys => sys.writeFile(`/user/username/projects/project/tsconfig.json`, jsonToReadableText({ compilerOptions: { forceConsistentCasingInFileNames: true } })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates moduleResolution when resolveJsonModule changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `import * as data from './data.json'`,
            };
            const jsonFile: File = {
                path: `/user/username/projects/myproject/data.json`,
                content: `{ "foo": 1 }`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { moduleResolution: "node" } }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, jsonFile, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Enable resolveJsonModule",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, jsonToReadableText({ compilerOptions: { moduleResolution: "node", resolveJsonModule: true } })),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates errors when ambient modules of program changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `declare module 'a' {
  type foo = number;
}`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: "{}",
            };
            return TestServerHost.createWatchedSystem(
                [aFile, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Create b.ts with same content",
                // Create bts with same file contents
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/b.ts`,
                        `declare module 'a' {
  type foo = number;
}`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Delete b.ts",
                edit: sys => sys.deleteFile(`/user/username/projects/myproject/b.ts`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
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
}`,
        };

        function verifyLibFileErrorsWith(subScenario: string, aFile: File) {
            function verifyLibErrors(subScenario: string, commandLineOptions: readonly string[]) {
                verifyTscWatch({
                    scenario,
                    subScenario: `updates errors in lib file/${subScenario}`,
                    commandLineArgs: ["-w", aFile.path, ...commandLineOptions],
                    sys: () =>
                        TestServerHost.createWatchedSystem(
                            [aFile, libFileWithDocument],
                            { currentDirectory: "/user/username/projects/myproject" },
                        ),
                    edits: [
                        {
                            caption: "Remove document declaration from file",
                            edit: sys => sys.writeFile(aFile.path, aFile.content.replace(fieldWithoutReadonly, "var x: string;")),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "Rever the file to contain document declaration",
                            edit: sys => sys.writeFile(aFile.path, aFile.content),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ],
                });
            }

            verifyLibErrors(`${subScenario}/with default options`, ts.emptyArray);
            verifyLibErrors(`${subScenario}/with skipLibCheck`, ["--skipLibCheck"]);
            verifyLibErrors(`${subScenario}/with skipDefaultLibCheck`, ["--skipDefaultLibCheck"]);
        }

        describe("when non module file changes", () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `${fieldWithoutReadonly}
var y: number;`,
            };
            verifyLibFileErrorsWith("when non module file changes", aFile);
        });

        describe("when module file with global definitions changes", () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `export {}
declare global {
${fieldWithoutReadonly}
var y: number;
}`,
            };
            verifyLibFileErrorsWith("when module file with global definitions changes", aFile);
        });
    });

    function changeWhenLibCheckChanges(compilerOptions: ts.CompilerOptions): TscWatchCompileChange {
        const configFileContent = jsonToReadableText({ compilerOptions });
        return {
            caption: `Changing config to ${configFileContent}`,
            edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, configFileContent),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        };
    }

    verifyTscWatch({
        scenario,
        subScenario: "when skipLibCheck and skipDefaultLibCheck changes",
        commandLineArgs: ["-w"],
        sys: () => {
            const field = "fullscreen";
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `interface Document {
    ${field}: boolean;
}`,
            };
            const bFile: File = {
                path: `/user/username/projects/myproject/b.d.ts`,
                content: `interface Document {
    ${field}: boolean;
}`,
            };
            const libFileWithDocument: File = {
                path: libFile.path,
                content: `${libFile.content}
interface Document {
    readonly ${field}: boolean;
}`,
            };
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: "{}",
            };
            return TestServerHost.createWatchedSystem(
                [aFile, bFile, configFile, libFileWithDocument],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            changeWhenLibCheckChanges({ skipLibCheck: true }),
            changeWhenLibCheckChanges({ skipDefaultLibCheck: true }),
            changeWhenLibCheckChanges({}),
            changeWhenLibCheckChanges({ skipDefaultLibCheck: true }),
            changeWhenLibCheckChanges({ skipLibCheck: true }),
            changeWhenLibCheckChanges({}),
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "reports errors correctly with isolatedModules",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `export const a: string = "";`,
            };
            const bFile: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `import { a } from "./a";
const b: string = a;`,
            };
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        isolatedModules: true,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, bFile, configFile],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Change shape of a",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/a.ts`, `export const a: number = 1`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "reports errors correctly with file not in rootDir",
        commandLineArgs: ["-w"],
        sys: () => {
            const aFile: File = {
                path: `/user/username/workspaces/projects/myproject/a.ts`,
                content: `import { x } from "../b";`,
            };
            const bFile: File = {
                path: `/user/username/workspaces/projects/b.ts`,
                content: `export const x = 10;`,
            };
            const configFile: File = {
                path: `/user/username/workspaces/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        rootDir: ".",
                        outDir: "lib",
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [aFile, bFile, configFile],
                { currentDirectory: "/user/username/workspaces/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Make changes to file a",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/workspaces/projects/myproject/a.ts`,
                        `

import { x } from "../b";`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates emit on jsx option change",
        commandLineArgs: ["-w"],
        sys: () => {
            const index: File = {
                path: `/user/username/projects/myproject/index.tsx`,
                content: `declare var React: any;\nconst d = <div />;`,
            };
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        jsx: "preserve",
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [index, configFile],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Update 'jsx' to 'react'",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, '{ "compilerOptions": { "jsx": "react" } }'),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "updates emit on jsx option add",
        commandLineArgs: ["-w"],
        sys: () => {
            const index: File = {
                path: `/user/username/projects/myproject/index.tsx`,
                content: `declare var React: any;\nconst d = <div />;`,
            };
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {},
                }),
            };
            return TestServerHost.createWatchedSystem(
                [index, configFile],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Update 'jsx' to 'preserve'",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/tsconfig.json`, '{ "compilerOptions": { "jsx": "preserve" } }'),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "extended source files are watched",
        commandLineArgs: ["-w", "-p", configFilePath],
        sys: () => {
            const firstExtendedConfigFile: File = {
                path: "/user/username/workspace/solution/projects/project/first.tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        strict: true,
                    },
                }),
            };
            const secondExtendedConfigFile: File = {
                path: "/user/username/workspace/solution/projects/project/second.tsconfig.json",
                content: jsonToReadableText({
                    extends: "./first.tsconfig.json",
                }),
            };
            const configFile: File = {
                path: configFilePath,
                content: jsonToReadableText({
                    compilerOptions: {},
                    files: [commonFile1.path, commonFile2.path],
                }),
            };
            return TestServerHost.createWatchedSystem([
                commonFile1,
                commonFile2,
                configFile,
                firstExtendedConfigFile,
                secondExtendedConfigFile,
            ], { currentDirectory: "/user/username/workspace/solution/projects" });
        },
        edits: [
            {
                caption: "Change config to extend another config",
                edit: sys =>
                    sys.modifyFile(
                        configFilePath,
                        jsonToReadableText({
                            extends: "./second.tsconfig.json",
                            compilerOptions: {},
                            files: [commonFile1.path, commonFile2.path],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Change first extended config",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/first.tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: {
                                strict: false,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Change second extended config",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/workspace/solution/projects/project/second.tsconfig.json",
                        jsonToReadableText({
                            extends: "./first.tsconfig.json",
                            compilerOptions: {
                                strictNullChecks: true,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Change config to stop extending another config",
                edit: sys =>
                    sys.modifyFile(
                        configFilePath,
                        jsonToReadableText({
                            compilerOptions: {},
                            files: [commonFile1.path, commonFile2.path],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when creating new file in symlinked folder",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: File = {
                path: `/user/username/projects/myproject/client/folder1/module1.ts`,
                content: `export class Module1Class { }`,
            };
            const module2: File = {
                path: `/user/username/projects/myproject/folder2/module2.ts`,
                content: `import * as M from "folder1/module1";`,
            };
            const symlink: SymLink = {
                path: `/user/username/projects/myproject/client/linktofolder2`,
                symLink: `/user/username/projects/myproject/folder2`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        baseUrl: "client",
                        paths: { "*": ["*"] },
                    },
                    include: ["client/**/*", "folder2"],
                }),
            };
            return TestServerHost.createWatchedSystem(
                [module1, module2, symlink, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Add module3 to folder2",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/client/linktofolder2/module3.ts`, `import * as M from "folder1/module1";`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when new file is added to the referenced project",
        commandLineArgs: ["-w", "-p", `project2/tsconfig.json`, "--extendedDiagnostics"],
        sys: () => {
            const config1: File = {
                path: `/user/username/projects/myproject/projects/project1/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                    exclude: ["temp"],
                }),
            };
            const class1: File = {
                path: `/user/username/projects/myproject/projects/project1/class1.ts`,
                content: `class class1 {}`,
            };
            // Built file
            const class1Dt: File = {
                path: `/user/username/projects/myproject/projects/project1/class1.d.ts`,
                content: `declare class class1 {}`,
            };
            const config2: File = {
                path: `/user/username/projects/myproject/projects/project2/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                    references: [
                        { path: "../project1" },
                    ],
                }),
            };
            const class2: File = {
                path: `/user/username/projects/myproject/projects/project2/class2.ts`,
                content: `class class2 {}`,
            };
            return TestServerHost.createWatchedSystem(
                [config1, class1, config2, class2, class1Dt],
                { currentDirectory: "/user/username/projects/myproject/projects" },
            );
        },
        edits: [
            {
                caption: "Add class3 to project1",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.ts`, `class class3 {}`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Add output of class3",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`, `declare class class3 {}`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Add excluded file to project1",
                edit: sys => sys.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                timeouts: ts.noop,
            },
            {
                caption: "Delete output of class3",
                edit: sys => sys.deleteFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Add output of class3",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`, `declare class class3 {}`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when creating extensionless file",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: File = {
                path: `/user/username/projects/myproject/index.ts`,
                content: ``,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: `{}`,
            };
            return TestServerHost.createWatchedSystem(
                [module1, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Create foo in project root",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/foo`, ``),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when changing `allowImportingTsExtensions` of config file",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: ``,
            };
            const module2: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `import "./a.ts";`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        noEmit: true,
                        allowImportingTsExtensions: false,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [module1, module2, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Change allowImportingTsExtensions to true",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/tsconfig.json`,
                        jsonToReadableText({
                            compilerOptions: {
                                noEmit: true,
                                allowImportingTsExtensions: true,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when changing `allowImportingTsExtensions` of config file 2",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `export const foo = 10;`,
            };
            const module2: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `export * as a from "./a.ts";`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        noEmit: true,
                        allowImportingTsExtensions: false,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [module1, module2, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Change allowImportingTsExtensions to true",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/tsconfig.json`,
                        jsonToReadableText({
                            compilerOptions: {
                                noEmit: true,
                                allowImportingTsExtensions: true,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when changing checkJs of config file",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: File = {
                path: `/user/username/projects/myproject/a.js`,
                content: `export const aNumber: number = "string"`,
            };
            const module2: File = {
                path: `/user/username/projects/myproject/b.ts`,
                content: `import { aNumber } from "./a.js";`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        checkJs: false,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [module1, module2, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Change checkJs to true",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/tsconfig.json`,
                        jsonToReadableText({
                            compilerOptions: {
                                checkJs: true,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when changing noUncheckedSideEffectImports of config file",
        commandLineArgs: ["-w", "-p", ".", "--extendedDiagnostics"],
        sys: () => {
            const module1: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `import "does-not-exist";`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        noUncheckedSideEffectImports: false,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [module1, config],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "Change noUncheckedSideEffectImports to true",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/tsconfig.json`,
                        jsonToReadableText({
                            compilerOptions: {
                                noUncheckedSideEffectImports: true,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});
