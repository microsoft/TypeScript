
namespace ts {
    describe("unittests:: tsbuild:: outFile::", () => {
        let outFileFs: vfs.FileSystem;
        const enum ext {
            js,
            jsmap,
            dts,
            dtsmap,
            buildinfo
        }
        const enum project {
            first,
            second,
            third
        }
        type OutputFile = [string, string, string, string, string];
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

        function build(fs: vfs.FileSystem, modifyFs: (fs: vfs.FileSystem) => void, withoutBuildInfo: boolean, ...expectedDiagnostics: fakes.ExpectedDiagnostic[]) {
            const actualReadFileMap = createMap<number>();
            modifyFs(fs);

            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host);
            host.clearDiagnostics();
            const originalReadFile = host.readFile;
            host.readFile = path => {
                // Dont record libs
                if (path.startsWith("/src/")) {
                    actualReadFileMap.set(path, (actualReadFileMap.get(path) || 0) + 1);
                }
                if (withoutBuildInfo && getBaseFileName(path) === infoFile) {
                    return undefined;
                }
                return originalReadFile.call(host, path);
            };
            if (withoutBuildInfo) {
                const originalWriteFile = host.writeFile;
                host.writeFile = (fileName, content, writeByteOrder) => {
                    return getBaseFileName(fileName) !== infoFile &&
                        originalWriteFile.call(host, fileName, content, writeByteOrder);
                };
            }
            builder.buildAllProjects();
            host.assertDiagnosticMessages(...expectedDiagnostics);
            return { fs, actualReadFileMap, host, builder };
        }

        function generateSourceMapBaselineFiles(fs: vfs.FileSystem) {
            for (const mapFile of [
                outputFiles[project.first][ext.jsmap],
                outputFiles[project.first][ext.dtsmap],
                outputFiles[project.second][ext.jsmap],
                outputFiles[project.second][ext.dtsmap],
                outputFiles[project.third][ext.jsmap],
                outputFiles[project.third][ext.dtsmap]
            ]) {
                const text = Harness.SourceMapRecorder.getSourceMapRecordWithVFS(fs, mapFile);
                fs.writeFileSync(`${mapFile}.baseline.txt`, text);
            }
        }

        function generateBaseline(fs: vfs.FileSystem, scenario: string, subScenario: string, withoutBuildInfo: boolean, baseFs?: vfs.FileSystem) {
            generateSourceMapBaselineFiles(fs);
            const patch = fs.diff(baseFs || outFileFs);
            // tslint:disable-next-line:no-null-keyword
            Harness.Baseline.runBaseline(`tsbuild/outFile/${subScenario.split(" ").join("-")}/${withoutBuildInfo ? "no-" : ""}buildInfo/${scenario.split(" ").join("-")}.js`, patch ? vfs.formatPatch(patch) : null);
        }

        function verifyOutFileScenarioWorker(
            scenario: string,
            modifyFs: (fs: vfs.FileSystem) => void,
            withoutBuildInfo: boolean,
            additionalSourceFiles?: ReadonlyArray<string>) {

            describe(`${scenario}${withoutBuildInfo ? " without build info" : ""}`, () => {
                function verifyWorker(
                    subScenario: string,
                    expectedReadFiles: ReadonlyArray<string>,
                    incrementalModifyFs?: (fs: vfs.FileSystem) => ReadonlyArray<fakes.ExpectedDiagnostic>,
                    fileWithTwoReadCalls?: string) {
                    describe(subScenario, () => {
                        let fs: vfs.FileSystem;
                        let actualReadFileMap: Map<number>;
                        let baseFs: vfs.FileSystem | undefined;
                        before(() => {
                            const result = build(outFileFs.shadow(), modifyFs, withoutBuildInfo,
                                getExpectedDiagnosticForProjectsInBuild("src/first/tsconfig.json", "src/second/tsconfig.json", "src/third/tsconfig.json"),
                                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/first/tsconfig.json", "src/first/bin/first-output.js"],
                                [Diagnostics.Building_project_0, "/src/first/tsconfig.json"],
                                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/second/tsconfig.json", "src/2/second-output.js"],
                                [Diagnostics.Building_project_0, "/src/second/tsconfig.json"],
                                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/third/tsconfig.json", "src/third/thirdjs/output/third-output.js"],
                                [Diagnostics.Building_project_0, "/src/third/tsconfig.json"]
                            );
                            ({ fs, actualReadFileMap } = result);
                            if (incrementalModifyFs) {
                                assert.equal(fs.statSync("src/third/thirdjs/output/third-output.js").mtimeMs, time(), "First build timestamp is correct");
                                tick();
                                generateSourceMapBaselineFiles(fs);
                                baseFs = fs.makeReadonly();
                                fs = baseFs.shadow();
                                const expectedDiagnostics = incrementalModifyFs(fs);
                                tick();
                                ({ actualReadFileMap } = build(fs, noop, withoutBuildInfo, ...expectedDiagnostics));
                                assert.equal(fs.statSync("src/third/thirdjs/output/third-output.js").mtimeMs, time(), "Second build timestamp is correct");
                            }
                        });
                        after(() => {
                            fs = undefined!;
                            actualReadFileMap = undefined!;
                            baseFs = undefined;
                        });
                        it(`Generates files matching the baseline`, () => {
                            generateBaseline(fs, scenario, subScenario, withoutBuildInfo, baseFs);
                        });
                        it("verify readFile calls", () => {
                            TestFSWithWatch.verifyMapSize("readFileCalls", actualReadFileMap, expectedReadFiles);
                            expectedReadFiles.forEach(expectedFile => {
                                const actual = actualReadFileMap.get(expectedFile);
                                const expected = fileWithTwoReadCalls && expectedFile === fileWithTwoReadCalls ? 2 : 1;
                                assert.equal(actual, expected, `Mismatch in read file call number for: ${expectedFile}
Not in Actual: ${JSON.stringify(mapDefined(expectedReadFiles, f => actualReadFileMap.has(f) ? undefined : f))}
Mismatch Actual: ${JSON.stringify(mapDefined(arrayFrom(actualReadFileMap.entries()),
                                    ([p, v]) => !contains(expectedReadFiles, p) || (p === fileWithTwoReadCalls && v !== 2) || (p !== fileWithTwoReadCalls && v !== 1) ? [p, v] : undefined))}`);
                            });
                        });
                    });
                }

                verifyWorker("initial Build", [
                    // Configs
                    "/src/third/tsconfig.json",
                    "/src/second/tsconfig.json",
                    "/src/first/tsconfig.json",

                    // Source files
                    "/src/third/third_part1.ts",
                    "/src/second/second_part1.ts",
                    "/src/second/second_part2.ts",
                    "/src/first/first_PART1.ts",
                    "/src/first/first_part2.ts",
                    "/src/first/first_part3.ts",

                    // Additional source Files
                    ...(additionalSourceFiles || emptyArray),

                    // outputs
                    ...outputFiles[project.first],
                    ...outputFiles[project.second]
                ]);

                verifyWorker("incremental declaration changes", [
                    // Configs
                    "/src/third/tsconfig.json",
                    "/src/second/tsconfig.json",
                    "/src/first/tsconfig.json",

                    // Source files
                    "/src/third/third_part1.ts",
                    "/src/first/first_PART1.ts",
                    "/src/first/first_part2.ts",
                    "/src/first/first_part3.ts",

                    // Additional source Files
                    ...(additionalSourceFiles || emptyArray),

                    // outputs
                    ...outputFiles[project.first],
                    ...outputFiles[project.second],
                    outputFiles[project.third][ext.dts],
                ], fs => {
                    replaceText(fs, "src/first/first_PART1.ts", "Hello", "Hola");
                    return [
                        getExpectedDiagnosticForProjectsInBuild("src/first/tsconfig.json", "src/second/tsconfig.json", "src/third/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/first/tsconfig.json", "src/first/bin/first-output.js", "src/first/first_PART1.ts"],
                        [Diagnostics.Building_project_0, "/src/first/tsconfig.json"],
                        [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/second/tsconfig.json", "src/second/second_part1.ts", "src/2/second-output.js"],
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/third/tsconfig.json", "src/third/thirdjs/output/third-output.js", "src/first"],
                        [Diagnostics.Building_project_0, "/src/third/tsconfig.json"]
                    ];
                }, outputFiles[project.first][ext.dts]); // dts changes so once read old content, and once new (to emit third)

                verifyWorker("incremental declaration doesnt change", [
                    // Configs
                    "/src/third/tsconfig.json",
                    "/src/second/tsconfig.json",
                    "/src/first/tsconfig.json",

                    // Source files
                    "/src/third/third_part1.ts",
                    "/src/first/first_PART1.ts",
                    "/src/first/first_part2.ts",
                    "/src/first/first_part3.ts",

                    // Additional source Files
                    ...(additionalSourceFiles || emptyArray),

                    // outputs
                    ...outputFiles[project.first],
                    ...outputFiles[project.second],
                    outputFiles[project.third][ext.dts],
                ], fs => {
                    appendFileContent(fs, "src/first/first_PART1.ts", "console.log(s);");
                    return [
                        getExpectedDiagnosticForProjectsInBuild("src/first/tsconfig.json", "src/second/tsconfig.json", "src/third/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/first/tsconfig.json", "src/first/bin/first-output.js", "src/first/first_PART1.ts"],
                        [Diagnostics.Building_project_0, "/src/first/tsconfig.json"],
                        [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/second/tsconfig.json", "src/second/second_part1.ts", "src/2/second-output.js"],
                        [Diagnostics.Project_0_is_out_of_date_because_output_to_prepend_from_its_dependency_1_has_changed, "src/third/tsconfig.json", "src/first"],
                        [Diagnostics.Building_project_0, "/src/third/tsconfig.json"]
                    ];
                });
            });
        }

        function verifyOutFileScenario(scenario: string, modifyFs: (fs: vfs.FileSystem) => void, additionalSourceFiles?: ReadonlyArray<string>) {
            verifyOutFileScenarioWorker(scenario, modifyFs, /*withoutBuildInfo*/ false, additionalSourceFiles);
            verifyOutFileScenarioWorker(scenario, modifyFs, /*withoutBuildInfo*/ true, additionalSourceFiles);
        }

        verifyOutFileScenario("baseline sectioned sourcemaps", noop);

        verifyOutFileScenario("when final project is not composite but uses project references", fs => replaceFileContent(fs, "/src/third/tsconfig.json", `"composite": true,`, ""));

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
                getExpectedDiagnosticForProjectsInBuild("src/first/tsconfig.json", "src/second/tsconfig.json", "src/third/tsconfig.json"),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/first/tsconfig.json", "src/first/bin/first-output.js"],
                [Diagnostics.Building_project_0, "/src/first/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/second/tsconfig.json", "src/2/second-output.js"],
                [Diagnostics.Building_project_0, "/src/second/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/third/tsconfig.json", "src/third/thirdjs/output/third-output.js"],
                [Diagnostics.Building_project_0, "/src/third/tsconfig.json"]
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
                getExpectedDiagnosticForProjectsInBuild("src/first/tsconfig.json", "src/second/tsconfig.json", "src/third/tsconfig.json"),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/first/tsconfig.json", "src/first/bin/first-output.js"],
                [Diagnostics.Building_project_0, "/src/first/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/second/tsconfig.json", "src/2/second-output.js"],
                [Diagnostics.Building_project_0, "/src/second/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/third/tsconfig.json", "src/third/thirdjs/output/third-output.js"],
                [Diagnostics.Building_project_0, "/src/third/tsconfig.json"]
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
                getExpectedDiagnosticForProjectsInBuild("src/first/tsconfig.json", "src/second/tsconfig.json", "src/third/tsconfig.json"),
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/first/tsconfig.json", "src/first/first_PART1.ts", "src/first/bin/first-output.js"],
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/second/tsconfig.json", "src/second/second_part1.ts", "src/2/second-output.js"],
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/third/tsconfig.json", "src/third/third_part1.ts", "src/third/thirdjs/output/third-output.js"],
            );
        });

