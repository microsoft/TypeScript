import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsc:: projectReferences::", () => {
    verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project contains invalid project reference",
        fs: () =>
            loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "amd",
                        outFile: "theApp.js",
                    },
                    references: [
                        { path: "../Util/Dates" },
                    ],
                }),
            }),
        commandLineArgs: ["--p", "src/project"],
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project references composite project with noEmit",
        fs: () =>
            loadProjectFromFiles({
                "/src/utils/index.ts": "export const x = 10;",
                "/src/utils/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        noEmit: true,
                    },
                }),
                "/src/project/index.ts": `import { x } from "../utils";`,
                "/src/project/tsconfig.json": jsonToReadableText({
                    references: [
                        { path: "../utils" },
                    ],
                }),
            }),
        commandLineArgs: ["--p", "src/project"],
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "default import interop uses referenced project settings",
        fs: () =>
            loadProjectFromFiles({
                "/node_modules/ambiguous-package/package.json": `{ "name": "ambiguous-package" }`,
                "/node_modules/ambiguous-package/index.d.ts": "export declare const ambiguous: number;",
                "/node_modules/esm-package/package.json": `{ "name": "esm-package", "type": "module" }`,
                "/node_modules/esm-package/index.d.ts": "export declare const esm: number;",
                "/lib/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        rootDir: "src",
                        outDir: "dist",
                        module: "esnext",
                        moduleResolution: "bundler",
                    },
                    include: ["src"],
                }),
                "/lib/src/a.ts": "export const a = 0;",
                "/lib/dist/a.d.ts": "export declare const a = 0;",
                "/app/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "esnext",
                        moduleResolution: "bundler",
                        rootDir: "src",
                        outDir: "dist",
                    },
                    include: ["src"],
                    references: [
                        { path: "../lib" },
                    ],
                }),
                "/app/src/local.ts": "export const local = 0;",
                "/app/src/index.ts": `
                    import local from "./local"; // Error
                    import esm from "esm-package"; // Error
                    import referencedSource from "../../lib/src/a"; // Error
                    import referencedDeclaration from "../../lib/dist/a"; // Error
                    import ambiguous from "ambiguous-package"; // Ok`,
            }),
        commandLineArgs: ["--p", "app", "--pretty", "false"],
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "referencing ambient const enum from referenced project with preserveConstEnums",
        fs: () =>
            loadProjectFromFiles({
                "/src/utils/index.ts": "export const enum E { A = 1 }",
                "/src/utils/index.d.ts": "export declare const enum E { A = 1 }",
                "/src/utils/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        preserveConstEnums: true,
                    },
                }),
                "/src/project/index.ts": `import { E } from "../utils"; E.A;`,
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        isolatedModules: true,
                    },
                    references: [
                        { path: "../utils" },
                    ],
                }),
            }),
        commandLineArgs: ["--p", "src/project"],
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "importing const enum from referenced project with preserveConstEnums and verbatimModuleSyntax",
        fs: () =>
            loadProjectFromFiles({
                "/src/preserve/index.ts": "export const enum E { A = 1 }",
                "/src/preserve/index.d.ts": "export declare const enum E { A = 1 }",
                "/src/preserve/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        preserveConstEnums: true,
                    },
                }),
                "/src/no-preserve/index.ts": "export const enum E { A = 1 }",
                "/src/no-preserve/index.d.ts": "export declare const enum F { A = 1 }",
                "/src/no-preserve/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        preserveConstEnums: false,
                    },
                }),
                "/src/project/index.ts": `import { E } from "../preserve";\nimport { F } from "../no-preserve";\nE.A; F.A;`,
                "/src/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "preserve",
                        verbatimModuleSyntax: true,
                    },
                    references: [
                        { path: "../preserve" },
                        { path: "../no-preserve" },
                    ],
                }),
            }),
        commandLineArgs: ["--p", "src/project", "--pretty", "false"],
    });
});
