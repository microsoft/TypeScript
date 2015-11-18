///<reference path="harness.ts" />
///<reference path="runnerbase.ts" />
/* tslint:disable:no-null */

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
            const testFiles = this.enumerateFiles("tests/cases/project", /\.json$/, { recursive: true });
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
            testFileText = Harness.IO.readFile(testCaseFileName);
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
            let diskProjectPath = ts.normalizeSlashes(Harness.IO.resolvePath(testCase.projectRoot));
            let projectRootUrl = "file:///" + diskProjectPath;
            const normalizedProjectRoot = ts.normalizeSlashes(testCase.projectRoot);
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
            return Harness.IO.resolvePath(testCase.projectRoot);
        }

        function compileProjectFiles(moduleKind: ts.ModuleKind, getInputFiles: () => string[],
            getSourceFileTextImpl: (fileName: string) => string,
            writeFile: (fileName: string, data: string, writeByteOrderMark: boolean) => void): CompileProjectFilesResult {

            const program = ts.createProgram(getInputFiles(), createCompilerOptions(), createCompilerHost());
            let errors = ts.getPreEmitDiagnostics(program);

            const emitResult = program.emit();
            errors = ts.concatenate(errors, emitResult.diagnostics);
            const sourceMapData = emitResult.sourceMaps;

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
                    outFile: testCase.out,
                    outDir: testCase.outDir,
                    mapRoot: testCase.resolveMapRoot && testCase.mapRoot ? Harness.IO.resolvePath(testCase.mapRoot) : testCase.mapRoot,
                    sourceRoot: testCase.resolveSourceRoot && testCase.sourceRoot ? Harness.IO.resolvePath(testCase.sourceRoot) : testCase.sourceRoot,
                    module: moduleKind,
                    moduleResolution: ts.ModuleResolutionKind.Classic, // currently all tests use classic module resolution kind, this will change in the future 
                    noResolve: testCase.noResolve,
                    rootDir: testCase.rootDir
                };
            }

            function getSourceFileText(fileName: string): string {
                const text = getSourceFileTextImpl(fileName);
                return text !== undefined ? text : getSourceFileTextImpl(ts.getNormalizedAbsolutePath(fileName, getCurrentDirectory()));
            }

            function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget): ts.SourceFile {
                let sourceFile: ts.SourceFile = undefined;
                if (fileName === Harness.Compiler.defaultLibFileName) {
                    sourceFile = languageVersion === ts.ScriptTarget.ES6 ? Harness.Compiler.defaultES6LibSourceFile : Harness.Compiler.defaultLibSourceFile;
                }
                else {
                    const text = getSourceFileText(fileName);
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
                    useCaseSensitiveFileNames: () => Harness.IO.useCaseSensitiveFileNames(),
                    getNewLine: () => Harness.IO.newLine(),
                    fileExists: fileName => fileName === Harness.Compiler.defaultLibFileName ||  getSourceFileText(fileName) !== undefined,
                    readFile: fileName => Harness.IO.readFile(fileName)
                };
            }
        }

        function batchCompilerProjectTestCase(moduleKind: ts.ModuleKind): BatchCompileProjectTestCaseResult {
            let nonSubfolderDiskFiles = 0;

            const outputFiles: BatchCompileProjectTestCaseEmittedFile[] = [];

            const projectCompilerResult = compileProjectFiles(moduleKind, () => testCase.inputFiles, getSourceFileText, writeFile);
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
                    text = Harness.IO.readFile(ts.isRootedDiskPath(fileName)
                        ? fileName
                        : ts.normalizeSlashes(testCase.projectRoot) + "/" + ts.normalizeSlashes(fileName));
                }
                catch (e) {
                    // text doesn't get defined.
                }
                return text;
            }

            function writeFile(fileName: string, data: string, writeByteOrderMark: boolean) {
                // convert file name to rooted name
                // if filename is not rooted - concat it with project root and then expand project root relative to current directory
                const diskFileName = ts.isRootedDiskPath(fileName)
                    ? fileName
                    : Harness.IO.resolvePath(ts.normalizeSlashes(testCase.projectRoot) + "/" + ts.normalizeSlashes(fileName));

                const currentDirectory = getCurrentDirectory();
                // compute file name relative to current directory (expanded project root)
                let diskRelativeName = ts.getRelativePathToDirectoryOrUrl(currentDirectory, diskFileName, currentDirectory, Harness.Compiler.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
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
                    const indexOfSourceMapUrl = data.lastIndexOf("//# sourceMappingURL=");
                    if (indexOfSourceMapUrl !== -1) {
                        data = data.substring(0, indexOfSourceMapUrl + 21) + cleanProjectUrl(data.substring(indexOfSourceMapUrl + 21));
                    }
                }
                else if (Harness.Compiler.isJSMap(fileName)) {
                    // Make sure sources list is cleaned
                    const sourceMapData = JSON.parse(data);
                    for (let i = 0; i < sourceMapData.sources.length; i++) {
                        sourceMapData.sources[i] = cleanProjectUrl(sourceMapData.sources[i]);
                    }
                    sourceMapData.sourceRoot = cleanProjectUrl(sourceMapData.sourceRoot);
                    data = JSON.stringify(sourceMapData);
                }

                const outputFilePath = getProjectOutputFolder(diskRelativeName, moduleKind);
                // Actual writing of file as in tc.ts
                function ensureDirectoryStructure(directoryname: string) {
                    if (directoryname) {
                        if (!Harness.IO.directoryExists(directoryname)) {
                            ensureDirectoryStructure(ts.getDirectoryPath(directoryname));
                            Harness.IO.createDirectory(directoryname);
                        }
                    }
                }
                ensureDirectoryStructure(ts.getDirectoryPath(ts.normalizePath(outputFilePath)));
                Harness.IO.writeFile(outputFilePath, data);

                outputFiles.push({ emittedFileName: fileName, code: data, fileName: diskRelativeName, writeByteOrderMark: writeByteOrderMark });
            }
        }

        function compileCompileDTsFiles(compilerResult: BatchCompileProjectTestCaseResult) {
            const allInputFiles: { emittedFileName: string; code: string; }[] = [];
            const compilerOptions = compilerResult.program.getCompilerOptions();

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

                    const outputDtsFileName = emitOutputFilePathWithoutExtension + ".d.ts";
                    const file = findOutpuDtsFile(outputDtsFileName);
                    if (file) {
                        allInputFiles.unshift(file);
                    }
                }
                else {
                    const outputDtsFileName = ts.removeFileExtension(compilerOptions.outFile || compilerOptions.out) + ".d.ts";
                    const outputDtsFile = findOutpuDtsFile(outputDtsFileName);
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
                for (const inputFile of allInputFiles) {
                    const isMatchingFile = ts.isRootedDiskPath(fileName)
                        ? ts.getNormalizedAbsolutePath(inputFile.emittedFileName, getCurrentDirectory()) === fileName
                        : inputFile.emittedFileName === fileName;

                    if (isMatchingFile) {
                        return inputFile.code;
                    }
                }
                return undefined;
            }

            function writeFile(fileName: string, data: string, writeByteOrderMark: boolean) {
            }
        }

        function getErrorsBaseline(compilerResult: CompileProjectFilesResult) {
            const inputFiles = ts.map(ts.filter(compilerResult.program.getSourceFiles(),
                sourceFile => sourceFile.fileName !== "lib.d.ts"),
                sourceFile => {
                    return { unitName: RunnerBase.removeFullPaths(sourceFile.fileName), content: sourceFile.text, };
                });

            return Harness.Compiler.getErrorBaseline(inputFiles, compilerResult.errors);
        }

        const name = "Compiling project for " + testCase.scenario + ": testcase " + testCaseFileName;

        describe("Projects tests", () => {
            describe(name, () => {
                function verifyCompilerResults(moduleKind: ts.ModuleKind) {
                    let compilerResult: BatchCompileProjectTestCaseResult;

                    function getCompilerResolutionInfo() {
                        const resolutionInfo: ProjectRunnerTestCaseResolutionInfo = {
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
                            resolvedInputFiles: ts.map(compilerResult.program.getSourceFiles(), inputFile => {
                                return ts.convertToRelativePath(inputFile.fileName, getCurrentDirectory(), path => Harness.Compiler.getCanonicalFileName(path));
                            }),
                            emittedFiles: ts.map(compilerResult.outputFiles, outputFile => {
                                return ts.convertToRelativePath(outputFile.emittedFileName, getCurrentDirectory(), path => Harness.Compiler.getCanonicalFileName(path));
                            })
                        };

                        return resolutionInfo;
                    }

                    it(name + ": " + moduleNameToString(moduleKind), () => {
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
                                        return Harness.IO.readFile(getProjectOutputFolder(outputFile.fileName, compilerResult.moduleKind));
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
                            const dTsCompileResult = compileCompileDTsFiles(compilerResult);
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