        function replaceFileContent(fs: vfs.FileSystem, path: string, searchValue: string, replaceValue: string) {
            const content = fs.readFileSync(path, "utf8");
            fs.writeFileSync(path, content.replace(searchValue, replaceValue));
        }

        function prependFileContent(fs: vfs.FileSystem, path: string, additionalContent: string) {
            const content = fs.readFileSync(path, "utf8");
            fs.writeFileSync(path, `${additionalContent}${content}`);
        }

        function appendFileContent(fs: vfs.FileSystem, path: string, additionalContent: string) {
            const content = fs.readFileSync(path, "utf8");
            fs.writeFileSync(path, `${content}${additionalContent}`);
        }

        // Prologues
        function enableStrict(fs: vfs.FileSystem, path: string) {
            replaceFileContent(fs, path, `"strict": false`, `"strict": true`);
        }
        verifyOutFileScenario("strict in all projects", fs => {
            enableStrict(fs, "src/first/tsconfig.json");
            enableStrict(fs, "src/second/tsconfig.json");
            enableStrict(fs, "src/third/tsconfig.json");
        });
        verifyOutFileScenario("strict in one dependency", fs => {
            enableStrict(fs, "src/second/tsconfig.json");
        });

        function addPrologue(fs: vfs.FileSystem, path: string, prologue: string) {
            prependFileContent(fs, path, `${prologue}
`);
        }
        verifyOutFileScenario("multiple prologues in all projects", fs => {
            enableStrict(fs, "src/first/tsconfig.json");
            addPrologue(fs, "src/first/first_PART1.ts", `"myPrologue"`);
            enableStrict(fs, "src/second/tsconfig.json");
            addPrologue(fs, "src/second/second_part1.ts", `"myPrologue"`);
            addPrologue(fs, "src/second/second_part2.ts", `"myPrologue2";`);
            enableStrict(fs, "src/third/tsconfig.json");
            addPrologue(fs, "src/third/third_part1.ts", `"myPrologue";`);
            addPrologue(fs, "src/third/third_part1.ts", `"myPrologue3";`);
        });
        verifyOutFileScenario("multiple prologues in different projects", fs => {
            enableStrict(fs, "src/first/tsconfig.json");
            addPrologue(fs, "src/second/second_part1.ts", `"myPrologue"`);
            addPrologue(fs, "src/second/second_part2.ts", `"myPrologue2";`);
            enableStrict(fs, "src/third/tsconfig.json");
        });

