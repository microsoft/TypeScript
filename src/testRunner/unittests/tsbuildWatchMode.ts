namespace ts.tscWatch {
    export import libFile = TestFSWithWatch.libFile;
    function createSolutionBuilder(system: WatchedSystem, rootNames: ReadonlyArray<string>, defaultOptions?: BuildOptions) {
        const host = createSolutionBuilderWithWatchHost(system);
        return ts.createSolutionBuilder(host, rootNames, defaultOptions || { watch: true });
    }

    function createSolutionBuilderWithWatch(host: WatchedSystem, rootNames: ReadonlyArray<string>, defaultOptions?: BuildOptions) {
        const solutionBuilder = createSolutionBuilder(host, rootNames, defaultOptions);
        solutionBuilder.buildAllProjects();
        solutionBuilder.startWatching();
        return solutionBuilder;
    }

    describe("tsbuild-watch program updates", () => {
        const projectsLocation = "/user/username/projects";
        const project = "sample1";
        const enum SubProject {
            core = "core",
            logic = "logic",
            tests = "tests",
            ui = "ui"
        }
        type ReadonlyFile = Readonly<File>;
        /** [tsconfig, index] | [tsconfig, index, anotherModule, someDecl] */
        type SubProjectFiles = [ReadonlyFile, ReadonlyFile] | [ReadonlyFile, ReadonlyFile, ReadonlyFile, ReadonlyFile];
        const root = Harness.IO.getWorkspaceRoot();

        function getProjectPath(project: string) {
            return `${projectsLocation}/${project}`;
        }

        function getFilePathInProject(project: string, file: string) {
            return `${projectsLocation}/${project}/${file}`;
        }

        function getFileFromProject(project: string, file: string): File {
            return {
                path: getFilePathInProject(project, file),
                content: Harness.IO.readFile(`${root}/tests/projects/${project}/${file}`)!
            };
        }

        function projectPath(subProject: SubProject) {
            return getFilePathInProject(project, subProject);
        }

        function projectFilePath(subProject: SubProject, baseFileName: string) {
            return `${projectPath(subProject)}/${baseFileName.toLowerCase()}`;
        }

        function projectFileName(subProject: SubProject, baseFileName: string) {
            return `${projectPath(subProject)}/${baseFileName}`;
        }

        function projectFile(subProject: SubProject, baseFileName: string): File {
            return getFileFromProject(project, `${subProject}/${baseFileName}`);
        }

        function subProjectFiles(subProject: SubProject, anotherModuleAndSomeDecl?: true): SubProjectFiles {
            const tsconfig = projectFile(subProject, "tsconfig.json");
            const index = projectFile(subProject, "index.ts");
            if (!anotherModuleAndSomeDecl) {
                return [tsconfig, index];
            }
            const anotherModule = projectFile(SubProject.core, "anotherModule.ts");
            const someDecl = projectFile(SubProject.core, "some_decl.ts");
            return [tsconfig, index, anotherModule, someDecl];
        }

        function getOutputFileNames(subProject: SubProject, baseFileNameWithoutExtension: string) {
            const file = projectFilePath(subProject, baseFileNameWithoutExtension);
            return [`${file}.js`, `${file}.d.ts`];
        }

        type OutputFileStamp = [string, Date | undefined];
        function getOutputStamps(host: WatchedSystem, subProject: SubProject, baseFileNameWithoutExtension: string): OutputFileStamp[] {
            return getOutputFileNames(subProject, baseFileNameWithoutExtension).map(f => [f, host.getModifiedTime(f)] as OutputFileStamp);
        }

        function getOutputFileStamps(host: WatchedSystem, additionalFiles?: ReadonlyArray<[SubProject, string]>): OutputFileStamp[] {
            const result = [
                ...getOutputStamps(host, SubProject.core, "anotherModule"),
                ...getOutputStamps(host, SubProject.core, "index"),
                ...getOutputStamps(host, SubProject.logic, "index"),
                ...getOutputStamps(host, SubProject.tests, "index"),
            ];
            if (additionalFiles) {
                additionalFiles.forEach(([subProject, baseFileNameWithoutExtension]) => result.push(...getOutputStamps(host, subProject, baseFileNameWithoutExtension)));
            }
            return result;
        }

        function verifyChangedFiles(actualStamps: OutputFileStamp[], oldTimeStamps: OutputFileStamp[], changedFiles: string[]) {
            for (let i = 0; i < oldTimeStamps.length; i++) {
                const actual = actualStamps[i];
                const old = oldTimeStamps[i];
                if (contains(changedFiles, actual[0])) {
                    assert.isTrue((actual[1] || 0) > (old[1] || 0), `${actual[0]} expected to written`);
                }
                else {
                    assert.equal(actual[1], old[1], `${actual[0]} expected to not change`);
                }
            }
        }

        const core = subProjectFiles(SubProject.core, /*anotherModuleAndSomeDecl*/ true);
        const logic = subProjectFiles(SubProject.logic);
        const tests = subProjectFiles(SubProject.tests);
        const ui = subProjectFiles(SubProject.ui);
        const allFiles: ReadonlyArray<File> = [libFile, ...core, ...logic, ...tests, ...ui];
        const testProjectExpectedWatchedFiles = [core[0], core[1], core[2], ...logic, ...tests].map(f => f.path.toLowerCase());
        const testProjectExpectedWatchedDirectoriesRecursive = [projectPath(SubProject.core), projectPath(SubProject.logic)];

        function createSolutionInWatchMode(allFiles: ReadonlyArray<File>, defaultOptions?: BuildOptions, disableConsoleClears?: boolean) {
            const host = createWatchedSystem(allFiles, { currentDirectory: projectsLocation });
            createSolutionBuilderWithWatch(host, [`${project}/${SubProject.tests}`], defaultOptions);
            verifyWatches(host);
            checkOutputErrorsInitial(host, emptyArray, disableConsoleClears);
            const outputFileStamps = getOutputFileStamps(host);
            for (const stamp of outputFileStamps) {
                assert.isDefined(stamp[1], `${stamp[0]} expected to be present`);
            }
            return host;
        }

        function verifyWatches(host: WatchedSystem) {
            checkWatchedFiles(host, testProjectExpectedWatchedFiles);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(host, testProjectExpectedWatchedDirectoriesRecursive, /*recursive*/ true);
        }

        it("creates solution in watch mode", () => {
            createSolutionInWatchMode(allFiles);
        });

        describe("validates the changes and watched files", () => {
            const newFileWithoutExtension = "newFile";
            const newFile: File = {
                path: projectFilePath(SubProject.core, `${newFileWithoutExtension}.ts`),
                content: `export const newFileConst = 30;`
            };

            function verifyProjectChanges(allFiles: ReadonlyArray<File>) {
                function createSolutionInWatchModeToVerifyChanges(additionalFiles?: ReadonlyArray<[SubProject, string]>) {
                    const host = createSolutionInWatchMode(allFiles);
                    return { host, verifyChangeWithFile, verifyChangeAfterTimeout, verifyWatches };

                    function verifyChangeWithFile(fileName: string, content: string) {
                        const outputFileStamps = getOutputFileStamps(host, additionalFiles);
                        host.writeFile(fileName, content);
                        verifyChangeAfterTimeout(outputFileStamps);
                    }

                    function verifyChangeAfterTimeout(outputFileStamps: OutputFileStamp[]) {
                        host.checkTimeoutQueueLengthAndRun(1); // Builds core
                        const changedCore = getOutputFileStamps(host, additionalFiles);
                        verifyChangedFiles(changedCore, outputFileStamps, [
                            ...getOutputFileNames(SubProject.core, "anotherModule"), // This should not be written really
                            ...getOutputFileNames(SubProject.core, "index"),
                            ...(additionalFiles ? getOutputFileNames(SubProject.core, newFileWithoutExtension) : emptyArray)
                        ]);
                        host.checkTimeoutQueueLengthAndRun(1); // Builds logic
                        const changedLogic = getOutputFileStamps(host, additionalFiles);
                        verifyChangedFiles(changedLogic, changedCore, [
                            ...getOutputFileNames(SubProject.logic, "index") // Again these need not be written
                        ]);
                        host.checkTimeoutQueueLengthAndRun(1); // Builds tests
                        const changedTests = getOutputFileStamps(host, additionalFiles);
                        verifyChangedFiles(changedTests, changedLogic, [
                            ...getOutputFileNames(SubProject.tests, "index") // Again these need not be written
                        ]);
                        host.checkTimeoutQueueLength(0);
                        checkOutputErrorsIncremental(host, emptyArray);
                        verifyWatches();
                    }

                    function verifyWatches() {
                        checkWatchedFiles(host, additionalFiles ? testProjectExpectedWatchedFiles.concat(newFile.path) : testProjectExpectedWatchedFiles);
                        checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                        checkWatchedDirectories(host, testProjectExpectedWatchedDirectoriesRecursive, /*recursive*/ true);
                    }
                }

                it("change builds changes and reports found errors message", () => {
                    const { host, verifyChangeWithFile, verifyChangeAfterTimeout } = createSolutionInWatchModeToVerifyChanges();
                    verifyChange(`${core[1].content}
export class someClass { }`);

                    // Another change requeues and builds it
                    verifyChange(core[1].content);

                    // Two changes together report only single time message: File change detected. Starting incremental compilation...
                    const outputFileStamps = getOutputFileStamps(host);
                    const change1 = `${core[1].content}
export class someClass { }`;
                    host.writeFile(core[1].path, change1);
                    host.writeFile(core[1].path, `${change1}
export class someClass2 { }`);
                    verifyChangeAfterTimeout(outputFileStamps);

                    function verifyChange(coreContent: string) {
                        verifyChangeWithFile(core[1].path, coreContent);
                    }
                });

                it("non local change does not start build of referencing projects", () => {
                    const host = createSolutionInWatchMode(allFiles);
                    const outputFileStamps = getOutputFileStamps(host);
                    host.writeFile(core[1].path, `${core[1].content}
function foo() { }`);
                    host.checkTimeoutQueueLengthAndRun(1); // Builds core
                    const changedCore = getOutputFileStamps(host);
                    verifyChangedFiles(changedCore, outputFileStamps, [
                        ...getOutputFileNames(SubProject.core, "anotherModule"), // This should not be written really
                        ...getOutputFileNames(SubProject.core, "index"),
                    ]);
                    host.checkTimeoutQueueLength(0);
                    checkOutputErrorsIncremental(host, emptyArray);
                    verifyWatches(host);
                });

                it("builds when new file is added, and its subsequent updates", () => {
                    const additinalFiles: ReadonlyArray<[SubProject, string]> = [[SubProject.core, newFileWithoutExtension]];
                    const { verifyChangeWithFile } = createSolutionInWatchModeToVerifyChanges(additinalFiles);
                    verifyChange(newFile.content);

                    // Another change requeues and builds it
                    verifyChange(`${newFile.content}
export class someClass2 { }`);

                    function verifyChange(newFileContent: string) {
                        verifyChangeWithFile(newFile.path, newFileContent);
                    }
                });
            }

            describe("with simple project reference graph", () => {
                verifyProjectChanges(allFiles);
            });

            describe("with circular project reference", () => {
                const [coreTsconfig, ...otherCoreFiles] = core;
                const circularCoreConfig: File = {
                    path: coreTsconfig.path,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, declaration: true },
                        references: [{ path: "../tests", circular: true }]
                    })
                };
                verifyProjectChanges([libFile, circularCoreConfig, ...otherCoreFiles, ...logic, ...tests]);
            });
        });

        it("watches config files that are not present", () => {
            const allFiles = [libFile, ...core, logic[1], ...tests];
            const host = createWatchedSystem(allFiles, { currentDirectory: projectsLocation });
            createSolutionBuilderWithWatch(host, [`${project}/${SubProject.tests}`]);
            checkWatchedFiles(host, [core[0], core[1], core[2], logic[0], ...tests].map(f => f.path.toLowerCase()));
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(host, [projectPath(SubProject.core)], /*recursive*/ true);
            checkOutputErrorsInitial(host, [
                createCompilerDiagnostic(Diagnostics.File_0_not_found, logic[0].path)
            ]);
            for (const f of [
                ...getOutputFileNames(SubProject.core, "anotherModule"),
                ...getOutputFileNames(SubProject.core, "index")
            ]) {
                assert.isTrue(host.fileExists(f), `${f} expected to be present`);
            }
            for (const f of [
                ...getOutputFileNames(SubProject.logic, "index"),
                ...getOutputFileNames(SubProject.tests, "index")
            ]) {
                assert.isFalse(host.fileExists(f), `${f} expected to be absent`);
            }

            // Create tsconfig file for logic and see that build succeeds
            const initial = getOutputFileStamps(host);
            host.writeFile(logic[0].path, logic[0].content);
            host.checkTimeoutQueueLengthAndRun(1); // Builds logic
            const changedLogic = getOutputFileStamps(host);
            verifyChangedFiles(changedLogic, initial, [
                ...getOutputFileNames(SubProject.logic, "index")
            ]);
            host.checkTimeoutQueueLengthAndRun(1); // Builds tests
            const changedTests = getOutputFileStamps(host);
            verifyChangedFiles(changedTests, changedLogic, [
                ...getOutputFileNames(SubProject.tests, "index")
            ]);
            host.checkTimeoutQueueLength(0);
            checkOutputErrorsIncremental(host, emptyArray);
            verifyWatches(host);
        });

        it("when referenced using prepend, builds referencing project even for non local change", () => {
            const coreTsConfig: File = {
                path: core[0].path,
                content: JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, outFile: "index.js" }
                })
            };
            const coreIndex: File = {
                path: core[1].path,
                content: `function foo() { return 10; }`
            };
            const logicTsConfig: File = {
                path: logic[0].path,
                content: JSON.stringify({
                    compilerOptions: { composite: true, declaration: true, outFile: "index.js" },
                    references: [{ path: "../core", prepend: true }]
                })
            };
            const logicIndex: File = {
                path: logic[1].path,
                content: `function bar() { return foo() + 1 };`
            };

            const projectFiles = [coreTsConfig, coreIndex, logicTsConfig, logicIndex];
            const host = createWatchedSystem([libFile, ...projectFiles], { currentDirectory: projectsLocation });
            createSolutionBuilderWithWatch(host, [`${project}/${SubProject.logic}`]);
            verifyWatches();
            checkOutputErrorsInitial(host, emptyArray);
            const outputFileStamps = getOutputFileStamps();
            for (const stamp of outputFileStamps) {
                assert.isDefined(stamp[1], `${stamp[0]} expected to be present`);
            }

            // Make non local change
            verifyChangeInCore(`${coreIndex.content}
function myFunc() { return 10; }`);

            // Make local change to function bar
            verifyChangeInCore(`${coreIndex.content}
function myFunc() { return 100; }`);

            function verifyChangeInCore(content: string) {
                const outputFileStamps = getOutputFileStamps();
                host.writeFile(coreIndex.path, content);

                host.checkTimeoutQueueLengthAndRun(1); // Builds core
                const changedCore = getOutputFileStamps();
                verifyChangedFiles(changedCore, outputFileStamps, [
                    ...getOutputFileNames(SubProject.core, "index")
                ]);
                host.checkTimeoutQueueLengthAndRun(1); // Builds logic
                const changedLogic = getOutputFileStamps();
                verifyChangedFiles(changedLogic, changedCore, [
                    ...getOutputFileNames(SubProject.logic, "index")
                ]);
                host.checkTimeoutQueueLength(0);
                checkOutputErrorsIncremental(host, emptyArray);
                verifyWatches();
            }

            function getOutputFileStamps(): OutputFileStamp[] {
                const result = [
                    ...getOutputStamps(host, SubProject.core, "index"),
                    ...getOutputStamps(host, SubProject.logic, "index"),
                ];
                return result;
            }

            function verifyWatches() {
                checkWatchedFiles(host, projectFiles.map(f => f.path));
                checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                checkWatchedDirectories(host, testProjectExpectedWatchedDirectoriesRecursive, /*recursive*/ true);
            }
        });

        describe("reports errors in all projects on incremental compile", () => {
            function verifyIncrementalErrors(defaultBuildOptions?: BuildOptions, disabledConsoleClear?: boolean) {
                const host = createSolutionInWatchMode(allFiles, defaultBuildOptions, disabledConsoleClear);
                const outputFileStamps = getOutputFileStamps(host);

                host.writeFile(logic[1].path, `${logic[1].content}
let y: string = 10;`);

                host.checkTimeoutQueueLengthAndRun(1); // Builds logic
                const changedLogic = getOutputFileStamps(host);
                verifyChangedFiles(changedLogic, outputFileStamps, emptyArray);
                host.checkTimeoutQueueLength(0);
                checkOutputErrorsIncremental(host, [
                    `sample1/logic/index.ts(8,5): error TS2322: Type '10' is not assignable to type 'string'.\n`
                ], disabledConsoleClear);

                host.writeFile(core[1].path, `${core[1].content}
let x: string = 10;`);

                host.checkTimeoutQueueLengthAndRun(1); // Builds core
                const changedCore = getOutputFileStamps(host);
                verifyChangedFiles(changedCore, changedLogic, emptyArray);
                host.checkTimeoutQueueLength(0);
                checkOutputErrorsIncremental(host, [
                    `sample1/core/index.ts(5,5): error TS2322: Type '10' is not assignable to type 'string'.\n`,
                    `sample1/logic/index.ts(8,5): error TS2322: Type '10' is not assignable to type 'string'.\n`
                ], disabledConsoleClear);
            }

            it("when preserveWatchOutput is not used", () => {
                verifyIncrementalErrors();
            });

            it("when preserveWatchOutput is passed on command line", () => {
                verifyIncrementalErrors({ preserveWatchOutput: true, watch: true }, /*disabledConsoleClear*/ true);
            });
        });

        describe("tsc-watch works with project references", () => {
            describe("invoking when references are already built", () => {
                function verifyWatchesOfProject(host: WatchedSystem, expectedWatchedFiles: ReadonlyArray<string>, expectedWatchedDirectoriesRecursive: ReadonlyArray<string>) {
                    checkWatchedFilesDetailed(host, expectedWatchedFiles, 1);
                    checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
                    checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesRecursive, 1, /*recursive*/ true);
                }

                function createSolutionAndWatchModeOfProject(
                    allFiles: ReadonlyArray<File>,
                    currentDirectory: string,
                    solutionBuilderconfig: string,
                    watchConfig: string,
                    getOutputFileStamps: (host: WatchedSystem) => ReadonlyArray<OutputFileStamp>) {
                    // Build the composite project
                    const host = createWatchedSystem(allFiles, { currentDirectory });
                    const solutionBuilder = createSolutionBuilder(host, [solutionBuilderconfig], {});
                    solutionBuilder.buildAllProjects();
                    const outputFileStamps = getOutputFileStamps(host);
                    for (const stamp of outputFileStamps) {
                        assert.isDefined(stamp[1], `${stamp[0]} expected to be present`);
                    }

                    // Build in watch mode
                    const watch = createWatchOfConfigFileReturningBuilder(watchConfig, host);
                    checkOutputErrorsInitial(host, emptyArray);

                    return { host, solutionBuilder, watch };
                }

                function verifyDependencies(watch: () => BuilderProgram, filePath: string, expected: ReadonlyArray<string>) {
                    checkArray(`${filePath} dependencies`, watch().getAllDependencies(watch().getSourceFile(filePath)!), expected);
                }

                describe("on sample project", () => {
                    const coreIndexDts = projectFileName(SubProject.core, "index.d.ts");
                    const coreAnotherModuleDts = projectFileName(SubProject.core, "anotherModule.d.ts");
                    const logicIndexDts = projectFileName(SubProject.logic, "index.d.ts");
                    const expectedWatchedFiles = [core[0], logic[0], ...tests, libFile].map(f => f.path).concat([coreIndexDts, coreAnotherModuleDts, logicIndexDts].map(f => f.toLowerCase()));
                    const expectedWatchedDirectoriesRecursive = projectSystem.getTypeRootsFromLocation(projectPath(SubProject.tests));

                    function createSolutionAndWatchMode() {
                        return createSolutionAndWatchModeOfProject(allFiles, projectsLocation, `${project}/${SubProject.tests}`, tests[0].path, getOutputFileStamps);
                    }

                    function verifyWatches(host: WatchedSystem) {
                        verifyWatchesOfProject(host, expectedWatchedFiles, expectedWatchedDirectoriesRecursive);
                    }

                    it("verifies dependencies and watches", () => {
                        const { host, watch } = createSolutionAndWatchMode();

                        verifyWatches(host);
                        verifyDependencies(watch, coreIndexDts, [coreIndexDts]);
                        verifyDependencies(watch, coreAnotherModuleDts, [coreAnotherModuleDts]);
                        verifyDependencies(watch, logicIndexDts, [logicIndexDts, coreAnotherModuleDts]);
                        verifyDependencies(watch, tests[1].path, [tests[1].path, coreAnotherModuleDts, logicIndexDts, coreAnotherModuleDts]);
                    });

                    it("local edit in ts file, result in watch compilation because logic.d.ts is written", () => {
                        const { host, solutionBuilder, watch } = createSolutionAndWatchMode();
                        host.writeFile(logic[1].path, `${logic[1].content}
function foo() {
}`);
                        solutionBuilder.invalidateProject(`${project}/${SubProject.logic}`);
                        solutionBuilder.buildInvalidatedProject();

                        host.checkTimeoutQueueLengthAndRun(1); // not ideal, but currently because of d.ts but no new file is written
                        checkOutputErrorsIncremental(host, emptyArray);
                        checkProgramActualFiles(watch().getProgram(), [tests[1].path, libFile.path, coreIndexDts, coreAnotherModuleDts, logicIndexDts]);
                    });

                    it("non local edit in ts file, rebuilds in watch compilation", () => {
                        const { host, solutionBuilder, watch } = createSolutionAndWatchMode();
                        host.writeFile(logic[1].path, `${logic[1].content}
export function gfoo() {
}`);
                        solutionBuilder.invalidateProject(logic[0].path);
                        solutionBuilder.buildInvalidatedProject();

                        host.checkTimeoutQueueLengthAndRun(1);
                        checkOutputErrorsIncremental(host, emptyArray);
                        checkProgramActualFiles(watch().getProgram(), [tests[1].path, libFile.path, coreIndexDts, coreAnotherModuleDts, logicIndexDts]);
                    });

                    it("change in project reference config file builds correctly", () => {
                        const { host, solutionBuilder, watch } = createSolutionAndWatchMode();
                        host.writeFile(logic[0].path, JSON.stringify({
                            compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
                            references: [{ path: "../core" }]
                        }));
                        solutionBuilder.invalidateProject(logic[0].path, ConfigFileProgramReloadLevel.Full);
                        solutionBuilder.buildInvalidatedProject();

                        host.checkTimeoutQueueLengthAndRun(1);
                        checkOutputErrorsIncremental(host, emptyArray);
                        checkProgramActualFiles(watch().getProgram(), [tests[1].path, libFile.path, coreIndexDts, coreAnotherModuleDts, projectFilePath(SubProject.logic, "decls/index.d.ts")]);
                    });
                });

                describe("on transitive references", () => {
                    const project = "transitiveReferences";
                    const aTs = getFileFromProject(project, "a.ts");
                    const bTs = getFileFromProject(project, "b.ts");
                    const cTs = getFileFromProject(project, "c.ts");

                    const configToBuild = "tsconfig.c.json";
                    const aTsconfig = getFileFromProject(project, "tsconfig.a.json");
                    const bTsconfig = getFileFromProject(project, "tsconfig.b.json");
                    const cTsconfig = getFileFromProject(project, configToBuild);
                    const refs = getFileFromProject(project, "refs/a.d.ts");
                    const allFiles = [libFile, aTs, bTs, cTs, aTsconfig, bTsconfig, cTsconfig, refs];
                    const aDts = dtsFile("a"), bDts = dtsFile("b");
                    const expectedFiles = [jsFile("a"), aDts, jsFile("b"), bDts, jsFile("c")];
                    const expectedProgramFiles = [cTs.path, libFile.path, aDts, refs.path, bDts];
                    const expectedWatchedFiles = expectedProgramFiles.concat(cTsconfig.path, bTsconfig.path, aTsconfig.path).map(s => s.toLowerCase());
                    const expectedWatchedDirectoriesRecursive = [
                        getFilePathInProject(project, "refs").toLowerCase(), // Failed lookup since refs/a.ts does not exist
                        ...projectSystem.getTypeRootsFromLocation(getProjectPath(project).toLowerCase())];

                    function jsFile(extensionLessFile: string) {
                        return getFilePathInProject(project, `${extensionLessFile}.js`);
                    }

                    function dtsFile(extensionLessFile: string) {
                        return getFilePathInProject(project, `${extensionLessFile}.d.ts`);
                    }

                    function createSolutionAndWatchMode() {
                        return createSolutionAndWatchModeOfProject(allFiles, getProjectPath(project), configToBuild, configToBuild, getOutputFileStamps);
                    }

                    function getOutputFileStamps(host: WatchedSystem) {
                        return expectedFiles.map(file => [file, host.getModifiedTime(file)] as OutputFileStamp);
                    }

                    function verifyWatches(host: WatchedSystem) {
                        verifyWatchesOfProject(host, expectedWatchedFiles, expectedWatchedDirectoriesRecursive);
                    }

                    function verifyProgram(host: WatchedSystem, watch: () => BuilderProgram) {
                        verifyWatches(host);

                        verifyDependencies(watch, aDts, [aDts]);
                        verifyDependencies(watch, refs.path, [refs.path]);
                        verifyDependencies(watch, bDts, [bDts, aDts]);
                        verifyDependencies(watch, cTs.path, [cTs.path, refs.path, bDts]);

                        checkProgramActualFiles(watch().getProgram(), expectedProgramFiles);
                    }

                    it("verifies dependencies and watches", () => {
                        // Initial build
                        const { host, watch } = createSolutionAndWatchMode();
                        verifyProgram(host, watch);
                    });

                    it("non local edit updates the program and watch correctly", () => {
                        const { host, watch, solutionBuilder } = createSolutionAndWatchMode();

                        // edit
                        host.writeFile(bTs.path, `${bTs.content}
export function gfoo() {
}`);
                        solutionBuilder.invalidateProject(bTsconfig.path);
                        solutionBuilder.buildInvalidatedProject();

                        host.checkTimeoutQueueLengthAndRun(1);
                        checkOutputErrorsIncremental(host, emptyArray);
                        verifyProgram(host, watch);
                    });
                });
            });
        });
    });
}
