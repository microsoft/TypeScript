/// <reference path='..\..\..\src\harness\harness.ts' />
/// <reference path='..\..\..\src\compiler\diagnostics.ts' />
/// <reference path='..\runnerBase.ts' />
/// <reference path='typeWriter.ts' />

enum CompilerTestType {
    Conformance,
    Regressions
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
        } else {
            this.basePath += '/compiler'; // default to this for historical reasons
        }
    }

    public checkTestCodeOutput(fileName: string) {
        // strips the fileName from the path.
        var justName = fileName.replace(/^.*[\\\/]/, '');
        var content = TypeScript.IO.readFile(fileName, /*codepage:*/ null).contents;
        var testCaseContent = Harness.TestCaseParser.makeUnitsFromTest(content, fileName);

        var units = testCaseContent.testUnitData;
        var tcSettings = testCaseContent.settings;
        var createNewInstance = false;

        var lastUnit = units[units.length - 1];

        describe('JS output and errors for ' + fileName, () => {
            Harness.Assert.bugs(content);

            /** Compiled JavaScript emit, if any */
            var jsOutput = '';
            /** Source map content, if any */
            var sourceMapContent = "";
            /** Newline-delimited string describing compilation errors */
            var errorDescription = '';

            var createNewInstance = false;

            var harnessCompiler = Harness.Compiler.getCompiler(Harness.Compiler.CompilerInstance.RunTime);
            for (var i = 0; i < tcSettings.length; ++i) {
                // The compiler doesn't handle certain flags flipping during a single compilation setting. Tests on these flags will need 
                // a fresh compiler instance for themselves and then create a fresh one for the next test. Would be nice to get dev fixes
                // eventually to remove this limitation.
                if (!createNewInstance && (tcSettings[i].flag == "noimplicitany" || tcSettings[i].flag === 'target')) {
                    Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, { useMinimalDefaultLib: true, noImplicitAny: tcSettings[i].flag == "noimplicitany" });
                    harnessCompiler.setCompilerSettings(tcSettings);
                    createNewInstance = true;
                }
            }

            // We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
            // If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
            // otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.
            var toBeCompiled: { unitName: string; content: string }[] = [];
            var otherFiles: { unitName: string; content: string }[] = [];
            if (/require\(/.test(lastUnit.content) || /reference\spath/.test(lastUnit.content)) {
                toBeCompiled.push({ unitName: 'tests/cases/compiler/' + lastUnit.name, content: lastUnit.content });
                units.forEach(unit => {
                    if (unit.name !== lastUnit.name) {
                        otherFiles.push({ unitName: 'tests/cases/compiler/' + unit.name, content: unit.content });
                    }
                });
            } else {
                toBeCompiled = units.map(unit => {
                    return { unitName: 'tests/cases/compiler/' + unit.name, content: unit.content };
                });
            }

            var result: Harness.Compiler.CompilerResult;
            harnessCompiler.compileFiles(toBeCompiled, otherFiles, function (compileResult) {
                result = compileResult;
            }, function (settings) {
                    harnessCompiler.setCompilerSettings(tcSettings);
                });

            // check errors
            if (this.errors) {
                Harness.Baseline.runBaseline('Correct errors for ' + fileName, justName.replace(/\.ts/, '.errors.txt'), () => {
                    if (result.errors.length === 0) return null;

                    var outputLines: string[] = [];
                    // Count up all the errors we find so we don't miss any
                    var totalErrorsReported = 0;

                    // 'merge' the lines of each input file with any errors associated with it
                    toBeCompiled.concat(otherFiles).forEach(inputFile => {
                        // Filter down to the errors in the file
                        var fileErrors = result.errors.filter(e => {
                            var errFn = e.fileName();
                            return errFn.indexOf(inputFile.unitName) === errFn.length - inputFile.unitName.length;
                        });

                        // Add this to the number of errors we've seen so far
                        totalErrorsReported += fileErrors.length;

                        // Header
                        outputLines.push('==== ' + inputFile.unitName + ' (' + fileErrors.length + ' errors) ====');

                        // Make sure we emit something for every error
                        var markedErrorCount = 0;
                        // For each line, emit the line followed by any error squiggles matching this line
                        var fileLineMap = TypeScript.LineMap1.fromString(inputFile.content);
                        var lines = inputFile.content.split(/\r?\n/g);
                        lines.forEach((line, lineIndex) => {
                            var thisLineStart = fileLineMap.getLineStartPosition(lineIndex);
                            var nextLineStart: number;
                            // On the last line of the file, fake the next line start number so that we handle errors on the last character of the file correctly
                            if (lineIndex === lines.length - 1) {
                                nextLineStart = inputFile.content.length;
                            } else {
                                nextLineStart = fileLineMap.getLineStartPosition(lineIndex + 1);
                            }
                            // Emit this line from the original file (replace tabs with spaces so things line up correctly)
                            outputLines.push('    ' + line.replace(/\t/g, '    '));
                            fileErrors.forEach(err => {
                                // Does any error start or continue on to this line? Emit squiggles
                                if ((err.start() + err.length() >= thisLineStart) && ((err.start() < nextLineStart) || (lineIndex === lines.length - 1))) {
                                    // How many characters from the start of this line the error starts at (could be positive or negative)
                                    var relativeOffset = err.start() - thisLineStart;
                                    // How many characters of the error are on this line (might be longer than this line in reality)
                                    var length = err.length() - Math.max(0, thisLineStart - err.start());
                                    // Calculate the start of the sq
                                    var squiggleStart = Math.max(0, relativeOffset);
                                    outputLines.push('    ' + new Array(squiggleStart + 1).join(' ') + new Array(Math.min(length, line.length - squiggleStart) + 1).join('~'));
                                    // If the error ended here, or we're at the end of the file, emit its message
                                    if ((lineIndex === lines.length - 1) || nextLineStart > (err.start() + err.length())) {
                                        this._getDiagnosticText(err).split(/\r?\n/g).filter(s => s.length > 0).map(s => '!!! ' + s).forEach(e => outputLines.push(e));
                                        markedErrorCount++;
                                    }
                                }
                            });
                        });

                        // Verify we didn't miss any errors in this file
                        assert.equal(markedErrorCount, fileErrors.length, 'count of errors in ' + inputFile.unitName);
                    });

                    // Verify we didn't miss any errors in total
                    assert.equal(totalErrorsReported, result.errors.length, 'total number of errors');

                    return outputLines.join('\r\n');
                });
            }

            // Source maps?
            if (result.sourceMapRecord) {
                Harness.Baseline.runBaseline('Correct sourcemap content for ' + fileName, justName.replace(/\.ts$/, '.sourcemap.txt'), () => {
                    return result.sourceMapRecord;
                });
            }

            // if the .d.ts is non-empty, confirm it compiles correctly as well
            if (this.decl && result.declFilesCode.length > 0 && result.errors.length === 0) {
                var declErrors: string[] = undefined;

                var declOtherFiles: { unitName: string; content: string }[] = [];

                // use other files if it is dts
                for (var i = 0; i < otherFiles.length; i++) {
                    if (TypeScript.isDTSFile(otherFiles[i].unitName)) {
                        declOtherFiles.push(otherFiles[i]);
                    }
                }

                for (var i = 0; i < result.declFilesCode.length; i++) {
                    var declCode = result.declFilesCode[i];
                    // don't want to use the fullpath for the unitName or the file won't be resolved correctly
                    var declFile = { unitName: 'tests/cases/compiler/' + Harness.getFileName(declCode.fileName), content: declCode.code };
                    if (i != result.declFilesCode.length - 1) {
                        declOtherFiles.push(declFile);
                    }
                }

                harnessCompiler.compileFiles(
                    [declFile],
                    declOtherFiles,
                    (result) => {
                        declErrors = result.errors.map(err => this._getDiagnosticText(err) + "\r\n");
                    },
                    function (settings) {
                        harnessCompiler.setCompilerSettings(tcSettings);
                    });

                if (declErrors && declErrors.length) {
                    throw new Error('.d.ts file output of ' + fileName + ' did not compile. Errors: ' + declErrors.map(err => JSON.stringify(err)).join('\r\n'));
                }
            }

            if (!TypeScript.isDTSFile(lastUnit.name)) {
                if (this.emit) {
                    if (result.files.length === 0 && result.errors.length === 0) {
                        throw new Error('Expected at least one js file to be emitted or at least one error to be created.');
                    }

                    // check js output
                    Harness.Baseline.runBaseline('Correct JS output for ' + fileName, justName.replace(/\.ts/, '.js'), () => {
                        var tsCode = '';
                        if (result.errors.length === 0) {
                            for (var i = 0; i < toBeCompiled.length; i++) {
                                tsCode += '//// [' + Harness.getFileName(toBeCompiled[i].unitName) + ']\r\n';
                                tsCode += toBeCompiled[i].content;
                            }
                            tsCode += '\r\n\r\n';
                        }

                        var jsCode = '';
                        for (var i = 0; i < result.files.length; i++) {
                            jsCode += '//// [' + Harness.getFileName(result.files[i].fileName) + ']\r\n';
                            jsCode += result.files[i].code;
                        }

                        if (result.declFilesCode.length > 0) {
                            jsCode += '\r\n\r\n';
                            for (var i = 0; i < result.files.length; i++) {
                                jsCode += result.declFilesCode[i].code;
                            }
                        }
                        return tsCode + jsCode;
                    });
                }
            }

            if (result.errors.length === 0) {
                Harness.Baseline.runBaseline('Correct expression types for ' + fileName, justName.replace(/\.ts/, '.types'), () => {
                    var compiler = new TypeScript.TypeScriptCompiler(
                        new TypeScript.NullLogger(), TypeScript.ImmutableCompilationSettings.defaultSettings());

                    compiler.addFile('lib.d.ts', TypeScript.ScriptSnapshot.fromString(Harness.Compiler.libTextMinimal),
                        TypeScript.ByteOrderMark.None, /*version:*/ 0, /*isOpen:*/ true);

                    var allFiles = toBeCompiled.concat(otherFiles);
                    allFiles.forEach(file => {
                        compiler.addFile(file.unitName, TypeScript.ScriptSnapshot.fromString(file.content),
                            TypeScript.ByteOrderMark.None, /*version:*/ 0, /*isOpen:*/ true);
                    });

                    allFiles.forEach(file => {
                        compiler.getSemanticDiagnostics(file.unitName);
                    });

                    var typeBaselineText = '';
                    var typeLines: string[] = [];
                    var typeMap: { [fileName: string]: { [lineNum: number]: string[]; } } = {};
                    allFiles.forEach(file => {
                        var codeLines = file.content.split('\n');
                        var walker = new TypeWriterWalker(file.unitName, compiler);
                        walker.run();
                        walker.results.forEach(result => {                            var formattedLine = result.identifierName + " : " + result.type;
                            if (!typeMap[file.unitName]) {
                                typeMap[file.unitName] = {}
                            }                                                        var typeInfo = [formattedLine];                            var existingTypeInfo = typeMap[file.unitName][result.line];                            if (existingTypeInfo) {                                typeInfo = existingTypeInfo.concat(typeInfo);                            }                            typeMap[file.unitName][result.line] = typeInfo;                        });                        typeLines.push('=== ' + file.unitName + ' ===\r\n');
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

            if (createNewInstance) {
                Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, { useMinimalDefaultLib: true, noImplicitAny: false });
                createNewInstance = false;
            }
        });
    }

    public initializeTests() {
        describe("Setup compiler for compiler baselines", () => {
            // REVIEW: would like to use the minimal lib.d.ts but a bunch of tests need to be converted to use non-DOM APIs
            Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, { useMinimalDefaultLib: true, noImplicitAny: false });
            this.parseOptions();
        });

        if (this.tests.length === 0) {
            var testFiles = this.enumerateFiles(this.basePath, { recursive: true });
            testFiles.forEach(fn => {
                fn = fn.replace(/\\/g, "/");
                this.checkTestCodeOutput(fn);
            });
        }
        else {
            this.tests.forEach(test => this.checkTestCodeOutput(test));
        }
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