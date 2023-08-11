import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";
import {
    compilerOptionsToConfigJson,
} from "../helpers/contents";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc";
import {
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";
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
                content: JSON.stringify({
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
                content: JSON.stringify({
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
                content: JSON.stringify({
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
                "/src/packages/pkg1.tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true, typeRoots: ["./typeroot1"] },
                    files: ["./pkg1_index.ts"],
                }),
                "/src/packages/typeroot1/sometype/index.d.ts": Utils.dedent`declare type TheNum = "type1";`,
                "/src/packages/pkg2_index.ts": `export const theNum: TheNum2 = "type2";`,
                "/src/packages/pkg2.tsconfig.json": JSON.stringify({
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
                "/src/projects/a/tsconfig.json": JSON.stringify({
                    compilerOptions: { strict: true },
                }),
                "/src/projects/b/src/index.ts": Utils.dedent`
                    import pg from "pg";
                    pg.foo();
                `,
                "/src/projects/b/tsconfig.json": JSON.stringify({
                    compilerOptions: { strict: true, module: "node16" },
                }),
                "/src/projects/b/package.json": JSON.stringify({
                    name: "b",
                    type: "module",
                }),
                "/src/projects/node_modules/@types/pg/index.d.ts": "export function foo(): void;",
                "/src/projects/node_modules/@types/pg/package.json": JSON.stringify({
                    name: "@types/pg",
                    types: "index.d.ts",
                }),
            }),
        modifyFs: fs => fs.writeFileSync("/lib/lib.es2022.full.d.ts", libFile.content),
        commandLineArgs: ["-b", "/src/projects/a", "/src/projects/b", "--verbose", "--traceResolution", "--explainFiles"],
        edits: noChangeOnlyRuns,
    });
});
// HEAD
//
describe("unittests:: tsbuild:: moduleResolution:: sharing resolutions across references", () => {
    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "sharing across references",
        fs: () =>
            loadProjectFromFiles({
                "/users/username/projects/node_modules/moduleX/index.d.ts": "export const x = 10;",
                "/users/username/projects/common/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                        typeRoots: [],
                    }),
                }),
                "/users/username/projects/common/moduleA.ts": "export const a = 10;",
                "/users/username/projects/common/moduleB.ts": Utils.dedent`
                import { x } from "moduleX";
                export const b = x;
            `,
                "/users/username/projects/app/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                        typeRoots: [],
                    }),
                    references: [{ path: "../common" }],
                }),
                "/users/username/projects/app/appA.ts": Utils.dedent`
                import { x } from "moduleX";
                export const y = x;
            `,
                "/users/username/projects/app/appB.ts": Utils.dedent`
                import { b } from "../common/moduleB";
                export const y = b;
            `,
            }),
        commandLineArgs: ["-b", "/users/username/projects/app", "--verbose", "--traceResolution"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "sharing across references despite typeRoots are not specified",
        fs: () =>
            loadProjectFromFiles({
                "/users/username/projects/node_modules/moduleX/index.d.ts": "export const x = 10;",
                "/users/username/projects/common/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                    }),
                }),
                "/users/username/projects/common/moduleA.ts": "export const a = 10;",
                "/users/username/projects/common/moduleB.ts": Utils.dedent`
                import { x } from "moduleX";
                export const b = x;
            `,
                "/users/username/projects/app/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                    }),
                    references: [{ path: "../common" }],
                }),
                "/users/username/projects/app/appA.ts": Utils.dedent`
                import { x } from "moduleX";
                export const y = x;
            `,
                "/users/username/projects/app/appB.ts": Utils.dedent`
                import { b } from "../common/moduleB";
                export const y = b;
            `,
            }),
        commandLineArgs: ["-b", "/users/username/projects/app", "--verbose", "--traceResolution"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "not sharing across references because typeRoots are not specified and config directories are different",
        fs: () =>
            loadProjectFromFiles({
                "/users/username/projects/node_modules/moduleX/index.d.ts": "export const x = 10;",
                "/users/username/projects/common/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                    }),
                }),
                "/users/username/projects/common/moduleA.ts": "export const a = 10;",
                "/users/username/projects/common/moduleB.ts": Utils.dedent`
                import { x } from "moduleX";
                export const b = x;
            `,
                "/users/username/projects/common/node_modules/@types/moduleZ/index.d.ts": "export const mz = 10;",
                "/users/username/projects/app/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                    }),
                    references: [{ path: "../common" }],
                }),
                "/users/username/projects/app/appA.ts": Utils.dedent`
                import { x } from "moduleX";
                export const y = x;
            `,
                "/users/username/projects/app/appB.ts": Utils.dedent`
                import { b } from "../common/moduleB";
                export const y = b;
            `,
                "/users/username/projects/app/node_modules/@types/moduleZ/index.d.ts": "export const mz = 10;",
            }),
        commandLineArgs: ["-b", "/users/username/projects/app", "--verbose", "--traceResolution"],
    });

    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "not sharing across references",
        fs: () =>
            loadProjectFromFiles({
                "/users/username/projects/node_modules/moduleX/index.d.ts": "export const x = 10;",
                "/users/username/projects/common/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                    }),
                }),
                "/users/username/projects/common/moduleA.ts": "export const a = 10;",
                "/users/username/projects/common/moduleB.ts": Utils.dedent`
                import { x } from "moduleX";
                export const b = x;
            `,
                "/users/username/projects/app/tsconfig.json": JSON.stringify({
                    compilerOptions: compilerOptionsToConfigJson({
                        composite: true,
                        traceResolution: true,
                        typeRoots: [], // Just some sample option that is different across the projects
                    }),
                    references: [{ path: "../common" }],
                }),
                "/users/username/projects/app/appA.ts": Utils.dedent`
                import { x } from "moduleX";
                export const y = x;
            `,
                "/users/username/projects/app/appB.ts": Utils.dedent`
                import { b } from "../common/moduleB";
                export const y = b;
            `,
            }),
        commandLineArgs: ["-b", "/users/username/projects/app", "--verbose", "--traceResolution"],
    });
});
// 4f64b7bc2f (Some tests for module resolution sharing in tsbuild scenario)
