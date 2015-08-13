///<reference path="harness.ts" />
///<reference path="runnerbase.ts" />

// Test case is json of below type in tests/cases/project/
interface ProjectRunnerTestCase {
    scenario: string;
    projectRoot: string; // project where it lives - this also is the current directory when compiling
    inputFiles: string[]; // list of input files to be given to program
    out?: string; // --out
    outDir?: string; // --outDir
    sourceMap?: boolean; // --map
    mapRoot?: string; // --mapRoot
    resolveMapRoot?: boolean; // should we resolve this map root and give compiler the absolute disk path as map root?
    sourceRoot?: string; // --sourceRoot
    resolveSourceRoot?: boolean; // should we resolve this source root and give compiler the absolute disk path as map root?
    declaration?: boolean; // --d
    baselineCheck?: boolean; // Verify the baselines of output files, if this is false, we will write to output to the disk but there is no verification of baselines
    runTest?: boolean; // Run the resulting test
    bug?: string; // If there is any bug associated with this test case
    noResolve?: boolean;
    rootDir?: string; // --rootDir
}

interface ProjectRunnerTestCaseResolutionInfo extends ProjectRunnerTestCase {
    // Apart from actual test case the results of the resolution
    resolvedInputFiles: string[]; // List of files that were asked to read by compiler
    emittedFiles: string[]; // List of files that were emitted by the compiler
}

interface BatchCompileProjectTestCaseEmittedFile extends Harness.Compiler.GeneratedFile {
    emittedFileName: string;
}

interface CompileProjectFilesResult {
    moduleKind: ts.ModuleKind;
    program: ts.Program;
    errors: ts.Diagnostic[];
    sourceMapData: ts.SourceMapData[];
}

interface BatchCompileProjectTestCaseResult extends CompileProjectFilesResult {
    outputFiles: BatchCompileProjectTestCaseEmittedFile[];
    nonSubfolderDiskFiles: number;
}

class ProjectRunner extends RunnerBase {
    public initializeTests() {
        if (this.tests.length === 0) {
            let testFiles = this.enumerateFiles("tests/cases/project", /\.json$/, { recursive: true });
            testFiles.forEach(fn => {
                fn = fn.replace(/\\/g, "/");
                this.runProjectTestCase(fn);
            });
        }
        else {
            this.tests.forEach(test => this.runProjectTestCase(test));
        }
    }

