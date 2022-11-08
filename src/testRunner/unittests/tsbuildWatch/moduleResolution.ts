import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsbuildWatch:: watchMode:: moduleResolution", () => {
    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolutionCache",
        subScenario: "handles the cache correctly when two projects use different module resolution settings",
        sys: () => ts.tscWatch.createWatchedSystem(
            [
                { path: `${ts.tscWatch.projectRoot}/project1/index.ts`, content: `import { foo } from "file";` },
                { path: `${ts.tscWatch.projectRoot}/project1/node_modules/file/index.d.ts`, content: "export const foo = 10;" },
                {
                    path: `${ts.tscWatch.projectRoot}/project1/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, types: ["foo", "bar"] },
                        files: ["index.ts"]
                    })
                },
                { path: `${ts.tscWatch.projectRoot}/project2/index.ts`, content: `import { foo } from "file";` },
                { path: `${ts.tscWatch.projectRoot}/project2/file.d.ts`, content: "export const foo = 10;" },
                {
                    path: `${ts.tscWatch.projectRoot}/project2/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, types: ["foo"], moduleResolution: "classic" },
                        files: ["index.ts"]
                    })
                },
                { path: `${ts.tscWatch.projectRoot}/node_modules/@types/foo/index.d.ts`, content: "export const foo = 10;" },
                { path: `${ts.tscWatch.projectRoot}/node_modules/@types/bar/index.d.ts`, content: "export const bar = 10;" },
                {
                    path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        files: [],
                        references: [
                            { path: "./project1" },
                            { path: "./project2" }
                        ]
                    })
                },
                ts.tscWatch.libFile
            ],
            { currentDirectory: ts.tscWatch.projectRoot }
        ),
        commandLineArgs: ["--b", "-w", "-v"],
        changes: [
            {
                caption: "Append text",
                change: sys => sys.appendFile(`${ts.tscWatch.projectRoot}/project1/index.ts`, "const bar = 10;"),
                timeouts: sys => {
                    sys.checkTimeoutQueueLengthAndRun(1); // build project1 and solution
                    sys.checkTimeoutQueueLength(0);
                }
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly with cts and mts extensions`,
        sys: () => ts.tscWatch.createWatchedSystem([
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg1/package.json`,
                content: JSON.stringify({
                    name: "pkg1",
                    version: "1.0.0",
                    main: "build/index.js",
                    type: "module"
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
                        module: "node16",
                    },
                    references: [{ path: "../pkg2" }]
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/const.cts`,
                content: `export type TheNum = 42;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/index.ts`,
                content: `export type { TheNum } from './const.cjs';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "build",
                        module: "node16",
                    }
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/package.json`,
                content: JSON.stringify({
                    name: "pkg2",
                    version: "1.0.0",
                    main: "build/index.js",
                    type: "module"
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/node_modules/pkg2`,
                symLink: `${ts.tscWatch.projectRoot}/packages/pkg2`,
            },
            { ...ts.tscWatch.libFile, path: `/a/lib/lib.es2022.full.d.ts` }
        ], { currentDirectory: ts.tscWatch.projectRoot }),
        commandLineArgs: ["-b", "packages/pkg1", "-w", "--verbose", "--traceResolution"],
        changes: [
            {
                caption: "reports import errors after change to package file",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg1/package.json`, `"module"`, `"commonjs"`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks
            },
            {
                caption: "removes those errors when a package file is changed back",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg1/package.json`, `"commonjs"`, `"module"`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: "reports import errors after change to package file",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg1/package.json`, `"module"`, `"commonjs"`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks
            },
            {
                caption: "removes those errors when a package file is changed to cjs extensions",
                change: sys => {
                    ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg2/package.json`, `"build/index.js"`, `"build/index.cjs"`);
                    sys.renameFile(`${ts.tscWatch.projectRoot}/packages/pkg2/index.ts`, `${ts.tscWatch.projectRoot}/packages/pkg2/index.cts`);
                },
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // building pkg2
                    sys.runQueuedTimeoutCallbacks(); // building pkg1
                },
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `build mode watches for changes to package-json main fields`,
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
                    references: [{ path: "../pkg2" }]
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "build",
                        baseUrl: ".",
                    }
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/const.ts`,
                content: `export type TheNum = 42;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/index.ts`,
                content: `export type { TheNum } from './const.js';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/other.ts`,
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
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "-w", "--traceResolution"],
        changes: [
            {
                caption: "reports import errors after change to package file",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg2/package.json`, `index.js`, `other.js`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
            {
                caption: "removes those errors when a package file is changed back",
                change: sys => ts.tscWatch.replaceFileText(sys, `${ts.tscWatch.projectRoot}/packages/pkg2/package.json`, `other.js`, `index.js`),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });
});