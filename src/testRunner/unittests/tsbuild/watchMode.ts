namespace ts.tscWatch {
    import projectsLocation = TestFSWithWatch.tsbuildProjectsLocation;
    import getFilePathInProject = TestFSWithWatch.getTsBuildProjectFilePath;
    import getFileFromProject = TestFSWithWatch.getTsBuildProjectFile;
    type TsBuildWatchSystem = TestFSWithWatch.TestServerHostTrackingWrittenFiles;

    function createTsBuildWatchSystem(fileOrFolderList: readonly TestFSWithWatch.FileOrFolderOrSymLink[], params?: TestFSWithWatch.TestServerHostCreationParameters) {
        return TestFSWithWatch.changeToHostTrackingWrittenFiles(
            createWatchedSystem(fileOrFolderList, params)
        );
    }

    export function createSolutionBuilder(system: WatchedSystem, rootNames: readonly string[], defaultOptions?: BuildOptions) {
        const host = createSolutionBuilderHost(system);
        return ts.createSolutionBuilder(host, rootNames, defaultOptions || {});
    }

    export function ensureErrorFreeBuild(host: WatchedSystem, rootNames: readonly string[]) {
        // ts build should succeed
        const solutionBuilder = createSolutionBuilder(host, rootNames, {});
        solutionBuilder.build();
        assert.equal(host.getOutput().length, 0, JSON.stringify(host.getOutput(), /*replacer*/ undefined, " "));
    }

    type OutputFileStamp = [string, Date | undefined, boolean];
    function transformOutputToOutputFileStamp(f: string, host: TsBuildWatchSystem): OutputFileStamp {
        return [f, host.getModifiedTime(f), host.writtenFiles.has(host.toFullPath(f))] as OutputFileStamp;
    }

    describe("unittests:: tsbuild:: watchMode:: program updates", () => {
        const scenario = "programUpdates";
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

        function getOutputStamps(host: TsBuildWatchSystem, subProject: SubProject, baseFileNameWithoutExtension: string): OutputFileStamp[] {
            return getOutputFileNames(subProject, baseFileNameWithoutExtension).map(f => transformOutputToOutputFileStamp(f, host));
        }

        function getOutputFileStamps(host: TsBuildWatchSystem, additionalFiles?: readonly [SubProject, string][]): OutputFileStamp[] {
            const result = [
                ...getOutputStamps(host, SubProject.core, "anotherModule"),
                ...getOutputStamps(host, SubProject.core, "index"),
                ...getOutputStamps(host, SubProject.logic, "index"),
                ...getOutputStamps(host, SubProject.tests, "index"),
            ];
            if (additionalFiles) {
                additionalFiles.forEach(([subProject, baseFileNameWithoutExtension]) => result.push(...getOutputStamps(host, subProject, baseFileNameWithoutExtension)));
            }
            host.writtenFiles.clear();
            return result;
        }

        function changeFile(fileName: string | (() => string), content: string | (() => string), caption: string): TscWatchCompileChange {
            return {
                caption,
                change: sys => sys.writeFile(isString(fileName) ? fileName : fileName(), isString(content) ? content : content()),
                timeouts: checkSingleTimeoutQueueLengthAndRun, // Builds core
            };
        }

        function changeCore(content: () => string, caption: string) {
            return changeFile(() => core[1].path, content, caption);
        }

        let core: SubProjectFiles;
        let logic: SubProjectFiles;
        let tests: SubProjectFiles;
        let ui: SubProjectFiles;
        let allFiles: readonly File[];
        let testProjectExpectedWatchedFiles: string[];
        let testProjectExpectedWatchedDirectoriesRecursive: string[];

        before(() => {
            core = subProjectFiles(SubProject.core, /*anotherModuleAndSomeDecl*/ true);
            logic = subProjectFiles(SubProject.logic);
            tests = subProjectFiles(SubProject.tests);
            ui = subProjectFiles(SubProject.ui);
            allFiles = [libFile, ...core, ...logic, ...tests, ...ui];
            testProjectExpectedWatchedFiles = [core[0], core[1], core[2]!, ...logic, ...tests].map(f => f.path.toLowerCase());
            testProjectExpectedWatchedDirectoriesRecursive = [projectPath(SubProject.core), projectPath(SubProject.logic)];
        });

        after(() => {
            core = undefined!;
            logic = undefined!;
            tests = undefined!;
            ui = undefined!;
            allFiles = undefined!;
            testProjectExpectedWatchedFiles = undefined!;
            testProjectExpectedWatchedDirectoriesRecursive = undefined!;
        });

        verifyTscWatch({
            scenario,
            subScenario: "creates solution in watch mode",
            commandLineArgs: ["-b", "-w", `${project}/${SubProject.tests}`],
            sys: () => createWatchedSystem(allFiles, { currentDirectory: projectsLocation }),
            changes: emptyArray
        });

        it("verify building references watches only those projects", () => {
            const system = createTsBuildWatchSystem(allFiles, { currentDirectory: projectsLocation });
            const host = createSolutionBuilderWithWatchHost(system);
            const solutionBuilder = createSolutionBuilderWithWatch(host, [`${project}/${SubProject.tests}`], { watch: true });
            solutionBuilder.buildReferences(`${project}/${SubProject.tests}`);

            checkWatchedFiles(system, testProjectExpectedWatchedFiles.slice(0, testProjectExpectedWatchedFiles.length - tests.length));
            checkWatchedDirectories(system, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(system, testProjectExpectedWatchedDirectoriesRecursive, /*recursive*/ true);

            checkOutputErrorsInitial(system, emptyArray);
            const testOutput = getOutputStamps(system, SubProject.tests, "index");
            const outputFileStamps = getOutputFileStamps(system);
            for (const stamp of outputFileStamps.slice(0, outputFileStamps.length - testOutput.length)) {
                assert.isDefined(stamp[1], `${stamp[0]} expected to be present`);
            }
            for (const stamp of testOutput) {
                assert.isUndefined(stamp[1], `${stamp[0]} expected to be missing`);
            }
            return system;
        });

        const buildTests: TscWatchCompileChange = {
            caption: "Build Tests",
            change: noop,
            // Build tests
            timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
        };

        describe("validates the changes and watched files", () => {
            const newFileWithoutExtension = "newFile";
            const newFile: File = {
                path: projectFilePath(SubProject.core, `${newFileWithoutExtension}.ts`),
                content: `export const newFileConst = 30;`
            };

            function verifyProjectChanges(subScenario: string, allFilesGetter: () => readonly File[]) {
                const buildLogicOrUpdateTimeStamps: TscWatchCompileChange = {
                    caption: "Build logic or update time stamps",
                    change: noop,
                    timeouts: checkSingleTimeoutQueueLengthAndRun, // Builds logic or updates timestamps
                };

                verifyTscWatch({
                    scenario,
                    subScenario: `${subScenario}/change builds changes and reports found errors message`,
                    commandLineArgs: ["-b", "-w", `${project}/${SubProject.tests}`],
                    sys: () => createWatchedSystem(
                        allFilesGetter(),
                        { currentDirectory: projectsLocation }
                    ),
                    changes: [
                        changeCore(() => `${core[1].content}
export class someClass { }`, "Make change to core"),
                        buildLogicOrUpdateTimeStamps,
                        buildTests,
                        // Another change requeues and builds it
                        changeCore(() => core[1].content, "Revert core file"),
                        buildLogicOrUpdateTimeStamps,
                        buildTests,
                        {
                            caption: "Make two changes",
                            change: sys => {
                                const change1 = `${core[1].content}
export class someClass { }`;
                                sys.writeFile(core[1].path, change1);
                                assert.equal(sys.writtenFiles.size, 1);
                                sys.writtenFiles.clear();
                                sys.writeFile(core[1].path, `${change1}
export class someClass2 { }`);
                            },
                            timeouts: checkSingleTimeoutQueueLengthAndRun, // Builds core
                        },
                        buildLogicOrUpdateTimeStamps,
                        buildTests,
                    ]
                });

                verifyTscWatch({
                    scenario,
                    subScenario: `${subScenario}/non local change does not start build of referencing projects`,
                    commandLineArgs: ["-b", "-w", `${project}/${SubProject.tests}`],
                    sys: () => createWatchedSystem(
                        allFilesGetter(),
                        { currentDirectory: projectsLocation }
                    ),
                    changes: [
                        changeCore(() => `${core[1].content}
function foo() { }`, "Make local change to core"),
                        buildLogicOrUpdateTimeStamps,
                        buildTests
                    ]
                });

                function changeNewFile(newFileContent: string) {
                    return changeFile(newFile.path, newFileContent, "Change to new File and build core");
                }
                verifyTscWatch({
                    scenario,
                    subScenario: `${subScenario}/builds when new file is added, and its subsequent updates`,
                    commandLineArgs: ["-b", "-w", `${project}/${SubProject.tests}`],
                    sys: () => createWatchedSystem(
                        allFilesGetter(),
                        { currentDirectory: projectsLocation }
                    ),
                    changes: [
                        changeNewFile(newFile.content),
                        buildLogicOrUpdateTimeStamps,
                        buildTests,
                        changeNewFile(`${newFile.content}
export class someClass2 { }`),
                        buildLogicOrUpdateTimeStamps,
                        buildTests
                    ]
                });
            }

            describe("with simple project reference graph", () => {
                verifyProjectChanges(
                    "with simple project reference graph",
                    () => allFiles
                );
            });

            describe("with circular project reference", () => {
                verifyProjectChanges(
                    "with circular project reference",
                    () => {
                        const [coreTsconfig, ...otherCoreFiles] = core;
                        const circularCoreConfig: File = {
                            path: coreTsconfig.path,
                            content: JSON.stringify({
                                compilerOptions: { composite: true, declaration: true },
                                references: [{ path: "../tests", circular: true }]
                            })
                        };
                        return [libFile, circularCoreConfig, ...otherCoreFiles, ...logic, ...tests];
                    }
                );
            });
        });

        verifyTscWatch({
            scenario,
            subScenario: "watches config files that are not present",
            commandLineArgs: ["-b", "-w", `${project}/${SubProject.tests}`],
            sys: () => createWatchedSystem(
                [libFile, ...core, logic[1], ...tests],
                { currentDirectory: projectsLocation }
            ),
            changes: [
                {
                    caption: "Write logic tsconfig and build logic",
                    change: sys => sys.writeFile(logic[0].path, logic[0].content),
                    timeouts: checkSingleTimeoutQueueLengthAndRun, // Builds logic
                },
                buildTests
            ]
        });

        describe("when referenced using prepend, builds referencing project even for non local change", () => {
            let coreIndex: File;
            before(() => {
                coreIndex = {
                    path: core[1].path,
                    content: `function foo() { return 10; }`
                };
            });
            after(() => {
                coreIndex = undefined!;
            });
            const buildLogic: TscWatchCompileChange = {
                caption: "Build logic",
                change: noop,
                // Builds logic
                timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            };
            verifyTscWatch({
                scenario,
                subScenario: "when referenced using prepend builds referencing project even for non local change",
                commandLineArgs: ["-b", "-w", `${project}/${SubProject.logic}`],
                sys: () => {
                    const coreTsConfig: File = {
                        path: core[0].path,
                        content: JSON.stringify({
                            compilerOptions: { composite: true, declaration: true, outFile: "index.js" }
                        })
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
                    return createWatchedSystem([libFile, coreTsConfig, coreIndex, logicTsConfig, logicIndex], { currentDirectory: projectsLocation });
                },
                changes: [
                    changeCore(() => `${coreIndex.content}
function myFunc() { return 10; }`, "Make non local change and build core"),
                    buildLogic,
                    changeCore(() => `${coreIndex.content}
function myFunc() { return 100; }`, "Make local change and build core"),
                    buildLogic,
                ]
            });
        });

        describe("when referenced project change introduces error in the down stream project and then fixes it", () => {
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
            verifyTscWatch({
                scenario,
                subScenario: "when referenced project change introduces error in the down stream project and then fixes it",
                commandLineArgs: ["-b", "-w", "App"],
                sys: () => {
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
                    return createWatchedSystem(files, { currentDirectory: `${projectsLocation}/${project}` });
                },
                changes: [
                    {
                        caption: "Introduce error",
                        // Change message in library to message2
                        change: sys => sys.writeFile(libraryTs.path, libraryTs.content.replace(/message/g, "message2")),
                        timeouts: sys => {
                            sys.checkTimeoutQueueLengthAndRun(1); // Build library
                            sys.checkTimeoutQueueLengthAndRun(1); // Build App
                        },
                    },
                    {
                        caption: "Fix error",
                        // Revert library changes
                        change: sys => sys.writeFile(libraryTs.path, libraryTs.content),
                        timeouts: sys => {
                            sys.checkTimeoutQueueLengthAndRun(1); // Build library
                            sys.checkTimeoutQueueLengthAndRun(1); // Build App
                        },
                    },
                ]
            });

        });

        describe("reports errors in all projects on incremental compile", () => {
            function verifyIncrementalErrors(subScenario: string, buildOptions: readonly string[]) {
                verifyTscWatch({
                    scenario,
                    subScenario: `reportErrors/${subScenario}`,
                    commandLineArgs: ["-b", "-w", `${project}/${SubProject.tests}`, ...buildOptions],
                    sys: () => createWatchedSystem(allFiles, { currentDirectory: projectsLocation }),
                    changes: [
                        {
                            caption: "change logic",
                            change: sys => sys.writeFile(logic[1].path, `${logic[1].content}
let y: string = 10;`),
                            // Builds logic
                            timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
                        },
                        {
                            caption: "change core",
                            change: sys => sys.writeFile(core[1].path, `${core[1].content}
let x: string = 10;`),
                            // Builds core
                            timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
                        }
                    ]
                });
            }
            verifyIncrementalErrors("when preserveWatchOutput is not used", emptyArray);
            verifyIncrementalErrors("when preserveWatchOutput is passed on command line", ["--preserveWatchOutput"]);

            describe("when declaration emit errors are present", () => {
                const solution = "solution";
                const subProject = "app";
                const subProjectLocation = `${projectsLocation}/${solution}/${subProject}`;
                const fileWithError: File = {
                    path: `${subProjectLocation}/fileWithError.ts`,
                    content: `export var myClassWithError = class {
        tags() { }
        private p = 12
    };`
                };
                const fileWithFixedError: File = {
                    path: fileWithError.path,
                    content: fileWithError.content.replace("private p = 12", "")
                };
                const fileWithoutError: File = {
                    path: `${subProjectLocation}/fileWithoutError.ts`,
                    content: `export class myClass { }`
                };
                const tsconfig: File = {
                    path: `${subProjectLocation}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { composite: true } })
                };

                function incrementalBuild(sys: WatchedSystem) {
                    sys.checkTimeoutQueueLengthAndRun(1); // Build the app
                    sys.checkTimeoutQueueLength(0);
                }

                const fixError: TscWatchCompileChange = {
                    caption: "Fix error in fileWithError",
                    // Fix error
                    change: sys => sys.writeFile(fileWithError.path, fileWithFixedError.content),
                    timeouts: incrementalBuild
                };

                const changeFileWithoutError: TscWatchCompileChange = {
                    caption: "Change fileWithoutError",
                    change: sys => sys.writeFile(fileWithoutError.path, fileWithoutError.content.replace(/myClass/g, "myClass2")),
                    timeouts: incrementalBuild
                };

                verifyTscWatch({
                    scenario,
                    subScenario: "reportErrors/declarationEmitErrors/when fixing error files all files are emitted",
                    commandLineArgs: ["-b", "-w", subProject],
                    sys: () => createWatchedSystem(
                        [libFile, fileWithError, fileWithoutError, tsconfig],
                        { currentDirectory: `${projectsLocation}/${solution}` }
                    ),
                    changes: [
                        fixError
                    ]
                });

                verifyTscWatch({
                    scenario,
                    subScenario: "reportErrors/declarationEmitErrors/when file with no error changes",
                    commandLineArgs: ["-b", "-w", subProject],
                    sys: () => createWatchedSystem(
                        [libFile, fileWithError, fileWithoutError, tsconfig],
                        { currentDirectory: `${projectsLocation}/${solution}` }
                    ),
                    changes: [
                        changeFileWithoutError
                    ]
                });

                describe("when reporting errors on introducing error", () => {
                    const introduceError: TscWatchCompileChange = {
                        caption: "Introduce error",
                        change: sys => sys.writeFile(fileWithError.path, fileWithError.content),
                        timeouts: incrementalBuild,
                    };

                    verifyTscWatch({
                        scenario,
                        subScenario: "reportErrors/declarationEmitErrors/introduceError/when fixing errors only changed file is emitted",
                        commandLineArgs: ["-b", "-w", subProject],
                        sys: () => createWatchedSystem(
                            [libFile, fileWithFixedError, fileWithoutError, tsconfig],
                            { currentDirectory: `${projectsLocation}/${solution}` }
                        ),
                        changes: [
                            introduceError,
                            fixError
                        ]
                    });

                    verifyTscWatch({
                        scenario,
                        subScenario: "reportErrors/declarationEmitErrors/introduceError/when file with no error changes",
                        commandLineArgs: ["-b", "-w", subProject],
                        sys: () => createWatchedSystem(
                            [libFile, fileWithFixedError, fileWithoutError, tsconfig],
                            { currentDirectory: `${projectsLocation}/${solution}` }
                        ),
                        changes: [
                            introduceError,
                            changeFileWithoutError
                        ]
                    });
                });
            });
        });

        describe("tsc-watch and tsserver works with project references", () => {
            describe("invoking when references are already built", () => {
                function verifyWatchesOfProject(host: TsBuildWatchSystem, expectedWatchedFiles: readonly string[], expectedWatchedDirectoriesRecursive: readonly string[], expectedWatchedDirectories?: readonly string[]) {
                    checkWatchedFilesDetailed(host, expectedWatchedFiles, 1);
                    checkWatchedDirectoriesDetailed(host, expectedWatchedDirectories || emptyArray, 1, /*recursive*/ false);
                    checkWatchedDirectoriesDetailed(host, expectedWatchedDirectoriesRecursive, 1, /*recursive*/ true);
                }

                function createSolutionOfProject(allFiles: readonly File[],
                    currentDirectory: string,
                    solutionBuilderconfig: string,
                    getOutputFileStamps: (host: TsBuildWatchSystem) => readonly OutputFileStamp[]) {
                    // Build the composite project
                    const host = createTsBuildWatchSystem(allFiles, { currentDirectory });
                    const solutionBuilder = createSolutionBuilder(host, [solutionBuilderconfig], {});
                    solutionBuilder.build();
                    const outputFileStamps = getOutputFileStamps(host);
                    for (const stamp of outputFileStamps) {
                        assert.isDefined(stamp[1], `${stamp[0]} expected to be present`);
                    }
                    return { host, solutionBuilder };
                }

                function createSolutionAndWatchModeOfProject(
                    allFiles: readonly File[],
                    currentDirectory: string,
                    solutionBuilderconfig: string,
                    watchConfig: string,
                    getOutputFileStamps: (host: TsBuildWatchSystem) => readonly OutputFileStamp[]) {
                    // Build the composite project
                    const { host, solutionBuilder } = createSolutionOfProject(allFiles, currentDirectory, solutionBuilderconfig, getOutputFileStamps);

                    // Build in watch mode
                    const watch = createWatchOfConfigFile(watchConfig, host);
                    checkOutputErrorsInitial(host, emptyArray);

                    return { host, solutionBuilder, watch };
                }

                function createSolutionAndServiceOfProject(allFiles: readonly File[],
                    currentDirectory: string,
                    solutionBuilderconfig: string,
                    openFileName: string,
                    getOutputFileStamps: (host: TsBuildWatchSystem) => readonly OutputFileStamp[]) {
                    // Build the composite project
                    const { host, solutionBuilder } = createSolutionOfProject(allFiles, currentDirectory, solutionBuilderconfig, getOutputFileStamps);

                    // service
                    const service = projectSystem.createProjectService(host);
                    service.openClientFile(openFileName);

                    return { host, solutionBuilder, service };
                }

                function checkProjectActualFiles(service: projectSystem.TestProjectService, configFile: string, expectedFiles: readonly string[]) {
                    projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
                    projectSystem.checkProjectActualFiles(service.configuredProjects.get(configFile.toLowerCase())!, expectedFiles);
                }

                function verifyDependencies(watch: Watch, filePath: string, expected: readonly string[]) {
                    checkArray(`${filePath} dependencies`, watch.getCurrentProgram().getAllDependencies(watch.getCurrentProgram().getSourceFile(filePath)!), expected);
                }

                describe("on sample project", () => {
                    const coreIndexDts = projectFileName(SubProject.core, "index.d.ts");
                    const coreAnotherModuleDts = projectFileName(SubProject.core, "anotherModule.d.ts");
                    const logicIndexDts = projectFileName(SubProject.logic, "index.d.ts");
                    const expectedWatchedDirectoriesRecursive = projectSystem.getTypeRootsFromLocation(projectPath(SubProject.tests));
                    const expectedProjectFiles = () => [libFile, ...tests, ...logic.slice(1), ...core.slice(1, core.length - 1)].map(f => f.path);
                    const expectedProgramFiles = () => [tests[1].path, libFile.path, coreIndexDts, coreAnotherModuleDts, logicIndexDts];

                    function createSolutionAndWatchMode() {
                        return createSolutionAndWatchModeOfProject(allFiles, projectsLocation, `${project}/${SubProject.tests}`, tests[0].path, getOutputFileStamps);
                    }

                    function createSolutionAndService() {
                        return createSolutionAndServiceOfProject(allFiles, projectsLocation, `${project}/${SubProject.tests}`, tests[1].path, getOutputFileStamps);
                    }

                    function verifyWatches(host: TsBuildWatchSystem, withTsserver?: boolean) {
                        verifyWatchesOfProject(
                            host,
                            withTsserver ?
                                [...core.slice(0, core.length - 1), ...logic, tests[0], libFile].map(f => f.path.toLowerCase()) :
                                [core[0], logic[0], ...tests, libFile].map(f => f.path).concat([coreIndexDts, coreAnotherModuleDts, logicIndexDts].map(f => f.toLowerCase())),
                            expectedWatchedDirectoriesRecursive
                        );
                    }

                    function verifyScenario(
                        edit: (host: TsBuildWatchSystem, solutionBuilder: SolutionBuilder<EmitAndSemanticDiagnosticsBuilderProgram>) => void,
                        expectedProgramFilesAfterEdit: () => readonly string[],
                        expectedProjectFilesAfterEdit: () => readonly string[]
                    ) {
                        it("with tsc-watch", () => {
                            const { host, solutionBuilder, watch } = createSolutionAndWatchMode();

                            edit(host, solutionBuilder);

                            host.checkTimeoutQueueLengthAndRun(1);
                            checkOutputErrorsIncremental(host, emptyArray);
                            checkProgramActualFiles(watch.getCurrentProgram().getProgram(), expectedProgramFilesAfterEdit());

                        });

                        it("with tsserver", () => {
                            const { host, solutionBuilder, service } = createSolutionAndService();

                            edit(host, solutionBuilder);

                            host.checkTimeoutQueueLengthAndRun(2);
                            checkProjectActualFiles(service, tests[0].path, expectedProjectFilesAfterEdit());
                        });
                    }

                    describe("verifies dependencies and watches", () => {
                        it("with tsc-watch", () => {
                            const { host, watch } = createSolutionAndWatchMode();
                            verifyWatches(host);
                            verifyDependencies(watch, coreIndexDts, [coreIndexDts]);
                            verifyDependencies(watch, coreAnotherModuleDts, [coreAnotherModuleDts]);
                            verifyDependencies(watch, logicIndexDts, [logicIndexDts, coreAnotherModuleDts]);
                            verifyDependencies(watch, tests[1].path, expectedProgramFiles().filter(f => f !== libFile.path));
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
                            solutionBuilder.invalidateProject(logic[0].path.toLowerCase() as ResolvedConfigFilePath);
                            solutionBuilder.buildNextInvalidatedProject();

                            // not ideal, but currently because of d.ts but no new file is written
                            // There will be timeout queued even though file contents are same
                        }, expectedProgramFiles, expectedProjectFiles);
                    });

                    describe("non local edit in ts file, rebuilds in watch compilation", () => {
                        verifyScenario((host, solutionBuilder) => {
                            host.writeFile(logic[1].path, `${logic[1].content}
export function gfoo() {
}`);
                            solutionBuilder.invalidateProject(logic[0].path.toLowerCase() as ResolvedConfigFilePath);
                            solutionBuilder.buildNextInvalidatedProject();
                        }, expectedProgramFiles, expectedProjectFiles);
                    });

                    describe("change in project reference config file builds correctly", () => {
                        verifyScenario((host, solutionBuilder) => {
                            host.writeFile(logic[0].path, JSON.stringify({
                                compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
                                references: [{ path: "../core" }]
                            }));
                            solutionBuilder.invalidateProject(logic[0].path.toLowerCase() as ResolvedConfigFilePath, ConfigFileProgramReloadLevel.Full);
                            solutionBuilder.buildNextInvalidatedProject();
                        }, () => [tests[1].path, libFile.path, coreIndexDts, coreAnotherModuleDts, projectFilePath(SubProject.logic, "decls/index.d.ts")], expectedProjectFiles);
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
                        host: TsBuildWatchSystem,
                        watch: Watch,
                        expectedProgramFiles: readonly string[],
                        expectedWatchedFiles: readonly string[],
                        expectedWatchedDirectoriesRecursive: readonly string[],
                        dependencies: readonly [string, readonly string[]][],
                        expectedWatchedDirectories?: readonly string[]) {
                        checkProgramActualFiles(watch.getCurrentProgram().getProgram(), expectedProgramFiles);
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
                        const expectedProjectFiles = [cTs.path, libFile.path, aTs.path, refs.path, bTs.path];
                        const expectedWatchedFiles = expectedProgramFiles.concat(cTsconfig.path, bTsconfig.path, aTsconfig.path).map(s => s.toLowerCase());
                        const expectedProjectWatchedFiles = expectedProjectFiles.concat(cTsconfig.path, bTsconfig.path, aTsconfig.path).map(s => s.toLowerCase());
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

                        const defaultDependencies: readonly [string, readonly string[]][] = [
                            [aDts, [aDts]],
                            [bDts, [bDts, aDts]],
                            [refs.path, [refs.path]],
                            [cTs.path, [cTs.path, refs.path, bDts, aDts]]
                        ];

                        function createSolutionAndWatchMode() {
                            return createSolutionAndWatchModeOfProject(allFiles, getProjectPath(project), configToBuild, configToBuild, getOutputFileStamps);
                        }

                        function createSolutionAndService() {
                            return createSolutionAndServiceOfProject(allFiles, getProjectPath(project), configToBuild, cTs.path, getOutputFileStamps);
                        }

                        function getOutputFileStamps(host: TsBuildWatchSystem) {
                            return expectedFiles.map(file => transformOutputToOutputFileStamp(file, host));
                        }

                        function verifyProgram(host: TsBuildWatchSystem, watch: Watch) {
                            verifyWatchState(host, watch, expectedProgramFiles, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, defaultDependencies, expectedWatchedDirectories);
                        }

                        function verifyProject(host: TsBuildWatchSystem, service: projectSystem.TestProjectService, orphanInfos?: readonly string[]) {
                            verifyServerState({ host, service, expectedProjectFiles, expectedProjectWatchedFiles, expectedWatchedDirectoriesRecursive, orphanInfos });
                        }

                        interface VerifyServerState {
                            host: TsBuildWatchSystem;
                            service: projectSystem.TestProjectService;
                            expectedProjectFiles: readonly string[];
                            expectedProjectWatchedFiles: readonly string[];
                            expectedWatchedDirectoriesRecursive: readonly string[];
                            orphanInfos?: readonly string[];
                        }
                        function verifyServerState({ host, service, expectedProjectFiles, expectedProjectWatchedFiles, expectedWatchedDirectoriesRecursive, orphanInfos }: VerifyServerState) {
                            checkProjectActualFiles(service, cTsconfig.path, expectedProjectFiles.concat(cTsconfig.path));
                            const watchedFiles = expectedProjectWatchedFiles.filter(f => f !== cTs.path.toLowerCase());
                            const actualOrphan = arrayFrom(mapDefinedIterator(
                                service.filenameToScriptInfo.values(),
                                v => v.containingProjects.length === 0 ? v.fileName : undefined
                            ));
                            assert.equal(actualOrphan.length, orphanInfos ? orphanInfos.length : 0, `Orphans found: ${JSON.stringify(actualOrphan, /*replacer*/ undefined, " ")}`);
                            if (orphanInfos && orphanInfos.length) {
                                for (const orphan of orphanInfos) {
                                    const info = service.getScriptInfoForPath(orphan as Path);
                                    assert.isDefined(info, `${orphan} expected to be present. Actual: ${JSON.stringify(actualOrphan, /*replacer*/ undefined, " ")}`);
                                    assert.equal(info!.containingProjects.length, 0);
                                    watchedFiles.push(orphan);
                                }
                            }
                            verifyWatchesOfProject(host, watchedFiles, expectedWatchedDirectoriesRecursive, expectedWatchedDirectories);
                        }

                        interface VerifyScenario {
                            edit: (host: TsBuildWatchSystem, solutionBuilder: SolutionBuilder<EmitAndSemanticDiagnosticsBuilderProgram>) => void;
                            schedulesFailedWatchUpdate?: boolean;
                            expectedEditErrors: readonly string[];
                            expectedProgramFiles: readonly string[];
                            expectedProjectFiles: readonly string[];
                            expectedWatchedFiles: readonly string[];
                            expectedProjectWatchedFiles: readonly string[];
                            expectedWatchedDirectoriesRecursive: readonly string[];
                            dependencies: readonly [string, readonly string[]][];
                            revert?: (host: TsBuildWatchSystem) => void;
                            orphanInfosAfterEdit?: readonly string[];
                            orphanInfosAfterRevert?: readonly string[];
                        }
                        function verifyScenario({ edit, schedulesFailedWatchUpdate, expectedEditErrors, expectedProgramFiles, expectedProjectFiles, expectedWatchedFiles, expectedProjectWatchedFiles, expectedWatchedDirectoriesRecursive, dependencies, revert, orphanInfosAfterEdit, orphanInfosAfterRevert }: VerifyScenario) {
                            it("with tsc-watch", () => {
                                const { host, solutionBuilder, watch } = createSolutionAndWatchMode();

                                edit(host, solutionBuilder);

                                host.checkTimeoutQueueLengthAndRun(schedulesFailedWatchUpdate ? 2 : 1);
                                checkOutputErrorsIncremental(host, expectedEditErrors);
                                verifyWatchState(host, watch, expectedProgramFiles, expectedWatchedFiles, expectedWatchedDirectoriesRecursive, dependencies, expectedWatchedDirectories);

                                if (revert) {
                                    revert(host);

                                    host.checkTimeoutQueueLengthAndRun(schedulesFailedWatchUpdate ? 2 : 1);
                                    checkOutputErrorsIncremental(host, emptyArray);
                                    verifyProgram(host, watch);
                                }
                            });

                            if (!multiFolder) return; // With side by side file open is in inferred project without any settings

                            it("with tsserver", () => {
                                const { host, solutionBuilder, service } = createSolutionAndService();

                                edit(host, solutionBuilder);

                                host.checkTimeoutQueueLengthAndRun(schedulesFailedWatchUpdate ? 3 : 2);
                                verifyServerState({ host, service, expectedProjectFiles, expectedProjectWatchedFiles, expectedWatchedDirectoriesRecursive, orphanInfos: orphanInfosAfterEdit });

                                if (revert) {
                                    revert(host);

                                    host.checkTimeoutQueueLengthAndRun(schedulesFailedWatchUpdate ? 3 : 2);
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
                            verifyScenario({
                                edit: (host, solutionBuilder) => {
                                    // edit
                                    host.writeFile(bTs.path, `${bTs.content}\nexport function gfoo() {\n}`);
                                    solutionBuilder.invalidateProject((bTsconfig.path.toLowerCase() as ResolvedConfigFilePath));
                                    solutionBuilder.buildNextInvalidatedProject();
                                },
                                expectedEditErrors: emptyArray,
                                expectedProgramFiles,
                                expectedProjectFiles,
                                expectedWatchedFiles,
                                expectedProjectWatchedFiles,
                                expectedWatchedDirectoriesRecursive,
                                dependencies: defaultDependencies
                            });
                        });

                        describe("edit on config file", () => {
                            const nrefReplacer = (f: string) => f.replace("refs", "nrefs");
                            const nrefs: File = {
                                path: getFilePathInProject(project, "nrefs/a.d.ts"),
                                content: refs.content
                            };
                            verifyScenario({
                                edit: host => {
                                    const cTsConfigJson = JSON.parse(cTsconfig.content);
                                    host.ensureFileOrFolder(nrefs);
                                    cTsConfigJson.compilerOptions.paths = { "@ref/*": nrefsPath };
                                    host.writeFile(cTsconfig.path, JSON.stringify(cTsConfigJson));
                                },
                                expectedEditErrors: emptyArray,
                                expectedProgramFiles: expectedProgramFiles.map(nrefReplacer),
                                expectedProjectFiles: expectedProjectFiles.map(nrefReplacer),
                                expectedWatchedFiles: expectedWatchedFiles.map(nrefReplacer),
                                expectedProjectWatchedFiles: expectedProjectWatchedFiles.map(nrefReplacer),
                                expectedWatchedDirectoriesRecursive: expectedWatchedDirectoriesRecursive.map(nrefReplacer),
                                dependencies: [
                                    [aDts, [aDts]],
                                    [bDts, [bDts, aDts]],
                                    [nrefs.path, [nrefs.path]],
                                    [cTs.path, [cTs.path, nrefs.path, bDts, aDts]]
                                ],
                                // revert the update
                                revert: host => host.writeFile(cTsconfig.path, cTsconfig.content),
                                // AfterEdit:: Extra watched files on server since the script infos arent deleted till next file open
                                orphanInfosAfterEdit: [refs.path.toLowerCase()],
                                // AfterRevert:: Extra watched files on server since the script infos arent deleted till next file open
                                orphanInfosAfterRevert: [nrefs.path.toLowerCase()]
                            });
                        });

                        describe("edit in referenced config file", () => {
                            const nrefs: File = {
                                path: getFilePathInProject(project, "nrefs/a.d.ts"),
                                content: "export declare class A {}"
                            };
                            const expectedProgramFiles = [cTs.path, bDts, nrefs.path, refs.path, libFile.path];
                            const expectedProjectFiles = [cTs.path, bTs.path, nrefs.path, refs.path, libFile.path];
                            const [, ...expectedWatchedDirectoriesRecursiveWithoutA] = expectedWatchedDirectoriesRecursive; // Not looking in a folder for resolution in multi folder scenario
                            verifyScenario({
                                edit: host => {
                                    const bTsConfigJson = JSON.parse(bTsconfig.content);
                                    host.ensureFileOrFolder(nrefs);
                                    bTsConfigJson.compilerOptions.paths = { "@ref/*": nrefsPath };
                                    host.writeFile(bTsconfig.path, JSON.stringify(bTsConfigJson));
                                },
                                expectedEditErrors: emptyArray,
                                expectedProgramFiles,
                                expectedProjectFiles,
                                expectedWatchedFiles: expectedProgramFiles.concat(cTsconfig.path, bTsconfig.path, aTsconfig.path).map(s => s.toLowerCase()),
                                expectedProjectWatchedFiles: expectedProjectFiles.concat(cTsconfig.path, bTsconfig.path, aTsconfig.path).map(s => s.toLowerCase()),
                                expectedWatchedDirectoriesRecursive: (multiFolder ? expectedWatchedDirectoriesRecursiveWithoutA : expectedWatchedDirectoriesRecursive).concat(getFilePathInProject(project, "nrefs").toLowerCase()),
                                dependencies: [
                                    [nrefs.path, [nrefs.path]],
                                    [bDts, [bDts, nrefs.path]],
                                    [refs.path, [refs.path]],
                                    [cTs.path, [cTs.path, refs.path, bDts, nrefs.path]],
                                ],
                                // revert the update
                                revert: host => host.writeFile(bTsconfig.path, bTsconfig.content),
                                // AfterEdit:: Extra watched files on server since the script infos arent deleted till next file open
                                orphanInfosAfterEdit: [aTs.path.toLowerCase()],
                                // AfterRevert:: Extra watched files on server since the script infos arent deleted till next file open
                                orphanInfosAfterRevert: [nrefs.path.toLowerCase()]
                            });
                        });

                        describe("deleting referenced config file", () => {
                            const expectedProgramFiles = [cTs.path, bTs.path, refs.path, libFile.path];
                            const expectedWatchedFiles = expectedProgramFiles.concat(cTsconfig.path, bTsconfig.path).map(s => s.toLowerCase());
                            const [, ...expectedWatchedDirectoriesRecursiveWithoutA] = expectedWatchedDirectoriesRecursive; // Not looking in a folder for resolution in multi folder scenario
                            // Resolutions should change now
                            // Should map to b.ts instead with options from our own config
                            verifyScenario({
                                edit: host => host.deleteFile(bTsconfig.path),
                                schedulesFailedWatchUpdate: multiFolder,
                                expectedEditErrors: [
                                    `${multiFolder ? "c/tsconfig.json" : "tsconfig.c.json"}(9,21): error TS6053: File '/user/username/projects/transitiveReferences/${multiFolder ? "b" : "tsconfig.b.json"}' not found.\n`
                                ],
                                expectedProgramFiles,
                                expectedProjectFiles: expectedProgramFiles,
                                expectedWatchedFiles,
                                expectedProjectWatchedFiles: expectedWatchedFiles,
                                expectedWatchedDirectoriesRecursive: multiFolder ? expectedWatchedDirectoriesRecursiveWithoutA : expectedWatchedDirectoriesRecursive,
                                dependencies: [
                                    [bTs.path, [bTs.path, refs.path]],
                                    [refs.path, [refs.path]],
                                    [cTs.path, [cTs.path, refs.path, bTs.path]],
                                ],
                                // revert the update
                                revert: host => host.writeFile(bTsconfig.path, bTsconfig.content),
                                // AfterEdit:: Extra watched files on server since the script infos arent deleted till next file open
                                orphanInfosAfterEdit: [aTs.path.toLowerCase(), aTsconfig.path.toLowerCase()],
                            });
                        });

                        describe("deleting transitively referenced config file", () => {
                            verifyScenario({
                                edit: host => host.deleteFile(aTsconfig.path),
                                schedulesFailedWatchUpdate: multiFolder,
                                expectedEditErrors: [
                                    `${multiFolder ? "b/tsconfig.json" : "tsconfig.b.json"}(10,21): error TS6053: File '/user/username/projects/transitiveReferences/${multiFolder ? "a" : "tsconfig.a.json"}' not found.\n`
                                ],
                                expectedProgramFiles: expectedProgramFiles.map(s => s.replace(aDts, aTs.path)),
                                expectedProjectFiles,
                                expectedWatchedFiles: expectedWatchedFiles.map(s => s.replace(aDts.toLowerCase(), aTs.path.toLocaleLowerCase())),
                                expectedProjectWatchedFiles,
                                expectedWatchedDirectoriesRecursive,
                                dependencies: [
                                    [aTs.path, [aTs.path]],
                                    [bDts, [bDts, aTs.path]],
                                    [refs.path, [refs.path]],
                                    [cTs.path, [cTs.path, refs.path, bDts, aTs.path]],
                                ],
                                // revert the update
                                revert: host => host.writeFile(aTsconfig.path, aTsconfig.content),
                            });
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

                            const defaultDependencies: readonly [string, readonly string[]][] = [
                                [aDts, [aDts]],
                                [bDts, [bDts, aDts]],
                                [refs.path, [refs.path]],
                                [cTsFile.path, [cTsFile.path, refs.path, bDts, aDts]]
                            ];
                            function getOutputFileStamps(host: TsBuildWatchSystem) {
                                return expectedFiles.map(file => transformOutputToOutputFileStamp(file, host));
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

        verifyTscWatch({
            scenario,
            subScenario: "incremental updates in verbose mode",
            commandLineArgs: ["-b", "-w", `${project}/${SubProject.tests}`, "-verbose"],
            sys: () => createWatchedSystem(allFiles, { currentDirectory: projectsLocation }),
            changes: [
                {
                    caption: "Make non dts change",
                    change: sys => sys.writeFile(logic[1].path, `${logic[1].content}
function someFn() { }`),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // build logic
                        sys.checkTimeoutQueueLengthAndRun(1); // build tests
                    },
                },
                {
                    caption: "Make dts change",
                    change: sys => sys.writeFile(logic[1].path, `${logic[1].content}
export function someFn() { }`),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // build logic
                        sys.checkTimeoutQueueLengthAndRun(1); // build tests
                    },
                }
            ],
        });

        verifyTscWatch({
            scenario,
            subScenario: "works when noUnusedParameters changes to false",
            commandLineArgs: ["-b", "-w"],
            sys: () => {
                const index: File = {
                    path: `${projectRoot}/index.ts`,
                    content: `const fn = (a: string, b: string) => b;`
                };
                const configFile: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            noUnusedParameters: true
                        }
                    })
                };
                return createWatchedSystem([index, configFile, libFile], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "Change tsconfig to set noUnusedParameters to false",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({
                        compilerOptions: {
                            noUnusedParameters: false
                        }
                    })),
                    timeouts: runQueuedTimeoutCallbacks,
                },
            ]
        });
    });

    describe("unittests:: tsbuild:: watchMode:: with demo project", () => {
        const projectLocation = `${projectsLocation}/demo`;
        let coreFiles: File[];
        let animalFiles: File[];
        let zooFiles: File[];
        let solutionFile: File;
        let baseConfig: File;
        let allFiles: File[];
        before(() => {
            coreFiles = subProjectFiles("core", ["tsconfig.json", "utilities.ts"]);
            animalFiles = subProjectFiles("animals", ["tsconfig.json", "animal.ts", "dog.ts", "index.ts"]);
            zooFiles = subProjectFiles("zoo", ["tsconfig.json", "zoo.ts"]);
            solutionFile = projectFile("tsconfig.json");
            baseConfig = projectFile("tsconfig-base.json");
            allFiles = [...coreFiles, ...animalFiles, ...zooFiles, solutionFile, baseConfig, { path: libFile.path, content: libContent }];
        });

        after(() => {
            coreFiles = undefined!;
            animalFiles = undefined!;
            zooFiles = undefined!;
            solutionFile = undefined!;
            baseConfig = undefined!;
            allFiles = undefined!;
        });

        verifyTscWatch({
            scenario: "demo",
            subScenario: "updates with circular reference",
            commandLineArgs: ["-b", "-w", "-verbose"],
            sys: () => {
                const sys = createWatchedSystem(allFiles, { currentDirectory: projectLocation });
                sys.writeFile(coreFiles[0].path, coreFiles[0].content.replace(
                    "}",
                    `},
  "references": [
    {
      "path": "../zoo"
    }
  ]`
                ));
                return sys;
            },
            changes: [
                {
                    caption: "Fix error",
                    change: sys => sys.writeFile(coreFiles[0].path, coreFiles[0].content),
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(1); // build core
                        sys.checkTimeoutQueueLengthAndRun(1); // build animals
                        sys.checkTimeoutQueueLengthAndRun(1); // build zoo
                        sys.checkTimeoutQueueLengthAndRun(1); // build solution
                        sys.checkTimeoutQueueLength(0);
                    },
                }
            ]
        });

        verifyTscWatch({
            scenario: "demo",
            subScenario: "updates with bad reference",
            commandLineArgs: ["-b", "-w", "-verbose"],
            sys: () => {
                const sys = createWatchedSystem(allFiles, { currentDirectory: projectLocation });
                sys.writeFile(coreFiles[1].path, `import * as A from '../animals';
${coreFiles[1].content}`);
                return sys;
            },
            changes: [
                {
                    caption: "Prepend a line",
                    change: sys => sys.writeFile(coreFiles[1].path, `
import * as A from '../animals';
${coreFiles[1].content}`),
                    // build core
                    timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
                }
            ]
        });

        function subProjectFiles(subProject: string, fileNames: readonly string[]): File[] {
            return fileNames.map(file => projectFile(`${subProject}/${file}`));
        }

        function projectFile(fileName: string): File {
            return getFileFromProject("demo", fileName);
        }
    });

    describe("unittests:: tsbuild:: watchMode:: with noEmitOnError", () => {
        function change(caption: string, content: string): TscWatchCompileChange {
            return {
                caption,
                change: sys => sys.writeFile(`${projectsLocation}/noEmitOnError/src/main.ts`, content),
                // build project
                timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            };
        }

        const noChange: TscWatchCompileChange = {
            caption: "No change",
            change: sys => sys.writeFile(`${projectsLocation}/noEmitOnError/src/main.ts`, sys.readFile(`${projectsLocation}/noEmitOnError/src/main.ts`)!),
            // build project
            timeouts: checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
        };
        verifyTscWatch({
            scenario: "noEmitOnError",
            subScenario: "does not emit any files on error",
            commandLineArgs: ["-b", "-w", "-verbose"],
            sys: () => createWatchedSystem(
                [
                    ...["tsconfig.json", "shared/types/db.ts", "src/main.ts", "src/other.ts"]
                        .map(f => getFileFromProject("noEmitOnError", f)),
                    { path: libFile.path, content: libContent }
                ],
                { currentDirectory: `${projectsLocation}/noEmitOnError` }
            ),
            changes: [
                noChange,
                change("Fix Syntax error", `import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};`),
                change("Semantic Error", `import { A } from "../shared/types/db";
const a: string = 10;`),
                noChange,
                change("Fix Semantic Error", `import { A } from "../shared/types/db";
const a: string = "hello";`),
                noChange,
            ],
            baselineIncremental: true
        });
    });

    describe("unittests:: tsbuild:: watchMode:: with reexport when referenced project reexports definitions from another file", () => {
        function build(sys: WatchedSystem) {
            sys.checkTimeoutQueueLengthAndRun(1); // build src/pure
            sys.checkTimeoutQueueLengthAndRun(1); // build src/main
            sys.checkTimeoutQueueLengthAndRun(1); // build src
            sys.checkTimeoutQueueLength(0);
        }
        verifyTscWatch({
            scenario: "reexport",
            subScenario: "Reports errors correctly",
            commandLineArgs: ["-b", "-w", "-verbose", "src"],
            sys: () => createWatchedSystem(
                [
                    ...[
                        "src/tsconfig.json",
                        "src/main/tsconfig.json", "src/main/index.ts",
                        "src/pure/tsconfig.json", "src/pure/index.ts", "src/pure/session.ts"
                    ]
                        .map(f => getFileFromProject("reexport", f)),
                    { path: libFile.path, content: libContent }
                ],
                { currentDirectory: `${projectsLocation}/reexport` }
            ),
            changes: [
                {
                    caption: "Introduce error",
                    change: sys => replaceFileText(sys, `${projectsLocation}/reexport/src/pure/session.ts`, "// ", ""),
                    timeouts: build,
                },
                {
                    caption: "Fix error",
                    change: sys => replaceFileText(sys, `${projectsLocation}/reexport/src/pure/session.ts`, "bar: ", "// bar: "),
                    timeouts: build
                }
            ]
        });
    });

    describe("unittests:: tsbuild:: watchMode:: configFileErrors:: reports syntax errors in config file", () => {
        function build(sys: WatchedSystem) {
            sys.checkTimeoutQueueLengthAndRun(1); // build the project
            sys.checkTimeoutQueueLength(0);
        }
        verifyTscWatch({
            scenario: "configFileErrors",
            subScenario: "reports syntax errors in config file",
            sys: () => createWatchedSystem(
                [
                    { path: `${projectRoot}/a.ts`, content: "export function foo() { }" },
                    { path: `${projectRoot}/b.ts`, content: "export function bar() { }" },
                    {
                        path: `${projectRoot}/tsconfig.json`,
                        content: Utils.dedent`
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}`
                    },
                    libFile
                ],
                { currentDirectory: projectRoot }
            ),
            commandLineArgs: ["--b", "-w"],
            changes: [
                {
                    caption: "reports syntax errors after change to config file",
                    change: sys => replaceFileText(sys, `${projectRoot}/tsconfig.json`, ",", `,
        "declaration": true,`),
                    timeouts: build,
                },
                {
                    caption: "reports syntax errors after change to ts file",
                    change: sys => replaceFileText(sys, `${projectRoot}/a.ts`, "foo", "fooBar"),
                    timeouts: build,
                },
                {
                    caption: "reports error when there is no change to tsconfig file",
                    change: sys => replaceFileText(sys, `${projectRoot}/tsconfig.json`, "", ""),
                    timeouts: build,
                },
                {
                    caption: "builds after fixing config file errors",
                    change: sys => sys.writeFile(`${projectRoot}/tsconfig.json`, JSON.stringify({
                        compilerOptions: { composite: true, declaration: true },
                        files: ["a.ts", "b.ts"]
                    })),
                    timeouts: build,
                }
            ]
        });
    });
}
