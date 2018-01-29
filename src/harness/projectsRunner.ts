/// <reference path="harness.ts" />
/// <reference path="runnerbase.ts" />
/// <reference path="./vpath.ts" />
/// <reference path="./documents.ts" />
/// <reference path="./compiler.ts" />
/// <reference path="./vfsutils.ts" />

namespace project {
    // Test case is json of below type in tests/cases/project/
    interface ProjectRunnerTestCase {
        scenario: string;
        projectRoot: string; // project where it lives - this also is the current directory when compiling
        inputFiles: ReadonlyArray<string>; // list of input files to be given to program
        resolveMapRoot?: boolean; // should we resolve this map root and give compiler the absolute disk path as map root?
        resolveSourceRoot?: boolean; // should we resolve this source root and give compiler the absolute disk path as map root?
        baselineCheck?: boolean; // Verify the baselines of output files, if this is false, we will write to output to the disk but there is no verification of baselines
        runTest?: boolean; // Run the resulting test
        bug?: string; // If there is any bug associated with this test case
    }

    interface ProjectRunnerTestCaseResolutionInfo extends ProjectRunnerTestCase {
        // Apart from actual test case the results of the resolution
        resolvedInputFiles: ReadonlyArray<string>; // List of files that were asked to read by compiler
        emittedFiles: ReadonlyArray<string>; // List of files that were emitted by the compiler
    }

    interface CompileProjectFilesResult {
        configFileSourceFiles: ReadonlyArray<ts.SourceFile>;
        moduleKind: ts.ModuleKind;
        program?: ts.Program;
        compilerOptions?: ts.CompilerOptions;
        errors: ReadonlyArray<ts.Diagnostic>;
        sourceMapData?: ReadonlyArray<ts.SourceMapData>;
    }

    interface BatchCompileProjectTestCaseResult extends CompileProjectFilesResult {
        outputFiles?: ReadonlyArray<documents.TextDocument>;
    }

    export class ProjectRunner extends RunnerBase {
        public enumerateTestFiles() {
            return this.enumerateFiles("tests/cases/project", /\.json$/, { recursive: true });
        }

        public kind(): TestRunnerKind {
            return "project";
        }

        public initializeTests() {
            describe("projects tests", () => {
                const tests = this.tests.length === 0 ? this.enumerateTestFiles() : this.tests;
                for (const test of tests) {
                    this.runProjectTestCase(test);
                }
            });
        }

        private runProjectTestCase(testCaseFileName: string) {
            for (const { name, payload } of ProjectTestCase.getConfigurations(testCaseFileName)) {
                describe("Compiling project for " + payload.testCase.scenario + ": testcase " + testCaseFileName + (name ? ` (${name})` : ``), () => {
                    let projectTestCase: ProjectTestCase | undefined;
                    before(() => { projectTestCase = new ProjectTestCase(testCaseFileName, payload); });
                    it(`Correct module resolution tracing for ${testCaseFileName}`, () => projectTestCase && projectTestCase.verifyResolution());
                    it(`Correct errors for ${testCaseFileName}`, () => projectTestCase && projectTestCase.verifyDiagnostics());
                    it(`Correct JS output for ${testCaseFileName}`, () => projectTestCase && projectTestCase.verifyJavaScriptOutput());
                    // NOTE: This check was commented out in previous code. Leaving this here to eventually be restored if needed.
                    // it(`Correct sourcemap content for ${testCaseFileName}`, () => projectTestCase && projectTestCase.verifySourceMapRecord());
                    it(`Correct declarations for ${testCaseFileName}`, () => projectTestCase && projectTestCase.verifyDeclarations());
                    after(() => { projectTestCase = undefined; });
                });
            }
        }
    }

    class ProjectCompilerHost extends compiler.CompilerHost {
        private _testCase: ProjectRunnerTestCase & ts.CompilerOptions;
        private _projectParseConfigHost: ProjectParseConfigHost;

        constructor(vfs: vfs.FileSystem, compilerOptions: ts.CompilerOptions, _testCaseJustName: string, testCase: ProjectRunnerTestCase & ts.CompilerOptions, _moduleKind: ts.ModuleKind) {
            super(vfs, compilerOptions);
            this._testCase = testCase;
        }

