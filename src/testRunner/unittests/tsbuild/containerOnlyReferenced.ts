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
                "/home/src/workspaces/solution/src/folder/index.ts": `export const x = 10;`,
                "/home/src/workspaces/solution/src/folder/tsconfig.json": jsonToReadableText({
                    files: ["index.ts"],
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/home/src/workspaces/solution/src/folder2/index.ts": `export const x = 10;`,
                "/home/src/workspaces/solution/src/folder2/tsconfig.json": jsonToReadableText({
                    files: ["index.ts"],
                    compilerOptions: {
                        composite: true,
                    },
                }),
                "/home/src/workspaces/solution/src/tsconfig.json": jsonToReadableText({
                    files: [],
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./folder" },
                        { path: "./folder2" },
                    ],
                }),
                "/home/src/workspaces/solution/tests/index.ts": `export const x = 10;`,
                "/home/src/workspaces/solution/tests/tsconfig.json": jsonToReadableText({
                    files: ["index.ts"],
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "../src" },
                    ],
                }),
                "/home/src/workspaces/solution/tsconfig.json": jsonToReadableText({
                    files: [],
                    compilerOptions: {
                        composite: true,
                    },
                    references: [
                        { path: "./src" },
                        { path: "./tests" },
                    ],
                }),
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--b", "--verbose"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "containerOnlyReferenced",
        subScenario: "when solution is referenced indirectly",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/solution/project1/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [],
                }),
                "/home/src/workspaces/solution/project2/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [],
                }),
                "/home/src/workspaces/solution/project2/src/b.ts": "export const b = 10;",
                "/home/src/workspaces/solution/project3/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [{ path: "../project1" }, { path: "../project2" }],
                }),
                "/home/src/workspaces/solution/project3/src/c.ts": "export const c = 10;",
                "/home/src/workspaces/solution/project4/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true },
                    references: [{ path: "../project3" }],
                }),
                "/home/src/workspaces/solution/project4/src/d.ts": "export const d = 10;",
            }, { currentDirectory: "/home/src/workspaces/solution" }),
        commandLineArgs: ["--b", "project4", "--verbose", "--explainFiles"],
        edits: [{
            caption: "modify project3 file",
            edit: sys => sys.replaceFileText("/home/src/workspaces/solution/project3/src/c.ts", "c = ", "cc = "),
        }],
    });
});
