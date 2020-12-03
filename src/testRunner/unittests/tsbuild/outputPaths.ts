namespace ts {
    describe("unittests:: tsbuild - output file paths", () => {
        const incrementalScenarios: TscIncremental[] = [
            noChangeRun,
            {
                buildKind: BuildKind.NoChangeRun,
                modifyFs: noop,
                subScenario: "Normal build without change, that does not block emit on error to show files that get emitted",
                commandLineArgs: ["-p", "/src/tsconfig.json"],
            }
        ];

        verifyTscSerializedIncrementalEdits({
            scenario: "outputPaths",
            subScenario: "when rootDir is not specified",
            fs: () => loadProjectFromFiles({
                "/src/src/index.ts": "export const x = 10;",
                "/src/tsconfig.json": JSON.stringify({
                    compilerOptions: {
                        outDir: "dist"
                    }
                })
            }),
            commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
            incrementalScenarios,
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "outputPaths",
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
            commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
            incrementalScenarios,
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "outputPaths",
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
            commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
            incrementalScenarios,
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "outputPaths",
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
            commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
            incrementalScenarios,
        });

        verifyTscSerializedIncrementalEdits({
            scenario: "outputPaths",
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
            commandLineArgs: ["--b", "/src/tsconfig.json", "-v"],
            incrementalScenarios,
        });
    });
}