        // Shebang
        function addShebang(fs: vfs.FileSystem, project: string, file: string) {
            prependFileContent(fs, `src/${project}/${file}.ts`, `#!someshebang ${project} ${file}
`);
        }
        verifyOutFileScenario("shebang in all projects", fs => {
            addShebang(fs, "first", "first_PART1");
            addShebang(fs, "first", "first_part2");
            addShebang(fs, "second", "second_part1");
            addShebang(fs, "third", "third_part1");
        });
        verifyOutFileScenario("shebang in only one dependency project", fs => {
            addShebang(fs, "second", "second_part1");
        });

        // emitHelpers
        function addExtendsClause(fs: vfs.FileSystem, project: string, file: string) {
            appendFileContent(fs, `src/${project}/${file}.ts`, `
class ${project}1 { }
class ${project}2 extends ${project}1 { }`);
        }
        verifyOutFileScenario("emitHelpers in all projects", fs => {
            addExtendsClause(fs, "first", "first_part2");
            addExtendsClause(fs, "second", "second_part1");
            addExtendsClause(fs, "third", "third_part1");
        });
        verifyOutFileScenario("emitHelpers in only one dependency project", fs => {
            addExtendsClause(fs, "second", "second_part1");
        });
        function addSpread(fs: vfs.FileSystem, project: string, file: string) {
            const path = `src/${project}/${file}.ts`;
            const content = fs.readFileSync(path, "utf8");
            fs.writeFileSync(path, `${content}
function ${project}${file}Spread(...b: number[]) { }
${project}${file}Spread(...[10, 20, 30]);`);

            replaceFileContent(fs, `src/${project}/tsconfig.json`, `"strict": false,`, `"strict": false,
    "downlevelIteration": true,`);
        }
        verifyOutFileScenario("multiple emitHelpers in all projects", fs => {
            addExtendsClause(fs, "first", "first_part2");
            addSpread(fs, "first", "first_part3");
            addExtendsClause(fs, "second", "second_part1");
            addSpread(fs, "second", "second_part2");
            addExtendsClause(fs, "third", "third_part1");
            addSpread(fs, "third", "third_part1");
        });
        verifyOutFileScenario("multiple emitHelpers in different projects", fs => {
            addSpread(fs, "first", "first_part3");
            addExtendsClause(fs, "second", "second_part1");
            addSpread(fs, "third", "third_part1");
        });

        // triple slash refs
        function getTripleSlashRef(project: string) {
            return `/src/${project}/tripleRef.d.ts`;
        }
        function addTripleSlashRef(fs: vfs.FileSystem, project: string, file: string) {
            fs.writeFileSync(getTripleSlashRef(project), `declare class ${project}${file} { }`);
            prependFileContent(fs, `src/${project}/${file}.ts`, `///<reference path="./tripleRef.d.ts"/>
const ${file}Const = new ${project}${file}();
`);
        }
        verifyOutFileScenario("triple slash refs in all projects", fs => {
            addTripleSlashRef(fs, "first", "first_part2");
            addTripleSlashRef(fs, "second", "second_part1");
            addTripleSlashRef(fs, "third", "third_part1");
        }, [getTripleSlashRef("first"), getTripleSlashRef("second"), getTripleSlashRef("third")]);
        verifyOutFileScenario("triple slash refs in one project", fs => addTripleSlashRef(fs, "second", "second_part1"), [getTripleSlashRef("second")]);
    });
}
