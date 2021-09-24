namespace ts.tscWatch {
    describe("unittests:: tsbuild:: moduleResolution:: handles the modules and options from referenced project correctly", () => {
        function sys(optionsToExtend?: CompilerOptions) {
            return createWatchedSystem([
                {
                    path: `${projectRoot}/packages/pkg1/index.ts`,
                    content: Utils.dedent`
                    import type { TheNum } from 'pkg2'
                    export const theNum: TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg1/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { outDir: "build", ...optionsToExtend },
                        references: [{ path: "../pkg2" }]
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/const.ts`,
                    content: `export type TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/index.ts`,
                    content: `export type { TheNum } from 'const';`
                },
                {
                    path: `${projectRoot}/packages/pkg2/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "build",
                            baseUrl: ".",
                            ...optionsToExtend
                        }
                    })
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
            ], { currentDirectory: projectRoot });
        }

        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `resolves specifier in output declaration file from referenced project correctly`,
            sys,
            commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
            changes: emptyArray
        });

        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `resolves specifier in output declaration file from referenced project correctly with preserveSymlinks`,
            sys: () => sys({ preserveSymlinks: true }),
            commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
            changes: emptyArray
        });

        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `resolves specifier in output declaration file from referenced project correctly with cts and mts extensions`,
            sys: () => createWatchedSystem([
                {
                    path: `${projectRoot}/packages/pkg1/package.json`,
                    content: JSON.stringify({
                        name: "pkg1",
                        version: "1.0.0",
                        main: "build/index.js",
                        type: "module"
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
                            module: "node12",
                        },
                        references: [{ path: "../pkg2" }]
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/const.cts`,
                    content: `export type TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/index.ts`,
                    content: `export type { TheNum } from './const.cjs';`
                },
                {
                    path: `${projectRoot}/packages/pkg2/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "build",
                            module: "node12",
                        }
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/package.json`,
                    content: JSON.stringify({
                        name: "pkg2",
                        version: "1.0.0",
                        main: "build/index.js",
                        type: "module"
                    })
                },
                {
                    path: `${projectRoot}/node_modules/pkg2`,
                    symLink: `${projectRoot}/packages/pkg2`,
                },
                { ...libFile, path: `/a/lib/lib.es2020.full.d.ts` }
            ], { currentDirectory: projectRoot }),
            commandLineArgs: ["-b", "packages/pkg1", "-w", "--verbose", "--traceResolution"],
            changes: [
                {
                    caption: "reports import errors after change to package file",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg1/package.json`, `"module"`, `"commonjs"`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "removes those errors when a package file is changed back",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg1/package.json`, `"commonjs"`, `"module"`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "reports import errors after change to package file",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg1/package.json`, `"module"`, `"commonjs"`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "removes those errors when a package file is changed to cjs extensions",
                    change: sys => {
                        replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `"build/index.js"`, `"build/index.cjs"`);
                        sys.renameFile(`${projectRoot}/packages/pkg2/index.ts`, `${projectRoot}/packages/pkg2/index.cts`);
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });

        verifyTsc({
            scenario: "moduleResolution",
            subScenario: `type reference resolution uses correct options for different resolution options referenced project`,
            fs: () => loadProjectFromFiles({
                "/src/packages/pkg1_index.ts": `export const theNum: TheNum = "type1";`,
                "/src/packages/pkg1.tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot1"] },
                    files: ["./pkg1_index.ts"]
                }),
                "/src/packages/typeroot1/sometype/index.d.ts": Utils.dedent`declare type TheNum = "type1";`,
                "/src/packages/pkg2_index.ts": `export const theNum: TheNum2 = "type2";`,
                "/src/packages/pkg2.tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot2"] },
                    files: ["./pkg2_index.ts"]
                }),
                "/src/packages/typeroot2/sometype/index.d.ts": Utils.dedent`declare type TheNum2 = "type2";`,
            }),
            commandLineArgs: ["-b", "/src/packages/pkg1.tsconfig.json", "/src/packages/pkg2.tsconfig.json", "--verbose", "--traceResolution"],
        });

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
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "removes those errors when a package file is changed back",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `other.js`, `index.js`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });


        verifyTscWatch({
            scenario: "moduleResolution",
            subScenario: `build mode watches for changes to package-json main fields`,
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
                        references: [{ path: "../pkg2" }]
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            outDir: "build",
                            baseUrl: ".",
                        }
                    })
                },
                {
                    path: `${projectRoot}/packages/pkg2/const.ts`,
                    content: `export type TheNum = 42;`
                },
                {
                    path: `${projectRoot}/packages/pkg2/index.ts`,
                    content: `export type { TheNum } from './const.js';`
                },
                {
                    path: `${projectRoot}/packages/pkg2/other.ts`,
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
            commandLineArgs: ["-b", "packages/pkg1", "--verbose", "-w", "--traceResolution"],
            changes: [
                {
                    caption: "reports import errors after change to package file",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `index.js`, `other.js`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
                {
                    caption: "removes those errors when a package file is changed back",
                    change: sys => replaceFileText(sys, `${projectRoot}/packages/pkg2/package.json`, `other.js`, `index.js`),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });
    });
}
