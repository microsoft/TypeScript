namespace ts {
    let currentTime = 100;
    const bfs = new vfs.FileSystem(/*ignoreCase*/ false, { time });
    let lastDiagnostics: Diagnostic[] = [];
    const reportDiagnostic: DiagnosticReporter = diagnostic => lastDiagnostics.push(diagnostic);

    const sampleRoot = resolvePath(__dirname, "../../tests/projects/sample1");
    loadFsMirror(bfs, sampleRoot, "/src");
    bfs.mkdirpSync("/lib");
    bfs.writeFileSync("/lib/lib.d.ts", Harness.IO.readFile(combinePaths(Harness.libFolder, "lib.d.ts")));
    bfs.meta.set("defaultLibLocation", "/lib");
    bfs.makeReadonly();
    tick();

    describe("tsbuild - sanity check of clean build of 'sample1' project", () => {
        it("can build the sample project 'sample1' without error", () => {
            const fs = bfs.shadow();
            const host = new fakes.CompilerHost(fs);
            const builder = createSolutionBuilder(host, reportDiagnostic, { dry: false, force: false, verbose: false });

            fs.chdir("/src/tests");
            builder.buildProjects(["."]);
            assertDiagnosticMessages(/*empty*/);

            // Check for outputs. Not an exhaustive list
            const expectedOutputs = ["/src/tests/index.js", "/src/core/index.js", "/src/core/index.d.ts"];
            for (const output of expectedOutputs) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }
        });
    });

    describe("tsbuild - can detect when and what to rebuild", () => {
        const fs = bfs.shadow();
        const host = new fakes.CompilerHost(fs);
        const builder = createSolutionBuilder(host, reportDiagnostic, { dry: false, force: false, verbose: true });

        fs.chdir("/src/tests");

        it("Builds the project", () => {
            builder.resetBuildContext();
            builder.buildProjects(["."]);
            assertDiagnosticMessages(Diagnostics.Sorted_list_of_input_projects_Colon_0,
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
            builder.buildProjects(["."]);
            assertDiagnosticMessages(Diagnostics.Sorted_list_of_input_projects_Colon_0,
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
            builder.buildProjects(["."]);

            assertDiagnosticMessages(Diagnostics.Sorted_list_of_input_projects_Colon_0,
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
            builder.buildProjects(["."]);

            assertDiagnosticMessages(Diagnostics.Sorted_list_of_input_projects_Colon_0,
                Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                Diagnostics.Building_project_0,
                Diagnostics.Project_0_is_up_to_date_with_its_upstream_types,
                Diagnostics.Updating_output_timestamps_of_project_0,
                Diagnostics.Project_0_is_up_to_date_with_its_upstream_types,
                Diagnostics.Updating_output_timestamps_of_project_0);
        });
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
            assert.fail<any>(actual, expected, `Diagnostic arrays did not match - expected\r\n${actual.map(a => "  " + a.messageText).join("\r\n")}\r\ngot\r\n${expected.map(e => "  " + e.message).join("\r\n")}`);
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

    function loadFsMirror(vfs: vfs.FileSystem, localRoot: string, virtualRoot: string) {
        vfs.mkdirpSync(virtualRoot);
        for (const path of Harness.IO.readDirectory(localRoot)) {
            const file = getBaseFileName(path);
            vfs.writeFileSync(virtualRoot + "/" + file, Harness.IO.readFile(localRoot + "/" + file));
        }
        for (const dir of Harness.IO.getDirectories(localRoot)) {
            loadFsMirror(vfs, localRoot + "/" + dir, virtualRoot + "/" + dir);
        }
    }
}