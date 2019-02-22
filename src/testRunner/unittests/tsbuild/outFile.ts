
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
                "/src/first/bin/.tsbuildinfo"
            ],
            [
                "/src/2/second-output.js",
                "/src/2/second-output.js.map",
                "/src/2/second-output.d.ts",
                "/src/2/second-output.d.ts.map",
                "/src/2/.tsbuildinfo"
            ],
            [
                "/src/third/thirdjs/output/third-output.js",
                "/src/third/thirdjs/output/third-output.js.map",
                "/src/third/thirdjs/output/third-output.d.ts",
                "/src/third/thirdjs/output/third-output.d.ts.map",
                "/src/third/thirdjs/output/.tsbuildinfo"
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
        const relSources = sources.map(([config, sources]) => [relName(config), sources.map(relName)]) as [Sources, Sources, Sources];
        const { time, tick } = getTime();
        let expectedOutputFiles = [
            ...outputFiles[project.first],
            ...outputFiles[project.second],
            ...outputFiles[project.third]
        ];
        let initialBuildExpectedDiagnostics: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], relOutputFiles[project.first][ext.js]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.second][source.config], relOutputFiles[project.second][ext.js]],
            [Diagnostics.Building_project_0, sources[project.second][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.third][source.config], relOutputFiles[project.third][ext.js]],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let initialBuildExpectedReadFiles: ReadonlyMap<number> = getReadFilesMap(
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

                // build info
                outputFiles[project.third][ext.buildinfo],
            ],
            // These are first not present and later read new contents to generate third output
            outputFiles[project.first][ext.buildinfo],
            outputFiles[project.second][ext.buildinfo]
        );

        let incrementalDtsChangedExpectedDiagnostics: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.third][source.config], relOutputFiles[project.third][ext.js], "src/first"],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let incrementalDtsChangedExpectedReadFiles: ReadonlyMap<number> = getReadFilesMap(
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

                // build info
                outputFiles[project.third][ext.buildinfo],
            ],
            outputFiles[project.first][ext.dts], // dts changes so once read old content, and once new (to emit third)
            outputFiles[project.first][ext.buildinfo], // since first build info changes
        );

        let incrementalDtsChangedExpectedDiagnosticsDependOrdered: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.second][source.config], relOutputFiles[project.second][ext.js], "src/first"],
            [Diagnostics.Building_project_0, sources[project.second][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.third][source.config], relOutputFiles[project.third][ext.js], "src/second"],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let incrementalDtsChangedExpectedReadFilesDependOrdered: ReadonlyMap<number> = getIncrementalDtsChangedReadFilesDependOrdered();

        let incrementalDtsUnchangedWithBuildInfoExpectedDiagnostics: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
            [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/first"],
            [Diagnostics.Updating_output_of_project_0, sources[project.third][source.config]],
            [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, sources[project.third][source.config]],
        ];
        let incrementalDtsUnchangedWithBuildInfoExpectedReadFiles: ReadonlyMap<number> = getReadFilesMap(
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
                outputFiles[project.third][ext.buildinfo],
            ],
            outputFiles[project.first][ext.buildinfo], // since first build info changes
        );

        let incrementalDtsUnchangedWithBuildInfoExpectedDiagnosticsDependOrdered: ReadonlyArray<fakes.ExpectedDiagnostic> = [
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
        let incrementalDtsUnchangedWithBuildInfoExpectedReadFilesDependOrdered: ReadonlyMap<number> = getIncrementalDtsUnchangedWithBuildInfoExpectedReadFilesDependOrdered();

        let incrementalDtsUnchangedWithoutBuildInfoExpectedDiagnostics: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
            [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/first"],
            [Diagnostics.Updating_output_of_project_0, sources[project.third][source.config]],
            [Diagnostics.Cannot_update_output_of_project_0_because_there_was_error_reading_file_1, sources[project.third][source.config], relOutputFiles[project.third][ext.buildinfo]],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let incrementalDtsUnchangedWithoutBuildInfoExpectedReadFiles: ReadonlyMap<number> = getReadFilesMap(
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

                // To prepend:: checked to see if we can do prepend manipulation
                outputFiles[project.third][ext.buildinfo],
            ],
            outputFiles[project.first][ext.buildinfo], // since first build info changes
        );

        let incrementalDtsUnchangedWithoutBuildInfoExpectedDiagnosticsDependOrdered: ReadonlyArray<fakes.ExpectedDiagnostic> = [
            getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
            [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
            [Diagnostics.Building_project_0, sources[project.first][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.second][source.config], "src/first"],
            [Diagnostics.Updating_output_of_project_0, sources[project.second][source.config]],
            [Diagnostics.Cannot_update_output_of_project_0_because_there_was_error_reading_file_1, sources[project.second][source.config], relOutputFiles[project.second][ext.buildinfo]],
            [Diagnostics.Building_project_0, sources[project.second][source.config]],
            [Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/second"],
            [Diagnostics.Updating_output_of_project_0, sources[project.third][source.config]],
            [Diagnostics.Cannot_update_output_of_project_0_because_there_was_error_reading_file_1, sources[project.third][source.config], relOutputFiles[project.third][ext.buildinfo]],
            [Diagnostics.Building_project_0, sources[project.third][source.config]]
        ];
        let incrementalDtsUnchangedWithoutBuildInfoExpectedReadFilesDependOrdered: ReadonlyMap<number> = getIncrementalDtsUnchangedWithoutBuildInfoExpectedReadFilesDependOrdered();

        before(() => {
            outFileFs = loadProjectFromDisk("tests/projects/outfile-concat", time);
        });
        after(() => {
            outFileFs = undefined!;
            expectedOutputFiles = undefined!;
            initialBuildExpectedDiagnostics = undefined!;
            initialBuildExpectedReadFiles = undefined!;
            incrementalDtsChangedExpectedDiagnostics = undefined!;
            incrementalDtsChangedExpectedReadFiles = undefined!;
            incrementalDtsChangedExpectedDiagnosticsDependOrdered = undefined!;
            incrementalDtsChangedExpectedReadFilesDependOrdered = undefined!;
            incrementalDtsUnchangedWithBuildInfoExpectedDiagnostics = undefined!;
            incrementalDtsUnchangedWithBuildInfoExpectedReadFiles = undefined!;
            incrementalDtsUnchangedWithBuildInfoExpectedDiagnosticsDependOrdered = undefined!;
            incrementalDtsUnchangedWithBuildInfoExpectedReadFilesDependOrdered = undefined!;
            incrementalDtsUnchangedWithoutBuildInfoExpectedDiagnostics = undefined!;
            incrementalDtsUnchangedWithoutBuildInfoExpectedReadFiles = undefined!;
            incrementalDtsUnchangedWithoutBuildInfoExpectedDiagnosticsDependOrdered = undefined!;
            incrementalDtsUnchangedWithoutBuildInfoExpectedReadFilesDependOrdered = undefined!;
        });

        function createSolutionBuilder(host: fakes.SolutionBuilderHost) {
            return ts.createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: true });
        }

        function getInitialBuildExpectedReadFiles(additionalSourceFiles?: ReadonlyArray<string>) {
            if (!additionalSourceFiles) return initialBuildExpectedReadFiles;
            const expectedReadFiles = cloneMap(initialBuildExpectedReadFiles);
            for (const path of additionalSourceFiles) {
                expectedReadFiles.set(path, 1);
            }
            return expectedReadFiles;
        }

        function getIncrementalDtsChangedReadFilesDependOrdered() {
            const value = cloneMap(incrementalDtsChangedExpectedReadFiles);
            for (const path of sources[project.second][source.ts]) {
                value.set(path, 1);
            }
            value.set(outputFiles[project.second][ext.dts], 2); // dts changes so once read old content, and once new (to emit third)
            value.set(outputFiles[project.second][ext.buildinfo], 2); // since first build info changes
            return value;
        }

        function getIncrementalDtsChangedReadFiles(dependOrdered?: boolean, additionalSourceFiles?: ReadonlyArray<string>) {
            const value = dependOrdered ? incrementalDtsChangedExpectedReadFilesDependOrdered : incrementalDtsChangedExpectedReadFiles;
            if (!additionalSourceFiles) return value;
            const expectedReadFiles = cloneMap(value);
            for (const path of additionalSourceFiles) {
                expectedReadFiles.set(path, 1);
            }
            return expectedReadFiles;
        }

        function getIncrementalDtsUnchangedWithBuildInfoExpectedReadFilesDependOrdered() {
            const value = cloneMap(incrementalDtsUnchangedWithBuildInfoExpectedReadFiles);
            // Since this changes too
            for (const path of outputFiles[project.second]) {
                value.set(path, 2);
            }
            return value;
        }

        function getIncrementalDtsUnchangedWithBuildInfoReadFiles(dependOrdered?: boolean, additionalSourceFiles?: ReadonlyArray<string>) {
            const value = dependOrdered ? incrementalDtsUnchangedWithBuildInfoExpectedReadFilesDependOrdered : incrementalDtsUnchangedWithBuildInfoExpectedReadFiles;
            if (!additionalSourceFiles || additionalSourceFiles.length !== 3) return value;
            const expectedReadFiles = cloneMap(value);
            // Additional source Files
            expectedReadFiles.set(additionalSourceFiles[project.first], 1);
            return expectedReadFiles;
        }

        function getIncrementalDtsUnchangedWithoutBuildInfoExpectedReadFilesDependOrdered() {
            const value = cloneMap(incrementalDtsUnchangedWithoutBuildInfoExpectedReadFiles);
            // Source files
            for (const path of sources[project.second][source.ts]) {
                value.set(path, 1);
            }
            // Since this changes too
            value.set(outputFiles[project.second][ext.buildinfo], 2);
            return value;
        }

        function getIncrementalDtsUnchangedWithoutBuildInfoReadFiles(dependOrdered?: boolean, additionalSourceFiles?: ReadonlyArray<string>) {
            const value = dependOrdered ? incrementalDtsUnchangedWithoutBuildInfoExpectedReadFilesDependOrdered : incrementalDtsUnchangedWithoutBuildInfoExpectedReadFiles;
            if (!additionalSourceFiles) return value;
            const expectedReadFiles = cloneMap(value);
            // Additional source Files
            for (const path of additionalSourceFiles) {
                expectedReadFiles.set(path, 1);
            }
            return expectedReadFiles;
        }

        function verifyOutFileScenario({
            scenario,
            modifyFs,
            modifyAgainFs,
            additionalSourceFiles,
            dependOrdered,
        }: {
            scenario: string;
            modifyFs: (fs: vfs.FileSystem) => void;
            modifyAgainFs?: (fs: vfs.FileSystem) => void;
            additionalSourceFiles?: ReadonlyArray<string>;
            dependOrdered?: boolean;
            }) {
            const initialBuildExpectedReadFiles = getInitialBuildExpectedReadFiles(additionalSourceFiles);
            const incrementalDtsChangedReadFiles = getIncrementalDtsChangedReadFiles(dependOrdered, additionalSourceFiles);
            const incrementalDtsUnchangedWithBuildInfo: ExpectedBuildOutputPerState = {
                expectedDiagnostics: dependOrdered ?
                    incrementalDtsUnchangedWithBuildInfoExpectedDiagnosticsDependOrdered :
                    incrementalDtsUnchangedWithBuildInfoExpectedDiagnostics,
                expectedReadFiles: getIncrementalDtsUnchangedWithBuildInfoReadFiles(dependOrdered, additionalSourceFiles)
            };
            const incrementalDtsUnchangedWithoutBuildInfo: ExpectedBuildOutputPerState = {
                expectedDiagnostics: dependOrdered ?
                    incrementalDtsUnchangedWithoutBuildInfoExpectedDiagnosticsDependOrdered :
                    incrementalDtsUnchangedWithoutBuildInfoExpectedDiagnostics,
                expectedReadFiles: getIncrementalDtsUnchangedWithoutBuildInfoReadFiles(dependOrdered, additionalSourceFiles)
            };

            verifyTsbuildOutput({
                scenario,
                projFs: () => outFileFs,
                time,
                tick,
                proj: "outfile-concat",
                rootNames: ["/src/third"],
                expectedMapFileNames,
                expectedTsbuildInfoFileNames,
                lastProjectOutputJs: outputFiles[project.third][ext.js],
                initialBuild: {
                    modifyFs,
                    expectedDiagnostics: initialBuildExpectedDiagnostics,
                    expectedReadFiles: initialBuildExpectedReadFiles
                },
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, relSources[project.first][source.ts][part.one], "Hello", "Hola"),
                    expectedDiagnostics: dependOrdered ?
                        incrementalDtsChangedExpectedDiagnosticsDependOrdered :
                        incrementalDtsChangedExpectedDiagnostics,
                    expectedReadFiles: incrementalDtsChangedReadFiles
                },
                incrementalDtsUnchangedBuild: {
                    modifyFs: fs => appendText(fs, relSources[project.first][source.ts][part.one], "console.log(s);"),
                    withBuildInfo: incrementalDtsUnchangedWithBuildInfo,
                    withoutBuildInfo: incrementalDtsUnchangedWithoutBuildInfo
                },
                incrementalHeaderChangedBuild: modifyAgainFs && {
                    modifyFs: modifyAgainFs,
                    withBuildInfo: incrementalDtsUnchangedWithBuildInfo,
                    withoutBuildInfo: incrementalDtsUnchangedWithoutBuildInfo
                },
                outputFiles: expectedOutputFiles
            });
        }

        verifyOutFileScenario({
            scenario: "baseline sectioned sourcemaps",
            modifyFs: noop
        });

        verifyOutFileScenario({
            scenario: "when final project is not composite but uses project references",
            modifyFs: fs => replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, "")
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
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], relOutputFiles[project.first][ext.js]],
                [Diagnostics.Building_project_0, sources[project.first][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.second][source.config], relOutputFiles[project.second][ext.js]],
                [Diagnostics.Building_project_0, sources[project.second][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.third][source.config], relOutputFiles[project.third][ext.js]],
                [Diagnostics.Building_project_0, sources[project.third][source.config]]
            );
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

        it("verify buildInfo presence or absence does not result in new build", () => {
            const fs = outFileFs.shadow();
            const expectedOutputs = [
                ...outputFiles[project.first],
                ...outputFiles[project.second],
                ...outputFiles[project.third]
            ];
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], relOutputFiles[project.first][ext.js]],
                [Diagnostics.Building_project_0, sources[project.first][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.second][source.config], relOutputFiles[project.second][ext.js]],
                [Diagnostics.Building_project_0, sources[project.second][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.third][source.config], relOutputFiles[project.third][ext.js]],
                [Diagnostics.Building_project_0, sources[project.third][source.config]]
            );
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
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.first][source.config], relSources[project.first][source.ts][part.one], relOutputFiles[project.first][ext.js]],
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.third][source.config], relSources[project.third][source.ts][part.one], relOutputFiles[project.third][ext.js]],
            );
        });

        it("verify that if multiple projects write tsbuildinfo to same location, reports error", () => {
            const fs = outFileFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            replaceText(fs, sources[project.first][source.config], "./bin/first-output.js", "../bin/first-output.js");
            replaceText(fs, sources[project.second][source.config], "../2/second-output.js", "../bin/second-output.js");
            replaceText(fs, sources[project.third][source.config], "./thirdjs/output/third-output.js", "../bin/third-output.js");
            const builder = createSolutionBuilder(host);
            builder.buildAllProjects();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], "src/bin/first-output.js"],
                [Diagnostics.Building_project_0, sources[project.first][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.second][source.config], "src/bin/second-output.js"],
                [Diagnostics.Building_project_0, sources[project.second][source.config]],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.third][source.config], "src/bin/third-output.js"],
                [Diagnostics.Building_project_0, sources[project.third][source.config]],
                [Diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_of_referenced_project_1, "/src/bin/.tsbuildinfo", "/src/first"],
                [Diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_of_referenced_project_1, "/src/bin/.tsbuildinfo", "/src/second"]
            );
            // Verify they exist
            for (const output of ["/src/bin/first-output.js", "/src/bin/second-output.js"]) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }
            assert.isFalse(fs.existsSync("/src/bin/third-output.js"), `Expect file "/src/bin/third-output.js" to not exist`);
        });

        // Prologues
        function enableStrict(fs: vfs.FileSystem, path: string) {
            replaceText(fs, path, `"strict": false`, `"strict": true`);
        }

        verifyOutFileScenario({
            scenario: "strict in all projects",
            modifyFs: fs => {
                enableStrict(fs, sources[project.first][source.config]);
                enableStrict(fs, sources[project.second][source.config]);
                enableStrict(fs, sources[project.third][source.config]);
            },
            modifyAgainFs: fs => addPrologue(fs, relSources[project.first][source.ts][part.one], `"myPrologue"`)
        });

        verifyOutFileScenario({
            scenario: "strict in one dependency",
            modifyFs: fs => {
                enableStrict(fs, sources[project.second][source.config]);
            },
            modifyAgainFs: fs => addPrologue(fs, "src/first/first_PART1.ts", `"myPrologue"`)
        });

        function addPrologue(fs: vfs.FileSystem, path: string, prologue: string) {
            prependText(fs, path, `${prologue}
`);
        }

        verifyOutFileScenario({
            scenario: "multiple prologues in all projects",
            modifyFs: fs => {
                enableStrict(fs, sources[project.first][source.config]);
                addPrologue(fs, sources[project.first][source.ts][part.one], `"myPrologue"`);
                enableStrict(fs, sources[project.second][source.config]);
                addPrologue(fs, sources[project.second][source.ts][part.one], `"myPrologue"`);
                addPrologue(fs, sources[project.second][source.ts][part.two], `"myPrologue2";`);
                enableStrict(fs, sources[project.third][source.config]);
                addPrologue(fs, sources[project.third][source.ts][part.one], `"myPrologue";`);
                addPrologue(fs, sources[project.third][source.ts][part.one], `"myPrologue3";`);
            },
            modifyAgainFs: fs => addPrologue(fs, relSources[project.first][source.ts][part.one], `"myPrologue5"`)
        });

        verifyOutFileScenario({
            scenario: "multiple prologues in different projects",
            modifyFs: fs => {
                enableStrict(fs, sources[project.first][source.config]);
                addPrologue(fs, sources[project.second][source.ts][part.one], `"myPrologue"`);
                addPrologue(fs, sources[project.second][source.ts][part.two], `"myPrologue2";`);
                enableStrict(fs, sources[project.third][source.config]);
            },
            modifyAgainFs: fs => addPrologue(fs, sources[project.first][source.ts][part.one], `"myPrologue5"`)
        });

        // Shebang
        function addShebang(fs: vfs.FileSystem, project: string, file: string) {
            prependText(fs, `src/${project}/${file}.ts`, `#!someshebang ${project} ${file}
`);
        }

        // changes declaration because its emitted in .d.ts file
        verifyOutFileScenario({
            scenario: "shebang in all projects",
            modifyFs: fs => {
                addShebang(fs, "first", "first_PART1");
                addShebang(fs, "first", "first_part2");
                addShebang(fs, "second", "second_part1");
                addShebang(fs, "third", "third_part1");
            },
        });

        verifyOutFileScenario({
            scenario: "shebang in only one dependency project",
            modifyFs: fs => {
                addShebang(fs, "second", "second_part1");
            },
        });

        // emitHelpers
        function restContent(project: string, file: string) {
            return `function for${project}${file}Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}`;
        }

        function nonrestContent(project: string, file: string) {
            return `function for${project}${file}Rest() { }`;
        }

        function addRest(fs: vfs.FileSystem, project: string, file: string) {
            appendText(fs, `src/${project}/${file}.ts`, restContent(project, file));
        }

        function removeRest(fs: vfs.FileSystem, project: string, file: string) {
            replaceText(fs, `src/${project}/${file}.ts`, restContent(project, file), nonrestContent(project, file));
        }

        function addStubFoo(fs: vfs.FileSystem, project: string, file: string) {
            appendText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file));
        }

        function changeStubToRest(fs: vfs.FileSystem, project: string, file: string) {
            replaceText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file), restContent(project, file));
        }

        verifyOutFileScenario({
            scenario: "emitHelpers in all projects",
            modifyFs: fs => {
                addRest(fs, "first", "first_PART1");
                addRest(fs, "second", "second_part1");
                addRest(fs, "third", "third_part1");
            },
            modifyAgainFs: fs => removeRest(fs, "first", "first_PART1")
        });

        verifyOutFileScenario({
            scenario: "emitHelpers in only one dependency project",
            modifyFs: fs => {
                addStubFoo(fs, "first", "first_PART1");
                addRest(fs, "second", "second_part1");
            },
            modifyAgainFs: fs => changeStubToRest(fs, "first", "first_PART1")
        });

        function addSpread(fs: vfs.FileSystem, project: string, file: string) {
            const path = `src/${project}/${file}.ts`;
            const content = fs.readFileSync(path, "utf8");
            fs.writeFileSync(path, `${content}
function ${project}${file}Spread(...b: number[]) { }
${project}${file}Spread(...[10, 20, 30]);`);

            replaceText(fs, `src/${project}/tsconfig.json`, `"strict": false,`, `"strict": false,
    "downlevelIteration": true,`);
        }

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
            modifyAgainFs: fs => removeRest(fs, "first", "first_PART1")
        });

        verifyOutFileScenario({
            scenario: "multiple emitHelpers in different projects",
            modifyFs: fs => {
                addRest(fs, "first", "first_PART1");
                addSpread(fs, "second", "second_part1");
                addRest(fs, "third", "third_part1");
            },
            modifyAgainFs: fs => removeRest(fs, "first", "first_PART1")
        });

        // triple slash refs
        // changes declaration because its emitted in .d.ts file
        function getTripleSlashRef(project: string) {
            return `/src/${project}/tripleRef.d.ts`;
        }

        function addTripleSlashRef(fs: vfs.FileSystem, project: string, file: string) {
            fs.writeFileSync(getTripleSlashRef(project), `declare class ${project}${file} { }`);
            prependText(fs, `src/${project}/${file}.ts`, `///<reference path="./tripleRef.d.ts"/>
const ${file}Const = new ${project}${file}();
`);
        }

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

        verifyOutFileScenario({
            scenario: "triple slash refs in one project",
            modifyFs: fs => addTripleSlashRef(fs, "second", "second_part1"),
            additionalSourceFiles: [
                getTripleSlashRef("second")
            ]
        });

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

        verifyOutFileScenario({
            scenario: "stripInternal",
            modifyFs: fs => stripInternalScenario(fs),
            modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
        });

        verifyOutFileScenario({
            scenario: "stripInternal with comments emit enabled",
            modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true),
            modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
        });

        verifyOutFileScenario({
            scenario: "stripInternal jsdoc style comment",
            modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
            modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/**@internal*/ interface`, "interface"),
        });

        verifyOutFileScenario({
            scenario: "stripInternal jsdoc style with comments emit enabled",
            modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
        });

        function makeOneTwoThreeDependOrder(fs: vfs.FileSystem) {
            replaceText(fs, sources[project.second][source.config], "[", `[
    { "path": "../first", "prepend": true }`);
            replaceText(fs, sources[project.third][source.config], `{ "path": "../first", "prepend": true },`, "");
        }

        function stripInternalWithDependentOrder(fs: vfs.FileSystem, removeCommentsDisabled?: boolean, jsDocStyle?: boolean) {
            stripInternalScenario(fs, removeCommentsDisabled, jsDocStyle);
            makeOneTwoThreeDependOrder(fs);
        }

        verifyOutFileScenario({
            scenario: "stripInternal when one-two-three are prepended in order",
            modifyFs: fs => stripInternalWithDependentOrder(fs),
            modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
            dependOrdered: true,
        });

        verifyOutFileScenario({
            scenario: "stripInternal with comments emit enabled when one-two-three are prepended in order",
            modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true),
            modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/*@internal*/ interface`, "interface"),
            dependOrdered: true,
        });

        verifyOutFileScenario({
            scenario: "stripInternal jsdoc style comment when one-two-three are prepended in order",
            modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
            modifyAgainFs: fs => replaceText(fs, sources[project.first][source.ts][part.one], `/**@internal*/ interface`, "interface"),
            dependOrdered: true,
        });

        verifyOutFileScenario({
            scenario: "stripInternal jsdoc style with comments emit enabled when one-two-three are prepended in order",
            modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
            dependOrdered: true,
        });

        verifyOutFileScenario({
            scenario: "when source files are empty in the own file",
            modifyFs: fs => fs.writeFileSync(sources[project.third][source.ts][part.one], "", "utf8")
        });
    });
}
