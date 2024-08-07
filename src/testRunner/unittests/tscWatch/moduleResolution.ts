import {
    ModuleDetectionKind,
    ModuleKind,
    ModuleResolutionKind,
} from "../../_namespaces/ts.js";
import * as Utils from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    getFsConentsForAlternateResultAtTypesPackageJson,
    getFsContentsForAlternateResult,
    getFsContentsForAlternateResultDts,
    getFsContentsForAlternateResultPackageJson,
} from "../helpers/alternateResult.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import {
    createWatchedSystem,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc-watch:: moduleResolution::", () => {
    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `watches for changes to package-json main fields`,
        sys: () =>
            createWatchedSystem([
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
                    content: Utils.dedent`
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
                libFile,
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
            createWatchedSystem([
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
                    content: Utils.dedent`
                        import * as me from "@this/package";
                        me.thing()
                        export function thing(): void {}
                    `,
                },
                {
                    path: `/user/username/projects/myproject/index2.ts`,
                    content: Utils.dedent`
                        export function thing(): void {}
                    `,
                },
                libFile,
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
                content: Utils.dedent`
                        import { foo } from "./fileB.mjs";
                        foo();
                    `,
            };
            const fileB: File = {
                path: `/user/username/projects/myproject/project/src/fileB.mts`,
                content: Utils.dedent`
                        export function foo() {
                        }
                    `,
            };
            return createWatchedSystem(
                [configFile, fileA, fileB, packageFile, { ...libFile, path: "/a/lib/lib.es2016.full.d.ts" }],
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
            createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: { moduleResolution: "node16" },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/index.ts`,
                    content: Utils.dedent`
                        import type { ImportInterface } from "pkg" assert { "resolution-mode": "import" };
                        import type { RequireInterface } from "pkg1" assert { "resolution-mode": "require" };
                        import {x} from "./a";
                    `,
                },
                {
                    path: `/user/username/projects/myproject/a.ts`,
                    content: Utils.dedent`
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
                libFile,
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
            createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: { moduleResolution: "node16" },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/index.ts`,
                    content: Utils.dedent`
                        import type { ImportInterface } from "pkg" with { "resolution-mode": "import" };
                        import type { RequireInterface } from "pkg1" with { "resolution-mode": "require" };
                        import {x} from "./a";
                    `,
                },
                {
                    path: `/user/username/projects/myproject/a.ts`,
                    content: Utils.dedent`
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
                libFile,
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
            createWatchedSystem([
                {
                    path: `/user/username/projects/myproject/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: { moduleResolution: "node16" },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/index.ts`,
                    content: Utils.dedent`
                    /// <reference types="pkg" resolution-mode="import"/>
                    /// <reference types="pkg1" resolution-mode="require"/>
                    export interface LocalInterface extends RequireInterface {}
                `,
                },
                {
                    path: `/user/username/projects/myproject/a.ts`,
                    content: Utils.dedent`
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
                    content: Utils.dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `,
                },
                {
                    path: `/user/username/projects/myproject/node_modules/pkg/require.d.ts`,
                    content: Utils.dedent`
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
                    content: Utils.dedent`
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
                libFile,
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

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "alternateResult",
        sys: () => createWatchedSystem(getFsContentsForAlternateResult(), { currentDirectory: "/home/src/projects/project" }),
        commandLineArgs: ["-w", "--extendedDiagnostics"],
        edits: [
            {
                caption: "delete the alternateResult in @types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/@types/bar/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/foo/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the alternateResult in @types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar/index.d.ts", getFsContentsForAlternateResultDts("bar")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the alternateResult in package/types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo/index.d.ts", getFsContentsForAlternateResultDts("foo")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json from @types so error is fixed",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar/package.json", getFsConentsForAlternateResultAtTypesPackageJson("bar", /*addTypesCondition*/ true)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json so error is fixed",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo/package.json", getFsContentsForAlternateResultPackageJson("foo", /*addTypes*/ true, /*addTypesCondition*/ true)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json from @types so error is introduced",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar2/package.json", getFsConentsForAlternateResultAtTypesPackageJson("bar2", /*addTypesCondition*/ false)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "update package.json so error is introduced",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo2/package.json", getFsContentsForAlternateResultPackageJson("foo2", /*addTypes*/ true, /*addTypesCondition*/ false)),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "delete the alternateResult in @types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/@types/bar2/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: sys => sys.deleteFile("/home/src/projects/project/node_modules/foo2/index.d.ts"),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the alternateResult in @types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/@types/bar2/index.d.ts", getFsContentsForAlternateResultDts("bar2")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
            {
                caption: "add the ndoe10Result in package/types",
                edit: sys => sys.writeFile("/home/src/projects/project/node_modules/foo2/index.d.ts", getFsContentsForAlternateResultDts("foo2")),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks();
                    sys.runQueuedTimeoutCallbacks();
                },
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "ambient module names are resolved correctly",
        commandLineArgs: ["-w", "--extendedDiagnostics", "--explainFiles"],
        sys: () =>
            createWatchedSystem({
                "/home/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        noEmit: true,
                        traceResolution: true,
                    },
                    include: ["**/*.ts"],
                }),
                "/home/src/project/witha/node_modules/mymodule/index.d.ts": Utils.dedent`
                    declare module 'mymodule' {
                        export function readFile(): void;
                    }
                    declare module 'mymoduleutils' {
                        export function promisify(): void;
                    }
                `,
                "/home/src/project/witha/a.ts": Utils.dedent`
                    import { readFile } from 'mymodule';
                    import { promisify, promisify2 } from 'mymoduleutils';
                    readFile();
                    promisify();
                    promisify2();
                `,
                "/home/src/project/withb/node_modules/mymodule/index.d.ts": Utils.dedent`
                    declare module 'mymodule' {
                        export function readFile(): void;
                    }
                    declare module 'mymoduleutils' {
                        export function promisify2(): void;
                    }
                `,
                "/home/src/project/withb/b.ts": Utils.dedent`
                    import { readFile } from 'mymodule';
                    import { promisify, promisify2 } from 'mymoduleutils';
                    readFile();
                    promisify();
                    promisify2();
                `,
                [libFile.path]: libFile.content,
            }, { currentDirectory: "/home/src/project" }),
        edits: [
            {
                caption: "remove a file that will remove module augmentation",
                edit: sys => {
                    sys.replaceFileText("/home/src/project/withb/b.ts", `import { readFile } from 'mymodule';`, "");
                    sys.deleteFile("/home/src/project/withb/node_modules/mymodule/index.d.ts");
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "write a file that will add augmentation",
                edit: sys => {
                    sys.ensureFileOrFolder({
                        path: "/home/src/project/withb/node_modules/mymoduleutils/index.d.ts",
                        content: Utils.dedent`
                            declare module 'mymoduleutils' {
                                export function promisify2(): void;
                            }
                        `,
                    });
                    sys.replaceFileText("/home/src/project/withb/b.ts", `readFile();`, "");
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: "type reference resolutions with impliedMode",
        sys: () =>
            createWatchedSystem({
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
                "/user/username/projects/myproject/index.ts": Utils.dedent`
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
                "/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts": Utils.dedent`
                    export {};
                    declare global {
                        interface ImportInterface {}
                    }
                `,
                "/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts": Utils.dedent`
                    export {};
                    declare global {
                        interface RequireInterface {}
                    }
                `,
                [libFile.path]: libFile.content,
                ["/a/lib/lib.es2022.full.d.ts"]: libFile.content,
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
});
