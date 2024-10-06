import { emptyArray } from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: projectReferences::", () => {
    verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project contains invalid project reference",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/main.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "amd",
                        outFile: "theApp.js",
                    },
                    references: [
                        { path: "../Util/Dates" },
                    ],
                }),
            }),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "when project references composite project with noEmit",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/src/utils/index.ts": "export const x = 10;",
                "/home/src/workspaces/solution/src/utils/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        noEmit: true,
                    },
                }),
                "/home/src/workspaces/solution/project/index.ts": `import { x } from "../utils";`,
                "/home/src/workspaces/solution/project/tsconfig.json": jsonToReadableText({
                    references: [
                        { path: "../utils" },
                    ],
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--p", "project"],
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "default import interop uses referenced project settings",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/node_modules/ambiguous-package/package.json": jsonToReadableText({ name: "ambiguous-package" }),
                "/home/src/workspaces/project/node_modules/ambiguous-package/index.d.ts": "export declare const ambiguous: number;",
                "/home/src/workspaces/project/node_modules/esm-package/package.json": jsonToReadableText({ name: "esm-package", type: "module" }),
                "/home/src/workspaces/project/node_modules/esm-package/index.d.ts": "export declare const esm: number;",
                "/home/src/workspaces/project/lib/tsconfig.json": jsonToReadableText({
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
                "/home/src/workspaces/project/lib/src/a.ts": "export const a = 0;",
                "/home/src/workspaces/project/lib/dist/a.d.ts": "export declare const a = 0;",
                "/home/src/workspaces/project/app/tsconfig.json": jsonToReadableText({
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
                "/home/src/workspaces/project/app/src/local.ts": "export const local = 0;",
                "/home/src/workspaces/project/app/src/index.ts": `
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
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/utils/index.ts": "export const enum E { A = 1 }",
                "/home/src/workspaces/solution/utils/index.d.ts": "export declare const enum E { A = 1 }",
                "/home/src/workspaces/solution/utils/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        preserveConstEnums: true,
                    },
                }),
                "/home/src/workspaces/solution/project/index.ts": `import { E } from "../utils"; E.A;`,
                "/home/src/workspaces/solution/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        isolatedModules: true,
                    },
                    references: [
                        { path: "../utils" },
                    ],
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--p", "project"],
    });

    verifyTsc({
        scenario: "projectReferences",
        subScenario: "importing const enum from referenced project with preserveConstEnums and verbatimModuleSyntax",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/preserve/index.ts": "export const enum E { A = 1 }",
                "/home/src/workspaces/solution/preserve/index.d.ts": "export declare const enum E { A = 1 }",
                "/home/src/workspaces/solution/preserve/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        preserveConstEnums: true,
                    },
                }),
                "/home/src/workspaces/solution/no-preserve/index.ts": "export const enum E { A = 1 }",
                "/home/src/workspaces/solution/no-preserve/index.d.ts": "export declare const enum F { A = 1 }",
                "/home/src/workspaces/solution/no-preserve/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        preserveConstEnums: false,
                    },
                }),
                "/home/src/workspaces/solution/project/index.ts": `import { E } from "../preserve";\nimport { F } from "../no-preserve";\nE.A; F.A;`,
                "/home/src/workspaces/solution/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        module: "preserve",
                        verbatimModuleSyntax: true,
                    },
                    references: [
                        { path: "../preserve" },
                        { path: "../no-preserve" },
                    ],
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--p", "project", "--pretty", "false"],
    });
});
