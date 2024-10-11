import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    noChangeRun,
    TestTscEdit,
    verifyTsc,
    VerifyTscWithEditsInput,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: outputPaths::", () => {
    const noChangeProject: TestTscEdit = {
        edit: ts.noop,
        caption: "Normal build without change, that does not block emit on error to show files that get emitted",
        commandLineArgs: ["-p", "/home/src/workspaces/project/tsconfig.json"],
    };
    const edits: TestTscEdit[] = [
        noChangeRun,
        noChangeProject,
    ];

    function verify(input: Pick<VerifyTscWithEditsInput, "subScenario" | "sys" | "edits">, expectedOuptutNames: readonly string[]) {
        verifyTsc({
            scenario: "outputPaths",
            commandLineArgs: ["--b", "-v"],
            ...input,
        });

        it("verify getOutputFileNames", () => {
            const sys = input.sys();
            assert.deepEqual(
                ts.getOutputFileNames(
                    ts.parseConfigFileWithSystem(
                        "/home/src/workspaces/project/tsconfig.json",
                        {},
                        /*extendedConfigCache*/ undefined,
                        {},
                        sys,
                        ts.noop,
                    )!,
                    "/home/src/workspaces/project/src/index.ts",
                    /*ignoreCase*/ false,
                ),
                expectedOuptutNames,
            );
        });
    }

    verify({
        subScenario: "when rootDir is not specified",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/index.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "dist",
                    },
                }),
            }),
        edits,
    }, ["/home/src/workspaces/project/dist/index.js"]);

    verify({
        subScenario: "when rootDir is not specified and is composite",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/index.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "dist",
                        composite: true,
                    },
                }),
            }),
        edits,
    }, ["/home/src/workspaces/project/dist/src/index.js", "/home/src/workspaces/project/dist/src/index.d.ts"]);

    verify({
        subScenario: "when rootDir is specified",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/index.ts": "export const x = 10;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "dist",
                        rootDir: "src",
                    },
                }),
            }),
        edits,
    }, ["/home/src/workspaces/project/dist/index.js"]);

    verify({
        subScenario: "when rootDir is specified but not all files belong to rootDir",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/index.ts": "export const x = 10;",
                "/home/src/workspaces/project/types/type.ts": "export type t = string;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "dist",
                        rootDir: "src",
                    },
                }),
            }),
        edits,
    }, ["/home/src/workspaces/project/dist/index.js"]);

    verify({
        subScenario: "when rootDir is specified but not all files belong to rootDir and is composite",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/src/index.ts": "export const x = 10;",
                "/home/src/workspaces/project/types/type.ts": "export type t = string;",
                "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        outDir: "dist",
                        rootDir: "src",
                        composite: true,
                    },
                }),
            }),
        edits,
    }, ["/home/src/workspaces/project/dist/index.js", "/home/src/workspaces/project/dist/index.d.ts"]);
});
