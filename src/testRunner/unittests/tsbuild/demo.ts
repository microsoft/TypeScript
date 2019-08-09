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
            expectedDiagnostics: (fs: vfs.FileSystem) => fakes.ExpectedDiagnostic[];
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
            host.assertDiagnosticMessages(...expectedDiagnostics(fs));
            verifyOutputsPresent(fs, expectedOutputs);
            verifyOutputsAbsent(fs, notExpectedOutputs);
        }

        it("in master branch with everything setup correctly, reports no error", () => {
            verifyBuild({
                modifyDiskLayout: noop,
                expectedExitStatus: ExitStatus.Success,
                expectedDiagnostics: () => [
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

        it("in circular branch reports the error about it by stopping build", () => {
            verifyBuild({
                modifyDiskLayout: fs => replaceText(
                    fs,
                    "/src/core/tsconfig.json",
                    "}",
                    `},
  "references": [
    {
      "path": "../zoo"
    }
  ]`
                ),
                expectedExitStatus: ExitStatus.ProjectReferenceCycle_OutputsSkupped,
                expectedDiagnostics: () => [
                    getExpectedDiagnosticForProjectsInBuild("src/animals/tsconfig.json", "src/zoo/tsconfig.json", "src/core/tsconfig.json", "src/tsconfig.json"),
                    errorDiagnostic([
                        Diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0,
                        [
                            "/src/tsconfig.json",
                            "/src/core/tsconfig.json",
                            "/src/zoo/tsconfig.json",
                            "/src/animals/tsconfig.json"
                        ].join("\r\n")
                    ])
                ],
                expectedOutputs: emptyArray,
                notExpectedOutputs: [...coreOutputs(), ...animalOutputs(), ...zooOutputs()]
            });
        });

        it("in bad-ref branch reports the error about files not in rootDir at the import location", () => {
            verifyBuild({
                modifyDiskLayout: fs => prependText(
                    fs,
                    "/src/core/utilities.ts",
                    `import * as A from '../animals';
`
                ),
                expectedExitStatus: ExitStatus.DiagnosticsPresent_OutputsSkipped,
                expectedDiagnostics: fs => [
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/animals/tsconfig.json", "src/zoo/tsconfig.json", "src/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/lib/core/utilities.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    {
                        message: [Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, "/src/animals/animal.ts", "/src/core"],
                        location: expectedLocationIndexOf(fs, "/src/animals/index.ts", `'./animal'`),
                    },
                    {
                        message: [Diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern, "/src/animals/animal.ts", "/src/core/tsconfig.json"],
                        location: expectedLocationIndexOf(fs, "/src/animals/index.ts", `'./animal'`),
                    },
                    {
                        message: [Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, "/src/animals/dog.ts", "/src/core"],
                        location: expectedLocationIndexOf(fs, "/src/animals/index.ts", `'./dog'`),
                    },
                    {
                        message: [Diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern, "/src/animals/dog.ts", "/src/core/tsconfig.json"],
                        location: expectedLocationIndexOf(fs, "/src/animals/index.ts", `'./dog'`),
                    },
                    {
                        message: [Diagnostics._0_is_declared_but_its_value_is_never_read, "A"],
                        location: expectedLocationIndexOf(fs, "/src/core/utilities.ts", `import * as A from '../animals';`),
                    },
                    {
                        message: [Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, "/src/animals/index.ts", "/src/core"],
                        location: expectedLocationIndexOf(fs, "/src/core/utilities.ts", `'../animals'`),
                    },
                    {
                        message: [Diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern, "/src/animals/index.ts", "/src/core/tsconfig.json"],
                        location: expectedLocationIndexOf(fs, "/src/core/utilities.ts", `'../animals'`),
                    },
                    [Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors, "src/animals/tsconfig.json", "src/core"],
                    [Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors, "/src/animals/tsconfig.json", "/src/core"],
                    [Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built, "src/zoo/tsconfig.json", "src/animals"],
                    [Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built, "/src/zoo/tsconfig.json", "/src/animals"],
                ],
                expectedOutputs: emptyArray,
                notExpectedOutputs: [...coreOutputs(), ...animalOutputs(), ...zooOutputs()]
            });
        });
    });
}
