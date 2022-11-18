import * as ts from "../../_namespaces/ts";
import * as fakes from "../../_namespaces/fakes";
import {
    loadProjectFromFiles,
    noChangeRun,
    TestTscEdit,
    TscCompileSystem,
    verifyTscWithEdits,
    VerifyTscWithEditsInput,
} from "../tsc/helpers";

describe("unittests:: tsbuild - output file paths", () => {
    const noChangeProject: TestTscEdit = {
        modifyFs: ts.noop,
        subScenario: "Normal build without change, that does not block emit on error to show files that get emitted",
        commandLineArgs: ["-p", "/src/tsconfig.json"],
    };
    const edits: TestTscEdit[] = [
        noChangeRun,
        noChangeProject,
    ];

    function verify(input: Pick<VerifyTscWithEditsInput, "subScenario" | "fs" | "edits">, expectedOuptutNames: readonly string[]) {
        verifyTscWithEdits({
            scenario: "outputPaths",
            commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
            ...input
        });

        it("verify getOutputFileNames", () => {
            const sys = new fakes.System(input.fs().makeReadonly(), { executingFilePath: "/lib/tsc" }) as TscCompileSystem;

            assert.deepEqual(
                ts.getOutputFileNames(
                    ts.parseConfigFileWithSystem("/src/tsconfig.json", {}, /*extendedConfigCache*/ undefined, {}, sys, ts.noop)!,
                    "/src/src/index.ts",
                    /*ignoreCase*/ false
                ),
                expectedOuptutNames
            );
        });
    }

    verify({
        subScenario: "when rootDir is not specified",
        fs: () => loadProjectFromFiles({
            "/src/src/index.ts": "export const x = 10;",
            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    outDir: "dist"
                }
            })
        }),
        edits,
    }, ["/src/dist/index.js"]);

    verify({
        subScenario: "when rootDir is not specified and is composite",
        fs: () => loadProjectFromFiles({
            "/src/src/index.ts": "export const x = 10;",
            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    outDir: "dist",
                    composite: true
                }
            })
        }),
        edits,
    }, ["/src/dist/src/index.js", "/src/dist/src/index.d.ts"]);

    verify({
        subScenario: "when rootDir is specified",
        fs: () => loadProjectFromFiles({
            "/src/src/index.ts": "export const x = 10;",
            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    outDir: "dist",
                    rootDir: "src"
                }
            })
        }),
        edits,
    }, ["/src/dist/index.js"]);

    verify({
        subScenario: "when rootDir is specified but not all files belong to rootDir",
        fs: () => loadProjectFromFiles({
            "/src/src/index.ts": "export const x = 10;",
            "/src/types/type.ts": "export type t = string;",
            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    outDir: "dist",
                    rootDir: "src"
                }
            })
        }),
        edits,
    }, ["/src/dist/index.js"]);

    verify({
        subScenario: "when rootDir is specified but not all files belong to rootDir and is composite",
        fs: () => loadProjectFromFiles({
            "/src/src/index.ts": "export const x = 10;",
            "/src/types/type.ts": "export type t = string;",
            "/src/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    outDir: "dist",
                    rootDir: "src",
                    composite: true
                }
            })
        }),
        edits,
    }, ["/src/dist/index.js", "/src/dist/index.d.ts"]);
});
