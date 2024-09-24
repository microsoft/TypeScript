import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: moduleResolution:: handles the modules and options from referenced project correctly", () => {
    function sys(optionsToExtend?: ts.CompilerOptions) {
        return TestServerHost.createWatchedSystem([
            {
                path: `/user/username/projects/myproject/packages/pkg1/index.ts`,
                content: dedent`
                    import type { TheNum } from 'pkg2'
                    export const theNum: TheNum = 42;`,
            },
            {
                path: `/user/username/projects/myproject/packages/pkg1/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { outDir: "build", ...optionsToExtend },
                    references: [{ path: "../pkg2" }],
                }),
            },
            {
                path: `/user/username/projects/myproject/packages/pkg2/const.ts`,
                content: `export type TheNum = 42;`,
            },
            {
                path: `/user/username/projects/myproject/packages/pkg2/index.ts`,
                content: `export type { TheNum } from 'const';`,
            },
            {
                path: `/user/username/projects/myproject/packages/pkg2/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "build",
                        baseUrl: ".",
                        ...optionsToExtend,
                    },
                }),
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
        ], { currentDirectory: "/user/username/projects/myproject" });
    }

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly`,
        sys,
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly with preserveSymlinks`,
        sys: () => sys({ preserveSymlinks: true }),
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: `type reference resolution uses correct options for different resolution options referenced project`,
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/packages/pkg1_index.ts": `export const theNum: TheNum = "type1";`,
                "/home/src/workspaces/project/packages/pkg1.tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot1"] },
                    files: ["./pkg1_index.ts"],
                }),
                "/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts": dedent`declare type TheNum = "type1";`,
                "/home/src/workspaces/project/packages/pkg2_index.ts": `export const theNum: TheNum2 = "type2";`,
                "/home/src/workspaces/project/packages/pkg2.tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot2"] },
                    files: ["./pkg2_index.ts"],
                }),
                "/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts": dedent`declare type TheNum2 = "type2";`,
            }),
        commandLineArgs: ["-b", "packages/pkg1.tsconfig.json", "packages/pkg2.tsconfig.json", "--verbose", "--traceResolution"],
    });
});

describe("unittests:: tsbuild:: moduleResolution:: impliedNodeFormat differs between projects for shared file", () => {
    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "impliedNodeFormat differs between projects for shared file",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/a/src/index.ts": "",
                "/home/src/workspaces/project/a/tsconfig.json": jsonToReadableText({
                    compilerOptions: { strict: true },
                }),
                "/home/src/workspaces/project/b/src/index.ts": dedent`
                    import pg from "pg";
                    pg.foo();
                `,
                "/home/src/workspaces/project/b/tsconfig.json": jsonToReadableText({
                    compilerOptions: { strict: true, module: "node16" },
                }),
                "/home/src/workspaces/project/b/package.json": jsonToReadableText({
                    name: "b",
                    type: "module",
                }),
                "/home/src/workspaces/project/node_modules/@types/pg/index.d.ts": "export function foo(): void;",
                "/home/src/workspaces/project/node_modules/@types/pg/package.json": jsonToReadableText({
                    name: "@types/pg",
                    types: "index.d.ts",
                }),
            }),
        commandLineArgs: ["-b", "a", "b", "--verbose", "--traceResolution", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });
});

describe("unittests:: tsbuild:: moduleResolution:: resolution sharing", () => {
    function sys() {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/project/packages/a/index.js": `export const a = 'a';`,
            "/home/src/workspaces/project/packages/a/test/index.js": `import 'a';`,
            "/home/src/workspaces/project/packages/a/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    checkJs: true,
                    composite: true,
                    declaration: true,
                    emitDeclarationOnly: true,
                    module: "nodenext",
                    outDir: "types",
                },
            }),
            "/home/src/workspaces/project/packages/a/package.json": jsonToReadableText({
                name: "a",
                version: "0.0.0",
                type: "module",
                exports: {
                    ".": {
                        types: "./types/index.d.ts",
                        default: "./index.js",
                    },
                },
            }),
            "/home/src/workspaces/project/packages/b/index.js": `export { a } from 'a';`,
            "/home/src/workspaces/project/packages/b/tsconfig.json": jsonToReadableText({
                references: [{ path: "../a" }],
                compilerOptions: {
                    checkJs: true,
                    module: "nodenext",
                    noEmit: true,
                    noImplicitAny: true,
                },
            }),
            "/home/src/workspaces/project/packages/b/package.json": jsonToReadableText({
                name: "b",
                version: "0.0.0",
                type: "module",
            }),
            "/home/src/workspaces/project/node_modules/a": { symLink: "/home/src/workspaces/project/packages/a" },
        });
    }

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "shared resolution should not report error",
        sys,
        commandLineArgs: ["-b", "packages/b", "--verbose", "--traceResolution", "--explainFiles"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "when resolution is not shared",
        sys,
        commandLineArgs: ["-b", "packages/a", "--verbose", "--traceResolution", "--explainFiles"],
        edits: [{
            caption: "build b",
            edit: ts.noop,
            commandLineArgs: ["-b", "packages/b", "--verbose", "--traceResolution", "--explainFiles"],
        }],
    });
});
