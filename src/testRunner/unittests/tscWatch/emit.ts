import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

const scenario = "emit";
describe("unittests:: tscWatch:: emit:: with outFile or out setting", () => {
    function verifyOutAndOutFileSetting(subScenario: string, out?: string, outFile?: string) {
        verifyTscWatch({
            scenario,
            subScenario: `emit with outFile or out setting/${subScenario}`,
            commandLineArgs: ["--w", "-p", "/home/src/projects/a/tsconfig.json"],
            sys: () =>
                TestServerHost.createWatchedSystem({
                    "/home/src/projects/a/a.ts": "let x = 1",
                    "/home/src/projects/a/b.ts": "let y = 1",
                    "/home/src/projects/a/tsconfig.json": jsonToReadableText({ compilerOptions: { out, outFile } }),
                }, { currentDirectory: "/home/src/projects/a" }),
            edits: [
                {
                    caption: "Make change in the file",
                    edit: sys => sys.writeFile("/home/src/projects/a/a.ts", "let x = 11"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Make change in the file again",
                    edit: sys => sys.writeFile("/home/src/projects/a/a.ts", "let xy = 11"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });
    }
    verifyOutAndOutFileSetting("config does not have out or outFile");
    verifyOutAndOutFileSetting("config has out", "/home/src/projects/a/out.js");
    verifyOutAndOutFileSetting("config has outFile", /*out*/ undefined, "/home/src/projects/a/out.js");

    function verifyFilesEmittedOnce(subScenario: string, useOutFile: boolean) {
        verifyTscWatch({
            scenario,
            subScenario: `emit with outFile or out setting/${subScenario}`,
            commandLineArgs: ["--w"],
            sys: () => {
                const file1: File = {
                    path: "/home/src/projects/a/b/output/AnotherDependency/file1.d.ts",
                    content: "declare namespace Common.SomeComponent.DynamicMenu { enum Z { Full = 0,  Min = 1, Average = 2, } }",
                };
                const file2: File = {
                    path: "/home/src/projects/a/b/dependencies/file2.d.ts",
                    content: "declare namespace Dependencies.SomeComponent { export class SomeClass { version: string; } }",
                };
                const file3: File = {
                    path: "/home/src/projects/a/b/project/src/main.ts",
                    content: "namespace Main { export function fooBar() {} }",
                };
                const file4: File = {
                    path: "/home/src/projects/a/b/project/src/main2.ts",
                    content: "namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }",
                };
                const configFile: File = {
                    path: "/home/src/projects/a/b/project/tsconfig.json",
                    content: jsonToReadableText({
                        compilerOptions: useOutFile ?
                            { outFile: "../output/common.js", target: "es5" } :
                            { outDir: "../output", target: "es5" },
                        files: [file1.path, file2.path, file3.path, file4.path],
                    }),
                };
                return TestServerHost.createWatchedSystem(
                    [file1, file2, file3, file4, configFile],
                    { currentDirectory: "/home/src/projects/a/b/project" },
                );
            },
        });
    }
    verifyFilesEmittedOnce("with --outFile and multiple declaration files in the program", /*useOutFile*/ true);
    verifyFilesEmittedOnce("without --outFile and multiple declaration files in the program", /*useOutFile*/ false);
});

describe("unittests:: tscWatch:: emit:: for configured projects", () => {
    const file1Consumer1Path = "/home/src/projects/a/b/file1Consumer1.ts";
    const file1Consumer2Path = "/home/src/projects/a/b/file1Consumer2.ts";
    const moduleFile1Path = "/home/src/projects/a/b/moduleFile1.ts";
    const moduleFile2Path = "/home/src/projects/a/b/moduleFile2.ts";
    const globalFilePath = "/home/src/projects/a/b/globalFile3.ts";
    const configFilePath = "/home/src/projects/a/b/tsconfig.json";
    interface VerifyTscWatchEmit {
        subScenario: string;
        /** custom config file options */
        configObj?: any;
        /** Additional files and folders to add */
        getAdditionalFileOrFolder?: () => File[];
        /** initial list of files to emit if not the default list */
        firstReloadFileList?: string[];
        changes: TscWatchCompileChange[];
    }
    function verifyTscWatchEmit({
        subScenario,
        configObj,
        getAdditionalFileOrFolder,
        firstReloadFileList,
        changes,
    }: VerifyTscWatchEmit) {
        verifyTscWatch({
            scenario,
            subScenario: `emit for configured projects/${subScenario}`,
            commandLineArgs: ["--w"],
            sys: () => {
                const moduleFile1: File = {
                    path: moduleFile1Path,
                    content: "export function Foo() { };",
                };

                const file1Consumer1: File = {
                    path: file1Consumer1Path,
                    content: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                };

                const file1Consumer2: File = {
                    path: file1Consumer2Path,
                    content: `import {Foo} from "./moduleFile1"; let z = 10;`,
                };

                const moduleFile2: File = {
                    path: moduleFile2Path,
                    content: `export var Foo4 = 10;`,
                };

                const globalFile3: File = {
                    path: globalFilePath,
                    content: `interface GlobalFoo { age: number }`,
                };
                const configFile: File = {
                    path: configFilePath,
                    content: jsonToReadableText(configObj || {}),
                };
                const additionalFiles = getAdditionalFileOrFolder?.() || ts.emptyArray;
                const files = [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ...additionalFiles];
                return TestServerHost.createWatchedSystem(
                    firstReloadFileList ?
                        ts.map(firstReloadFileList, fileName => ts.find(files, file => file.path === fileName)!) :
                        files,
                    { currentDirectory: ts.getDirectoryPath(configFilePath) },
                );
            },
            edits: changes,
        });
    }

    function modifyModuleFile1Shape(sys: TestServerHost) {
        sys.writeFile(moduleFile1Path, `export var T: number;export function Foo() { };`);
    }
    const changeModuleFile1Shape: TscWatchCompileChange = {
        caption: "Change the content of moduleFile1 to `export var T: number;export function Foo() { };`",
        edit: modifyModuleFile1Shape,
        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
    };

    verifyTscWatchEmit({
        subScenario: "should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed",
        changes: [
            changeModuleFile1Shape,
            {
                caption: "Change the content of moduleFile1 to `export var T: number;export function Foo() { console.log('hi'); };`",
                edit: sys => sys.writeFile(moduleFile1Path, `export var T: number;export function Foo() { console.log('hi'); };`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should be up-to-date with the reference map changes",
        changes: [
            {
                caption: "Change file1Consumer1 content to `export let y = Foo();`",
                edit: sys => sys.writeFile(file1Consumer1Path, `export let y = Foo();`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            changeModuleFile1Shape,
            {
                caption: "Add the import statements back to file1Consumer1",
                edit: sys => sys.writeFile(file1Consumer1Path, `import {Foo} from "./moduleFile1";let y = Foo();`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`",
                edit: sys => sys.writeFile(moduleFile1Path, `export let y = Foo();`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Multiple file edits in one go",
                // Change file1Consumer1 content to `export let y = Foo();`
                // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                edit: sys => {
                    sys.writeFile(file1Consumer1Path, `import {Foo} from "./moduleFile1";let y = Foo();`);
                    modifyModuleFile1Shape(sys);
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should be up-to-date with deleted files",
        changes: [
            {
                caption: "change moduleFile1 shape and delete file1Consumer2",
                edit: sys => {
                    modifyModuleFile1Shape(sys);
                    sys.deleteFile(file1Consumer2Path);
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should be up-to-date with newly created files",
        changes: [
            {
                caption: "change moduleFile1 shape and create file1Consumer3",
                edit: sys => {
                    sys.writeFile("/home/src/projects/a/b/file1Consumer3.ts", `import {Foo} from "./moduleFile1"; let y = Foo();`);
                    modifyModuleFile1Shape(sys);
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should detect changes in non-root files",
        configObj: { files: [file1Consumer1Path] },
        changes: [
            changeModuleFile1Shape,
            {
                caption: "change file1 internal, and verify only file1 is affected",
                edit: sys => sys.appendFile(moduleFile1Path, "var T1: number;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should return all files if a global file changed shape",
        changes: [
            {
                caption: "change shape of global file",
                edit: sys => sys.appendFile(globalFilePath, "var T2: string;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should always return the file itself if '--isolatedModules' is specified",
        configObj: { compilerOptions: { isolatedModules: true } },
        changes: [
            changeModuleFile1Shape,
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should always return the file itself if '--out' or '--outFile' is specified",
        configObj: { compilerOptions: { module: "system", outFile: "/home/src/projects/a/b/out.js" } },
        changes: [
            changeModuleFile1Shape,
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should return cascaded affected file list",
        getAdditionalFileOrFolder: () => [{
            path: "/home/src/projects/a/b/file1Consumer1Consumer1.ts",
            content: `import {y} from "./file1Consumer1";`,
        }],
        changes: [
            {
                caption: "change file1Consumer1",
                edit: sys => sys.appendFile(file1Consumer1Path, "export var T: number;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            changeModuleFile1Shape,
            {
                caption: "change file1Consumer1 and moduleFile1",
                edit: sys => {
                    sys.appendFile(file1Consumer1Path, "export var T2: number;");
                    sys.writeFile(moduleFile1Path, `export var T2: number;export function Foo() { };`);
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should work fine for files with circular references",
        getAdditionalFileOrFolder: () => [
            {
                path: "/home/src/projects/a/b/file1.ts",
                content: `/// <reference path="./file2.ts" />
export var t1 = 10;`,
            },
            {
                path: "/home/src/projects/a/b/file2.ts",
                content: `/// <reference path="./file1.ts" />
export var t2 = 10;`,
            },
        ],
        firstReloadFileList: ["/home/src/projects/a/b/file1.ts", "/home/src/projects/a/b/file2.ts", configFilePath],
        changes: [
            {
                caption: "change file1",
                edit: sys => sys.appendFile("/home/src/projects/a/b/file1.ts", "export var t3 = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should detect removed code file",
        getAdditionalFileOrFolder: () => [{
            path: "/home/src/projects/a/b/referenceFile1.ts",
            content: `/// <reference path="./moduleFile1.ts" />
export var x = Foo();`,
        }],
        firstReloadFileList: ["/home/src/projects/a/b/referenceFile1.ts", moduleFile1Path, configFilePath],
        changes: [
            {
                caption: "delete moduleFile1",
                edit: sys => sys.deleteFile(moduleFile1Path),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatchEmit({
        subScenario: "should detect non existing code file",
        getAdditionalFileOrFolder: () => [{
            path: "/home/src/projects/a/b/referenceFile1.ts",
            content: `/// <reference path="./moduleFile2.ts" />
export var x = Foo();`,
        }],
        firstReloadFileList: ["/home/src/projects/a/b/referenceFile1.ts", configFilePath],
        changes: [
            {
                caption: "edit refereceFile1",
                edit: sys => sys.appendFile("/home/src/projects/a/b/referenceFile1.ts", "export var yy = Foo();"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "create moduleFile2",
                edit: sys => sys.writeFile(moduleFile2Path, "export var Foo4 = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});

describe("unittests:: tscWatch:: emit:: file content", () => {
    function verifyNewLine(subScenario: string, newLine: string) {
        verifyTscWatch({
            scenario,
            subScenario: `emit file content/${subScenario}`,
            commandLineArgs: ["--w", "/home/src/projects/a/app.ts"],
            sys: () =>
                TestServerHost.createWatchedSystem(
                    [{
                        path: "/home/src/projects/a/app.ts",
                        content: ["var x = 1;", "var y = 2;"].join(newLine),
                    }],
                    { newLine, currentDirectory: "/home/src/projects/a" },
                ),
            edits: [
                {
                    caption: "Append a line",
                    edit: sys => sys.appendFile("/home/src/projects/a/app.ts", newLine + "var z = 3;"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
        });
    }
    verifyNewLine("handles new lines lineFeed", "\n");
    verifyNewLine("handles new lines carriageReturn lineFeed", "\r\n");

    verifyTscWatch({
        scenario,
        subScenario: "emit file content/should emit specified file",
        commandLineArgs: ["-w", "-p", "/home/src/projects/a/b/tsconfig.json"],
        sys: () => {
            const file1 = {
                path: "/home/src/projects/a/b/f1.ts",
                content: `export function Foo() { return 10; }`,
            };

            const file2 = {
                path: "/home/src/projects/a/b/f2.ts",
                content: `import {Foo} from "./f1"; export let y = Foo();`,
            };

            const file3 = {
                path: "/home/src/projects/a/b/f3.ts",
                content: `import {y} from "./f2"; let x = y;`,
            };

            const configFile = {
                path: "/home/src/projects/a/b/tsconfig.json",
                content: "{}",
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, file3, configFile],
                { currentDirectory: ts.getDirectoryPath(configFile.path) },
            );
        },
        edits: [
            {
                caption: "Append content to f1",
                edit: sys => sys.appendFile("/home/src/projects/a/b/f1.ts", "export function foo2() { return 2; }"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Again Append content to f1",
                edit: sys => sys.appendFile("/home/src/projects/a/b/f1.ts", "export function fooN() { return 2; }"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "emit file content/elides const enums correctly in incremental compilation",
        commandLineArgs: ["-w", "/user/someone/projects/myproject/file3.ts"],
        sys: () => {
            const currentDirectory = "/user/someone/projects/myproject";
            const file1: File = {
                path: `${currentDirectory}/file1.ts`,
                content: "export const enum E1 { V = 1 }",
            };
            const file2: File = {
                path: `${currentDirectory}/file2.ts`,
                content: `import { E1 } from "./file1"; export const enum E2 { V = E1.V }`,
            };
            const file3: File = {
                path: `${currentDirectory}/file3.ts`,
                content: `import { E2 } from "./file2"; const v: E2 = E2.V;`,
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, file3],
                { currentDirectory },
            );
        },
        edits: [
            {
                caption: "Append content to file3",
                edit: sys => sys.appendFile("/user/someone/projects/myproject/file3.ts", "function foo2() { return 2; }"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "emit file content/file is deleted and created as part of change",
        commandLineArgs: ["-w"],
        sys: () => {
            const projectLocation = "/home/username/projects/project";
            const file: File = {
                path: `${projectLocation}/app/file.ts`,
                content: "var a = 10;",
            };
            const configFile: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: jsonToReadableText({
                    include: [
                        "app/**/*.ts",
                    ],
                }),
            };
            return TestServerHost.createWatchedSystem(
                [file, configFile],
                {
                    currentDirectory: projectLocation,
                    useCaseSensitiveFileNames: true,
                },
            );
        },
        edits: [
            {
                caption: "file is deleted and then created to modify content",
                edit: sys => sys.appendFile("/home/username/projects/project/app/file.ts", "\nvar b = 10;", { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});

describe("unittests:: tscWatch:: emit:: with when module emit is specified as node", () => {
    verifyTscWatch({
        scenario,
        subScenario: "when module emit is specified as node/when instead of filechanged recursive directory watcher is invoked",
        commandLineArgs: ["--w"],
        sys: () => {
            const configFile: File = {
                path: "/home/src/projects/a/rootFolder/project/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        allowJs: true,
                        outDir: "Static/scripts/",
                    },
                    include: [
                        "Scripts/**/*",
                    ],
                }),
            };
            const file1: File = {
                path: "/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts",
                content: "var z = 10;",
            };
            const file2: File = {
                path: "/home/src/projects/a/rootFolder/project/Scripts/Javascript.js",
                content: "var zz = 10;",
            };
            return TestServerHost.createWatchedSystem(
                [configFile, file1, file2],
                { currentDirectory: ts.getDirectoryPath(configFile.path) },
            );
        },
        edits: [
            {
                caption: "Modify typescript file",
                edit: sys =>
                    sys.modifyFile(
                        "/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts",
                        "var zz30 = 100;",
                        { invokeDirectoryWatcherInsteadOfFileChanged: true },
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});
