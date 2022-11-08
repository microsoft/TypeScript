import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";
import { createWatchedSystem, File, libFile } from "../virtualFileSystemWithWatch";
import { verifyTscWatch } from "./helpers";

describe("unittests:: tsc-watch:: moduleResolution", () => {
    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `watches for changes to package-json main fields`,
        sys: () => createWatchedSystem([
            {
                path: `/user/username/projects/myproject/packages/pkg1/package.json`,
                content: JSON.stringify({
                    name: "pkg1",
                    version: "1.0.0",
                    main: "build/index.js",
                })
            },
            {
                path: `/user/username/projects/myproject/packages/pkg1/index.ts`,
                content: Utils.dedent`
            import type { TheNum } from 'pkg2'
            export const theNum: TheNum = 42;`
            },
            {
                path: `/user/username/projects/myproject/packages/pkg1/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        outDir: "build",
                    },
                })
            },
            {
                path: `/user/username/projects/myproject/packages/pkg2/build/const.d.ts`,
                content: `export type TheNum = 42;`
            },
            {
                path: `/user/username/projects/myproject/packages/pkg2/build/index.d.ts`,
                content: `export type { TheNum } from './const.js';`
            },
            {
                path: `/user/username/projects/myproject/packages/pkg2/build/other.d.ts`,
                content: `export type TheStr = string;`
            },
            {
                path: `/user/username/projects/myproject/packages/pkg2/package.json`,
                content: JSON.stringify({
                    name: "pkg2",
                    version: "1.0.0",
                    main: "build/index.js",
                })
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg2`,
                symLink: `/user/username/projects/myproject/packages/pkg2`,
            },
            libFile
        ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["--project", "./packages/pkg1/tsconfig.json", "-w", "--traceResolution"],
        changes: [
            {
                caption: "reports import errors after change to package file",
                change: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `index.js`, `other.js`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "removes those errors when a package file is changed back",
                change: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `other.js`, `index.js`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
        ]
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "diagnostics from cache",
        sys: () => createWatchedSystem([
            {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        moduleResolution: "nodenext",
                        outDir: "./dist",
                        declaration: true,
                        declarationDir: "./types"
                    },
                })
            },
            {
                path: `/user/username/projects/myproject/package.json`,
                content: JSON.stringify({
                    name: "@this/package",
                    type: "module",
                    exports: {
                        ".": {
                            default: "./dist/index.js",
                            types: "./types/index.d.ts"
                        }
                    }
                })
            },
            {
                path: `/user/username/projects/myproject/index.ts`,
                content: Utils.dedent`
                        import * as me from "@this/package";
                        me.thing()
                        export function thing(): void {}
                    `
            },
            libFile
        ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution"],
        changes: ts.emptyArray
    });

    describe("package json file is edited", () => {
        function getSys(packageFileContents: string) {
            const configFile: File = {
                path: `/user/username/projects/myproject/src/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        target: "es2016",
                        module: "Node16",
                        outDir: "../out"
                    }
                })
            };
            const packageFile: File = {
                path: `/user/username/projects/myproject/package.json`,
                content: packageFileContents
            };
            const fileA: File = {
                path: `/user/username/projects/myproject/src/fileA.ts`,
                content: Utils.dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `
            };
            const fileB: File = {
                path: `/user/username/projects/myproject/project/src/fileB.mts`,
                content: Utils.dedent`
                        export function foo() {
                        }
                    `
            };
            return createWatchedSystem(
                [configFile, fileA, fileB, packageFile, { ...libFile, path: "/a/lib/lib.es2016.full.d.ts" }],
                { currentDirectory: "/user/username/projects/myproject" }
            );
        }
        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: "package json file is edited",
            commandLineArgs: ["--w", "--p", "src", "--extendedDiagnostics", "-traceResolution", "--explainFiles"],
            sys: () => getSys(JSON.stringify({ name: "app", version: "1.0.0" })),
            changes: [
                {
                    caption: "Modify package json file to add type module",
                    change: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, JSON.stringify({
                        name: "app", version: "1.0.0", type: "module",
                    })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package.json file to remove type module",
                    change: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to add type module",
                    change: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, JSON.stringify({
                        name: "app", version: "1.0.0", type: "module",
                    })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
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
            sys: () => getSys(JSON.stringify({
                name: "app", version: "1.0.0", type: "module",
            })),
            changes: [
                {
                    caption: "Modify package.json file to remove type module",
                    change: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to add type module",
                    change: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, JSON.stringify({
                        name: "app", version: "1.0.0", type: "module",
                    })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to without type module",
                    change: sys => sys.writeFile(`/user/username/projects/myproject/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`/user/username/projects/myproject/package.json`),
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
        sys: () => createWatchedSystem([
            {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { moduleResolution: "node16" },
                })
            },
            {
                path: `/user/username/projects/myproject/index.ts`,
                content: Utils.dedent`
                        import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };
                        import type { RequireInterface } from "pkg1" assert { "resolution-mode": "require" };
                        import {x} from "./a";
                    `
            },
            {
                path: `/user/username/projects/myproject/a.ts`,
                content: Utils.dedent`
                        export const x = 10;
                    `
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg/package.json`,
                content: JSON.stringify({
                    name: "pkg",
                    version: "0.0.1",
                    exports: {
                        import: "./import.js",
                        require: "./require.js"
                    }
                })
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg/import.d.ts`,
                content: `export interface ImportInterface {}`
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg/require.d.ts`,
                content: `export interface RequireInterface {}`
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg1/package.json`,
                content: JSON.stringify({
                    name: "pkg1",
                    version: "0.0.1",
                    exports: {
                        import: "./import.js",
                        require: "./require.js"
                    }
                })
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg1/import.d.ts`,
                content: `export interface ImportInterface {}`
            },
            libFile
        ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution"],
        changes: [
            {
                caption: "modify aFile by adding import",
                change: sys => sys.appendFile(`/user/username/projects/myproject/a.ts`, `import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" }`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            }
        ]
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "type reference resolutions reuse",
        sys: () => createWatchedSystem([
            {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { moduleResolution: "node16" },
                })
            },
            {
                path: `/user/username/projects/myproject/index.ts`,
                content: Utils.dedent`
                    /// <reference types="pkg" resolution-mode="import"/>
                    /// <reference types="pkg1" resolution-mode="require"/>
                    export interface LocalInterface extends RequireInterface {}
                `
            },
            {
                path: `/user/username/projects/myproject/a.ts`,
                content: Utils.dedent`
                    export const x = 10;
                `
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg/package.json`,
                content: JSON.stringify({
                    name: "pkg",
                    version: "0.0.1",
                    exports: {
                        import: "./import.js",
                        require: "./require.js"
                    }
                })
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg/import.d.ts`,
                content: Utils.dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg/require.d.ts`,
                content: Utils.dedent`
                    export {};
                    declare global {
                        interface RequireInterface {}
                    }
                `
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg1/package.json`,
                content: JSON.stringify({
                    name: "pkg1",
                    version: "0.0.1",
                    exports: {
                        import: "./import.js",
                        require: "./require.js"
                    }
                })
            },
            {
                path: `/user/username/projects/myproject/node_modules/pkg1/import.d.ts`,
                content: Utils.dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `
            },
            {
                path: `/user/username/projects/myproject/node_modules/@types/pkg2/index.d.ts`,
                content: `export const x = 10;`
            },
            libFile
        ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-w", "--traceResolution"],
        changes: [
            {
                caption: "modify aFile by adding import",
                change: sys => sys.prependFile(`/user/username/projects/myproject/a.ts`, `/// <reference types="pkg" resolution-mode="import"/>\n`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            }
        ]
    });
});