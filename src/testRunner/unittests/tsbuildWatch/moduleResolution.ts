import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: moduleResolution::", () => {
    verifyTscWatch({
        scenario: "moduleResolutionCache",
        subScenario: "handles the cache correctly when two projects use different module resolution settings",
        sys: () =>
            TestServerHost.createWatchedSystem(
                [
                    { path: `/user/username/projects/myproject/project1/index.ts`, content: `import { foo } from "file";` },
                    { path: `/user/username/projects/myproject/project1/node_modules/file/index.d.ts`, content: "export const foo = 10;" },
                    {
                        path: `/user/username/projects/myproject/project1/tsconfig.json`,
                        content: jsonToReadableText({
                            compilerOptions: { composite: true, types: ["foo", "bar"] },
                            files: ["index.ts"],
                        }),
                    },
                    { path: `/user/username/projects/myproject/project2/index.ts`, content: `import { foo } from "file";` },
                    { path: `/user/username/projects/myproject/project2/file.d.ts`, content: "export const foo = 10;" },
                    {
                        path: `/user/username/projects/myproject/project2/tsconfig.json`,
                        content: jsonToReadableText({
                            compilerOptions: { composite: true, types: ["foo"], moduleResolution: "classic" },
                            files: ["index.ts"],
                        }),
                    },
                    { path: `/user/username/projects/myproject/node_modules/@types/foo/index.d.ts`, content: "export const foo = 10;" },
                    { path: `/user/username/projects/myproject/node_modules/@types/bar/index.d.ts`, content: "export const bar = 10;" },
                    {
                        path: `/user/username/projects/myproject/tsconfig.json`,
                        content: jsonToReadableText({
                            files: [],
                            references: [
                                { path: "./project1" },
                                { path: "./project2" },
                            ],
                        }),
                    },
                ],
                { currentDirectory: "/user/username/projects/myproject" },
            ),
        commandLineArgs: ["--b", "-w", "-v"],
        edits: [
            {
                caption: "Append text",
                edit: sys => sys.appendFile(`/user/username/projects/myproject/project1/index.ts`, "const bar = 10;"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build project1 and solution
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly with cts and mts extensions`,
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/packages/pkg1/package.json`,
                    content: jsonToReadableText({
                        name: "pkg1",
                        version: "1.0.0",
                        main: "build/index.js",
                        type: "module",
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
                            module: "node16",
                        },
                        references: [{ path: "../pkg2" }],
                    }),
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/const.cts`,
                    content: `export type TheNum = 42;`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/index.ts`,
                    content: `export type { TheNum } from './const.cjs';`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            composite: true,
                            outDir: "build",
                            module: "node16",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/package.json`,
                    content: jsonToReadableText({
                        name: "pkg2",
                        version: "1.0.0",
                        main: "build/index.js",
                        type: "module",
                    }),
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg2`,
                    symLink: `/user/username/projects/myproject/packages/pkg2`,
                },
            ], { currentDirectory: "/user/username/projects/myproject" }),
        commandLineArgs: ["-b", "packages/pkg1", "-w", "--verbose", "--traceResolution"],
        edits: [
            {
                caption: "reports import errors after change to package file",
                edit: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg1/package.json`, `"module"`, `"commonjs"`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "removes those errors when a package file is changed back",
                edit: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg1/package.json`, `"commonjs"`, `"module"`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "reports import errors after change to package file",
                edit: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg1/package.json`, `"module"`, `"commonjs"`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "removes those errors when a package file is changed to cjs extensions",
                edit: sys => {
                    sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `"build/index.js"`, `"build/index.cjs"`);
                    sys.renameFile(`/user/username/projects/myproject/packages/pkg2/index.ts`, `/user/username/projects/myproject/packages/pkg2/index.cts`);
                },
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // building pkg2
                    sys.runQueuedTimeoutCallbacks(); // building pkg1
                },
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `build mode watches for changes to package-json main fields`,
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
                        references: [{ path: "../pkg2" }],
                    }),
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            composite: true,
                            outDir: "build",
                            baseUrl: ".",
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/const.ts`,
                    content: `export type TheNum = 42;`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/index.ts`,
                    content: `export type { TheNum } from './const.js';`,
                },
                {
                    path: `/user/username/projects/myproject/packages/pkg2/other.ts`,
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
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "-w", "--traceResolution"],
        edits: [
            {
                caption: "reports import errors after change to package file",
                edit: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `index.js`, `other.js`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "removes those errors when a package file is changed back",
                edit: sys => sys.replaceFileText(`/user/username/projects/myproject/packages/pkg2/package.json`, `other.js`, `index.js`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });
});
