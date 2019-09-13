namespace ts {
    describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
        let projFs: vfs.FileSystem;
        const { time, tick } = getTime();
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/inferredTypeFromTransitiveModule", time);
        });
        after(() => {
            projFs = undefined!;
        });

        verifyTsbuildOutput({
            scenario: "inferred type from transitive module",
            projFs: () => projFs,
            time,
            tick,
            proj: "inferredTypeFromTransitiveModule",
            rootNames: ["/src"],
            initialBuild: {
                modifyFs: noop,
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tsconfig.json", "src/obj/bar.js"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"]
                ]
            },
            incrementalDtsChangedBuild: {
                modifyFs: fs => replaceText(fs, "/src/bar.ts", "param: string", ""),
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, "src/tsconfig.json", "src/obj/bar.js", "src/bar.ts"],
                    [Diagnostics.Building_project_0, "/src/tsconfig.json"],
                    [Diagnostics.Updating_unchanged_output_timestamps_of_project_0, "/src/tsconfig.json"]
                ]
            },
            baselineOnly: true,
            verifyDiagnostics: true
        });
    });
}
