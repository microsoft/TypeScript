import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";
import { Symlink } from "../../_namespaces/vfs";
import { jsonToReadableText } from "../helpers";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc";
import { verifyTscWatch } from "../helpers/tscWatch";
import { loadProjectFromFiles } from "../helpers/vfs";
import {
    createWatchedSystem,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsbuild:: moduleResolution:: handles the modules and options from referenced project correctly", () => {
    function sys(optionsToExtend?: ts.CompilerOptions) {
        return createWatchedSystem([
            {
                path: `/user/username/projects/myproject/packages/pkg1/index.ts`,
                content: Utils.dedent`
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
            libFile,
        ], { currentDirectory: "/user/username/projects/myproject" });
    }

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly`,
        sys,
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
    });

    verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly with preserveSymlinks`,
        sys: () => sys({ preserveSymlinks: true }),
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: `type reference resolution uses correct options for different resolution options referenced project`,
        fs: () =>
            loadProjectFromFiles({
                "/src/packages/pkg1_index.ts": `export const theNum: TheNum = "type1";`,
                "/src/packages/pkg1.tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot1"] },
                    files: ["./pkg1_index.ts"],
                }),
                "/src/packages/typeroot1/sometype/index.d.ts": Utils.dedent`declare type TheNum = "type1";`,
                "/src/packages/pkg2_index.ts": `export const theNum: TheNum2 = "type2";`,
                "/src/packages/pkg2.tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot2"] },
                    files: ["./pkg2_index.ts"],
                }),
                "/src/packages/typeroot2/sometype/index.d.ts": Utils.dedent`declare type TheNum2 = "type2";`,
            }),
        commandLineArgs: ["-b", "/src/packages/pkg1.tsconfig.json", "/src/packages/pkg2.tsconfig.json", "--verbose", "--traceResolution"],
    });
});

describe("unittests:: tsbuild:: moduleResolution:: impliedNodeFormat differs between projects for shared file", () => {
    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "impliedNodeFormat differs between projects for shared file",
        fs: () =>
            loadProjectFromFiles({
                "/src/projects/a/src/index.ts": "",
                "/src/projects/a/tsconfig.json": jsonToReadableText({
                    compilerOptions: { strict: true },
                }),
                "/src/projects/b/src/index.ts": Utils.dedent`
                    import pg from "pg";
                    pg.foo();
                `,
                "/src/projects/b/tsconfig.json": jsonToReadableText({
                    compilerOptions: { strict: true, module: "node16" },
                }),
                "/src/projects/b/package.json": jsonToReadableText({
                    name: "b",
                    type: "module",
                }),
                "/src/projects/node_modules/@types/pg/index.d.ts": "export function foo(): void;",
                "/src/projects/node_modules/@types/pg/package.json": jsonToReadableText({
                    name: "@types/pg",
                    types: "index.d.ts",
                }),
            }),
        modifyFs: fs => fs.writeFileSync("/lib/lib.es2022.full.d.ts", libFile.content),
        commandLineArgs: ["-b", "/src/projects/a", "/src/projects/b", "--verbose", "--traceResolution", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });
});

describe("unittests:: tsbuild:: moduleResolution:: resolution sharing", () => {
    function fs() {
        return loadProjectFromFiles({
            "/src/projects/project/packages/a/index.js": `export const a = 'a';`,
            "/src/projects/project/packages/a/test/index.js": `import 'a';`,
            "/src/projects/project/packages/a/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    checkJs: true,
                    composite: true,
                    declaration: true,
                    emitDeclarationOnly: true,
                    module: "nodenext",
                    outDir: "types",
                },
            }),
            "/src/projects/project/packages/a/package.json": jsonToReadableText({
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
            "/src/projects/project/packages/b/index.js": `export { a } from 'a';`,
            "/src/projects/project/packages/b/tsconfig.json": jsonToReadableText({
                references: [{ path: "../a" }],
                compilerOptions: {
                    checkJs: true,
                    module: "nodenext",
                    noEmit: true,
                    noImplicitAny: true,
                },
            }),
            "/src/projects/project/packages/b/package.json": jsonToReadableText({
                name: "b",
                version: "0.0.0",
                type: "module",
            }),
            "/src/projects/project/node_modules/a": new Symlink("/src/projects/project/packages/a"),
            "/lib/lib.esnext.full.d.ts": libFile.content,
        }, { cwd: "/src/projects/project" });
    }

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "shared resolution should not report error",
        fs,
        commandLineArgs: ["-b", "packages/b", "--verbose", "--traceResolution", "--explainFiles"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "when resolution is not shared",
        fs,
        commandLineArgs: ["-b", "packages/a", "--verbose", "--traceResolution", "--explainFiles"],
        edits: [{
            caption: "build b",
            edit: ts.noop,
            commandLineArgs: ["-b", "packages/b", "--verbose", "--traceResolution", "--explainFiles"],
        }],
    });
});
