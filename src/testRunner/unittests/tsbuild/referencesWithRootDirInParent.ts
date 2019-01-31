namespace ts {
    describe("unittests:: tsbuild:: with rootDir of project reference in parentDirectory", () => {
        it("verify that it builds correctly", () => {
            const projFs = loadProjectFromDisk("tests/projects/projectReferenceWithRootDirInParent");
            const allExpectedOutputs = [
                "/src/dist/other/other.js", "/src/dist/other/other.d.ts",
                "/src/dist/main/a.js", "/src/dist/main/a.d.ts",
                "/src/dist/main/b.js", "/src/dist/main/b.d.ts"
            ];
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
}
