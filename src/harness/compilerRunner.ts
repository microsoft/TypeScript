/// <reference path="harness.ts" />
/// <reference path="runnerbase.ts" />
/// <reference path="typeWriter.ts" />

const enum CompilerTestType {
    Conformance,
    Regressions,
    Test262
}

class CompilerBaselineRunner extends RunnerBase {
    private basePath = "tests/cases";
    private testSuiteName: TestRunnerKind;
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

    public kind() {
        return this.testSuiteName;
    }

    public enumerateTestFiles() {
        return this.enumerateFiles(this.basePath, /\.tsx?$/, { recursive: true });
    }

    private makeUnitName(name: string, root: string) {
        const path = ts.toPath(name, root, (fileName) => Harness.Compiler.getCanonicalFileName(fileName));
        const pathStart = ts.toPath(Harness.IO.getCurrentDirectory(), "", (fileName) => Harness.Compiler.getCanonicalFileName(fileName));
        return pathStart ? path.replace(pathStart, "/") : path;
    }

    public checkTestCodeOutput(fileName: string) {
        describe("compiler tests for " + fileName, () => {
            // Mocha holds onto the closure environment of the describe callback even after the test is done.
            // Everything declared here should be cleared out in the "after" callback.
            let justName: string;
            let lastUnit: Harness.TestCaseParser.TestUnitData;
            let harnessSettings: Harness.TestCaseParser.CompilerSettings;
            let hasNonDtsFiles: boolean;

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
                hasNonDtsFiles = ts.forEach(units, unit => !ts.fileExtensionIs(unit.name, ts.Extension.Dts));
                // We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
                // If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
                // otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.
                toBeCompiled = [];
                otherFiles = [];

                if (testCaseContent.settings["noImplicitReferences"] || /require\(/.test(lastUnit.content) || /reference\spath/.test(lastUnit.content)) {
                    toBeCompiled.push({ unitName: this.makeUnitName(lastUnit.name, rootDir), content: lastUnit.content, fileOptions: lastUnit.fileOptions });
                    units.forEach(unit => {
                        if (unit.name !== lastUnit.name) {
                            otherFiles.push({ unitName: this.makeUnitName(unit.name, rootDir), content: unit.content, fileOptions: unit.fileOptions });
                        }
                    });
                }
                else {
                    toBeCompiled = units.map(unit => {
                        return { unitName: this.makeUnitName(unit.name, rootDir), content: unit.content, fileOptions: unit.fileOptions };
                    });
                }

                if (tsConfigOptions && tsConfigOptions.configFilePath !== undefined) {
                    tsConfigOptions.configFilePath = ts.combinePaths(rootDir, tsConfigOptions.configFilePath);
                }

                const output = Harness.Compiler.compileFiles(
                    toBeCompiled, otherFiles, harnessSettings, /*options*/ tsConfigOptions, /*currentDirectory*/ harnessSettings["currentDirectory"]);

                options = output.options;
                result = output.result;
            });

            after(() => {
                // Mocha holds onto the closure environment of the describe callback even after the test is done.
                // Therefore we have to clean out large objects after the test is done.
                justName = undefined;
                lastUnit = undefined;
                hasNonDtsFiles = undefined;
                result = undefined;
                options = undefined;
                toBeCompiled = undefined;
                otherFiles = undefined;
            });

            // check errors
            it("Correct errors for " + fileName, () => {
                 Harness.Compiler.doErrorBaseline(justName, toBeCompiled.concat(otherFiles), result.errors);
            });

            it (`Correct module resolution tracing for ${fileName}`, () => {
                if (options.traceResolution) {
                    Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".trace.json"), () => {
                        return JSON.stringify(result.traceResults || [], undefined, 4);
                    });
                }
            });

            // Source maps?
            it("Correct sourcemap content for " + fileName, () => {
                if (options.sourceMap || options.inlineSourceMap) {
                    Harness.Baseline.runBaseline(justName.replace(/\.tsx?$/, ".sourcemap.txt"), () => {
                        const record = result.getSourceMapRecord();
                        if ((options.noEmitOnError && result.errors.length !== 0) || record === undefined) {
                            // Because of the noEmitOnError option no files are created. We need to return null because baselining isn't required.
                            /* tslint:disable:no-null-keyword */
                            return null;
                            /* tslint:enable:no-null-keyword */
                        }
                        return record;
                    });
                }
            });

            it("Correct JS output for " + fileName, () => {
                if (hasNonDtsFiles && this.emit) {
                    Harness.Compiler.doJsEmitBaseline(justName, fileName, options, result, toBeCompiled, otherFiles, harnessSettings);
                }
            });

            it("Correct Sourcemap output for " + fileName, () => {
                Harness.Compiler.doSourcemapBaseline(justName, options, result, harnessSettings);
            });

            it("Correct type/symbol baselines for " + fileName, () => {
                if (fileName.indexOf("APISample") >= 0) {
                    return;
                }

                Harness.Compiler.doTypeAndSymbolBaseline(justName, result, toBeCompiled.concat(otherFiles).filter(file => !!result.program.getSourceFile(file.unitName)));
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
                const testFiles = this.enumerateTestFiles();
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
