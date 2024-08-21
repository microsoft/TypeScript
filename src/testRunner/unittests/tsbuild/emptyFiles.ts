import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild - empty files option in tsconfig", () => {
    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "has empty files diagnostic when files is empty and no references are provided",
        sys: () =>
            TestServerHost.createWatchedSystem({
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
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--b", "/src/no-references"],
    });

    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "does not have empty files diagnostic when files is empty and references are provided",
        sys: () =>
            TestServerHost.createWatchedSystem({
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
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--b", "/src/with-references"],
    });
});
