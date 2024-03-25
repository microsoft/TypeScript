import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

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
        subScenario: "referencing ambient const enum as value from referenced project with preserveConstEnums",
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
                "/src/utilsNonPreserved/index.ts": "export const enum E2 { A = 1 }",
                "/src/utilsNonPreserved/index.d.ts": "export declare const enum E2 { A = 1 }",
                "/src/utilsNonPreserved/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        preserveConstEnums: false,
                    },
                }),
                "/src/project/index.ts": `
                    import { E } from "../utils";
                    import { E2 } from "../utilsNonPreserved";
        
                    E; declare const x: E; E[x];
                    
                    E2; declare const y: E2; E2[y];
                `,
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
});
