///<reference path='..\..\..\src\harness\harness.ts'/>
///<reference path='..\..\..\src\harness\exec.ts'/>
///<reference path='..\runnerBase.ts' />
/// <reference path='..\compiler\typeWriter.ts' />

interface testSpec {
    projectName: string;    // name of the scenario
    projectRoot: string;    // rootpath of the project
    compileList: string[];  // files we want to compile
    outputFile: string;     // the final output file
    skipThisCheck?: boolean;
    skipTypeCheck?: boolean;
}

class RWCEmitter implements Harness.Compiler.IEmitterIOHost {
    constructor(private fsOutput: Harness.Compiler.WriterAggregator, private fsDeclOutput: Harness.Compiler.WriterAggregator) {
    }
    writeFile(path: string, contents: string, writeByteOrderMark: boolean) {
        var dts = ".d.ts";

        // Simple IO host that attempts to combine all .d.ts files into one document,
        // and all other files into another.
        if (path.indexOf(dts, path.length - dts.length) !== -1) {
            this.fsDeclOutput.Write(contents);
        }
        else {
            this.fsOutput.Write(contents);
        }
    }
    directoryExists(s: string) {
        return false;
    }
    fileExists(s: string) {
        return true;
    }
    resolvePath(s: string) {
        return s;
    }
}

class RWCRunner extends RunnerBase {
    constructor() { super(); }

    private runnerPath = "tests/runners/rwc";
    private sourcePath = "tests/cases/rwc/";
    private outputPath = "tests/baselines/rwc/local/";
    private referencePath = "tests/baselines/rwc/reference/";

    private htmlBaselineReport = new Diff.HtmlBaselineReport('rwc-report.html');

    public _getDiagnosticText(diagnostic: TypeScript.Diagnostic): string {
        return this.removeRootPath(TypeScript.TypeScriptCompiler.getFullDiagnosticText(diagnostic, path => TypeScript.switchToForwardSlashes(path)));
    }

    private removeRootPath(path: string): string {
        
        var idx = path.indexOf(this.sourcePath) + this.sourcePath.length;
        return path.substr(idx);
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        var testCases: any[] = [];
        var harnessCompiler: Harness.Compiler.HarnessCompiler;
        var fsOutput = new Harness.Compiler.WriterAggregator();
        var fsDeclOutput = new Harness.Compiler.WriterAggregator();
        var fsErrors = new Harness.Compiler.WriterAggregator();
        var exec = Exec.exec;

        // Recreate the compiler with the default lib
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, { useMinimalDefaultLib: false, noImplicitAny: false });
        harnessCompiler = Harness.Compiler.getCompiler(Harness.Compiler.CompilerInstance.RunTime);

        // reset the report
        this.htmlBaselineReport.reset();

        // Create folders if needed
        TypeScript.IO.createDirectory(TypeScript.IO.dirName(this.outputPath));
        TypeScript.IO.createDirectory(this.outputPath);

        var runner = this;

