/// <reference path='harness.ts'/>
/// <reference path='runnerbase.ts' />
/// <reference path='syntacticCleaner.ts' />
/// <reference path='loggedIO.ts' />
/// <reference path='..\compiler\commandLineParser.ts'/>

module RWC {
    function runWithIOLog(ioLog: IOLog, fn: () => void) {
        var oldSys = ts.sys;

        var wrappedSys = Playback.wrapSystem(ts.sys);
        wrappedSys.startReplayFromData(ioLog);
        ts.sys = wrappedSys;

        try {
            fn();
        } finally {
            wrappedSys.endReplay();
            ts.sys = oldSys;
        }
    }

    export function runRWCTest(jsonPath: string) {
        describe("Testing a RWC project: " + jsonPath, () => {
            var inputFiles: { unitName: string; content: string; }[] = [];
            var otherFiles: { unitName: string; content: string; }[] = [];
            var compilerResult: Harness.Compiler.CompilerResult;
            var compilerOptions: ts.CompilerOptions;
            var baselineOpts: Harness.Baseline.BaselineOptions = {
                Subfolder: 'rwc',
                Baselinefolder: 'internal/baselines'
            };
            var baseName = /(.*)\/(.*).json/.exec(ts.normalizeSlashes(jsonPath))[2];
            var currentDirectory: string;
            var useCustomLibraryFile: boolean;

            after(() => {
                // Mocha holds onto the closure environment of the describe callback even after the test is done.
                // Therefore we have to clean out large objects after the test is done.
                inputFiles = undefined;
                otherFiles = undefined;
                compilerResult = undefined;
                compilerOptions = undefined;
                baselineOpts = undefined;
                baseName = undefined;
                currentDirectory = undefined;
                // useCustomLibraryFile is a flag specified in the json object to indicate whether to use built/local/lib.d.ts
                // or to use lib.d.ts inside the json object. If the flag is true, use the lib.d.ts inside json file
                // otherwise use the lib.d.ts from built/local
                useCustomLibraryFile = undefined;
            });

            it('can compile', () => {
                var harnessCompiler = Harness.Compiler.getCompiler();
                var opts: ts.ParsedCommandLine;

                var ioLog: IOLog = JSON.parse(Harness.IO.readFile(jsonPath));
                currentDirectory = ioLog.currentDirectory;
                useCustomLibraryFile = ioLog.useCustomLibraryFile;
                runWithIOLog(ioLog, () => {
                    opts = ts.parseCommandLine(ioLog.arguments);
                    assert.equal(opts.errors.length, 0);

                    // To provide test coverage of output javascript file,
                    // we will set noEmitOnError flag to be false.
                    opts.options.noEmitOnError = false;
                });

                runWithIOLog(ioLog, () => {
                    harnessCompiler.reset();

                    // Load the files
                    ts.forEach(opts.fileNames, fileName => {
                        inputFiles.push(getHarnessCompilerInputUnit(fileName));
                    });

                    // Add files to compilation
                    for(let fileRead of ioLog.filesRead) {
                        // Check if the file is already added into the set of input files.
                        var resolvedPath = ts.normalizeSlashes(ts.sys.resolvePath(fileRead.path));
                        var inInputList = ts.forEach(inputFiles, inputFile => inputFile.unitName === resolvedPath);

                        if (!Harness.isLibraryFile(fileRead.path)) {
                            if (inInputList) {
                                continue;
                            }
                            otherFiles.push(getHarnessCompilerInputUnit(fileRead.path));
                        }
                        else if (!opts.options.noLib && Harness.isLibraryFile(fileRead.path)){
                            if (!inInputList) {
                                // If useCustomLibraryFile is true, we will use lib.d.ts from json object
                                // otherwise use the lib.d.ts from built/local
                                // Majority of RWC code will be using built/local/lib.d.ts instead of
                                // lib.d.ts inside json file. However, some RWC cases will still use
                                // their own version of lib.d.ts because they have customized lib.d.ts
                                if (useCustomLibraryFile) {
                                    inputFiles.push(getHarnessCompilerInputUnit(fileRead.path));
                                }
                                else {
                                    inputFiles.push(Harness.getDefaultLibraryFile());
                                }
                            }
                        }
                    }

                    // do not use lib since we already read it in above
                    opts.options.noLib = true;

                    // Emit the results
                    compilerOptions = harnessCompiler.compileFiles(inputFiles, otherFiles, compileResult => {
                        compilerResult = compileResult;
                        },
                        /*settingsCallback*/ undefined, opts.options,
                        // Since all Rwc json file specified current directory in its json file, we need to pass this information to compilerHost
                        // so that when the host is asked for current directory, it should give the value from json rather than from process
                        currentDirectory,
                        /*assertInvariants:*/ false);
                });

                function getHarnessCompilerInputUnit(fileName: string) {
                    var unitName = ts.normalizeSlashes(ts.sys.resolvePath(fileName));
                    try {
                        var content = ts.sys.readFile(unitName);
                    }
                    catch (e) {
                        // Leave content undefined.
                    }
                    return { unitName, content };
                }
            });


            it('has the expected emitted code', () => {
                Harness.Baseline.runBaseline('has the expected emitted code', baseName + '.output.js', () => {
                    return Harness.Compiler.collateOutputs(compilerResult.files, s => SyntacticCleaner.clean(s));
                }, false, baselineOpts);
            });

            it('has the expected declaration file content', () => {
                Harness.Baseline.runBaseline('has the expected declaration file content', baseName + '.d.ts', () => {
                    if (!compilerResult.declFilesCode.length) {
                        return null;
                    }

                    return Harness.Compiler.collateOutputs(compilerResult.declFilesCode);
                }, false, baselineOpts);
            });

            it('has the expected source maps', () => {
                Harness.Baseline.runBaseline('has the expected source maps', baseName + '.map', () => {
                    if (!compilerResult.sourceMaps.length) {
                        return null;
                    }

                    return Harness.Compiler.collateOutputs(compilerResult.sourceMaps);
                }, false, baselineOpts);
            });

            //it('has correct source map record', () => {
            //    if (compilerOptions.sourceMap) {
            //        Harness.Baseline.runBaseline('has correct source map record', baseName + '.sourcemap.txt', () => {
            //            return compilerResult.getSourceMapRecord();
            //        }, false, baselineOpts);
            //    }
            //});

            it('has the expected errors', () => {
                Harness.Baseline.runBaseline('has the expected errors', baseName + '.errors.txt', () => {
                    if (compilerResult.errors.length === 0) {
                        return null;
                    }

                    return Harness.Compiler.getErrorBaseline(inputFiles.concat(otherFiles), compilerResult.errors);
                }, false, baselineOpts);
            });

            // Ideally, a generated declaration file will have no errors. But we allow generated
            // declaration file errors as part of the baseline.
            it('has the expected errors in generated declaration files', () => {
                if (compilerOptions.declaration && !compilerResult.errors.length) {
                    Harness.Baseline.runBaseline('has the expected errors in generated declaration files', baseName + '.dts.errors.txt', () => {
                        var declFileCompilationResult = Harness.Compiler.getCompiler().compileDeclarationFiles(inputFiles, otherFiles, compilerResult,
                            /*settingscallback*/ undefined, compilerOptions, currentDirectory);
                        if (declFileCompilationResult.declResult.errors.length === 0) {
                            return null;
                        }

                        return Harness.Compiler.minimalDiagnosticsToString(declFileCompilationResult.declResult.errors) +
                            ts.sys.newLine + ts.sys.newLine +
                            Harness.Compiler.getErrorBaseline(declFileCompilationResult.declInputFiles.concat(declFileCompilationResult.declOtherFiles), declFileCompilationResult.declResult.errors);
                    }, false, baselineOpts);
                }
            });

            // TODO: Type baselines (need to refactor out from compilerRunner)
        });
    }
}

class RWCRunner extends RunnerBase {
    private static sourcePath = "internal/cases/rwc/";

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        // Read in and evaluate the test list
        var testList = Harness.IO.listFiles(RWCRunner.sourcePath, /.+\.json$/);
        for (var i = 0; i < testList.length; i++) {
            this.runTest(testList[i]);
        }
    }

    private runTest(jsonFileName: string) {
        RWC.runRWCTest(jsonFileName);
    }
}