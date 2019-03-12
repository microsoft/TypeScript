namespace ts {
    describe("unittests:: tsbuild:: with resolveJsonModule option", () => {
        let projFs: vfs.FileSystem;
        const allExpectedOutputs = ["/src/tests/dist/src/index.js", "/src/tests/dist/src/index.d.ts", "/src/tests/dist/src/hello.json"];
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
}
