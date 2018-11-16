namespace ts {
    let currentTime = 100;
    export namespace Sample1 {
        tick();
        const projFs = loadProjectFromDisk("tests/projects/sample1");

        const allExpectedOutputs = ["/src/tests/index.js",
            "/src/core/index.js", "/src/core/index.d.ts", "/src/core/index.d.ts.map",
            "/src/logic/index.js", "/src/logic/index.js.map", "/src/logic/index.d.ts"];

        describe("tsbuild - sanity check of clean build of 'sample1' project", () => {
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

        describe("tsbuild - dry builds", () => {
            it("doesn't write any files in a dry build", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: true, force: false, verbose: false });
                builder.buildAllProjects();
                host.assertDiagnosticMessages(Diagnostics.A_non_dry_build_would_build_project_0, Diagnostics.A_non_dry_build_would_build_project_0, Diagnostics.A_non_dry_build_would_build_project_0);

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
                host.assertDiagnosticMessages(Diagnostics.Project_0_is_up_to_date, Diagnostics.Project_0_is_up_to_date, Diagnostics.Project_0_is_up_to_date);
            });
        });

        describe("tsbuild - clean builds", () => {
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

        describe("tsbuild - force builds", () => {
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

        describe("tsbuild - can detect when and what to rebuild", () => {
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: true });

            it("Builds the project", () => {
                host.clearDiagnostics();
                builder.resetBuildContext();
                builder.buildAllProjects();
                host.assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
                    Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                    Diagnostics.Building_project_0,
                    Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                    Diagnostics.Building_project_0,
                    Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                    Diagnostics.Building_project_0);
                tick();
            });

            // All three projects are up to date
            it("Detects that all projects are up to date", () => {
                host.clearDiagnostics();
                builder.resetBuildContext();
                builder.buildAllProjects();
                host.assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2);
                tick();
            });

            // Update a file in the leaf node (tests), only it should rebuild the last one
            it("Only builds the leaf node project", () => {
                host.clearDiagnostics();
                fs.writeFileSync("/src/tests/index.ts", "const m = 10;");
                builder.resetBuildContext();
                builder.buildAllProjects();

                host.assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                    Diagnostics.Building_project_0);
                tick();
            });

            // Update a file in the parent (without affecting types), should get fast downstream builds
            it("Detects type-only changes in upstream projects", () => {
                host.clearDiagnostics();
                replaceText(fs, "/src/core/index.ts", "HELLO WORLD", "WELCOME PLANET");
                builder.resetBuildContext();
                builder.buildAllProjects();

                host.assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
                    Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                    Diagnostics.Building_project_0,
                    Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
                    Diagnostics.Updating_output_timestamps_of_project_0,
                    Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
                    Diagnostics.Updating_output_timestamps_of_project_0);
            });
        });

        describe("tsbuild - downstream-blocked compilations", () => {
            it("won't build downstream projects if upstream projects have errors", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: true });

                // Induce an error in the middle project
                replaceText(fs, "/src/logic/index.ts", "c.multiply(10, 15)", `c.muitply()`);
                builder.buildAllProjects();
                host.assertDiagnosticMessages(
                    Diagnostics.Projects_in_this_build_Colon_0,
                    Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                    Diagnostics.Building_project_0,
                    Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                    Diagnostics.Building_project_0,
                    Diagnostics.Property_0_does_not_exist_on_type_1,
                    Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
                    Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors
                );
            });
        });

        describe("tsbuild - project invalidation", () => {
            it("invalidates projects correctly", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: false });

                builder.buildAllProjects();
                host.assertDiagnosticMessages(/*empty*/);

                // Update a timestamp in the middle project
                tick();
                touch(fs, "/src/logic/index.ts");
                // Because we haven't reset the build context, the builder should assume there's nothing to do right now
                const status = builder.getUpToDateStatusOfFile(builder.resolveProjectName("/src/logic"));
                assert.equal(status.type, UpToDateStatusType.UpToDate, "Project should be assumed to be up-to-date");

                // Rebuild this project
                tick();
                builder.invalidateProject("/src/logic");
                builder.buildInvalidatedProject();
                // The file should be updated
                assert.equal(fs.statSync("/src/logic/index.js").mtimeMs, time(), "JS file should have been rebuilt");
                assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should *not* have been rebuilt");

                // Does not build tests or core because there is no change in declaration file
                tick();
                builder.buildInvalidatedProject();
                assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should have been rebuilt");
                assert.isBelow(fs.statSync("/src/core/index.js").mtimeMs, time(), "Upstream JS file should not have been rebuilt");

                // Rebuild this project
                tick();
                fs.writeFileSync("/src/logic/index.ts", `${fs.readFileSync("/src/logic/index.ts")}
export class cNew {}`);
                builder.invalidateProject("/src/logic");
                builder.buildInvalidatedProject();
                // The file should be updated
                assert.equal(fs.statSync("/src/logic/index.js").mtimeMs, time(), "JS file should have been rebuilt");
                assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should *not* have been rebuilt");

                // Build downstream projects should update 'tests', but not 'core'
                tick();
                builder.buildInvalidatedProject();
                assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should have been rebuilt");
                assert.isBelow(fs.statSync("/src/core/index.js").mtimeMs, time(), "Upstream JS file should not have been rebuilt");
            });
        });

        describe("tsbuild - with resolveJsonModule option", () => {
            const projFs = loadProjectFromDisk("tests/projects/resolveJsonModuleAndComposite");
            const allExpectedOutputs = ["/src/tests/dist/src/index.js", "/src/tests/dist/src/index.d.ts", "/src/tests/dist/src/hello.json"];

            function verifyProjectWithResolveJsonModule(configFile: string, ...expectedDiagnosticMessages: DiagnosticMessage[]) {
                const fs = projFs.shadow();
                verifyProjectWithResolveJsonModuleWithFs(fs, configFile, allExpectedOutputs, ...expectedDiagnosticMessages);
            }

            function verifyProjectWithResolveJsonModuleWithFs(fs: vfs.FileSystem, configFile: string, allExpectedOutputs: ReadonlyArray<string>, ...expectedDiagnosticMessages: DiagnosticMessage[]) {
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
                verifyProjectWithResolveJsonModule("/src/tests/tsconfig_withInclude.json", Diagnostics.File_0_is_not_in_project_file_list_Projects_must_list_all_files_or_use_an_include_pattern);
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

        describe("tsbuild - lists files", () => {
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

        describe("tsbuild - with rootDir of project reference in parentDirectory", () => {
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

        describe("tsbuild - when project reference is referenced transitively", () => {
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

            function verifyBuild(modifyDiskLayout: (fs: vfs.FileSystem) => void, allExpectedOutputs: ReadonlyArray<string>, expectedDiagnostics: DiagnosticMessage[], expectedFileTraces: ReadonlyArray<string>) {
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
                verifyBuild(noop, allExpectedOutputs, emptyArray, expectedFileTraces);
            });

            it("verify that it builds correctly when the referenced project uses different module resolution", () => {
                verifyBuild(fs => modifyFsBTsToNonRelativeImport(fs, "classic"), allExpectedOutputs, emptyArray, expectedFileTraces);
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
                    [Diagnostics.Cannot_find_module_0],
                    expectedFileTraces);
            });
        });
    }

    export namespace OutFile {
        const outFileFs = loadProjectFromDisk("tests/projects/outfile-concat");

        describe("tsbuild - baseline sectioned sourcemaps", () => {
            let fs: vfs.FileSystem | undefined;
            before(() => {
                fs = outFileFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: false });
                host.clearDiagnostics();
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
        });

        describe("tsbuild - downstream prepend projects always get rebuilt", () => {
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

        describe("tsbuild - empty files option in tsconfig", () => {
            it("has empty files diagnostic when files is empty and no references are provided", () => {
                const fs = projFs.shadow();
                const host = new fakes.SolutionBuilderHost(fs);
                const builder = createSolutionBuilder(host, ["/src/no-references"], { dry: false, force: false, verbose: false });

                host.clearDiagnostics();
                builder.buildAllProjects();
                host.assertDiagnosticMessages(Diagnostics.The_files_list_in_config_file_0_is_empty);

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

    describe("tsbuild - graph-ordering", () => {
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
