namespace ts.tscWatch {
    export import libFile = TestFSWithWatch.libFile;
    import projectsLocation = TestFSWithWatch.tsbuildProjectsLocation;
    import getFilePathInProject = TestFSWithWatch.getTsBuildProjectFilePath;
    import getFileFromProject = TestFSWithWatch.getTsBuildProjectFile;
    export function createSolutionBuilder(system: WatchedSystem, rootNames: ReadonlyArray<string>, defaultOptions?: BuildOptions) {
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
        function getProjectPath(project: string) {
            return `${projectsLocation}/${project}`;
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
        const testProjectExpectedWatchedFiles = [core[0], core[1], core[2]!, ...logic, ...tests].map(f => f.path.toLowerCase()); // tslint:disable-line no-unnecessary-type-assertion (TODO: type assertion should be necessary)
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
            checkWatchedFiles(host, [core[0], core[1], core[2]!, logic[0], ...tests].map(f => f.path.toLowerCase())); // tslint:disable-line no-unnecessary-type-assertion (TODO: type assertion should be necessary)
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

        it("when referenced project change introduces error in the down stream project and then fixes it", () => {
            const subProjectLibrary = `${projectsLocation}/${project}/Library`;
            const libraryTs: File = {
                path: `${subProjectLibrary}/library.ts`,
                content: `
interface SomeObject
{
	message: string;
}

export function createSomeObject(): SomeObject
{
	return {
		message: "new Object"
	};
}`
            };
            const libraryTsconfig: File = {
                path: `${subProjectLibrary}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true } })
            };
            const subProjectApp = `${projectsLocation}/${project}/App`;
            const appTs: File = {
                path: `${subProjectApp}/app.ts`,
                content: `import { createSomeObject } from "../Library/library";
createSomeObject().message;`
            };
            const appTsconfig: File = {
                path: `${subProjectApp}/tsconfig.json`,
                content: JSON.stringify({ references: [{ path: "../Library" }] })
            };

            const files = [libFile, libraryTs, libraryTsconfig, appTs, appTsconfig];
            const host = createWatchedSystem(files, { currentDirectory: `${projectsLocation}/${project}` });
            createSolutionBuilderWithWatch(host, ["App"]);
            checkOutputErrorsInitial(host, emptyArray);

            // Change message in library to message2
            host.writeFile(libraryTs.path, libraryTs.content.replace(/message/g, "message2"));
            host.checkTimeoutQueueLengthAndRun(1); // Build library
            host.checkTimeoutQueueLengthAndRun(1); // Build App
            checkOutputErrorsIncremental(host, [
                "App/app.ts(2,20): error TS2551: Property 'message' does not exist on type 'SomeObject'. Did you mean 'message2'?\n"
            ]);

            // Revert library changes
            host.writeFile(libraryTs.path, libraryTs.content);
            host.checkTimeoutQueueLengthAndRun(1); // Build library
            host.checkTimeoutQueueLengthAndRun(1); // Build App
            checkOutputErrorsIncremental(host, emptyArray);
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

        describe("tsc-watch and tsserver works with project references", () => {
            describe("invoking when references are already built", () => {
                function verifyWatchesOfProject(host: WatchedSystem, expectedWatchedFiles: ReadonlyArray<string>, expectedWatchedDirectoriesRecursive: ReadonlyArray<string>, expectedWatchedDirectories?: ReadonlyArray<string>) {
                    checkWatchedFilesDetailed(host, expectedWatchedFiles, 1);
                    checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories || emptyArray, 1, /*recursive*/ false);
                    checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesRecursive, 1, /*recursive*/ true);
                }

                function createSolutionOfProject(allFiles: ReadonlyArray<File>,
                    currentDirectory: string,
                    solutionBuilderconfig: string,
                    getOutputFileStamps: (host: WatchedSystem) => ReadonlyArray<OutputFileStamp>) {
                    // Build the composite project
                    const host = createWatchedSystem(allFiles, { currentDirectory });
                    const solutionBuilder = createSolutionBuilder(host, [solutionBuilderconfig], {});
                    solutionBuilder.buildAllProjects();
                    const outputFileStamps = getOutputFileStamps(host);
                    for (const stamp of outputFileStamps) {
                        assert.isDefined(stamp[1], `${stamp[0]} expected to be present`);
                    }
                    return { host, solutionBuilder };
                }

                function createSolutionAndWatchModeOfProject(
                    allFiles: ReadonlyArray<File>,
                    currentDirectory: string,
                    solutionBuilderconfig: string,
                    watchConfig: string,
                    getOutputFileStamps: (host: WatchedSystem) => ReadonlyArray<OutputFileStamp>) {
                    // Build the composite project
                    const { host, solutionBuilder } = createSolutionOfProject(allFiles, currentDirectory, solutionBuilderconfig, getOutputFileStamps);

                    // Build in watch mode
                    const watch = createWatchOfConfigFileReturningBuilder(watchConfig, host);
                    checkOutputErrorsInitial(host, emptyArray);

                    return { host, solutionBuilder, watch };
                }

                function createSolutionAndServiceOfProject(allFiles: ReadonlyArray<File>,
                    currentDirectory: string,
                    solutionBuilderconfig: string,
                    openFileName: string,
                    getOutputFileStamps: (host: WatchedSystem) => ReadonlyArray<OutputFileStamp>) {
                    // Build the composite project
                    const { host, solutionBuilder } = createSolutionOfProject(allFiles, currentDirectory, solutionBuilderconfig, getOutputFileStamps);

                    // service
                    const service = projectSystem.createProjectService(host);
                    service.openClientFile(openFileName);

                    return { host, solutionBuilder, service };
                }

                function checkProjectActualFiles(service: projectSystem.TestProjectService, configFile: string, expectedFiles: ReadonlyArray<string>) {
                    projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
                    projectSystem.checkProjectActualFiles(service.configuredProjects.get(configFile.toLowerCase())!, expectedFiles);
                }

                type Watch = () => BuilderProgram;

                function verifyDependencies(watch: Watch, filePath: string, expected: ReadonlyArray<string>) {
                    checkArray(`${filePath} dependencies`, watch().getAllDependencies(watch().getSourceFile(filePath)!), expected);
                }

                describe("on sample project", () => {
                    const coreIndexDts = projectFileName(SubProject.core, "index.d.ts");
                    const coreAnotherModuleDts = projectFileName(SubProject.core, "anotherModule.d.ts");
                    const logicIndexDts = projectFileName(SubProject.logic, "index.d.ts");
                    const expectedWatchedFiles = [core[0], logic[0], ...tests, libFile].map(f => f.path).concat([coreIndexDts, coreAnotherModuleDts, logicIndexDts].map(f => f.toLowerCase()));
                    const expectedWatchedDirectoriesRecursive = projectSystem.getTypeRootsFromLocation(projectPath(SubProject.tests));
                    const expectedProgramFiles = [tests[1].path, libFile.path, coreIndexDts, coreAnotherModuleDts, logicIndexDts];

                    function createSolutionAndWatchMode() {
                        return createSolutionAndWatchModeOfProject(allFiles, projectsLocation, `${project}/${SubProject.tests}`, tests[0].path, getOutputFileStamps);
                    }

                    function createSolutionAndService() {
                        return createSolutionAndServiceOfProject(allFiles, projectsLocation, `${project}/${SubProject.tests}`, tests[1].path, getOutputFileStamps);
                    }

                    function verifyWatches(host: WatchedSystem, withTsserver?: boolean) {
                        verifyWatchesOfProject(host, withTsserver ? expectedWatchedFiles.filter(f => f !== tests[1].path.toLowerCase()) : expectedWatchedFiles, expectedWatchedDirectoriesRecursive);
                    }

                    function verifyScenario(
                        edit: (host: WatchedSystem, solutionBuilder: SolutionBuilder) => void,
                        expectedFilesAfterEdit: ReadonlyArray<string>
                    ) {
                        it("with tsc-watch", () => {
                            const { host, solutionBuilder, watch } = createSolutionAndWatchMode();

                            edit(host, solutionBuilder);

                            host.checkTimeoutQueueLengthAndRun(1);
                            checkOutputErrorsIncremental(host, emptyArray);
                            checkProgramActualFiles(watch().getProgram(), expectedFilesAfterEdit);

                        });

                        it("with tsserver", () => {
                            const { host, solutionBuilder, service } = createSolutionAndService();

                            edit(host, solutionBuilder);

                            host.checkTimeoutQueueLengthAndRun(2);
                            checkProjectActualFiles(service, tests[0].path, [tests[0].path, ...expectedFilesAfterEdit]);
                        });
                    }

                    describe("verifies dependencies and watches", () => {
                        it("with tsc-watch", () => {
                            const { host, watch } = createSolutionAndWatchMode();
                            verifyWatches(host);
                            verifyDependencies(watch, coreIndexDts, [coreIndexDts]);
                            verifyDependencies(watch, coreAnotherModuleDts, [coreAnotherModuleDts]);
                            verifyDependencies(watch, logicIndexDts, [logicIndexDts, coreAnotherModuleDts]);
                            verifyDependencies(watch, tests[1].path, expectedProgramFiles.filter(f => f !== libFile.path));
                        });

                        it("with tsserver", () => {
                            const { host } = createSolutionAndService();
                            verifyWatches(host, /*withTsserver*/ true);
                        });
                    });

                    describe("local edit in ts file, result in watch compilation because logic.d.ts is written", () => {
                        verifyScenario((host, solutionBuilder) => {
                            host.writeFile(logic[1].path, `${logic[1].content}
function foo() {
}`);
                            solutionBuilder.invalidateProject(`${project}/${SubProject.logic}`);
                            solutionBuilder.buildInvalidatedProject();

                            // not ideal, but currently because of d.ts but no new file is written
                            // There will be timeout queued even though file contents are same
                        }, expectedProgramFiles);
                    });

                    describe("non local edit in ts file, rebuilds in watch compilation", () => {
                        verifyScenario((host, solutionBuilder) => {
                            host.writeFile(logic[1].path, `${logic[1].content}
export function gfoo() {
}`);
                            solutionBuilder.invalidateProject(logic[0].path);
                            solutionBuilder.buildInvalidatedProject();
                        }, expectedProgramFiles);
                    });

                    describe("change in project reference config file builds correctly", () => {
                        verifyScenario((host, solutionBuilder) => {
                            host.writeFile(logic[0].path, JSON.stringify({
                                compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
                                references: [{ path: "../core" }]
                            }));
                            solutionBuilder.invalidateProject(logic[0].path, ConfigFileProgramReloadLevel.Full);
                            solutionBuilder.buildInvalidatedProject();
                        }, [tests[1].path, libFile.path, coreIndexDts, coreAnotherModuleDts, projectFilePath(SubProject.logic, "decls/index.d.ts")]);
                    });
                });

                describe("on transitive references", () => {
                    const project = "transitiveReferences";
                    const aTsFile = getFileFromProject(project, "a.ts");
                    const bTsFile = getFileFromProject(project, "b.ts");
                    const cTsFile = getFileFromProject(project, "c.ts");
                    const aTsconfigFile = getFileFromProject(project, "tsconfig.a.json");
                    const bTsconfigFile = getFileFromProject(project, "tsconfig.b.json");
                    const cTsconfigFile = getFileFromProject(project, "tsconfig.c.json");
                    const refs = getFileFromProject(project, "refs/a.d.ts");

                    function getRootFile(multiFolder: boolean, fileFromDisk: File, multiFolderPath: string): File {
                        return multiFolder ? {
                            path: getFilePathInProject(project, multiFolderPath),
                            content: fileFromDisk.content
                                // Replace the relative imports
                                .replace("./", "../")
                        } : fileFromDisk;
                    }

                    function dtsFile(extensionLessFile: string) {
                        return getFilePathInProject(project, `${extensionLessFile}.d.ts`);
                    }

                    function jsFile(extensionLessFile: string) {
                        return getFilePathInProject(project, `${extensionLessFile}.js`);
                    }

                    function verifyWatchState(
                        host: WatchedSystem,
                        watch: Watch,
                        expectedProgramFiles: ReadonlyArray<string>,
                        expectedWatchedFiles: ReadonlyArray<string>,
                        expectedWatchedDirectoriesRecursive: ReadonlyArray<string>,
                        dependencies: ReadonlyArray<[string, ReadonlyArray<string>]>,
                        expectedWatchedDirectories?: ReadonlyArray<string>) {
                        checkProgramActualFiles(watch().getProgram(), expectedProgramFiles);
                        verifyWatchesOfProject(host, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, expectedWatchedDirectories);
                        for (const [file, deps] of dependencies) {
                            verifyDependencies(watch, file, deps);
                        }
                    }

                    function getTsConfigFile(multiFolder: boolean, fileFromDisk: File, folder: string): File {
                        if (!multiFolder) return fileFromDisk;

                        return {
                            path: getFilePathInProject(project, `${folder}/tsconfig.json`),
                            content: fileFromDisk.content
                                // Replace files array
                                .replace(`${folder}.ts`, "index.ts")
                                // Replace path mappings
                                .replace("./*", "../*")
                                .replace("./refs", "../refs")
                                // Replace references
                                .replace("tsconfig.a.json", "../a")
                                .replace("tsconfig.b.json", "../b")
                        };
                    }

                    // function writeFile(file: File) {
                    //     Harness.IO.writeFile(file.path.replace(projectsLocation, "c:/temp"), file.content);
                    // }

                    function verifyTransitiveReferences(multiFolder: boolean) {
                        const aTs = getRootFile(multiFolder, aTsFile, "a/index.ts");
                        const bTs = getRootFile(multiFolder, bTsFile, "b/index.ts");
                        const cTs = getRootFile(multiFolder, cTsFile, "c/index.ts");

                        const configToBuild = multiFolder ? "c/tsconfig.json" : "tsconfig.c.json";
                        const aTsconfig = getTsConfigFile(multiFolder, aTsconfigFile, "a");
                        const bTsconfig = getTsConfigFile(multiFolder, bTsconfigFile, "b");
                        const cTsconfig = getTsConfigFile(multiFolder, cTsconfigFile, "c");

                        // if (multiFolder) {
                        //     writeFile(aTs);
                        //     writeFile(bTs);
                        //     writeFile(cTs);
                        //     writeFile(aTsconfig);
                        //     writeFile(bTsconfig);
                        //     writeFile(cTsconfig);
                        // }

                        const allFiles = [libFile, aTs, bTs, cTs, aTsconfig, bTsconfig, cTsconfig, refs];
                        const aDts = dtsFile(multiFolder ? "a/index" : "a"), bDts = dtsFile(multiFolder ? "b/index" : "b");
                        const expectedFiles = [jsFile(multiFolder ? "a/index" : "a"), aDts, jsFile(multiFolder ? "b/index" : "b"), bDts, jsFile(multiFolder ? "c/index" : "c")];
                        const expectedProgramFiles = [cTs.path, libFile.path, aDts, refs.path, bDts];
                        const expectedWatchedFiles = expectedProgramFiles.concat(cTsconfig.path, bTsconfig.path, aTsconfig.path).map(s => s.toLowerCase());
                        const expectedWatchedDirectories = multiFolder ? [
                            getProjectPath(project).toLowerCase() // watches for directories created for resolution of b
                        ] : emptyArray;
                        const nrefsPath = multiFolder ? ["../nrefs/*"] : ["./nrefs/*"];
                        const expectedWatchedDirectoriesRecursive = [
                            ...(multiFolder ? [
                                getFilePathInProject(project, "a"), // Failed to package json
                                getFilePathInProject(project, "b"), // Failed to package json
                            ] : []),
                            getFilePathInProject(project, "refs"), // Failed lookup since refs/a.ts does not exist
                            ...projectSystem.getTypeRootsFromLocation(multiFolder ? getFilePathInProject(project, "c") : getProjectPath(project))
                        ].map(s => s.toLowerCase());

                        const defaultDependencies: ReadonlyArray<[string, ReadonlyArray<string>]> = [
                            [aDts, [aDts]],
                            [bDts, [bDts, aDts]],
                            [refs.path, [refs.path]],
                            [cTs.path, [cTs.path, refs.path, bDts]]
                        ];

                        function createSolutionAndWatchMode() {
                            return createSolutionAndWatchModeOfProject(allFiles, getProjectPath(project), configToBuild, configToBuild, getOutputFileStamps);
                        }

                        function createSolutionAndService() {
                            return createSolutionAndServiceOfProject(allFiles, getProjectPath(project), configToBuild, cTs.path, getOutputFileStamps);
                        }

                        function getOutputFileStamps(host: WatchedSystem) {
                            return expectedFiles.map(file => [file, host.getModifiedTime(file)] as OutputFileStamp);
                        }

                        function verifyProgram(host: WatchedSystem, watch: Watch) {
                            verifyWatchState(host, watch, expectedProgramFiles, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, defaultDependencies, expectedWatchedDirectories);
                        }

                        function verifyProject(host: WatchedSystem, service: projectSystem.TestProjectService, orphanInfos?: ReadonlyArray<string>) {
                            verifyServerState(host, service, expectedProgramFiles, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, orphanInfos);
                        }

                        function verifyServerState(
                            host: WatchedSystem,
                            service: projectSystem.TestProjectService,
                            expectedProgramFiles: ReadonlyArray<string>,
                            expectedWatchedFiles: ReadonlyArray<string>,
                            expectedWatchedDirectoriesRecursive: ReadonlyArray<string>,
                            orphanInfos?: ReadonlyArray<string>) {
                            checkProjectActualFiles(service, cTsconfig.path, expectedProgramFiles.concat(cTsconfig.path));
                            const watchedFiles = expectedWatchedFiles.filter(f => f !== cTs.path.toLowerCase());
                            if (orphanInfos) {
                                for (const orphan of orphanInfos) {
                                    const info = service.getScriptInfoForPath(orphan as Path);
                                    assert.isDefined(info);
                                    assert.equal(info!.containingProjects.length, 0);
                                    watchedFiles.push(orphan);
                                }
                            }
                            verifyWatchesOfProject(host, watchedFiles, expectedWatchedDirectoriesRecursive, expectedWatchedDirectories);
                        }

                        function verifyScenario(
                            edit: (host: WatchedSystem, solutionBuilder: SolutionBuilder) => void,
                            expectedEditErrors: ReadonlyArray<string>,
                            expectedProgramFiles: ReadonlyArray<string>,
                            expectedWatchedFiles: ReadonlyArray<string>,
                            expectedWatchedDirectoriesRecursive: ReadonlyArray<string>,
                            dependencies: ReadonlyArray<[string, ReadonlyArray<string>]>,
                            revert?: (host: WatchedSystem) => void,
                            orphanInfosAfterEdit?: ReadonlyArray<string>,
                            orphanInfosAfterRevert?: ReadonlyArray<string>) {
                            it("with tsc-watch", () => {
                                const { host, solutionBuilder, watch } = createSolutionAndWatchMode();

                                edit(host, solutionBuilder);

                                host.checkTimeoutQueueLengthAndRun(1);
                                checkOutputErrorsIncremental(host, expectedEditErrors);
                                verifyWatchState(host, watch, expectedProgramFiles, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, dependencies, expectedWatchedDirectories);

                                if (revert) {
                                    revert(host);

                                    host.checkTimeoutQueueLengthAndRun(1);
                                    checkOutputErrorsIncremental(host, emptyArray);
                                    verifyProgram(host, watch);
                                }
                            });

                            if (!multiFolder) return; // With side by side file open is in inferred project without any settings

                            it("with tsserver", () => {
                                const { host, solutionBuilder, service } = createSolutionAndService();

                                edit(host, solutionBuilder);

                                host.checkTimeoutQueueLengthAndRun(2);
                                verifyServerState(host, service, expectedProgramFiles, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, orphanInfosAfterEdit);

                                if (revert) {
                                    revert(host);

                                    host.checkTimeoutQueueLengthAndRun(2);
                                    verifyProject(host, service, orphanInfosAfterRevert);
                                }
                            });
                        }

                        describe("verifies dependencies and watches", () => {
                            // Initial build
                            it("with tsc-watch", () => {
                                const { host, watch } = createSolutionAndWatchMode();
                                verifyProgram(host, watch);
                            });
                            if (!multiFolder) return;
                            it("with tsserver", () => {
                                const { host, service } = createSolutionAndService();
                                verifyProject(host, service);
                            });
                        });

                        describe("non local edit updates the program and watch correctly", () => {
                            verifyScenario(
                                (host, solutionBuilder) => {
                                    // edit
                                    host.writeFile(bTs.path, `${bTs.content}
export function gfoo() {
}`);
                                    solutionBuilder.invalidateProject(bTsconfig.path);
                                    solutionBuilder.buildInvalidatedProject();
                                },
                                emptyArray,
                                expectedProgramFiles,
                                expectedWatchedFiles,
                                expectedWatchedDirectoriesRecursive,
                                defaultDependencies);
                        });

                        describe("edit on config file", () => {
                            const nrefReplacer = (f: string) => f.replace("refs", "nrefs");
                            const nrefs: File = {
                                path: getFilePathInProject(project, "nrefs/a.d.ts"),
                                content: refs.content
                            };
                            verifyScenario(
                                host => {
                                    const cTsConfigJson = JSON.parse(cTsconfig.content);
                                    host.ensureFileOrFolder(nrefs);
                                    cTsConfigJson.compilerOptions.paths = { "@ref/*": nrefsPath };
                                    host.writeFile(cTsconfig.path, JSON.stringify(cTsConfigJson));
                                },
                                emptyArray,
                                expectedProgramFiles.map(nrefReplacer),
                                expectedWatchedFiles.map(nrefReplacer),
                                expectedWatchedDirectoriesRecursive.map(nrefReplacer),
                                [
                                    [aDts, [aDts]],
                                    [bDts, [bDts, aDts]],
                                    [nrefs.path, [nrefs.path]],
                                    [cTs.path, [cTs.path, nrefs.path, bDts]]
                                ],
                                // revert the update
                                host => host.writeFile(cTsconfig.path, cTsconfig.content),
                                // AfterEdit:: Extra watched files on server since the script infos arent deleted till next file open
                                [refs.path.toLowerCase()],
                                // AfterRevert:: Extra watched files on server since the script infos arent deleted till next file open
                                [nrefs.path.toLowerCase()]
                            );
                        });

                        describe("edit in referenced config file", () => {
                            const nrefs: File = {
                                path: getFilePathInProject(project, "nrefs/a.d.ts"),
                                content: "export declare class A {}"
                            };
                            const expectedProgramFiles = [cTs.path, bDts, nrefs.path, refs.path, libFile.path];
                            const [, ...expectedWatchedDirectoriesRecursiveWithoutA] = expectedWatchedDirectoriesRecursive; // Not looking in a folder for resolution in multi folder scenario
                            verifyScenario(
                                host => {
                                    const bTsConfigJson = JSON.parse(bTsconfig.content);
                                    host.ensureFileOrFolder(nrefs);
                                    bTsConfigJson.compilerOptions.paths = { "@ref/*": nrefsPath };
                                    host.writeFile(bTsconfig.path, JSON.stringify(bTsConfigJson));
                                },
                                emptyArray,
                                expectedProgramFiles,
                                expectedProgramFiles.concat(cTsconfig.path, bTsconfig.path, aTsconfig.path).map(s => s.toLowerCase()),
                                (multiFolder ? expectedWatchedDirectoriesRecursiveWithoutA : expectedWatchedDirectoriesRecursive).concat(getFilePathInProject(project, "nrefs").toLowerCase()),
                                [
                                    [nrefs.path, [nrefs.path]],
                                    [bDts, [bDts, nrefs.path]],
                                    [refs.path, [refs.path]],
                                    [cTs.path, [cTs.path, refs.path, bDts]],
                                ],
                                // revert the update
                                host => host.writeFile(bTsconfig.path, bTsconfig.content),
                                // AfterEdit:: Extra watched files on server since the script infos arent deleted till next file open
                                [aDts.toLowerCase()],
                                // AfterRevert:: Extra watched files on server since the script infos arent deleted till next file open
                                [nrefs.path.toLowerCase()]
                            );
                        });

                        describe("deleting referenced config file", () => {
                            const expectedProgramFiles = [cTs.path, bTs.path, refs.path, libFile.path];
                            const [, ...expectedWatchedDirectoriesRecursiveWithoutA] = expectedWatchedDirectoriesRecursive; // Not looking in a folder for resolution in multi folder scenario
                            // Resolutions should change now
                            // Should map to b.ts instead with options from our own config
                            verifyScenario(
                                host => host.deleteFile(bTsconfig.path),
                                [
                                    `${multiFolder ? "c/tsconfig.json" : "tsconfig.c.json"}(9,21): error TS6053: File '/user/username/projects/transitiveReferences/${multiFolder ? "b" : "tsconfig.b.json"}' not found.\n`
                                ],
                                expectedProgramFiles,
                                expectedProgramFiles.concat(cTsconfig.path, bTsconfig.path).map(s => s.toLowerCase()),
                                multiFolder ? expectedWatchedDirectoriesRecursiveWithoutA : expectedWatchedDirectoriesRecursive,
                                [
                                    [bTs.path, [bTs.path, refs.path]],
                                    [refs.path, [refs.path]],
                                    [cTs.path, [cTs.path, refs.path, bTs.path]],
                                ],
                                // revert the update
                                host => host.writeFile(bTsconfig.path, bTsconfig.content),
                                // AfterEdit:: Extra watched files on server since the script infos arent deleted till next file open
                                [bDts.toLowerCase(), aDts.toLowerCase(), aTsconfig.path.toLowerCase()],
                                // AfterRevert:: Extra watched files on server since the script infos arent deleted till next file open
                                [bTs.path.toLowerCase()]
                            );
                        });

                        describe("deleting transitively referenced config file", () => {
                            verifyScenario(
                                host => host.deleteFile(aTsconfig.path),
                                [
                                    `${multiFolder ? "b/tsconfig.json" : "tsconfig.b.json"}(10,21): error TS6053: File '/user/username/projects/transitiveReferences/${multiFolder ? "a" : "tsconfig.a.json"}' not found.\n`
                                ],
                                expectedProgramFiles.map(s => s.replace(aDts, aTs.path)),
                                expectedWatchedFiles.map(s => s.replace(aDts.toLowerCase(), aTs.path.toLocaleLowerCase())),
                                expectedWatchedDirectoriesRecursive,
                                [
                                    [aTs.path, [aTs.path]],
                                    [bDts, [bDts, aTs.path]],
                                    [refs.path, [refs.path]],
                                    [cTs.path, [cTs.path, refs.path, bDts]],
                                ],
                                // revert the update
                                host => host.writeFile(aTsconfig.path, aTsconfig.content),
                                // AfterEdit:: Extra watched files on server since the script infos arent deleted till next file open
                                [aDts.toLowerCase()],
                                // AfterRevert:: Extra watched files on server since the script infos arent deleted till next file open
                                [aTs.path.toLowerCase()]
                            );
                        });
                    }

                    describe("when config files are side by side", () => {
                        verifyTransitiveReferences(/*multiFolder*/ false);

                        it("when referenced project uses different module resolution", () => {
                            const bTs: File = {
                                path: bTsFile.path,
                                content: `import {A} from "a";export const b = new A();`
                            };
                            const bTsconfig: File = {
                                path: bTsconfigFile.path,
                                content: JSON.stringify({
                                    compilerOptions: { composite: true, moduleResolution: "classic" },
                                    files: ["b.ts"],
                                    references: [{ path: "tsconfig.a.json" }]
                                })
                            };
                            const allFiles = [libFile, aTsFile, bTs, cTsFile, aTsconfigFile, bTsconfig, cTsconfigFile, refs];
                            const aDts = dtsFile("a"), bDts = dtsFile("b");
                            const expectedFiles = [jsFile("a"), aDts, jsFile("b"), bDts, jsFile("c")];
                            const expectedProgramFiles = [cTsFile.path, libFile.path, aDts, refs.path, bDts];
                            const expectedWatchedFiles = expectedProgramFiles.concat(cTsconfigFile.path, bTsconfigFile.path, aTsconfigFile.path).map(s => s.toLowerCase());
                            const expectedWatchedDirectoriesRecursive = [
                                getFilePathInProject(project, "refs"), // Failed lookup since refs/a.ts does not exist
                                ...projectSystem.getTypeRootsFromLocation(getProjectPath(project))
                            ].map(s => s.toLowerCase());

                            const defaultDependencies: ReadonlyArray<[string, ReadonlyArray<string>]> = [
                                [aDts, [aDts]],
                                [bDts, [bDts, aDts]],
                                [refs.path, [refs.path]],
                                [cTsFile.path, [cTsFile.path, refs.path, bDts]]
                            ];
                            function getOutputFileStamps(host: WatchedSystem) {
                                return expectedFiles.map(file => [file, host.getModifiedTime(file)] as OutputFileStamp);
                            }
                            const { host, watch } = createSolutionAndWatchModeOfProject(allFiles, getProjectPath(project), "tsconfig.c.json", "tsconfig.c.json", getOutputFileStamps);
                            verifyWatchState(host, watch, expectedProgramFiles, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, defaultDependencies);
                        });
                    });
                    describe("when config files are in side by side folders", () => {
                        verifyTransitiveReferences(/*multiFolder*/ true);
                    });
                });
            });
        });
    });
}
