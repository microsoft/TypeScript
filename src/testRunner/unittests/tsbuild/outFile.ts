
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
        const relSources = sources.map(([config, sources]) => [relName(config), sources.map(relName)]) as [Sources, Sources, Sources];
        const { time, tick } = getTime();
        before(() => {
            outFileFs = loadProjectFromDisk("tests/projects/outfile-concat", time);
        });
        after(() => {
            outFileFs = undefined!;
        });

        function createSolutionBuilder(host: fakes.SolutionBuilderHost) {
            return ts.createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: true });
        }

        function verifyOutFileScenario({ scenario, modifyFs, modifyAgainFs, additionalSourceFiles }: { scenario: string; modifyFs: (fs: vfs.FileSystem) => void; modifyAgainFs?: (fs: vfs.FileSystem) => void; additionalSourceFiles?: ReadonlyArray<string>; }) {
            const incrementalDtsUnchangedWithBuildInfo: ExpectedBuildOutputPerState = {
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
                    [Diagnostics.Building_project_0, sources[project.first][source.config]],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
                    [Diagnostics.Project_0_is_out_of_date_because_output_javascript_and_source_map_if_specified_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/first"],
                    [Diagnostics.Updating_output_javascript_and_javascript_source_map_if_specified_of_project_0, sources[project.third][source.config]],
                    [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, sources[project.third][source.config]]
                ],
                expectedReadFiles: getReadFilesMap([
                    // Configs
                    sources[project.first][source.config],
                    sources[project.second][source.config],
                    sources[project.third][source.config],

                    // Source files
                    ...sources[project.first][source.ts],

                    // Additional source Files
                    ...(additionalSourceFiles && additionalSourceFiles.length === 3 ? [additionalSourceFiles[project.first]] : emptyArray),

                    // outputs to prepend
                    ...outputFiles[project.first],
                    ...outputFiles[project.second],
                    ...outputFiles[project.third]
                ])
            };
            const incrementalDtsUnchangedWithoutBuildInfo: ExpectedBuildOutputPerState = {
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
                    [Diagnostics.Building_project_0, sources[project.first][source.config]],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
                    [Diagnostics.Project_0_is_out_of_date_because_output_javascript_and_source_map_if_specified_of_its_dependency_1_has_changed, relSources[project.third][source.config], "src/first"],
                    [Diagnostics.Updating_output_javascript_and_javascript_source_map_if_specified_of_project_0, sources[project.third][source.config]],
                    [Diagnostics.Cannot_update_output_javascript_and_javascript_source_map_if_specified_of_project_0_because_there_was_error_reading_file_1, sources[project.third][source.config], relOutputFiles[project.third][ext.buildinfo]],
                    [Diagnostics.Building_project_0, sources[project.third][source.config]]
                ],
                expectedReadFiles: getReadFilesMap([
                    // Configs
                    sources[project.first][source.config],
                    sources[project.second][source.config],
                    sources[project.third][source.config],

                    // Source files
                    ...sources[project.first][source.ts],
                    ...sources[project.third][source.ts],

                    // Additional source Files
                    ...(additionalSourceFiles || emptyArray),

                    // outputs
                    ...outputFiles[project.first],
                    ...outputFiles[project.second],
                    outputFiles[project.third][ext.dts],

                    // To prepend:: checked to see if we can do prepend manipulation
                    outputFiles[project.third][ext.buildinfo],
                ])
            };

            verifyTsbuildOutput({
                scenario,
                projFs: () => outFileFs,
                time,
                tick,
                proj: "outfile-concat",
                rootNames: ["/src/third"],
                expectedMapFileNames,
                lastProjectOutputJs: outputFiles[project.third][ext.js],
                initialBuild: {
                    modifyFs,
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.first][source.config], relOutputFiles[project.first][ext.js]],
                        [Diagnostics.Building_project_0, sources[project.first][source.config]],
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.second][source.config], relOutputFiles[project.second][ext.js]],
                        [Diagnostics.Building_project_0, sources[project.second][source.config]],
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, relSources[project.third][source.config], relOutputFiles[project.third][ext.js]],
                        [Diagnostics.Building_project_0, sources[project.third][source.config]]
                    ],
                    expectedReadFiles: arrayToMap([
                        // Configs
                        sources[project.first][source.config],
                        sources[project.second][source.config],
                        sources[project.third][source.config],

                        // Source files
                        ...sources[project.first][source.ts],
                        ...sources[project.second][source.ts],
                        ...sources[project.third][source.ts],

                        // Additional source Files
                        ...(additionalSourceFiles || emptyArray),

                        // outputs
                        ...outputFiles[project.first],
                        ...outputFiles[project.second]
                    ], identity, () => 1)
                },
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, relSources[project.first][source.ts][part.one], "Hello", "Hola"),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild(relSources[project.first][source.config], relSources[project.second][source.config], relSources[project.third][source.config]),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.first][source.config], relOutputFiles[project.first][ext.js], relSources[project.first][source.ts][part.one]],
                        [Diagnostics.Building_project_0, sources[project.first][source.config]],
                        [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, relSources[project.second][source.config], relSources[project.second][source.ts][part.one], relOutputFiles[project.second][ext.js]],
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, relSources[project.third][source.config], relOutputFiles[project.third][ext.js], "src/first"],
                        [Diagnostics.Building_project_0, sources[project.third][source.config]]
                    ],
                    expectedReadFiles: getReadFilesMap(
                        [
                            // Configs
                            sources[project.first][source.config],
                            sources[project.second][source.config],
                            sources[project.third][source.config],

                            // Source files
                            ...sources[project.first][source.ts],
                            ...sources[project.third][source.ts],

                            // Additional source Files
                            ...(additionalSourceFiles || emptyArray),

                            // outputs
                            ...outputFiles[project.first],
                            ...outputFiles[project.second],
                            outputFiles[project.third][ext.dts],
                        ],
                        outputFiles[project.first][ext.dts] // dts changes so once read old content, and once new (to emit third)
                    )
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
                }
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
    });
}
