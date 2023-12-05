import * as fakes from "../../_namespaces/fakes";
import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    libContent,
    libPath,
} from "../helpers/contents";
import {
    getFsForSampleProjectReferences,
    getSysForSampleProjectReferences,
} from "../helpers/sampleProjectReferences";
import {
    createSolutionBuilderHostForBaseline,
} from "../helpers/solutionBuilder";
import {
    noChangeOnlyRuns,
    noChangeRun,
    testTscCompileLike,
    TestTscEdit,
    TscCompileSystem,
    verifyTsc,
    verifyTscCompileLike,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromFiles,
    prependText,
    replaceText,
} from "../helpers/vfs";
import {
    changeToHostTrackingWrittenFiles,
    libFile,
    SerializeOutputOrder,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsbuild:: on 'sample1' project", () => {
    let projFs: vfs.FileSystem;
    let projFsWithBuild: vfs.FileSystem;
    before(() => {
        projFs = getFsForSampleProjectReferences();
    });

    after(() => {
        projFs = undefined!; // Release the contents
        projFsWithBuild = undefined!;
    });

    function getSampleFsAfterBuild() {
        if (projFsWithBuild) return projFsWithBuild;
        const fs = projFs.shadow();
        const sys = new fakes.System(fs, { executingFilePath: libFile.path });
        const host = createSolutionBuilderHostForBaseline(sys as TscCompileSystem);
        const builder = ts.createSolutionBuilder(host, ["tests"], {});
        builder.build();
        fs.makeReadonly();
        return projFsWithBuild = fs;
    }

    describe("sanity check of clean build of 'sample1' project", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "builds correctly when outDir is specified",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests"],
            modifyFs: fs =>
                fs.writeFileSync(
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
            fs: () => projFs,
            commandLineArgs: ["--b", "tests"],
            modifyFs: fs =>
                fs.writeFileSync(
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
            fs: () => projFs,
            commandLineArgs: ["--b", "core", "--verbose"],
            modifyFs: fs => replaceText(fs, "core/tsconfig.json", `"composite": true,`, ""),
        });
    });

    describe("dry builds", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "does not write any files in a dry build",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--dry"],
        });
    });

    describe("clean builds", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "removes all files it built",
            fs: getSampleFsAfterBuild,
            commandLineArgs: ["--b", "tests", "--clean"],
            edits: noChangeOnlyRuns,
        });

        verifyTscCompileLike(testTscCompileLike, {
            scenario: "sample1",
            subScenario: "cleans till project specified",
            fs: getSampleFsAfterBuild,
            commandLineArgs: ["--b", "logic", "--clean"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["third/tsconfig.json"], {});
                sys.exit(builder.clean("logic"));
            },
        });

        verifyTscCompileLike(testTscCompileLike, {
            scenario: "sample1",
            subScenario: "cleaning project in not build order doesnt throw error",
            fs: getSampleFsAfterBuild,
            commandLineArgs: ["--b", "logic2", "--clean"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["third/tsconfig.json"], {});
                sys.exit(builder.clean("logic2"));
            },
        });
    });

    describe("force builds", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "always builds under with force option",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--force"],
            edits: noChangeOnlyRuns,
        });
    });

    describe("can detect when and what to rebuild", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "can detect when and what to rebuild",
            fs: getSampleFsAfterBuild,
            commandLineArgs: ["--b", "tests", "--verbose"],
            edits: [
                // Update a file in the leaf node (tests), only it should rebuild the last one
                {
                    caption: "Only builds the leaf node project",
                    edit: fs => fs.writeFileSync("tests/index.ts", "const m = 10;"),
                },
                // Update a file in the parent (without affecting types), should get fast downstream builds
                {
                    caption: "Detects type-only changes in upstream projects",
                    edit: fs => replaceText(fs, "core/index.ts", "HELLO WORLD", "WELCOME PLANET"),
                },
                {
                    caption: "rebuilds when tsconfig changes",
                    edit: fs => {
                        replaceText(fs, "tests/tsconfig.json", `"composite": true`, `"composite": true, "target": "es2020"`);
                        fs.writeFileSync(libPath("es2020.full"), libContent);
                    },
                },
            ],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "when input file text does not change but its modified time changes",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--verbose"],
            edits: [
                {
                    caption: "upstream project changes without changing file text",
                    edit: fs => {
                        const time = new Date(fs.time());
                        fs.utimesSync("core/index.ts", time, time);
                    },
                },
            ],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "when declarationMap changes",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--verbose"],
            edits: [
                {
                    caption: "Disable declarationMap",
                    edit: fs => replaceText(fs, "core/tsconfig.json", `"declarationMap": true,`, `"declarationMap": false,`),
                },
                {
                    caption: "Enable declarationMap",
                    edit: fs => replaceText(fs, "core/tsconfig.json", `"declarationMap": false,`, `"declarationMap": true,`),
                },
            ],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "indicates that it would skip builds during a dry build",
            fs: getSampleFsAfterBuild,
            commandLineArgs: ["--b", "tests", "--dry"],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "rebuilds from start if force option is set",
            fs: getSampleFsAfterBuild,
            commandLineArgs: ["--b", "tests", "--verbose", "--force"],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "tsbuildinfo has error",
            fs: () =>
                loadProjectFromFiles({
                    "/src/project/main.ts": "export const x = 10;",
                    "/src/project/tsconfig.json": "{}",
                    "/src/project/tsconfig.tsbuildinfo": "Some random string",
                }),
            commandLineArgs: ["--b", "src/project", "-i", "-v"],
            edits: [{
                caption: "tsbuildinfo written has error",
                edit: fs => prependText(fs, "/src/project/tsconfig.tsbuildinfo", "Some random string"),
            }],
        });

        verifyTscCompileLike(testTscCompileLike, {
            scenario: "sample1",
            subScenario: "rebuilds completely when version in tsbuildinfo doesnt match ts version",
            fs: getSampleFsAfterBuild,
            commandLineArgs: ["--b", "tests", "--verbose"],
            compile: sys => {
                // Buildinfo will have version which does not match with current ts version
                const buildHost = createSolutionBuilderHostForBaseline(sys, "FakeTSCurrentVersion");
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], { verbose: true });
                sys.exit(builder.build());
            },
        });

        verifyTscCompileLike(testTscCompileLike, {
            scenario: "sample1",
            subScenario: "does not rebuild if there is no program and bundle in the ts build info event if version doesnt match ts version",
            fs: () => {
                const fs = projFs.shadow();
                const host = fakes.SolutionBuilderHost.create(fs, /*options*/ undefined, /*setParentNodes*/ undefined, ts.createAbstractBuilder);
                const builder = ts.createSolutionBuilder(host, ["tests"], { verbose: true });
                builder.build();
                fs.makeReadonly();
                return fs;
            },
            commandLineArgs: ["--b", "tests", "--verbose"],
            compile: sys => {
                // Buildinfo will have version which does not match with current ts version
                const buildHost = createSolutionBuilderHostForBaseline(sys, "FakeTSCurrentVersion");
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], { verbose: true });
                sys.exit(builder.build());
            },
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "rebuilds when extended config file changes",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--verbose"],
            modifyFs: fs => {
                fs.writeFileSync("tests/tsconfig.base.json", jsonToReadableText({ compilerOptions: { target: "es3" } }));
                replaceText(fs, "tests/tsconfig.json", `"references": [`, `"extends": "./tsconfig.base.json", "references": [`);
            },
            edits: [{
                caption: "incremental-declaration-changes",
                edit: fs => fs.writeFileSync("tests/tsconfig.base.json", jsonToReadableText({ compilerOptions: {} })),
            }],
        });

        verifyTscCompileLike(testTscCompileLike, {
            scenario: "sample1",
            subScenario: "builds till project specified",
            fs: () => projFs,
            commandLineArgs: ["--build", "logic/tsconfig.json"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], {});
                sys.exit(builder.build("logic/tsconfig.json"));
            },
        });

        verifyTscCompileLike(testTscCompileLike, {
            scenario: "sample1",
            subScenario: "building project in not build order doesnt throw error",
            fs: () => projFs,
            commandLineArgs: ["--build", "logic2/tsconfig.json"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], {});
                sys.exit(builder.build("logic2/tsconfig.json"));
            },
        });

        it("building using getNextInvalidatedProject", () => {
            const baseline: string[] = [];
            const system = changeToHostTrackingWrittenFiles(
                fakes.patchHostForBuildInfoReadWrite(
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
            Harness.Baseline.runBaseline(`tsbuild/sample1/building-using-getNextInvalidatedProject.js`, baseline.join("\r\n"));

            function verifyBuildNextResult() {
                const project = builder.getNextInvalidatedProject();
                const result = project && project.done();
                baseline.push(`Project Result:: ${jsonToReadableText({ project: project?.project, result })}`);
                system.serializeState(baseline, SerializeOutputOrder.BeforeDiff);
            }
        });

        verifyTscCompileLike(testTscCompileLike, {
            scenario: "sample1",
            subScenario: "building using buildReferencedProject",
            fs: () => projFs,
            commandLineArgs: ["--build", "logic2/tsconfig.json"],
            compile: sys => {
                const buildHost = createSolutionBuilderHostForBaseline(sys);
                const builder = ts.createSolutionBuilder(buildHost, ["tests"], { verbose: true });
                sys.exit(builder.buildReferences("tests"));
            },
        });
    });

    describe("downstream-blocked compilations", () => {
        verifyTsc({
            scenario: "sample1",
            subScenario: "does not build downstream projects if upstream projects have errors",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--verbose"],
            modifyFs: fs => replaceText(fs, "logic/index.ts", "c.multiply(10, 15)", `c.muitply()`),
            edits: noChangeOnlyRuns,
        });
    });

    describe("project invalidation", () => {
        it("invalidates projects correctly", () => {
            const baseline: string[] = [];
            const system = changeToHostTrackingWrittenFiles(
                fakes.patchHostForBuildInfoReadWrite(
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
            Harness.Baseline.runBaseline(`tsbuild/sample1/invalidates-projects-correctly.js`, baseline.join("\r\n"));

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
            edit: fs =>
                appendText(
                    fs,
                    "core/index.ts",
                    `
export class someClass { }`,
                ),
        },
        {
            caption: "incremental-declaration-doesnt-change",
            edit: fs =>
                appendText(
                    fs,
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
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--listFiles"],
            edits: coreChanges,
        });
        verifyTsc({
            scenario: "sample1",
            subScenario: "listEmittedFiles",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--listEmittedFiles"],
            edits: coreChanges,
        });
        verifyTsc({
            scenario: "sample1",
            subScenario: "explainFiles",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--explainFiles", "--v"],
            edits: coreChanges,
        });
    });

    describe("emit output", () => {
        verifyTsc({
            subScenario: "sample",
            fs: () => projFs,
            scenario: "sample1",
            commandLineArgs: ["--b", "tests", "--verbose"],
            baselineSourceMap: true,
            baselineReadFileCalls: true,
            edits: [
                ...coreChanges,
                {
                    caption: "when logic config changes declaration dir",
                    edit: fs =>
                        replaceText(
                            fs,
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
            fs: () => projFs,
            modifyFs: fs =>
                replaceText(
                    fs,
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
            fs: () => projFs,
            scenario: "sample1",
            commandLineArgs: ["--b", "core", "--verbose"],
            modifyFs: fs =>
                fs.writeFileSync(
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
                edit: fs => replaceText(fs, "core/tsconfig.json", `"incremental": true,`, `"incremental": true, "declaration": true,`),
            }],
        });

        verifyTsc({
            subScenario: "when target option changes",
            fs: () => projFs,
            scenario: "sample1",
            commandLineArgs: ["--b", "core", "--verbose"],
            modifyFs: fs => {
                fs.writeFileSync(
                    libPath("esnext.full"),
                    `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`,
                );
                fs.writeFileSync(libPath("esnext"), libContent);
                fs.writeFileSync(
                    libFile.path,
                    `/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />`,
                );
                fs.writeFileSync(
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
                edit: fs => replaceText(fs, "core/tsconfig.json", "esnext", "es5"),
            }],
        });

        verifyTsc({
            subScenario: "when module option changes",
            fs: () => projFs,
            scenario: "sample1",
            commandLineArgs: ["--b", "core", "--verbose"],
            modifyFs: fs =>
                fs.writeFileSync(
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
                edit: fs => replaceText(fs, "core/tsconfig.json", `"module": "commonjs"`, `"module": "amd"`),
            }],
        });

        verifyTsc({
            subScenario: "when esModuleInterop option changes",
            fs: () => projFs,
            scenario: "sample1",
            commandLineArgs: ["--b", "tests", "--verbose"],
            modifyFs: fs =>
                fs.writeFileSync(
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
                edit: fs => replaceText(fs, "tests/tsconfig.json", `"esModuleInterop": false`, `"esModuleInterop": true`),
            }],
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "reports error if input file is missing",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--v"],
            modifyFs: fs => {
                fs.writeFileSync(
                    "core/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: { composite: true },
                        files: ["anotherModule.ts", "index.ts", "some_decl.d.ts"],
                    }),
                );
                fs.unlinkSync("core/anotherModule.ts");
            },
        });

        verifyTsc({
            scenario: "sample1",
            subScenario: "reports error if input file is missing with force",
            fs: () => projFs,
            commandLineArgs: ["--b", "tests", "--v", "--f"],
            modifyFs: fs => {
                fs.writeFileSync(
                    "core/tsconfig.json",
                    jsonToReadableText({
                        compilerOptions: { composite: true },
                        files: ["anotherModule.ts", "index.ts", "some_decl.d.ts"],
                    }),
                );
                fs.unlinkSync("core/anotherModule.ts");
            },
        });
    });
});
