namespace ts {
    describe("unittests:: tsbuild:: on 'sample1' project", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        const testsOutputs = ["/src/tests/index.js", "/src/tests/index.d.ts", "/src/tests/tsconfig.tsbuildinfo"];
        const logicOutputs = ["/src/logic/index.js", "/src/logic/index.js.map", "/src/logic/index.d.ts", "/src/logic/tsconfig.tsbuildinfo"];
        const coreOutputs = ["/src/core/index.js", "/src/core/index.d.ts", "/src/core/index.d.ts.map", "/src/core/tsconfig.tsbuildinfo"];
        const allExpectedOutputs = [...testsOutputs, ...logicOutputs, ...coreOutputs];

        before(() => {
            projFs = loadProjectFromDisk("tests/projects/sample1", time);
        });

        after(() => {
            projFs = undefined!; // Release the contents
        });

        describe("sanity check of clean build of 'sample1' project", () => {
            it("can build the sample project 'sample1' without error", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: false });

                host.clearDiagnostics();
                builder.build();
                host.assertDiagnosticMessages(/*empty*/);

                // Check for outputs. Not an exhaustive list
                verifyOutputsPresent(fs, allExpectedOutputs);
            });

            it("builds correctly when outDir is specified", () => {
                const fs = projFs.shadow();
                fs.writeFileSync("/src/logic/tsconfig.json", JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, sourceMap: true, outDir: "outDir" },
                    references: [{ path: "../core" }]
                }));

                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.build();
                host.assertDiagnosticMessages(/*empty*/);
                const expectedOutputs = allExpectedOutputs.map(f => f.replace("/logic/", "/logic/outDir/"));
                // Check for outputs. Not an exhaustive list
                verifyOutputsPresent(fs, expectedOutputs);
            });

            it("builds correctly when declarationDir is specified", () => {
                const fs = projFs.shadow();
                fs.writeFileSync("/src/logic/tsconfig.json", JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, sourceMap: true, declarationDir: "out/decls" },
                    references: [{ path: "../core" }]
                }));

                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.build();
                host.assertDiagnosticMessages(/*empty*/);
                const expectedOutputs = allExpectedOutputs.map(f => f.replace("/logic/index.d.ts", "/logic/out/decls/index.d.ts"));
                // Check for outputs. Not an exhaustive list
                verifyOutputsPresent(fs, expectedOutputs);
            });

            it("builds correctly when project is not composite or doesnt have any references", () => {
                const fs = projFs.shadow();
                replaceText(fs, "/src/core/tsconfig.json", `"composite": true,`, "");
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/core"], { verbose: true });
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"]
                );
                verifyOutputsPresent(fs, ["/src/core/index.js", "/src/core/index.d.ts", "/src/core/index.d.ts.map"]);
            });
        });

        describe("dry builds", () => {
            it("doesn't write any files in a dry build", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: true, force: false, verbose: false });
                builder.build();
                host.assertDiagnosticMessages(
                    [Diagnostics.A_non_dry_build_would_build_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.A_non_dry_build_would_build_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.A_non_dry_build_would_build_project_0, "/src/tests/tsconfig.json"]
                );

                // Check for outputs to not be written. Not an exhaustive list
                verifyOutputsAbsent(fs, allExpectedOutputs);
            });

            it("indicates that it would skip builds during a dry build", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);

                let builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: false });
                builder.build();
                tick();

                host.clearDiagnostics();
                builder = createSolutionBuilder(host, ["/src/tests"], { dry: true, force: false, verbose: false });
                builder.build();
                host.assertDiagnosticMessages(
                    [Diagnostics.Project_0_is_up_to_date, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date, "/src/tests/tsconfig.json"]
                );
            });
        });

        describe("clean builds", () => {
            it("removes all files it built", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);

                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: false });
                builder.build();
                // Verify they exist
                verifyOutputsPresent(fs, allExpectedOutputs);

                builder.clean();
                // Verify they are gone
                verifyOutputsAbsent(fs, allExpectedOutputs);

                // Subsequent clean shouldn't throw / etc
                builder.clean();
                verifyOutputsAbsent(fs, allExpectedOutputs);

                builder.build();
                // Verify they exist
                verifyOutputsPresent(fs, allExpectedOutputs);
            });

            it("cleans till project specified", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.build();
                const result = builder.clean("/src/logic");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsPresent(fs, testsOutputs);
                verifyOutputsAbsent(fs, [...logicOutputs, ...coreOutputs]);
                assert.equal(result, ExitStatus.Success);
            });

            it("cleaning project in not build order doesnt throw error", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.build();
                const result = builder.clean("/src/logic2");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsPresent(fs, allExpectedOutputs);
                assert.equal(result, ExitStatus.InvalidProject_OutputsSkipped);
            });
        });

        describe("force builds", () => {
            it("always builds under --force", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);

                let builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: true, verbose: false });
                builder.build();
                let currentTime = time();
                checkOutputTimestamps(currentTime);

                tick();
                Debug.assert(time() !== currentTime, "Time moves on");
                currentTime = time();
                builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: true, verbose: false });
                builder.build();
                checkOutputTimestamps(currentTime);

                function checkOutputTimestamps(expected: number) {
                    // Check timestamps
                    for (const output of allExpectedOutputs) {
                        const actual = fs.statSync(output).mtimeMs;
                        assert(actual === expected, `File ${output} has timestamp ${actual}, expected ${expected}`);
                    }
                }
            });
        });

        describe("can detect when and what to rebuild", () => {
            function initializeWithBuild(opts?: BuildOptions) {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                let builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.build();
                host.clearDiagnostics();
                tick();
                builder = createSolutionBuilder(host, ["/src/tests"], { ...(opts || {}), verbose: true });
                return { fs, host, builder };
            }

            it("Builds the project", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
            });

            // All three projects are up to date
            it("Detects that all projects are up to date", () => {
                const { host, builder } = initializeWithBuild();
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/tests/tsconfig.json", "src/tests/index.ts", "src/tests/index.js"]
                );
            });

            // Update a file in the leaf node (tests), only it should rebuild the last one
            it("Only builds the leaf node project", () => {
                const { fs, host, builder } = initializeWithBuild();
                fs.writeFileSync("/src/tests/index.ts", "const m = 10;");
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tests/tsconfig.json", "src/tests/index.js", "src/tests/index.ts"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
            });

            // Update a file in the parent (without affecting types), should get fast downstream builds
            it("Detects type-only changes in upstream projects", () => {
                const { fs, host, builder } = initializeWithBuild();
                replaceText(fs, "/src/core/index.ts", "HELLO WORLD", "WELCOME PLANET");
                builder.build();

                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/core/tsconfig.json", "src/core/anotherModule.js", "src/core/index.ts"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/logic/tsconfig.json"],
                    [Diagnostics.Updating_output_timestamps_of_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/tests/tsconfig.json"],
                    [Diagnostics.Updating_output_timestamps_of_project_0, "/src/tests/tsconfig.json"]
                );
            });

            it("rebuilds completely when version in tsbuildinfo doesnt match ts version", () => {
                const { host, builder } = initializeWithBuild();
                changeCompilerVersion(host);
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, "src/core/tsconfig.json", fakes.version, version],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, "src/logic/tsconfig.json", fakes.version, version],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, "src/tests/tsconfig.json", fakes.version, version],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"],
                );
            });

            it("does not rebuild if there is no program and bundle in the ts build info event if version doesnt match ts version", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs, /*options*/ undefined, /*setParentNodes*/ undefined, createAbstractBuilder);
                let builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
                verifyOutputsPresent(fs, allExpectedOutputs);

                host.clearDiagnostics();
                tick();
                builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                changeCompilerVersion(host);
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/tests/tsconfig.json", "src/tests/index.ts", "src/tests/index.js"]
                );
            });

            it("rebuilds from start if --f is passed", () => {
                const { host, builder } = initializeWithBuild({ force: true });
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/logic/tsconfig.json"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/tests/tsconfig.json"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
            });

            it("rebuilds when tsconfig changes", () => {
                const { fs, host, builder } = initializeWithBuild();
                replaceText(fs, "/src/tests/tsconfig.json", `"composite": true`, `"composite": true, "target": "es3"`);
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tests/tsconfig.json", "src/tests/index.js", "src/tests/tsconfig.json"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"],
                );
            });

            it("rebuilds when extended config file changes", () => {
                const fs = projFs.shadow();
                fs.writeFileSync("/src/tests/tsconfig.base.json", JSON.stringify({ compilerOptions: { target: "es3" } }));
                replaceText(fs, "/src/tests/tsconfig.json", `"references": [`, `"extends": "./tsconfig.base.json", "references": [`);
                const host = new fakes.SolutionBuilderHost(fs);
                let builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
                host.clearDiagnostics();
                tick();
                builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                fs.writeFileSync("/src/tests/tsconfig.base.json", JSON.stringify({ compilerOptions: {} }));
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tests/tsconfig.json", "src/tests/index.js", "src/tests/tsconfig.base.json"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
            });

            it("builds till project specified", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                const result = builder.build("/src/logic");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsAbsent(fs, testsOutputs);
                verifyOutputsPresent(fs, [...logicOutputs, ...coreOutputs]);
                assert.equal(result, ExitStatus.Success);
            });

            it("building project in not build order doesnt throw error", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                const result = builder.build("/src/logic2");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsAbsent(fs, allExpectedOutputs);
                assert.equal(result, ExitStatus.InvalidProject_OutputsSkipped);
            });

            it("building using getNextInvalidatedProject", () => {
                interface SolutionBuilderResult<T> {
                    project: ResolvedConfigFileName;
                    result: T;
                }

                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                verifyBuildNextResult({
                    project: "/src/core/tsconfig.json" as ResolvedConfigFileName,
                    result: ExitStatus.Success
                }, coreOutputs, [...logicOutputs, ...testsOutputs]);

                verifyBuildNextResult({
                    project: "/src/logic/tsconfig.json" as ResolvedConfigFileName,
                    result: ExitStatus.Success
                }, [...coreOutputs, ...logicOutputs], testsOutputs);

                verifyBuildNextResult({
                    project: "/src/tests/tsconfig.json" as ResolvedConfigFileName,
                    result: ExitStatus.Success
                }, allExpectedOutputs, emptyArray);

                verifyBuildNextResult(/*expected*/ undefined, allExpectedOutputs, emptyArray);

                function verifyBuildNextResult(
                    expected: SolutionBuilderResult<ExitStatus> | undefined,
                    presentOutputs: readonly string[],
                    absentOutputs: readonly string[]
                ) {
                    const project = builder.getNextInvalidatedProject();
                    const result = project && project.done();
                    assert.deepEqual(project && { project: project.project, result }, expected);
                    verifyOutputsPresent(fs, presentOutputs);
                    verifyOutputsAbsent(fs, absentOutputs);
                }
            });

            it("building using buildReferencedProject", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.buildReferences("/src/tests");
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                );
                verifyOutputsPresent(fs, [...coreOutputs, ...logicOutputs]);
                verifyOutputsAbsent(fs, testsOutputs);
            });
        });

        describe("downstream-blocked compilations", () => {
            it("won't build downstream projects if upstream projects have errors", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: true });

                // Induce an error in the middle project
                replaceText(fs, "/src/logic/index.ts", "c.multiply(10, 15)", `c.muitply()`);
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    {
                        message: [Diagnostics.Property_0_does_not_exist_on_type_1, "muitply", `typeof import("/src/core/index")`],
                        location: expectedLocationIndexOf(fs, "/src/logic/index.ts", "muitply"),
                    },
                    [Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors, "src/tests/tsconfig.json", "src/logic"],
                    [Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors, "/src/tests/tsconfig.json", "/src/logic"]
                );
            });
        });

        describe("project invalidation", () => {
            it("invalidates projects correctly", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: false });

                builder.build();
                host.assertDiagnosticMessages(/*empty*/);

                // Update a timestamp in the middle project
                tick();
                appendText(fs, "/src/logic/index.ts", "function foo() {}");
                const originalWriteFile = fs.writeFileSync;
                const writtenFiles = createMap<true>();
                fs.writeFileSync = (path, data, encoding) => {
                    writtenFiles.set(path, true);
                    originalWriteFile.call(fs, path, data, encoding);
                };
                // Because we haven't reset the build context, the builder should assume there's nothing to do right now
                const status = builder.getUpToDateStatusOfProject("/src/logic");
                assert.equal(status.type, UpToDateStatusType.UpToDate, "Project should be assumed to be up-to-date");
                verifyInvalidation(/*expectedToWriteTests*/ false);

                // Rebuild this project
                fs.writeFileSync("/src/logic/index.ts", `${fs.readFileSync("/src/logic/index.ts")}
export class cNew {}`);
                verifyInvalidation(/*expectedToWriteTests*/ true);

                function verifyInvalidation(expectedToWriteTests: boolean) {
                    // Rebuild this project
                    tick();
                    builder.invalidateProject("/src/logic/tsconfig.json" as ResolvedConfigFilePath);
                    builder.buildNextInvalidatedProject();
                    // The file should be updated
                    assert.isTrue(writtenFiles.has("/src/logic/index.js"), "JS file should have been rebuilt");
                    assert.equal(fs.statSync("/src/logic/index.js").mtimeMs, time(), "JS file should have been rebuilt");
                    assert.isFalse(writtenFiles.has("/src/tests/index.js"), "Downstream JS file should *not* have been rebuilt");
                    assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should *not* have been rebuilt");
                    writtenFiles.clear();

                    // Build downstream projects should update 'tests', but not 'core'
                    tick();
                    builder.buildNextInvalidatedProject();
                    if (expectedToWriteTests) {
                        assert.isTrue(writtenFiles.has("/src/tests/index.js"), "Downstream JS file should have been rebuilt");
                    }
                    else {
                        assert.equal(writtenFiles.size, 0, "Should not write any new files");
                    }
                    assert.equal(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should have new timestamp");
                    assert.isBelow(fs.statSync("/src/core/index.js").mtimeMs, time(), "Upstream JS file should not have been rebuilt");
                }
            });
        });

        describe("lists files", () => {
            it("listFiles", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { listFiles: true });
                builder.build();
                assert.deepEqual(host.traces, [
                    "/lib/lib.d.ts",
                    "/src/core/anotherModule.ts",
                    "/src/core/index.ts",
                    "/src/core/some_decl.d.ts",
                    "/lib/lib.d.ts",
                    ...getCoreOutputs(),
                    "/src/logic/index.ts",
                    "/lib/lib.d.ts",
                    ...getCoreOutputs(),
                    "/src/logic/index.d.ts",
                    "/src/tests/index.ts"
                ]);

                function getCoreOutputs() {
                    return [
                        "/src/core/index.d.ts",
                        "/src/core/anotherModule.d.ts"
                    ];
                }
            });

            it("listEmittedFiles", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { listEmittedFiles: true });
                builder.build();
                assert.deepEqual(host.traces, [
                    "TSFILE: /src/core/anotherModule.js",
                    "TSFILE: /src/core/anotherModule.d.ts.map",
                    "TSFILE: /src/core/anotherModule.d.ts",
                    "TSFILE: /src/core/index.js",
                    "TSFILE: /src/core/index.d.ts.map",
                    "TSFILE: /src/core/index.d.ts",
                    "TSFILE: /src/core/tsconfig.tsbuildinfo",
                    "TSFILE: /src/logic/index.js.map",
                    "TSFILE: /src/logic/index.js",
                    "TSFILE: /src/logic/index.d.ts",
                    "TSFILE: /src/logic/tsconfig.tsbuildinfo",
                    "TSFILE: /src/tests/index.js",
                    "TSFILE: /src/tests/index.d.ts",
                    "TSFILE: /src/tests/tsconfig.tsbuildinfo",
                ]);
            });
        });

        describe("emit output", () => {
            const initialBuild: BuildState = {
                modifyFs: noop,
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                ],
                expectedReadFiles: getReadFilesMap(
                    [
                        // Configs
                        "/src/core/tsconfig.json",
                        "/src/logic/tsconfig.json",
                        "/src/tests/tsconfig.json",

                        // Source files
                        "/src/core/anotherModule.ts",
                        "/src/core/index.ts",
                        "/src/core/some_decl.d.ts",
                        "/src/logic/index.ts",
                        "/src/tests/index.ts",

                        // Modules of generated files
                        "/src/core/anotherModule.d.ts",
                        "/src/core/index.d.ts",
                        "/src/logic/index.d.ts",

                        // build info
                        "/src/core/tsconfig.tsbuildinfo",
                        "/src/logic/tsconfig.tsbuildinfo",
                        "/src/tests/tsconfig.tsbuildinfo"
                    ]
                )
            };
            verifyTsbuildOutput({
                scenario: "sample",
                projFs: () => projFs,
                time,
                tick,
                proj: "sample1",
                rootNames: ["/src/tests"],
                baselineSourceMap: true,
                initialBuild,
                incrementalDtsChangedBuild: {
                    modifyFs: fs => appendText(fs, "/src/core/index.ts", `
export class someClass { }`),
                    expectedDiagnostics: [
                        // Emits only partial core instead of all outputs
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/core/tsconfig.json", "src/core/anotherModule.js", "src/core/index.ts"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                        [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, "/src/core/tsconfig.json"],
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/logic/tsconfig.json", "src/logic/index.js", "src/core"],
                        [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tests/tsconfig.json", "src/tests/index.js", "src/core"],
                        [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"],
                    ],
                    expectedReadFiles: getReadFilesMap(
                        [
                            // Configs
                            "/src/core/tsconfig.json",
                            "/src/logic/tsconfig.json",
                            "/src/tests/tsconfig.json",

                            // Source files
                            "/src/core/anotherModule.ts",
                            "/src/core/index.ts",
                            "/src/core/some_decl.d.ts",
                            "/src/logic/index.ts",
                            "/src/tests/index.ts",

                            // Modules of generated files
                            "/src/core/anotherModule.d.ts",
                            "/src/core/index.d.ts",
                            "/src/logic/index.d.ts",

                            // build info
                            "/src/core/tsconfig.tsbuildinfo",
                            "/src/logic/tsconfig.tsbuildinfo",
                            "/src/tests/tsconfig.tsbuildinfo",

                            "/src/tests/index.d.ts", // to check if d.ts has changed
                        ],
                        "/src/core/index.d.ts", // to check if changed, and to build other projects after change
                    ),
                },
                incrementalDtsUnchangedBuild: {
                    modifyFs: fs => appendText(fs, "/src/core/index.ts", `
class someClass { }`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/core/tsconfig.json", "src/core/anotherModule.js", "src/core/index.ts"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                        [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, "/src/core/tsconfig.json"],
                        [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/logic/tsconfig.json"],
                        [Diagnostics.Updating_output_timestamps_of_project_0, "/src/logic/tsconfig.json"],
                        [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/tests/tsconfig.json"],
                        [Diagnostics.Updating_output_timestamps_of_project_0, "/src/tests/tsconfig.json"]
                    ],
                    expectedReadFiles: getReadFilesMap(
                        [
                            // Configs
                            "/src/core/tsconfig.json",
                            "/src/logic/tsconfig.json",
                            "/src/tests/tsconfig.json",

                            // Source files
                            "/src/core/anotherModule.ts",
                            "/src/core/index.ts",
                            "/src/core/some_decl.d.ts",

                            // to check if changed
                            "/src/core/index.d.ts",

                            // build info
                            "/src/core/tsconfig.tsbuildinfo",
                            "/src/logic/tsconfig.tsbuildinfo",
                            "/src/tests/tsconfig.tsbuildinfo",
                        ],
                    )
                },
            });

            verifyTsbuildOutput({
                scenario: "when logic config changes declaration dir",
                projFs: () => projFs,
                time,
                tick,
                proj: "sample1",
                rootNames: ["/src/tests"],
                baselineSourceMap: true,
                initialBuild,
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, "/src/logic/tsconfig.json", `"declaration": true,`, `"declaration": true,
        "declarationDir": "decls",`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                        [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/decls/index.d.ts"],
                        [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tests/tsconfig.json", "src/tests/index.js", "src/logic"],
                        [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"],
                    ],
                    expectedReadFiles: getReadFilesMap(
                        [
                            // Configs
                            "/src/core/tsconfig.json",
                            "/src/logic/tsconfig.json",
                            "/src/tests/tsconfig.json",

                            // Source files
                            "/src/logic/index.ts",
                            "/src/tests/index.ts",

                            // Modules of generated files
                            "/src/core/anotherModule.d.ts",
                            "/src/core/index.d.ts",
                            "/src/logic/decls/index.d.ts",

                            // build info
                            "/src/core/tsconfig.tsbuildinfo",
                            "/src/logic/tsconfig.tsbuildinfo",
                            "/src/tests/tsconfig.tsbuildinfo",

                            "/src/tests/index.d.ts", // to check if d.ts has changed
                        ]
                    )
                },
            });

            verifyTsbuildOutput({
                scenario: "when logic specifies tsBuildInfoFile",
                projFs: () => projFs,
                time,
                tick,
                proj: "sample1",
                rootNames: ["/src/tests"],
                baselineSourceMap: true,
                initialBuild: {
                    modifyFs: fs => replaceText(fs, "/src/logic/tsconfig.json", `"composite": true,`, `"composite": true,
        "tsBuildInfoFile": "ownFile.tsbuildinfo",`),
                    expectedDiagnostics: initialBuild.expectedDiagnostics,
                    expectedReadFiles: getReadFilesMap(
                        [
                            // Configs
                            "/src/core/tsconfig.json",
                            "/src/logic/tsconfig.json",
                            "/src/tests/tsconfig.json",

                            // Source files
                            "/src/core/anotherModule.ts",
                            "/src/core/index.ts",
                            "/src/core/some_decl.d.ts",
                            "/src/logic/index.ts",
                            "/src/tests/index.ts",

                            // Modules of generated files
                            "/src/core/anotherModule.d.ts",
                            "/src/core/index.d.ts",
                            "/src/logic/index.d.ts",

                            // build info
                            "/src/core/tsconfig.tsbuildinfo",
                            "/src/logic/ownFile.tsbuildinfo",
                            "/src/tests/tsconfig.tsbuildinfo"
                        ]
                    )
                },
            });

            verifyTsbuildOutput({
                scenario: "when declaration option changes",
                projFs: () => projFs,
                time,
                tick,
                proj: "sample1",
                rootNames: ["/src/core"],
                initialBuild: {
                    modifyFs: fs => fs.writeFileSync("/src/core/tsconfig.json", `{
    "compilerOptions": {
        "incremental": true,
        "skipDefaultLibCheck": true
    }
}`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    ]
                },
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", `"incremental": true,`, `"incremental": true, "declaration": true,`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.d.ts"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"]
                    ]
                },
                baselineOnly: true,
                verifyDiagnostics: true
            });

            verifyTsbuildOutput({
                scenario: "when target option changes",
                projFs: () => projFs,
                time,
                tick,
                proj: "sample1",
                rootNames: ["/src/core"],
                initialBuild: {
                    modifyFs: fs => {
                        fs.writeFileSync("/lib/lib.esnext.full.d.ts", `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`);
                        fs.writeFileSync("/lib/lib.esnext.d.ts", libContent);
                        fs.writeFileSync("/lib/lib.d.ts", `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`);
                        fs.writeFileSync("/src/core/tsconfig.json", `{
    "compilerOptions": {
        "incremental": true,
"listFiles": true,
"listEmittedFiles": true,
        "target": "esnext",
    }
}`);
                    },
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    ]
                },
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", "esnext", "es5"),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/core/tsconfig.json", "src/core/anotherModule.js", "src/core/tsconfig.json"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"]
                    ]
                },
                baselineOnly: true,
                verifyDiagnostics: true
            });

            verifyTsbuildOutput({
                scenario: "when module option changes",
                projFs: () => projFs,
                time,
                tick,
                proj: "sample1",
                rootNames: ["/src/core"],
                initialBuild: {
                    modifyFs: fs => fs.writeFileSync("/src/core/tsconfig.json", `{
    "compilerOptions": {
        "incremental": true,
        "module": "commonjs"
    }
}`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    ]
                },
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", `"module": "commonjs"`, `"module": "amd"`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/core/tsconfig.json", "src/core/anotherModule.js", "src/core/tsconfig.json"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"]
                    ]
                },
                baselineOnly: true,
                verifyDiagnostics: true
            });

            verifyTsbuildOutput({
                scenario: "when esModuleInterop option changes",
                projFs: () => projFs,
                time,
                tick,
                proj: "sample1",
                rootNames: ["/src/tests"],
                initialBuild: {
                    modifyFs: fs => fs.writeFileSync("/src/tests/tsconfig.json", `{
    "references": [
        { "path": "../core" },
        { "path": "../logic" }
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
        "esModuleInterop": false
    }
}`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                        [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                        [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                        [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                        [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                    ]
                },
                incrementalDtsChangedBuild: {
                    modifyFs: fs => replaceText(fs, "/src/tests/tsconfig.json", `"esModuleInterop": false`, `"esModuleInterop": true`),
                    expectedDiagnostics: [
                        getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                        [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                        [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                        [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tests/tsconfig.json", "src/tests/index.js", "src/tests/tsconfig.json"],
                        [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                    ]
                },
                baselineOnly: true,
                verifyDiagnostics: true
            });
        });
    });
}
