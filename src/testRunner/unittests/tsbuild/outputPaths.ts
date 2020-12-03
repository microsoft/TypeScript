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
            incrementalScenarios: [
                noChangeRun,
                {
                    ...noChangeProject,
                    cleanBuildDescripencies: () => {
                        const map = new Map<string, CleanBuildDescripency>();
                        map.set("/src/dist/tsconfig.tsbuildinfo", CleanBuildDescripency.CleanFileTextDifferent); // tsbuildinfo will have -p setting when built using -p vs no build happens incrementally because of no change.
                        return map;
                    }
                }
            ],
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
