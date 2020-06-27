namespace ts {
    describe("unittests:: tsbuild:: on 'sample1' project", () => {
        let projFs: vfs.FileSystem;
        const testsOutputs = ["/src/tests/index.js", "/src/tests/index.d.ts", "/src/tests/tsconfig.tsbuildinfo"];
        const logicOutputs = ["/src/logic/index.js", "/src/logic/index.js.map", "/src/logic/index.d.ts", "/src/logic/tsconfig.tsbuildinfo"];
        const coreOutputs = ["/src/core/index.js", "/src/core/index.d.ts", "/src/core/index.d.ts.map", "/src/core/tsconfig.tsbuildinfo"];
        const allExpectedOutputs = [...testsOutputs, ...logicOutputs, ...coreOutputs];

        before(() => {
            projFs = loadProjectFromDisk("tests/projects/sample1");
        });

        after(() => {
            projFs = undefined!; // Release the contents
        });

        function getSampleFsAfterBuild() {
            const fs = projFs.shadow();
            const host = fakes.SolutionBuilderHost.create(fs);
            const builder = createSolutionBuilder(host, ["/src/tests"], {});
            builder.build();
            fs.makeReadonly();
            return fs;
        }

        describe("sanity check of clean build of 'sample1' project", () => {
            verifyTsc({
                scenario: "sample1",
                subScenario: "builds correctly when outDir is specified",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests"],
                modifyFs: fs => fs.writeFileSync("/src/logic/tsconfig.json", JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, sourceMap: true, outDir: "outDir" },
                    references: [{ path: "../core" }]
                })),
            });

            verifyTsc({
                scenario: "sample1",
                subScenario: "builds correctly when declarationDir is specified",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests"],
                modifyFs: fs => fs.writeFileSync("/src/logic/tsconfig.json", JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, sourceMap: true, declarationDir: "out/decls" },
                    references: [{ path: "../core" }]
                })),
            });

            verifyTsc({
                scenario: "sample1",
                subScenario: "builds correctly when project is not composite or doesnt have any references",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/core", "--verbose"],
                modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", `"composite": true,`, ""),
            });
        });

        describe("dry builds", () => {
            verifyTsc({
                scenario: "sample1",
                subScenario: "does not write any files in a dry build",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--dry"],
            });
        });

        describe("clean builds", () => {
            verifyTscSerializedIncrementalEdits({
                scenario: "sample1",
                subScenario: "removes all files it built",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/tests", "--clean"],
                incrementalScenarios: noChangeOnlyRuns
            });

            it("cleans till project specified", () => {
                const fs = projFs.shadow();
                const host = fakes.SolutionBuilderHost.create(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.build();
                const result = builder.clean("/src/logic");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsPresent(fs, testsOutputs);
                verifyOutputsAbsent(fs, [...logicOutputs, ...coreOutputs]);
                assert.equal(result, ExitStatus.Success);
            });

            it("cleaning project in not build order doesnt throw error", () => {
                const fs = projFs.shadow();
                const host = fakes.SolutionBuilderHost.create(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                builder.build();
                const result = builder.clean("/src/logic2");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsPresent(fs, allExpectedOutputs);
                assert.equal(result, ExitStatus.InvalidProject_OutputsSkipped);
            });
        });

        describe("force builds", () => {
            verifyTscSerializedIncrementalEdits({
                scenario: "sample1",
                subScenario: "always builds under with force option",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--force"],
                incrementalScenarios: noChangeOnlyRuns
            });
        });

        describe("can detect when and what to rebuild", () => {
            function initializeWithBuild(opts?: BuildOptions) {
                const { fs, tick } = getFsWithTime(projFs);
                const host = fakes.SolutionBuilderHost.create(fs);
                let builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.build();
                host.clearDiagnostics();
                tick();
                builder = createSolutionBuilder(host, ["/src/tests"], { ...(opts || {}), verbose: true });
                return { fs, host, builder };
            }

            verifyTscIncrementalEdits({
                scenario: "sample1",
                subScenario: "can detect when and what to rebuild",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                incrementalScenarios: [
                    // Update a file in the leaf node (tests), only it should rebuild the last one
                    {
                        subScenario: "Only builds the leaf node project",
                        buildKind: BuildKind.IncrementalDtsUnchanged,
                        modifyFs: fs => fs.writeFileSync("/src/tests/index.ts", "const m = 10;"),
                    },
                    // Update a file in the parent (without affecting types), should get fast downstream builds
                    {
                        subScenario: "Detects type-only changes in upstream projects",
                        buildKind: BuildKind.IncrementalDtsChange,
                        modifyFs: fs => replaceText(fs, "/src/core/index.ts", "HELLO WORLD", "WELCOME PLANET"),
                    },
                    {
                        subScenario: "indicates that it would skip builds during a dry build",
                        buildKind: BuildKind.IncrementalDtsUnchanged,
                        modifyFs: noop,
                        commandLineArgs: ["--b", "/src/tests", "--dry"],
                    },
                    {
                        subScenario: "rebuilds from start if force option is set",
                        buildKind: BuildKind.IncrementalDtsChange,
                        modifyFs: noop,
                        commandLineArgs: ["--b", "/src/tests", "--verbose", "--force"],
                    },
                    {
                        subScenario: "rebuilds when tsconfig changes",
                        buildKind: BuildKind.IncrementalDtsChange,
                        modifyFs: fs => replaceText(fs, "/src/tests/tsconfig.json", `"composite": true`, `"composite": true, "target": "es3"`),
                    },
                ]
            });

            it("rebuilds completely when version in tsbuildinfo doesnt match ts version", () => {
                const { host, builder } = initializeWithBuild();
                changeCompilerVersion(host);
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, "src/core/tsconfig.json", fakes.version, version],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, "src/logic/tsconfig.json", fakes.version, version],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, "src/tests/tsconfig.json", fakes.version, version],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"],
                );
            });

            it("does not rebuild if there is no program and bundle in the ts build info event if version doesnt match ts version", () => {
                const { fs, tick } = getFsWithTime(projFs);
                const host = fakes.SolutionBuilderHost.create(fs, /*options*/ undefined, /*setParentNodes*/ undefined, createAbstractBuilder);
                let builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/tests/tsconfig.json", "src/tests/index.js"],
                    [Diagnostics.Building_project_0, "/src/tests/tsconfig.json"]
                );
                verifyOutputsPresent(fs, allExpectedOutputs);

                host.clearDiagnostics();
                tick();
                builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                changeCompilerVersion(host);
                builder.build();
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json", "src/tests/tsconfig.json"),
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/core/tsconfig.json", "src/core/anotherModule.ts", "src/core/anotherModule.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/logic/tsconfig.json", "src/logic/index.ts", "src/logic/index.js"],
                    [Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, "src/tests/tsconfig.json", "src/tests/index.ts", "src/tests/index.js"]
                );
            });

            verifyTscSerializedIncrementalEdits({
                scenario: "sample1",
                subScenario: "rebuilds when extended config file changes",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                modifyFs: fs => {
                    fs.writeFileSync("/src/tests/tsconfig.base.json", JSON.stringify({ compilerOptions: { target: "es3" } }));
                    replaceText(fs, "/src/tests/tsconfig.json", `"references": [`, `"extends": "./tsconfig.base.json", "references": [`);
                },
                incrementalScenarios: [{
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => fs.writeFileSync("/src/tests/tsconfig.base.json", JSON.stringify({ compilerOptions: {} }))
                }]
            });

            it("builds till project specified", () => {
                const fs = projFs.shadow();
                const host = fakes.SolutionBuilderHost.create(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                const result = builder.build("/src/logic");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsAbsent(fs, testsOutputs);
                verifyOutputsPresent(fs, [...logicOutputs, ...coreOutputs]);
                assert.equal(result, ExitStatus.Success);
            });

            it("building project in not build order doesnt throw error", () => {
                const fs = projFs.shadow();
                const host = fakes.SolutionBuilderHost.create(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                const result = builder.build("/src/logic2");
                host.assertDiagnosticMessages(/*empty*/);
                verifyOutputsAbsent(fs, allExpectedOutputs);
                assert.equal(result, ExitStatus.InvalidProject_OutputsSkipped);
            });

            it("building using getNextInvalidatedProject", () => {
                interface SolutionBuilderResult<T> {
                    project: ResolvedConfigFileName;
                    result: T;
                }

                const fs = projFs.shadow();
                const host = fakes.SolutionBuilderHost.create(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], {});
                verifyBuildNextResult({
                    project: "/src/core/tsconfig.json" as ResolvedConfigFileName,
                    result: ExitStatus.Success
                }, coreOutputs, [...logicOutputs, ...testsOutputs]);

                verifyBuildNextResult({
                    project: "/src/logic/tsconfig.json" as ResolvedConfigFileName,
                    result: ExitStatus.Success
                }, [...coreOutputs, ...logicOutputs], testsOutputs);

                verifyBuildNextResult({
                    project: "/src/tests/tsconfig.json" as ResolvedConfigFileName,
                    result: ExitStatus.Success
                }, allExpectedOutputs, emptyArray);

                verifyBuildNextResult(/*expected*/ undefined, allExpectedOutputs, emptyArray);

                function verifyBuildNextResult(
                    expected: SolutionBuilderResult<ExitStatus> | undefined,
                    presentOutputs: readonly string[],
                    absentOutputs: readonly string[]
                ) {
                    const project = builder.getNextInvalidatedProject();
                    const result = project && project.done();
                    assert.deepEqual(project && { project: project.project, result }, expected);
                    verifyOutputsPresent(fs, presentOutputs);
                    verifyOutputsAbsent(fs, absentOutputs);
                }
            });

            it("building using buildReferencedProject", () => {
                const fs = projFs.shadow();
                const host = fakes.SolutionBuilderHost.create(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                builder.buildReferences("/src/tests");
                host.assertDiagnosticMessages(
                    getExpectedDiagnosticForProjectsInBuild("src/core/tsconfig.json", "src/logic/tsconfig.json"),
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/core/tsconfig.json", "src/core/anotherModule.js"],
                    [Diagnostics.Building_project_0, "/src/core/tsconfig.json"],
                    [Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, "src/logic/tsconfig.json", "src/logic/index.js"],
                    [Diagnostics.Building_project_0, "/src/logic/tsconfig.json"],
                );
                verifyOutputsPresent(fs, [...coreOutputs, ...logicOutputs]);
                verifyOutputsAbsent(fs, testsOutputs);
            });
        });

        describe("downstream-blocked compilations", () => {
            verifyTsc({
                scenario: "sample1",
                subScenario: "does not build downstream projects if upstream projects have errors",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                modifyFs: fs => replaceText(fs, "/src/logic/index.ts", "c.multiply(10, 15)", `c.muitply()`)
            });
        });

        describe("project invalidation", () => {
            it("invalidates projects correctly", () => {
                const { fs, time, tick } = getFsWithTime(projFs);
                const host = fakes.SolutionBuilderHost.create(fs);
                const builder = createSolutionBuilder(host, ["/src/tests"], { dry: false, force: false, verbose: false });

                builder.build();
                host.assertDiagnosticMessages(/*empty*/);

                // Update a timestamp in the middle project
                tick();
                appendText(fs, "/src/logic/index.ts", "function foo() {}");
                const originalWriteFile = fs.writeFileSync;
                const writtenFiles = createMap<true>();
                fs.writeFileSync = (path, data, encoding) => {
                    writtenFiles.set(path, true);
                    originalWriteFile.call(fs, path, data, encoding);
                };
                // Because we haven't reset the build context, the builder should assume there's nothing to do right now
                const status = builder.getUpToDateStatusOfProject("/src/logic");
                assert.equal(status.type, UpToDateStatusType.UpToDate, "Project should be assumed to be up-to-date");
                verifyInvalidation(/*expectedToWriteTests*/ false);

                // Rebuild this project
                fs.writeFileSync("/src/logic/index.ts", `${fs.readFileSync("/src/logic/index.ts")}
export class cNew {}`);
                verifyInvalidation(/*expectedToWriteTests*/ true);

                function verifyInvalidation(expectedToWriteTests: boolean) {
                    // Rebuild this project
                    tick();
                    builder.invalidateProject("/src/logic/tsconfig.json" as ResolvedConfigFilePath);
                    builder.buildNextInvalidatedProject();
                    // The file should be updated
                    assert.isTrue(writtenFiles.has("/src/logic/index.js"), "JS file should have been rebuilt");
                    assert.equal(fs.statSync("/src/logic/index.js").mtimeMs, time(), "JS file should have been rebuilt");
                    assert.isFalse(writtenFiles.has("/src/tests/index.js"), "Downstream JS file should *not* have been rebuilt");
                    assert.isBelow(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should *not* have been rebuilt");
                    writtenFiles.clear();

                    // Build downstream projects should update 'tests', but not 'core'
                    tick();
                    builder.buildNextInvalidatedProject();
                    if (expectedToWriteTests) {
                        assert.isTrue(writtenFiles.has("/src/tests/index.js"), "Downstream JS file should have been rebuilt");
                    }
                    else {
                        assert.equal(writtenFiles.size, 0, "Should not write any new files");
                    }
                    assert.equal(fs.statSync("/src/tests/index.js").mtimeMs, time(), "Downstream JS file should have new timestamp");
                    assert.isBelow(fs.statSync("/src/core/index.js").mtimeMs, time(), "Upstream JS file should not have been rebuilt");
                }
            });
        });

        const coreChanges: TscIncremental[] = [
            {
                buildKind: BuildKind.IncrementalDtsChange,
                modifyFs: fs => appendText(fs, "/src/core/index.ts", `
export class someClass { }`),
            },
            {
                buildKind: BuildKind.IncrementalDtsUnchanged,
                modifyFs: fs => appendText(fs, "/src/core/index.ts", `
class someClass2 { }`),
            }
        ];

        describe("lists files", () => {
            verifyTscSerializedIncrementalEdits({
                scenario: "sample1",
                subScenario: "listFiles",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--listFiles"],
                incrementalScenarios: coreChanges
            });
            verifyTscSerializedIncrementalEdits({
                scenario: "sample1",
                subScenario: "listEmittedFiles",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--listEmittedFiles"],
                incrementalScenarios: coreChanges
            });
        });

        describe("emit output", () => {
            verifyTscSerializedIncrementalEdits({
                subScenario: "sample",
                fs: () => projFs,
                scenario: "sample1",
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                baselineSourceMap: true,
                baselineReadFileCalls: true,
                incrementalScenarios: [
                    ...coreChanges,
                    {
                        subScenario: "when logic config changes declaration dir",
                        buildKind: BuildKind.IncrementalDtsChange,
                        modifyFs: fs => replaceText(fs, "/src/logic/tsconfig.json", `"declaration": true,`, `"declaration": true,
        "declarationDir": "decls",`),
                    },
                    noChangeRun,
                ],
            });

            verifyTsc({
                scenario: "sample1",
                subScenario: "when logic specifies tsBuildInfoFile",
                fs: () => projFs,
                modifyFs: fs => replaceText(fs, "/src/logic/tsconfig.json", `"composite": true,`, `"composite": true,
        "tsBuildInfoFile": "ownFile.tsbuildinfo",`),
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                baselineSourceMap: true,
                baselineReadFileCalls: true
            });

            verifyTscSerializedIncrementalEdits({
                subScenario: "when declaration option changes",
                fs: () => projFs,
                scenario: "sample1",
                commandLineArgs: ["--b", "/src/core", "--verbose"],
                modifyFs: fs => fs.writeFileSync("/src/core/tsconfig.json", `{
    "compilerOptions": {
        "incremental": true,
        "skipDefaultLibCheck": true
    }
}`),
                incrementalScenarios: [{
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", `"incremental": true,`, `"incremental": true, "declaration": true,`),
                }],
            });

            verifyTscSerializedIncrementalEdits({
                subScenario: "when target option changes",
                fs: () => projFs,
                scenario: "sample1",
                commandLineArgs: ["--b", "/src/core", "--verbose"],
                modifyFs: fs => {
                    fs.writeFileSync("/lib/lib.esnext.full.d.ts", `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`);
                    fs.writeFileSync("/lib/lib.esnext.d.ts", libContent);
                    fs.writeFileSync("/lib/lib.d.ts", `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`);
                    fs.writeFileSync("/src/core/tsconfig.json", `{
    "compilerOptions": {
        "incremental": true,
"listFiles": true,
"listEmittedFiles": true,
        "target": "esnext",
    }
}`);
                },
                incrementalScenarios: [{
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", "esnext", "es5"),
                }],
            });

            verifyTscSerializedIncrementalEdits({
                subScenario: "when module option changes",
                fs: () => projFs,
                scenario: "sample1",
                commandLineArgs: ["--b", "/src/core", "--verbose"],
                modifyFs: fs => fs.writeFileSync("/src/core/tsconfig.json", `{
    "compilerOptions": {
        "incremental": true,
        "module": "commonjs"
    }
}`),
                incrementalScenarios: [{
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", `"module": "commonjs"`, `"module": "amd"`),
                }],
            });

            verifyTscSerializedIncrementalEdits({
                subScenario: "when esModuleInterop option changes",
                fs: () => projFs,
                scenario: "sample1",
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                modifyFs: fs => fs.writeFileSync("/src/tests/tsconfig.json", `{
    "references": [
        { "path": "../core" },
        { "path": "../logic" }
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true,
        "esModuleInterop": false
    }
}`),
                incrementalScenarios: [{
                    buildKind: BuildKind.IncrementalDtsChange,
                    modifyFs: fs => replaceText(fs, "/src/tests/tsconfig.json", `"esModuleInterop": false`, `"esModuleInterop": true`),
                }],
            });
        });
    });
}