        public get parseConfigHost(): compiler.ParseConfigHost {
            return this._projectParseConfigHost || (this._projectParseConfigHost = new ProjectParseConfigHost(this.vfs, this._testCase));
        }

        public getDefaultLibFileName(_options: ts.CompilerOptions) {
            return vpath.resolve(this.getDefaultLibLocation(), "lib.es5.d.ts");
        }
    }

    class ProjectParseConfigHost extends compiler.ParseConfigHost {
        private _testCase: ProjectRunnerTestCase & ts.CompilerOptions;

        constructor(vfs: vfs.FileSystem, testCase: ProjectRunnerTestCase & ts.CompilerOptions) {
            super(vfs);
            this._testCase = testCase;
        }

        public readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
            const result = super.readDirectory(path, extensions, excludes, includes, depth);
            const projectRoot = vpath.resolve(vfsutils.srcFolder, this._testCase.projectRoot);
            return result.map(item => vpath.relative(
                projectRoot,
                vpath.resolve(projectRoot, item),
                this.vfs.ignoreCase
            ));
        }
    }

    interface ProjectTestConfiguration {
        name: string;
        payload: ProjectTestPayload;
    }

    interface ProjectTestPayload {
        testCase: ProjectRunnerTestCase & ts.CompilerOptions;
        moduleKind: ts.ModuleKind;
        vfs: vfs.FileSystem;
    }

    class ProjectTestCase {
        private testCase: ProjectRunnerTestCase & ts.CompilerOptions;
        private testCaseJustName: string;
        private vfs: vfs.FileSystem;
        private compilerOptions: ts.CompilerOptions;
        private compilerResult: BatchCompileProjectTestCaseResult;

        constructor(testCaseFileName: string, { testCase, moduleKind, vfs }: ProjectTestPayload) {
            this.testCase = testCase;
            this.testCaseJustName = testCaseFileName.replace(/^.*[\\\/]/, "").replace(/\.json/, "");
            this.compilerOptions = createCompilerOptions(testCase, moduleKind);
            this.vfs = vfs.shadow();

            let configFileName: string;
            let inputFiles = testCase.inputFiles;
            if (this.compilerOptions.project) {
                // Parse project
                configFileName = ts.normalizePath(ts.combinePaths(this.compilerOptions.project, "tsconfig.json"));
                assert(!inputFiles || inputFiles.length === 0, "cannot specify input files and project option together");
            }
            else if (!inputFiles || inputFiles.length === 0) {
                configFileName = ts.findConfigFile("", path => vfsutils.fileExists(this.vfs, path));
            }

            let errors: ts.Diagnostic[];
            const configFileSourceFiles: ts.SourceFile[] = [];
            if (configFileName) {
                const result = ts.readJsonConfigFile(configFileName, path => vfsutils.readFile(this.vfs, path));
                configFileSourceFiles.push(result);
                const configParseHost = new ProjectParseConfigHost(this.vfs, this.testCase);
                const configParseResult = ts.parseJsonSourceFileConfigFileContent(result, configParseHost, ts.getDirectoryPath(configFileName), this.compilerOptions);
                inputFiles = configParseResult.fileNames;
                this.compilerOptions = configParseResult.options;
                errors = result.parseDiagnostics.concat(configParseResult.errors);
            }

            const compilerHost = new ProjectCompilerHost(this.vfs, this.compilerOptions, this.testCaseJustName, this.testCase, moduleKind);
            const projectCompilerResult = this.compileProjectFiles(moduleKind, configFileSourceFiles, () => inputFiles, compilerHost, this.compilerOptions);

            this.compilerResult = {
                configFileSourceFiles,
                moduleKind,
                program: projectCompilerResult.program,
                compilerOptions: this.compilerOptions,
                sourceMapData: projectCompilerResult.sourceMapData,
                outputFiles: compilerHost.outputs,
                errors: errors ? ts.concatenate(errors, projectCompilerResult.errors) : projectCompilerResult.errors,
            };
        }

        public static getConfigurations(testCaseFileName: string): ProjectTestConfiguration[] {
            let testCase: ProjectRunnerTestCase & ts.CompilerOptions;

            let testFileText: string;
            try {
                testFileText = Harness.IO.readFile(testCaseFileName);
            }
            catch (e) {
                assert(false, "Unable to open testcase file: " + testCaseFileName + ": " + e.message);
            }

            try {
                testCase = <ProjectRunnerTestCase & ts.CompilerOptions>JSON.parse(testFileText);
            }
            catch (e) {
                assert(false, "Testcase: " + testCaseFileName + " does not contain valid json format: " + e.message);
            }

            const fs = vfsutils.createFromFileSystem(/*useCaseSensitiveFileNames*/ true);
            fs.mountSync(vpath.resolve(__dirname, "../../tests"), vpath.combine(vfsutils.srcFolder, "tests"), vfsutils.createResolver(Harness.IO));
            fs.mkdirpSync(vpath.combine(vfsutils.srcFolder, testCase.projectRoot));
            fs.chdir(vpath.combine(vfsutils.srcFolder, testCase.projectRoot));
            fs.makeReadonly();

            return [
                { name: `@module: commonjs`, payload: { testCase, moduleKind: ts.ModuleKind.CommonJS, vfs: fs } },
                { name: `@module: amd`, payload: { testCase, moduleKind: ts.ModuleKind.AMD, vfs: fs } }
            ];
        }

        public verifyResolution() {
            const cwd = this.vfs.cwd();
            const ignoreCase = this.vfs.ignoreCase;
            const resolutionInfo: ProjectRunnerTestCaseResolutionInfo & ts.CompilerOptions = JSON.parse(JSON.stringify(this.testCase));
            resolutionInfo.resolvedInputFiles = this.compilerResult.program.getSourceFiles()
                .map(input => utils.removeTestPathPrefixes(vpath.isAbsolute(input.fileName) ? vpath.relative(cwd, input.fileName, ignoreCase) : input.fileName));

            resolutionInfo.emittedFiles = this.compilerResult.outputFiles
                .map(output => output.meta.get("fileName") || output.file)
                .map(output => utils.removeTestPathPrefixes(vpath.isAbsolute(output) ? vpath.relative(cwd, output, ignoreCase) : output));

            const content = JSON.stringify(resolutionInfo, undefined, "    ");

            // TODO(rbuckton): This patches the baseline to replace lib.es5.d.ts with lib.d.ts.
            // This is only to make the PR for this change easier to read. A follow-up PR will
            // revert this change and accept the new baselines.
            // See https://github.com/Microsoft/TypeScript/pull/20763#issuecomment-352553264
            const patchedContent = content.replace(/lib\.es5\.d\.ts/g, "lib.d.ts");
            Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + this.testCaseJustName + ".json", () => patchedContent);
        }

        public verifyDiagnostics() {
            if (this.compilerResult.errors.length) {
                Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + this.testCaseJustName + ".errors.txt", () => {
                    return getErrorsBaseline(this.compilerResult);
                });
            }
        }

        public verifyJavaScriptOutput() {
            if (this.testCase.baselineCheck) {
                const errs: Error[] = [];
                let nonSubfolderDiskFiles = 0;
                for (const output of this.compilerResult.outputFiles) {
                    try {
                        // convert file name to rooted name
                        // if filename is not rooted - concat it with project root and then expand project root relative to current directory
                        const fileName = output.meta.get("fileName") || output.file;
                        const diskFileName = vpath.isAbsolute(fileName) ? fileName : vpath.resolve(this.vfs.cwd(), fileName);

                        // compute file name relative to current directory (expanded project root)
                        let diskRelativeName = vpath.relative(this.vfs.cwd(), diskFileName, this.vfs.ignoreCase);
                        if (vpath.isAbsolute(diskRelativeName) || diskRelativeName.startsWith("../")) {
                            // If the generated output file resides in the parent folder or is rooted path,
                            // we need to instead create files that can live in the project reference folder
                            // but make sure extension of these files matches with the fileName the compiler asked to write
                            diskRelativeName = `diskFile${nonSubfolderDiskFiles}${vpath.extname(fileName, [".js.map", ".js", ".d.ts"], this.vfs.ignoreCase)}`;
                            nonSubfolderDiskFiles++;
                        }

                        const content = output.text.replace(/\/\/?\.src\//g, "/");
                        Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + diskRelativeName, () => content);
                    }
                    catch (e) {
                        errs.push(e);
                    }
                }

                if (errs.length) {
                    throw Error(errs.join("\n     "));
                }
            }
        }

        public verifySourceMapRecord() {
            // NOTE: This check was commented out in previous code. Leaving this here to eventually be restored if needed.
            // if (compilerResult.sourceMapData) {
            //     Harness.Baseline.runBaseline(getBaselineFolder(compilerResult.moduleKind) + testCaseJustName + ".sourcemap.txt", () => {
            //         return Harness.SourceMapRecorder.getSourceMapRecord(compilerResult.sourceMapData, compilerResult.program,
            //             ts.filter(compilerResult.outputFiles, outputFile => Harness.Compiler.isJS(outputFile.emittedFileName)));
            //     });
            // }
        }

        public verifyDeclarations() {
            if (!this.compilerResult.errors.length && this.testCase.declaration) {
                const dTsCompileResult = this.compileDeclarations(this.compilerResult);
                if (dTsCompileResult && dTsCompileResult.errors.length) {
                    Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + this.testCaseJustName + ".dts.errors.txt", () => {
                        return getErrorsBaseline(dTsCompileResult);
                    });
                }
            }
        }

        // Project baselines verified go in project/testCaseName/moduleKind/
        private getBaselineFolder(moduleKind: ts.ModuleKind) {
            return "project/" + this.testCaseJustName + "/" + moduleNameToString(moduleKind) + "/";
        }

        private cleanProjectUrl(url: string) {
            let diskProjectPath = ts.normalizeSlashes(Harness.IO.resolvePath(this.testCase.projectRoot));
            let projectRootUrl = "file:///" + diskProjectPath;
            const normalizedProjectRoot = ts.normalizeSlashes(this.testCase.projectRoot);
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
                    if (url.charCodeAt(0) !== ts.CharacterCodes.slash) {
                        url = "/" + url;
                    }
                }
            }

            return url;
        }

        private compileProjectFiles(moduleKind: ts.ModuleKind, configFileSourceFiles: ReadonlyArray<ts.SourceFile>,
            getInputFiles: () => ReadonlyArray<string>,
            compilerHost: ts.CompilerHost,
            compilerOptions: ts.CompilerOptions): CompileProjectFilesResult {

            const program = ts.createProgram(getInputFiles(), compilerOptions, compilerHost);
            const errors = ts.getPreEmitDiagnostics(program);

            const emitResult = program.emit();
            ts.addRange(errors, emitResult.diagnostics);
            const sourceMapData = emitResult.sourceMaps;

            // Clean up source map data that will be used in baselining
            if (sourceMapData) {
                for (const data of sourceMapData) {
                    for (let j = 0; j < data.sourceMapSources.length; j++) {
                        data.sourceMapSources[j] = this.cleanProjectUrl(data.sourceMapSources[j]);
                    }
                    data.jsSourceMappingURL = this.cleanProjectUrl(data.jsSourceMappingURL);
                    data.sourceMapSourceRoot = this.cleanProjectUrl(data.sourceMapSourceRoot);
                }
            }

            return {
                configFileSourceFiles,
                moduleKind,
                program,
                errors,
                sourceMapData
            };
        }

        private compileDeclarations(compilerResult: BatchCompileProjectTestCaseResult) {
            if (!compilerResult.program) {
                return;
            }

            const compilerOptions = compilerResult.program.getCompilerOptions();
            const allInputFiles: documents.TextDocument[] = [];
            const rootFiles: string[] = [];
            ts.forEach(compilerResult.program.getSourceFiles(), sourceFile => {
                if (sourceFile.isDeclarationFile) {
                    if (!vfsutils.isDefaultLibrary(sourceFile.fileName)) {
                        allInputFiles.unshift(new documents.TextDocument(sourceFile.fileName, sourceFile.text));
                    }
                    rootFiles.unshift(sourceFile.fileName);
                }
                else if (!(compilerOptions.outFile || compilerOptions.out)) {
                    let emitOutputFilePathWithoutExtension: string = undefined;
                    if (compilerOptions.outDir) {
                        let sourceFilePath = ts.getNormalizedAbsolutePath(sourceFile.fileName, compilerResult.program.getCurrentDirectory());
                        sourceFilePath = sourceFilePath.replace(compilerResult.program.getCommonSourceDirectory(), "");
                        emitOutputFilePathWithoutExtension = ts.removeFileExtension(ts.combinePaths(compilerOptions.outDir, sourceFilePath));
                    }
                    else {
                        emitOutputFilePathWithoutExtension = ts.removeFileExtension(sourceFile.fileName);
                    }

                    const outputDtsFileName = emitOutputFilePathWithoutExtension + ts.Extension.Dts;
                    const file = findOutputDtsFile(outputDtsFileName);
                    if (file) {
                        allInputFiles.unshift(file);
                        rootFiles.unshift(file.meta.get("fileName") || file.file);
                    }
                }
                else {
                    const outputDtsFileName = ts.removeFileExtension(compilerOptions.outFile || compilerOptions.out) + ts.Extension.Dts;
                    const outputDtsFile = findOutputDtsFile(outputDtsFileName);
                    if (!ts.contains(allInputFiles, outputDtsFile)) {
                        allInputFiles.unshift(outputDtsFile);
                        rootFiles.unshift(outputDtsFile.meta.get("fileName") || outputDtsFile.file);
                    }
                }
            });

            const _vfs = vfsutils.createFromDocuments(/*useCaseSensitiveFileNames*/ true, allInputFiles, {
                currentDirectory: vpath.combine(vfsutils.srcFolder, this.testCase.projectRoot)
            });

            // Dont allow config files since we are compiling existing source options
            const compilerHost = new ProjectCompilerHost(_vfs, compilerResult.compilerOptions, this.testCaseJustName, this.testCase, compilerResult.moduleKind);
            return this.compileProjectFiles(compilerResult.moduleKind, compilerResult.configFileSourceFiles, () => rootFiles, compilerHost, compilerResult.compilerOptions);

            function findOutputDtsFile(fileName: string) {
                return ts.forEach(compilerResult.outputFiles, outputFile => outputFile.meta.get("fileName") === fileName ? outputFile : undefined);
            }
        }
    }

    function moduleNameToString(moduleKind: ts.ModuleKind) {
        return moduleKind === ts.ModuleKind.AMD
            ? "amd"
            : moduleKind === ts.ModuleKind.CommonJS
            ? "node"
            : "none";
    }

    function getErrorsBaseline(compilerResult: CompileProjectFilesResult) {
        const inputSourceFiles = compilerResult.configFileSourceFiles.slice();
        if (compilerResult.program) {
            for (const sourceFile of compilerResult.program.getSourceFiles()) {
                if (!Harness.isDefaultLibraryFile(sourceFile.fileName)) {
                    inputSourceFiles.push(sourceFile);
                }
            }
        }

        const inputFiles = inputSourceFiles.map<Harness.Compiler.TestFile>(sourceFile => ({
            unitName: ts.isRootedDiskPath(sourceFile.fileName) ?
                RunnerBase.removeFullPaths(sourceFile.fileName) :
                sourceFile.fileName,
            content: sourceFile.text
        }));

        return Harness.Compiler.getErrorBaseline(inputFiles, compilerResult.errors);
    }

    function createCompilerOptions(testCase: ProjectRunnerTestCase & ts.CompilerOptions, moduleKind: ts.ModuleKind) {
        // Set the special options that depend on other testcase options
        const compilerOptions: ts.CompilerOptions = {
            noErrorTruncation: false,
            skipDefaultLibCheck: false,
            moduleResolution: ts.ModuleResolutionKind.Classic,
            module: moduleKind,
            mapRoot: testCase.resolveMapRoot && testCase.mapRoot
                ? vpath.resolve(vfsutils.srcFolder, testCase.mapRoot)
                : testCase.mapRoot,

            sourceRoot: testCase.resolveSourceRoot && testCase.sourceRoot
                ? vpath.resolve(vfsutils.srcFolder, testCase.sourceRoot)
                : testCase.sourceRoot
        };

        // Set the values specified using json
        const optionNameMap = ts.arrayToMap(ts.optionDeclarations, option => option.name);
        for (const name in testCase) {
            if (name !== "mapRoot" && name !== "sourceRoot") {
                const option = optionNameMap.get(name);
                if (option) {
                    const optType = option.type;
                    let value = <any>testCase[name];
                    if (!ts.isString(optType)) {
                        const key = value.toLowerCase();
                        const optTypeValue = optType.get(key);
                        if (optTypeValue) {
                            value = optTypeValue;
                        }
                    }
                    compilerOptions[option.name] = value;
                }
            }
        }

        return compilerOptions;
    }
}