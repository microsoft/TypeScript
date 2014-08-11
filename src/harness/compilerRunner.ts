/// <reference path='harness.ts' />
/// <reference path='runnerbase.ts' />
/// <reference path='typeWriter.ts' />
/// <reference path='syntacticCleaner.ts' />

enum CompilerTestType {
    Conformance,
    Regressions,
    Test262
}

class CompilerBaselineRunner extends RunnerBase {
    private basePath = 'tests/cases';
    private errors: boolean;
    private emit: boolean;
    private decl: boolean;
    private output: boolean;

    public options: string;

    constructor(public testType?: CompilerTestType) {
        super();
        this.errors = true;
        this.emit = true;
        this.decl = true;
        this.output = true;
        if (testType === CompilerTestType.Conformance) {
            this.basePath += '/conformance';
        }
        else if (testType === CompilerTestType.Regressions) {
            this.basePath += '/compiler';
        }
        else if (testType === CompilerTestType.Test262) {
            this.basePath += '/test262';
        } else {
            this.basePath += '/compiler'; // default to this for historical reasons
        }
    }

    public checkTestCodeOutput(fileName: string) {
        describe('compiler tests for ' + fileName, () => {
            // strips the fileName from the path.
            var justName = fileName.replace(/^.*[\\\/]/, '');
            var content = Harness.IO.readFile(fileName);
            var testCaseContent = Harness.TestCaseParser.makeUnitsFromTest(content, fileName);

            var units = testCaseContent.testUnitData;
            var tcSettings = testCaseContent.settings;
            var createNewInstance = false;

            var lastUnit = units[units.length - 1];
            var rootDir = lastUnit.originalFilePath.indexOf('conformance') === -1 ? 'tests/cases/compiler/' : lastUnit.originalFilePath.substring(0, lastUnit.originalFilePath.lastIndexOf('/')) + '/';

            var result: Harness.Compiler.CompilerResult;
            var checker: ts.TypeChecker;
            var options: ts.CompilerOptions;
            // equivalent to the files that will be passed on the command line
            var toBeCompiled: { unitName: string; content: string }[];
            // equivalent to other files on the file system not directly passed to the compiler (ie things that are referenced by other files)
            var otherFiles: { unitName: string; content: string }[];
            var harnessCompiler: Harness.Compiler.HarnessCompiler;

            var declToBeCompiled: { unitName: string; content: string }[] = [];
            var declOtherFiles: { unitName: string; content: string }[] = [];
            var declResult: Harness.Compiler.CompilerResult;

            var createNewInstance = false;

            before(() => {
                harnessCompiler = Harness.Compiler.getCompiler();
                // We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
                // If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
                // otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.
                toBeCompiled = [];
                otherFiles = [];
                if (/require\(/.test(lastUnit.content) || /reference\spath/.test(lastUnit.content)) {
                    toBeCompiled.push({ unitName: rootDir + lastUnit.name, content: lastUnit.content });
                    units.forEach(unit => {
                        if (unit.name !== lastUnit.name) {
                            otherFiles.push({ unitName: rootDir + unit.name, content: unit.content });
                        }
                    });
                } else {
                    toBeCompiled = units.map(unit => {
                        return { unitName: rootDir + unit.name, content: unit.content };
                    });
                }

                options = harnessCompiler.compileFiles(toBeCompiled, otherFiles, function (compileResult, _checker) {
                    result = compileResult;
                    // The checker will be used by typeWriter
                    checker = _checker;
                }, function (settings) {
                        harnessCompiler.setCompilerSettings(tcSettings);
                });
            });

            beforeEach(() => {
                /* The compiler doesn't handle certain flags flipping during a single compilation setting. Tests on these flags will need 
                   a fresh compiler instance for themselves and then create a fresh one for the next test. Would be nice to get dev fixes
                   eventually to remove this limitation. */
                for (var i = 0; i < tcSettings.length; ++i) {
                    // noImplicitAny is passed to getCompiler, but target is just passed in the settings blob to setCompilerSettings
                    if (!createNewInstance && (tcSettings[i].flag == "noimplicitany" || tcSettings[i].flag === 'target')) {
                        harnessCompiler = Harness.Compiler.getCompiler({
                            useExistingInstance: false,
                            optionsForFreshInstance: { useMinimalDefaultLib: true, noImplicitAny: tcSettings[i].flag === "noimplicitany" }
                        });
                        harnessCompiler.setCompilerSettings(tcSettings);
                        createNewInstance = true;
                    }
                }
            });

            afterEach(() => {
                if (createNewInstance) {
                    harnessCompiler = Harness.Compiler.getCompiler({
                        useExistingInstance: false,
                        optionsForFreshInstance: { useMinimalDefaultLib: true, noImplicitAny: false }
                    });
                    createNewInstance = false;
                }
            });

            function getByteOrderMarkText(file: Harness.Compiler.GeneratedFile): string {
                return file.writeByteOrderMark ? "\u00EF\u00BB\u00BF" : "";
            }

            function getErrorBaseline(toBeCompiled: { unitName: string; content: string }[],
                otherFiles: { unitName: string; content: string }[],
                result: Harness.Compiler.CompilerResult
                ) {
                return Harness.Compiler.getErrorBaseline(toBeCompiled.concat(otherFiles), result.errors);
            }

            // check errors
            it('Correct errors for ' + fileName, () => {
                if (this.errors) {
                    Harness.Baseline.runBaseline('Correct errors for ' + fileName, justName.replace(/\.ts$/, '.errors.txt'), (): string => {
                        if (result.errors.length === 0) return null;

                        return getErrorBaseline(toBeCompiled, otherFiles, result);
                    });
                }
            });

            // Source maps?
            it('Correct sourcemap content for ' + fileName, () => {
                if (result.sourceMapRecord) {
                    Harness.Baseline.runBaseline('Correct sourcemap content for ' + fileName, justName.replace(/\.ts$/, '.sourcemap.txt'), () => {
                        return result.sourceMapRecord;
                    });
                }
            });

            // Compile .d.ts files
            it('Correct compiler generated.d.ts for ' + fileName, () => {
                if (options.declaration && result.errors.length === 0 && result.declFilesCode.length !== result.files.length) {
                    throw new Error('There were no errors and declFiles generated did not match number of js files generated');
                }

                // if the .d.ts is non-empty, confirm it compiles correctly as well
                if (options.declaration && result.errors.length === 0 && result.declFilesCode.length > 0) {
                    function getDtsFile(file: { unitName: string; content: string }) {
                        if (Harness.Compiler.isDTS(file.unitName)) {
                            return file;
                        } else {
                            var declFile = ts.forEach(result.declFilesCode,
                                declFile => declFile.fileName === (file.unitName.substr(0, file.unitName.length - ".ts".length) + ".d.ts")
                                    ? declFile : undefined);
                            return { unitName: declFile.fileName, content: declFile.code };
                        }
                    }

                    ts.forEach(toBeCompiled, file => { declToBeCompiled.push(getDtsFile(file)); });
                    ts.forEach(otherFiles, file => { declOtherFiles.push(getDtsFile(file)); });
                    harnessCompiler.compileFiles(declToBeCompiled, declOtherFiles, function (compileResult) {
                        declResult = compileResult;
                    }, function (settings) {
                            harnessCompiler.setCompilerSettings(tcSettings);
                    });
                }
            });


            it('Correct JS output for ' + fileName, () => {
                if (!ts.fileExtensionIs(lastUnit.name, '.d.ts') && this.emit) {
                    if (result.files.length === 0 && result.errors.length === 0) {
                        throw new Error('Expected at least one js file to be emitted or at least one error to be created.');
                    }

                    // check js output
                    Harness.Baseline.runBaseline('Correct JS output for ' + fileName, justName.replace(/\.ts/, '.js'), () => {
                        var tsCode = '';
                        var tsSources = otherFiles.concat(toBeCompiled);
                        if (tsSources.length > 1) {
                            tsCode += '//// [' + fileName + '] ////\r\n\r\n';
                        }
                        for (var i = 0; i < tsSources.length; i++) {
                            tsCode += '//// [' + Harness.Path.getFileName(tsSources[i].unitName) + ']\r\n';
                            tsCode += tsSources[i].content + (i < (tsSources.length - 1) ? '\r\n' : '');
                        }

                        var jsCode = '';
                        for (var i = 0; i < result.files.length; i++) {
                            jsCode += '//// [' + Harness.Path.getFileName(result.files[i].fileName) + ']\r\n';
                            jsCode += getByteOrderMarkText(result.files[i]);
                            jsCode += result.files[i].code;
                            // Re-enable this if we want to do another comparison of old vs new compiler baselines
                            // jsCode += SyntacticCleaner.clean(result.files[i].code);
                        }

                        if (result.declFilesCode.length > 0) {
                            jsCode += '\r\n\r\n';
                            for (var i = 0; i < result.declFilesCode.length; i++) {
                                jsCode += '//// [' + Harness.Path.getFileName(result.declFilesCode[i].fileName) + ']\r\n';
                                jsCode += getByteOrderMarkText(result.declFilesCode[i]);
                                jsCode += result.declFilesCode[i].code;
                            }
                        }

                        if (declResult && declResult.errors.length) {
                            jsCode += '\r\n\r\n//// [DtsFileErrors]\r\n';
                            jsCode += '\r\n\r\n';
                            jsCode += getErrorBaseline(declToBeCompiled, declOtherFiles, declResult);
                        }

                        if (jsCode.length > 0) {
                            return tsCode + '\r\n\r\n' + jsCode;
                        } else {
                            return null;
                        }
                    });
                }
            });

            it('Correct Sourcemap output for ' + fileName, () => {
                if (options.sourceMap) {
                    if (result.sourceMaps.length !== result.files.length) {
                        throw new Error('Number of sourcemap files should be same as js files.');
                    }

                    Harness.Baseline.runBaseline('Correct Sourcemap output for ' + fileName, justName.replace(/\.ts/, '.js.map'), () => {
                        var sourceMapCode = '';
                        for (var i = 0; i < result.sourceMaps.length; i++) {
                            sourceMapCode += '//// [' + Harness.Path.getFileName(result.sourceMaps[i].fileName) + ']\r\n';
                            sourceMapCode += getByteOrderMarkText(result.sourceMaps[i]);
                            sourceMapCode += result.sourceMaps[i].code;
                        }

                        return sourceMapCode;
                    });
                }
            });

            it('Correct type baselines for ' + fileName, () => {
                // NEWTODO: Type baselines
                if (result.errors.length === 0) {
                    Harness.Baseline.runBaseline('Correct expression types for ' + fileName, justName.replace(/\.ts/, '.types'), () => {
                        var allFiles = toBeCompiled.concat(otherFiles);
                        var typeLines: string[] = [];
                        var typeMap: { [fileName: string]: { [lineNum: number]: string[]; } } = {};
                        var walker = new TypeWriterWalker(checker);
                        allFiles.forEach(file => {
                            var codeLines = file.content.split('\n');
                            walker.getTypes(file.unitName).forEach(result => {
                                var formattedLine = result.identifierName + " : " + result.type;
                                if (!typeMap[file.unitName]) {
                                    typeMap[file.unitName] = {};
                                }

                                var typeInfo = [formattedLine];
                                var existingTypeInfo = typeMap[file.unitName][result.line];
                                if (existingTypeInfo) {
                                    typeInfo = existingTypeInfo.concat(typeInfo);
                                }
                                typeMap[file.unitName][result.line] = typeInfo;
                            });

                            typeLines.push('=== ' + file.unitName + ' ===\r\n');
                            for (var i = 0; i < codeLines.length; i++) {
                                var currentCodeLine = codeLines[i];
                                var lastLine = typeLines[typeLines.length];
                                typeLines.push(currentCodeLine + '\r\n');
                                if (typeMap[file.unitName]) {
                                    var typeInfo = typeMap[file.unitName][i];
                                    if (typeInfo) {
                                        var leadingSpaces = '';
                                        typeInfo.forEach(ty => {
                                            typeLines.push('>' + ty + '\r\n');
                                        });
                                        if (i + 1 < codeLines.length && (codeLines[i + 1].match(/^\s*[{|}]\s*$/) || codeLines[i + 1].trim() === '')) {
                                        } else {
                                            typeLines.push('\r\n');
                                        }
                                    }
                                } else {
                                    typeLines.push('No type information for this code.');
                                }
                            }
                        });

                        return typeLines.join('');
                    });
                }
            });
        });
    }

    public initializeTests() {
        describe("Setup compiler for compiler baselines", () => {
            var harnessCompiler = Harness.Compiler.getCompiler({
                useExistingInstance: false,
                optionsForFreshInstance: { useMinimalDefaultLib: true, noImplicitAny: false }
            });
            this.parseOptions();
        });

        // this will set up a series of describe/it blocks to run between the setup and cleanup phases
        if (this.tests.length === 0) {
            var testFiles = this.enumerateFiles(this.basePath, /\.ts$/, { recursive: true });
            testFiles.forEach(fn => {
                fn = fn.replace(/\\/g, "/");
                this.checkTestCodeOutput(fn);
            });
        }
        else {
            this.tests.forEach(test => this.checkTestCodeOutput(test));
        }

        describe("Cleanup after compiler baselines", () => {
            var harnessCompiler = Harness.Compiler.getCompiler({
                useExistingInstance: false,
                optionsForFreshInstance: { useMinimalDefaultLib: true, noImplicitAny: false }
            });
        });
    }

    private parseOptions() {
        if (this.options && this.options.length > 0) {
            this.errors = false;
            this.emit = false;
            this.decl = false;
            this.output = false;

            var opts = this.options.split(',');
            for (var i = 0; i < opts.length; i++) {
                switch (opts[i]) {
                    case 'error':
                        this.errors = true;
                        break;
                    case 'emit':
                        this.emit = true;
                        break;
                    case 'decl':
                        this.decl = true;
                        break;
                    case 'output':
                        this.output = true;
                        break;
                    default:
                        throw new Error('unsupported flag');
                }
            }
        }
    }
}