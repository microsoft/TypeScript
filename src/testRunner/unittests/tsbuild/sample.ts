import { Baseline } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    fakeTsVersion,
    patchHostForBuildInfoReadWrite,
} from "../helpers/baseline.js";
import { getTypeScriptLibTestLocation } from "../helpers/contents.js";
import {
    getSysForSampleProjectReferences,
    getSysForSampleProjectReferencesBuilt,
} from "../helpers/sampleProjectReferences.js";
import {
    createSolutionBuilderHostForBaseline,
    verifySolutionBuilderWithDifferentTsVersion,
} from "../helpers/solutionBuilder.js";
import {
    noChangeOnlyRuns,
    noChangeRun,
    TestTscEdit,
    verifyTsc,
} from "../helpers/tsc.js";
import {
    changeToHostTrackingWrittenFiles,
    libFile,
    SerializeOutputOrder,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: on 'sample1' project", () => {
    describe("sanity check of clean build of 'sample1' project", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "builds correctly when outDir is specified",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests"],
            modifySystem: sys =>
                sys.writeFile(
                    "logic/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: { composite: true, declaration: true, sourceMap: true, outDir: "outDir" },
                        references: [{ path: "../core" }],
                    }),
                ),
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "builds correctly when declarationDir is specified",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests"],
            modifySystem: sys =>
                sys.writeFile(
                    "logic/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: { composite: true, declaration: true, sourceMap: true, declarationDir: "out/decls" },
                        references: [{ path: "../core" }],
                    }),
                ),
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "builds correctly when project is not composite or doesnt have any references",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "core", "--verbose"],
            modifySystem: sys => sys.replaceFileText("core/tsconfig.json", `"composite": true,`, ""),
        });
    });

    describe("dry builds", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "does not write any files in a dry build",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--dry"],
        });
    });

    describe("clean builds", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "removes all files it built",
            sys: getSysForSampleProjectReferencesBuilt,
            commandLineArgs: ["--b", "tests", "--clean"],
            edits: noChangeOnlyRuns,
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "cleans till project specified",
            sys: getSysForSampleProjectReferencesBuilt,
            commandLineArgs: ["--b", "logic", "--clean"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], {});
                sys.exit(builder.clean("logic"));
                return buildHost.getPrograms;
            },
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "cleaning project in not build order doesnt throw error",
            sys: getSysForSampleProjectReferencesBuilt,
            commandLineArgs: ["--b", "logic2", "--clean"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], {});
                sys.exit(builder.clean("logic2"));
                return buildHost.getPrograms;
            },
        });
    });

    describe("force builds", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "always builds under with force option",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--force"],
            edits: noChangeOnlyRuns,
        });
    });

    describe("can detect when and what to rebuild", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "can detect when and what to rebuild",
            sys: getSysForSampleProjectReferencesBuilt,
            commandLineArgs: ["--b", "tests", "--verbose"],
            edits: [
                // Update a file in the leaf node (tests), only it should rebuild the last one
                {
                    caption: "Only builds the leaf node project",
                    edit: sys => sys.writeFile("tests/index.ts", "const m = 10;"),
                },
                // Update a file in the parent (without affecting types), should get fast downstream builds
                {
                    caption: "Detects type-only changes in upstream projects",
                    edit: sys => sys.replaceFileText("core/index.ts", "HELLO WORLD", "WELCOME PLANET"),
                },
                {
                    caption: "rebuilds when tsconfig changes",
                    edit: sys => sys.replaceFileText("tests/tsconfig.json", `"composite": true`, `"composite": true, "target": "es2020"`),
                },
            ],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "when input file text does not change but its modified time changes",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--verbose"],
            edits: [{
                caption: "upstream project changes without changing file text",
                edit: sys => sys.setModifiedTime("core/index.ts", sys.now()),
            }],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "when declarationMap changes",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--verbose"],
            edits: [
                {
                    caption: "Disable declarationMap",
                    edit: sys => sys.replaceFileText("core/tsconfig.json", `"declarationMap": true,`, `"declarationMap": false,`),
                },
                {
                    caption: "Enable declarationMap",
                    edit: sys => sys.replaceFileText("core/tsconfig.json", `"declarationMap": false,`, `"declarationMap": true,`),
                },
            ],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "indicates that it would skip builds during a dry build",
            sys: getSysForSampleProjectReferencesBuilt,
            commandLineArgs: ["--b", "tests", "--dry"],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "rebuilds from start if force option is set",
            sys: getSysForSampleProjectReferencesBuilt,
            commandLineArgs: ["--b", "tests", "--verbose", "--force"],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "tsbuildinfo has error",
            sys: () =>
                TestServerHost.createWatchedSystem({
                    "/home/src/workspaces/project/main.ts": "export const x = 10;",
                    "/home/src/workspaces/project/tsconfig.json": "{}",
                    "/home/src/workspaces/project/tsconfig.tsbuildinfo": "Some random string",
                }),
            commandLineArgs: ["--b", "-i", "-v"],
            edits: [{
                caption: "tsbuildinfo written has error",
                edit: sys => {
                    sys.prependFile("/home/src/workspaces/project/tsconfig.tsbuildinfo", "Some random string");
                    sys.replaceFileText("/home/src/workspaces/project/tsconfig.tsbuildinfo", `"version":"${ts.version}"`, `"version":"${fakeTsVersion}"`); // build info won't parse, need to manually sterilize for baseline
                },
            }],
        });

        verifySolutionBuilderWithDifferentTsVersion({
            scenario: "sample1",
            subScenario: "rebuilds completely when version in tsbuildinfo doesnt match ts version",
            sys: getSysForSampleProjectReferencesBuilt,
            commandLineArgs: ["--b", "tests", "--verbose"],
        }, ["tests"]);

        verifySolutionBuilderWithDifferentTsVersion({
            scenario: "sample1",
            subScenario: "does not rebuild if there is no program and bundle in the ts build info event if version doesnt match ts version",
            sys: () => {
                const sys = getSysForSampleProjectReferences();
                patchHostForBuildInfoReadWrite(sys);
                const host = ts.createSolutionBuilderHost(
                    sys,
                    ts.createAbstractBuilder,
                    ts.createDiagnosticReporter(sys, /*pretty*/ true),
                    ts.createBuilderStatusReporter(sys, /*pretty*/ true),
                );
                const builder = ts.createSolutionBuilder(host, ["tests"], { verbose: true });
                builder.build();
                sys.clearOutput();
                return sys;
            },
            commandLineArgs: ["--b", "tests", "--verbose"],
        }, ["tests"]);

        verifyTsc({
            scenario: "sample1",
            subScenario: "rebuilds when extended config file changes",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--verbose"],
            modifySystem: sys => {
                sys.writeFile("tests/tsconfig.base.json", jsonToReadableText({ compilerOptions: { target: "es5" } }));
                sys.replaceFileText("tests/tsconfig.json", `"references": [`, `"extends": "./tsconfig.base.json", "references": [`);
            },
            edits: [{
                caption: "incremental-declaration-changes",
                edit: sys => sys.writeFile("tests/tsconfig.base.json", jsonToReadableText({ compilerOptions: {} })),
            }],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "builds till project specified",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--build", "logic/tsconfig.json"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], {});
                sys.exit(builder.build("logic/tsconfig.json"));
                return buildHost.getPrograms;
            },
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "building project in not build order doesnt throw error",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--build", "logic2/tsconfig.json"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], {});
                sys.exit(builder.build("logic2/tsconfig.json"));
                return buildHost.getPrograms;
            },
        });

        it("building using getNextInvalidatedProject", () => {
            const baseline: string[] = [];
            const system = changeToHostTrackingWrittenFiles(
                patchHostForBuildInfoReadWrite(
                    getSysForSampleProjectReferences(),
                ),
            );

            const host = createSolutionBuilderHostForBaseline(system);
            const builder = ts.createSolutionBuilder(host, ["tests"], {});
            baseline.push("Input::");
            system.serializeState(baseline, SerializeOutputOrder.BeforeDiff);
            verifyBuildNextResult(); // core
            verifyBuildNextResult(); // logic
            verifyBuildNextResult(); // tests
            verifyBuildNextResult(); // All Done
            Baseline.runBaseline(`tsbuild/sample1/building-using-getNextInvalidatedProject.js`, baseline.join("\r\n"));

            function verifyBuildNextResult() {
                const project = builder.getNextInvalidatedProject();
                const result = project && project.done();
                baseline.push(`Project Result:: ${jsonToReadableText({ project: project?.project, result })}`);
                system.serializeState(baseline, SerializeOutputOrder.BeforeDiff);
            }
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "building using buildReferencedProject",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--build", "logic2/tsconfig.json"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], { verbose: true });
                sys.exit(builder.buildReferences("tests"));
                return buildHost.getPrograms;
            },
        });
    });

    describe("downstream-blocked compilations", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "builds downstream projects even if upstream projects have errors",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--verbose"],
            modifySystem: sys => sys.replaceFileText("logic/index.ts", "c.multiply(10, 15)", `c.muitply()`),
            edits: noChangeOnlyRuns,
        });

        [false, true].forEach(skipReferenceCoreFromTest =>
            verifyTsc({
                scenario: "sample1",
                subScenario: `skips builds downstream projects if upstream projects have errors with stopBuildOnErrors${skipReferenceCoreFromTest ? " when test does not reference core" : ""}`,
                sys: () => getSysForSampleProjectReferences(/*withNodeNext*/ undefined, skipReferenceCoreFromTest),
                commandLineArgs: ["--b", "tests", "--verbose", "--stopBuildOnErrors"],
                modifySystem: sys => sys.appendFile("core/index.ts", `multiply();`),
                edits: [
                    noChangeRun,
                    {
                        caption: "fix error",
                        edit: sys => sys.replaceFileText("core/index.ts", "multiply();", ""),
                    },
                ],
            })
        );
    });

    describe("project invalidation", () => {
        it("invalidates projects correctly", () => {
            const baseline: string[] = [];
            const system = changeToHostTrackingWrittenFiles(
                patchHostForBuildInfoReadWrite(
                    getSysForSampleProjectReferences(),
                ),
            );

            const host = createSolutionBuilderHostForBaseline(system);
            const builder = ts.createSolutionBuilder(host, ["tests"], { dry: false, force: false, verbose: false });
            builder.build();
            baselineState("Build of project");

            // Update a timestamp in the middle project
            system.appendFile("logic/index.ts", "function foo() {}");

            // Because we haven't reset the build context, the builder should assume there's nothing to do right now
            const status = builder.getUpToDateStatusOfProject("logic/tsconfig.json");
            baseline.push(`Project should still be upto date: ${ts.UpToDateStatusType[status.type]}`);
            verifyInvalidation("non Dts change to logic");

            // Rebuild this project
            system.appendFile("logic/index.ts", `export class cNew {}`);
            verifyInvalidation("Dts change to Logic");
            Baseline.runBaseline(`tsbuild/sample1/invalidates-projects-correctly.js`, baseline.join("\r\n"));

            function verifyInvalidation(heading: string) {
                // Rebuild this project
                builder.invalidateProject("/user/username/projects/sample1/logic/tsconfig.json" as ts.ResolvedConfigFilePath);
                builder.getNextInvalidatedProject()?.done();
                baselineState(`${heading}:: After rebuilding logicConfig`);

                // Build downstream projects should update 'tests', but not 'core'
                builder.getNextInvalidatedProject()?.done();
                baselineState(`${heading}:: After building next project`);
            }

            function baselineState(heading: string) {
                baseline.push(heading);
                system.serializeState(baseline, SerializeOutputOrder.BeforeDiff);
            }
        });
    });

    const coreChanges: TestTscEdit[] = [
        {
            caption: "incremental-declaration-changes",
            edit: sys =>
                sys.appendFile(
                    "core/index.ts",
                    `
export class someClass { }`,
                ),
        },
        {
            caption: "incremental-declaration-doesnt-change",
            edit: sys =>
                sys.appendFile(
                    "core/index.ts",
                    `
class someClass2 { }`,
                ),
        },
        noChangeRun,
    ];

    describe("lists files", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "listFiles",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--listFiles"],
            edits: coreChanges,
        });
        verifyTsc({
            scenario: "sample1",
            subScenario: "listEmittedFiles",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--listEmittedFiles"],
            edits: coreChanges,
        });
        verifyTsc({
            scenario: "sample1",
            subScenario: "explainFiles",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--explainFiles", "--v"],
            edits: coreChanges,
        });
    });

    describe("emit output", () => {
        verifyTsc({
            subScenario: "sample",
            sys: getSysForSampleProjectReferences,
            scenario: "sample1",
            commandLineArgs: ["--b", "tests", "--verbose"],
            baselineSourceMap: true,
            baselineReadFileCalls: true,
            edits: [
                ...coreChanges,
                {
                    caption: "when logic config changes declaration dir",
                    edit: sys =>
                        sys.replaceFileText(
                            "logic/tsconfig.json",
                            `"declaration": true,`,
                            `"declaration": true,
        "declarationDir": "decls",`,
                        ),
                },
                noChangeRun,
            ],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "when logic specifies tsBuildInfoFile",
            sys: getSysForSampleProjectReferences,
            modifySystem: sys =>
                sys.replaceFileText(
                    "logic/tsconfig.json",
                    `"composite": true,`,
                    `"composite": true,
    "tsBuildInfoFile": "ownFile.tsbuildinfo",`,
                ),
            commandLineArgs: ["--b", "tests", "--verbose"],
            baselineSourceMap: true,
            baselineReadFileCalls: true,
        });

        verifyTsc({
            subScenario: "when declaration option changes",
            sys: getSysForSampleProjectReferences,
            scenario: "sample1",
            commandLineArgs: ["--b", "core", "--verbose"],
            modifySystem: sys =>
                sys.writeFile(
                    "core/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: {
                            incremental: true,
                            skipDefaultLibCheck: true,
                        },
                    }),
                ),
            edits: [{
                caption: "incremental-declaration-changes",
                edit: sys => sys.replaceFileText("core/tsconfig.json", `"incremental": true,`, `"incremental": true, "declaration": true,`),
            }],
        });

        verifyTsc({
            subScenario: "when target option changes",
            sys: getSysForSampleProjectReferences,
            scenario: "sample1",
            commandLineArgs: ["--b", "core", "--verbose"],
            modifySystem: sys => {
                sys.writeFile(
                    getTypeScriptLibTestLocation("esnext.full"),
                    `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`,
                );
                sys.writeFile(
                    libFile.path,
                    `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`,
                );
                sys.writeFile(
                    "core/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: {
                            incremental: true,
                            listFiles: true,
                            listEmittedFiles: true,
                            target: "esnext",
                        },
                    }),
                );
            },
            edits: [{
                caption: "incremental-declaration-changes",
                edit: sys => sys.replaceFileText("core/tsconfig.json", "esnext", "es5"),
            }],
        });

        verifyTsc({
            subScenario: "when module option changes",
            sys: getSysForSampleProjectReferences,
            scenario: "sample1",
            commandLineArgs: ["--b", "core", "--verbose"],
            modifySystem: sys =>
                sys.writeFile(
                    "core/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: {
                            incremental: true,
                            module: "commonjs",
                        },
                    }),
                ),
            edits: [{
                caption: "incremental-declaration-changes",
                edit: sys => sys.replaceFileText("core/tsconfig.json", `"module": "commonjs"`, `"module": "amd"`),
            }],
        });

        verifyTsc({
            subScenario: "when esModuleInterop option changes",
            sys: getSysForSampleProjectReferences,
            scenario: "sample1",
            commandLineArgs: ["--b", "tests", "--verbose"],
            modifySystem: sys =>
                sys.writeFile(
                    "tests/tsconfig.json",
                    jsonToReadableText({
                        references: [
                            { path: "../core" },
                            { path: "../logic" },
                        ],
                        files: ["index.ts"],
                        compilerOptions: {
                            composite: true,
                            declaration: true,
                            forceConsistentCasingInFileNames: true,
                            skipDefaultLibCheck: true,
                            esModuleInterop: false,
                        },
                    }),
                ),
            edits: [{
                caption: "incremental-declaration-changes",
                edit: sys => sys.replaceFileText("tests/tsconfig.json", `"esModuleInterop": false`, `"esModuleInterop": true`),
            }],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "reports error if input file is missing",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--v"],
            modifySystem: sys => {
                sys.writeFile(
                    "core/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: { composite: true },
                        files: ["anotherModule.ts", "index.ts", "some_decl.d.ts"],
                    }),
                );
                sys.deleteFile("core/anotherModule.ts");
            },
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "reports error if input file is missing with force",
            sys: getSysForSampleProjectReferences,
            commandLineArgs: ["--b", "tests", "--v", "--f"],
            modifySystem: sys => {
                sys.writeFile(
                    "core/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: { composite: true },
                        files: ["anotherModule.ts", "index.ts", "some_decl.d.ts"],
                    }),
                );
                sys.deleteFile("core/anotherModule.ts");
            },
        });
    });
});
