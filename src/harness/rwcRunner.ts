/// <reference path="harness.ts"/>
/// <reference path="runnerbase.ts" />
/// <reference path="loggedIO.ts" />
/// <reference path="..\compiler\commandLineParser.ts"/>
// In harness baselines, null is different than undefined. See `generateActual` in `harness.ts`.
/* tslint:disable:no-null-keyword */

namespace RWC {
    function runWithIOLog(ioLog: IOLog, fn: (oldIO: Harness.IO) => void) {
        const oldIO = Harness.IO;

        const wrappedIO = Playback.wrapIO(oldIO);
        wrappedIO.startReplayFromData(ioLog);
        Harness.IO = wrappedIO;

        try {
            fn(oldIO);
        } finally {
            wrappedIO.endReplay();
            Harness.IO = oldIO;
        }
    }

    function isTsConfigFile(file: { path: string }): boolean {
        const tsConfigFileName = "tsconfig.json";
        return file.path.substr(file.path.length - tsConfigFileName.length).toLowerCase() === tsConfigFileName;
    }

    export function runRWCTest(jsonPath: string) {
        describe("Testing a RWC project: " + jsonPath, () => {
            let inputFiles: Harness.Compiler.TestFile[] = [];
            let otherFiles: Harness.Compiler.TestFile[] = [];
            let compilerResult: Harness.Compiler.CompilerResult;
            let compilerOptions: ts.CompilerOptions;
            const baselineOpts: Harness.Baseline.BaselineOptions = {
                Subfolder: "rwc",
                Baselinefolder: "internal/baselines"
            };
            const baseName = /(.*)\/(.*).json/.exec(ts.normalizeSlashes(jsonPath))[2];
            let currentDirectory: string;
            let useCustomLibraryFile: boolean;
            after(() => {
                // Mocha holds onto the closure environment of the describe callback even after the test is done.
                // Therefore we have to clean out large objects after the test is done.
                inputFiles = [];
                otherFiles = [];
                compilerResult = undefined;
                compilerOptions = undefined;
                currentDirectory = undefined;
                // useCustomLibraryFile is a flag specified in the json object to indicate whether to use built/local/lib.d.ts
                // or to use lib.d.ts inside the json object. If the flag is true, use the lib.d.ts inside json file
                // otherwise use the lib.d.ts from built/local
                useCustomLibraryFile = undefined;
            });

            it("can compile", () => {
                let opts: ts.ParsedCommandLine;

                const ioLog: IOLog = JSON.parse(Harness.IO.readFile(jsonPath));
                currentDirectory = ioLog.currentDirectory;
                useCustomLibraryFile = ioLog.useCustomLibraryFile;
                runWithIOLog(ioLog, () => {
                    opts = ts.parseCommandLine(ioLog.arguments, fileName => Harness.IO.readFile(fileName));
                    assert.equal(opts.errors.length, 0);

                    // To provide test coverage of output javascript file,
                    // we will set noEmitOnError flag to be false.
                    opts.options.noEmitOnError = false;
                });

                runWithIOLog(ioLog, oldIO => {
                    let fileNames = opts.fileNames;

                    const tsconfigFile = ts.forEach(ioLog.filesRead, f => isTsConfigFile(f) ? f : undefined);
                    if (tsconfigFile) {
                        const tsconfigFileContents = getHarnessCompilerInputUnit(tsconfigFile.path);
                        const parsedTsconfigFileContents = ts.parseConfigFileTextToJson(tsconfigFile.path, tsconfigFileContents.content);
                        const configParseHost: ts.ParseConfigHost = {
                            useCaseSensitiveFileNames: Harness.IO.useCaseSensitiveFileNames(),
                            fileExists: Harness.IO.fileExists,
                            readDirectory: Harness.IO.readDirectory,
                            readFile: Harness.IO.readFile
                        };
                        const configParseResult = ts.parseJsonConfigFileContent(parsedTsconfigFileContents.config, configParseHost, ts.getDirectoryPath(tsconfigFile.path));
                        fileNames = configParseResult.fileNames;
                        opts.options = ts.extend(opts.options, configParseResult.options);
                    }

                    // Load the files
                    for (const fileName of fileNames) {
                        inputFiles.push(getHarnessCompilerInputUnit(fileName));
                    }

                    // Add files to compilation
                    const isInInputList = (resolvedPath: string) => (inputFile: { unitName: string; content: string; }) => inputFile.unitName === resolvedPath;
                    for (const fileRead of ioLog.filesRead) {
                        // Check if the file is already added into the set of input files.
                        const resolvedPath = ts.normalizeSlashes(Harness.IO.resolvePath(fileRead.path));
                        const inInputList = ts.forEach(inputFiles, isInInputList(resolvedPath));

                        if (isTsConfigFile(fileRead)) {
                            continue;
                        }

                        if (!Harness.isDefaultLibraryFile(fileRead.path)) {
                            if (inInputList) {
                                continue;
                            }
                            otherFiles.push(getHarnessCompilerInputUnit(fileRead.path));
                        }
                        else if (!opts.options.noLib && Harness.isDefaultLibraryFile(fileRead.path)) {
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
                                    // set the flag to put default library to the beginning of the list
                                    inputFiles.unshift(Harness.getDefaultLibraryFile(oldIO));
                                }
                            }
                        }
                    }

                    // do not use lib since we already read it in above
                    opts.options.noLib = true;

                    // Emit the results
                    compilerOptions = undefined;
                    const output = Harness.Compiler.compileFiles(
                        inputFiles,
                        otherFiles,
                        /* harnessOptions */ undefined,
                        opts.options,
                        // Since each RWC json file specifies its current directory in its json file, we need
                        // to pass this information in explicitly instead of acquiring it from the process.
                        currentDirectory);

                    compilerOptions = output.options;
                    compilerResult = output.result;
                });

                function getHarnessCompilerInputUnit(fileName: string): Harness.Compiler.TestFile {
                    const unitName = ts.normalizeSlashes(Harness.IO.resolvePath(fileName));
                    let content: string;
                    try {
                        content = Harness.IO.readFile(unitName);
                    }
                    catch (e) {
                        content = Harness.IO.readFile(fileName);
                    }
                    return { unitName, content };
                }
            });


            it("has the expected emitted code", () => {
                Harness.Baseline.runBaseline(`${baseName}.output.js`, () => {
                    return Harness.Compiler.collateOutputs(compilerResult.files);
                }, baselineOpts);
            });

            it("has the expected declaration file content", () => {
                Harness.Baseline.runBaseline(`${baseName}.d.ts`, () => {
                    if (!compilerResult.declFilesCode.length) {
                        return null;
                    }

                    return Harness.Compiler.collateOutputs(compilerResult.declFilesCode);
                }, baselineOpts);
            });

            it("has the expected source maps", () => {
                Harness.Baseline.runBaseline(`${baseName}.map`, () => {
                    if (!compilerResult.sourceMaps.length) {
                        return null;
                    }

                    return Harness.Compiler.collateOutputs(compilerResult.sourceMaps);
                }, baselineOpts);
            });

            /*it("has correct source map record", () => {
                if (compilerOptions.sourceMap) {
                    Harness.Baseline.runBaseline(baseName + ".sourcemap.txt", () => {
                        return compilerResult.getSourceMapRecord();
                    }, baselineOpts);
                }
            });*/

            it("has the expected errors", () => {
                Harness.Baseline.runBaseline(`${baseName}.errors.txt`, () => {
                    if (compilerResult.errors.length === 0) {
                        return null;
                    }
                    // Do not include the library in the baselines to avoid noise
                    const baselineFiles = inputFiles.concat(otherFiles).filter(f => !Harness.isDefaultLibraryFile(f.unitName));
                    const errors = compilerResult.errors.filter(e => e.file && !Harness.isDefaultLibraryFile(e.file.fileName));
                    return Harness.Compiler.getErrorBaseline(baselineFiles, errors);
                }, baselineOpts);
            });

            // Ideally, a generated declaration file will have no errors. But we allow generated
            // declaration file errors as part of the baseline.
            it("has the expected errors in generated declaration files", () => {
                if (compilerOptions.declaration && !compilerResult.errors.length) {
                    Harness.Baseline.runBaseline(`${baseName}.dts.errors.txt`, () => {
                        const declFileCompilationResult = Harness.Compiler.compileDeclarationFiles(
                            inputFiles, otherFiles, compilerResult, /*harnessSettings*/ undefined, compilerOptions, currentDirectory);

                        if (declFileCompilationResult.declResult.errors.length === 0) {
                            return null;
                        }

                        return Harness.Compiler.minimalDiagnosticsToString(declFileCompilationResult.declResult.errors) +
                            Harness.IO.newLine() + Harness.IO.newLine() +
                            Harness.Compiler.getErrorBaseline(declFileCompilationResult.declInputFiles.concat(declFileCompilationResult.declOtherFiles), declFileCompilationResult.declResult.errors);
                    }, baselineOpts);
                }
            });

            it("has the expected types", () => {
                // We don't need to pass the extension here because "doTypeAndSymbolBaseline" will append appropriate extension of ".types" or ".symbols"
                Harness.Compiler.doTypeAndSymbolBaseline(baseName, compilerResult, inputFiles
                    .concat(otherFiles)
                    .filter(file => !!compilerResult.program.getSourceFile(file.unitName))
                    .filter(e => !Harness.isDefaultLibraryFile(e.unitName)), baselineOpts);
            });
        });
    }
}

class RWCRunner extends RunnerBase {
    private static sourcePath = "internal/cases/rwc/";

    public enumerateTestFiles() {
        return Harness.IO.listFiles(RWCRunner.sourcePath, /.+\.json$/);
    }

    public kind(): TestRunnerKind {
        return "rwc";
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        // Read in and evaluate the test list
        const testList = this.enumerateTestFiles();
        for (let i = 0; i < testList.length; i++) {
            this.runTest(testList[i]);
        }
    }

    private runTest(jsonFileName: string) {
        RWC.runRWCTest(jsonFileName);
    }
}