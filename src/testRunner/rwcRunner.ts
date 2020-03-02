import { IoLog, wrapIO, newStyleLogIntoOldStyleLog } from "./Playback";
import { IO, setHarnessIO, Compiler, Baseline, isDefaultLibraryFile, RunnerBase, TestRunnerKind } from "./Harness";
import { CompilationResult } from "./compiler";
import { CompilerOptions, getBaseFileName, ParsedCommandLine, parseCommandLine, forEach, parseJsonText, ParseConfigHost, parseJsonSourceFileConfigFileContent, getDirectoryPath, extend, setConfigFileInOptions, createMap, normalizeSlashes } from "./ts";
import { isTsConfigFile } from "./vpath";
// In harness baselines, null is different than undefined. See `generateActual` in `harness.ts`.
function runWithIOLog(ioLog: IoLog, fn: (oldIO: IO) => void) {
    const oldIO = IO;
    const wrappedIO = wrapIO(oldIO);
    wrappedIO.startReplayFromData(ioLog);
    setHarnessIO(wrappedIO);
    try {
        fn(oldIO);
    }
    finally {
        wrappedIO.endReplay();
        setHarnessIO(oldIO);
    }
}
export function runRWCTest(jsonPath: string) {
    describe("Testing a rwc project: " + jsonPath, () => {
        let inputFiles: Compiler.TestFile[] = [];
        let otherFiles: Compiler.TestFile[] = [];
        let tsconfigFiles: Compiler.TestFile[] = [];
        let compilerResult: CompilationResult;
        let compilerOptions: CompilerOptions;
        const baselineOpts: Baseline.BaselineOptions = {
            Subfolder: "rwc",
            Baselinefolder: "internal/baselines"
        };
        const baseName = getBaseFileName(jsonPath);
        let currentDirectory: string;
        let useCustomLibraryFile: boolean;
        let caseSensitive: boolean;
        after(() => {
            // Mocha holds onto the closure environment of the describe callback even after the test is done.
            // Therefore we have to clean out large objects after the test is done.
            inputFiles = [];
            otherFiles = [];
            tsconfigFiles = [];
            compilerResult = undefined!;
            compilerOptions = undefined!;
            currentDirectory = undefined!;
            // useCustomLibraryFile is a flag specified in the json object to indicate whether to use built/local/lib.d.ts
            // or to use lib.d.ts inside the json object. If the flag is true, use the lib.d.ts inside json file
            // otherwise use the lib.d.ts from built/local
            useCustomLibraryFile = false;
            caseSensitive = false;
        });
        it("can compile", function (this: Mocha.ITestCallbackContext) {
            this.timeout(800000); // Allow long timeouts for RWC compilations
            let opts!: ParsedCommandLine;
            const ioLog: IoLog = newStyleLogIntoOldStyleLog(JSON.parse((IO.readFile(`internal/cases/rwc/${jsonPath}/test.json`)!)), IO, `internal/cases/rwc/${baseName}`);
            currentDirectory = ioLog.currentDirectory;
            useCustomLibraryFile = !!ioLog.useCustomLibraryFile;
            runWithIOLog(ioLog, () => {
                opts = parseCommandLine(ioLog.arguments, fileName => IO.readFile(fileName));
                assert.equal(opts.errors.length, 0);
                // To provide test coverage of output javascript file,
                // we will set noEmitOnError flag to be false.
                opts.options.noEmitOnError = false;
            });
            let fileNames = opts.fileNames;
            runWithIOLog(ioLog, () => {
                const tsconfigFile = forEach(ioLog.filesRead, f => isTsConfigFile(f.path) ? f : undefined);
                if (tsconfigFile) {
                    const tsconfigFileContents = getHarnessCompilerInputUnit(tsconfigFile.path);
                    tsconfigFiles.push({ unitName: tsconfigFile.path, content: tsconfigFileContents.content });
                    const parsedTsconfigFileContents = parseJsonText(tsconfigFile.path, tsconfigFileContents.content);
                    const configParseHost: ParseConfigHost = {
                        useCaseSensitiveFileNames: IO.useCaseSensitiveFileNames(),
                        fileExists: IO.fileExists,
                        readDirectory: IO.readDirectory,
                        readFile: IO.readFile
                    };
                    const configParseResult = parseJsonSourceFileConfigFileContent(parsedTsconfigFileContents, configParseHost, getDirectoryPath(tsconfigFile.path));
                    fileNames = configParseResult.fileNames;
                    opts.options = extend(opts.options, configParseResult.options);
                    setConfigFileInOptions(opts.options, configParseResult.options.configFile);
                }
                // Deduplicate files so they are only printed once in baselines (they are deduplicated within the compiler already)
                const uniqueNames = createMap<true>();
                for (const fileName of fileNames) {
                    // Must maintain order, build result list while checking map
                    const normalized = normalizeSlashes((IO.resolvePath(fileName)!));
                    if (!uniqueNames.has(normalized)) {
                        uniqueNames.set(normalized, true);
                        // Load the file
                        inputFiles.push(getHarnessCompilerInputUnit(fileName));
                    }
                }
                // Add files to compilation
                for (const fileRead of ioLog.filesRead) {
                    const unitName = normalizeSlashes((IO.resolvePath(fileRead.path)!));
                    if (!uniqueNames.has(unitName) && !isDefaultLibraryFile(fileRead.path)) {
                        uniqueNames.set(unitName, true);
                        otherFiles.push(getHarnessCompilerInputUnit(fileRead.path));
                    }
                    else if (!opts.options.noLib && isDefaultLibraryFile(fileRead.path) && !uniqueNames.has(unitName) && useCustomLibraryFile) {
                        // If useCustomLibraryFile is true, we will use lib.d.ts from json object
                        // otherwise use the lib.d.ts from built/local
                        // Majority of RWC code will be using built/local/lib.d.ts instead of
                        // lib.d.ts inside json file. However, some RWC cases will still use
                        // their own version of lib.d.ts because they have customized lib.d.ts
                        uniqueNames.set(unitName, true);
                        inputFiles.push(getHarnessCompilerInputUnit(fileRead.path));
                    }
                }
            });
            if (useCustomLibraryFile) {
                // do not use lib since we already read it in above
                opts.options.lib = undefined;
                opts.options.noLib = true;
            }
            caseSensitive = ioLog.useCaseSensitiveFileNames || false;
            // Emit the results
            compilerResult = Compiler.compileFiles(inputFiles, otherFiles, { useCaseSensitiveFileNames: "" + caseSensitive }, opts.options, 
            // Since each RWC json file specifies its current directory in its json file, we need
            // to pass this information in explicitly instead of acquiring it from the process.
            currentDirectory);
            compilerOptions = compilerResult.options;
            function getHarnessCompilerInputUnit(fileName: string): Compiler.TestFile {
                const unitName = normalizeSlashes((IO.resolvePath(fileName)!));
                let content: string;
                try {
                    content = (IO.readFile(unitName)!);
                }
                catch (e) {
                    content = (IO.readFile(fileName)!);
                }
                return { unitName, content };
            }
        });
        it("has the expected emitted code", function (this: Mocha.ITestCallbackContext) {
            this.timeout(100000); // Allow longer timeouts for RWC js verification
            Baseline.runMultifileBaseline(baseName, "", () => {
                return Compiler.iterateOutputs(compilerResult.js.values());
            }, baselineOpts, [".js", ".jsx"]);
        });
        it("has the expected declaration file content", () => {
            Baseline.runMultifileBaseline(baseName, "", () => {
                if (!compilerResult.dts.size) {
                    return null; // eslint-disable-line no-null/no-null
                }
                return Compiler.iterateOutputs(compilerResult.dts.values());
            }, baselineOpts, [".d.ts"]);
        });
        it("has the expected source maps", () => {
            Baseline.runMultifileBaseline(baseName, "", () => {
                if (!compilerResult.maps.size) {
                    return null; // eslint-disable-line no-null/no-null
                }
                return Compiler.iterateOutputs(compilerResult.maps.values());
            }, baselineOpts, [".map"]);
        });
        it("has the expected errors", () => {
            Baseline.runMultifileBaseline(baseName, ".errors.txt", () => {
                if (compilerResult.diagnostics.length === 0) {
                    return null; // eslint-disable-line no-null/no-null
                }
                // Do not include the library in the baselines to avoid noise
                const baselineFiles = tsconfigFiles.concat(inputFiles, otherFiles).filter(f => !isDefaultLibraryFile(f.unitName));
                const errors = compilerResult.diagnostics.filter(e => !e.file || !isDefaultLibraryFile(e.file.fileName));
                return Compiler.iterateErrorBaseline(baselineFiles, errors, { caseSensitive, currentDirectory });
            }, baselineOpts);
        });
        // Ideally, a generated declaration file will have no errors. But we allow generated
        // declaration file errors as part of the baseline.
        it("has the expected errors in generated declaration files", () => {
            if (compilerOptions.declaration && !compilerResult.diagnostics.length) {
                Baseline.runMultifileBaseline(baseName, ".dts.errors.txt", () => {
                    if (compilerResult.diagnostics.length === 0) {
                        return null; // eslint-disable-line no-null/no-null
                    }
                    const declContext = Compiler.prepareDeclarationCompilationContext(inputFiles, otherFiles, compilerResult, /*harnessSettings*/ (undefined!), compilerOptions, currentDirectory // TODO: GH#18217
                    );
                    // Reset compilerResult before calling into `compileDeclarationFiles` so the memory from the original compilation can be freed
                    const links = compilerResult.symlinks;
                    compilerResult = undefined!;
                    const declFileCompilationResult = (Compiler.compileDeclarationFiles(declContext, links)!);
                    return Compiler.iterateErrorBaseline(tsconfigFiles.concat(declFileCompilationResult.declInputFiles, declFileCompilationResult.declOtherFiles), declFileCompilationResult.declResult.diagnostics, { caseSensitive, currentDirectory });
                }, baselineOpts);
            }
        });
    });
}
export class RWCRunner extends RunnerBase {
    public enumerateTestFiles() {
        // see also: `enumerateTestFiles` in tests/webTestServer.ts
        return IO.getDirectories("internal/cases/rwc/");
    }
    public kind(): TestRunnerKind {
        return "rwc";
    }
    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        // Read in and evaluate the test list
        for (const test of this.tests && this.tests.length ? this.tests : this.getTestFiles()) {
            this.runTest(typeof test === "string" ? test : test.file);
        }
    }
    private runTest(jsonFileName: string) {
        runRWCTest(jsonFileName);
    }
}
