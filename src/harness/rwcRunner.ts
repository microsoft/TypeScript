/// <reference path='harness.ts'/>
/// <reference path='runnerbase.ts' />
/// <reference path='syntacticCleaner.ts' />
/// <reference path='loggedIO.ts' />
/// <reference path='..\compiler\commandLineParser.ts'/>

module RWC {
    function runWithIOLog(ioLog: IOLog, fn: () => void) {
        var oldSys = sys;

        var wrappedSys = Playback.wrapSystem(sys);
        wrappedSys.startReplayFromData(ioLog);
        sys = wrappedSys;

        try {
            fn();
        } finally {
            wrappedSys.endReplay();
            sys = oldSys;
        }
    }

    function collateOutputs(outputFiles: Harness.Compiler.GeneratedFile[], clean?: (s: string) => string) {
        // Collect, test, and sort the filenames
        function cleanName(fn: string) {
            var lastSlash = Harness.Path.switchToForwardSlashes(fn).lastIndexOf('/');
            return fn.substr(lastSlash + 1).toLowerCase();
        }
        outputFiles.sort((a, b) => cleanName(a.fileName).localeCompare(cleanName(b.fileName)));

        // Emit them
        var result = '';
        ts.forEach(outputFiles, outputFile => {
            // Some extra spacing if this isn't the first file
            if (result.length) result = result + '\r\n\r\n';

            // Filename header + content
            result = result + '/*====== ' + outputFile.fileName + ' ======*/\r\n';
            if (clean) {
                result = result + clean(outputFile.code);
            } else {
                result = result + outputFile.code;
            }
        });
        return result;
    }

