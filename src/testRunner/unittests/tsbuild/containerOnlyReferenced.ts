import { jsonToReadableText } from "../helpers.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: when containerOnly project is referenced", () => {
    verifyTsc({
        scenario: "containerOnlyReferenced",
        subScenario: "verify that subsequent builds after initial build doesnt build anything",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/src/folder/index.ts": `export const x = 10;`,
                "/src/src/folder/tsconfig.json": jsonToReadableText({
                    files: ["index.ts"],
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/src/src/folder2/index.ts": `export const x = 10;`,
                "/src/src/folder2/tsconfig.json": jsonToReadableText({
                    files: ["index.ts"],
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/src/src/tsconfig.json": jsonToReadableText({
                    files: [],
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./folder" },
                        { path: "./folder2" },
                    ],
                }),
                "/src/tests/index.ts": `export const x = 10;`,
                "/src/tests/tsconfig.json": jsonToReadableText({
                    files: ["index.ts"],
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../src" },
                    ],
                }),
                "/src/tsconfig.json": jsonToReadableText({
                    files: [],
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./src" },
                        { path: "./tests" },
                    ],
                }),
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--b", "/src", "--verbose"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "containerOnlyReferenced",
        subScenario: "when solution is referenced indirectly",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/src/project1/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [],
                }),
                "/src/project2/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [],
                }),
                "/src/project2/src/b.ts": "export const b = 10;",
                "/src/project3/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [{ path: "../project1" }, { path: "../project2" }],
                }),
                "/src/project3/src/c.ts": "export const c = 10;",
                "/src/project4/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [{ path: "../project3" }],
                }),
                "/src/project4/src/d.ts": "export const d = 10;",
            }, { currentDirectory: "/" }),
        commandLineArgs: ["--b", "/src/project4", "--verbose", "--explainFiles"],
        edits: [{
            caption: "modify project3 file",
            edit: sys => sys.replaceFileText("/src/project3/src/c.ts", "c = ", "cc = "),
        }],
    });
});
