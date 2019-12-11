namespace ts {
    describe("unittests:: tsc:: incremental::", () => {
        verifyTscIncrementalEdits({
            scenario: "incremental",
            subScenario: "when passing filename for buildinfo on commandline",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "target": "es5",
                            "module": "commonjs",
                        },
                        "include": [
                            "src/**/*.ts"
                        ]
                    }`,
            }),
            commandLineArgs: ["--incremental", "--p", "src/project", "--tsBuildInfoFile", "src/project/.tsbuildinfo"],
            incrementalScenarios: [noChangeRun]
        });

        verifyTscIncrementalEdits({
            scenario: "incremental",
            subScenario: "when passing rootDir from commandline",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "incremental": true,
                            "outDir": "dist",
                        },
                    }`,
            }),
            commandLineArgs: ["--p", "src/project", "--rootDir", "src/project/src"],
            incrementalScenarios: [noChangeRun]
        });

        verifyTscIncrementalEdits({
            scenario: "incremental",
            subScenario: "with only dts files",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.d.ts": "export const x = 10;",
                "/src/project/src/another.d.ts": "export const y = 10;",
                "/src/project/tsconfig.json": "{}",
            }),
            commandLineArgs: ["--incremental", "--p", "src/project"],
            incrementalScenarios: [
                noChangeRun,
                {
                    buildKind: BuildKind.IncrementalDtsUnchanged,
                    modifyFs: fs => appendText(fs, "/src/project/src/main.d.ts", "export const xy = 100;")
                }
            ]
        });

        verifyTscIncrementalEdits({
            scenario: "incremental",
            subScenario: "when passing rootDir is in the tsconfig",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "incremental": true,
                            "outDir": "./built",
                            "rootDir": "./"
                        },
                    }`,
            }),
            commandLineArgs: ["--p", "src/project"],
            incrementalScenarios: [noChangeRun]
        });
    });
}
