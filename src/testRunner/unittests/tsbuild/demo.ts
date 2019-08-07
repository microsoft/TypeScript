namespace ts {
    describe("unittests:: tsbuild:: on demo project", () => {
        let projFs: vfs.FileSystem;
        const { time } = getTime();

        before(() => {
            projFs = loadProjectFromDisk("tests/projects/demo", time);
        });

        after(() => {
            projFs = undefined!; // Release the contents
        });

        function coreOutputs(): string[] {
            return [
                "/src/lib/core/utilities.js",
                "/src/lib/core/utilities.d.ts",
                "/src/lib/core/tsconfig.tsbuildinfo"
            ];
        }

        function animalOutputs(): string[] {
            return [
                "/src/lib/animals/animal.js",
                "/src/lib/animals/animal.d.ts",
                "/src/lib/animals/index.js",
                "/src/lib/animals/index.d.ts",
                "/src/lib/animals/dog.js",
                "/src/lib/animals/dog.d.ts",
                "/src/lib/animals/tsconfig.tsbuildinfo"
            ];
        }

        function zooOutputs(): string[] {
            return [
                "/src/lib/zoo/zoo.js",
                "/src/lib/zoo/zoo.d.ts",
                "/src/lib/zoo/tsconfig.tsbuildinfo"
            ];
        }

        interface VerifyBuild {
            modifyDiskLayout: (fs: vfs.FileSystem) => void;
            expectedExitStatus: ExitStatus;
            expectedDiagnostics: fakes.ExpectedDiagnostic[];
            expectedOutputs: readonly string[];
            notExpectedOutputs: readonly string[];
        }

        function verifyBuild({ modifyDiskLayout, expectedExitStatus, expectedDiagnostics, expectedOutputs, notExpectedOutputs }: VerifyBuild) {
            const fs = projFs.shadow();
            const host = new fakes.SolutionBuilderHost(fs);
            modifyDiskLayout(fs);
            const builder = createSolutionBuilder(host, ["/src/tsconfig.json"], { verbose: true });
            const exitStatus = builder.build();
            assert.equal(exitStatus, expectedExitStatus);
            host.assertDiagnosticMessages(...expectedDiagnostics);
            verifyOutputsPresent(fs, expectedOutputs);
            verifyOutputsAbsent(fs, notExpectedOutputs);
        }

        it("in master branch with everything setup correctly, reports no error", () => {
            verifyBuild({
                modifyDiskLayout: noop,
                expectedExitStatus: ExitStatus.Success,
                expectedDiagnostics: [
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/animals/tsconfig.json", "src/zoo/tsconfig.json", "src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/lib/core/utilities.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/animals/tsconfig.json", "src/lib/animals/animal.js"],
                    [Diagnostics.Building_project_0, "/src/animals/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/zoo/tsconfig.json", "src/lib/zoo/zoo.js"],
                    [Diagnostics.Building_project_0, "/src/zoo/tsconfig.json"]
                ],
                expectedOutputs: [...coreOutputs(), ...animalOutputs(), ...zooOutputs()],
                notExpectedOutputs: emptyArray
            });
        });
    });
}