        function runTest(spec: testSpec) {

            var content = ''; // contents of the file
            var result = '';
            var errors = '';
            var dtsresult = '';
            var hasCrashed = false;

            var tcSettings: Harness.TestCaseParser.CompilerSetting[] = [
                { flag: "module", value: "commonjs" },
                { flag: "declaration", value: "true" }
            ];

            describe("Testing a RWC project: " + spec.projectName, function () {
                // reset compiler to initial state
                harnessCompiler.reset();
                harnessCompiler.setCompilerSettings(tcSettings);

                fsOutput.reset();
                fsDeclOutput.reset();
                content = '', result = '', errors = '', dtsresult = '';
                hasCrashed = false;

                var outputJsFilename = runner.outputPath + spec.outputFile + ".js";
                var outputErrorFilename = runner.outputPath + spec.outputFile + ".err.out";
                var outputCrashFilename = runner.outputPath + spec.outputFile + ".crash.out";
                var outputDeclarationFilename = runner.outputPath + spec.outputFile + ".d.ts";
                var outputTypesFilename = runner.outputPath + spec.outputFile + ".types";

                var baselineJsFilename = runner.referencePath + spec.outputFile + ".js";
                var baselineErrorFilename = runner.referencePath + spec.outputFile + ".err.out";
                var baselineCrashFilename = runner.referencePath + spec.outputFile + ".crash.out";
                var baselineDeclarationFilename = runner.referencePath + spec.outputFile + ".d.ts";
                var baselineTypesFilename = runner.referencePath + spec.outputFile + ".types";

                var emitterIOHost = new RWCEmitter(fsOutput, fsDeclOutput);

                it("compile it ", function () {
                    try {

                        // Compile the project
                        spec.compileList.forEach((item: string) => {
                            content = TypeScript.IO.readFile(spec.projectRoot + "/" + item, /*codepage*/ null).contents;
                            harnessCompiler.addInputFile({ unitName: spec.projectRoot + "/" + item, content: content });
                        });

                        // Resolve and compile files
                        harnessCompiler.compile();
                        var compilationErrors = harnessCompiler.reportCompilationErrors();

                        // Emiting the results
                        harnessCompiler.emitAll(emitterIOHost);
                        harnessCompiler.emitAllDeclarations(emitterIOHost);

                        fsOutput.Close();
                        fsDeclOutput.Close();

                        compilationErrors.forEach(err => {
                            errors += runner._getDiagnosticText(err);
                        });
                        result = fsOutput.lines.join('\r\n');
                        dtsresult = fsDeclOutput.lines.join("\r\n");

                        // Delete previous results 
                        if (TypeScript.IO.fileExists(outputJsFilename))
                            TypeScript.IO.deleteFile(outputJsFilename);
                        if (TypeScript.IO.fileExists(outputErrorFilename))
                            TypeScript.IO.deleteFile(outputErrorFilename);
                        if (TypeScript.IO.fileExists(outputDeclarationFilename))
                            TypeScript.IO.deleteFile(outputDeclarationFilename);

                        // Create the results
                        TypeScript.IO.writeFile(outputJsFilename, result, /*codepage*/ null);
                        TypeScript.IO.writeFile(outputErrorFilename, errors, /*codepage*/ null);
                        TypeScript.IO.writeFile(outputDeclarationFilename, dtsresult, /* codepath */ null);
                    } catch (e) {
                        hasCrashed = true;
                        var message = e.message + (e.stack ? '\r\n' + e.stack : '');
                        TypeScript.IO.writeFile(outputCrashFilename, message, /*codepage*/ null);
                        Harness.Assert.throwAssertError(new Error("Failed compilation"));
                    }
                });

                it("crash check", () => {
                    if (hasCrashed) {
                        Harness.Assert.throwAssertError(new Error("Compiler has crashed!"));
                    }
                });

                it("error baseline check", () => {
                    if (!hasCrashed) {
                        if (!TypeScript.IO.fileExists(baselineErrorFilename)) {
                            var expected = "<no content>";
                        } else {
                            var expected = TypeScript.IO.readFile(baselineErrorFilename, null).contents;
                        }
                        // remove line sensitivity
                        expected = expected.replace(/\r\n?/g, '\n');
                        var actual = errors.replace(/\r\n?/g, '\n');

                        if (actual !== expected) {
                            runner.htmlBaselineReport.addDifference("error baseline check for " + spec.projectName, spec.outputFile + '.err.out', spec.outputFile + '.err.out', expected, actual, /* includeUnchangedRegions*/ false);

                            var errMsg = 'The baseline file ' + spec.outputFile + '.err.out' + ' has changed. Please refer to rwc-report.html and ';
                            errMsg += 'either fix the regression (if unintended) or update the baseline (if intended).'
                            Harness.Assert.throwAssertError(new Error(errMsg));
                        }
                    }
                });

                it("codegen baseline check", () => {
                    if (!hasCrashed) {
                        if (!TypeScript.IO.fileExists(baselineJsFilename)) {
                            var expected = "<no content>";
                        } else {
                            var expected = TypeScript.IO.readFile(baselineJsFilename, null).contents;
                        }

                        // remove line sensitivity
                        expected = expected.replace(/\r\n?/g, '\n');
                        var actual = result.replace(/\r\n?/g, '\n');
                        if (actual !== expected) {
                            runner.htmlBaselineReport.addDifference("codegen baseline check for " + spec.projectName, spec.outputFile + '.js', spec.outputFile + '.js', expected, actual, /* includeUnchangedRegions*/ false);

                            var errMsg = 'The baseline file ' + spec.outputFile + '.js' + ' has changed. Please refer to rwc-report.html and ';
                            errMsg += 'either fix the regression (if unintended) or update the baseline (if intended).'
                            Harness.Assert.throwAssertError(new Error(errMsg));
                        }
                    }
                });

                it(".d.ts baseline check", () => {
                    if (!hasCrashed) {
                        if (!TypeScript.IO.fileExists(baselineDeclarationFilename)) {
                            var expected = "<no content>";
                        } else {
                            var expected = TypeScript.IO.readFile(baselineDeclarationFilename, null).contents;
                        }

                        // remove line sensitivity
                        expected = expected.replace(/\r\n?/g, '\n');
                        var actual = dtsresult.replace(/\r\n?/g, '\n');
                        if (actual !== expected) {
                            runner.htmlBaselineReport.addDifference("codegen baseline check for " + spec.projectName, spec.outputFile + '.d.ts', spec.outputFile + '.d.ts', expected, actual, /* includeUnchangedRegions*/ false);

                            var errMsg = 'The baseline file ' + spec.outputFile + '.d.ts' + ' has changed. Please refer to rwc-report.html and ';
                            errMsg += 'either fix the regression (if unintended) or update the baseline (if intended).'
                            Harness.Assert.throwAssertError(new Error(errMsg));
                        }
                    }
                });

                it("correct expression types check", () => {
                    if (!hasCrashed && !spec.skipTypeCheck && errors.length == 0) {
                        var compiler = new TypeScript.TypeScriptCompiler(
                            new TypeScript.NullLogger());

                        compiler.addFile('lib.d.ts', TypeScript.ScriptSnapshot.fromString(Harness.Compiler.libText),
                            TypeScript.ByteOrderMark.None, /*version:*/ 0, /*isOpen:*/ true);

                        spec.compileList.forEach((item: string) => {
                            content = TypeScript.IO.readFile(spec.projectRoot + "/" + item, /*codepage*/ null).contents;
                            compiler.addFile(spec.projectRoot + "/" + item, TypeScript.ScriptSnapshot.fromString(content),
                                TypeScript.ByteOrderMark.None, /*version:*/ 0, /*isOpen:*/ true);
                        });

                        spec.compileList.forEach(file => {
                            compiler.getSemanticDiagnostics(spec.projectRoot + "/" + file);
                        });

                        var typeLines: string[] = [];
                        spec.compileList.forEach(file => {
                            typeLines.push('=== ' + file + ' ===');
                            var walker = new TypeWriterWalker(spec.projectRoot + "/" + file, compiler);
                            walker.run();
                            walker.results.forEach(result => {
                                var typeResult = 'Line ' + result.line + ' col ' + result.column + ' ' + result.syntaxKind + ' "' + result.identifierName + '" = ' + result.type;
                                typeLines.push(typeResult)
                            });
                        });

                        var typesResult = typeLines.join('\n');

                        // write file for baseline updates
                        if (TypeScript.IO.fileExists(outputTypesFilename)) {
                            TypeScript.IO.deleteFile(outputTypesFilename);
                        }
                        TypeScript.IO.writeFile(outputTypesFilename, typesResult, /*codepage*/ null);
                        
                        if (!TypeScript.IO.fileExists(baselineTypesFilename)) {
                            var expected = "<no content>";
                        } else {
                            var expected = TypeScript.IO.readFile(baselineTypesFilename, null).contents;
                        }

                        expected = expected.replace(/\r\n?/g, '\n');
                        var actual = typesResult.replace(/\r\n?/g, '\n');
                        if (actual !== expected) {
                            var errMsg = 'The baseline file ' + spec.outputFile + '.types' + ' has changed. Due to the size of the generated files, '
                            errMsg += 'use odd (or your favorite diff tool) to analyze the differences.';
                            Harness.Assert.throwAssertError(new Error(errMsg));
                        }
                    }
                });

                it("_this check", () => {
                    if (!hasCrashed && !spec.skipThisCheck) {
                        exec("node", ["tests/runners/rwc/verifiers/globalVerifier.js", outputJsFilename], (result) => {
                            // If there's a bug in the _this checker, just issue a 'pass'
                            if (result.exitCode == 0) {
                                Harness.Assert.equal(result.stderr, "");
                                Harness.Assert.equal(result.stdout, "");
                            } else {
                                Harness.Assert.throwAssertError(new Error(spec.projectName + " '_this' check crashed!"));
                            }
                        });
                    } 
                });
            });
        }

        // Read in and evaluate the test list.
        try {
            eval(TypeScript.IO.readFile(this.runnerPath + "/TestProjectList.js", null).contents);
        } catch (ex) {
            Harness.Assert.throwAssertError(new Error("Could not read or evaluate TestProjectList.js!"));
        }

        for (var i = 0; i < testCases.length; i++) {
            runTest(testCases[i]);
        }
    }
}