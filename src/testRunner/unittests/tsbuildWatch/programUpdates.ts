import * as ts from "../../_namespaces/ts";

import projectsLocation = ts.TestFSWithWatch.tsbuildProjectsLocation;
describe("unittests:: tsbuildWatch:: watchMode:: program updates", () => {
    const enum SubProject {
        core = "core",
        logic = "logic",
        tests = "tests",
        ui = "ui"
    }
    type ReadonlyFile = Readonly<ts.tscWatch.File>;
    /** [tsconfig, index] | [tsconfig, index, anotherModule, someDecl] */
    type SubProjectFiles = [tsconfig: ReadonlyFile, index: ReadonlyFile] | [tsconfig: ReadonlyFile, index: ReadonlyFile, anotherModule: ReadonlyFile, someDecl: ReadonlyFile];
    function projectFilePath(subProject: SubProject, baseFileName: string) {
        return `${ts.TestFSWithWatch.getTsBuildProjectFilePath("sample1", subProject)}/${baseFileName.toLowerCase()}`;
    }

    function projectFile(subProject: SubProject, baseFileName: string): ts.tscWatch.File {
        return ts.TestFSWithWatch.getTsBuildProjectFile("sample1", `${subProject}/${baseFileName}`);
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

    function changeFile(fileName: string | (() => string), content: string | (() => string), caption: string): ts.tscWatch.TscWatchCompileChange {
        return {
            caption,
            change: sys => sys.writeFile(ts.isString(fileName) ? fileName : fileName(), ts.isString(content) ? content : content()),
            timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun, // Builds core
        };
    }

    function changeCore(content: () => string, caption: string) {
        return changeFile(() => core[1].path, content, caption);
    }

    let core: SubProjectFiles;
    let logic: SubProjectFiles;
    let tests: SubProjectFiles;
    let ui: SubProjectFiles;
    let allFiles: readonly ts.tscWatch.File[];

    before(() => {
        core = subProjectFiles(SubProject.core, /*anotherModuleAndSomeDecl*/ true);
        logic = subProjectFiles(SubProject.logic);
        tests = subProjectFiles(SubProject.tests);
        ui = subProjectFiles(SubProject.ui);
        allFiles = [ts.tscWatch.libFile, ...core, ...logic, ...tests, ...ui];
    });

    after(() => {
        core = undefined!;
        logic = undefined!;
        tests = undefined!;
        ui = undefined!;
        allFiles = undefined!;
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "creates solution in watch mode",
        commandLineArgs: ["-b", "-w", `sample1/${SubProject.tests}`],
        sys: () => ts.tscWatch.createWatchedSystem(allFiles, { currentDirectory: projectsLocation }),
        changes: ts.emptyArray
    });

    it("verify building references watches only those projects", () => {
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem(allFiles, { currentDirectory: projectsLocation }));
        const host = ts.tscWatch.createSolutionBuilderWithWatchHostForBaseline(sys, cb);
        const solutionBuilder = ts.createSolutionBuilderWithWatch(host, [`sample1/${SubProject.tests}`], { watch: true });
        solutionBuilder.buildReferences(`sample1/${SubProject.tests}`);
        ts.tscWatch.runWatchBaseline({
            scenario: "programUpdates",
            subScenario: "verify building references watches only those projects",
            commandLineArgs: ["--b", "--w"],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: ts.emptyArray,
            watchOrSolution: solutionBuilder
        });
    });

    describe("validates the changes and watched files", () => {
        const newFileWithoutExtension = "newFile";
        const newFile: ts.tscWatch.File = {
            path: projectFilePath(SubProject.core, `${newFileWithoutExtension}.ts`),
            content: `export const newFileConst = 30;`
        };

        function verifyProjectChanges(subScenario: string, allFilesGetter: () => readonly ts.tscWatch.File[]) {
            const buildLogicAndTests: ts.tscWatch.TscWatchCompileChange = {
                caption: "Build logic and tests",
                change: ts.noop,
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            };

            ts.tscWatch.verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `${subScenario}/change builds changes and reports found errors message`,
                commandLineArgs: ["-b", "-w", `sample1/${SubProject.tests}`],
                sys: () => ts.tscWatch.createWatchedSystem(
                    allFilesGetter(),
                    { currentDirectory: projectsLocation }
                ),
                changes: [
                    changeCore(() => `${core[1].content}
export class someClass { }`, "Make change to core"),
                    buildLogicAndTests,
                    // Another change requeues and builds it
                    changeCore(() => core[1].content, "Revert core file"),
                    buildLogicAndTests,
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
                        timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun, // Builds core
                    },
                    buildLogicAndTests,
                ]
            });

            ts.tscWatch.verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `${subScenario}/non local change does not start build of referencing projects`,
                commandLineArgs: ["-b", "-w", `sample1/${SubProject.tests}`],
                sys: () => ts.tscWatch.createWatchedSystem(
                    allFilesGetter(),
                    { currentDirectory: projectsLocation }
                ),
                changes: [
                    changeCore(() => `${core[1].content}
function foo() { }`, "Make local change to core"),
                ]
            });

            function changeNewFile(newFileContent: string) {
                return changeFile(newFile.path, newFileContent, "Change to new File and build core");
            }
            ts.tscWatch.verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `${subScenario}/builds when new file is added, and its subsequent updates`,
                commandLineArgs: ["-b", "-w", `sample1/${SubProject.tests}`],
                sys: () => ts.tscWatch.createWatchedSystem(
                    allFilesGetter(),
                    { currentDirectory: projectsLocation }
                ),
                changes: [
                    changeNewFile(newFile.content),
                    buildLogicAndTests,
                    changeNewFile(`${newFile.content}
export class someClass2 { }`),
                    buildLogicAndTests,
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
                    const circularCoreConfig: ts.tscWatch.File = {
                        path: coreTsconfig.path,
                        content: JSON.stringify({
                            compilerOptions: { composite: true, declaration: true },
                            references: [{ path: "../tests", circular: true }]
                        })
                    };
                    return [ts.tscWatch.libFile, circularCoreConfig, ...otherCoreFiles, ...logic, ...tests];
                }
            );
        });
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "watches config files that are not present",
        commandLineArgs: ["-b", "-w", `sample1/${SubProject.tests}`],
        sys: () => ts.tscWatch.createWatchedSystem(
            [ts.tscWatch.libFile, ...core, logic[1], ...tests],
            { currentDirectory: projectsLocation }
        ),
        changes: [
            {
                caption: "Write logic tsconfig and build logic",
                change: sys => sys.writeFile(logic[0].path, logic[0].content),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun, // Builds logic
            },
            {
                caption: "Build Tests",
                change: ts.noop,
                // Build tests
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            }
        ]
    });

    describe("when referenced using prepend, builds referencing project even for non local change", () => {
        let coreIndex: ts.tscWatch.File;
        before(() => {
            coreIndex = {
                path: core[1].path,
                content: `function foo() { return 10; }`
            };
        });
        after(() => {
            coreIndex = undefined!;
        });
        const buildLogic: ts.tscWatch.TscWatchCompileChange = {
            caption: "Build logic",
            change: ts.noop,
            // Builds logic
            timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
        };
        ts.tscWatch.verifyTscWatch({
            scenario: "programUpdates",
            subScenario: "when referenced using prepend builds referencing project even for non local change",
            commandLineArgs: ["-b", "-w", `sample1/${SubProject.logic}`],
            sys: () => {
                const coreTsConfig: ts.tscWatch.File = {
                    path: core[0].path,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, declaration: true, outFile: "index.js" }
                    })
                };
                const logicTsConfig: ts.tscWatch.File = {
                    path: logic[0].path,
                    content: JSON.stringify({
                        compilerOptions: { composite: true, declaration: true, outFile: "index.js" },
                        references: [{ path: "../core", prepend: true }]
                    })
                };
                const logicIndex: ts.tscWatch.File = {
                    path: logic[1].path,
                    content: `function bar() { return foo() + 1 };`
                };
                return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, coreTsConfig, coreIndex, logicTsConfig, logicIndex], { currentDirectory: projectsLocation });
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
        const subProjectLibrary = `${projectsLocation}/sample1/Library`;
        const libraryTs: ts.tscWatch.File = {
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
        ts.tscWatch.verifyTscWatch({
            scenario: "programUpdates",
            subScenario: "when referenced project change introduces error in the down stream project and then fixes it",
            commandLineArgs: ["-b", "-w", "App"],
            sys: () => {
                const libraryTsconfig: ts.tscWatch.File = {
                    path: `${subProjectLibrary}/tsconfig.json`,
                    content: JSON.stringify({ compilerOptions: { composite: true } })
                };
                const subProjectApp = `${projectsLocation}/sample1/App`;
                const appTs: ts.tscWatch.File = {
                    path: `${subProjectApp}/app.ts`,
                    content: `import { createSomeObject } from "../Library/library";
createSomeObject().message;`
                };
                const appTsconfig: ts.tscWatch.File = {
                    path: `${subProjectApp}/tsconfig.json`,
                    content: JSON.stringify({ references: [{ path: "../Library" }] })
                };

                const files = [ts.tscWatch.libFile, libraryTs, libraryTsconfig, appTs, appTsconfig];
                return ts.tscWatch.createWatchedSystem(files, { currentDirectory: `${projectsLocation}/sample1` });
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
            ts.tscWatch.verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `reportErrors/${subScenario}`,
                commandLineArgs: ["-b", "-w", `sample1/${SubProject.tests}`, ...buildOptions],
                sys: () => ts.tscWatch.createWatchedSystem(allFiles, { currentDirectory: projectsLocation }),
                changes: [
                    {
                        caption: "change logic",
                        change: sys => sys.writeFile(logic[1].path, `${logic[1].content}
let y: string = 10;`),
                        // Builds logic
                        timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
                    },
                    {
                        caption: "change core",
                        change: sys => sys.writeFile(core[1].path, `${core[1].content}
let x: string = 10;`),
                        // Builds core
                        timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
                    }
                ]
            });
        }
        verifyIncrementalErrors("when preserveWatchOutput is not used", ts.emptyArray);
        verifyIncrementalErrors("when preserveWatchOutput is passed on command line", ["--preserveWatchOutput"]);

        describe("when declaration emit errors are present", () => {
            const solution = "solution";
            const subProject = "app";
            const subProjectLocation = `${projectsLocation}/${solution}/${subProject}`;
            const fileWithError: ts.tscWatch.File = {
                path: `${subProjectLocation}/fileWithError.ts`,
                content: `export var myClassWithError = class {
        tags() { }
        private p = 12
    };`
            };
            const fileWithFixedError: ts.tscWatch.File = {
                path: fileWithError.path,
                content: fileWithError.content.replace("private p = 12", "")
            };
            const fileWithoutError: ts.tscWatch.File = {
                path: `${subProjectLocation}/fileWithoutError.ts`,
                content: `export class myClass { }`
            };
            const tsconfig: ts.tscWatch.File = {
                path: `${subProjectLocation}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true } })
            };

            function incrementalBuild(sys: ts.tscWatch.WatchedSystem) {
                sys.checkTimeoutQueueLengthAndRun(1); // Build the app
                sys.checkTimeoutQueueLength(0);
            }

            const fixError: ts.tscWatch.TscWatchCompileChange = {
                caption: "Fix error in fileWithError",
                // Fix error
                change: sys => sys.writeFile(fileWithError.path, fileWithFixedError.content),
                timeouts: incrementalBuild
            };

            const changeFileWithoutError: ts.tscWatch.TscWatchCompileChange = {
                caption: "Change fileWithoutError",
                change: sys => sys.writeFile(fileWithoutError.path, fileWithoutError.content.replace(/myClass/g, "myClass2")),
                timeouts: incrementalBuild
            };

            ts.tscWatch.verifyTscWatch({
                scenario: "programUpdates",
                subScenario: "reportErrors/declarationEmitErrors/when fixing error files all files are emitted",
                commandLineArgs: ["-b", "-w", subProject],
                sys: () => ts.tscWatch.createWatchedSystem(
                    [ts.tscWatch.libFile, fileWithError, fileWithoutError, tsconfig],
                    { currentDirectory: `${projectsLocation}/${solution}` }
                ),
                changes: [
                    fixError
                ]
            });

            ts.tscWatch.verifyTscWatch({
                scenario: "programUpdates",
                subScenario: "reportErrors/declarationEmitErrors/when file with no error changes",
                commandLineArgs: ["-b", "-w", subProject],
                sys: () => ts.tscWatch.createWatchedSystem(
                    [ts.tscWatch.libFile, fileWithError, fileWithoutError, tsconfig],
                    { currentDirectory: `${projectsLocation}/${solution}` }
                ),
                changes: [
                    changeFileWithoutError
                ]
            });

            describe("when reporting errors on introducing error", () => {
                const introduceError: ts.tscWatch.TscWatchCompileChange = {
                    caption: "Introduce error",
                    change: sys => sys.writeFile(fileWithError.path, fileWithError.content),
                    timeouts: incrementalBuild,
                };

                ts.tscWatch.verifyTscWatch({
                    scenario: "programUpdates",
                    subScenario: "reportErrors/declarationEmitErrors/introduceError/when fixing errors only changed file is emitted",
                    commandLineArgs: ["-b", "-w", subProject],
                    sys: () => ts.tscWatch.createWatchedSystem(
                        [ts.tscWatch.libFile, fileWithFixedError, fileWithoutError, tsconfig],
                        { currentDirectory: `${projectsLocation}/${solution}` }
                    ),
                    changes: [
                        introduceError,
                        fixError
                    ]
                });

                ts.tscWatch.verifyTscWatch({
                    scenario: "programUpdates",
                    subScenario: "reportErrors/declarationEmitErrors/introduceError/when file with no error changes",
                    commandLineArgs: ["-b", "-w", subProject],
                    sys: () => ts.tscWatch.createWatchedSystem(
                        [ts.tscWatch.libFile, fileWithFixedError, fileWithoutError, tsconfig],
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

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "incremental updates in verbose mode",
        commandLineArgs: ["-b", "-w", `sample1/${SubProject.tests}`, "-verbose"],
        sys: () => ts.tscWatch.createWatchedSystem(allFiles, { currentDirectory: projectsLocation }),
        changes: [
            {
                caption: "Make non dts change",
                change: sys => sys.writeFile(logic[1].path, `${logic[1].content}
function someFn() { }`),
                timeouts: sys => {
                    sys.checkTimeoutQueueLengthAndRun(1); // build logic and updates tests
                    sys.checkTimeoutQueueLength(0);
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

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "works when noUnusedParameters changes to false",
        commandLineArgs: ["-b", "-w"],
        sys: () => {
            const index: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/index.ts`,
                content: `const fn = (a: string, b: string) => b;`
            };
            const configFile: ts.tscWatch.File = {
                path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        noUnusedParameters: true
                    }
                })
            };
            return ts.tscWatch.createWatchedSystem([index, configFile, ts.tscWatch.libFile], { currentDirectory: ts.tscWatch.projectRoot });
        },
        changes: [
            {
                caption: "Change tsconfig to set noUnusedParameters to false",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/tsconfig.json`, JSON.stringify({
                    compilerOptions: {
                        noUnusedParameters: false
                    }
                })),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "should not trigger recompilation because of program emit",
        commandLineArgs: ["-b", "-w", `sample1/${SubProject.core}`, "-verbose"],
        sys: () => ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, ...core], { currentDirectory: projectsLocation }),
        changes: [
            ts.tscWatch.noopChange,
            {
                caption: "Add new file",
                change: sys => sys.writeFile(`sample1/${SubProject.core}/file3.ts`, `export const y = 10;`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            ts.tscWatch.noopChange,
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "should not trigger recompilation because of program emit with outDir specified",
        commandLineArgs: ["-b", "-w", `sample1/${SubProject.core}`, "-verbose"],
        sys: () => {
            const [coreConfig, ...rest] = core;
            const newCoreConfig: ts.tscWatch.File = { path: coreConfig.path, content: JSON.stringify({ compilerOptions: { composite: true, outDir: "outDir" } }) };
            return ts.tscWatch.createWatchedSystem([ts.tscWatch.libFile, newCoreConfig, ...rest], { currentDirectory: projectsLocation });
        },
        changes: [
            ts.tscWatch.noopChange,
            {
                caption: "Add new file",
                change: sys => sys.writeFile(`sample1/${SubProject.core}/file3.ts`, `export const y = 10;`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            ts.tscWatch.noopChange
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "works with extended source files",
        commandLineArgs: ["-b", "-w", "-v", "project1.tsconfig.json", "project2.tsconfig.json"],
        sys: () => {
            const alphaExtendedConfigFile: ts.tscWatch.File = {
                path: "/a/b/alpha.tsconfig.json",
                content: "{}"
            };
            const project1Config: ts.tscWatch.File = {
                path: "/a/b/project1.tsconfig.json",
                content: JSON.stringify({
                    extends: "./alpha.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [ts.tscWatch.commonFile1.path, ts.tscWatch.commonFile2.path]
                })
            };
            const bravoExtendedConfigFile: ts.tscWatch.File = {
                path: "/a/b/bravo.tsconfig.json",
                content: JSON.stringify({
                    extends: "./alpha.tsconfig.json"
                })
            };
            const otherFile: ts.tscWatch.File = {
                path: "/a/b/other.ts",
                content: "let z = 0;",
            };
            const project2Config: ts.tscWatch.File = {
                path: "/a/b/project2.tsconfig.json",
                content: JSON.stringify({
                    extends: "./bravo.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [otherFile.path]
                })
            };
            return ts.tscWatch.createWatchedSystem([
                ts.tscWatch.libFile,
                alphaExtendedConfigFile, project1Config, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2,
                bravoExtendedConfigFile, project2Config, otherFile
            ], { currentDirectory: "/a/b" });
        },
        changes: [
            {
                caption: "Modify alpha config",
                change: sys => sys.writeFile("/a/b/alpha.tsconfig.json", JSON.stringify({
                    compilerOptions: { strict: true }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun // Build project1
            },
            {
                caption: "Build project 2",
                change: ts.noop,
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout // Build project2
            },
            {
                caption: "change bravo config",
                change: sys => sys.writeFile("/a/b/bravo.tsconfig.json", JSON.stringify({
                    extends: "./alpha.tsconfig.json",
                    compilerOptions: { strict: false }
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout // Build project2
            },
            {
                caption: "project 2 extends alpha",
                change: sys => sys.writeFile("/a/b/project2.tsconfig.json", JSON.stringify({
                    extends: "./alpha.tsconfig.json",
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout // Build project2
            },
            {
                caption: "update aplha config",
                change: sys => sys.writeFile("/a/b/alpha.tsconfig.json", "{}"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun, // build project1
            },
            {
                caption: "Build project 2",
                change: ts.noop,
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout // Build project2
            },
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "works correctly when project with extended config is removed",
        commandLineArgs: ["-b", "-w", "-v"],
        sys: () => {
            const alphaExtendedConfigFile: ts.tscWatch.File = {
                path: "/a/b/alpha.tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        strict: true
                    }
                })
            };
            const project1Config: ts.tscWatch.File = {
                path: "/a/b/project1.tsconfig.json",
                content: JSON.stringify({
                    extends: "./alpha.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [ts.tscWatch.commonFile1.path, ts.tscWatch.commonFile2.path]
                })
            };
            const bravoExtendedConfigFile: ts.tscWatch.File = {
                path: "/a/b/bravo.tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        strict: true
                    }
                })
            };
            const otherFile: ts.tscWatch.File = {
                path: "/a/b/other.ts",
                content: "let z = 0;",
            };
            const project2Config: ts.tscWatch.File = {
                path: "/a/b/project2.tsconfig.json",
                content: JSON.stringify({
                    extends: "./bravo.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [otherFile.path]
                })
            };
            const configFile: ts.tscWatch.File = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    references: [
                        {
                            path: "./project1.tsconfig.json",
                        },
                        {
                            path: "./project2.tsconfig.json",
                        },
                    ],
                    files: [],
                })
            };
            return ts.tscWatch.createWatchedSystem([
                ts.tscWatch.libFile, configFile,
                alphaExtendedConfigFile, project1Config, ts.tscWatch.commonFile1, ts.tscWatch.commonFile2,
                bravoExtendedConfigFile, project2Config, otherFile
            ], { currentDirectory: "/a/b" });
        },
        changes: [
            {
                caption: "Remove project2 from base config",
                change: sys => sys.modifyFile("/a/b/tsconfig.json", JSON.stringify({
                    references: [
                        {
                            path: "./project1.tsconfig.json",
                        },
                    ],
                    files: [],
                })),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout,
            }
        ]
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "tsbuildinfo has error",
        sys: () => ts.tscWatch.createWatchedSystem({
            "/src/project/main.ts": "export const x = 10;",
            "/src/project/tsconfig.json": "{}",
            "/src/project/tsconfig.tsbuildinfo": "Some random string",
            [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
        }),
        commandLineArgs: ["--b", "src/project", "-i", "-w"],
        changes: ts.emptyArray
    });
});