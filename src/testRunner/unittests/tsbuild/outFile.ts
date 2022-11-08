import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import * as fakes from "../../_namespaces/fakes";

describe("unittests:: tsbuild:: outFile::", () => {
    let outFileFs: vfs.FileSystem;
    let outFileWithBuildFs: vfs.FileSystem;
    before(() => {
        outFileFs = ts.loadProjectFromDisk("tests/projects/outfile-concat");
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
        const edits: ts.TestTscEdit[] = [];
        if (!ignoreDtsChanged) {
            edits.push({
                subScenario: "incremental-declaration-changes",
                modifyFs: fs => ts.replaceText(fs, "/src/first/first_PART1.ts", "Hello", "Hola"),
            });
        }
        if (!ignoreDtsUnchanged) {
            edits.push({
                subScenario: "incremental-declaration-doesnt-change",
                modifyFs: fs => ts.appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
            });
        }
        if (modifyAgainFs) {
            edits.push({
                subScenario: "incremental-headers-change-without-dts-changes",
                modifyFs: modifyAgainFs
            });
        }
        const input: ts.VerifyTscWithEditsInput = {
            subScenario,
            fs: () => outFileFs,
            scenario: "outfile-concat",
            commandLineArgs: ["--b", "/src/third", "--verbose", ...(additionalCommandLineArgs || [])],
            baselineSourceMap: true,
            modifyFs,
            baselineReadFileCalls: !baselineOnly,
            edits,
        };
        return edits.length ?
            ts.verifyTscWithEdits(input) :
            ts.verifyTsc(input);
    }

    // Verify initial + incremental edits
    verifyOutFileScenario({
        subScenario: "baseline sectioned sourcemaps",
    });

    verifyOutFileScenario({
        subScenario: "explainFiles",
        additionalCommandLineArgs: ["--explainFiles"],
        baselineOnly: true
    });

    // Verify baseline with build info + dts unChanged
    verifyOutFileScenario({
        subScenario: "when final project is not composite but uses project references",
        modifyFs: fs => ts.replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, ""),
        ignoreDtsChanged: true,
        baselineOnly: true
    });

    // Verify baseline with build info
    verifyOutFileScenario({
        subScenario: "when final project is not composite but incremental",
        modifyFs: fs => ts.replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, `"incremental": true,`),
        ignoreDtsChanged: true,
        ignoreDtsUnchanged: true,
        baselineOnly: true
    });

    // Verify baseline with build info
    verifyOutFileScenario({
        subScenario: "when final project specifies tsBuildInfoFile",
        modifyFs: fs => ts.replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, `"composite": true,
        "tsBuildInfoFile": "./thirdjs/output/third.tsbuildinfo",`),
        ignoreDtsChanged: true,
        ignoreDtsUnchanged: true,
        baselineOnly: true
    });

    function getOutFileFsAfterBuild() {
        if (outFileWithBuildFs) return outFileWithBuildFs;
        const fs = outFileFs.shadow();
        const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc" });
        const host = ts.createSolutionBuilderHostForBaseline(sys as ts.TscCompileSystem);
        const builder = ts.createSolutionBuilder(host, ["/src/third"], { dry: false, force: false, verbose: true });
        builder.build();
        fs.makeReadonly();
        return outFileWithBuildFs = fs;
    }

    ts.verifyTscWithEdits({
        scenario: "outFile",
        subScenario: "clean projects",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--b", "/src/third", "--clean"],
        edits: ts.noChangeOnlyRuns
    });

    ts.verifyTsc({
        scenario: "outFile",
        subScenario: "verify buildInfo absence results in new build",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        modifyFs: fs => fs.unlinkSync("/src/first/bin/first-output.tsbuildinfo"),
    });

    ts.verifyTsc({
        scenario: "outFile",
        subScenario: "tsbuildinfo is not generated when incremental is set to false",
        fs: () => outFileFs,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        modifyFs: fs => ts.replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, ""),
    });

    ts.verifyTscCompileLike(ts.testTscCompileLike, {
        scenario: "outFile",
        subScenario: "rebuilds completely when version in tsbuildinfo doesnt match ts version",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        compile: sys => {
            // Buildinfo will have version which does not match with current ts version
            const buildHost = ts.createSolutionBuilderHostForBaseline(sys, "FakeTSCurrentVersion");
            const builder = ts.createSolutionBuilder(buildHost, ["/src/third"], { verbose: true });
            sys.exit(builder.build());
        }
    });

    ts.verifyTscWithEdits({
        scenario: "outFile",
        subScenario: "rebuilds completely when command line incremental flag changes between non dts changes",
        fs: () => outFileFs,
        // Make non composite third project
        modifyFs: fs => ts.replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, ""),
        // Build with command line incremental
        commandLineArgs: ["--b", "/src/third", "--i", "--verbose"],
        edits: [
            {
                subScenario: "Make non incremental build with change in file that doesnt affect dts",
                modifyFs: fs => ts.appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
                commandLineArgs: ["--b", "/src/third", "--verbose"],
            },
            {
                subScenario: "Make incremental build with change in file that doesnt affect dts",
                modifyFs: fs => ts.appendText(fs, "/src/first/first_PART1.ts", "console.log(s);"),
                commandLineArgs: ["--b", "/src/third", "--verbose", "--incremental"],
            }
        ]
    });

    ts.verifyTscWithEdits({
        scenario: "outFile",
        subScenario: "when input file text does not change but its modified time changes",
        fs: () => outFileFs,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        edits: [
            {
                subScenario: "upstream project changes without changing file text",
                modifyFs: fs => {
                    const time = new Date(fs.time());
                    fs.utimesSync("/src/first/first_PART1.ts", time, time);
                },
            },
        ]
    });

    ts.verifyTscCompileLike(ts.testTscCompileLike, {
        scenario: "outFile",
        subScenario: "builds till project specified",
        fs: () => outFileFs,
        commandLineArgs: ["--build", "/src/second/tsconfig.json"],
        compile: sys => {
            const buildHost = ts.createSolutionBuilderHostForBaseline(sys);
            const builder = ts.createSolutionBuilder(buildHost, ["/src/third/tsconfig.json"], {});
            sys.exit(builder.build("/src/second/tsconfig.json"));
        }
    });

    ts.verifyTscCompileLike(ts.testTscCompileLike, {
        scenario: "outFile",
        subScenario: "cleans till project specified",
        fs: getOutFileFsAfterBuild,
        commandLineArgs: ["--build", "--clean", "/src/second/tsconfig.json"],
        compile: sys => {
            const buildHost = ts.createSolutionBuilderHostForBaseline(sys);
            const builder = ts.createSolutionBuilder(buildHost, ["/src/third/tsconfig.json"], { verbose: true });
            sys.exit(builder.clean("/src/second/tsconfig.json"));
        }
    });

    describe("Prepend output with .tsbuildinfo", () => {
        // Prologues
        describe("Prologues", () => {
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "strict in all projects",
                modifyFs: fs => {
                    ts.enableStrict(fs, "/src/first/tsconfig.json");
                    ts.enableStrict(fs, "/src/second/tsconfig.json");
                    ts.enableStrict(fs, "/src/third/tsconfig.json");
                },
                modifyAgainFs: fs => ts.addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue"`)
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "strict in one dependency",
                modifyFs: fs => ts.enableStrict(fs, "/src/second/tsconfig.json"),
                modifyAgainFs: fs => ts.addTestPrologue(fs, "src/first/first_PART1.ts", `"myPrologue"`),
                ignoreDtsChanged: true,
                baselineOnly: true
            });

            // Verify initial + incremental edits - sourcemap verification
            verifyOutFileScenario({
                subScenario: "multiple prologues in all projects",
                modifyFs: fs => {
                    ts.enableStrict(fs, "/src/first/tsconfig.json");
                    ts.addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue"`);
                    ts.enableStrict(fs, "/src/second/tsconfig.json");
                    ts.addTestPrologue(fs, "/src/second/second_part1.ts", `"myPrologue"`);
                    ts.addTestPrologue(fs, "/src/second/second_part2.ts", `"myPrologue2";`);
                    ts.enableStrict(fs, "/src/third/tsconfig.json");
                    ts.addTestPrologue(fs, "/src/third/third_part1.ts", `"myPrologue";`);
                    ts.addTestPrologue(fs, "/src/third/third_part1.ts", `"myPrologue3";`);
                },
                modifyAgainFs: fs => ts.addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue5"`)
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "multiple prologues in different projects",
                modifyFs: fs => {
                    ts.enableStrict(fs, "/src/first/tsconfig.json");
                    ts.addTestPrologue(fs, "/src/second/second_part1.ts", `"myPrologue"`);
                    ts.addTestPrologue(fs, "/src/second/second_part2.ts", `"myPrologue2";`);
                    ts.enableStrict(fs, "/src/third/tsconfig.json");
                },
                modifyAgainFs: fs => ts.addTestPrologue(fs, "/src/first/first_PART1.ts", `"myPrologue5"`),
                ignoreDtsChanged: true,
                baselineOnly: true
            });
        });

        // Shebang
        describe("Shebang", () => {
            // changes declaration because its emitted in .d.ts file
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "shebang in all projects",
                modifyFs: fs => {
                    ts.addShebang(fs, "first", "first_PART1");
                    ts.addShebang(fs, "first", "first_part2");
                    ts.addShebang(fs, "second", "second_part1");
                    ts.addShebang(fs, "third", "third_part1");
                },
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "shebang in only one dependency project",
                modifyFs: fs => ts.addShebang(fs, "second", "second_part1"),
                ignoreDtsChanged: true,
                baselineOnly: true
            });
        });

        // emitHelpers
        describe("emitHelpers", () => {
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "emitHelpers in all projects",
                modifyFs: fs => {
                    ts.addRest(fs, "first", "first_PART1");
                    ts.addRest(fs, "second", "second_part1");
                    ts.addRest(fs, "third", "third_part1");
                },
                modifyAgainFs: fs => ts.removeRest(fs, "first", "first_PART1")
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "emitHelpers in only one dependency project",
                modifyFs: fs => {
                    ts.addStubFoo(fs, "first", "first_PART1");
                    ts.addRest(fs, "second", "second_part1");
                },
                modifyAgainFs: fs => ts.changeStubToRest(fs, "first", "first_PART1"),
                ignoreDtsChanged: true,
                baselineOnly: true
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "multiple emitHelpers in all projects",
                modifyFs: fs => {
                    ts.addRest(fs, "first", "first_PART1");
                    ts.addSpread(fs, "first", "first_part3");
                    ts.addRest(fs, "second", "second_part1");
                    ts.addSpread(fs, "second", "second_part2");
                    ts.addRest(fs, "third", "third_part1");
                    ts.addSpread(fs, "third", "third_part1");
                },
                modifyAgainFs: fs => ts.removeRest(fs, "first", "first_PART1"),
                ignoreDtsChanged: true,
                baselineOnly: true
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "multiple emitHelpers in different projects",
                modifyFs: fs => {
                    ts.addRest(fs, "first", "first_PART1");
                    ts.addSpread(fs, "second", "second_part1");
                    ts.addRest(fs, "third", "third_part1");
                },
                modifyAgainFs: fs => ts.removeRest(fs, "first", "first_PART1"),
                ignoreDtsChanged: true,
                baselineOnly: true
            });
        });

        // triple slash refs
        describe("triple slash refs", () => {
            // changes declaration because its emitted in .d.ts file
            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "triple slash refs in all projects",
                modifyFs: fs => {
                    ts.addTripleSlashRef(fs, "first", "first_part2");
                    ts.addTripleSlashRef(fs, "second", "second_part1");
                    ts.addTripleSlashRef(fs, "third", "third_part1");
                }
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "triple slash refs in one project",
                modifyFs: fs => ts.addTripleSlashRef(fs, "second", "second_part1"),
                ignoreDtsChanged: true,
                baselineOnly: true
            });
        });

        describe("stripInternal", () => {
            function disableRemoveComments(fs: vfs.FileSystem, file: string) {
                ts.replaceText(fs, file, `"removeComments": true`, `"removeComments": false`);
            }

            function diableRemoveCommentsInAll(fs: vfs.FileSystem) {
                disableRemoveComments(fs, "/src/first/tsconfig.json");
                disableRemoveComments(fs, "/src/second/tsconfig.json");
                disableRemoveComments(fs, "/src/third/tsconfig.json");
            }

            function stripInternalOfThird(fs: vfs.FileSystem) {
                ts.replaceText(fs, "/src/third/tsconfig.json", `"declaration": true,`, `"declaration": true,
    "stripInternal": true,`);
            }

            function stripInternalScenario(fs: vfs.FileSystem, removeCommentsDisabled?: boolean, jsDocStyle?: boolean) {
                const internal: string = jsDocStyle ? `/**@internal*/` : `/*@internal*/`;
                if (removeCommentsDisabled) {
                    diableRemoveCommentsInAll(fs);
                }
                stripInternalOfThird(fs);
                ts.replaceText(fs, "/src/first/first_PART1.ts", "interface", `${internal} interface`);
                ts.appendText(fs, "/src/second/second_part1.ts", `
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
${internal} enum internalEnum { a, b, c }`);
            }

            // Verify initial + incremental edits
            verifyOutFileScenario({
                subScenario: "stripInternal",
                modifyFs: stripInternalScenario,
                modifyAgainFs: fs => ts.replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "stripInternal with comments emit enabled",
                modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true),
                modifyAgainFs: fs => ts.replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
                ignoreDtsChanged: true,
                baselineOnly: true
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "stripInternal jsdoc style comment",
                modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
                modifyAgainFs: fs => ts.replaceText(fs, "/src/first/first_PART1.ts", `/**@internal*/ interface`, "interface"),
                ignoreDtsChanged: true,
                baselineOnly: true
            });

            // Verify ignore dtsChanged
            verifyOutFileScenario({
                subScenario: "stripInternal jsdoc style with comments emit enabled",
                modifyFs: fs => stripInternalScenario(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
                ignoreDtsChanged: true,
                baselineOnly: true
            });

            describe("with three levels of project dependency", () => {
                function makeOneTwoThreeDependOrder(fs: vfs.FileSystem) {
                    ts.replaceText(fs, "/src/second/tsconfig.json", "[", `[
    { "path": "../first", "prepend": true }`);
                    ts.replaceText(fs, "/src/third/tsconfig.json", `{ "path": "../first", "prepend": true },`, "");
                }

                function stripInternalWithDependentOrder(fs: vfs.FileSystem, removeCommentsDisabled?: boolean, jsDocStyle?: boolean) {
                    stripInternalScenario(fs, removeCommentsDisabled, jsDocStyle);
                    makeOneTwoThreeDependOrder(fs);
                }

                // Verify initial + incremental edits
                verifyOutFileScenario({
                    subScenario: "stripInternal when one-two-three are prepended in order",
                    modifyFs: stripInternalWithDependentOrder,
                    modifyAgainFs: fs => ts.replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    subScenario: "stripInternal with comments emit enabled when one-two-three are prepended in order",
                    modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true),
                    modifyAgainFs: fs => ts.replaceText(fs, "/src/first/first_PART1.ts", `/*@internal*/ interface`, "interface"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    subScenario: "stripInternal jsdoc style comment when one-two-three are prepended in order",
                    modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ false, /*jsDocStyle*/ true),
                    modifyAgainFs: fs => ts.replaceText(fs, "/src/first/first_PART1.ts", `/**@internal*/ interface`, "interface"),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });

                // Verify ignore dtsChanged
                verifyOutFileScenario({
                    subScenario: "stripInternal jsdoc style with comments emit enabled when one-two-three are prepended in order",
                    modifyFs: fs => stripInternalWithDependentOrder(fs, /*removeCommentsDisabled*/ true, /*jsDocStyle*/ true),
                    ignoreDtsChanged: true,
                    baselineOnly: true
                });
            });

            // only baseline
            verifyOutFileScenario({
                subScenario: "stripInternal baseline when internal is inside another internal",
                modifyFs: fs => {
                    stripInternalOfThird(fs);
                    ts.prependText(fs, "/src/first/first_PART1.ts", `namespace ts {
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
}`);
                },
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                baselineOnly: true
            });

            // only baseline
            verifyOutFileScenario({
                subScenario: "stripInternal when few members of enum are internal",
                modifyFs: fs => {
                    stripInternalOfThird(fs);
                    ts.prependText(fs, "/src/first/first_PART1.ts", `enum TokenFlags {
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
`);
                },
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                baselineOnly: true
            });

            verifyOutFileScenario({
                subScenario: "stripInternal when prepend is completely internal",
                baselineOnly: true,
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                modifyFs: fs => {
                    fs.writeFileSync("/src/first/first_PART1.ts", "/* @internal */ const A = 1;");
                    fs.writeFileSync("/src/third/third_part1.ts", "const B = 2;");
                    fs.writeFileSync("/src/first/tsconfig.json", JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            declaration: true,
                            declarationMap: true,
                            skipDefaultLibCheck: true,
                            sourceMap: true,
                            outFile: "./bin/first-output.js"
                        },
                        files: ["/src/first/first_PART1.ts"]
                    }));
                    fs.writeFileSync("/src/third/tsconfig.json", JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            declaration: true,
                            declarationMap: false,
                            stripInternal: true,
                            sourceMap: true,
                            outFile: "./thirdjs/output/third-output.js",
                        },
                        references: [{ path: "../first", prepend: true }],
                        files: ["/src/third/third_part1.ts"]
                    }));
                }
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
                baselineOnly: true
            });

            // only baseline
            verifyOutFileScenario({
                subScenario: "declarationMap and sourceMap disabled",
                modifyFs: fs => {
                    makeThirdEmptySourceFile(fs);
                    ts.replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, "");
                    ts.replaceText(fs, "/src/third/tsconfig.json", `"sourceMap": true,`, "");
                    ts.replaceText(fs, "/src/third/tsconfig.json", `"declarationMap": true,`, "");
                },
                ignoreDtsChanged: true,
                ignoreDtsUnchanged: true,
                baselineOnly: true
            });
        });
    });

    ts.verifyTsc({
        scenario: "outFile",
        subScenario: "non module projects without prepend",
        fs: () => outFileFs,
        commandLineArgs: ["--b", "/src/third", "--verbose"],
        modifyFs: fs => {
            // No prepend
            ts.replaceText(fs, "/src/third/tsconfig.json", `{ "path": "../first", "prepend": true }`, `{ "path": "../first" }`);
            ts.replaceText(fs, "/src/third/tsconfig.json", `{ "path": "../second", "prepend": true }`, `{ "path": "../second" }`);

            // Non Modules
            ts.replaceText(fs, "/src/first/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);
            ts.replaceText(fs, "/src/second/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);
            ts.replaceText(fs, "/src/third/tsconfig.json", `"composite": true,`, `"composite": true, "module": "none",`);

            // Own file emit
            ts.replaceText(fs, "/src/first/tsconfig.json", `"outFile": "./bin/first-output.js",`, "");
            ts.replaceText(fs, "/src/second/tsconfig.json", `"outFile": "../2/second-output.js",`, "");
            ts.replaceText(fs, "/src/third/tsconfig.json", `"outFile": "./thirdjs/output/third-output.js",`, "");
        },
    });
});
