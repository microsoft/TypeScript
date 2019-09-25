namespace ts {
    describe("unittests:: tsbuild:: with rootDir of project reference in parentDirectory", () => {
        let projFs: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/projectReferenceWithRootDirInParent");
        });

        after(() => {
            projFs = undefined!; // Release the contents
        });

        it("verify that it builds correctly", () => {
            const allExpectedOutputs = [
                "/src/dist/other/other.js", "/src/dist/other/other.d.ts",
                "/src/dist/main/a.js", "/src/dist/main/a.d.ts",
                "/src/dist/main/b.js", "/src/dist/main/b.d.ts"
            ];
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/src/main", "/src/src/other"], {});
            builder.build();
            host.assertDiagnosticMessages(/*empty*/);
            verifyOutputsPresent(fs, allExpectedOutputs);
        });

        it("verify that it reports error for same .tsbuildinfo file because no rootDir in the base", () => {
            const allExpectedOutputs = [
                "/src/dist/other.js", "/src/dist/other.d.ts",
                "/src/dist/tsconfig.tsbuildinfo"
            ];
            const missingOutputs = [
                "/src/dist/a.js", "/src/dist/a.d.ts",
                "/src/dist/b.js", "/src/dist/b.d.ts"
            ];
            const fs = projFs.shadow();
            replaceText(fs, "/src/tsconfig.base.json", `"rootDir": "./src/",`, "");
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/src/main"], { verbose: true });
            builder.build();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild("src/src/other/tsconfig.json", "src/src/main/tsconfig.json"),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/other/tsconfig.json", "src/dist/other.js"],
                [Diagnostics.Building_project_0, "/src/src/other/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/main/tsconfig.json", "src/dist/a.js"],
                [Diagnostics.Building_project_0, "/src/src/main/tsconfig.json"],
                {
                    message: [Diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, "/src/dist/tsconfig.tsbuildinfo", "/src/src/other"],
                    location: expectedLocationIndexOf(fs, "/src/src/main/tsconfig.json", `{ "path": "../other" }`),
                }
            );
            verifyOutputsPresent(fs, allExpectedOutputs);
            verifyOutputsAbsent(fs, missingOutputs);
        });

        it("verify that it reports error for same .tsbuildinfo file", () => {
            const allExpectedOutputs = [
                "/src/dist/other.js", "/src/dist/other.d.ts",
                "/src/dist/tsconfig.tsbuildinfo"
            ];
            const missingOutputs = [
                "/src/dist/a.js", "/src/dist/a.d.ts",
                "/src/dist/b.js", "/src/dist/b.d.ts"
            ];
            const fs = projFs.shadow();
            fs.writeFileSync("/src/src/main/tsconfig.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
                references: [{ path: "../other" }]
            }));
            fs.writeFileSync("/src/src/other/tsconfig.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
            }));
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/src/main"], { verbose: true });
            builder.build();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild("src/src/other/tsconfig.json", "src/src/main/tsconfig.json"),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/other/tsconfig.json", "src/dist/other.js"],
                [Diagnostics.Building_project_0, "/src/src/other/tsconfig.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/main/tsconfig.json", "src/dist/a.js"],
                [Diagnostics.Building_project_0, "/src/src/main/tsconfig.json"],
                {
                    message: [Diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, "/src/dist/tsconfig.tsbuildinfo", "/src/src/other"],
                    location: expectedLocationIndexOf(fs, "/src/src/main/tsconfig.json", `{"path":"../other"}`),
                }
            );
            verifyOutputsPresent(fs, allExpectedOutputs);
            verifyOutputsAbsent(fs, missingOutputs);
        });

        it("verify that it reports no error when .tsbuildinfo differ", () => {
            const allExpectedOutputs = [
                "/src/dist/other.js", "/src/dist/other.d.ts",
                "/src/dist/tsconfig.main.tsbuildinfo",
                "/src/dist/a.js", "/src/dist/a.d.ts",
                "/src/dist/b.js", "/src/dist/b.d.ts",
                "/src/dist/tsconfig.other.tsbuildinfo"
            ];
            const fs = projFs.shadow();
            fs.renameSync("/src/src/main/tsconfig.json", "/src/src/main/tsconfig.main.json");
            fs.renameSync("/src/src/other/tsconfig.json", "/src/src/other/tsconfig.other.json");
            fs.writeFileSync("/src/src/main/tsconfig.main.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
                references: [{ path: "../other/tsconfig.other.json" }]
            }));
            fs.writeFileSync("/src/src/other/tsconfig.other.json", JSON.stringify({
                compilerOptions: { composite: true, outDir: "../../dist/" },
            }));
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, ["/src/src/main/tsconfig.main.json"], { verbose: true });
            builder.build();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild("src/src/other/tsconfig.other.json", "src/src/main/tsconfig.main.json"),
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/other/tsconfig.other.json", "src/dist/other.js"],
                [Diagnostics.Building_project_0, "/src/src/other/tsconfig.other.json"],
                [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/src/main/tsconfig.main.json", "src/dist/a.js"],
                [Diagnostics.Building_project_0, "/src/src/main/tsconfig.main.json"]
            );
            verifyOutputsPresent(fs, allExpectedOutputs);
        });
    });
}
