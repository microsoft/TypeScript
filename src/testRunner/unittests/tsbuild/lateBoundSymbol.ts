namespace ts {
    describe("unittests:: tsbuild:: lateBoundSymbol:: interface is merged and contains late bound member", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/lateBoundSymbol", time);
        });
        after(() => {
            projFs = undefined!; // Release the contents
        });

        verifyTsbuildOutput({
            scenario: "interface is merged and contains late bound member",
            projFs: () => projFs,
            time,
            tick,
            proj: "lateBoundSymbol",
            rootNames: ["/src/tsconfig.json"],
            expectedMapFileNames: emptyArray,
            lastProjectOutputJs: "/src/src/main.js",
            outputFiles: [
                "/src/src/hkt.js",
                "/src/src/main.js",
                "/src/tsconfig.tsbuildinfo",
            ],
            initialBuild: {
                modifyFs: noop,
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tsconfig.json", "src/src/hkt.js"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"]
                ]
            },
            incrementalDtsUnchangedBuild: {
                modifyFs: fs => replaceText(fs, "/src/src/main.ts", "const x = 10;", ""),
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tsconfig.json", "src/src/hkt.js", "src/src/main.ts"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"],
                    [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, "/src/tsconfig.json"]
                ]
            },
            baselineOnly: true,
            verifyDiagnostics: true
        });
    });
}
