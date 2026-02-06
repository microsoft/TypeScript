import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { createBaseline } from "../helpers/baseline.js";
import {
    getFsContentsForSampleProjectReferencesLogicConfig,
    getSysForSampleProjectReferences,
} from "../helpers/sampleProjectReferences.js";
import {
    createSolutionBuilderWithWatchHostForBaseline,
    noopChange,
    runWatchBaseline,
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: programUpdates::", () => {
    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "creates solution in watch mode",
        commandLineArgs: ["-b", "-w", "tests"],
        sys: getSysForSampleProjectReferences,
    });

    it("verify building references watches only those projects", () => {
        const { sys, baseline, cb, getPrograms } = createBaseline(getSysForSampleProjectReferences());
        const host = createSolutionBuilderWithWatchHostForBaseline(sys, cb);
        const solutionBuilder = ts.createSolutionBuilderWithWatch(host, ["tests"], { watch: true });
        solutionBuilder.buildReferences("tests");
        runWatchBaseline({
            scenario: "programUpdates",
            subScenario: "verify building references watches only those projects",
            commandLineArgs: ["--b", "--w"],
            sys,
            baseline,
            getPrograms,
            watchOrSolution: solutionBuilder,
        });
    });

    describe("validates the changes and watched files", () => {
        function verifyProjectChanges(subScenario: string, sys: () => TestServerHost) {
            const buildLogicAndTests: TscWatchCompileChange = {
                caption: "Build logic and tests",
                edit: ts.noop,
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            };

            verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `${subScenario}/change builds changes and reports found errors message`,
                commandLineArgs: ["-b", "-w", "tests"],
                sys,
                edits: [
                    {
                        caption: "Make change to core",
                        edit: sys => sys.appendFile("core/index.ts", `\nexport class someClass { }`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
                    },
                    buildLogicAndTests,
                    // Another change requeues and builds it
                    {
                        caption: "Revert core file",
                        edit: sys => sys.replaceFileText("core/index.ts", `\nexport class someClass { }`, ""),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
                    },
                    buildLogicAndTests,
                    {
                        caption: "Make two changes",
                        edit: sys => {
                            sys.appendFile("core/index.ts", `\nexport class someClass { }`);
                            sys.appendFile("core/index.ts", `\nexport class someClass2 { }`);
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
                    },
                    buildLogicAndTests,
                ],
            });

            verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `${subScenario}/non local change does not start build of referencing projects`,
                commandLineArgs: ["-b", "-w", "tests"],
                sys,
                edits: [{
                    caption: "Make local change to core",
                    edit: sys => sys.appendFile("core/index.ts", `\nfunction foo() { }`),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
                }],
            });

            verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `${subScenario}/builds when new file is added, and its subsequent updates`,
                commandLineArgs: ["-b", "-w", "tests"],
                sys,
                edits: [
                    {
                        caption: "Change to new File and build core",
                        edit: sys => sys.writeFile("core/newfile.ts", `export const newFileConst = 30;`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
                    },
                    buildLogicAndTests,
                    {
                        caption: "Change to new File and build core",
                        edit: sys => sys.appendFile("core/newfile.ts", `\nexport class someClass2 { }`),
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
                    },
                    buildLogicAndTests,
                ],
            });
        }

        describe("with simple project reference graph", () => {
            verifyProjectChanges(
                "with simple project reference graph",
                getSysForSampleProjectReferences,
            );
        });

        describe("with circular project reference", () => {
            verifyProjectChanges(
                "with circular project reference",
                () => {
                    const sys = getSysForSampleProjectReferences();
                    sys.writeFile(
                        "core/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { composite: true, declaration: true },
                            references: [{ path: "../tests", circular: true }],
                        }),
                    );
                    return sys;
                },
            );
        });
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "watches config files that are not present",
        commandLineArgs: ["-b", "-w", "tests"],
        sys: () => {
            const sys = getSysForSampleProjectReferences();
            sys.deleteFile("logic/tsconfig.json");
            return sys;
        },
        edits: [
            {
                caption: "Write logic tsconfig and build logic",
                edit: sys => sys.writeFile("logic/tsconfig.json", getFsContentsForSampleProjectReferencesLogicConfig()),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds logic
            },
            {
                caption: "Build Tests",
                edit: ts.noop,
                // Build tests
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "with outFile and non local change",
        commandLineArgs: ["-b", "-w", "sample1/logic"],
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/user/username/workspaces/solution/sample1/core/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true, declaration: true, outFile: "index.js" },
                }),
                "/user/username/workspaces/solution/sample1/core/index.ts": `function foo() { return 10; }`,
                "/user/username/workspaces/solution/sample1/logic/tsconfig.json": jsonToReadableText({
                    compilerOptions: { composite: true, declaration: true, outFile: "index.js" },
                    references: [{ path: "../core" }],
                }),
                "/user/username/workspaces/solution/sample1/logic/index.ts": `function bar() { return foo() + 1 };`,
            }, { currentDirectory: "/user/username/workspaces/solution" }),
        edits: [
            {
                caption: "Make non local change and build core",
                edit: sys => sys.appendFile("sample1/core/index.ts", `\nfunction myFunc() { return 10; }`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
            },
            {
                caption: "Build logic",
                edit: ts.noop,
                // Builds logic
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Make local change and build core",
                edit: sys => sys.replaceFileText("sample1/core/index.ts", `\nfunction myFunc() { return 10; }`, `\nfunction myFunc() { return 100; }`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Builds core
            },
            {
                caption: "Build logic",
                edit: ts.noop,
                // Builds logic
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    describe("when referenced project change introduces error in the down stream project and then fixes it", () => {
        const subProjectLibrary = `${"/user/username/projects"}/sample1/Library`;
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
}`,
        };
        verifyTscWatch({
            scenario: "programUpdates",
            subScenario: "when referenced project change introduces error in the down stream project and then fixes it",
            commandLineArgs: ["-b", "-w", "App"],
            sys: () => {
                const libraryTsconfig: File = {
                    path: `${subProjectLibrary}/tsconfig.json`,
                    content: jsonToReadableText({ compilerOptions: { composite: true } }),
                };
                const subProjectApp = `${"/user/username/projects"}/sample1/App`;
                const appTs: File = {
                    path: `${subProjectApp}/app.ts`,
                    content: `import { createSomeObject } from "../Library/library";
createSomeObject().message;`,
                };
                const appTsconfig: File = {
                    path: `${subProjectApp}/tsconfig.json`,
                    content: jsonToReadableText({ references: [{ path: "../Library" }] }),
                };

                const files = [libraryTs, libraryTsconfig, appTs, appTsconfig];
                return TestServerHost.createWatchedSystem(files, { currentDirectory: `${"/user/username/projects"}/sample1` });
            },
            edits: [
                {
                    caption: "Introduce error",
                    // Change message in library to message2
                    edit: sys => sys.writeFile(libraryTs.path, libraryTs.content.replace(/message/g, "message2")),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Build library
                        sys.runQueuedTimeoutCallbacks(); // Build App
                    },
                },
                {
                    caption: "Fix error",
                    // Revert library changes
                    edit: sys => sys.writeFile(libraryTs.path, libraryTs.content),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks(); // Build library
                        sys.runQueuedTimeoutCallbacks(); // Build App
                    },
                },
            ],
        });
    });

    describe("reports errors in all projects on incremental compile", () => {
        function verifyIncrementalErrors(subScenario: string, buildOptions: readonly string[]) {
            verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `reportErrors/${subScenario}`,
                commandLineArgs: ["-b", "-w", "tests", ...buildOptions],
                sys: getSysForSampleProjectReferences,
                edits: [
                    {
                        caption: "change logic",
                        edit: sys => sys.appendFile("logic/index.ts", `\nlet y: string = 10;`),
                        // Builds logic
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "change core",
                        edit: sys => sys.appendFile("core/index.ts", `\nlet x: string = 10;`),
                        // Builds core
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                        },
                    },
                    {
                        caption: "fix error in logic",
                        edit: sys => sys.replaceFileText("logic/index.ts", `\nlet y: string = 10;`, ""),
                        // Builds logic
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                ],
            });
        }
        verifyIncrementalErrors("when preserveWatchOutput is not used", ts.emptyArray);
        verifyIncrementalErrors("when preserveWatchOutput is passed on command line", ["--preserveWatchOutput"]);
        verifyIncrementalErrors("when stopBuildOnErrors is passed on command line", ["--stopBuildOnErrors"]);

        [false, true].forEach(skipReferenceCoreFromTest =>
            verifyTscWatch({
                scenario: "programUpdates",
                subScenario: `skips builds downstream projects if upstream projects have errors with stopBuildOnErrors${skipReferenceCoreFromTest ? " when test does not reference core" : ""}`,
                sys: () => {
                    const sys = getSysForSampleProjectReferences(/*withNodeNext*/ undefined, skipReferenceCoreFromTest);
                    sys.appendFile("core/index.ts", `multiply();`);
                    return sys;
                },
                commandLineArgs: ["--b", "-w", "tests", "--verbose", "--stopBuildOnErrors"],
                edits: [{
                    caption: "fix error",
                    edit: sys => sys.replaceFileText("core/index.ts", "multiply();", ""),
                    timeouts: sys => {
                        sys.runQueuedTimeoutCallbacks();
                        sys.runQueuedTimeoutCallbacks();
                    },
                }],
            })
        );

        describe("when declaration emit errors are present", () => {
            const solution = "solution";
            const subProject = "app";
            const subProjectLocation = `${"/user/username/projects"}/${solution}/${subProject}`;
            const fileWithError: File = {
                path: `${subProjectLocation}/fileWithError.ts`,
                content: `export var myClassWithError = class {
        tags() { }
        private p = 12
    };`,
            };
            const fileWithFixedError: File = {
                path: fileWithError.path,
                content: fileWithError.content.replace("private p = 12", ""),
            };
            const fileWithoutError: File = {
                path: `${subProjectLocation}/fileWithoutError.ts`,
                content: `export class myClass { }`,
            };
            const tsconfig: File = {
                path: `${subProjectLocation}/tsconfig.json`,
                content: jsonToReadableText({ compilerOptions: { composite: true } }),
            };

            const fixError: TscWatchCompileChange = {
                caption: "Fix error in fileWithError",
                // Fix error
                edit: sys => sys.writeFile(fileWithError.path, fileWithFixedError.content),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            };

            const changeFileWithoutError: TscWatchCompileChange = {
                caption: "Change fileWithoutError",
                edit: sys => sys.writeFile(fileWithoutError.path, fileWithoutError.content.replace(/myClass/g, "myClass2")),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            };

            verifyTscWatch({
                scenario: "programUpdates",
                subScenario: "reportErrors/declarationEmitErrors/when fixing error files all files are emitted",
                commandLineArgs: ["-b", "-w", subProject],
                sys: () =>
                    TestServerHost.createWatchedSystem(
                        [fileWithError, fileWithoutError, tsconfig],
                        { currentDirectory: `${"/user/username/projects"}/${solution}` },
                    ),
                edits: [
                    fixError,
                ],
            });

            verifyTscWatch({
                scenario: "programUpdates",
                subScenario: "reportErrors/declarationEmitErrors/when file with no error changes",
                commandLineArgs: ["-b", "-w", subProject],
                sys: () =>
                    TestServerHost.createWatchedSystem(
                        [fileWithError, fileWithoutError, tsconfig],
                        { currentDirectory: `${"/user/username/projects"}/${solution}` },
                    ),
                edits: [
                    changeFileWithoutError,
                ],
            });

            describe("when reporting errors on introducing error", () => {
                const introduceError: TscWatchCompileChange = {
                    caption: "Introduce error",
                    edit: sys => sys.writeFile(fileWithError.path, fileWithError.content),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                };

                verifyTscWatch({
                    scenario: "programUpdates",
                    subScenario: "reportErrors/declarationEmitErrors/introduceError/when fixing errors only changed file is emitted",
                    commandLineArgs: ["-b", "-w", subProject],
                    sys: () =>
                        TestServerHost.createWatchedSystem(
                            [fileWithFixedError, fileWithoutError, tsconfig],
                            { currentDirectory: `${"/user/username/projects"}/${solution}` },
                        ),
                    edits: [
                        introduceError,
                        fixError,
                    ],
                });

                verifyTscWatch({
                    scenario: "programUpdates",
                    subScenario: "reportErrors/declarationEmitErrors/introduceError/when file with no error changes",
                    commandLineArgs: ["-b", "-w", subProject],
                    sys: () =>
                        TestServerHost.createWatchedSystem(
                            [fileWithFixedError, fileWithoutError, tsconfig],
                            { currentDirectory: `${"/user/username/projects"}/${solution}` },
                        ),
                    edits: [
                        introduceError,
                        changeFileWithoutError,
                    ],
                });
            });
        });
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "incremental updates in verbose mode",
        commandLineArgs: ["-b", "-w", "tests", "-verbose"],
        sys: getSysForSampleProjectReferences,
        edits: [
            {
                caption: "Make non dts change",
                edit: sys => sys.appendFile("logic/index.ts", `\nfunction someFn() { }`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build logic and updates tests
            },
            {
                caption: "Make dts change",
                edit: sys => sys.replaceFileText("logic/index.ts", `\nfunction someFn() { }`, `\nexport function someFn() { }`),
                timeouts: sys => {
                    sys.runQueuedTimeoutCallbacks(); // build logic
                    sys.runQueuedTimeoutCallbacks(); // build tests
                },
            },
        ],
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "works when noUnusedParameters changes to false",
        commandLineArgs: ["-b", "-w"],
        sys: () => {
            const index: File = {
                path: `/user/username/projects/myproject/index.ts`,
                content: `const fn = (a: string, b: string) => b;`,
            };
            const configFile: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        noUnusedParameters: true,
                    },
                }),
            };
            return TestServerHost.createWatchedSystem([index, configFile], { currentDirectory: "/user/username/projects/myproject" });
        },
        edits: [
            {
                caption: "Change tsconfig to set noUnusedParameters to false",
                edit: sys =>
                    sys.writeFile(
                        `/user/username/projects/myproject/tsconfig.json`,
                        jsonToReadableText({
                            compilerOptions: {
                                noUnusedParameters: false,
                            },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "should not trigger recompilation because of program emit",
        commandLineArgs: ["-b", "-w", "core", "-verbose"],
        sys: getSysForSampleProjectReferences,
        edits: [
            noopChange,
            {
                caption: "Add new file",
                edit: sys => sys.writeFile("core/file3.ts", `export const y = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            noopChange,
        ],
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "should not trigger recompilation because of program emit with outDir specified",
        commandLineArgs: ["-b", "-w", "core", "-verbose"],
        sys: () => {
            const sys = getSysForSampleProjectReferences();
            sys.writeFile(
                "core/tsconfig.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, outDir: "outDir" },
                }),
            );
            return sys;
        },
        edits: [
            noopChange,
            {
                caption: "Add new file",
                edit: sys => sys.writeFile("core/file3.ts", `export const y = 10;`),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            noopChange,
        ],
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "works with extended source files",
        commandLineArgs: ["-b", "-w", "-v", "project1.tsconfig.json", "project2.tsconfig.json", "project3.tsconfig.json"],
        sys: () => {
            const commonFile1: File = {
                path: "/user/username/projects/project/commonFile1.ts",
                content: "let x = 1",
            };
            const commonFile2: File = {
                path: "/user/username/projects/project/commonFile2.ts",
                content: "let y = 1",
            };
            const alphaExtendedConfigFile: File = {
                path: "/user/username/projects/project/alpha.tsconfig.json",
                content: "{}",
            };
            const project1Config: File = {
                path: "/user/username/projects/project/project1.tsconfig.json",
                content: jsonToReadableText({
                    extends: "./alpha.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [commonFile1.path, commonFile2.path],
                }),
            };
            const bravoExtendedConfigFile: File = {
                path: "/user/username/projects/project/bravo.tsconfig.json",
                content: jsonToReadableText({
                    extends: "./alpha.tsconfig.json",
                }),
            };
            const otherFile: File = {
                path: "/user/username/projects/project/other.ts",
                content: "let z = 0;",
            };
            const project2Config: File = {
                path: "/user/username/projects/project/project2.tsconfig.json",
                content: jsonToReadableText({
                    extends: "./bravo.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [otherFile.path],
                }),
            };
            const otherFile2: File = {
                path: "/user/username/projects/project/other2.ts",
                content: "let k = 0;",
            };
            const extendsConfigFile1: File = {
                path: "/user/username/projects/project/extendsConfig1.tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                    },
                }),
            };
            const extendsConfigFile2: File = {
                path: "/user/username/projects/project/extendsConfig2.tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        strictNullChecks: false,
                    },
                }),
            };
            const extendsConfigFile3: File = {
                path: "/user/username/projects/project/extendsConfig3.tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        noImplicitAny: true,
                    },
                }),
            };
            const project3Config: File = {
                path: "/user/username/projects/project/project3.tsconfig.json",
                content: jsonToReadableText({
                    extends: [
                        "./extendsConfig1.tsconfig.json",
                        "./extendsConfig2.tsconfig.json",
                        "./extendsConfig3.tsconfig.json",
                    ],
                    compilerOptions: {
                        composite: false,
                    },
                    files: [otherFile2.path],
                }),
            };
            return TestServerHost.createWatchedSystem([
                alphaExtendedConfigFile,
                project1Config,
                commonFile1,
                commonFile2,
                bravoExtendedConfigFile,
                project2Config,
                otherFile,
                otherFile2,
                extendsConfigFile1,
                extendsConfigFile2,
                extendsConfigFile3,
                project3Config,
            ], { currentDirectory: "/user/username/projects/project" });
        },
        edits: [
            {
                caption: "Modify alpha config",
                edit: sys =>
                    sys.writeFile(
                        "/user/username/projects/project/alpha.tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { strict: true },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project1
            },
            {
                caption: "Build project 2",
                edit: ts.noop,
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project2
            },
            {
                caption: "change bravo config",
                edit: sys =>
                    sys.writeFile(
                        "/user/username/projects/project/bravo.tsconfig.json",
                        jsonToReadableText({
                            extends: "./alpha.tsconfig.json",
                            compilerOptions: { strict: false },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project2
            },
            {
                caption: "project 2 extends alpha",
                edit: sys =>
                    sys.writeFile(
                        "/user/username/projects/project/project2.tsconfig.json",
                        jsonToReadableText({
                            extends: "./alpha.tsconfig.json",
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project2
            },
            {
                caption: "update aplha config",
                edit: sys => sys.writeFile("/user/username/projects/project/alpha.tsconfig.json", "{}"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // build project1
            },
            {
                caption: "Build project 2",
                edit: ts.noop,
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project3
            },
            {
                caption: "Modify extendsConfigFile2",
                edit: sys =>
                    sys.writeFile(
                        "/user/username/projects/project/extendsConfig2.tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { strictNullChecks: true },
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project3
            },
            {
                caption: "Modify project 3",
                edit: sys =>
                    sys.writeFile(
                        "/user/username/projects/project/project3.tsconfig.json",
                        jsonToReadableText({
                            extends: ["./extendsConfig1.tsconfig.json", "./extendsConfig2.tsconfig.json"],
                            compilerOptions: { composite: false },
                            files: ["/user/username/projects/project/other2.ts"],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project3
            },
            {
                caption: "Delete extendedConfigFile2 and report error",
                edit: sys => sys.deleteFile("./extendsConfig2.tsconfig.json"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(), // Build project3
            },
        ],
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "works correctly when project with extended config is removed",
        commandLineArgs: ["-b", "-w", "-v"],
        sys: () => {
            const commonFile1: File = {
                path: "/user/username/projects/project/commonFile1.ts",
                content: "let x = 1",
            };
            const commonFile2: File = {
                path: "/user/username/projects/project/commonFile2.ts",
                content: "let y = 1",
            };
            const alphaExtendedConfigFile: File = {
                path: "/user/username/projects/project/alpha.tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        strict: true,
                    },
                }),
            };
            const project1Config: File = {
                path: "/user/username/projects/project/project1.tsconfig.json",
                content: jsonToReadableText({
                    extends: "./alpha.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [commonFile1.path, commonFile2.path],
                }),
            };
            const bravoExtendedConfigFile: File = {
                path: "/user/username/projects/project/bravo.tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        strict: true,
                    },
                }),
            };
            const otherFile: File = {
                path: "/user/username/projects/project/other.ts",
                content: "let z = 0;",
            };
            const project2Config: File = {
                path: "/user/username/projects/project/project2.tsconfig.json",
                content: jsonToReadableText({
                    extends: "./bravo.tsconfig.json",
                    compilerOptions: {
                        composite: true,
                    },
                    files: [otherFile.path],
                }),
            };
            const configFile: File = {
                path: "/user/username/projects/project/tsconfig.json",
                content: jsonToReadableText({
                    references: [
                        {
                            path: "./project1.tsconfig.json",
                        },
                        {
                            path: "./project2.tsconfig.json",
                        },
                    ],
                    files: [],
                }),
            };
            return TestServerHost.createWatchedSystem([
                configFile,
                alphaExtendedConfigFile,
                project1Config,
                commonFile1,
                commonFile2,
                bravoExtendedConfigFile,
                project2Config,
                otherFile,
            ], { currentDirectory: "/user/username/projects/project" });
        },
        edits: [
            {
                caption: "Remove project2 from base config",
                edit: sys =>
                    sys.modifyFile(
                        "/user/username/projects/project/tsconfig.json",
                        jsonToReadableText({
                            references: [
                                {
                                    path: "./project1.tsconfig.json",
                                },
                            ],
                            files: [],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
    });

    verifyTscWatch({
        scenario: "programUpdates",
        subScenario: "tsbuildinfo has error",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/user/username/projects/project/main.ts": "export const x = 10;",
                "/user/username/projects/project/tsconfig.json": "{}",
                "/user/username/projects/project/tsconfig.tsbuildinfo": "Some random string",
            }, { currentDirectory: "/user/username/projects/project" }),
        commandLineArgs: ["--b", "-i", "-w"],
    });
});
