import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsbuild:: moduleResolution:: handles the modules and options from referenced project correctly", () => {
    function sys(optionsToExtend?: ts.CompilerOptions) {
        return ts.tscWatch.createWatchedSystem([
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg1/index.ts`,
                content: Utils.dedent`
                    import type { TheNum } from 'pkg2'
                    export const theNum: TheNum = 42;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg1/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { outDir: "build", ...optionsToExtend },
                    references: [{ path: "../pkg2" }]
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/const.ts`,
                content: `export type TheNum = 42;`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/index.ts`,
                content: `export type { TheNum } from 'const';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/packages/pkg2/tsconfig.json`,
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
        ], { currentDirectory: ts.tscWatch.projectRoot });
    }

    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly`,
        sys,
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
        changes: ts.emptyArray
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "moduleResolution",
        subScenario: `resolves specifier in output declaration file from referenced project correctly with preserveSymlinks`,
        sys: () => sys({ preserveSymlinks: true }),
        commandLineArgs: ["-b", "packages/pkg1", "--verbose", "--traceResolution"],
        changes: ts.emptyArray
    });

    ts.verifyTsc({
        scenario: "moduleResolution",
        subScenario: `type reference resolution uses correct options for different resolution options referenced project`,
        fs: () => ts.loadProjectFromFiles({
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
});

describe("unittests:: tsbuild:: moduleResolution:: impliedNodeFormat differs between projects for shared file", () => {
    ts.verifyTscWithEdits({
        scenario: "moduleResolution",
        subScenario: "impliedNodeFormat differs between projects for shared file",
        fs: () => ts.loadProjectFromFiles({
            "/src/projects/a/src/index.ts": "",
            "/src/projects/a/tsconfig.json": JSON.stringify({
                compilerOptions: { strict: true }
            }),
            "/src/projects/b/src/index.ts": Utils.dedent`
                    import pg from "pg";
                    pg.foo();
                `,
            "/src/projects/b/tsconfig.json": JSON.stringify({
                compilerOptions: { strict: true, module: "node16" }
            }),
            "/src/projects/b/package.json": JSON.stringify({
                name: "b",
                type: "module"
            }),
            "/src/projects/node_modules/@types/pg/index.d.ts": "export function foo(): void;",
            "/src/projects/node_modules/@types/pg/package.json": JSON.stringify({
                name: "@types/pg",
                types: "index.d.ts",
            }),
        }),
        modifyFs: fs => fs.writeFileSync("/lib/lib.es2022.full.d.ts", ts.tscWatch.libFile.content),
        commandLineArgs: ["-b", "/src/projects/a", "/src/projects/b", "--verbose", "--traceResolution", "--explainFiles"],
        edits: ts.noChangeOnlyRuns
    });
});