    private runProjectTestCase(testCaseFileName: string) {
        let testCase: ProjectRunnerTestCase;

        let testFileText: string = null;
        try {
            testFileText = ts.sys.readFile(testCaseFileName);
        }
        catch (e) {
            assert(false, "Unable to open testcase file: " + testCaseFileName + ": " + e.message);
        }

        try {
            testCase = <ProjectRunnerTestCase>JSON.parse(testFileText);
        }
        catch (e) {
            assert(false, "Testcase: " + testCaseFileName + " does not contain valid json format: " + e.message);
        }
        let testCaseJustName = testCaseFileName.replace(/^.*[\\\/]/, "").replace(/\.json/, "");

        function moduleNameToString(moduleKind: ts.ModuleKind) {
            return moduleKind === ts.ModuleKind.AMD
                ? "amd"
                : moduleKind === ts.ModuleKind.CommonJS
                ? "node"
                : "none";
        }

        // Project baselines verified go in project/testCaseName/moduleKind/
        function getBaselineFolder(moduleKind: ts.ModuleKind) {
            return "project/" + testCaseJustName + "/" + moduleNameToString(moduleKind) + "/";
        }

        // When test case output goes to tests/baselines/local/projectOutput/testCaseName/moduleKind/
        // We have these two separate locations because when comparing baselines the baseline verifier will delete the existing file
        // so even if it was created by compiler in that location, the file will be deleted by verified before we can read it
        // so lets keep these two locations separate
        function getProjectOutputFolder(fileName: string, moduleKind: ts.ModuleKind) {
            return Harness.Baseline.localPath("projectOutput/" + testCaseJustName + "/" + moduleNameToString(moduleKind) + "/" + fileName);
        }

        function cleanProjectUrl(url: string) {
            let diskProjectPath = ts.normalizeSlashes(ts.sys.resolvePath(testCase.projectRoot));
            let projectRootUrl = "file:///" + diskProjectPath;
            let normalizedProjectRoot = ts.normalizeSlashes(testCase.projectRoot);
            diskProjectPath = diskProjectPath.substr(0, diskProjectPath.lastIndexOf(normalizedProjectRoot));
            projectRootUrl = projectRootUrl.substr(0, projectRootUrl.lastIndexOf(normalizedProjectRoot));
            if (url && url.length) {
                if (url.indexOf(projectRootUrl) === 0) {
                    // replace the disk specific project url path into project root url
                    url = "file:///" + url.substr(projectRootUrl.length);
                }
                else if (url.indexOf(diskProjectPath) === 0) {
                    // Replace the disk specific path into the project root path
                    url = url.substr(diskProjectPath.length);
                    // TODO: should be '!=='?
                    if (url.charCodeAt(0) != ts.CharacterCodes.slash) {
                        url = "/" + url;
                    }
                }
            }

            return url;
        }

        function getCurrentDirectory() {
            return ts.sys.resolvePath(testCase.projectRoot);
        }

        function compileProjectFiles(moduleKind: ts.ModuleKind, getInputFiles: () => string[],
            getSourceFileText: (fileName: string) => string,
            writeFile: (fileName: string, data: string, writeByteOrderMark: boolean) => void): CompileProjectFilesResult {

            let program = ts.createProgram(getInputFiles(), createCompilerOptions(), createCompilerHost());
            let errors = ts.getPreEmitDiagnostics(program);

            let emitResult = program.emit();
            errors = ts.concatenate(errors, emitResult.diagnostics);
            let sourceMapData = emitResult.sourceMaps;

            // Clean up source map data that will be used in baselining
            if (sourceMapData) {
                for (let i = 0; i < sourceMapData.length; i++) {
                    for (let j = 0; j < sourceMapData[i].sourceMapSources.length; j++) {
                        sourceMapData[i].sourceMapSources[j] = cleanProjectUrl(sourceMapData[i].sourceMapSources[j]);
                    }
                    sourceMapData[i].jsSourceMappingURL = cleanProjectUrl(sourceMapData[i].jsSourceMappingURL);
                    sourceMapData[i].sourceMapSourceRoot = cleanProjectUrl(sourceMapData[i].sourceMapSourceRoot);
                }
            }

            return {
                moduleKind,
                program,
                errors,
                sourceMapData
            };

            function createCompilerOptions(): ts.CompilerOptions {
                return {
                    declaration: !!testCase.declaration,
                    sourceMap: !!testCase.sourceMap,
                    out: testCase.out,
                    outDir: testCase.outDir,
                    mapRoot: testCase.resolveMapRoot && testCase.mapRoot ? ts.sys.resolvePath(testCase.mapRoot) : testCase.mapRoot,
                    sourceRoot: testCase.resolveSourceRoot && testCase.sourceRoot ? ts.sys.resolvePath(testCase.sourceRoot) : testCase.sourceRoot,
                    module: moduleKind,
                    noResolve: testCase.noResolve,
                    rootDir: testCase.rootDir
                };
            }

            function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget): ts.SourceFile {
                let sourceFile: ts.SourceFile = undefined;
                if (fileName === Harness.Compiler.defaultLibFileName) {
                    sourceFile = languageVersion === ts.ScriptTarget.ES6 ? Harness.Compiler.defaultES6LibSourceFile : Harness.Compiler.defaultLibSourceFile;
                }
                else {
                    let text = getSourceFileText(fileName);
                    if (text !== undefined) {
                        sourceFile = Harness.Compiler.createSourceFileAndAssertInvariants(fileName, text, languageVersion);
                    }
                }

                return sourceFile;
            }

            function createCompilerHost(): ts.CompilerHost {
                return {
                    getSourceFile,
                    getDefaultLibFileName: options => Harness.Compiler.defaultLibFileName,
                    writeFile,
                    getCurrentDirectory,
                    getCanonicalFileName: Harness.Compiler.getCanonicalFileName,
                    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
                    getNewLine: () => ts.sys.newLine
                };
            }
        }

