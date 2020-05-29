namespace ts {
    describe("unittests:: tsc:: incremental::", () => {
        verifyTscSerializedIncrementalEdits({
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
            incrementalScenarios: noChangeOnlyRuns
        });

        verifyTscSerializedIncrementalEdits({
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
            incrementalScenarios: noChangeOnlyRuns
        });

        verifyTscSerializedIncrementalEdits({
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

        verifyTscSerializedIncrementalEdits({
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
            incrementalScenarios: noChangeOnlyRuns
        });

        describe("with noEmitOnError", () => {
            let projFs: vfs.FileSystem;
            before(() => {
                projFs = loadProjectFromDisk("tests/projects/noEmitOnError");
            });
            after(() => {
                projFs = undefined!;
            });

            function verifyNoEmitOnError(subScenario: string, fixModifyFs: TscIncremental["modifyFs"], modifyFs?: TscIncremental["modifyFs"]) {
                verifyTscSerializedIncrementalEdits({
                    scenario: "incremental",
                    subScenario,
                    fs: () => projFs,
                    commandLineArgs: ["--incremental", "-p", "src"],
                    modifyFs,
                    incrementalScenarios: [
                        noChangeRun,
                        {
                            buildKind: BuildKind.IncrementalDtsUnchanged,
                            modifyFs: fixModifyFs
                        },
                        noChangeRun,
                    ],
                    baselinePrograms: true
                });
            }
            verifyNoEmitOnError(
                "with noEmitOnError syntax errors",
                fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`, "utf-8")
            );

            verifyNoEmitOnError(
                "with noEmitOnError semantic errors",
                fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = "hello";`, "utf-8"),
                fs => fs.writeFileSync("/src/src/main.ts", `import { A } from "../shared/types/db";
const a: string = 10;`, "utf-8"),
            );
        });
    });
}
