namespace ts {
    describe("unittests:: tsbuild:: on 'sample1' project", () => {
        let projFs: vfs.FileSystem;
        let projFsWithBuild: vfs.FileSystem;
        before(() => {
            projFs = loadProjectFromDisk("tests/projects/sample1");
        });

        after(() => {
            projFs = undefined!; // Release the contents
            projFsWithBuild = undefined!;
        });

        function getTsBuildProjectFile(project: string, file: string): tscWatch.File {
            return {
                path: TestFSWithWatch.getTsBuildProjectFilePath(project, file),
                content: projFs.readFileSync(`/src/${project}/${file}`, "utf8")!
            };
        }

        function getSampleFsAfterBuild() {
            if (projFsWithBuild) return projFsWithBuild;
            const fs = projFs.shadow();
            const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc" });
            const host = createSolutionBuilderHostForBaseline(sys as TscCompileSystem);
            const builder = createSolutionBuilder(host, ["/src/tests"], {});
            builder.build();
            fs.makeReadonly();
            return projFsWithBuild = fs;
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
            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "removes all files it built",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/tests", "--clean"],
                edits: noChangeOnlyRuns
            });

            verifyTscCompileLike(testTscCompileLike, {
                scenario: "sample1",
                subScenario: "cleans till project specified",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/logic", "--clean"],
                compile: sys => {
                    const buildHost = createSolutionBuilderHostForBaseline(sys);
                    const builder = createSolutionBuilder(buildHost, ["/src/third/tsconfig.json"], {});
                    sys.exit(builder.clean("/src/logic"));
                }
            });

            verifyTscCompileLike(testTscCompileLike, {
                scenario: "sample1",
                subScenario: "cleaning project in not build order doesnt throw error",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/logic2", "--clean"],
                compile: sys => {
                    const buildHost = createSolutionBuilderHostForBaseline(sys);
                    const builder = createSolutionBuilder(buildHost, ["/src/third/tsconfig.json"], {});
                    sys.exit(builder.clean("/src/logic2"));
                }
            });
        });

        describe("force builds", () => {
            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "always builds under with force option",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--force"],
                edits: noChangeOnlyRuns
            });
        });

        describe("can detect when and what to rebuild", () => {
            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "can detect when and what to rebuild",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                edits: [
                    // Update a file in the leaf node (tests), only it should rebuild the last one
                    {
                        subScenario: "Only builds the leaf node project",
                        modifyFs: fs => fs.writeFileSync("/src/tests/index.ts", "const m = 10;"),
                    },
                    // Update a file in the parent (without affecting types), should get fast downstream builds
                    {
                        subScenario: "Detects type-only changes in upstream projects",
                        modifyFs: fs => replaceText(fs, "/src/core/index.ts", "HELLO WORLD", "WELCOME PLANET"),
                    },
                    {
                        subScenario: "rebuilds when tsconfig changes",
                        modifyFs: fs => replaceText(fs, "/src/tests/tsconfig.json", `"composite": true`, `"composite": true, "target": "es3"`),
                    },
                ]
            });

            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "when input file text does not change but its modified time changes",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                edits: [
                    {
                        subScenario: "upstream project changes without changing file text",
                        modifyFs: fs => {
                            const time = new Date(fs.time());
                            fs.utimesSync("/src/core/index.ts", time, time);
                        },
                    },
                ]
            });

            verifyTsc({
                scenario: "sample1",
                subScenario: "indicates that it would skip builds during a dry build",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/tests", "--dry"],
            });

            verifyTsc({
                scenario: "sample1",
                subScenario: "rebuilds from start if force option is set",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/tests", "--verbose", "--force"],
            });

            verifyTscCompileLike(testTscCompileLike, {
                scenario: "sample1",
                subScenario: "rebuilds completely when version in tsbuildinfo doesnt match ts version",
                fs: getSampleFsAfterBuild,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                compile: sys => {
                    // Buildinfo will have version which does not match with current ts version
                    const buildHost = createSolutionBuilderHostForBaseline(sys, "FakeTSCurrentVersion");
                    const builder = createSolutionBuilder(buildHost, ["/src/tests"], { verbose: true });
                    sys.exit(builder.build());
                }
            });

            verifyTscCompileLike(testTscCompileLike, {
                scenario: "sample1",
                subScenario: "does not rebuild if there is no program and bundle in the ts build info event if version doesnt match ts version",
                fs: () => {
                    const fs = projFs.shadow();
                    const host = fakes.SolutionBuilderHost.create(fs, /*options*/ undefined, /*setParentNodes*/ undefined, createAbstractBuilder);
                    const builder = createSolutionBuilder(host, ["/src/tests"], { verbose: true });
                    builder.build();
                    fs.makeReadonly();
                    return fs;
                },
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                compile: sys => {
                    // Buildinfo will have version which does not match with current ts version
                    const buildHost = createSolutionBuilderHostForBaseline(sys, "FakeTSCurrentVersion");
                    const builder = createSolutionBuilder(buildHost, ["/src/tests"], { verbose: true });
                    sys.exit(builder.build());
                },
            });

            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "rebuilds when extended config file changes",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                modifyFs: fs => {
                    fs.writeFileSync("/src/tests/tsconfig.base.json", JSON.stringify({ compilerOptions: { target: "es3" } }));
                    replaceText(fs, "/src/tests/tsconfig.json", `"references": [`, `"extends": "./tsconfig.base.json", "references": [`);
                },
                edits: [{
                    subScenario: "incremental-declaration-changes",
                    modifyFs: fs => fs.writeFileSync("/src/tests/tsconfig.base.json", JSON.stringify({ compilerOptions: {} }))
                }]
            });

            verifyTscCompileLike(testTscCompileLike, {
                scenario: "sample1",
                subScenario: "builds till project specified",
                fs: () => projFs,
                commandLineArgs: ["--build", "/src/logic/tsconfig.json"],
                compile: sys => {
                    const buildHost = createSolutionBuilderHostForBaseline(sys);
                    const builder = createSolutionBuilder(buildHost, ["/src/tests"], {});
                    sys.exit(builder.build("/src/logic/tsconfig.json"));
                }
            });

            verifyTscCompileLike(testTscCompileLike, {
                scenario: "sample1",
                subScenario: "building project in not build order doesnt throw error",
                fs: () => projFs,
                commandLineArgs: ["--build", "/src/logic2/tsconfig.json"],
                compile: sys => {
                    const buildHost = createSolutionBuilderHostForBaseline(sys);
                    const builder = createSolutionBuilder(buildHost, ["/src/tests"], {});
                    sys.exit(builder.build("/src/logic2/tsconfig.json"));
                }
            });

            it("building using getNextInvalidatedProject", () => {
                const coreConfig = getTsBuildProjectFile("core", "tsconfig.json");
                const coreIndex = getTsBuildProjectFile("core", "index.ts");
                const coreDecl = getTsBuildProjectFile("core", "some_decl.d.ts");
                const coreAnotherModule = getTsBuildProjectFile("core", "anotherModule.ts");
                const logicConfig = getTsBuildProjectFile("logic", "tsconfig.json");
                const logicIndex = getTsBuildProjectFile("logic", "index.ts");
                const testsConfig = getTsBuildProjectFile("tests", "tsconfig.json");
                const testsIndex = getTsBuildProjectFile("tests", "index.ts");
                const baseline: string[] = [];
                let oldSnap: ReturnType<TestFSWithWatch.TestServerHost["snap"]> | undefined;
                const system = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                    fakes.patchHostForBuildInfoReadWrite(
                        tscWatch.createWatchedSystem([
                            coreConfig, coreIndex, coreDecl, coreAnotherModule,
                            logicConfig, logicIndex,
                            testsConfig, testsIndex,
                            tscWatch.libFile
                        ])
                    )
                );

                const host = createSolutionBuilderHostForBaseline(system);
                const builder = createSolutionBuilder(host, [testsConfig.path], {});
                baseline.push("Input::");
                baselineState();
                verifyBuildNextResult(); // core
                verifyBuildNextResult(); // logic
                verifyBuildNextResult();// tests
                verifyBuildNextResult(); // All Done
                Harness.Baseline.runBaseline(`tsbuild/sample1/building-using-getNextInvalidatedProject.js`, baseline.join("\r\n"));

                function verifyBuildNextResult() {
                    const project = builder.getNextInvalidatedProject();
                    const result = project && project.done();
                    baseline.push(`Project Result:: ${JSON.stringify({ project: project?.project, result })}`);
                    baselineState();
                }

                function baselineState() {
                    system.serializeOutput(baseline);
                    system.diff(baseline, oldSnap);
                    system.writtenFiles.clear();
                    oldSnap = system.snap();
                }
            });

            verifyTscCompileLike(testTscCompileLike, {
                scenario: "sample1",
                subScenario: "building using buildReferencedProject",
                fs: () => projFs,
                commandLineArgs: ["--build", "/src/logic2/tsconfig.json"],
                compile: sys => {
                    const buildHost = createSolutionBuilderHostForBaseline(sys);
                    const builder = createSolutionBuilder(buildHost, ["/src/tests"], { verbose: true });
                    sys.exit(builder.buildReferences("/src/tests"));
                }
            });
        });

        describe("downstream-blocked compilations", () => {
            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "does not build downstream projects if upstream projects have errors",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                modifyFs: fs => replaceText(fs, "/src/logic/index.ts", "c.multiply(10, 15)", `c.muitply()`),
                edits: noChangeOnlyRuns
            });
        });

        describe("project invalidation", () => {
            it("invalidates projects correctly", () => {
                const coreConfig = getTsBuildProjectFile("core", "tsconfig.json");
                const coreIndex = getTsBuildProjectFile("core", "index.ts");
                const coreDecl = getTsBuildProjectFile("core", "some_decl.d.ts");
                const coreAnotherModule = getTsBuildProjectFile("core", "anotherModule.ts");
                const logicConfig = getTsBuildProjectFile("logic", "tsconfig.json");
                const logicIndex = getTsBuildProjectFile("logic", "index.ts");
                const testsConfig = getTsBuildProjectFile("tests", "tsconfig.json");
                const testsIndex = getTsBuildProjectFile("tests", "index.ts");
                const baseline: string[] = [];
                let oldSnap: ReturnType<TestFSWithWatch.TestServerHost["snap"]> | undefined;
                const system = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                    fakes.patchHostForBuildInfoReadWrite(
                        tscWatch.createWatchedSystem([
                            coreConfig, coreIndex, coreDecl, coreAnotherModule,
                            logicConfig, logicIndex,
                            testsConfig, testsIndex,
                            tscWatch.libFile
                        ])
                    )
                );

                const host = createSolutionBuilderHostForBaseline(system);
                const builder = createSolutionBuilder(host, [testsConfig.path], { dry: false, force: false, verbose: false });
                builder.build();
                baselineState("Build of project");

                // Update a timestamp in the middle project
                system.appendFile(logicIndex.path, "function foo() {}");

                // Because we haven't reset the build context, the builder should assume there's nothing to do right now
                const status = builder.getUpToDateStatusOfProject(logicConfig.path);
                baseline.push(`Project should still be upto date: ${UpToDateStatusType[status.type]}`);
                verifyInvalidation("non Dts change to logic");

                // Rebuild this project
                system.appendFile(logicIndex.path, `export class cNew {}`);
                verifyInvalidation("Dts change to Logic");
                Harness.Baseline.runBaseline(`tsbuild/sample1/invalidates-projects-correctly.js`, baseline.join("\r\n"));

                function verifyInvalidation(heading: string) {
                    // Rebuild this project
                    builder.invalidateProject(logicConfig.path as ResolvedConfigFilePath);
                    builder.getNextInvalidatedProject()?.done();
                    baselineState(`${heading}:: After rebuilding logicConfig`);

                    // Build downstream projects should update 'tests', but not 'core'
                    builder.getNextInvalidatedProject()?.done();
                    baselineState(`${heading}:: After building next project`);
                }

                function baselineState(heading: string) {
                    baseline.push(heading);
                    system.serializeOutput(baseline);
                    system.diff(baseline, oldSnap);
                    system.writtenFiles.clear();
                    oldSnap = system.snap();
                }
            });
        });

        const coreChanges: TestTscEdit[] = [
            {
                subScenario: "incremental-declaration-changes",
                modifyFs: fs => appendText(fs, "/src/core/index.ts", `
export class someClass { }`),
            },
            {
                subScenario: "incremental-declaration-doesnt-change",
                modifyFs: fs => appendText(fs, "/src/core/index.ts", `
class someClass2 { }`),
            },
            noChangeRun,
        ];

        describe("lists files", () => {
            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "listFiles",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--listFiles"],
                edits: coreChanges
            });
            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "listEmittedFiles",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--listEmittedFiles"],
                edits: coreChanges
            });
            verifyTscWithEdits({
                scenario: "sample1",
                subScenario: "explainFiles",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--explainFiles", "--v"],
                edits: coreChanges
            });
        });

        describe("emit output", () => {
            verifyTscWithEdits({
                subScenario: "sample",
                fs: () => projFs,
                scenario: "sample1",
                commandLineArgs: ["--b", "/src/tests", "--verbose"],
                baselineSourceMap: true,
                baselineReadFileCalls: true,
                edits: [
                    ...coreChanges,
                    {
                        subScenario: "when logic config changes declaration dir",
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

            verifyTscWithEdits({
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
                edits: [{
                    subScenario: "incremental-declaration-changes",
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", `"incremental": true,`, `"incremental": true, "declaration": true,`),
                }],
            });

            verifyTscWithEdits({
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
                edits: [{
                    subScenario: "incremental-declaration-changes",
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", "esnext", "es5"),
                }],
            });

            verifyTscWithEdits({
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
                edits: [{
                    subScenario: "incremental-declaration-changes",
                    modifyFs: fs => replaceText(fs, "/src/core/tsconfig.json", `"module": "commonjs"`, `"module": "amd"`),
                }],
            });

            verifyTscWithEdits({
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
                edits: [{
                    subScenario: "incremental-declaration-changes",
                    modifyFs: fs => replaceText(fs, "/src/tests/tsconfig.json", `"esModuleInterop": false`, `"esModuleInterop": true`),
                }],
            });

            verifyTsc({
                scenario: "sample1",
                subScenario: "reports error if input file is missing",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--v"],
                modifyFs: fs => {
                    fs.writeFileSync("/src/core/tsconfig.json", JSON.stringify({
                        compilerOptions: { composite: true },
                        files: ["anotherModule.ts", "index.ts", "some_decl.d.ts"]
                    }));
                    fs.unlinkSync("/src/core/anotherModule.ts");
                }
            });

            verifyTsc({
                scenario: "sample1",
                subScenario: "reports error if input file is missing with force",
                fs: () => projFs,
                commandLineArgs: ["--b", "/src/tests", "--v", "--f"],
                modifyFs: fs => {
                    fs.writeFileSync("/src/core/tsconfig.json", JSON.stringify({
                        compilerOptions: { composite: true },
                        files: ["anotherModule.ts", "index.ts", "some_decl.d.ts"]
                    }));
                    fs.unlinkSync("/src/core/anotherModule.ts");
                }
            });
        });
    });
}