        function batchCompilerProjectTestCase(moduleKind: ts.ModuleKind): BatchCompileProjectTestCaseResult{
            let nonSubfolderDiskFiles = 0;

            let outputFiles: BatchCompileProjectTestCaseEmittedFile[] = [];

            let projectCompilerResult = compileProjectFiles(moduleKind, () => testCase.inputFiles, getSourceFileText, writeFile);
            return {
                moduleKind,
                program: projectCompilerResult.program,
                sourceMapData: projectCompilerResult.sourceMapData,
                outputFiles,
                errors: projectCompilerResult.errors,
                nonSubfolderDiskFiles,
            };

            function getSourceFileText(fileName: string): string {
                let text: string = undefined;
                try {
                    text = ts.sys.readFile(ts.isRootedDiskPath(fileName)
                        ? fileName
                        : ts.normalizeSlashes(testCase.projectRoot) + "/" + ts.normalizeSlashes(fileName));
                }
                catch (e) {
                    // text doesn't get defined.
                }
                return text;
            }

            function writeFile(fileName: string, data: string, writeByteOrderMark: boolean) {
                let diskFileName = ts.isRootedDiskPath(fileName)
                    ? fileName
                    : ts.normalizeSlashes(testCase.projectRoot) + "/" + ts.normalizeSlashes(fileName);

                let diskRelativeName = ts.getRelativePathToDirectoryOrUrl(testCase.projectRoot, diskFileName,
                    getCurrentDirectory(), Harness.Compiler.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
                if (ts.isRootedDiskPath(diskRelativeName) || diskRelativeName.substr(0, 3) === "../") {
                    // If the generated output file resides in the parent folder or is rooted path,
                    // we need to instead create files that can live in the project reference folder
                    // but make sure extension of these files matches with the fileName the compiler asked to write
                    diskRelativeName = "diskFile" + nonSubfolderDiskFiles++ +
                    (Harness.Compiler.isDTS(fileName) ? ".d.ts" :
                    Harness.Compiler.isJS(fileName) ? ".js" : ".js.map");
                }

                if (Harness.Compiler.isJS(fileName)) {
                    // Make sure if there is URl we have it cleaned up
                    let indexOfSourceMapUrl = data.lastIndexOf("//# sourceMappingURL=");
                    if (indexOfSourceMapUrl !== -1) {
                        data = data.substring(0, indexOfSourceMapUrl + 21) + cleanProjectUrl(data.substring(indexOfSourceMapUrl + 21));
                    }
                }
                else if (Harness.Compiler.isJSMap(fileName)) {
                    // Make sure sources list is cleaned
                    let sourceMapData = JSON.parse(data);
                    for (let i = 0; i < sourceMapData.sources.length; i++) {
                        sourceMapData.sources[i] = cleanProjectUrl(sourceMapData.sources[i]);
                    }
                    sourceMapData.sourceRoot = cleanProjectUrl(sourceMapData.sourceRoot);
                    data = JSON.stringify(sourceMapData);
                }

                let outputFilePath = getProjectOutputFolder(diskRelativeName, moduleKind);
                // Actual writing of file as in tc.ts
                function ensureDirectoryStructure(directoryname: string) {
                    if (directoryname) {
                        if (!ts.sys.directoryExists(directoryname)) {
                            ensureDirectoryStructure(ts.getDirectoryPath(directoryname));
                            ts.sys.createDirectory(directoryname);
                        }
                    }
                }
                ensureDirectoryStructure(ts.getDirectoryPath(ts.normalizePath(outputFilePath)));
                ts.sys.writeFile(outputFilePath, data, writeByteOrderMark);

                outputFiles.push({ emittedFileName: fileName, code: data, fileName: diskRelativeName, writeByteOrderMark: writeByteOrderMark });
            }
        }

        function compileCompileDTsFiles(compilerResult: BatchCompileProjectTestCaseResult) {
            let allInputFiles: { emittedFileName: string; code: string; }[] = [];
            let compilerOptions = compilerResult.program.getCompilerOptions();

            ts.forEach(compilerResult.program.getSourceFiles(), sourceFile => {
                if (Harness.Compiler.isDTS(sourceFile.fileName)) {
                    allInputFiles.unshift({ emittedFileName: sourceFile.fileName, code: sourceFile.text });
                }
                else if (ts.shouldEmitToOwnFile(sourceFile, compilerResult.program.getCompilerOptions())) {
                    let emitOutputFilePathWithoutExtension: string = undefined;
                    if (compilerOptions.outDir) {
                        let sourceFilePath = ts.getNormalizedAbsolutePath(sourceFile.fileName, compilerResult.program.getCurrentDirectory());
                        sourceFilePath = sourceFilePath.replace(compilerResult.program.getCommonSourceDirectory(), "");
                        emitOutputFilePathWithoutExtension = ts.removeFileExtension(ts.combinePaths(compilerOptions.outDir, sourceFilePath));
                    }
                    else {
                        emitOutputFilePathWithoutExtension = ts.removeFileExtension(sourceFile.fileName);
                    }

                    let outputDtsFileName = emitOutputFilePathWithoutExtension + ".d.ts";
                    allInputFiles.unshift(findOutpuDtsFile(outputDtsFileName));
                }
                else {
                    let outputDtsFileName = ts.removeFileExtension(compilerOptions.out) + ".d.ts";
                    let outputDtsFile = findOutpuDtsFile(outputDtsFileName);
                    if (!ts.contains(allInputFiles, outputDtsFile)) {
                        allInputFiles.unshift(outputDtsFile);
                    }
                }
            });

            return compileProjectFiles(compilerResult.moduleKind, getInputFiles, getSourceFileText, writeFile);

            function findOutpuDtsFile(fileName: string) {
                return ts.forEach(compilerResult.outputFiles, outputFile => outputFile.emittedFileName === fileName ? outputFile : undefined);
            }
            function getInputFiles() {
                return ts.map(allInputFiles, outputFile => outputFile.emittedFileName);
            }
            function getSourceFileText(fileName: string): string {
                return ts.forEach(allInputFiles, inputFile => inputFile.emittedFileName === fileName ? inputFile.code : undefined);
            }

            function writeFile(fileName: string, data: string, writeByteOrderMark: boolean) {
            }
        }

        function getErrorsBaseline(compilerResult: CompileProjectFilesResult) {
            let inputFiles = ts.map(ts.filter(compilerResult.program.getSourceFiles(),
                sourceFile => sourceFile.fileName !== "lib.d.ts"),
                sourceFile => {
                    return { unitName: sourceFile.fileName, content: sourceFile.text };
                });

            return Harness.Compiler.getErrorBaseline(inputFiles, compilerResult.errors);
        }

        let name = "Compiling project for " + testCase.scenario + ": testcase " + testCaseFileName;

        describe("Projects tests", () => {
            describe(name, () => {
                function verifyCompilerResults(moduleKind: ts.ModuleKind) {
                    let compilerResult: BatchCompileProjectTestCaseResult;

                    function getCompilerResolutionInfo() {
                        let resolutionInfo: ProjectRunnerTestCaseResolutionInfo = {
                            scenario: testCase.scenario,
                            projectRoot: testCase.projectRoot,
                            inputFiles: testCase.inputFiles,
                            out: testCase.out,
                            outDir: testCase.outDir,
                            sourceMap: testCase.sourceMap,
                            mapRoot: testCase.mapRoot,
                            resolveMapRoot: testCase.resolveMapRoot,
                            sourceRoot: testCase.sourceRoot,
                            resolveSourceRoot: testCase.resolveSourceRoot,
                            declaration: testCase.declaration,
                            baselineCheck: testCase.baselineCheck,
                            runTest: testCase.runTest,
                            bug: testCase.bug,
                            rootDir: testCase.rootDir,
                            resolvedInputFiles: ts.map(compilerResult.program.getSourceFiles(), inputFile => inputFile.fileName),
                            emittedFiles: ts.map(compilerResult.outputFiles, outputFile => outputFile.emittedFileName)
                        };

                        return resolutionInfo;
                    }

                    it(name + ": " + moduleNameToString(moduleKind) , () => {
                        // Compile using node
                        compilerResult = batchCompilerProjectTestCase(moduleKind);
                    });

                    it("Resolution information of (" + moduleNameToString(moduleKind) + "): " + testCaseFileName, () => {
                        Harness.Baseline.runBaseline("Resolution information of (" + moduleNameToString(compilerResult.moduleKind) + "): " + testCaseFileName, getBaselineFolder(compilerResult.moduleKind) + testCaseJustName + ".json", () => {
                            return JSON.stringify(getCompilerResolutionInfo(), undefined, "    ");
                        });
                    });


                    it("Errors for (" + moduleNameToString(moduleKind) + "): " + testCaseFileName, () => {
                        if (compilerResult.errors.length) {
                            Harness.Baseline.runBaseline("Errors for (" + moduleNameToString(compilerResult.moduleKind) + "): " + testCaseFileName, getBaselineFolder(compilerResult.moduleKind) + testCaseJustName + ".errors.txt", () => {
                                return getErrorsBaseline(compilerResult);
                            });
                        }
                    });


                    it("Baseline of emitted result (" + moduleNameToString(moduleKind) + "): " + testCaseFileName, () => {
                        if (testCase.baselineCheck) {
                            ts.forEach(compilerResult.outputFiles, outputFile => {

                                Harness.Baseline.runBaseline("Baseline of emitted result (" + moduleNameToString(compilerResult.moduleKind) + "): " + testCaseFileName, getBaselineFolder(compilerResult.moduleKind) + outputFile.fileName, () => {
                                    try {
                                        return ts.sys.readFile(getProjectOutputFolder(outputFile.fileName, compilerResult.moduleKind));
                                    }
                                    catch (e) {
                                        return undefined;
                                    }
                                });
                            });
                        }
                    });


                    it("SourceMapRecord for (" + moduleNameToString(moduleKind) + "): " + testCaseFileName, () => {
                        if (compilerResult.sourceMapData) {
                            Harness.Baseline.runBaseline("SourceMapRecord for (" + moduleNameToString(compilerResult.moduleKind) + "): " + testCaseFileName, getBaselineFolder(compilerResult.moduleKind) + testCaseJustName + ".sourcemap.txt", () => {
                                return Harness.SourceMapRecoder.getSourceMapRecord(compilerResult.sourceMapData, compilerResult.program,
                                    ts.filter(compilerResult.outputFiles, outputFile => Harness.Compiler.isJS(outputFile.emittedFileName)));
                            });
                        }
                    });

                    // Verify that all the generated .d.ts files compile

                    it("Errors in generated Dts files for (" + moduleNameToString(moduleKind) + "): " + testCaseFileName, () => {
                        if (!compilerResult.errors.length && testCase.declaration) {
                            let dTsCompileResult = compileCompileDTsFiles(compilerResult);
                            if (dTsCompileResult.errors.length) {
                                Harness.Baseline.runBaseline("Errors in generated Dts files for (" + moduleNameToString(compilerResult.moduleKind) + "): " + testCaseFileName, getBaselineFolder(compilerResult.moduleKind) + testCaseJustName + ".dts.errors.txt", () => {
                                    return getErrorsBaseline(dTsCompileResult);
                                });
                            }
                        }
                    });
                    after(() => {
                        compilerResult = undefined;
                    });
                }

                verifyCompilerResults(ts.ModuleKind.CommonJS);
                verifyCompilerResults(ts.ModuleKind.AMD);

                after(() => {
                    // Mocha holds onto the closure environment of the describe callback even after the test is done.
                    // Therefore we have to clean out large objects after the test is done.
                    testCase = undefined;
                    testFileText = undefined;
                    testCaseJustName = undefined;
                });
            });
        });
    }
}
