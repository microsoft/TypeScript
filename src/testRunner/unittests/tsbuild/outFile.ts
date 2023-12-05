import * as fakes from "../../_namespaces/fakes";
import * as ts from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    createSolutionBuilderHostForBaseline,
} from "../helpers/solutionBuilder";
import {
    noChangeOnlyRuns,
    testTscCompileLike,
    TestTscEdit,
    TscCompileSystem,
    verifyTsc,
    verifyTscCompileLike,
} from "../helpers/tsc";
import {
    addRest,
    addShebang,
    addSpread,
    addStubFoo,
    addTestPrologue,
    addTripleSlashRef,
    appendText,
    changeStubToRest,
    enableStrict,
    loadProjectFromFiles,
    prependText,
    removeRest,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: outFile::", () => {
    let outFileFs: vfs.FileSystem;
    let outFileWithBuildFs: vfs.FileSystem;
    before(() => {
        outFileFs = loadProjectFromFiles({
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
                    ignoreDeprecations: "5.0",
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
                    ignoreDeprecations: "5.0",
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
                    { path: "../first", prepend: true },
                    { path: "../second", prepend: true },
                ],
            }),
        });
    });
    after(() => {
        outFileFs = undefined!;
        outFileWithBuildFs = undefined!;
    });

    interface VerifyOutFileScenarioInput {
        subScenario: string;
        modifyFs?: (fs: vfs.FileSystem) => void;
        modifyAgainFs?: (fs: vfs.FileSystem) => void;
        ignoreDtsChanged?: true;
        ignoreDtsUnchanged?: true;
        baselineOnly?: true;
        additionalCommandLineArgs?: string[];
    }

    function verifyOutFileScenario({
        subScenario,
        modifyFs,
        modifyAgainFs,
        ignoreDtsChanged,
        ignoreDtsUnchanged,
        baselineOnly,
        additionalCommandLineArgs,
    }: VerifyOutFileScenarioInput) {
        let edits: TestTscEdit[] | undefined;
        if (!ignoreDtsChanged) {
            (edits ??= []).push({
                caption: "incremental-declaration-changes",
                edit: fs => replaceText(fs, "/src/first/first_PART1.ts", "Hello", "Hola"),
            });
        }
        if (!ignoreDtsUnchanged) {
            (edits ??= []).push({
                caption: "incremental-declaration-doesnt-change",
                edit: fs => appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
            });
        }
        if (modifyAgainFs) {
            (edits ??= []).push({
                caption: "incremental-headers-change-without-dts-changes",
                edit: modifyAgainFs,
            });
        }
        verifyTsc({
            subScenario,
            fs: () => outFileFs,
            scenario: "outfile-concat",
            commandLineArgs: ["--b", "/src/third", "--verbose", ...(additionalCommandLineArgs || [])],
            baselineSourceMap: true,
            modifyFs,
            baselineReadFileCalls: !baselineOnly,
            edits,
        });
    }

    // Verify initial + incremental edits
    verifyOutFileScenario({
        subScenario: "baseline sectioned sourcemaps",
    });

    verifyOutFileScenario({
        subScenario: "explainFiles",
        additionalCommandLineArgs: ["--explainFiles"],
        baselineOnly: true,
    });

    // Verify baseline with build info + dts unChanged
    verifyOutFileScenario({
        subScenario: "when final project is not composite but uses project references",
        modifyFs: fs => replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, ""),
        ignoreDtsChanged: true,
        baselineOnly: true,
    });

    // Verify baseline with build info
    verifyOutFileScenario({
        subScenario: "when final project is not composite but incremental",
        modifyFs: fs => replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, `"incremental": true,`),
        ignoreDtsChanged: true,
        ignoreDtsUnchanged: true,
        baselineOnly: true,
    });

    // Verify baseline with build info
    verifyOutFileScenario({
        subScenario: "when final project specifies tsBuildInfoFile",
        modifyFs: fs =>
            replaceText(
                fs,
                "/src/third/tsconfig.json",
                `"composite": true,`,
                `"composite": true,
        "tsBuildInfoFile": "./thirdjs/output/third.tsbuildinfo",`,
            ),
        ignoreDtsChanged: true,
        ignoreDtsUnchanged: true,
        baselineOnly: true,
    });

    function getOutFileFsAfterBuild() {
        if (outFileWithBuildFs) return outFileWithBuildFs;
        const fs = outFileFs.shadow();
        const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc" });
        const host = createSolutionBuilderHostForBaseline(sys as TscCompileSystem);
        const builder = ts.createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: true });
        builder.build();
        fs.makeReadonly();
        return outFileWithBuildFs = fs;
    }

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
        fs: () => outFileFs,
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
        fs: () => outFileFs,
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
        fs: () => outFileFs,
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
        fs: () => outFileFs,
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

    describe("Prepend output with .tsbuildinfo", () => {
        // Prologues
        describe("Prologues", () => {
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "strict in all projects",
                modifyFs: fs => {
                    enableStrict(fs, "/src/first/tsconfig.json");
                    enableStrict(fs, "/src/second/tsconfig.json");
                    enableStrict(fs, "/src/third/tsconfig.json");
                },
                modifyAgainFs: fs => addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue"`),
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "strict in one dependency",
                modifyFs: fs => enableStrict(fs, "/src/second/tsconfig.json"),
                modifyAgainFs: fs => addTestPrologue(fs, "src/first/first_PART1.ts", `"myPrologue"`),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });

            // Verify initial + incremental edits - sourcemap verification
            verifyOutFileScenario({
                subScenario: "multiple prologues in all projects",
                modifyFs: fs => {
                    enableStrict(fs, "/src/first/tsconfig.json");
                    addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue"`);
                    enableStrict(fs, "/src/second/tsconfig.json");
                    addTestPrologue(fs, "/src/second/second_part1.ts", `"myPrologue"`);
                    addTestPrologue(fs, "/src/second/second_part2.ts", `"myPrologue2";`);
                    enableStrict(fs, "/src/third/tsconfig.json");
                    addTestPrologue(fs, "/src/third/third_part1.ts", `"myPrologue";`);
                    addTestPrologue(fs, "/src/third/third_part1.ts", `"myPrologue3";`);
                },
                modifyAgainFs: fs => addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue5"`),
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "multiple prologues in different projects",
                modifyFs: fs => {
                    enableStrict(fs, "/src/first/tsconfig.json");
                    addTestPrologue(fs, "/src/second/second_part1.ts", `"myPrologue"`);
                    addTestPrologue(fs, "/src/second/second_part2.ts", `"myPrologue2";`);
                    enableStrict(fs, "/src/third/tsconfig.json");
                },
                modifyAgainFs: fs => addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue5"`),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });
        });

        // Shebang
        describe("Shebang", () => {
            // changes declaration because its emitted in .d.ts file
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "shebang in all projects",
                modifyFs: fs => {
                    addShebang(fs, "first", "first_PART1");
                    addShebang(fs, "first", "first_part2");
                    addShebang(fs, "second", "second_part1");
                    addShebang(fs, "third", "third_part1");
                },
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "shebang in only one dependency project",
                modifyFs: fs => addShebang(fs, "second", "second_part1"),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });
        });

        // emitHelpers
        describe("emitHelpers", () => {
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "emitHelpers in all projects",
                modifyFs: fs => {
                    addRest(fs, "first", "first_PART1");
                    addRest(fs, "second", "second_part1");
                    addRest(fs, "third", "third_part1");
                },
                modifyAgainFs: fs => removeRest(fs, "first", "first_PART1"),
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "emitHelpers in only one dependency project",
                modifyFs: fs => {
                    addStubFoo(fs, "first", "first_PART1");
                    addRest(fs, "second", "second_part1");
                },
                modifyAgainFs: fs => changeStubToRest(fs, "first", "first_PART1"),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "multiple emitHelpers in all projects",
                modifyFs: fs => {
                    addRest(fs, "first", "first_PART1");
                    addSpread(fs, "first", "first_part3");
                    addRest(fs, "second", "second_part1");
                    addSpread(fs, "second", "second_part2");
                    addRest(fs, "third", "third_part1");
                    addSpread(fs, "third", "third_part1");
                },
                modifyAgainFs: fs => removeRest(fs, "first", "first_PART1"),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "multiple emitHelpers in different projects",
                modifyFs: fs => {
                    addRest(fs, "first", "first_PART1");
                    addSpread(fs, "second", "second_part1");
                    addRest(fs, "third", "third_part1");
                },
                modifyAgainFs: fs => removeRest(fs, "first", "first_PART1"),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });
        });

        // triple slash refs
        describe("triple slash refs", () => {
            // changes declaration because its emitted in .d.ts file
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "triple slash refs in all projects",
                modifyFs: fs => {
                    addTripleSlashRef(fs, "first", "first_part2");
                    addTripleSlashRef(fs, "second", "second_part1");
                    addTripleSlashRef(fs, "third", "third_part1");
                },
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "triple slash refs in one project",
                modifyFs: fs => addTripleSlashRef(fs, "second", "second_part1"),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });
        });

        describe("stripInternal", () => {
            function disableRemoveComments(fs: vfs.FileSystem, file: string) {
                replaceText(fs, file, `"removeComments": true`, `"removeComments": false`);
            }

            function diableRemoveCommentsInAll(fs: vfs.FileSystem) {
                disableRemoveComments(fs, "/src/first/tsconfig.json");
                disableRemoveComments(fs, "/src/second/tsconfig.json");
                disableRemoveComments(fs, "/src/third/tsconfig.json");
            }

            function stripInternalOfThird(fs: vfs.FileSystem) {
                replaceText(
                    fs,
                    "/src/third/tsconfig.json",
                    `"declaration": true,`,
                    `"declaration": true,
    "stripInternal": true,`,
                );
            }

            function stripInternalScenario(fs: vfs.FileSystem, removeCommentsDisabled?: boolean, jsDocStyle?: boolean) {
                const internal: string = jsDocStyle ? `/**@internal*/` : `/*@internal*/`;
                if (removeCommentsDisabled) {
                    diableRemoveCommentsInAll(fs);
                }
                stripInternalOfThird(fs);
                replaceText(fs, "/src/first/first_PART1.ts", "interface", `${internal} interface`);
                appendText(
                    fs,
                    "/src/second/second_part1.ts",
                    `
class normalC {
    ${internal} constructor() { }
    ${internal} prop: string;
    ${internal} method() { }
    ${internal} get c() { return 10; }
    ${internal} set c(val: number) { }
}
namespace normalN {
    ${internal} export class C { }
    ${internal} export function foo() {}
    ${internal} export namespace someNamespace { export class C {} }
    ${internal} export namespace someOther.something { export class someClass {} }
    ${internal} export import someImport = someNamespace.C;
    ${internal} export type internalType = internalC;
    ${internal} export const internalConst = 10;
    ${internal} export enum internalEnum { a, b, c }
}
${internal} class internalC {}
${internal} function internalfoo() {}
${internal} namespace internalNamespace { export class someClass {} }
${internal} namespace internalOther.something { export class someClass {} }
${internal} import internalImport = internalNamespace.someClass;
${internal} type internalType = internalC;
${internal} const internalConst = 10;
${internal} enum internalEnum { a, b, c }`,
                );
            }

            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "stripInternal",
                modifyFs: stripInternalScenario,
                modifyAgainFs: fs => replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "stripInternal with comments emit enabled",
                modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true),
                modifyAgainFs: fs => replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "stripInternal jsdoc style comment",
                modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
                modifyAgainFs: fs => replaceText(fs, "/src/first/first_PART1.ts", `/**@internal*/ interface`, "interface"),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "stripInternal jsdoc style with comments emit enabled",
                modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
                ignoreDtsChanged: true,
                baselineOnly: true,
            });

            describe("with three levels of project dependency", () => {
                function makeOneTwoThreeDependOrder(fs: vfs.FileSystem) {
                    replaceText(
                        fs,
                        "/src/second/tsconfig.json",
                        "[",
                        `[
    { "path": "../first", "prepend": true }\n  `,
                    );
                    fs.writeFileSync(
                        "/src/third/tsconfig.json",
                        jsonToReadableText({
                            ...JSON.parse(fs.readFileSync("/src/third/tsconfig.json", "utf-8")!),
                            references: [{ path: "../second", prepend: true }],
                        }),
                    );
                }

                function stripInternalWithDependentOrder(fs: vfs.FileSystem, removeCommentsDisabled?: boolean, jsDocStyle?: boolean) {
                    stripInternalScenario(fs, removeCommentsDisabled, jsDocStyle);
                    makeOneTwoThreeDependOrder(fs);
                }

                // Verify initial + incremental edits
                verifyOutFileScenario({
                    subScenario: "stripInternal when one-two-three are prepended in order",
                    modifyFs: stripInternalWithDependentOrder,
                    modifyAgainFs: fs => replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    subScenario: "stripInternal with comments emit enabled when one-two-three are prepended in order",
                    modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true),
                    modifyAgainFs: fs => replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
                    ignoreDtsChanged: true,
                    baselineOnly: true,
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    subScenario: "stripInternal jsdoc style comment when one-two-three are prepended in order",
                    modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
                    modifyAgainFs: fs => replaceText(fs, "/src/first/first_PART1.ts", `/**@internal*/ interface`, "interface"),
                    ignoreDtsChanged: true,
                    baselineOnly: true,
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    subScenario: "stripInternal jsdoc style with comments emit enabled when one-two-three are prepended in order",
                    modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
                    ignoreDtsChanged: true,
                    baselineOnly: true,
                });
            });

            // only baseline
            verifyOutFileScenario({
                subScenario: "stripInternal baseline when internal is inside another internal",
                modifyFs: fs => {
                    stripInternalOfThird(fs);
                    prependText(
                        fs,
                        "/src/first/first_PART1.ts",
                        `namespace ts {
    /* @internal */
    /**
     * Subset of properties from SourceFile that are used in multiple utility functions
     */
    export interface SourceFileLike {
        readonly text: string;
        lineMap?: ReadonlyArray<number>;
        /* @internal */
        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
    }

    /* @internal */
    export interface RedirectInfo {
        /** Source file this redirects to. */
        readonly redirectTarget: SourceFile;
        /**
         * Source file for the duplicate package. This will not be used by the Program,
         * but we need to keep this around so we can watch for changes in underlying.
         */
        readonly unredirected: SourceFile;
    }

    // Source files are declarations when they are external modules.
    export interface SourceFile {
        someProp: string;
    }
}`,
                    );
                },
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                baselineOnly: true,
            });

            // only baseline
            verifyOutFileScenario({
                subScenario: "stripInternal when few members of enum are internal",
                modifyFs: fs => {
                    stripInternalOfThird(fs);
                    prependText(
                        fs,
                        "/src/first/first_PART1.ts",
                        `enum TokenFlags {
    None = 0,
    /* @internal */
    PrecedingLineBreak = 1 << 0,
    /* @internal */
    PrecedingJSDocComment = 1 << 1,
    /* @internal */
    Unterminated = 1 << 2,
    /* @internal */
    ExtendedUnicodeEscape = 1 << 3,
    Scientific = 1 << 4,
    Octal = 1 << 5,
    HexSpecifier = 1 << 6,
    BinarySpecifier = 1 << 7,
    OctalSpecifier = 1 << 8,
    /* @internal */
    ContainsSeparator = 1 << 9,
    /* @internal */
    BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
    /* @internal */
    NumericLiteralFlags = Scientific | Octal | HexSpecifier | BinaryOrOctalSpecifier | ContainsSeparator
}
`,
                    );
                },
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                baselineOnly: true,
            });

            verifyOutFileScenario({
                subScenario: "stripInternal when prepend is completely internal",
                baselineOnly: true,
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                modifyFs: fs => {
                    fs.writeFileSync("/src/first/first_PART1.ts", "/* @internal */ const A = 1;");
                    fs.writeFileSync("/src/third/third_part1.ts", "const B = 2;");
                    fs.writeFileSync(
                        "/src/first/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: {
                                composite: true,
                                declaration: true,
                                declarationMap: true,
                                skipDefaultLibCheck: true,
                                sourceMap: true,
                                outFile: "./bin/first-output.js",
                            },
                            files: ["/src/first/first_PART1.ts"],
                        }),
                    );
                    fs.writeFileSync(
                        "/src/third/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: {
                                ignoreDeprecations: "5.0",
                                composite: true,
                                declaration: true,
                                declarationMap: false,
                                stripInternal: true,
                                sourceMap: true,
                                outFile: "./thirdjs/output/third-output.js",
                            },
                            references: [{ path: "../first", prepend: true }],
                            files: ["/src/third/third_part1.ts"],
                        }),
                    );
                },
            });
        });

        describe("empty source files", () => {
            function makeThirdEmptySourceFile(fs: vfs.FileSystem) {
                fs.writeFileSync("/src/third/third_part1.ts", "", "utf8");
            }

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "when source files are empty in the own file",
                modifyFs: makeThirdEmptySourceFile,
                ignoreDtsChanged: true,
                baselineOnly: true,
            });

            // only baseline
            verifyOutFileScenario({
                subScenario: "declarationMap and sourceMap disabled",
                modifyFs: fs => {
                    makeThirdEmptySourceFile(fs);
                    replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, "");
                    replaceText(fs, "/src/third/tsconfig.json", `"sourceMap": true,`, "");
                    replaceText(fs, "/src/third/tsconfig.json", `"declarationMap": true,`, "");
                },
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                baselineOnly: true,
            });
        });
    });

    verifyTsc({
        scenario: "outFile",
        subScenario: "non module projects without prepend",
        fs: () => outFileFs,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        modifyFs: fs => {
            // No prepend
            replaceText(fs, "/src/third/tsconfig.json", `"prepend": true`, "");
            replaceText(fs, "/src/third/tsconfig.json", `"prepend": true`, "");

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
