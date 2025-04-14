import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: emptyFiles:: option in tsconfig", () => {
    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "has empty files diagnostic when files is empty and no references are provided",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/no-references/tsconfig.json": jsonToReadableText({
                    references: [],
                    files: [],
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        forceConsistentCasingInFileNames: true,
                        skipDefaultLibCheck: true,
                    },
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--b", "no-references"],
    });

    verifyTsc({
        scenario: "emptyFiles",
        subScenario: "does not have empty files diagnostic when files is empty and references are provided",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/core/index.ts": "export function multiply(a: number, b: number) { return a * b; }",
                "/home/src/workspaces/solution/core/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declaration: true,
                        declarationMap: true,
                        skipDefaultLibCheck: true,
                    },
                }),
                "/home/src/workspaces/solution/with-references/tsconfig.json": jsonToReadableText({
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
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--b", "with-references"],
    });
});
