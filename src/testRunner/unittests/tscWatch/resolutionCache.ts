import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { createBaseline } from "../helpers/baseline.js";
import {
    createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline,
    runWatchBaseline,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import {
    File,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: resolutionCache:: tsc-watch module resolution caching", () => {
    const scenario = "resolutionCache";
    it("caching works", () => {
        const root = {
            path: "/users/username/projects/project/d/f0.ts",
            content: `import {x} from "f1"`,
        };
        const imported = {
            path: "/users/username/projects/project/f1.ts",
            content: `foo()`,
        };

        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [root, imported],
            { currentDirectory: "/users/username/projects/project" },
        ));
        const host = createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [root.path],
            system: sys,
            options: { module: ts.ModuleKind.AMD },
            cb,
            watchOptions: undefined,
        });
        const originalFileExists = host.fileExists;
        const watch = ts.createWatchProgram(host);
        let fileExistsIsCalled = false;
        runWatchBaseline({
            scenario: "resolutionCache",
            subScenario: "caching works",
            commandLineArgs: ["--w", root.path],
            sys,
            baseline,
            getPrograms,
            edits: [
                {
                    caption: "Adding text doesnt re-resole the imports",
                    edit: sys => {
                        // patch fileExists to make sure that disk is not touched
                        host.fileExists = ts.notImplemented;
                        sys.writeFile(
                            root.path,
                            `import {x} from "f1"
                            var x: string = 1;`,
                        );
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Resolves f2",
                    edit: sys => {
                        host.fileExists = (fileName): boolean => {
                            if (fileName === "lib.d.ts") {
                                return false;
                            }
                            fileExistsIsCalled = true;
                            assert.isTrue(fileName.includes("/f2."));
                            return originalFileExists.call(host, fileName);
                        };
                        sys.writeFile(root.path, `import {x} from "f2"`);
                    },
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        assert.isTrue(fileExistsIsCalled);
                    },
                },
                {
                    caption: "Resolve f1",
                    edit: sys => {
                        fileExistsIsCalled = false;
                        host.fileExists = (fileName): boolean => {
                            if (fileName === "lib.d.ts") {
                                return false;
                            }
                            fileExistsIsCalled = true;
                            assert.isTrue(fileName.includes("/f1."));
                            return originalFileExists.call(host, fileName);
                        };
                        sys.writeFile(root.path, `import {x} from "f1"`);
                    },
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        assert.isTrue(fileExistsIsCalled);
                    },
                },
            ],
            watchOrSolution: watch,
        });
    });

    it("loads missing files from disk", () => {
        const root = {
            path: `/users/username/projects/project/foo.ts`,
            content: `import {x} from "bar"`,
        };

        const imported = {
            path: `/users/username/projects/project/bar.d.ts`,
            content: `export const y = 1;`,
        };

        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [root],
            { currentDirectory: "/users/username/projects/project" },
        ));
        const host = createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [root.path],
            system: sys,
            options: { module: ts.ModuleKind.AMD },
            cb,
            watchOptions: undefined,
        });
        const originalFileExists = host.fileExists;
        let fileExistsCalledForBar = false;
        host.fileExists = fileName => {
            if (fileName === "lib.d.ts") {
                return false;
            }
            if (!fileExistsCalledForBar) {
                fileExistsCalledForBar = fileName.includes("/bar.");
            }

            return originalFileExists.call(host, fileName);
        };

        const watch = ts.createWatchProgram(host);
        assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
        runWatchBaseline({
            scenario: "resolutionCache",
            subScenario: "loads missing files from disk",
            commandLineArgs: ["--w", root.path],
            sys,
            baseline,
            getPrograms,
            edits: [{
                caption: "write imported file",
                edit: sys => {
                    fileExistsCalledForBar = false;
                    sys.writeFile(root.path, `import {y} from "bar"`);
                    sys.writeFile(imported.path, imported.content);
                },
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
                },
            }],
            watchOrSolution: watch,
        });
    });

    it("should compile correctly when resolved module goes missing and then comes back (module is not part of the root)", () => {
        const root = {
            path: `/users/username/projects/project/foo.ts`,
            content: `import {x} from "bar"`,
        };

        const imported = {
            path: `/users/username/projects/project/bar.d.ts`,
            content: `export const y = 1;export const x = 10;`,
        };

        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [root, imported],
            { currentDirectory: "/users/username/projects/project" },
        ));
        const host = createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            rootFiles: [root.path],
            system: sys,
            options: { module: ts.ModuleKind.AMD },
            cb,
            watchOptions: undefined,
        });
        const originalFileExists = host.fileExists;
        let fileExistsCalledForBar = false;
        host.fileExists = fileName => {
            if (fileName === "lib.d.ts") {
                return false;
            }
            if (!fileExistsCalledForBar) {
                fileExistsCalledForBar = fileName.includes("/bar.");
            }
            return originalFileExists.call(host, fileName);
        };
        const watch = ts.createWatchProgram(host);
        assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
        runWatchBaseline({
            scenario: "resolutionCache",
            subScenario: "should compile correctly when resolved module goes missing and then comes back",
            commandLineArgs: ["--w", root.path],
            sys,
            baseline,
            getPrograms,
            edits: [
                {
                    caption: "Delete imported file",
                    edit: sys => {
                        fileExistsCalledForBar = false;
                        sys.deleteFile(imported.path);
                    },
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
                    },
                },
                {
                    caption: "Create imported file",
                    edit: sys => {
                        fileExistsCalledForBar = false;
                        sys.writeFile(imported.path, imported.content);
                    },
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                        sys.runQueuedTimeoutCallbacks(); // Actual update
                        assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
                    },
                },
            ],
            watchOrSolution: watch,
        });
    });

    verifyTscWatch({
        scenario,
        subScenario: "works when module resolution changes to ambient module",
        commandLineArgs: ["-w", "/users/username/projects/project/foo.ts"],
        sys: () =>
            TestServerHost.createWatchedSystem([{
                path: "/users/username/projects/project/foo.ts",
                content: `import * as fs from "fs";`,
            }], { currentDirectory: "/users/username/projects/project" }),
        edits: [
            {
                caption: "npm install node types",
                edit: sys => {
                    sys.ensureFileOrFolder({
                        path: "/users/username/projects/project/node_modules/@types/node/package.json",
                        content: `
{
  "main": ""
}
`,
                    });
                    sys.ensureFileOrFolder({
                        path: "/users/username/projects/project/node_modules/@types/node/index.d.ts",
                        content: `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}`,
                    });
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "works when included file with ambient module changes",
        commandLineArgs: ["--w", "/users/username/projects/project/foo.ts", "/users/username/projects/project/bar.d.ts"],
        sys: () => {
            const root = {
                path: "/users/username/projects/project/foo.ts",
                content: `
import * as fs from "fs";
import * as u from "url";
`,
            };

            const file = {
                path: "/users/username/projects/project/bar.d.ts",
                content: `
declare module "url" {
    export interface Url {
        href?: string;
    }
}
`,
            };
            return TestServerHost.createWatchedSystem(
                [root, file],
                { currentDirectory: "/users/username/projects/project" },
            );
        },
        edits: [
            {
                caption: "Add fs definition",
                edit: sys =>
                    sys.appendFile(
                        "/users/username/projects/project/bar.d.ts",
                        `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}
`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "works when reusing program with files from external library",
        commandLineArgs: ["--w", "-p", "/a/b/projects/myProject/src"],
        sys: () => {
            const configDir = "/a/b/projects/myProject/src/";
            const file1: File = {
                path: configDir + "file1.ts",
                content: 'import module1 = require("module1");\nmodule1("hello");',
            };
            const file2: File = {
                path: configDir + "file2.ts",
                content: 'import module11 = require("module1");\nmodule11("hello");',
            };
            const module1: File = {
                path: "/a/b/projects/myProject/node_modules/module1/index.js",
                content: "module.exports = options => { return options.toString(); }",
            };
            const configFile: File = {
                path: configDir + "tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        allowJs: true,
                        rootDir: ".",
                        outDir: "../dist",
                        moduleResolution: "node",
                        maxNodeModuleJsDepth: 1,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [file1, file2, module1, configFile],
                { currentDirectory: "/a/b/projects/myProject/" },
            );
        },
        edits: [
            {
                caption: "Add new line to file1",
                edit: sys => sys.appendFile("/a/b/projects/myProject/src/file1.ts", "\n;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "works when renaming node_modules folder that already contains @types folder",
        commandLineArgs: ["--w", `/user/username/projects/myproject/a.ts`],
        sys: () => {
            const file: File = {
                path: `/user/username/projects/myproject/a.ts`,
                content: `import * as q from "qqq";`,
            };
            const module: File = {
                path: `/user/username/projects/myproject/node_modules2/@types/qqq/index.d.ts`,
                content: "export {}",
            };
            return TestServerHost.createWatchedSystem(
                [file, module],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        },
        edits: [
            {
                caption: "npm install",
                edit: sys => sys.renameFolder(`/user/username/projects/myproject/node_modules2`, `/user/username/projects/myproject/node_modules`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    describe("ignores files/folder changes in node_modules that start with '.'", () => {
        function verifyIgnore(subScenario: string, commandLineArgs: readonly string[]) {
            verifyTscWatch({
                scenario,
                subScenario: `ignores changes in node_modules that start with dot/${subScenario}`,
                commandLineArgs,
                sys: () => {
                    const file1: File = {
                        path: `/user/username/projects/myproject/test.ts`,
                        content: `import { x } from "somemodule";`,
                    };
                    const file2: File = {
                        path: `/user/username/projects/myproject/node_modules/somemodule/index.d.ts`,
                        content: `export const x = 10;`,
                    };
                    const config: File = {
                        path: `/user/username/projects/myproject/tsconfig.json`,
                        content: "{}",
                    };
                    return TestServerHost.createWatchedSystem(
                        [file1, file2, config],
                        { currentDirectory: ts.getDirectoryPath(config.path) },
                    );
                },
                edits: [
                    {
                        caption: "npm install file and folder that start with '.'",
                        edit: sys =>
                            sys.ensureFileOrFolder({
                                path: `/user/username/projects/myproject/node_modules/.cache/babel-loader/89c02171edab901b9926470ba6d5677e.ts`,
                                content: jsonToReadableText({ something: 10 }),
                            }),
                        timeouts: ts.noop,
                    },
                ],
            });
        }
        verifyIgnore("watch without configFile", ["--w", `/user/username/projects/myproject/test.ts`]);
        verifyIgnore("watch with configFile", ["--w", "-p", `/user/username/projects/myproject/tsconfig.json`]);
    });

    verifyTscWatch({
        scenario,
        subScenario: "when types in compiler option are global and installed at later point",
        commandLineArgs: ["--w"],
        sys: () => {
            const app: File = {
                path: `/user/username/projects/myproject/lib/app.ts`,
                content: `myapp.component("hello");`,
            };
            const tsconfig: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        types: ["@myapp/ts-types"],
                    },
                }),
            };
            return TestServerHost.createWatchedSystem(
                [app, tsconfig],
                { currentDirectory: ts.getDirectoryPath(tsconfig.path) },
            );
        },
        edits: [
            {
                caption: "npm install ts-types",
                edit: sys => {
                    sys.ensureFileOrFolder({
                        path: `/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json`,
                        content: jsonToReadableText({
                            version: "1.65.1",
                            types: "types/somefile.define.d.ts",
                        }),
                    });
                    sys.ensureFileOrFolder({
                        path: `/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts`,
                        content: `
declare namespace myapp {
    function component(str: string): number;
}`,
                    });
                },
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions, update that gets cancelled and rescheduled by actual invalidation of resolution
                    sys.runQueuedTimeoutCallbacks(); // Actual update
                },
            },
            {
                caption: "No change, just check program",
                edit: ts.noop,
                timeouts: (_sys, [[oldProgram, oldBuilderProgram]], watchorSolution) => {
                    const newProgram = (watchorSolution as ts.WatchOfConfigFile<ts.EmitAndSemanticDiagnosticsBuilderProgram>).getProgram();
                    assert.strictEqual(newProgram, oldBuilderProgram, "No change so builder program should be same");
                    assert.strictEqual(newProgram.getProgram(), oldProgram, "No change so program should be same");
                },
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "with modules linked to sibling folder",
        commandLineArgs: ["-w"],
        sys: () => {
            const mainPackageRoot = `/user/username/projects/myproject/main`;
            const linkedPackageRoot = `/user/username/projects/myproject/linked-package`;
            const mainFile: File = {
                path: `${mainPackageRoot}/index.ts`,
                content: "import { Foo } from '@scoped/linked-package'",
            };
            const config: File = {
                path: `${mainPackageRoot}/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { module: "commonjs", moduleResolution: "node", baseUrl: ".", rootDir: "." },
                    files: ["index.ts"],
                }),
            };
            const linkedPackageInMain: SymLink = {
                path: `${mainPackageRoot}/node_modules/@scoped/linked-package`,
                symLink: `${linkedPackageRoot}`,
            };
            const linkedPackageJson: File = {
                path: `${linkedPackageRoot}/package.json`,
                content: jsonToReadableText({ name: "@scoped/linked-package", version: "0.0.1", types: "dist/index.d.ts", main: "dist/index.js" }),
            };
            const linkedPackageIndex: File = {
                path: `${linkedPackageRoot}/dist/index.d.ts`,
                content: "export * from './other';",
            };
            const linkedPackageOther: File = {
                path: `${linkedPackageRoot}/dist/other.d.ts`,
                content: 'export declare const Foo = "BAR";',
            };
            return TestServerHost.createWatchedSystem(
                [mainFile, config, linkedPackageInMain, linkedPackageJson, linkedPackageIndex, linkedPackageOther],
                { currentDirectory: mainPackageRoot },
            );
        },
    });

    describe("works when installing something in node_modules or @types when there is no notification from fs for index file", () => {
        function getNodeAtTypes() {
            const nodeAtTypesIndex: File = {
                path: `/user/username/projects/myproject/node_modules/@types/node/index.d.ts`,
                content: `/// <reference path="base.d.ts" />`,
            };
            const nodeAtTypesBase: File = {
                path: `/user/username/projects/myproject/node_modules/@types/node/base.d.ts`,
                content: `// Base definitions for all NodeJS modules that are not specific to any version of TypeScript:
/// <reference path="ts3.6/base.d.ts" />`,
            };
            const nodeAtTypes36Base: File = {
                path: `/user/username/projects/myproject/node_modules/@types/node/ts3.6/base.d.ts`,
                content: `/// <reference path="../globals.d.ts" />`,
            };
            const nodeAtTypesGlobals: File = {
                path: `/user/username/projects/myproject/node_modules/@types/node/globals.d.ts`,
                content: `declare var process: NodeJS.Process;
declare namespace NodeJS {
    interface Process {
        on(msg: string): void;
    }
}`,
            };
            return { nodeAtTypesIndex, nodeAtTypesBase, nodeAtTypes36Base, nodeAtTypesGlobals };
        }
        verifyTscWatch({
            scenario,
            subScenario: "works when installing something in node_modules or @types when there is no notification from fs for index file",
            commandLineArgs: ["--w", `--extendedDiagnostics`],
            sys: () => {
                const file: File = {
                    path: `/user/username/projects/myproject/worker.ts`,
                    content: `process.on("uncaughtException");`,
                };
                const tsconfig: File = {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: "{}",
                };
                const { nodeAtTypesIndex, nodeAtTypesBase, nodeAtTypes36Base, nodeAtTypesGlobals } = getNodeAtTypes();
                return TestServerHost.createWatchedSystem(
                    [file, tsconfig, nodeAtTypesIndex, nodeAtTypesBase, nodeAtTypes36Base, nodeAtTypesGlobals],
                    { currentDirectory: "/user/username/projects/myproject" },
                );
            },
            edits: [
                {
                    caption: "npm ci step one: remove all node_modules files",
                    edit: sys => sys.deleteFolder(`/user/username/projects/myproject/node_modules/@types`, /*recursive*/ true),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: `npm ci step two: create atTypes but something else in the @types folder`,
                    edit: sys =>
                        sys.ensureFileOrFolder({
                            path: `/user/username/projects/myproject/node_modules/@types/mocha/index.d.ts`,
                            content: `export const foo = 10;`,
                        }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: `npm ci step three: create atTypes node folder`,
                    edit: sys => sys.ensureFileOrFolder({ path: `/user/username/projects/myproject/node_modules/@types/node` }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: `npm ci step four: create atTypes write all the files but dont invoke watcher for index.d.ts`,
                    edit: sys => {
                        const { nodeAtTypesIndex, nodeAtTypesBase, nodeAtTypes36Base, nodeAtTypesGlobals } = getNodeAtTypes();
                        sys.ensureFileOrFolder(nodeAtTypesBase);
                        sys.ensureFileOrFolder(nodeAtTypesIndex, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true);
                        sys.ensureFileOrFolder(nodeAtTypes36Base, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true);
                        sys.ensureFileOrFolder(nodeAtTypesGlobals, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true);
                    },
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // update failed lookups
                        sys.runQueuedTimeoutCallbacks(); // actual program update
                    },
                },
            ],
        });
    });

    verifyTscWatch({
        scenario,
        subScenario: "reusing type ref resolution",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/users/username/projects/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        traceResolution: true,
                        outDir: "outDir",
                    },
                }),
                "/users/username/projects/project/fileWithImports.ts": dedent`
                import type { Import0 } from "pkg0";
                import type { Import1 } from "pkg1";
            `,
                "/users/username/projects/project/node_modules/pkg0/index.d.ts": `export interface Import0 {}`,
                "/users/username/projects/project/fileWithTypeRefs.ts": dedent`
                /// <reference types="pkg2"/>
                /// <reference types="pkg3"/>
                interface LocalInterface extends Import2, Import3 {}
                export {}
            `,
                "/users/username/projects/project/node_modules/pkg2/index.d.ts": `interface Import2 {}`,
            }, { currentDirectory: "/users/username/projects/project" }),
        commandLineArgs: ["-w", "--explainFiles", "--extendedDiagnostics"],
        edits: [
            {
                caption: "write file not resolved by import",
                edit: sys => sys.ensureFileOrFolder({ path: "/users/username/projects/project/node_modules/pkg1/index.d.ts", content: `export interface Import1 {}` }),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // failed lookup
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "write file not resolved by typeRef",
                edit: sys => sys.ensureFileOrFolder({ path: "/users/username/projects/project/node_modules/pkg3/index.d.ts", content: `export interface Import3 {}` }),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // failed lookup
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "scoped package installation",
        commandLineArgs: ["--w", "-p", `.`, "--traceResolution", "--extendedDiagnostics"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/user/username/projects/myproject/lib/app.ts": dedent`
                import { myapp } from "@myapp/ts-types";
                const x: 10 = myapp;
            `,
                "/user/username/projects/myproject/tsconfig.json": "{}",
            }, { currentDirectory: "/user/username/projects/myproject" }),
        edits: [
            {
                caption: "npm install unrelated non scoped",
                edit: sys =>
                    sys.ensureFileOrFolder({
                        path: `/user/username/projects/myproject/node_modules/unrelated/index.d.ts`,
                        content: `export const unrelated = 10;`,
                    }),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "npm install unrelated scoped in myapp",
                edit: sys =>
                    sys.ensureFileOrFolder({
                        path: `/user/username/projects/myproject/node_modules/@myapp/unrelated/index.d.ts`,
                        content: `export const myappUnrelated = 10;`,
                    }),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "npm install unrelated2 scoped in myapp",
                edit: sys =>
                    sys.ensureFileOrFolder({
                        path: `/user/username/projects/myproject/node_modules/@myapp/unrelated2/index.d.ts`,
                        content: `export const myappUnrelated2 = 10;`,
                    }),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "npm install ts-types",
                edit: sys =>
                    sys.ensureFileOrFolder({
                        path: `/user/username/projects/myproject/node_modules/@myapp/ts-types/index.d.ts`,
                        content: `export const myapp = 10;`,
                    }),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
        ],
    });

    verifyTscWatch({
        scenario,
        subScenario: "when dir watcher is invoked without file change",
        commandLineArgs: ["--w", "--traceResolution", "--extendedDiagnostics"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/main.ts": dedent`
                        import { y } from "./app/services/generated";
                        const x = y;
                    `,
                "/home/src/workspaces/project/src/app/services/generated/index.ts": "export const y = 10;",
                "/home/src/workspaces/project/tsconfig.json": "{}",
            }),
        edits: [
            {
                caption: "delete folder",
                edit: sys => sys.deleteFolder("/home/src/workspaces/project/src/app/services/generated", /*recursive*/ true),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "generate folder",
                edit: sys =>
                    sys.ensureFileOrFolder({
                        path: "/home/src/workspaces/project/src/app/services/generated/index.ts",
                        content: "export const y = 10;",
                    }, /*ignoreWatchInvokedWithTriggerAsFileCreate*/ true),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
        ],
    });
});
