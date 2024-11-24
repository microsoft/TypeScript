import {
    ModuleDetectionKind,
    ModuleKind,
    ModuleResolutionKind,
} from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyAlternateResultScenario } from "../helpers/alternateResult.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: moduleResolution::", () => {
    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `watches for changes to package-json main fields`,
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/packages/pkg1/package.json`,
                    content: jsonToReadableText({
                        name: "pkg1",
                        version: "1.0.0",
                        main: "build/index.js",
                    }),
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg1/index.ts`,
                    content: dedent`
            import type { TheNum } from 'pkg2'
            export const theNum: TheNum = 42;`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg1/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            outDir: "build",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/build/const.d.ts`,
                    content: `export type TheNum = 42;`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/build/index.d.ts`,
                    content: `export type { TheNum } from './const.js';`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/build/other.d.ts`,
                    content: `export type TheStr = string;`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/package.json`,
                    content: jsonToReadableText({
                        name: "pkg2",
                        version: "1.0.0",
                        main: "build/index.js",
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg2`,
                    symLink: `/user/username/projects/myproject/packages/pkg2`,
                },
            ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["--project", "./packages/pkg1/tsconfig.json", "-w", "--traceResolution"],
        edits: [
            {
                caption: "reports import errors after change to package file",
                edit: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `index.js`, `other.js`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "removes those errors when a package file is changed back",
                edit: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `other.js`, `index.js`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "diagnostics from cache",
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            moduleResolution: "nodenext",
                            outDir: "./dist",
                            declaration: true,
                            declarationDir: "./types",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/package.json`,
                    content: jsonToReadableText({
                        name: "@this/package",
                        type: "module",
                        exports: {
                            ".": {
                                default: "./dist/index.js",
                                types: "./types/index.d.ts",
                            },
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/index.ts`,
                    content: dedent`
                        import * as me from "@this/package";
                        me.thing()
                        export function thing(): void {}
                    `,
                },
                {
                    path: `/user/username/projects/myproject/index2.ts`,
                    content: dedent`
                        export function thing(): void {}
                    `,
                },
            ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution"],
        edits: [{
            caption: "Add import to index2",
            edit: sys => sys.prependFile(`/user/username/projects/myproject/index2.ts`, `import * as me from "./index.js";`),
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        }],
    });

    describe("package json file is edited", () => {
        function getSys(packageFileContents: string) {
            const configFile: File = {
                path: `/user/username/projects/myproject/src/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        target: "es2016",
                        module: "Node16",
                        outDir: "../out",
                    },
                }),
            };
            const packageFile: File = {
                path: `/user/username/projects/myproject/package.json`,
                content: packageFileContents,
            };
            const fileA: File = {
                path: `/user/username/projects/myproject/src/fileA.ts`,
                content: dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `,
            };
            const fileB: File = {
                path: `/user/username/projects/myproject/project/src/fileB.mts`,
                content: dedent`
                        export function foo() {
                        }
                    `,
            };
            return TestServerHost.createWatchedSystem(
                [configFile, fileA, fileB, packageFile],
                { currentDirectory: "/user/username/projects/myproject" },
            );
        }
        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: "package json file is edited",
            commandLineArgs: ["--w", "--p", "src", "--extendedDiagnostics", "-traceResolution", "--explainFiles"],
            sys: () => getSys(jsonToReadableText({ name: "app", version: "1.0.0" })),
            edits: [
                {
                    caption: "Modify package json file to add type module",
                    edit: sys =>
                        sys.writeFile(
                            `/user/username/projects/myproject/package.json`,
                            jsonToReadableText({
                                name: "app",
                                version: "1.0.0",
                                type: "module",
                            }),
                        ),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package.json file to remove type module",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, jsonToReadableText({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    edit: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to add type module",
                    edit: sys =>
                        sys.writeFile(
                            `/user/username/projects/myproject/package.json`,
                            jsonToReadableText({
                                name: "app",
                                version: "1.0.0",
                                type: "module",
                            }),
                        ),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    edit: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
            ],
        });

        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: "package json file is edited when package json with type module exists",
            commandLineArgs: ["--w", "--p", "src", "--extendedDiagnostics", "-traceResolution", "--explainFiles"],
            sys: () =>
                getSys(jsonToReadableText({
                    name: "app",
                    version: "1.0.0",
                    type: "module",
                })),
            edits: [
                {
                    caption: "Modify package.json file to remove type module",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, jsonToReadableText({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to add type module",
                    edit: sys =>
                        sys.writeFile(
                            `/user/username/projects/myproject/package.json`,
                            jsonToReadableText({
                                name: "app",
                                version: "1.0.0",
                                type: "module",
                            }),
                        ),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    edit: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to without type module",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, jsonToReadableText({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    edit: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
            ],
        });
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "module resolutions from file are partially used",
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: { moduleResolution: "node16" },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/index.ts`,
                    content: dedent`
                        import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };
                        import type { RequireInterface } from "pkg1" assert { "resolution-mode": "require" };
                        import {x} from "./a";
                    `,
                },
                {
                    path: `/user/username/projects/myproject/a.ts`,
                    content: dedent`
                        export const x = 10;
                    `,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/package.json`,
                    content: jsonToReadableText({
                        name: "pkg",
                        version: "0.0.1",
                        exports: {
                            import: "./import.js",
                            require: "./require.js",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/import.d.ts`,
                    content: `export interface ImportInterface {}`,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/require.d.ts`,
                    content: `export interface RequireInterface {}`,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg1/package.json`,
                    content: jsonToReadableText({
                        name: "pkg1",
                        version: "0.0.1",
                        exports: {
                            import: "./import.js",
                            require: "./require.js",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg1/import.d.ts`,
                    content: `export interface ImportInterface {}`,
                },
            ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution"],
        edits: [
            {
                caption: "modify aFile by adding import",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/a.ts`, `import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" }`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "module resolutions from files with partially used import attributes",
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: { moduleResolution: "node16" },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/index.ts`,
                    content: dedent`
                        import type { ImportInterface } from "pkg" with { "resolution-mode": "import" };
                        import type { RequireInterface } from "pkg1" with { "resolution-mode": "require" };
                        import {x} from "./a";
                    `,
                },
                {
                    path: `/user/username/projects/myproject/a.ts`,
                    content: dedent`
                        export const x = 10;
                    `,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/package.json`,
                    content: jsonToReadableText({
                        name: "pkg",
                        version: "0.0.1",
                        exports: {
                            import: "./import.js",
                            require: "./require.js",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/import.d.ts`,
                    content: `export interface ImportInterface {}`,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/require.d.ts`,
                    content: `export interface RequireInterface {}`,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg1/package.json`,
                    content: jsonToReadableText({
                        name: "pkg1",
                        version: "0.0.1",
                        exports: {
                            import: "./import.js",
                            require: "./require.js",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg1/import.d.ts`,
                    content: `export interface ImportInterface {}`,
                },
            ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution"],
        edits: [
            {
                caption: "modify aFile by adding import",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/a.ts`, `import type { ImportInterface } from "pkg" with { "resolution-mode": "import" }`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "type reference resolutions reuse",
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: { moduleResolution: "node16" },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/index.ts`,
                    content: dedent`
                    /// <reference types="pkg" resolution-mode="import"/>
                    /// <reference types="pkg1" resolution-mode="require"/>
                    export interface LocalInterface extends RequireInterface {}
                `,
                },
                {
                    path: `/user/username/projects/myproject/a.ts`,
                    content: dedent`
                    export const x = 10;
                `,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/package.json`,
                    content: jsonToReadableText({
                        name: "pkg",
                        version: "0.0.1",
                        exports: {
                            import: "./import.js",
                            require: "./require.js",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/import.d.ts`,
                    content: dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/require.d.ts`,
                    content: dedent`
                    export {};
                    declare global {
                        interface RequireInterface {}
                    }
                `,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg1/package.json`,
                    content: jsonToReadableText({
                        name: "pkg1",
                        version: "0.0.1",
                        exports: {
                            import: "./import.js",
                            require: "./require.js",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg1/import.d.ts`,
                    content: dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts`,
                    content: `export const x = 10;`,
                },
            ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution"],
        edits: [
            {
                caption: "modify aFile by adding import",
                edit: sys => sys.prependFile(`/user/username/projects/myproject/a.ts`, `/// <reference types="pkg" resolution-mode="import"/>\n`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyAlternateResultScenario(
        /*forTsserver*/ false,
        (subScenario, sys, edits) =>
            verifyTscWatch({
                scenario: "moduleResolution",
                subScenario,
                sys,
                commandLineArgs: ["-w", "--extendedDiagnostics"],
                edits: edits(),
            }),
    );

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "ambient module names are resolved correctly",
        commandLineArgs: ["-w", "--extendedDiagnostics", "--explainFiles"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        noEmit: true,
                        traceResolution: true,
                    },
                    include: ["**/*.ts"],
                }),
                "/home/src/workspaces/project/witha/node_modules/mymodule/index.d.ts": dedent`
                    declare module 'mymodule' {
                        export function readFile(): void;
                    }
                    declare module 'mymoduleutils' {
                        export function promisify(): void;
                    }
                `,
                "/home/src/workspaces/project/witha/a.ts": dedent`
                    import { readFile } from 'mymodule';
                    import { promisify, promisify2 } from 'mymoduleutils';
                    readFile();
                    promisify();
                    promisify2();
                `,
                "/home/src/workspaces/project/withb/node_modules/mymodule/index.d.ts": dedent`
                    declare module 'mymodule' {
                        export function readFile(): void;
                    }
                    declare module 'mymoduleutils' {
                        export function promisify2(): void;
                    }
                `,
                "/home/src/workspaces/project/withb/b.ts": dedent`
                    import { readFile } from 'mymodule';
                    import { promisify, promisify2 } from 'mymoduleutils';
                    readFile();
                    promisify();
                    promisify2();
                `,
            }),
        edits: [
            {
                caption: "remove a file that will remove module augmentation",
                edit: sys => {
                    sys.replaceFileText("/home/src/workspaces/project/withb/b.ts", `import { readFile } from 'mymodule';`, "");
                    sys.deleteFile("/home/src/workspaces/project/withb/node_modules/mymodule/index.d.ts");
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "write a file that will add augmentation",
                edit: sys => {
                    sys.ensureFileOrFolder({
                        path: "/home/src/workspaces/project/withb/node_modules/mymoduleutils/index.d.ts",
                        content: dedent`
                            declare module 'mymoduleutils' {
                                export function promisify2(): void;
                            }
                        `,
                    });
                    sys.replaceFileText("/home/src/workspaces/project/withb/b.ts", `readFile();`, "");
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "type reference resolutions with impliedMode",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/user/username/projects/myproject/package.json": jsonToReadableText({
                    name: "myproject",
                    version: "1.0.0",
                    type: "module",
                }),
                "/user/username/projects/myproject/tsconfig.json": jsonToReadableText({
                    compilerOptions: compilerOptionsToConfigJson({
                        moduleResolution: ModuleResolutionKind.Node16,
                        module: ModuleKind.Node16,
                        moduleDetection: ModuleDetectionKind.Legacy,
                        types: [],
                    }),
                }),
                "/user/username/projects/myproject/index.ts": dedent`
                    /// <reference types="pkg"/>
                    interface LocalInterface extends RequireInterface {}
                `,
                "/user/username/projects/myproject/node_modules/@types/pkg/package.json": jsonToReadableText({
                    name: "pkg",
                    version: "0.0.1",
                    exports: {
                        import: "./import.js",
                        require: "./require.js",
                    },
                }),
                "/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts": dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `,
                "/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts": dedent`
                    export {};
                    declare global {
                        interface RequireInterface {}
                    }
                `,
            }, { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution", "--explainFiles"],
        edits: [
            {
                caption: "Modify package json",
                edit: sys =>
                    sys.prependFile(
                        "/user/username/projects/myproject/package.json",
                        jsonToReadableText({
                            name: "myproject",
                            version: "1.0.0",
                        }),
                    ),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "late discovered dependency symlink",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspace/packageA/index.d.ts": dedent`
                    export declare class Foo {
                        private f: any;
                    }
                `,
                "/home/src/workspace/packageB/package.json": jsonToReadableText({
                    private: true,
                    dependencies: {
                        "package-a": "file:../packageA",
                    },
                }),
                "/home/src/workspace/packageB/index.d.ts": dedent`
                    import { Foo } from "package-a";
                    export declare function invoke(): Foo;
                `,
                "/home/src/workspace/packageC/package.json": jsonToReadableText({
                    private: true,
                    dependencies: {
                        "package-b": "file:../packageB",
                        "package-a": "file:../packageA",
                    },
                }),
                "/home/src/workspace/packageC/index.ts": dedent`
                    import * as pkg from "package-b";

                    export const a = pkg.invoke();
                `,
                "/home/src/workspace/packageC/node_modules/package-a": { symLink: "/home/src/workspace/packageA" },
                "/home/src/workspace/packageB/node_modules/package-a": { symLink: "/home/src/workspace/packageA" },
                "/home/src/workspace/packageC/node_modules/package-b": { symLink: "/home/src/workspace/packageB" },
                "/home/src/workspace/packageC/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        declaration: true,
                    },
                }),
            }, { currentDirectory: "/home/src/workspace/packageC" }),
        commandLineArgs: ["--traceResolution", "--explainFiles", "--watch"],
        edits: [
            {
                caption: "change index.ts",
                edit: fs =>
                    fs.writeFile(
                        "/home/src/workspace/packageC/index.ts",
                        dedent`
                            import * as pkg from "package-b";
                
                            export const aa = pkg.invoke();`,
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});
