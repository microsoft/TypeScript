namespace ts {
    describe("unittests:: tsbuild:: on 'sample1' project", () => {
        let projFs: vfs.FileSystem;
        const { time, tick, touch } = getTime();
        const allExpectedOutputs = ["/src/tests/index.js",
            "/src/core/index.js", "/src/core/index.d.ts", "/src/core/index.d.ts.map",
            "/src/logic/index.js", "/src/logic/index.js.map", "/src/logic/index.d.ts"];

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
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*empty*/);

                // Check for outputs. Not an exhaustive list
                for (const output of allExpectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
            });

            it("builds correctly when outDir is specified", () => {
                const fs = projFs.shadow();
                fs.writeFileSync("/src/logic/tsconfig.json", JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, sourceMap: true, outDir: "outDir" },
                    references: [{ path: "../core" }]
                }));

                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*empty*/);
                const expectedOutputs = allExpectedOutputs.map(f => f.replace("/logic/", "/logic/outDir/"));
                // Check for outputs. Not an exhaustive list
                for (const output of expectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
            });

            it("builds correctly when declarationDir is specified", () => {
                const fs = projFs.shadow();
                fs.writeFileSync("/src/logic/tsconfig.json", JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, sourceMap: true, declarationDir: "out/decls" },
                    references: [{ path: "../core" }]
                }));

                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*empty*/);
                const expectedOutputs = allExpectedOutputs.map(f => f.replace("/logic/index.d.ts", "/logic/out/decls/index.d.ts"));
                // Check for outputs. Not an exhaustive list
                for (const output of expectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
            });
        });

        describe("dry builds", () => {
            it("doesn't write any files in a dry build", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: true, force: false, verbose: false });
                builder.buildAllProjects();
                host.assertDiagnosticMessages(
                    [Diagnostics.A_non_dry_build_would_build_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.A_non_dry_build_would_build_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.A_non_dry_build_would_build_project_0, "/src/tests/tsconfig.json"]
                );

                // Check for outputs to not be written. Not an exhaustive list
                for (const output of allExpectedOutputs) {
                    assert(!fs.existsSync(output), `Expect file ${output} to not exist`);
                }
            });

            it("indicates that it would skip builds during a dry build", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);

                let builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: false });
                builder.buildAllProjects();
                tick();

                host.clearDiagnostics();
                builder = createSolutionBuilder(host, ["/src/tests"], { dry: true, force: false, verbose: false });
                builder.buildAllProjects();
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
                builder.buildAllProjects();
                // Verify they exist
                for (const output of allExpectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
                builder.cleanAllProjects();
                // Verify they are gone
                for (const output of allExpectedOutputs) {
                    assert(!fs.existsSync(output), `Expect file ${output} to not exist`);
                }
                // Subsequent clean shouldn't throw / etc
                builder.cleanAllProjects();
            });
        });

        describe("force builds", () => {
            it("always builds under --force", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);

                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: true, verbose: false });
                builder.buildAllProjects();
                let currentTime = time();
                checkOutputTimestamps(currentTime);

                tick();
                Debug.assert(time() !== currentTime, "Time moves on");
                currentTime = time();
                builder.buildAllProjects();
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
            let fs: vfs.FileSystem;
            let host: fakes.SolutionBuilderHost;
            let builder: SolutionBuilder;
            before(() => {
                fs = projFs.shadow();
                host = new fakes.SolutionBuilderHost(fs);
                builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: true });
            });
            after(() => {
                fs = undefined!;
                host = undefined!;
                builder = undefined!;
            });

            it("Builds the project", () => {
                host.clearDiagnostics();
                builder.resetBuildContext();
                builder.buildAllProjects();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
                tick();
            });

            // All three projects are up to date
            it("Detects that all projects are up to date", () => {
                host.clearDiagnostics();
                builder.resetBuildContext();
                builder.buildAllProjects();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/tests/tsconfig.json", "src/tests/index.ts", "src/tests/index.js"]
                );
                tick();
            });

            // Update a file in the leaf node (tests), only it should rebuild the last one
            it("Only builds the leaf node project", () => {
                host.clearDiagnostics();
                fs.writeFileSync("/src/tests/index.ts", "const m = 10;");
                builder.resetBuildContext();
                builder.buildAllProjects();

                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tests/tsconfig.json", "src/tests/index.js", "src/tests/index.ts"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
                tick();
            });

            // Update a file in the parent (without affecting types), should get fast downstream builds
            it("Detects type-only changes in upstream projects", () => {
                host.clearDiagnostics();
                replaceText(fs, "/src/core/index.ts", "HELLO WORLD", "WELCOME PLANET");
                builder.resetBuildContext();
                builder.buildAllProjects();

                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/core/tsconfig.json", "src/core/anotherModule.js", "src/core/index.ts"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/logic/tsconfig.json"],
                    [Diagnostics.Updating_output_timestamps_of_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, "src/tests/tsconfig.json"],
                    [Diagnostics.Updating_output_timestamps_of_project_0, "/src/tests/tsconfig.json"]
                );
            });
        });

        describe("downstream-blocked compilations", () => {
            it("won't build downstream projects if upstream projects have errors", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: true });

                // Induce an error in the middle project
                replaceText(fs, "/src/logic/index.ts", "c.multiply(10, 15)", `c.muitply()`);
                builder.buildAllProjects();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Property_0_does_not_exist_on_type_1, "muitply", `typeof import("/src/core/index")`],
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

                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*empty*/);

                // Update a timestamp in the middle project
                tick();
                touch(fs, "/src/logic/index.ts");
                const originalWriteFile = fs.writeFileSync;
                const writtenFiles = createMap<true>();
                fs.writeFileSync = (path, data, encoding) => {
                    writtenFiles.set(path, true);
                    originalWriteFile.call(fs, path, data, encoding);
                };
                // Because we haven't reset the build context, the builder should assume there's nothing to do right now
                const status = builder.getUpToDateStatusOfFile(builder.resolveProjectName("/src/logic"));
                assert.equal(status.type, UpToDateStatusType.UpToDate, "Project should be assumed to be up-to-date");
                verifyInvalidation(/*expectedToWriteTests*/ false);

                // Rebuild this project
                fs.writeFileSync("/src/logic/index.ts", `${fs.readFileSync("/src/logic/index.ts")}
export class cNew {}`);
                verifyInvalidation(/*expectedToWriteTests*/ true);

                function verifyInvalidation(expectedToWriteTests: boolean) {
                    // Rebuild this project
                    tick();
                    builder.invalidateProject("/src/logic");
                    builder.buildInvalidatedProject();
                    // The file should be updated
                    assert.isTrue(writtenFiles.has("/src/logic/index.js"), "JS file should have been rebuilt");
                    assert.equal(fs.statSync("/src/logic/index.js").mtimeMs, time(), "JS file should have been rebuilt");
                    assert.isFalse(writtenFiles.has("/src/tests/index.js"), "Downstream JS file should *not* have been rebuilt");
                    assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should *not* have been rebuilt");
                    writtenFiles.clear();

                    // Build downstream projects should update 'tests', but not 'core'
                    tick();
                    builder.buildInvalidatedProject();
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
                builder.buildAllProjects();
                assert.deepEqual(host.traces, [
                    ...getLibs(),
                    "/src/core/anotherModule.ts",
                    "/src/core/index.ts",
                    "/src/core/some_decl.d.ts",
                    ...getLibs(),
                    ...getCoreOutputs(),
                    "/src/logic/index.ts",
                    ...getLibs(),
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
                builder.buildAllProjects();
                assert.deepEqual(host.traces, [
                    "TSFILE: /src/core/anotherModule.js",
                    "TSFILE: /src/core/anotherModule.d.ts",
                    "TSFILE: /src/core/anotherModule.d.ts.map",
                    "TSFILE: /src/core/index.js",
                    "TSFILE: /src/core/index.d.ts",
                    "TSFILE: /src/core/index.d.ts.map",
                    "TSFILE: /src/logic/index.js",
                    "TSFILE: /src/logic/index.js.map",
                    "TSFILE: /src/logic/index.d.ts",
                    "TSFILE: /src/tests/index.js",
                    "TSFILE: /src/tests/index.d.ts",
                ]);
            });
        });

        describe("emit output", () => {
        });
    });
}
