import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    createSolutionBuilderHostForBaseline,
    solutionBuildWithBaseline,
    verifySolutionBuilderWithDifferentTsVersion,
} from "../helpers/solutionBuilder.js";
import {
    noChangeOnlyRuns,
    verifyTsc,
} from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: outFile::", () => {
    function getOutFileSys() {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/solution/first/first_PART1.ts": dedent`
                interface TheFirst {
                    none: any;
                }

                const s = "Hello, world";

                interface NoJsForHereEither {
                    none: any;
                }

                console.log(s);
            `,
            "/home/src/workspaces/solution/first/first_part2.ts": dedent`
                console.log(f());
            `,
            "/home/src/workspaces/solution/first/first_part3.ts": dedent`
                function f() {
                    return "JS does hoists";
                }
            `,
            "/home/src/workspaces/solution/first/tsconfig.json": jsonToReadableText({
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
            "/home/src/workspaces/solution/second/second_part1.ts": dedent`
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
            "/home/src/workspaces/solution/second/second_part2.ts": dedent`
                class C {
                    doSomething() {
                        console.log("something got done");
                    }
                }
            `,
            "/home/src/workspaces/solution/second/tsconfig.json": jsonToReadableText({
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
            "/home/src/workspaces/solution/third/third_part1.ts": dedent`
                var c = new C();
                c.doSomething();
            `,
            "/home/src/workspaces/solution/third/tsconfig.json": jsonToReadableText({
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
        }, { currentDirectory: "/home/src/workspaces/solution" });
    }

    function getOutFileSysAfterBuild() {
        const sys = getOutFileSys();
        solutionBuildWithBaseline(sys, ["/home/src/workspaces/solution/third"], { dry: false, force: false, verbose: true });
        return sys;
    }

    // Verify initial + incremental edits
    verifyTsc({
        subScenario: "baseline sectioned sourcemaps",
        sys: getOutFileSys,
        scenario: "outFile",
        commandLineArgs: ["--b", "third", "--verbose", "--explainFiles"],
        baselineSourceMap: true,
        baselineReadFileCalls: true,
        edits: [
            {
                caption: "incremental-declaration-changes",
                edit: sys => sys.replaceFileText("/home/src/workspaces/solution/first/first_PART1.ts", "Hello", "Hola"),
            },
            {
                caption: "incremental-declaration-doesnt-change",
                edit: sys => sys.appendFile("/home/src/workspaces/solution/first/first_PART1.ts", "console.log(s);"),
            },
        ],
    });

    // Verify baseline with build info + dts unChanged
    verifyTsc({
        subScenario: "when final project is not composite but uses project references",
        sys: getOutFileSys,
        scenario: "outFile",
        commandLineArgs: ["--b", "third", "--verbose"],
        baselineSourceMap: true,
        modifySystem: sys => sys.replaceFileText("/home/src/workspaces/solution/third/tsconfig.json", `"composite": true,`, ""),
        edits: [{
            caption: "incremental-declaration-doesnt-change",
            edit: sys => sys.appendFile("/home/src/workspaces/solution/first/first_PART1.ts", "console.log(s);"),
        }],
    });

    // Verify baseline with build info
    verifyTsc({
        subScenario: "when final project is not composite but incremental",
        sys: getOutFileSys,
        scenario: "outFile",
        commandLineArgs: ["--b", "third", "--verbose"],
        baselineSourceMap: true,
        modifySystem: sys => sys.replaceFileText("/home/src/workspaces/solution/third/tsconfig.json", `"composite": true,`, `"incremental": true,`),
    });

    // Verify baseline with build info
    verifyTsc({
        subScenario: "when final project specifies tsBuildInfoFile",
        sys: getOutFileSys,
        scenario: "outFile",
        commandLineArgs: ["--b", "third", "--verbose"],
        baselineSourceMap: true,
        modifySystem: sys =>
            sys.replaceFileText(
                "/home/src/workspaces/solution/third/tsconfig.json",
                `"composite": true,`,
                `"composite": true,
        "tsBuildInfoFile": "./thirdjs/output/third.tsbuildinfo",`,
            ),
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "clean projects",
        sys: getOutFileSysAfterBuild,
        commandLineArgs: ["--b", "third", "--clean"],
        edits: noChangeOnlyRuns,
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "verify buildInfo absence results in new build",
        sys: getOutFileSysAfterBuild,
        commandLineArgs: ["--b", "third", "--verbose"],
        modifySystem: sys => sys.deleteFile("/home/src/workspaces/solution/first/bin/first-output.tsbuildinfo"),
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "tsbuildinfo is not generated when incremental is set to false",
        sys: getOutFileSys,
        commandLineArgs: ["--b", "third", "--verbose"],
        modifySystem: sys => sys.replaceFileText("/home/src/workspaces/solution/third/tsconfig.json", `"composite": true,`, ""),
    });

    verifySolutionBuilderWithDifferentTsVersion({
        scenario: "outFile",
        subScenario: "rebuilds completely when version in tsbuildinfo doesnt match ts version",
        sys: getOutFileSysAfterBuild,
        commandLineArgs: ["--b", "third", "--verbose"],
    }, ["/home/src/workspaces/solution/third"]);

    verifyTsc({
        scenario: "outFile",
        subScenario: "rebuilds completely when command line incremental flag changes between non dts changes",
        sys: getOutFileSys,
        // Make non composite third project
        modifySystem: sys => sys.replaceFileText("/home/src/workspaces/solution/third/tsconfig.json", `"composite": true,`, ""),
        // Build with command line incremental
        commandLineArgs: ["--b", "third", "--i", "--verbose"],
        edits: [
            {
                caption: "Make non incremental build with change in file that doesnt affect dts",
                edit: sys => sys.appendFile("/home/src/workspaces/solution/first/first_PART1.ts", "console.log(s);"),
                commandLineArgs: ["--b", "third", "--verbose"],
                discrepancyExplanation: () => [
                    "Clean build is non incremental so it will have non incremental tsbuildInfo for third project",
                    "The incremental build does not build third so will only update timestamps for third tsbuildInfo and hence its from incremental build before",
                ],
            },
            {
                caption: "Make incremental build with change in file that doesnt affect dts",
                edit: sys => sys.appendFile("/home/src/workspaces/solution/first/first_PART1.ts", "console.log(s);"),
                commandLineArgs: ["--b", "third", "--verbose", "--incremental"],
            },
        ],
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "when input file text does not change but its modified time changes",
        sys: getOutFileSys,
        commandLineArgs: ["--b", "third", "--verbose"],
        edits: [
            {
                caption: "upstream project changes without changing file text",
                edit: sys => sys.setModifiedTime("/home/src/workspaces/solution/first/first_PART1.ts", sys.now()),
            },
        ],
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "builds till project specified",
        sys: getOutFileSys,
        commandLineArgs: ["--build", "second/tsconfig.json"],
        compile: sys => {
            const buildHost = createSolutionBuilderHostForBaseline(sys);
            const builder = ts.createSolutionBuilder(buildHost, ["/home/src/workspaces/solution/third/tsconfig.json"], {});
            sys.exit(builder.build("/home/src/workspaces/solution/second/tsconfig.json"));
            return buildHost.getPrograms;
        },
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "cleans till project specified",
        sys: getOutFileSysAfterBuild,
        commandLineArgs: ["--build", "--clean", "second/tsconfig.json"],
        compile: sys => {
            const buildHost = createSolutionBuilderHostForBaseline(sys);
            const builder = ts.createSolutionBuilder(buildHost, ["/home/src/workspaces/solution/third/tsconfig.json"], { verbose: true });
            sys.exit(builder.clean("/home/src/workspaces/solution/second/tsconfig.json"));
            return buildHost.getPrograms;
        },
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "non module projects without prepend",
        sys: getOutFileSys,
        commandLineArgs: ["--b", "third", "--verbose"],
        modifySystem: sys => {
            // Non Modules
            sys.replaceFileText("/home/src/workspaces/solution/first/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);
            sys.replaceFileText("/home/src/workspaces/solution/second/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);
            sys.replaceFileText("/home/src/workspaces/solution/third/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);

            // Own file emit
            sys.replaceFileText("/home/src/workspaces/solution/first/tsconfig.json", `"outFile": "./bin/first-output.js",`, "");
            sys.replaceFileText("/home/src/workspaces/solution/second/tsconfig.json", `"outFile": "../2/second-output.js",`, "");
            sys.replaceFileText("/home/src/workspaces/solution/third/tsconfig.json", `"outFile": "./thirdjs/output/third-output.js",`, "");
        },
    });
});
