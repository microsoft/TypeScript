namespace ts {
    let currentTime = 100;

    function getExpectedDiagnosticForProjectsInBuild(...projects: string[]): fakes.ExpectedDiagnostic {
        return [Diagnostics.Projects_in_this_build_Colon_0, projects.map(p => "\r\n    * " + p).join("")];
    }

    export namespace Sample1 {
        tick();
        const projFs = loadProjectFromDisk("tests/projects/sample1");

        const allExpectedOutputs = ["/src/tests/index.js",
            "/src/core/index.js", "/src/core/index.d.ts", "/src/core/index.d.ts.map",
            "/src/logic/index.js", "/src/logic/index.js.map", "/src/logic/index.d.ts"];

        describe("unittests:: tsbuild - sanity check of clean build of 'sample1' project", () => {
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

        describe("unittests:: tsbuild - dry builds", () => {
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

        describe("unittests:: tsbuild - clean builds", () => {
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

        describe("unittests:: tsbuild - force builds", () => {
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

        describe("unittests:: tsbuild - can detect when and what to rebuild", () => {
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: true });

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

        describe("unittests:: tsbuild - downstream-blocked compilations", () => {
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

        describe("unittests:: tsbuild - project invalidation", () => {
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

        describe("unittests:: tsbuild - with resolveJsonModule option", () => {
            const projFs = loadProjectFromDisk("tests/projects/resolveJsonModuleAndComposite");
            const allExpectedOutputs = ["/src/tests/dist/src/index.js", "/src/tests/dist/src/index.d.ts", "/src/tests/dist/src/hello.json"];

            function verifyProjectWithResolveJsonModule(configFile: string, ...expectedDiagnosticMessages: fakes.ExpectedDiagnostic[]) {
                const fs = projFs.shadow();
                verifyProjectWithResolveJsonModuleWithFs(fs, configFile, allExpectedOutputs, ...expectedDiagnosticMessages);
            }

            function verifyProjectWithResolveJsonModuleWithFs(fs: vfs.FileSystem, configFile: string, allExpectedOutputs: ReadonlyArray<string>, ...expectedDiagnosticMessages: fakes.ExpectedDiagnostic[]) {
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, [configFile], { dry: false, force: false, verbose: false });
                builder.buildAllProjects();
                host.assertDiagnosticMessages(...expectedDiagnosticMessages);
                if (!expectedDiagnosticMessages.length) {
                    // Check for outputs. Not an exhaustive list
                    for (const output of allExpectedOutputs) {
                        assert(fs.existsSync(output), `Expect file ${output} to exist`);
                    }
                }
            }

            it("with resolveJsonModule and include only", () => {
                verifyProjectWithResolveJsonModule("/src/tests/tsconfig_withInclude.json", [
                    Diagnostics.File_0_is_not_in_project_file_list_Projects_must_list_all_files_or_use_an_include_pattern,
                    "/src/tests/src/hello.json"
                ]);
            });

            it("with resolveJsonModule and include of *.json along with other include", () => {
                verifyProjectWithResolveJsonModule("/src/tests/tsconfig_withIncludeOfJson.json");
            });

            it("with resolveJsonModule and include of *.json along with other include and file name matches ts file", () => {
                const fs = projFs.shadow();
                fs.rimrafSync("/src/tests/src/hello.json");
                fs.writeFileSync("/src/tests/src/index.json", JSON.stringify({ hello: "world" }));
                fs.writeFileSync("/src/tests/src/index.ts", `import hello from "./index.json"

export default hello.hello`);
                const allExpectedOutputs = ["/src/tests/dist/src/index.js", "/src/tests/dist/src/index.d.ts", "/src/tests/dist/src/index.json"];
                verifyProjectWithResolveJsonModuleWithFs(fs, "/src/tests/tsconfig_withIncludeOfJson.json", allExpectedOutputs);
            });

            it("with resolveJsonModule and files containing json file", () => {
                verifyProjectWithResolveJsonModule("/src/tests/tsconfig_withFiles.json");
            });

            it("with resolveJsonModule and include and files", () => {
                verifyProjectWithResolveJsonModule("/src/tests/tsconfig_withIncludeAndFiles.json");
            });
        });

        describe("unittests:: tsbuild - lists files", () => {
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

        describe("unittests:: tsbuild - with rootDir of project reference in parentDirectory", () => {
            const projFs = loadProjectFromDisk("tests/projects/projectReferenceWithRootDirInParent");
            const allExpectedOutputs = [
                "/src/dist/other/other.js", "/src/dist/other/other.d.ts",
                "/src/dist/main/a.js", "/src/dist/main/a.d.ts",
                "/src/dist/main/b.js", "/src/dist/main/b.d.ts"
            ];
            it("verify that it builds correctly", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/src/main", "/src/src/other"], {});
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*empty*/);
                for (const output of allExpectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
            });
        });

        describe("unittests:: tsbuild - when project reference is referenced transitively", () => {
            const projFs = loadProjectFromDisk("tests/projects/transitiveReferences");
            const allExpectedOutputs = [
                "/src/a.js", "/src/a.d.ts",
                "/src/b.js", "/src/b.d.ts",
                "/src/c.js"
            ];
            const expectedFileTraces = [
                ...getLibs(),
                "/src/a.ts",
                ...getLibs(),
                "/src/a.d.ts",
                "/src/b.ts",
                ...getLibs(),
                "/src/a.d.ts",
                "/src/b.d.ts",
                "/src/refs/a.d.ts",
                "/src/c.ts"
            ];

            function verifyBuild(modifyDiskLayout: (fs: vfs.FileSystem) => void, allExpectedOutputs: ReadonlyArray<string>, expectedFileTraces: ReadonlyArray<string>, ...expectedDiagnostics: fakes.ExpectedDiagnostic[]) {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                modifyDiskLayout(fs);
                const builder = createSolutionBuilder(host, ["/src/tsconfig.c.json"], { listFiles: true });
                builder.buildAllProjects();
                host.assertDiagnosticMessages(...expectedDiagnostics);
                for (const output of allExpectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
                assert.deepEqual(host.traces, expectedFileTraces);
            }

            function modifyFsBTsToNonRelativeImport(fs: vfs.FileSystem, moduleResolution: "node" | "classic") {
                fs.writeFileSync("/src/b.ts", `import {A} from 'a';
export const b = new A();`);
                fs.writeFileSync("/src/tsconfig.b.json", JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        moduleResolution
                    },
                    files: ["b.ts"],
                    references: [{ path: "tsconfig.a.json" }]
                }));
            }

            it("verify that it builds correctly", () => {
                verifyBuild(noop, allExpectedOutputs, expectedFileTraces);
            });

            it("verify that it builds correctly when the referenced project uses different module resolution", () => {
                verifyBuild(fs => modifyFsBTsToNonRelativeImport(fs, "classic"), allExpectedOutputs, expectedFileTraces);
            });

            it("verify that it build reports error about module not found with node resolution with external module name", () => {
                // Error in b build only a
                const allExpectedOutputs = ["/src/a.js", "/src/a.d.ts"];
                const expectedFileTraces = [
                    ...getLibs(),
                    "/src/a.ts",
                ];
                verifyBuild(fs => modifyFsBTsToNonRelativeImport(fs, "node"),
                    allExpectedOutputs,
                    expectedFileTraces,
                    [Diagnostics.Cannot_find_module_0, "a"],
                );
            });
        });

        it("unittests:: tsbuild - when tsconfig extends the missing file", () => {
            const projFs = loadProjectFromDisk("tests/projects/missingExtendedConfig");
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/tsconfig.json"], {});
            builder.buildAllProjects();
            host.assertDiagnosticMessages(
                [Diagnostics.The_specified_path_does_not_exist_Colon_0, "/src/foobar.json"],
                [Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2, "/src/tsconfig.first.json", "[\"**/*\"]", "[]"],
                [Diagnostics.The_specified_path_does_not_exist_Colon_0, "/src/foobar.json"],
                [Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2, "/src/tsconfig.second.json", "[\"**/*\"]", "[]"]
            );
        });
    }

    export namespace OutFile {
        const outFileFs = loadProjectFromDisk("tests/projects/outfile-concat");

        describe("unittests:: tsbuild - baseline sectioned sourcemaps", () => {
            let fs: vfs.FileSystem | undefined;
            const actualReadFileMap = createMap<number>();
            before(() => {
                fs = outFileFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: false });
                host.clearDiagnostics();
                const originalReadFile = host.readFile;
                host.readFile = path => {
                    // Dont record libs
                    if (path.startsWith("/src/")) {
                        actualReadFileMap.set(path, (actualReadFileMap.get(path) || 0) + 1);
                    }
                    return originalReadFile.call(host, path);
                };
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*none*/);
            });
            after(() => {
                fs = undefined;
            });
            it(`Generates files matching the baseline`, () => {
                const patch = fs!.diff();
                // tslint:disable-next-line:no-null-keyword
                Harness.Baseline.runBaseline("outfile-concat.js", patch ? vfs.formatPatch(patch) : null);
            });
            it("verify readFile calls", () => {
                const expected = [
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

                    // outputs
                    "/src/first/bin/first-output.js",
                    "/src/first/bin/first-output.js.map",
                    "/src/first/bin/first-output.d.ts",
                    "/src/first/bin/first-output.d.ts.map",
                    "/src/2/second-output.js",
                    "/src/2/second-output.js.map",
                    "/src/2/second-output.d.ts",
                    "/src/2/second-output.d.ts.map"
                ];

                assert.equal(actualReadFileMap.size, expected.length, `Expected: ${JSON.stringify(expected)} \nActual: ${JSON.stringify(arrayFrom(actualReadFileMap.entries()))}`);
                expected.forEach(expectedValue => {
                    const actual = actualReadFileMap.get(expectedValue);
                    assert.equal(actual, 1, `Mismatch in read file call number for: ${expectedValue}\nExpected: ${JSON.stringify(expected)} \nActual: ${JSON.stringify(arrayFrom(actualReadFileMap.entries()))}`);
                });
            });
        });

        describe("unittests:: tsbuild - downstream prepend projects always get rebuilt", () => {
            it("", () => {
                const fs = outFileFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: false });
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*none*/);
                assert.equal(fs.statSync("src/third/thirdjs/output/third-output.js").mtimeMs, time(), "First build timestamp is correct");
                tick();
                replaceText(fs, "src/first/first_PART1.ts", "Hello", "Hola");
                tick();
                builder.resetBuildContext();
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*none*/);
                assert.equal(fs.statSync("src/third/thirdjs/output/third-output.js").mtimeMs, time(), "Second build timestamp is correct");
            });
        });
    }

    export namespace EmptyFiles {
        const projFs = loadProjectFromDisk("tests/projects/empty-files");

        const allExpectedOutputs = [
            "/src/core/index.js",
            "/src/core/index.d.ts",
            "/src/core/index.d.ts.map",
        ];

        describe("unittests:: tsbuild - empty files option in tsconfig", () => {
            it("has empty files diagnostic when files is empty and no references are provided", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/no-references"], { dry: false, force: false, verbose: false });

                host.clearDiagnostics();
                builder.buildAllProjects();
                host.assertDiagnosticMessages([Diagnostics.The_files_list_in_config_file_0_is_empty, "/src/no-references/tsconfig.json"]);

                // Check for outputs to not be written.
                for (const output of allExpectedOutputs) {
                    assert(!fs.existsSync(output), `Expect file ${output} to not exist`);
                }
            });

            it("does not have empty files diagnostic when files is empty and references are provided", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/with-references"], { dry: false, force: false, verbose: false });

                host.clearDiagnostics();
                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*empty*/);

                // Check for outputs to be written.
                for (const output of allExpectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
            });
        });
    }

    describe("unittests:: tsbuild - graph-ordering", () => {
        let host: fakes.SolutionBuilderHost | undefined;
        const deps: [string, string][] = [
            ["A", "B"],
            ["B", "C"],
            ["A", "C"],
            ["B", "D"],
            ["C", "D"],
            ["C", "E"],
            ["F", "E"]
        ];

        before(() => {
            const fs = new vfs.FileSystem(false);
            host = new fakes.SolutionBuilderHost(fs);
            writeProjects(fs, ["A", "B", "C", "D", "E", "F", "G"], deps);
        });

        after(() => {
            host = undefined;
        });

        it("orders the graph correctly - specify two roots", () => {
            checkGraphOrdering(["A", "G"], ["A", "B", "C", "D", "E", "G"]);
        });

        it("orders the graph correctly - multiple parts of the same graph in various orders", () => {
            checkGraphOrdering(["A"], ["A", "B", "C", "D", "E"]);
            checkGraphOrdering(["A", "C", "D"], ["A", "B", "C", "D", "E"]);
            checkGraphOrdering(["D", "C", "A"], ["A", "B", "C", "D", "E"]);
        });

        it("orders the graph correctly - other orderings", () => {
            checkGraphOrdering(["F"], ["F", "E"]);
            checkGraphOrdering(["E"], ["E"]);
            checkGraphOrdering(["F", "C", "A"], ["A", "B", "C", "D", "E", "F"]);
        });

        function checkGraphOrdering(rootNames: string[], expectedBuildSet: string[]) {
            const builder = createSolutionBuilder(host!, rootNames, { dry: true, force: false, verbose: false });

            const projFileNames = rootNames.map(getProjectFileName);
            const graph = builder.getBuildGraph(projFileNames);

            assert.sameMembers(graph.buildQueue, expectedBuildSet.map(getProjectFileName));

            for (const dep of deps) {
                const child = getProjectFileName(dep[0]);
                if (graph.buildQueue.indexOf(child) < 0) continue;
                const parent = getProjectFileName(dep[1]);
                assert.isAbove(graph.buildQueue.indexOf(child), graph.buildQueue.indexOf(parent), `Expecting child ${child} to be built after parent ${parent}`);
            }
        }

        function getProjectFileName(proj: string) {
            return `/project/${proj}/tsconfig.json` as ResolvedConfigFileName;
        }

        function writeProjects(fileSystem: vfs.FileSystem, projectNames: string[], deps: [string, string][]): string[] {
            const projFileNames: string[] = [];
            for (const dep of deps) {
                if (projectNames.indexOf(dep[0]) < 0) throw new Error(`Invalid dependency - project ${dep[0]} does not exist`);
                if (projectNames.indexOf(dep[1]) < 0) throw new Error(`Invalid dependency - project ${dep[1]} does not exist`);
            }
            for (const proj of projectNames) {
                fileSystem.mkdirpSync(`/project/${proj}`);
                fileSystem.writeFileSync(`/project/${proj}/${proj}.ts`, "export {}");
                const configFileName = getProjectFileName(proj);
                const configContent = JSON.stringify({
                    compilerOptions: { composite: true },
                    files: [`./${proj}.ts`],
                    references: deps.filter(d => d[0] === proj).map(d => ({ path: `../${d[1]}` }))
                }, undefined, 2);
                fileSystem.writeFileSync(configFileName, configContent);
                projFileNames.push(configFileName);
            }
            return projFileNames;
        }
    });


    function replaceText(fs: vfs.FileSystem, path: string, oldText: string, newText: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        const old = fs.readFileSync(path, "utf-8");
        if (old.indexOf(oldText) < 0) {
            throw new Error(`Text "${oldText}" does not exist in file ${path}`);
        }
        const newContent = old.replace(oldText, newText);
        fs.writeFileSync(path, newContent, "utf-8");
    }

    function tick() {
        currentTime += 60_000;
    }

    function time() {
        return currentTime;
    }

    function touch(fs: vfs.FileSystem, path: string) {
        if (!fs.statSync(path).isFile()) {
            throw new Error(`File ${path} does not exist`);
        }
        fs.utimesSync(path, new Date(time()), new Date(time()));
    }

    function loadProjectFromDisk(root: string): vfs.FileSystem {
        const resolver = vfs.createResolver(Harness.IO);
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            files: {
                ["/lib"]: new vfs.Mount(vpath.resolve(Harness.IO.getWorkspaceRoot(), "built/local"), resolver),
                ["/src"]: new vfs.Mount(vpath.resolve(Harness.IO.getWorkspaceRoot(), root), resolver)
            },
            cwd: "/",
            meta: { defaultLibLocation: "/lib" },
            time
        });
        fs.makeReadonly();
        return fs;
    }

    function getLibs() {
        return [
            "/lib/lib.d.ts",
            "/lib/lib.es5.d.ts",
            "/lib/lib.dom.d.ts",
            "/lib/lib.webworker.importscripts.d.ts",
            "/lib/lib.scripthost.d.ts"
        ];
    }
}
