namespace ts {
    describe("unittests:: tsbuild:: when project reference is referenced transitively", () => {
        let projFs: vfs.FileSystem;
        const allExpectedOutputs = [
            "/src/a.js", "/src/a.d.ts",
            "/src/b.js", "/src/b.d.ts",
            "/src/c.js"
        ];
        const expectedFileTraces = [
            "/lib/lib.d.ts",
            "/src/a.ts",
            "/lib/lib.d.ts",
            "/src/a.d.ts",
            "/src/b.ts",
            "/lib/lib.d.ts",
            "/src/a.d.ts",
            "/src/b.d.ts",
            "/src/refs/a.d.ts",
            "/src/c.ts"
        ];
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/transitiveReferences");
        });
        after(() => {
            projFs = undefined!; // Release the contents
        });

        function verifyBuild(modifyDiskLayout: (fs: vfs.FileSystem) => void, allExpectedOutputs: ReadonlyArray<string>, expectedFileTraces: ReadonlyArray<string>, ...expectedDiagnostics: fakes.ExpectedDiagnostic[]) {
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            modifyDiskLayout(fs);
            const builder = createSolutionBuilder(host, ["/src/tsconfig.c.json"], { listFiles: true });
            builder.buildAllProjects();
            host.assertDiagnosticMessages(...expectedDiagnostics);
            for (const output of allExpectedOutputs) {
                assert(fs.existsSync(output), `Expect file ${output} to exist`);
            }
            assert.deepEqual(host.traces, expectedFileTraces);
        }

        function modifyFsBTsToNonRelativeImport(fs: vfs.FileSystem, moduleResolution: "node" | "classic") {
            fs.writeFileSync("/src/b.ts", `import {A} from 'a';
export const b = new A();`);
            fs.writeFileSync("/src/tsconfig.b.json", JSON.stringify({
                compilerOptions: {
                    composite: true,
                    moduleResolution
                },
                files: ["b.ts"],
                references: [{ path: "tsconfig.a.json" }]
            }));
        }

        it("verify that it builds correctly", () => {
            verifyBuild(noop, allExpectedOutputs, expectedFileTraces);
        });

        it("verify that it builds correctly when the referenced project uses different module resolution", () => {
            verifyBuild(fs => modifyFsBTsToNonRelativeImport(fs, "classic"), allExpectedOutputs, expectedFileTraces);
        });

        it("verify that it build reports error about module not found with node resolution with external module name", () => {
            // Error in b build only a
            const allExpectedOutputs = ["/src/a.js", "/src/a.d.ts"];
            const expectedFileTraces = [
                "/lib/lib.d.ts",
                "/src/a.ts",
                "/lib/lib.d.ts",
                "/src/b.ts"
            ];
            verifyBuild(fs => modifyFsBTsToNonRelativeImport(fs, "node"),
                allExpectedOutputs,
                expectedFileTraces,
                [Diagnostics.Cannot_find_module_0, "a"],
            );
        });
    });
}
