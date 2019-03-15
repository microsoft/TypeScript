namespace ts {
    describe("unittests:: tsbuild:: outFile::", () => {
        let outFileFs: vfs.FileSystem;
        const enum ext { js, jsmap, dts, dtsmap, buildinfo }
        const enum project { first, second, third }
        type OutputFile = [string, string, string, string, string];
        function relName(path: string) { return path.slice(1); }
        const outputFiles: [OutputFile, OutputFile, OutputFile] = [
            [
                "/src/first/bin/first-output.js",
                "/src/first/bin/first-output.js.map",
                "/src/first/bin/first-output.d.ts",
                "/src/first/bin/first-output.d.ts.map",
                "/src/first/bin/first-output.tsbuildinfo"
            ],
            [
                "/src/2/second-output.js",
                "/src/2/second-output.js.map",
                "/src/2/second-output.d.ts",
                "/src/2/second-output.d.ts.map",
                "/src/2/second-output.tsbuildinfo"
            ],
            [
                "/src/third/thirdjs/output/third-output.js",
                "/src/third/thirdjs/output/third-output.js.map",
                "/src/third/thirdjs/output/third-output.d.ts",
                "/src/third/thirdjs/output/third-output.d.ts.map",
                "/src/third/thirdjs/output/third-output.tsbuildinfo"
            ]
        ];
        const relOutputFiles = outputFiles.map(v => v.map(relName)) as [OutputFile, OutputFile, OutputFile];
        type Sources = [string, ReadonlyArray<string>];
        const enum source { config, ts }
        const enum part { one, two, three }
        const sources: [Sources, Sources, Sources] = [
            [
                "/src/first/tsconfig.json",
                [
                    "/src/first/first_PART1.ts",
                    "/src/first/first_part2.ts",
                    "/src/first/first_part3.ts"
                ]
            ],
            [
                "/src/second/tsconfig.json",
                [
                    "/src/second/second_part1.ts",
                    "/src/second/second_part2.ts"
                ]
            ],
            [
                "/src/third/tsconfig.json",
                [
                    "/src/third/third_part1.ts"
                ]
            ]
        ];
        const expectedMapFileNames = [
            outputFiles[project.first][ext.jsmap],
            outputFiles[project.first][ext.dtsmap],
            outputFiles[project.second][ext.jsmap],
            outputFiles[project.second][ext.dtsmap],
            outputFiles[project.third][ext.jsmap],
            outputFiles[project.third][ext.dtsmap]
        ];
        const expectedTsbuildInfoFileNames: ReadonlyArray<BuildInfoSectionBaselineFiles> = [
            [outputFiles[project.first][ext.buildinfo], outputFiles[project.first][ext.js], outputFiles[project.first][ext.dts]],
            [outputFiles[project.second][ext.buildinfo], outputFiles[project.second][ext.js], outputFiles[project.second][ext.dts]],
            [outputFiles[project.third][ext.buildinfo], outputFiles[project.third][ext.js], outputFiles[project.third][ext.dts]]
        ];
        const relSources = sources.map(([config, sources]) => [relName(config), sources.map(relName)]) as any as [Sources, Sources, Sources];
        const { time, tick } = getTime();
        let expectedOutputFiles = [
            ...outputFiles[project.first],
            ...outputFiles[project.second],
            ...outputFiles[project.third]
        ];
        let initialExpectedDiagnostics: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], relOutputFiles[project.first][ext.js]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.second][source.config], relOutputFiles[project.second][ext.js]],
            [Diagnostics.Building_project_0, sources[project.second][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.third][source.config], relOutputFiles[project.third][ext.js]],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let initialExpectedReadFiles: ReadonlyMap<number> = getReadFilesMap(
            [
                // Configs
                sources[project.first][source.config],
                sources[project.second][source.config],
                sources[project.third][source.config],

                // Source files
                ...sources[project.first][source.ts],
                ...sources[project.second][source.ts],
                ...sources[project.third][source.ts],

                // outputs
                ...outputFiles[project.first],
                ...outputFiles[project.second],
            ]
        );

        let dtsChangedExpectedDiagnostics: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.third][source.config], relOutputFiles[project.third][ext.js], "src/first"],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let dtsChangedExpectedReadFiles: ReadonlyMap<number> = getReadFilesMap(
            [
                // Configs
                sources[project.first][source.config],
                sources[project.second][source.config],
                sources[project.third][source.config],

                // Source files
                ...sources[project.first][source.ts],
                ...sources[project.third][source.ts],

                // outputs
                ...outputFiles[project.first],
                ...outputFiles[project.second],
                outputFiles[project.third][ext.dts],
            ],
            outputFiles[project.first][ext.dts], // dts changes so once read old content, and once new (to emit third)
        );

        let dtsChangedExpectedDiagnosticsDependOrdered: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.second][source.config], relOutputFiles[project.second][ext.js], "src/first"],
            [Diagnostics.Building_project_0, sources[project.second][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.third][source.config], relOutputFiles[project.third][ext.js], "src/second"],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let dtsChangedExpectedReadFilesDependOrdered: ReadonlyMap<number> = getDtsChangedReadFilesDependOrdered();

        let dtsUnchangedExpectedDiagnostics: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
            [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/first"],
            [Diagnostics.Updating_output_of_project_0, sources[project.third][source.config]],
            [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, sources[project.third][source.config]],
        ];
        let dtsUnchangedExpectedReadFiles: ReadonlyMap<number> = getReadFilesMap(
            [
                // Configs
                sources[project.first][source.config],
                sources[project.second][source.config],
                sources[project.third][source.config],

                // Source files
                ...sources[project.first][source.ts],

                // outputs to prepend
                ...outputFiles[project.first],
                ...outputFiles[project.second],
                ...outputFiles[project.third],
            ]
        );

        let dtsUnchangedExpectedDiagnosticsDependOrdered: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.second][source.config], "src/first"],
            [Diagnostics.Updating_output_of_project_0, sources[project.second][source.config]],
            [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, sources[project.second][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/second"],
            [Diagnostics.Updating_output_of_project_0, sources[project.third][source.config]],
            [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, sources[project.third][source.config]],
        ];
        let dtsUnchangedExpectedReadFilesDependOrdered: ReadonlyMap<number> = getDtsUnchangedExpectedReadFilesDependOrdered();

        before(() => {
            outFileFs = loadProjectFromDisk("tests/projects/outfile-concat", time);
        });
        after(() => {
            outFileFs = undefined!;
            expectedOutputFiles = undefined!;
            initialExpectedDiagnostics = undefined!;
            initialExpectedReadFiles = undefined!;
            dtsChangedExpectedDiagnostics = undefined!;
            dtsChangedExpectedReadFiles = undefined!;
            dtsChangedExpectedDiagnosticsDependOrdered = undefined!;
            dtsChangedExpectedReadFilesDependOrdered = undefined!;
            dtsUnchangedExpectedDiagnostics = undefined!;
            dtsUnchangedExpectedReadFiles = undefined!;
            dtsUnchangedExpectedDiagnosticsDependOrdered = undefined!;
            dtsUnchangedExpectedReadFilesDependOrdered = undefined!;
        });

        function createSolutionBuilder(host: fakes.SolutionBuilderHost) {
            return ts.createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: true });
        }

        function getInitialExpectedReadFiles(additionalSourceFiles?: ReadonlyArray<string>) {
            if (!additionalSourceFiles) return initialExpectedReadFiles;
            const expectedReadFiles = cloneMap(initialExpectedReadFiles);
            for (const path of additionalSourceFiles) {
                expectedReadFiles.set(path, 1);
            }
            return expectedReadFiles;
        }

        function getDtsChangedReadFilesDependOrdered() {
            const value = cloneMap(dtsChangedExpectedReadFiles);
            for (const path of sources[project.second][source.ts]) {
                value.set(path, 1);
            }
            value.set(outputFiles[project.second][ext.dts], 2); // dts changes so once read old content, and once new (to emit third)
            return value;
        }

        function getDtsChangedReadFiles(dependOrdered?: boolean, additionalSourceFiles?: ReadonlyArray<string>) {
            const value = dependOrdered ? dtsChangedExpectedReadFilesDependOrdered : dtsChangedExpectedReadFiles;
            if (!additionalSourceFiles) return value;
            const expectedReadFiles = cloneMap(value);
            for (const path of additionalSourceFiles) {
                expectedReadFiles.set(path, 1);
            }
            return expectedReadFiles;
        }

        function getDtsUnchangedExpectedReadFilesDependOrdered() {
            const value = cloneMap(dtsUnchangedExpectedReadFiles);
            // Since this changes too
            for (const path of outputFiles[project.second]) {
                value.set(path, 2);
            }
            return value;
        }

        function getDtsUnchangedReadFiles(dependOrdered?: boolean, additionalSourceFiles?: ReadonlyArray<string>) {
            const value = dependOrdered ? dtsUnchangedExpectedReadFilesDependOrdered : dtsUnchangedExpectedReadFiles;
            if (!additionalSourceFiles || additionalSourceFiles.length !== 3) return value;
            const expectedReadFiles = cloneMap(value);
            // Additional source Files
            expectedReadFiles.set(additionalSourceFiles[project.first], 1);
            return expectedReadFiles;
        }

        interface VerifyOutFileScenarioInput {
            scenario: string;
            modifyFs: (fs: vfs.FileSystem) => void;
            modifyAgainFs?: (fs: vfs.FileSystem) => void;
            additionalSourceFiles?: ReadonlyArray<string>;
            expectedBuildInfoFilesForSectionBaselines?: ReadonlyArray<BuildInfoSectionBaselineFiles>;
            dependOrdered?: true;
            ignoreDtsChanged?: true;
            ignoreDtsUnchanged?: true;
            baselineOnly?: true;
        }

        function verifyOutFileScenario({
            scenario,
            modifyFs,
            modifyAgainFs,
            additionalSourceFiles,
            expectedBuildInfoFilesForSectionBaselines,
            dependOrdered,
            ignoreDtsChanged,
            ignoreDtsUnchanged,
            baselineOnly
        }: VerifyOutFileScenarioInput) {
            const initialExpectedReadFiles = !baselineOnly ? getInitialExpectedReadFiles(additionalSourceFiles) : undefined;
            const dtsChangedReadFiles = !baselineOnly && !ignoreDtsChanged ? getDtsChangedReadFiles(dependOrdered, additionalSourceFiles) : undefined;
            const dtsUnchanged: ExpectedBuildOutput | undefined = !baselineOnly && (!ignoreDtsUnchanged || !modifyAgainFs) ? {
                expectedDiagnostics: dependOrdered ?
                    dtsUnchangedExpectedDiagnosticsDependOrdered :
                    dtsUnchangedExpectedDiagnostics,
                expectedReadFiles: getDtsUnchangedReadFiles(dependOrdered, additionalSourceFiles)
            } : undefined;

            verifyTsbuildOutput({
                scenario,
                projFs: () => outFileFs,
                time,
                tick,
                proj: "outfile-concat",
                rootNames: ["/src/third"],
                expectedMapFileNames,
                expectedBuildInfoFilesForSectionBaselines: expectedBuildInfoFilesForSectionBaselines || expectedTsbuildInfoFileNames,
                lastProjectOutputJs: outputFiles[project.third][ext.js],
                initialBuild: {
                    modifyFs,
                    expectedDiagnostics: initialExpectedDiagnostics,
                    expectedReadFiles: initialExpectedReadFiles
                },
                incrementalDtsChangedBuild: !ignoreDtsChanged ? {
                    modifyFs: fs => replaceText(fs, relSources[project.first][source.ts][part.one], "Hello", "Hola"),
                    expectedDiagnostics: dependOrdered ?
                        dtsChangedExpectedDiagnosticsDependOrdered :
                        dtsChangedExpectedDiagnostics,
                    expectedReadFiles: dtsChangedReadFiles
                } : undefined,
                incrementalDtsUnchangedBuild: !ignoreDtsUnchanged ? {
                    modifyFs: fs => appendText(fs, relSources[project.first][source.ts][part.one], "console.log(s);"),
                    expectedDiagnostics: dtsUnchanged && dtsUnchanged.expectedDiagnostics,
                    expectedReadFiles: dtsUnchanged && dtsUnchanged.expectedReadFiles
                } : undefined,
                incrementalHeaderChangedBuild: modifyAgainFs ? {
                    modifyFs: modifyAgainFs,
                    expectedDiagnostics: dtsUnchanged && dtsUnchanged.expectedDiagnostics,
                    expectedReadFiles: dtsUnchanged && dtsUnchanged.expectedReadFiles
                } : undefined,
                outputFiles: expectedOutputFiles,
                baselineOnly
            });
        }

        // Verify initial + incremental edits
        verifyOutFileScenario({
            scenario: "baseline sectioned sourcemaps",
            modifyFs: noop
        });

        // Verify baseline with build info + dts unChanged
        verifyOutFileScenario({
            scenario: "when final project is not composite but uses project references",
            modifyFs: fs => replaceText(fs, sources[project.third][source.config], `"composite": true,`, ""),
            ignoreDtsChanged: true,
            baselineOnly: true
        });

        // Verify baseline with build info
        verifyOutFileScenario({
            scenario: "when final project is not composite but incremental",
            modifyFs: fs => replaceText(fs, sources[project.third][source.config], `"composite": true,`, `"incremental": true,`),
            ignoreDtsChanged: true,
            ignoreDtsUnchanged: true,
            baselineOnly: true
        });

        // Verify baseline with build info
        verifyOutFileScenario({
            scenario: "when final project specifies tsBuildInfoFile",
            modifyFs: fs => replaceText(fs, sources[project.third][source.config], `"composite": true,`, `"composite": true,
        "tsBuildInfoFile": "./thirdjs/output/third.tsbuildinfo",`),
            expectedBuildInfoFilesForSectionBaselines: [
                expectedTsbuildInfoFileNames[0],
                expectedTsbuildInfoFileNames[1],
                ["/src/third/thirdjs/output/third.tsbuildinfo", expectedTsbuildInfoFileNames[2][1], expectedTsbuildInfoFileNames[2][2]]
            ],
            ignoreDtsChanged: true,
            ignoreDtsUnchanged: true,
            baselineOnly: true
        });

        it("clean projects", () => {
            const fs = outFileFs.shadow();
            const expectedOutputs = [
                ...outputFiles[project.first],
                ...outputFiles[project.second],
                ...outputFiles[project.third]
            ];
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(...initialExpectedDiagnostics);
            // Verify they exist
            for (const output of expectedOutputs) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }
            host.clearDiagnostics();
            builder.cleanAllProjects();
            host.assertDiagnosticMessages(/*none*/);
            // Verify they are gone
            for (const output of expectedOutputs) {
                assert(!fs.existsSync(output), `Expect file ${output} to not exist`);
            }
            // Subsequent clean shouldn't throw / etc
            builder.cleanAllProjects();
        });

        it("verify buildInfo absence results in new build", () => {
            const fs = outFileFs.shadow();
            const expectedOutputs = [
                ...outputFiles[project.first],
                ...outputFiles[project.second],
                ...outputFiles[project.third]
            ];
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(...initialExpectedDiagnostics);
            // Verify they exist
            for (const output of expectedOutputs) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }
            // Delete bundle info
            host.clearDiagnostics();
            host.deleteFile(outputFiles[project.first][ext.buildinfo]);
            builder.resetBuildContext();
            builder.buildAllProjects();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], relOutputFiles[project.first][ext.buildinfo]],
                [Diagnostics.Building_project_0, sources[project.first][source.config]],
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
                [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/first"],
                [Diagnostics.Updating_output_of_project_0, sources[project.third][source.config]],
                [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, sources[project.third][source.config]],
            );
        });

        it("verify that if incremental is set to false, tsbuildinfo is not generated", () => {
            const fs = outFileFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            replaceText(fs, sources[project.third][source.config], `"composite": true,`, "");
            const builder = createSolutionBuilder(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(...initialExpectedDiagnostics);
            // Verify they exist - without tsbuildinfo for third project
            for (const output of expectedOutputFiles.slice(0, expectedOutputFiles.length - 2)) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }
            assert.isFalse(fs.existsSync(outputFiles[project.third][ext.buildinfo]), `Expect file ${outputFiles[project.third][ext.buildinfo]} to not exist`);
        });

        it("rebuilds completely when version in tsbuildinfo doesnt match ts version", () => {
            const fs = outFileFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(...initialExpectedDiagnostics);
            host.clearDiagnostics();
            builder.resetBuildContext();
            changeCompilerVersion(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, relSources[project.first][source.config], fakes.version, version],
                [Diagnostics.Building_project_0, sources[project.first][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, relSources[project.second][source.config], fakes.version, version],
                [Diagnostics.Building_project_0, sources[project.second][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, relSources[project.third][source.config], fakes.version, version],
                [Diagnostics.Building_project_0, sources[project.third][source.config]],
            );
        });

        describe("Prepend output with .tsbuildinfo", () => {
            // Prologues
            describe("Prologues", () => {
                // Verify initial + incremental edits
                verifyOutFileScenario({
                    scenario: "strict in all projects",
                    modifyFs: fs => {
                        enableStrict(fs, sources[project.first][source.config]);
                        enableStrict(fs, sources[project.second][source.config]);
                        enableStrict(fs, sources[project.third][source.config]);
                    },
                    modifyAgainFs: fs => addTestPrologue(fs, relSources[project.first][source.ts][part.one], `"myPrologue"`)
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "strict in one dependency",
                    modifyFs: fs => enableStrict(fs, sources[project.second][source.config]),
                    modifyAgainFs: fs => addTestPrologue(fs, "src/first/first_PART1.ts", `"myPrologue"`),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // Verify initial + incremental edits - sourcemap verification
                verifyOutFileScenario({
                    scenario: "multiple prologues in all projects",
                    modifyFs: fs => {
                        enableStrict(fs, sources[project.first][source.config]);
                        addTestPrologue(fs, sources[project.first][source.ts][part.one], `"myPrologue"`);
                        enableStrict(fs, sources[project.second][source.config]);
                        addTestPrologue(fs, sources[project.second][source.ts][part.one], `"myPrologue"`);
                        addTestPrologue(fs, sources[project.second][source.ts][part.two], `"myPrologue2";`);
                        enableStrict(fs, sources[project.third][source.config]);
                        addTestPrologue(fs, sources[project.third][source.ts][part.one], `"myPrologue";`);
                        addTestPrologue(fs, sources[project.third][source.ts][part.one], `"myPrologue3";`);
                    },
                    modifyAgainFs: fs => addTestPrologue(fs, relSources[project.first][source.ts][part.one], `"myPrologue5"`)
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "multiple prologues in different projects",
                    modifyFs: fs => {
                        enableStrict(fs, sources[project.first][source.config]);
                        addTestPrologue(fs, sources[project.second][source.ts][part.one], `"myPrologue"`);
                        addTestPrologue(fs, sources[project.second][source.ts][part.two], `"myPrologue2";`);
                        enableStrict(fs, sources[project.third][source.config]);
                    },
                    modifyAgainFs: fs => addTestPrologue(fs, sources[project.first][source.ts][part.one], `"myPrologue5"`),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });
            });

            // Shebang
            describe("Shebang", () => {
                // changes declaration because its emitted in .d.ts file
                // Verify initial + incremental edits
                verifyOutFileScenario({
                    scenario: "shebang in all projects",
                    modifyFs: fs => {
                        addShebang(fs, "first", "first_PART1");
                        addShebang(fs, "first", "first_part2");
                        addShebang(fs, "second", "second_part1");
                        addShebang(fs, "third", "third_part1");
                    },
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "shebang in only one dependency project",
                    modifyFs: fs => addShebang(fs, "second", "second_part1"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });
            });

            // emitHelpers
            describe("emitHelpers", () => {
                // Verify initial + incremental edits
                verifyOutFileScenario({
                    scenario: "emitHelpers in all projects",
                    modifyFs: fs => {
                        addRest(fs, "first", "first_PART1");
                        addRest(fs, "second", "second_part1");
                        addRest(fs, "third", "third_part1");
                    },
                    modifyAgainFs: fs => removeRest(fs, "first", "first_PART1")
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "emitHelpers in only one dependency project",
                    modifyFs: fs => {
                        addStubFoo(fs, "first", "first_PART1");
                        addRest(fs, "second", "second_part1");
                    },
                    modifyAgainFs: fs => changeStubToRest(fs, "first", "first_PART1"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "multiple emitHelpers in all projects",
                    modifyFs: fs => {
                        addRest(fs, "first", "first_PART1");
                        addSpread(fs, "first", "first_part3");
                        addRest(fs, "second", "second_part1");
                        addSpread(fs, "second", "second_part2");
                        addRest(fs, "third", "third_part1");
                        addSpread(fs, "third", "third_part1");
                    },
                    modifyAgainFs: fs => removeRest(fs, "first", "first_PART1"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "multiple emitHelpers in different projects",
                    modifyFs: fs => {
                        addRest(fs, "first", "first_PART1");
                        addSpread(fs, "second", "second_part1");
                        addRest(fs, "third", "third_part1");
                    },
                    modifyAgainFs: fs => removeRest(fs, "first", "first_PART1"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });
            });

            // triple slash refs
            describe("triple slash refs", () => {
                // changes declaration because its emitted in .d.ts file
                // Verify initial + incremental edits
                verifyOutFileScenario({
                    scenario: "triple slash refs in all projects",
                    modifyFs: fs => {
                        addTripleSlashRef(fs, "first", "first_part2");
                        addTripleSlashRef(fs, "second", "second_part1");
                        addTripleSlashRef(fs, "third", "third_part1");
                    },
                    additionalSourceFiles: [
                        getTripleSlashRef("first"), getTripleSlashRef("second"), getTripleSlashRef("third")
                    ]
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "triple slash refs in one project",
                    modifyFs: fs => addTripleSlashRef(fs, "second", "second_part1"),
                    additionalSourceFiles: [
                        getTripleSlashRef("second")
                    ],
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });
            });

            describe("stripInternal", () => {
                function disableRemoveComments(fs: vfs.FileSystem, file: string) {
                    replaceText(fs, file, `"removeComments": true`, `"removeComments": false`);
                }

                function diableRemoveCommentsInAll(fs: vfs.FileSystem) {
                    disableRemoveComments(fs, sources[project.first][source.config]);
                    disableRemoveComments(fs, sources[project.second][source.config]);
                    disableRemoveComments(fs, sources[project.third][source.config]);
                }

                function stripInternalOfThird(fs: vfs.FileSystem) {
                    replaceText(fs, sources[project.third][source.config], `"declaration": true,`, `"declaration": true,
"stripInternal": true`);
                }

                function stripInternalScenario(fs: vfs.FileSystem, removeCommentsDisabled?: boolean, jsDocStyle?: boolean) {
                    const internal = jsDocStyle ? `/**@internal*/` : `/*@internal*/`;
                    if (removeCommentsDisabled) {
                        diableRemoveCommentsInAll(fs);
                    }
                    stripInternalOfThird(fs);
                    replaceText(fs, sources[project.first][source.ts][part.one], "interface", `${internal} interface`);
                    appendText(fs, sources[project.second][source.ts][part.one], `
class normalC {
    ${internal} constructor() { }
    ${internal} prop: string;
    ${internal} method() { }
    ${internal} get c() { return 10; }
    ${internal} set c(val: number) { }
}
namespace normalN {
    ${internal} export class C { }
    ${internal} export function foo() {}
    ${internal} export namespace someNamespace { export class C {} }
    ${internal} export namespace someOther.something { export class someClass {} }
    ${internal} export import someImport = someNamespace.C;
    ${internal} export type internalType = internalC;
    ${internal} export const internalConst = 10;
    ${internal} export enum internalEnum { a, b, c }
}
${internal} class internalC {}
${internal} function internalfoo() {}
${internal} namespace internalNamespace { export class someClass {} }
${internal} namespace internalOther.something { export class someClass {} }
${internal} import internalImport = internalNamespace.someClass;
${internal} type internalType = internalC;
${internal} const internalConst = 10;
${internal} enum internalEnum { a, b, c }`);
                }

                // Verify initial + incremental edits
                verifyOutFileScenario({
                    scenario: "stripInternal",
                    modifyFs: stripInternalScenario,
                    modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "stripInternal with comments emit enabled",
                    modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true),
                    modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "stripInternal jsdoc style comment",
                    modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
                    modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/**@internal*/ interface`, "interface"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "stripInternal jsdoc style with comments emit enabled",
                    modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                describe("with three levels of project dependency", () => {
                    function makeOneTwoThreeDependOrder(fs: vfs.FileSystem) {
                        replaceText(fs, sources[project.second][source.config], "[", `[
    { "path": "../first", "prepend": true }`);
                        replaceText(fs, sources[project.third][source.config], `{ "path": "../first", "prepend": true },`, "");
                    }

                    function stripInternalWithDependentOrder(fs: vfs.FileSystem, removeCommentsDisabled?: boolean, jsDocStyle?: boolean) {
                        stripInternalScenario(fs, removeCommentsDisabled, jsDocStyle);
                        makeOneTwoThreeDependOrder(fs);
                    }

                    // Verify initial + incremental edits
                    verifyOutFileScenario({
                        scenario: "stripInternal when one-two-three are prepended in order",
                        modifyFs: stripInternalWithDependentOrder,
                        modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
                        dependOrdered: true,
                    });

                    // Verify ignore dtsChanged
                    verifyOutFileScenario({
                        scenario: "stripInternal with comments emit enabled when one-two-three are prepended in order",
                        modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true),
                        modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
                        dependOrdered: true,
                        ignoreDtsChanged: true,
                        baselineOnly: true
                    });

                    // Verify ignore dtsChanged
                    verifyOutFileScenario({
                        scenario: "stripInternal jsdoc style comment when one-two-three are prepended in order",
                        modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
                        modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/**@internal*/ interface`, "interface"),
                        dependOrdered: true,
                        ignoreDtsChanged: true,
                        baselineOnly: true
                    });

                    // Verify ignore dtsChanged
                    verifyOutFileScenario({
                        scenario: "stripInternal jsdoc style with comments emit enabled when one-two-three are prepended in order",
                        modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
                        dependOrdered: true,
                        ignoreDtsChanged: true,
                        baselineOnly: true
                    });
                });

                // only baseline
                verifyOutFileScenario({
                    scenario: "stripInternal baseline when internal is inside another internal",
                    modifyFs: fs => {
                        stripInternalOfThird(fs);
                        prependText(fs, sources[project.first][source.ts][part.one], `namespace ts {
    /* @internal */
    /**
     * Subset of properties from SourceFile that are used in multiple utility functions
     */
    export interface SourceFileLike {
        readonly text: string;
        lineMap?: ReadonlyArray<number>;
        /* @internal */
        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
    }

    /* @internal */
    export interface RedirectInfo {
        /** Source file this redirects to. */
        readonly redirectTarget: SourceFile;
        /**
         * Source file for the duplicate package. This will not be used by the Program,
         * but we need to keep this around so we can watch for changes in underlying.
         */
        readonly unredirected: SourceFile;
    }

    // Source files are declarations when they are external modules.
    export interface SourceFile {
        someProp: string;
    }
}`);
                    },
                    ignoreDtsChanged: true,
                    ignoreDtsUnchanged: true,
                    baselineOnly: true
                });

                // only baseline
                verifyOutFileScenario({
                    scenario: "stripInternal when few members of enum are internal",
                    modifyFs: fs => {
                        stripInternalOfThird(fs);
                        prependText(fs, sources[project.first][source.ts][part.one], `enum TokenFlags {
    None = 0,
    /* @internal */
    PrecedingLineBreak = 1 << 0,
    /* @internal */
    PrecedingJSDocComment = 1 << 1,
    /* @internal */
    Unterminated = 1 << 2,
    /* @internal */
    ExtendedUnicodeEscape = 1 << 3,
    Scientific = 1 << 4,
    Octal = 1 << 5,
    HexSpecifier = 1 << 6,
    BinarySpecifier = 1 << 7,
    OctalSpecifier = 1 << 8,
    /* @internal */
    ContainsSeparator = 1 << 9,
    /* @internal */
    BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
    /* @internal */
    NumericLiteralFlags = Scientific | Octal | HexSpecifier | BinaryOrOctalSpecifier | ContainsSeparator
}
`);
                    },
                    ignoreDtsChanged: true,
                    ignoreDtsUnchanged: true,
                    baselineOnly: true
                });
            });

            describe("empty source files", () => {
                function makeThirdEmptySourceFile(fs: vfs.FileSystem) {
                    fs.writeFileSync(sources[project.third][source.ts][part.one], "", "utf8");
                }

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    scenario: "when source files are empty in the own file",
                    modifyFs: makeThirdEmptySourceFile,
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // only baseline
                verifyOutFileScenario({
                    scenario: "declarationMap and sourceMap disabled",
                    modifyFs: fs => {
                        makeThirdEmptySourceFile(fs);
                        replaceText(fs, sources[project.third][source.config], `"composite": true,`, "");
                        replaceText(fs, sources[project.third][source.config], `"sourceMap": true,`, "");
                        replaceText(fs, sources[project.third][source.config], `"declarationMap": true,`, "");
                    },
                    ignoreDtsChanged: true,
                    ignoreDtsUnchanged: true,
                    baselineOnly: true
                });
            });
        });

        it("non module projects without prepend", () => {
            const fs = outFileFs.shadow();
            // No prepend
            replaceText(fs, sources[project.third][source.config], `{ "path": "../first", "prepend": true }`, `{ "path": "../first" }`);
            replaceText(fs, sources[project.third][source.config], `{ "path": "../second", "prepend": true }`, `{ "path": "../second" }`);

            // Non Modules
            replaceText(fs, sources[project.first][source.config], `"composite": true,`, `"composite": true, "module": "none",`);
            replaceText(fs, sources[project.second][source.config], `"composite": true,`, `"composite": true, "module": "none",`);
            replaceText(fs, sources[project.third][source.config], `"composite": true,`, `"composite": true, "module": "none",`);

            // Own file emit
            replaceText(fs, sources[project.first][source.config], `"outFile": "./bin/first-output.js",`, "");
            replaceText(fs, sources[project.second][source.config], `"outFile": "../2/second-output.js",`, "");
            replaceText(fs, sources[project.third][source.config], `"outFile": "./thirdjs/output/third-output.js",`, "");

            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], "src/first/first_PART1.js"],
                [Diagnostics.Building_project_0, sources[project.first][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.second][source.config], "src/second/second_part1.js"],
                [Diagnostics.Building_project_0, sources[project.second][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.third][source.config], "src/third/third_part1.js"],
                [Diagnostics.Building_project_0, sources[project.third][source.config]]
            );
            const expectedOutputFiles = flatMap(sources, ([config, ts]) => [
                removeFileExtension(config) + Extension.TsBuildInfo,
                ...flatMap(ts, f => [
                    removeFileExtension(f) + Extension.Js,
                    removeFileExtension(f) + Extension.Js + ".map",
                    removeFileExtension(f) + Extension.Dts,
                    removeFileExtension(f) + Extension.Dts + ".map",
                ])
            ]);
            for (const output of expectedOutputFiles) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }
        });
    });
}
