namespace ts {
    describe("unittests:: tsbuild:: when containerOnly project is referenced", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/containerOnlyReferenced");
        });

        after(() => {
            projFs = undefined!; // Release the contents
        });

        function outputs(folder: string) {
            return [
                `${folder}/index.js`,
                `${folder}/index.d.ts`,
                `${folder}/tsconfig.tsbuildinfo`
            ];
        }

        it("verify that subsequent builds after initial build doesnt build anything", () => {
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            createSolutionBuilder(host, ["/src"], { verbose: true }).build();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild("src/src/folder/tsconfig.json", "src/src/folder2/tsconfig.json", "src/src/tsconfig.json", "src/tests/tsconfig.json", "src/tsconfig.json"),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/folder/tsconfig.json", "src/src/folder/index.js"],
                [Diagnostics.Building_project_0, "/src/src/folder/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/folder2/tsconfig.json", "src/src/folder2/index.js"],
                [Diagnostics.Building_project_0, "/src/src/folder2/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"],
            );
            verifyOutputsPresent(fs, [
                ...outputs("/src/src/folder"),
                ...outputs("/src/src/folder2"),
                ...outputs("/src/tests"),
            ]);
            host.clearDiagnostics();
            createSolutionBuilder(host, ["/src"], { verbose: true }).build();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild("src/src/folder/tsconfig.json", "src/src/folder2/tsconfig.json", "src/src/tsconfig.json", "src/tests/tsconfig.json", "src/tsconfig.json"),
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/src/folder/tsconfig.json", "src/src/folder/index.ts", "src/src/folder/index.js"],
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/src/folder2/tsconfig.json", "src/src/folder2/index.ts", "src/src/folder2/index.js"],
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/tests/tsconfig.json", "src/tests/index.ts", "src/tests/index.js"],
            );
        });
    });
}
