/// <reference path="harness.ts" />
/// <reference path="runnerbase.ts" />
/// <reference path="typeWriter.ts" />
/* tslint:disable:no-null */

const enum CompilerTestType {
    Conformance,
    Regressions,
    Test262
}

class CompilerBaselineRunner extends RunnerBase {
    private basePath = "tests/cases";
    private testSuiteName: string;
    private errors: boolean;
    private emit: boolean;
    private decl: boolean;
    private output: boolean;

    public options: string;

    constructor(public testType: CompilerTestType) {
        super();
        this.errors = true;
        this.emit = true;
        this.decl = true;
        this.output = true;
        if (testType === CompilerTestType.Conformance) {
            this.testSuiteName = "conformance";
        }
        else if (testType === CompilerTestType.Regressions) {
            this.testSuiteName = "compiler";
        }
        else if (testType === CompilerTestType.Test262) {
            this.testSuiteName = "test262";
        }
        else {
            this.testSuiteName = "compiler"; // default to this for historical reasons
        }
        this.basePath += "/" + this.testSuiteName;
    }

    private makeUnitName(name: string, root: string) {
        return ts.isRootedDiskPath(name) ? name : ts.combinePaths(root, name);
    };

    public checkTestCodeOutput(fileName: string) {
        describe("compiler tests for " + fileName, () => {
            // Mocha holds onto the closure environment of the describe callback even after the test is done.
            // Everything declared here should be cleared out in the "after" callback.
            let justName: string;
            let lastUnit: Harness.TestCaseParser.TestUnitData;
            let harnessSettings: Harness.TestCaseParser.CompilerSettings;

            let result: Harness.Compiler.CompilerResult;
            let options: ts.CompilerOptions;
            // equivalent to the files that will be passed on the command line
            let toBeCompiled: Harness.Compiler.TestFile[];
            // equivalent to other files on the file system not directly passed to the compiler (ie things that are referenced by other files)
            let otherFiles: Harness.Compiler.TestFile[];

            before(() => {
                justName = fileName.replace(/^.*[\\\/]/, ""); // strips the fileName from the path.
                const content = Harness.IO.readFile(fileName);
                const rootDir = fileName.indexOf("conformance") === -1 ? "tests/cases/compiler/" : ts.getDirectoryPath(fileName) + "/";
                const testCaseContent = Harness.TestCaseParser.makeUnitsFromTest(content, fileName, rootDir);
                const units = testCaseContent.testUnitData;
                harnessSettings = testCaseContent.settings;
                let tsConfigOptions: ts.CompilerOptions;
                if (testCaseContent.tsConfig) {
                    assert.equal(testCaseContent.tsConfig.fileNames.length, 0, `list of files in tsconfig is not currently supported`);

                    tsConfigOptions = ts.clone(testCaseContent.tsConfig.options);
                }
                else {
                    const baseUrl = harnessSettings["baseUrl"];
                    if (baseUrl !== undefined && !ts.isRootedDiskPath(baseUrl)) {
                        harnessSettings["baseUrl"] = ts.getNormalizedAbsolutePath(baseUrl, rootDir);
                    }
                }

                lastUnit = units[units.length - 1];
                // We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
                // If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
                // otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.
                toBeCompiled = [];
                otherFiles = [];

                if (/require\(/.test(lastUnit.content) || /reference\spath/.test(lastUnit.content)) {
                    toBeCompiled.push({ unitName: this.makeUnitName(lastUnit.name, rootDir), content: lastUnit.content });
                    units.forEach(unit => {
                        if (unit.name !== lastUnit.name) {
                            otherFiles.push({ unitName: this.makeUnitName(unit.name, rootDir), content: unit.content });
                        }
                    });
                }
                else {
                    toBeCompiled = units.map(unit => {
                        return { unitName: this.makeUnitName(unit.name, rootDir), content: unit.content };
                    });
                }

                const output = Harness.Compiler.compileFiles(
                    toBeCompiled, otherFiles, harnessSettings, /*options*/ tsConfigOptions, /*currentDirectory*/ undefined);

                options = output.options;
                result = output.result;
            });

            after(() => {
                // Mocha holds onto the closure environment of the describe callback even after the test is done.
                // Therefore we have to clean out large objects after the test is done.
                justName = undefined;
                lastUnit = undefined;
                result = undefined;
                options = undefined;
                toBeCompiled = undefined;
                otherFiles = undefined;
            });

            function getByteOrderMarkText(file: Harness.Compiler.GeneratedFile): string {
                return file.writeByteOrderMark ? "\u00EF\u00BB\u00BF" : "";
            }

            function getErrorBaseline(toBeCompiled: Harness.Compiler.TestFile[], otherFiles: Harness.Compiler.TestFile[], result: Harness.Compiler.CompilerResult) {
                return Harness.Compiler.getErrorBaseline(toBeCompiled.concat(otherFiles), result.errors);
            }

            // check errors
            it("Correct errors for " + fileName, () => {
                if (this.errors) {
                    Harness.Baseline.runBaseline("Correct errors for " + fileName, justName.replace(/\.tsx?$/, ".errors.txt"), (): string => {
                        if (result.errors.length === 0) return null;
                        return getErrorBaseline(toBeCompiled, otherFiles, result);
                    });
                }
            });

            // Source maps?
            it("Correct sourcemap content for " + fileName, () => {
                if (options.sourceMap || options.inlineSourceMap) {
                    Harness.Baseline.runBaseline("Correct sourcemap content for " + fileName, justName.replace(/\.tsx?$/, ".sourcemap.txt"), () => {
                        const record = result.getSourceMapRecord();
                        if (options.noEmitOnError && result.errors.length !== 0 && record === undefined) {
                            // Because of the noEmitOnError option no files are created. We need to return null because baselining isn"t required.
                            return null;
                        }
                        return record;
                    });
                }
            });

            it("Correct JS output for " + fileName, () => {
                if (!ts.fileExtensionIs(lastUnit.name, ".d.ts") && this.emit) {
                    if (result.files.length === 0 && result.errors.length === 0) {
                        throw new Error("Expected at least one js file to be emitted or at least one error to be created.");
                    }

                    // check js output
                    Harness.Baseline.runBaseline("Correct JS output for " + fileName, justName.replace(/\.tsx?/, ".js"), () => {
                        let tsCode = "";
                        const tsSources = otherFiles.concat(toBeCompiled);
                        if (tsSources.length > 1) {
                            tsCode += "//// [" + fileName + "] ////\r\n\r\n";
                        }
                        for (let i = 0; i < tsSources.length; i++) {
                            tsCode += "//// [" + Harness.Path.getFileName(tsSources[i].unitName) + "]\r\n";
                            tsCode += tsSources[i].content + (i < (tsSources.length - 1) ? "\r\n" : "");
                        }

                        let jsCode = "";
                        for (let i = 0; i < result.files.length; i++) {
                            jsCode += "//// [" + Harness.Path.getFileName(result.files[i].fileName) + "]\r\n";
                            jsCode += getByteOrderMarkText(result.files[i]);
                            jsCode += result.files[i].code;
                        }

                        if (result.declFilesCode.length > 0) {
                            jsCode += "\r\n\r\n";
                            for (let i = 0; i < result.declFilesCode.length; i++) {
                                jsCode += "//// [" + Harness.Path.getFileName(result.declFilesCode[i].fileName) + "]\r\n";
                                jsCode += getByteOrderMarkText(result.declFilesCode[i]);
                                jsCode += result.declFilesCode[i].code;
                            }
                        }

                        const declFileCompilationResult =
                            Harness.Compiler.compileDeclarationFiles(
                                toBeCompiled, otherFiles, result, harnessSettings, options, /*currentDirectory*/ undefined);

                        if (declFileCompilationResult && declFileCompilationResult.declResult.errors.length) {
                            jsCode += "\r\n\r\n//// [DtsFileErrors]\r\n";
                            jsCode += "\r\n\r\n";
                            jsCode += getErrorBaseline(declFileCompilationResult.declInputFiles, declFileCompilationResult.declOtherFiles, declFileCompilationResult.declResult);
                        }

                        if (jsCode.length > 0) {
                            return tsCode + "\r\n\r\n" + jsCode;
                        }
                        else {
                            return null;
                        }
                    });
                }
            });

            it("Correct Sourcemap output for " + fileName, () => {
                if (options.inlineSourceMap) {
                    if (result.sourceMaps.length > 0) {
                        throw new Error("No sourcemap files should be generated if inlineSourceMaps was set.");
                    }
                    return null;
                }
                else if (options.sourceMap) {
                    if (result.sourceMaps.length !== result.files.length) {
                        throw new Error("Number of sourcemap files should be same as js files.");
                    }

                    Harness.Baseline.runBaseline("Correct Sourcemap output for " + fileName, justName.replace(/\.tsx?/, ".js.map"), () => {
                        if (options.noEmitOnError && result.errors.length !== 0 && result.sourceMaps.length === 0) {
                            // We need to return null here or the runBaseLine will actually create a empty file.
                            // Baselining isn't required here because there is no output.
                            return null;
                        }

                        let sourceMapCode = "";
                        for (let i = 0; i < result.sourceMaps.length; i++) {
                            sourceMapCode += "//// [" + Harness.Path.getFileName(result.sourceMaps[i].fileName) + "]\r\n";
                            sourceMapCode += getByteOrderMarkText(result.sourceMaps[i]);
                            sourceMapCode += result.sourceMaps[i].code;
                        }

                        return sourceMapCode;
                    });
                }
            });

            it("Correct type/symbol baselines for " + fileName, () => {
                if (fileName.indexOf("APISample") >= 0) {
                    return;
                }

                // NEWTODO: Type baselines
                if (result.errors.length === 0) {
                    // The full walker simulates the types that you would get from doing a full
                    // compile.  The pull walker simulates the types you get when you just do
                    // a type query for a random node (like how the LS would do it).  Most of the
                    // time, these will be the same.  However, occasionally, they can be different.
                    // Specifically, when the compiler internally depends on symbol IDs to order
                    // things, then we may see different results because symbols can be created in a
                    // different order with 'pull' operations, and thus can produce slightly differing
                    // output.
                    //
                    // For example, with a full type check, we may see a type outputed as: number | string
                    // But with a pull type check, we may see it as:                       string | number
                    //
                    // These types are equivalent, but depend on what order the compiler observed
                    // certain parts of the program.

                    const program = result.program;
                    const allFiles = toBeCompiled.concat(otherFiles).filter(file => !!program.getSourceFile(file.unitName));

                    const fullWalker = new TypeWriterWalker(program, /*fullTypeCheck*/ true);
                    const pullWalker = new TypeWriterWalker(program, /*fullTypeCheck*/ false);

                    const fullResults: ts.Map<TypeWriterResult[]> = {};
                    const pullResults: ts.Map<TypeWriterResult[]> = {};

                    for (const sourceFile of allFiles) {
                        fullResults[sourceFile.unitName] = fullWalker.getTypeAndSymbols(sourceFile.unitName);
                        pullResults[sourceFile.unitName] = fullWalker.getTypeAndSymbols(sourceFile.unitName);
                    }

                    // Produce baselines.  The first gives the types for all expressions.
                    // The second gives symbols for all identifiers.
                    let e1: Error, e2: Error;
                    try {
                        checkBaseLines(/*isSymbolBaseLine*/ false);
                    }
                    catch (e) {
                        e1 = e;
                    }

                    try {
                        checkBaseLines(/*isSymbolBaseLine*/ true);
                    }
                    catch (e) {
                        e2 = e;
                    }

                    if (e1 || e2) {
                        throw e1 || e2;
                    }

                    return;

                    function checkBaseLines(isSymbolBaseLine: boolean) {
                        const fullBaseLine = generateBaseLine(fullResults, isSymbolBaseLine);
                        const pullBaseLine = generateBaseLine(pullResults, isSymbolBaseLine);

                        const fullExtension = isSymbolBaseLine ? ".symbols" : ".types";
                        const pullExtension = isSymbolBaseLine ? ".symbols.pull" : ".types.pull";

                        if (fullBaseLine !== pullBaseLine) {
                            Harness.Baseline.runBaseline("Correct full information for " + fileName, justName.replace(/\.tsx?/, fullExtension), () => fullBaseLine);
                            Harness.Baseline.runBaseline("Correct pull information for " + fileName, justName.replace(/\.tsx?/, pullExtension), () => pullBaseLine);
                        }
                        else {
                            Harness.Baseline.runBaseline("Correct information for " + fileName, justName.replace(/\.tsx?/, fullExtension), () => fullBaseLine);
                        }
                    }

                    function generateBaseLine(typeWriterResults: ts.Map<TypeWriterResult[]>, isSymbolBaseline: boolean): string {
                        const typeLines: string[] = [];
                        const typeMap: { [fileName: string]: { [lineNum: number]: string[]; } } = {};

                        allFiles.forEach(file => {
                            const codeLines = file.content.split("\n");
                            typeWriterResults[file.unitName].forEach(result => {
                                if (isSymbolBaseline && !result.symbol) {
                                    return;
                                }

                                const typeOrSymbolString = isSymbolBaseline ? result.symbol : result.type;
                                const formattedLine = result.sourceText.replace(/\r?\n/g, "") + " : " + typeOrSymbolString;
                                if (!typeMap[file.unitName]) {
                                    typeMap[file.unitName] = {};
                                }

                                let typeInfo = [formattedLine];
                                const existingTypeInfo = typeMap[file.unitName][result.line];
                                if (existingTypeInfo) {
                                    typeInfo = existingTypeInfo.concat(typeInfo);
                                }
                                typeMap[file.unitName][result.line] = typeInfo;
                            });

                            typeLines.push("=== " + file.unitName + " ===\r\n");
                            for (let i = 0; i < codeLines.length; i++) {
                                const currentCodeLine = codeLines[i];
                                typeLines.push(currentCodeLine + "\r\n");
                                if (typeMap[file.unitName]) {
                                    const typeInfo = typeMap[file.unitName][i];
                                    if (typeInfo) {
                                        typeInfo.forEach(ty => {
                                            typeLines.push(">" + ty + "\r\n");
                                        });
                                        if (i + 1 < codeLines.length && (codeLines[i + 1].match(/^\s*[{|}]\s*$/) || codeLines[i + 1].trim() === "")) {
                                        }
                                        else {
                                            typeLines.push("\r\n");
                                        }
                                    }
                                }
                                else {
                                    typeLines.push("No type information for this code.");
                                }
                            }
                        });

                        return typeLines.join("");
                    }
                }
            });
        });
    }

    public initializeTests() {
        describe(this.testSuiteName + " tests", () => {
            describe("Setup compiler for compiler baselines", () => {
                this.parseOptions();
            });

            // this will set up a series of describe/it blocks to run between the setup and cleanup phases
            if (this.tests.length === 0) {
                const testFiles = this.enumerateFiles(this.basePath, /\.tsx?$/, { recursive: true });
                testFiles.forEach(fn => {
                    fn = fn.replace(/\\/g, "/");
                    this.checkTestCodeOutput(fn);
                });
            }
            else {
                this.tests.forEach(test => this.checkTestCodeOutput(test));
            }
        });
    }

    private parseOptions() {
        if (this.options && this.options.length > 0) {
            this.errors = false;
            this.emit = false;
            this.decl = false;
            this.output = false;

            const opts = this.options.split(",");
            for (let i = 0; i < opts.length; i++) {
                switch (opts[i]) {
                    case "error":
                        this.errors = true;
                        break;
                    case "emit":
                        this.emit = true;
                        break;
                    case "decl":
                        this.decl = true;
                        break;
                    case "output":
                        this.output = true;
                        break;
                    default:
                        throw new Error("unsupported flag");
                }
            }
        }
    }
}
