/// <reference path='harness.ts'/>
/// <reference path='runnerbase.ts' />
/// <reference path='syntacticCleaner.ts' />
/// <reference path='loggedIO.ts' />
/// <reference path='..\compiler\commandLineParser.ts'/>

module RWC {
    class RWCEmitter implements Harness.Compiler.IEmitterIOHost {
        public outputs: { [filename: string]: string; } = {};

        constructor() { }

        writeFile(path: string, contents: string, writeByteOrderMark: boolean) {
            if (path in this.outputs) throw new Error('Emitter attempted to write to "' + path + '" twice');
            this.outputs[path] = contents;
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

    function collateOutputs(emitterIOHost: RWCEmitter, fnTest: (s: string) => {}, clean?: (s: string) => string) {
        // Collect, test, and sort the filenames
        var files: string[] = [];
        for (var fn in emitterIOHost.outputs) {
            if (emitterIOHost.outputs.hasOwnProperty(fn) && fnTest(fn)) {
                files.push(fn);
            }
        }
        function cleanName(fn: string) {
            var lastSlash = Harness.Path.switchToForwardSlashes(fn).lastIndexOf('/');
            return fn.substr(lastSlash + 1).toLowerCase();
        }
        files.sort((a, b) => cleanName(a).localeCompare(cleanName(b)));

        // Emit them
        var result = '';
        files.forEach(fn => {
            // Some extra spacing if this isn't the first file
            if (result.length) result = result + '\r\n\r\n';

            // Filename header + content
            result = result + '/*====== ' + fn + ' ======*/\r\n';
            if (clean) {
                result = result + clean(emitterIOHost.outputs[fn]);
            } else {
                result = result + emitterIOHost.outputs[fn];
            }
        });
        return result;
    }

    export function runRWCTest(jsonPath: string) {
        var harnessCompiler = Harness.Compiler.getCompiler();
        var opts: ts.ParsedCommandLine;

        var ioLog: IOLog = JSON.parse(Harness.IO.readFile(jsonPath));
        var errors = '';

        it('has parsable options', () => {
            runWithIOLog(ioLog, () => {
                opts = ts.parseCommandLine(ioLog.arguments);
                assert.equal(opts.errors.length, 0);
            });
        });

        var emitterIOHost = new RWCEmitter();
        it('can compile', () => {
            runWithIOLog(ioLog, () => {
                harnessCompiler.reset();
                var inputList: string[] = opts.filenames;
                var noDefaultLib = false;
                var libPath = Harness.IO.directoryName(sys.getExecutingFilePath()) + '/lib.d.ts';

                if (!opts.options.noResolve) {
                    var filemap: any = {};
                    var host: ts.CompilerHost = {
                        getCurrentDirectory: () => sys.getCurrentDirectory(),
                        getCancellationToken: (): any => undefined,
                        getSourceFile: (fileName, languageVersion) => {
                            var fileContents: string;
                            try {
                                fileContents = sys.readFile(fileName);
                            }
                            catch (e) {
                                // Leave fileContents undefined;
                            }
                            return ts.createSourceFile(fileName, fileContents, languageVersion);
                        },
                        getDefaultLibFilename: () => libPath,
                        writeFile: (fn, contents) => emitterIOHost.writeFile(fn, contents, false),
                        getCanonicalFileName: ts.getCanonicalFileName,
                        useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames
                    };

                    var resolvedProgram = ts.createProgram(opts.filenames, opts.options, host);
                    resolvedProgram.getSourceFiles().forEach(sourceFile => {
                        noDefaultLib = noDefaultLib || sourceFile.hasNoDefaultLib;
                        if (inputList.indexOf(sourceFile.filename) === -1) {
                            inputList.push(sourceFile.filename);
                        }
                    });
                }

                if (!opts.options.noLib && !noDefaultLib) {
                    inputList.push(libPath);
                }

                harnessCompiler.reset();
                harnessCompiler.setCompilerSettingsFromOptions(opts.options);

                // Load the files
                inputList.forEach((item: string) => {
                    var resolvedPath = Harness.Path.switchToForwardSlashes(sys.resolvePath(item));
                    try {
                        var content = sys.readFile(resolvedPath);
                    }
                    catch (e) {
                        // Leave content undefined.
                    }
                    harnessCompiler.addInputFile({ unitName: resolvedPath, content: content });
                });

                harnessCompiler.compile();

                // Emit the results
                harnessCompiler.emitAll(emitterIOHost);
                harnessCompiler.emitAllDeclarations();

                var compilationErrors = harnessCompiler.reportCompilationErrors();

                // Create an error baseline
                compilationErrors.forEach(err => {
                    errors += err.filename + ' line ' + err.line + ': ' + err.message + '\r\n';
                });
            });
        });

        // Baselines
        var baselineOpts: Harness.Baseline.BaselineOptions = { Subfolder: 'rwc' };
        var baseName = /(.*)\/(.*).json/.exec(Harness.Path.switchToForwardSlashes(jsonPath))[2];

        it('has the expected emitted code', () => {
            Harness.Baseline.runBaseline('has the expected emitted code', baseName + '.output.js', () => {
                return collateOutputs(emitterIOHost, fn => fn.substr(fn.length - '.js'.length) === '.js', s => SyntacticCleaner.clean(s));
            }, false, baselineOpts);
        });

        it('has the expected declaration file content', () => {
            Harness.Baseline.runBaseline('has the expected declaration file content', baseName + '.d.ts', () => {
                var result = collateOutputs(emitterIOHost, fn => fn.substr(fn.length - '.d.ts'.length) === '.d.ts');
                return result.length > 0 ? result : null;
            }, false, baselineOpts);
        });

        /*
        it('has the expected source maps', () => {
            Harness.Baseline.runBaseline('has the expected source maps', baseName + '.map', () => {
                var result = collateOutputs(emitterIOHost, fn => fn.substr(fn.length - '.map'.length) === '.map');
                return result.length > 0 ? result : null;
            }, false, baselineOpts);
        });
        */

        it('has the expected errors', () => {
            Harness.Baseline.runBaseline('has the expected errors', baseName + '.errors.txt', () => {
                return errors.length > 0 ? errors : null;
            }, false, baselineOpts);
        });

        // TODO: Type baselines (need to refactor out from compilerRunner)
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
        describe("Testing a RWC project: " + jsonFilename, () => {
            RWC.runRWCTest(jsonFilename);
        });
    }
}