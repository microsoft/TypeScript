import * as fakes from "../../_namespaces/fakes.js";
import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import * as vfs from "../../_namespaces/vfs.js";
import { jsonToReadableText } from "../helpers.js";
import { createSolutionBuilderHostForBaseline } from "../helpers/solutionBuilder.js";
import {
    noChangeOnlyRuns,
    testTscCompileLike,
    TscCompileSystem,
    verifyTsc,
    verifyTscCompileLike,
} from "../helpers/tsc.js";
import {
    appendText,
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs.js";

describe("unittests:: tsbuild:: outFile::", () => {
    let outFileFs: vfs.FileSystem;
    let outFileWithBuildFs: vfs.FileSystem;
    after(() => {
        outFileFs = undefined!;
        outFileWithBuildFs = undefined!;
    });

    function getOutFileFs() {
        return outFileFs ??= loadProjectFromFiles({
            "/src/first/first_PART1.ts": dedent`
                interface TheFirst {
                    none: any;
                }

                const s = "Hello, world";

                interface NoJsForHereEither {
                    none: any;
                }

                console.log(s);
            `,
            "/src/first/first_part2.ts": dedent`
                console.log(f());
            `,
            "/src/first/first_part3.ts": dedent`
                function f() {
                    return "JS does hoists";
                }
            `,
            "/src/first/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    target: "es5",
                    composite: true,
                    removeComments: true,
                    strict: false,
                    sourceMap: true,
                    declarationMap: true,
                    outFile: "./bin/first-output.js",
                    skipDefaultLibCheck: true,
                },
                files: [
                    "first_PART1.ts",
                    "first_part2.ts",
                    "first_part3.ts",
                ],
                references: [],
            }),
            "/src/second/second_part1.ts": dedent`
                namespace N {
                    // Comment text
                }

                namespace N {
                    function f() {
                        console.log('testing');
                    }

                    f();
                }
            `,
            "/src/second/second_part2.ts": dedent`
                class C {
                    doSomething() {
                        console.log("something got done");
                    }
                }
            `,
            "/src/second/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    target: "es5",
                    composite: true,
                    removeComments: true,
                    strict: false,
                    sourceMap: true,
                    declarationMap: true,
                    declaration: true,
                    outFile: "../2/second-output.js",
                    skipDefaultLibCheck: true,
                },
                references: [],
            }),
            "/src/third/third_part1.ts": dedent`
                var c = new C();
                c.doSomething();
            `,
            "/src/third/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    target: "es5",
                    composite: true,
                    removeComments: true,
                    strict: false,
                    sourceMap: true,
                    declarationMap: true,
                    declaration: true,
                    outFile: "./thirdjs/output/third-output.js",
                    skipDefaultLibCheck: true,
                },
                files: [
                    "third_part1.ts",
                ],
                references: [
                    { path: "../first" },
                    { path: "../second" },
                ],
            }),
        });
    }

    function getOutFileFsAfterBuild() {
        if (outFileWithBuildFs) return outFileWithBuildFs;
        const fs = getOutFileFs().shadow();
        const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc" });
        const host = createSolutionBuilderHostForBaseline(sys as TscCompileSystem);
        const builder = ts.createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: true });
        builder.build();
        fs.makeReadonly();
        return outFileWithBuildFs = fs;
    }

    // Verify initial + incremental edits
    verifyTsc({
        subScenario: "baseline sectioned sourcemaps",
        fs: getOutFileFs,
        scenario: "outFile",
        commandLineArgs: ["--b", "/src/third", "--verbose", "--explainFiles"],
        baselineSourceMap: true,
        baselineReadFileCalls: true,
        edits: [
            {
                caption: "incremental-declaration-changes",
                edit: fs => replaceText(fs, "/src/first/first_PART1.ts", "Hello", "Hola"),
            },
            {
                caption: "incremental-declaration-doesnt-change",
                edit: fs => appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
            },
        ],
    });

    // Verify baseline with build info + dts unChanged
    verifyTsc({
        subScenario: "when final project is not composite but uses project references",
        fs: getOutFileFs,
        scenario: "outFile",
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        baselineSourceMap: true,
        modifyFs: fs => replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, ""),
        edits: [{
            caption: "incremental-declaration-doesnt-change",
            edit: fs => appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
        }],
    });

    // Verify baseline with build info
    verifyTsc({
        subScenario: "when final project is not composite but incremental",
        fs: getOutFileFs,
        scenario: "outFile",
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        baselineSourceMap: true,
        modifyFs: fs => replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, `"incremental": true,`),
    });

    // Verify baseline with build info
    verifyTsc({
        subScenario: "when final project specifies tsBuildInfoFile",
        fs: getOutFileFs,
        scenario: "outFile",
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        baselineSourceMap: true,
        modifyFs: fs =>
            replaceText(
                fs,
                "/src/third/tsconfig.json",
                `"composite": true,`,
                `"composite": true,
        "tsBuildInfoFile": "./thirdjs/output/third.tsbuildinfo",`,
            ),
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "clean projects",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--b", "/src/third", "--clean"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "verify buildInfo absence results in new build",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        modifyFs: fs => fs.unlinkSync("/src/first/bin/first-output.tsbuildinfo"),
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "tsbuildinfo is not generated when incremental is set to false",
        fs: getOutFileFs,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        modifyFs: fs => replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, ""),
    });

    verifyTscCompileLike(testTscCompileLike, {
        scenario: "outFile",
        subScenario: "rebuilds completely when version in tsbuildinfo doesnt match ts version",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        compile: sys => {
            // Buildinfo will have version which does not match with current ts version
            const buildHost = createSolutionBuilderHostForBaseline(sys, "FakeTSCurrentVersion");
            const builder = ts.createSolutionBuilder(buildHost, ["/src/third"], { verbose: true });
            sys.exit(builder.build());
        },
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "rebuilds completely when command line incremental flag changes between non dts changes",
        fs: getOutFileFs,
        // Make non composite third project
        modifyFs: fs => replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, ""),
        // Build with command line incremental
        commandLineArgs: ["--b", "/src/third", "--i", "--verbose"],
        edits: [
            {
                caption: "Make non incremental build with change in file that doesnt affect dts",
                edit: fs => appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
                commandLineArgs: ["--b", "/src/third", "--verbose"],
            },
            {
                caption: "Make incremental build with change in file that doesnt affect dts",
                edit: fs => appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
                commandLineArgs: ["--b", "/src/third", "--verbose", "--incremental"],
            },
        ],
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "when input file text does not change but its modified time changes",
        fs: getOutFileFs,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        edits: [
            {
                caption: "upstream project changes without changing file text",
                edit: fs => {
                    const time = new Date(fs.time());
                    fs.utimesSync("/src/first/first_PART1.ts", time, time);
                },
            },
        ],
    });

    verifyTscCompileLike(testTscCompileLike, {
        scenario: "outFile",
        subScenario: "builds till project specified",
        fs: getOutFileFs,
        commandLineArgs: ["--build", "/src/second/tsconfig.json"],
        compile: sys => {
            const buildHost = createSolutionBuilderHostForBaseline(sys);
            const builder = ts.createSolutionBuilder(buildHost, ["/src/third/tsconfig.json"], {});
            sys.exit(builder.build("/src/second/tsconfig.json"));
        },
    });

    verifyTscCompileLike(testTscCompileLike, {
        scenario: "outFile",
        subScenario: "cleans till project specified",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--build", "--clean", "/src/second/tsconfig.json"],
        compile: sys => {
            const buildHost = createSolutionBuilderHostForBaseline(sys);
            const builder = ts.createSolutionBuilder(buildHost, ["/src/third/tsconfig.json"], { verbose: true });
            sys.exit(builder.clean("/src/second/tsconfig.json"));
        },
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "non module projects without prepend",
        fs: getOutFileFs,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        modifyFs: fs => {
            // Non Modules
            replaceText(fs, "/src/first/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);
            replaceText(fs, "/src/second/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);
            replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);

            // Own file emit
            replaceText(fs, "/src/first/tsconfig.json", `"outFile": "./bin/first-output.js",`, "");
            replaceText(fs, "/src/second/tsconfig.json", `"outFile": "../2/second-output.js",`, "");
            replaceText(fs, "/src/third/tsconfig.json", `"outFile": "./thirdjs/output/third-output.js",`, "");
        },
    });
});
