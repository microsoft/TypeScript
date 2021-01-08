namespace ts {
    describe("unittests:: tsbuild - output file paths", () => {
        const noChangeProject: TscIncremental = {
            buildKind: BuildKind.NoChangeRun,
            modifyFs: noop,
            subScenario: "Normal build without change, that does not block emit on error to show files that get emitted",
            commandLineArgs: ["-p", "/src/tsconfig.json"],
        };
        const incrementalScenarios: TscIncremental[] = [
            noChangeRun,
            noChangeProject,
        ];

        function verify(input: Pick<VerifyTsBuildInput, "subScenario" | "fs" | "incrementalScenarios">, expectedOuptutNames: readonly string[]) {
            verifyTscSerializedIncrementalEdits({
                scenario: "outputPaths",
                commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
                ...input
            });

            it("verify getOutputFileNames", () => {
                const sys = new fakes.System(input.fs().makeReadonly(), { executingFilePath: "/lib/tsc" }) as TscCompileSystem;
                ;
                assert.deepEqual(
                    getOutputFileNames(
                        parseConfigFileWithSystem("/src/tsconfig.json", {}, {}, sys, noop)!,
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
            incrementalScenarios,
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
            incrementalScenarios: [
                noChangeRun,
                {
                    ...noChangeProject,
                    cleanBuildDiscrepancies: () => {
                        const map = new Map<string, CleanBuildDescrepancy>();
                        map.set("/src/dist/tsconfig.tsbuildinfo", CleanBuildDescrepancy.CleanFileTextDifferent); // tsbuildinfo will have -p setting when built using -p vs no build happens incrementally because of no change.
                        return map;
                    }
                }
            ],
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
            incrementalScenarios,
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
            incrementalScenarios,
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
            incrementalScenarios,
        }, ["/src/dist/index.js", "/src/dist/index.d.ts"]);
    });
}
