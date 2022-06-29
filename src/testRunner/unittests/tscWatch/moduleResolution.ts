namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: moduleResolution", () => {
        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `watches for changes to package-json main fields`,
            sys: () => createWatchedSystem([
                {
                    path: `${projectRoot}/packages/pkg1/package.json`,
                    content: JSON.stringify({
                        name: "pkg1",
                        version: "1.0.0",
                        main: "build/index.js",
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg1/index.ts`,
                    content: Utils.dedent`
            import type { TheNum } from 'pkg2'
            export const theNum: TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg1/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            outDir: "build",
                        },
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/build/const.d.ts`,
                    content: `export type TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/build/index.d.ts`,
                    content: `export type { TheNum } from './const.js';`
                },
                {
                    path: `${projectRoot}/packages/pkg2/build/other.d.ts`,
                    content: `export type TheStr = string;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/package.json`,
                    content: JSON.stringify({
                        name: "pkg2",
                        version: "1.0.0",
                        main: "build/index.js",
                    })
                },
                {
                    path: `${projectRoot}/node_modules/pkg2`,
                    symLink: `${projectRoot}/packages/pkg2`,
                },
                libFile
            ], { currentDirectory: projectRoot }),
            commandLineArgs: ["--project", "./packages/pkg1/tsconfig.json", "-w", "--traceResolution"],
            changes: [
                {
                    caption: "reports import errors after change to package file",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `index.js`, `other.js`),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // invalidates failed lookups
                        sys.runQueuedTimeoutCallbacks(); // actual update
                    },
                },
                {
                    caption: "removes those errors when a package file is changed back",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `other.js`, `index.js`),
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
                    path: `${projectRoot}/tsconfig.json`,
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
                    path: `${projectRoot}/package.json`,
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
                    path: `${projectRoot}/index.ts`,
                    content: Utils.dedent`
                        import * as me from "@this/package";
                        me.thing()
                        export function thing(): void {}
                    `
                },
                libFile
            ], { currentDirectory: projectRoot }),
            commandLineArgs: ["-w", "--traceResolution"],
            changes: emptyArray
        });

        describe("package json file is edited", () => {
            function getSys(packageFileContents: string) {
                const configFile: File = {
                    path: `${projectRoot}/src/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            target: "es2016",
                            module: "Node16",
                            outDir: "../out"
                        }
                    })
                };
                const packageFile: File = {
                    path: `${projectRoot}/package.json`,
                    content: packageFileContents
                };
                const fileA: File = {
                    path: `${projectRoot}/src/fileA.ts`,
                    content: Utils.dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `
                };
                const fileB: File = {
                    path: `${projectRoot}/project/src/fileB.mts`,
                    content: Utils.dedent`
                        export function foo() {
                        }
                    `
                };
                return createWatchedSystem(
                    [configFile, fileA, fileB, packageFile, { ...libFile, path: "/a/lib/lib.es2016.full.d.ts" }],
                    { currentDirectory: projectRoot }
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
                        change: sys => sys.writeFile(`${projectRoot}/package.json`, JSON.stringify({
                            name: "app", version: "1.0.0", type: "module",
                        })),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Modify package.json file to remove type module",
                        change: sys => sys.writeFile(`${projectRoot}/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Delete package.json",
                        change: sys => sys.deleteFile(`${projectRoot}/package.json`),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Modify package json file to add type module",
                        change: sys => sys.writeFile(`${projectRoot}/package.json`, JSON.stringify({
                            name: "app", version: "1.0.0", type: "module",
                        })),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Delete package.json",
                        change: sys => sys.deleteFile(`${projectRoot}/package.json`),
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
                        change: sys => sys.writeFile(`${projectRoot}/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Modify package json file to add type module",
                        change: sys => sys.writeFile(`${projectRoot}/package.json`, JSON.stringify({
                            name: "app", version: "1.0.0", type: "module",
                        })),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Delete package.json",
                        change: sys => sys.deleteFile(`${projectRoot}/package.json`),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Modify package json file to without type module",
                        change: sys => sys.writeFile(`${projectRoot}/package.json`, JSON.stringify({ name: "app", version: "1.0.0" })),
                        timeouts: host => {
                            host.runQueuedTimeoutCallbacks(); // Failed lookup updates
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        },
                    },
                    {
                        caption: "Delete package.json",
                        change: sys => sys.deleteFile(`${projectRoot}/package.json`),
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
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { moduleResolution: "node16" },
                    })
                },
                {
                    path: `${projectRoot}/index.ts`,
                    content: Utils.dedent`
                        import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };
                        import type { RequireInterface } from "pkg1" assert { "resolution-mode": "require" };
                        import {x} from "./a";
                    `
                },
                {
                    path: `${projectRoot}/a.ts`,
                    content: Utils.dedent`
                        export const x = 10;
                    `
                },
                {
                    path: `${projectRoot}/node_modules/pkg/package.json`,
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
                    path: `${projectRoot}/node_modules/pkg/import.d.ts`,
                    content: `export interface ImportInterface {}`
                },
                {
                    path: `${projectRoot}/node_modules/pkg/require.d.ts`,
                    content: `export interface RequireInterface {}`
                },
                {
                    path: `${projectRoot}/node_modules/pkg1/package.json`,
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
                    path: `${projectRoot}/node_modules/pkg1/import.d.ts`,
                    content: `export interface ImportInterface {}`
                },
                libFile
            ], { currentDirectory: projectRoot }),
            commandLineArgs: ["-w", "--traceResolution"],
            changes: [
                {
                    caption: "modify aFile by adding import",
                    change: sys => sys.appendFile(`${projectRoot}/a.ts`, `import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" }`),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                }
            ]
        });

        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: "type reference resolutions reuse",
            sys: () => createWatchedSystem([
                {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { moduleResolution: "node16" },
                    })
                },
                {
                    path: `${projectRoot}/index.ts`,
                    content: Utils.dedent`
                        /// <reference types="pkg" resolution-mode="import"/>
                        /// <reference types="pkg1" resolution-mode="require"/>
                        export interface LocalInterface extends RequireInterface {}
                    `
                },
                {
                    path: `${projectRoot}/a.ts`,
                    content: Utils.dedent`
                        export const x = 10;
                    `
                },
                {
                    path: `${projectRoot}/node_modules/pkg/package.json`,
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
                    path: `${projectRoot}/node_modules/pkg/import.d.ts`,
                    content: Utils.dedent`
                        export {};
                        declare global {
                            interface ImportInterface {}
                        }
                    `
                },
                {
                    path: `${projectRoot}/node_modules/pkg/require.d.ts`,
                    content: Utils.dedent`
                        export {};
                        declare global {
                            interface RequireInterface {}
                        }
                    `
                },
                {
                    path: `${projectRoot}/node_modules/pkg1/package.json`,
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
                    path: `${projectRoot}/node_modules/pkg1/import.d.ts`,
                    content: Utils.dedent`
                        export {};
                        declare global {
                            interface ImportInterface {}
                        }
                    `
                },
                {
                    path: `${projectRoot}/node_modules/@types/pkg2/index.d.ts`,
                    content: `export const x = 10;`
                },
                libFile
            ], { currentDirectory: projectRoot }),
            commandLineArgs: ["-w", "--traceResolution"],
            changes: [
                {
                    caption: "modify aFile by adding import",
                    change: sys => sys.prependFile(`${projectRoot}/a.ts`, `/// <reference types="pkg" resolution-mode="import"/>\n`),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                }
            ]
        });
    });
}