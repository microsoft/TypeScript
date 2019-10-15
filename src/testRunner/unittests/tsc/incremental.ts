namespace ts {
    describe("unittests:: tsc:: incremental::", () => {
        verifyTscIncrementalEdits({
            scenario: "incremental",
            subScenario: "when passing filename for buildinfo on commandline",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": utils.dedent`
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
            incrementalScenarios: [{
                buildKind: BuildKind.IncrementalDtsUnchanged,
                modifyFs: noop,
            }]
        });

        verifyTsc({
            scenario: "incremental",
            subScenario: "when passing rootDir from commandline",
            fs: () => loadProjectFromFiles({
                "/src/project/src/main.ts": "export const x = 10;",
                "/src/project/tsconfig.json": utils.dedent`
                    {
                        "compilerOptions": {
                            "incremental": true,
                            "outDir": "dist",
                        },
                    }`,
            }),
            commandLineArgs: ["--p", "src/project", "--rootDir", "src/project/src"],
        });
    });
}