    export function runRWCTest(jsonPath: string) {
        describe("Testing a RWC project: " + jsonPath, () => {
            var harnessCompiler = Harness.Compiler.getCompiler();
            var opts: ts.ParsedCommandLine;

            var ioLog: IOLog = JSON.parse(Harness.IO.readFile(jsonPath));
            var errors = '';

            after(() => {
                // Mocha holds onto the closure environment of the describe callback even after the test is done.
                // Therefore we have to clean out large objects after the test is done.
                harnessCompiler = undefined;
                opts = undefined;
                ioLog = undefined;
                errors = undefined;
                inputFiles = undefined;
                otherFiles = undefined;
                compilerResult = undefined;
                compilerOptions = undefined;
                baselineOpts = undefined;
                baseName = undefined;
                declFileCompilationResult = undefined;
            });


            it('has parsable options', () => {
                runWithIOLog(ioLog, () => {
                    opts = ts.parseCommandLine(ioLog.arguments);
                    assert.equal(opts.errors.length, 0);
                });
            });

            var inputFiles: { unitName: string; content: string; }[] = [];
            var otherFiles: { unitName: string; content: string; }[] = [];
            var compilerResult: Harness.Compiler.CompilerResult;
            var compilerOptions: ts.CompilerOptions;
            it('can compile', () => {
                runWithIOLog(ioLog, () => {
                    harnessCompiler.reset();

                    // Load the files
                    ts.forEach(opts.filenames, fileName => {
                        inputFiles.push(getHarnessCompilerInputUnit(fileName));
                    });

                    if (!opts.options.noLib) {
                        // Find the lib.d.ts file in the input file and add it to the input files list
                        var libFile = ts.forEach(ioLog.filesRead, fileRead=> Harness.isLibraryFile(fileRead.path) ? fileRead.path : undefined);
                        if (libFile) {
                            inputFiles.push(getHarnessCompilerInputUnit(libFile));
                        }
                    }

                    ts.forEach(ioLog.filesRead, fileRead => {
                        var resolvedPath = Harness.Path.switchToForwardSlashes(sys.resolvePath(fileRead.path));
                        var inInputList = ts.forEach(inputFiles, inputFile=> inputFile.unitName === resolvedPath);
                        if (!inInputList) {
                            // Add the file to other files
                            otherFiles.push(getHarnessCompilerInputUnit(fileRead.path));
                        }
                    });

                    // do not use lib since we already read it in above
                    opts.options.noLib = true;

                    // Emit the results
                    compilerOptions = harnessCompiler.compileFiles(inputFiles, otherFiles, compileResult => {
                        compilerResult = compileResult;
                    }, /*settingsCallback*/ undefined, opts.options);
                });

                function getHarnessCompilerInputUnit(fileName: string) {
                    var resolvedPath = Harness.Path.switchToForwardSlashes(sys.resolvePath(fileName));
                    try {
                        var content = sys.readFile(resolvedPath);
                    }
                    catch (e) {
                        // Leave content undefined.
                    }
                    return { unitName: resolvedPath, content: content };
                }
            });

            // Baselines
            var baselineOpts: Harness.Baseline.BaselineOptions = { Subfolder: 'rwc' };
            var baseName = /(.*)\/(.*).json/.exec(Harness.Path.switchToForwardSlashes(jsonPath))[2];

            // Compile .d.ts files
            var declFileCompilationResult: {
                declInputFiles: { unitName: string; content: string }[];
                declOtherFiles: { unitName: string; content: string }[];
                declResult: Harness.Compiler.CompilerResult;
            };
            it('Correct compiler generated.d.ts', () => {
                declFileCompilationResult = harnessCompiler.compileDeclarationFiles(inputFiles, otherFiles, compilerResult, /*settingscallback*/ undefined, compilerOptions);
            });


            it('has the expected emitted code', () => {
                Harness.Baseline.runBaseline('has the expected emitted code', baseName + '.output.js', () => {
                    return collateOutputs(compilerResult.files, s => SyntacticCleaner.clean(s));
                }, false, baselineOpts);
            });

            it('has the expected declaration file content', () => {
                Harness.Baseline.runBaseline('has the expected declaration file content', baseName + '.d.ts', () => {
                    if (compilerResult.errors.length || !compilerResult.declFilesCode.length) {
                        return null;
                    }
                    return collateOutputs(compilerResult.declFilesCode);
                }, false, baselineOpts);
            });

            it('has the expected source maps', () => {
                Harness.Baseline.runBaseline('has the expected source maps', baseName + '.map', () => {
                    if (!compilerResult.sourceMaps.length) {
                        return null;
                    }

                    return collateOutputs(compilerResult.sourceMaps);
                }, false, baselineOpts);
            });

            it('has correct source map record', () => {
                if (compilerOptions.sourceMap) {
                    Harness.Baseline.runBaseline('has correct source map record', baseName + '.sourcemap.txt', () => {
                        return compilerResult.getSourceMapRecord();
                    }, false, baselineOpts);
                }
            });

            it('has the expected errors', () => {
                Harness.Baseline.runBaseline('has the expected errors', baseName + '.errors.txt', () => {
                    if (compilerResult.errors.length === 0) {
                        return null;
                    }

                    return Harness.Compiler.getErrorBaseline(inputFiles.concat(otherFiles), compilerResult.errors);
                }, false, baselineOpts);
            });

            it('has no errors in generated declaration files', () => {
                if (compilerOptions.declaration && !compilerResult.errors.length) {
                    Harness.Baseline.runBaseline('has no errors in generated declaration files', baseName + '.dts.errors.txt', () => {
                        if (declFileCompilationResult.declResult.errors.length === 0) {
                            return null;
                        }

                        return Harness.Compiler.minimalDiagnosticsToString(declFileCompilationResult.declResult.errors) +
                            sys.newLine + sys.newLine +
                            Harness.Compiler.getErrorBaseline(declFileCompilationResult.declInputFiles.concat(declFileCompilationResult.declOtherFiles), declFileCompilationResult.declResult.errors);
                    }, false, baselineOpts);
                }
            });

            // TODO: Type baselines (need to refactor out from compilerRunner)
        });
    }
}

class RWCRunner extends RunnerBase {
    private runnerPath = "tests/runners/rwc";
    private sourcePath = "tests/cases/rwc/";

    private harnessCompiler: Harness.Compiler.HarnessCompiler;

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        // Recreate the compiler with the default lib
        Harness.Compiler.recreate({ useMinimalDefaultLib: false, noImplicitAny: false });
        this.harnessCompiler = Harness.Compiler.getCompiler();

        // Read in and evaluate the test list
        var testList = Harness.IO.listFiles(this.sourcePath, /.+\.json$/);
        for (var i = 0; i < testList.length; i++) {
            this.runTest(testList[i]);
        }
    }

    private runTest(jsonFilename: string) {
        RWC.runRWCTest(jsonFilename);
    }
}