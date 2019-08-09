namespace ts {
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
            builder.build();
            host.assertDiagnosticMessages({
                message: [Diagnostics.The_files_list_in_config_file_0_is_empty, "/src/no-references/tsconfig.json"],
                location: expectedLocationLastIndexOf(fs, "/src/no-references/tsconfig.json", "[]"),
            });

            // Check for outputs to not be written.
            verifyOutputsAbsent(fs, allExpectedOutputs);
        });

        it("does not have empty files diagnostic when files is empty and references are provided", () => {
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/with-references"], { dry: false, force: false, verbose: false });

            host.clearDiagnostics();
            builder.build();
            host.assertDiagnosticMessages(/*empty*/);

            // Check for outputs to be written.
            verifyOutputsPresent(fs, allExpectedOutputs);
        });
    });
}
