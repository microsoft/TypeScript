import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsbuild - empty files option in tsconfig", () => {
    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "has empty files diagnostic when files is empty and no references are provided",
        fs: () =>
            loadProjectFromFiles({
                "/src/no-references/tsconfig.json": jsonToReadableText({
                    references: [],
                    files: [],
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        forceConsistentCasingInFileNames: true,
                        skipDefaultLibCheck: true,
                    },
                }),
            }),
        commandLineArgs: ["--b", "/src/no-references"],
    });

    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "does not have empty files diagnostic when files is empty and references are provided",
        fs: () =>
            loadProjectFromFiles({
                "/src/core/index.ts": "export function multiply(a: number, b: number) { return a * b; }",
                "/src/core/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        declarationMap: true,
                        skipDefaultLibCheck: true,
                    },
                }),
                "/src/with-references/tsconfig.json": jsonToReadableText({
                    references: [
                        { path: "../core" },
                    ],
                    files: [],
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        forceConsistentCasingInFileNames: true,
                        skipDefaultLibCheck: true,
                    },
                }),
            }),
        commandLineArgs: ["--b", "/src/with-references"],
    });
});
