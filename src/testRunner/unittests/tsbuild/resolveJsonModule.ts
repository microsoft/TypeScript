namespace ts {
    describe("unittests:: tsbuild:: with resolveJsonModule option", () => {
        let projFs: vfs.FileSystem;
        const allExpectedOutputs = ["/src/dist/src/index.js", "/src/dist/src/index.d.ts", "/src/dist/src/hello.json"];
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/resolveJsonModuleAndComposite");
        });

        after(() => {
            projFs = undefined!; // Release the contents
        });

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
            verifyProjectWithResolveJsonModule("/src/tsconfig_withInclude.json", [
                Diagnostics.File_0_is_not_in_project_file_list_Projects_must_list_all_files_or_use_an_include_pattern,
                "/src/src/hello.json"
            ]);
        });

        it("with resolveJsonModule and include of *.json along with other include", () => {
            verifyProjectWithResolveJsonModule("/src/tsconfig_withIncludeOfJson.json");
        });

        it("with resolveJsonModule and include of *.json along with other include and file name matches ts file", () => {
            const fs = projFs.shadow();
            fs.rimrafSync("/src/src/hello.json");
            fs.writeFileSync("/src/src/index.json", JSON.stringify({ hello: "world" }));
            fs.writeFileSync("/src/src/index.ts", `import hello from "./index.json"

export default hello.hello`);
            const allExpectedOutputs = ["/src/dist/src/index.js", "/src/dist/src/index.d.ts", "/src/dist/src/index.json"];
            verifyProjectWithResolveJsonModuleWithFs(fs, "/src/tsconfig_withIncludeOfJson.json", allExpectedOutputs);
        });

        it("with resolveJsonModule and files containing json file", () => {
            verifyProjectWithResolveJsonModule("/src/tsconfig_withFiles.json");
        });

        it("with resolveJsonModule and include and files", () => {
            verifyProjectWithResolveJsonModule("/src/tsconfig_withIncludeAndFiles.json");
        });

        it("with resolveJsonModule and sourceMap", () => {
            const fs = projFs.shadow();
            const configFile = "src/tsconfig_withFiles.json";
            replaceText(fs, configFile, `"composite": true,`, `"composite": true, "sourceMap": true,`);
            const host = new fakes.SolutionBuilderHost(fs);
            const builder = createSolutionBuilder(host, [configFile], { verbose: false });
            builder.buildAllProjects();
            host.assertDiagnosticMessages();
            for (const output of [...allExpectedOutputs, "/src/dist/src/index.js.map"]) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }

            const newBuilder = createSolutionBuilder(host, [configFile], { verbose: true });
            newBuilder.buildAllProjects();
            host.assertDiagnosticMessages(
                getExpectedDiagnosticForProjectsInBuild(configFile),
                [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, configFile, "src/src/index.ts", "src/dist/src/index.js"]
            );
        });
    });
}
