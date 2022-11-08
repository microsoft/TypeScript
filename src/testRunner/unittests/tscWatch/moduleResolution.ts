import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsc-watch:: moduleResolution", () => {
    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `watches for changes to package-json main fields`,
        sys: () => ts.tscWatch.createWatchedSystem([
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg1/package.json`,
                content: JSON.stringify({
                    name: "pkg1",
                    version: "1.0.0",
                    main: "build/index.js",
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg1/index.ts`,
                content: Utils.dedent`
            import type { TheNum } from 'pkg2'
            export const theNum: TheNum = 42;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg1/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        outDir: "build",
                    },
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/build/const.d.ts`,
                content: `export type TheNum = 42;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/build/index.d.ts`,
                content: `export type { TheNum } from './const.js';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/build/other.d.ts`,
                content: `export type TheStr = string;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/package.json`,
                content: JSON.stringify({
                    name: "pkg2",
                    version: "1.0.0",
                    main: "build/index.js",
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg2`,
                symLink: `${ts.tscWatch.projectRoot}/packages/pkg2`,
            },
            ts.tscWatch.libFile
        ], { currentDirectory: ts.tscWatch.projectRoot }),
        commandLineArgs: ["--project", "./packages/pkg1/tsconfig.json", "-w", "--traceResolution"],
        changes: [
            {
                caption: "reports import errors after change to package file",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg2/package.json`, `index.js`, `other.js`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
            {
                caption: "removes those errors when a package file is changed back",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg2/package.json`, `other.js`, `index.js`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                    sys.runQueuedTimeoutCallbacks(); // actual update
                },
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "diagnostics from cache",
        sys: () => ts.tscWatch.createWatchedSystem([
            {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
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
                path: `${ts.tscWatch.projectRoot}/package.json`,
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
                path: `${ts.tscWatch.projectRoot}/index.ts`,
                content: Utils.dedent`
                        import * as me from "@this/package";
                        me.thing()
                        export function thing(): void {}
                    `
            },
            ts.tscWatch.libFile
        ], { currentDirectory: ts.tscWatch.projectRoot }),
        commandLineArgs: ["-w", "--traceResolution"],
        changes: ts.emptyArray
    });

    describe("package json file is edited", () => {
        function getSys(packageFileContents: string) {
            const configFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/src/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        target: "es2016",
                        module: "Node16",
                        outDir: "../out"
                    }
                })
            };
            const packageFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/package.json`,
                content: packageFileContents
            };
            const fileA: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/src/fileA.ts`,
                content: Utils.dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `
            };
            const fileB: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/project/src/fileB.mts`,
                content: Utils.dedent`
                        export function foo() {
                        }
                    `
            };
            return ts.tscWatch.createWatchedSystem(
                [configFile, fileA, fileB, packageFile, { ...ts.tscWatch.libFile, path: "/a/lib/lib.es2016.full.d.ts" }],
                { currentDirectory: ts.tscWatch.projectRoot }
            );
        }
        ts.tscWatch.verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: "package json file is edited",
            commandLineArgs: ["--w", "--p", "src", "--extendedDiagnostics", "-traceResolution", "--explainFiles"],
            sys: () => getSys(JSON.stringify({ name: "app", version: "1.0.0" })),
            changes: [
                {
                    caption: "Modify package json file to add type module",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/package.json`, JSON.stringify({
                        name: "app", version: "1.0.0", type: "module",
                    })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package.json file to remove type module",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to add type module",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/package.json`, JSON.stringify({
                        name: "app", version: "1.0.0", type: "module",
                    })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
            ],
        });

        ts.tscWatch.verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: "package json file is edited when package json with type module exists",
            commandLineArgs: ["--w", "--p", "src", "--extendedDiagnostics", "-traceResolution", "--explainFiles"],
            sys: () => getSys(JSON.stringify({
                name: "app", version: "1.0.0", type: "module",
            })),
            changes: [
                {
                    caption: "Modify package.json file to remove type module",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to add type module",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/package.json`, JSON.stringify({
                        name: "app", version: "1.0.0", type: "module",
                    })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Modify package json file to without type module",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
                {
                    caption: "Delete package.json",
                    change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/package.json`),
                    timeouts: host => {
                        host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                        host.runQueuedTimeoutCallbacks(); // Actual update
                    },
                },
            ],
        });
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "module resolutions from file are partially used",
        sys: () => ts.tscWatch.createWatchedSystem([
            {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { moduleResolution: "node16" },
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/index.ts`,
                content: Utils.dedent`
                        import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };
                        import type { RequireInterface } from "pkg1" assert { "resolution-mode": "require" };
                        import {x} from "./a";
                    `
            },
            {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: Utils.dedent`
                        export const x = 10;
                    `
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg/package.json`,
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
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg/import.d.ts`,
                content: `export interface ImportInterface {}`
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg/require.d.ts`,
                content: `export interface RequireInterface {}`
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg1/package.json`,
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
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg1/import.d.ts`,
                content: `export interface ImportInterface {}`
            },
            ts.tscWatch.libFile
        ], { currentDirectory: ts.tscWatch.projectRoot }),
        commandLineArgs: ["-w", "--traceResolution"],
        changes: [
            {
                caption: "modify aFile by adding import",
                change: sys => sys.appendFile(`${ts.tscWatch.projectRoot}/a.ts`, `import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" }`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "type reference resolutions reuse",
        sys: () => ts.tscWatch.createWatchedSystem([
            {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { moduleResolution: "node16" },
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/index.ts`,
                content: Utils.dedent`
                    /// <reference types="pkg" resolution-mode="import"/>
                    /// <reference types="pkg1" resolution-mode="require"/>
                    export interface LocalInterface extends RequireInterface {}
                `
            },
            {
                path: `${ts.tscWatch.projectRoot}/a.ts`,
                content: Utils.dedent`
                    export const x = 10;
                `
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg/package.json`,
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
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg/import.d.ts`,
                content: Utils.dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg/require.d.ts`,
                content: Utils.dedent`
                    export {};
                    declare global {
                        interface RequireInterface {}
                    }
                `
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg1/package.json`,
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
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg1/import.d.ts`,
                content: Utils.dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/@types/pkg2/index.d.ts`,
                content: `export const x = 10;`
            },
            ts.tscWatch.libFile
        ], { currentDirectory: ts.tscWatch.projectRoot }),
        commandLineArgs: ["-w", "--traceResolution"],
        changes: [
            {
                caption: "modify aFile by adding import",
                change: sys => sys.prependFile(`${ts.tscWatch.projectRoot}/a.ts`, `/// <reference types="pkg" resolution-mode="import"/>\n`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            }
        ]
    });
});