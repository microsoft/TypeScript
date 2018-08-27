namespace ts {
    let currentTime = 100;
    let lastDiagnostics: Diagnostic[] = [];
    const reportDiagnostic: DiagnosticReporter = diagnostic => lastDiagnostics.push(diagnostic);
    const report = (message: DiagnosticMessage, ...args: string[]) => reportDiagnostic(createCompilerDiagnostic(message, ...args));
    const buildHost: BuildHost = {
        error: report,
        verbose: report,
        message: report,
        errorDiagnostic: d => reportDiagnostic(d)
    };

    export namespace Sample1 {
        tick();
        const projFs = loadProjectFromDisk("tests/projects/sample1");

        const allExpectedOutputs = ["/src/tests/index.js",
            "/src/core/index.js", "/src/core/index.d.ts",
            "/src/logic/index.js", "/src/logic/index.d.ts"];

        describe("tsbuild - sanity check of clean build of 'sample1' project", () => {
            it("can build the sample project 'sample1' without error", () => {
                const fs = projFs.shadow();
                const host = new fakes.CompilerHost(fs);
                const builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: false, force: false, verbose: false });

                clearDiagnostics();
                builder.buildAllProjects();
                assertDiagnosticMessages(/*empty*/);

                // Check for outputs. Not an exhaustive list
                for (const output of allExpectedOutputs) {
                    assert(fs.existsSync(output), `Expect file ${output} to exist`);
                }
            });
        });

        describe("tsbuild - dry builds", () => {
            it("doesn't write any files in a dry build", () => {
                clearDiagnostics();
                const fs = projFs.shadow();
                const host = new fakes.CompilerHost(fs);
                const builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: true, force: false, verbose: false });
                builder.buildAllProjects();
                assertDiagnosticMessages(Diagnostics.A_non_dry_build_would_build_project_0, Diagnostics.A_non_dry_build_would_build_project_0, Diagnostics.A_non_dry_build_would_build_project_0);

                // Check for outputs to not be written. Not an exhaustive list
                for (const output of allExpectedOutputs) {
                    assert(!fs.existsSync(output), `Expect file ${output} to not exist`);
                }
            });

            it("indicates that it would skip builds during a dry build", () => {
                clearDiagnostics();
                const fs = projFs.shadow();
                const host = new fakes.CompilerHost(fs);

                let builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: false, force: false, verbose: false });
                builder.buildAllProjects();
                tick();

                clearDiagnostics();
                builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: true, force: false, verbose: false });
                builder.buildAllProjects();
                assertDiagnosticMessages(Diagnostics.Project_0_is_up_to_date, Diagnostics.Project_0_is_up_to_date, Diagnostics.Project_0_is_up_to_date);
            });
        });

        describe("tsbuild - clean builds", () => {
            it("removes all files it built", () => {
                clearDiagnostics();
                const fs = projFs.shadow();
                const host = new fakes.CompilerHost(fs);

                const builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: false, force: false, verbose: false });
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
                const host = new fakes.CompilerHost(fs);

                const builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: false, force: true, verbose: false });
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
            const host = new fakes.CompilerHost(fs);
            const builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: false, force: false, verbose: true });

            it("Builds the project", () => {
                clearDiagnostics();
                builder.resetBuildContext();
                builder.buildAllProjects();
                assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
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
                clearDiagnostics();
                builder.resetBuildContext();
                builder.buildAllProjects();
                assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2);
                tick();
            });

            // Update a file in the leaf node (tests), only it should rebuild the last one
            it("Only builds the leaf node project", () => {
                clearDiagnostics();
                fs.writeFileSync("/src/tests/index.ts", "const m = 10;");
                builder.resetBuildContext();
                builder.buildAllProjects();

                assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                    Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                    Diagnostics.Building_project_0);
                tick();
            });

            // Update a file in the parent (without affecting types), should get fast downstream builds
            it("Detects type-only changes in upstream projects", () => {
                clearDiagnostics();
                replaceText(fs, "/src/core/index.ts", "HELLO WORLD", "WELCOME PLANET");
                builder.resetBuildContext();
                builder.buildAllProjects();

                assertDiagnosticMessages(Diagnostics.Projects_in_this_build_Colon_0,
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
                const host = new fakes.CompilerHost(fs);
                const builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: false, force: false, verbose: true });

                clearDiagnostics();

                // Induce an error in the middle project
                replaceText(fs, "/src/logic/index.ts", "c.multiply(10, 15)", `c.muitply()`);
                builder.buildAllProjects();
                assertDiagnosticMessages(
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
                const host = new fakes.CompilerHost(fs);
                const builder = createSolutionBuilder(host, buildHost, ["/src/tests"], { dry: false, force: false, verbose: false });

                clearDiagnostics();
                builder.buildAllProjects();
                assertDiagnosticMessages(/*empty*/);

                // Update a timestamp in the middle project
                tick();
                touch(fs, "/src/logic/index.ts");
                // Because we haven't reset the build context, the builder should assume there's nothing to do right now
                const status = builder.getUpToDateStatusOfFile(builder.resolveProjectName("/src/logic")!);
                assert.equal(status.type, UpToDateStatusType.UpToDate, "Project should be assumed to be up-to-date");

                // Rebuild this project
                tick();
                builder.invalidateProject("/src/logic");
                builder.buildInvalidatedProjects();
                // The file should be updated
                assert.equal(fs.statSync("/src/logic/index.js").mtimeMs, time(), "JS file should have been rebuilt");
                assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should *not* have been rebuilt");

                // Build downstream projects should update 'tests', but not 'core'
                tick();
                builder.buildDependentInvalidatedProjects();
                assert.equal(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should have been rebuilt");
                assert.isBelow(fs.statSync("/src/core/index.js").mtimeMs, time(), "Upstream JS file should not have been rebuilt");
            });
        });

        describe("tsbuild - with resolveJsonModule option", () => {
            const projFs = loadProjectFromDisk("tests/projects/resolveJsonModuleAndComposite");
            const allExpectedOutputs = ["/src/tests/dist/src/index.js", "/src/tests/dist/src/index.d.ts", "/src/tests/dist/src/hello.json"];

            function verifyProjectWithResolveJsonModule(configFile: string, ...expectedDiagnosticMessages: DiagnosticMessage[]) {
                const fs = projFs.shadow();
                const host = new fakes.CompilerHost(fs);
                const builder = createSolutionBuilder(host, buildHost, [configFile], { dry: false, force: false, verbose: false });
                clearDiagnostics();
                builder.buildAllProjects();
                assertDiagnosticMessages(...expectedDiagnosticMessages);
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

            it("with resolveJsonModule and files containing json file", () => {
                verifyProjectWithResolveJsonModule("/src/tests/tsconfig_withFiles.json");
            });

            it("with resolveJsonModule and include and files", () => {
                verifyProjectWithResolveJsonModule("/src/tests/tsconfig_withIncludeAndFiles.json");
            });
        });
    }

    export namespace OutFile {
        const outFileFs = loadProjectFromDisk("tests/projects/outfile-concat");

        describe("tsbuild - baseline sectioned sourcemaps", () => {
            let fs: vfs.FileSystem | undefined;
            before(() => {
                fs = outFileFs.shadow();
                const host = new fakes.CompilerHost(fs);
                const builder = createSolutionBuilder(host, buildHost, ["/src/third"], { dry: false, force: false, verbose: false });
                clearDiagnostics();
                builder.buildAllProjects();
                assertDiagnosticMessages(/*none*/);
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
                const host = new fakes.CompilerHost(fs);
                const builder = createSolutionBuilder(host, buildHost, ["/src/third"], { dry: false, force: false, verbose: false });
                clearDiagnostics();
                builder.buildAllProjects();
                assertDiagnosticMessages(/*none*/);
                assert.equal(fs.statSync("src/third/thirdjs/output/third-output.js").mtimeMs, time(), "First build timestamp is correct");
                tick();
                replaceText(fs, "src/first/first_PART1.ts", "Hello", "Hola");
                tick();
                builder.resetBuildContext();
                builder.buildAllProjects();
                assertDiagnosticMessages(/*none*/);
                assert.equal(fs.statSync("src/third/thirdjs/output/third-output.js").mtimeMs, time(), "Second build timestamp is correct");
            });
        });
    }

    describe("tsbuild - graph-ordering", () => {
        let host: fakes.CompilerHost | undefined;
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
            host = new fakes.CompilerHost(fs);
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
            const builder = createSolutionBuilder(host!, buildHost, rootNames, { dry: true, force: false, verbose: false });

            const projFileNames = rootNames.map(getProjectFileName);
            const graph = builder.getBuildGraph(projFileNames);
            if (graph === undefined) throw new Error("Graph shouldn't be undefined");

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

    function assertDiagnosticMessages(...expected: DiagnosticMessage[]) {
        const actual = lastDiagnostics.slice();
        if (actual.length !== expected.length) {
            assert.fail<any>(actual, expected, `Diagnostic arrays did not match - got\r\n${actual.map(a => "  " + a.messageText).join("\r\n")}\r\nexpected\r\n${expected.map(e => "  " + e.message).join("\r\n")}`);
        }
        for (let i = 0; i < actual.length; i++) {
            if (actual[i].code !== expected[i].code) {
                assert.fail(actual[i].messageText, expected[i].message, `Mismatched error code - expected diagnostic ${i} "${actual[i].messageText}" to match ${expected[i].message}`);
            }
        }
    }

    function clearDiagnostics() {
        lastDiagnostics = [];
    }

    export function printDiagnostics(header = "== Diagnostics ==") {
        const out = createDiagnosticReporter(sys);
        sys.write(header + "\r\n");
        for (const d of lastDiagnostics) {
            out(d);
        }
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
}
