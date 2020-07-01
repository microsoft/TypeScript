import { SourceFile, ModuleKind, Program, CompilerOptions, Diagnostic, SourceMapEmitResult, CharacterCodes, CompilerHost, Extension, ModuleResolutionKind, NewLineKind } from "../compiler/types";
import { normalizePath, combinePaths, getDirectoryPath, normalizeSlashes, getNormalizedAbsolutePath, isRootedDiskPath } from "../compiler/path";
import { assert } from "console";
import { findConfigFile, createProgram, getPreEmitDiagnostics } from "../compiler/program";
import { readJsonConfigFile, parseJsonSourceFileConfigFileContent, optionDeclarations } from "../../built/local/compiler";
import { concatenate, forEach, contains, arrayToMap } from "../compiler/core";
import { removeFileExtension } from "../compiler/utilities";
import { isString } from "util";

    // Test case is json of below type in tests/cases/project/
    interface ProjectRunnerTestCase {
        scenario: string;
        projectRoot: string; // project where it lives - this also is the current directory when compiling
        inputFiles: readonly string[]; // list of input files to be given to program
        resolveMapRoot?: boolean; // should we resolve this map root and give compiler the absolute disk path as map root?
        resolveSourceRoot?: boolean; // should we resolve this source root and give compiler the absolute disk path as map root?
        baselineCheck?: boolean; // Verify the baselines of output files, if this is false, we will write to output to the disk but there is no verification of baselines
        runTest?: boolean; // Run the resulting test
        bug?: string; // If there is any bug associated with this test case
    }

    interface ProjectRunnerTestCaseResolutionInfo extends ProjectRunnerTestCase {
        // Apart from actual test case the results of the resolution
        resolvedInputFiles: readonly string[]; // List of files that were asked to read by compiler
        emittedFiles: readonly string[]; // List of files that were emitted by the compiler
    }

    interface CompileProjectFilesResult {
        configFileSourceFiles: readonly SourceFile[];
        moduleKind: ModuleKind;
        program?: Program;
        compilerOptions?: CompilerOptions;
        errors: readonly Diagnostic[];
        sourceMapData?: readonly SourceMapEmitResult[];
    }

    interface BatchCompileProjectTestCaseResult extends CompileProjectFilesResult {
        outputFiles?: readonly documents.TextDocument[];
    }

    export class ProjectRunner extends Harness.RunnerBase {
        public enumerateTestFiles() {
            const all = this.enumerateFiles("tests/cases/project", /\.json$/, { recursive: true });
            if (Harness.shards === 1) {
                return all;
            }
            return all.filter((_val, idx) => idx % Harness.shards === (Harness.shardId - 1));
        }

        public kind(): Harness.TestRunnerKind {
            return "project";
        }

        public initializeTests() {
            describe("projects tests", () => {
                const tests = this.tests.length === 0 ? this.enumerateTestFiles() : this.tests;
                for (const test of tests) {
                    this.runProjectTestCase(typeof test === "string" ? test : test.file);
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

    class ProjectCompilerHost extends fakes.CompilerHost {
        private _testCase: ProjectRunnerTestCase & CompilerOptions;
        private _projectParseConfigHost: ProjectParseConfigHost | undefined;

        constructor(sys: fakes.System | vfs.FileSystem, compilerOptions: CompilerOptions, _testCaseJustName: string, testCase: ProjectRunnerTestCase & CompilerOptions, _moduleKind: ModuleKind) {
            super(sys, compilerOptions);
            this._testCase = testCase;
        }

        public get parseConfigHost(): fakes.ParseConfigHost {
            return this._projectParseConfigHost || (this._projectParseConfigHost = new ProjectParseConfigHost(this.sys, this._testCase));
        }

        public getDefaultLibFileName(_options: CompilerOptions) {
            return vpath.resolve(this.getDefaultLibLocation(), "lib.es5.d.ts");
        }
    }

    class ProjectParseConfigHost extends fakes.ParseConfigHost {
        private _testCase: ProjectRunnerTestCase & CompilerOptions;

        constructor(sys: fakes.System, testCase: ProjectRunnerTestCase & CompilerOptions) {
            super(sys);
            this._testCase = testCase;
        }

        public readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
            const result = super.readDirectory(path, extensions, excludes, includes, depth);
            const projectRoot = vpath.resolve(vfs.srcFolder, this._testCase.projectRoot);
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
        testCase: ProjectRunnerTestCase & CompilerOptions;
        moduleKind: ModuleKind;
        vfs: vfs.FileSystem;
    }

    class ProjectTestCase {
        private testCase: ProjectRunnerTestCase & CompilerOptions;
        private testCaseJustName: string;
        private sys: fakes.System;
        private compilerOptions: CompilerOptions;
        private compilerResult: BatchCompileProjectTestCaseResult;

        constructor(testCaseFileName: string, { testCase, moduleKind, vfs }: ProjectTestPayload) {
            this.testCase = testCase;
            this.testCaseJustName = testCaseFileName.replace(/^.*[\\\/]/, "").replace(/\.json/, "");
            this.compilerOptions = createCompilerOptions(testCase, moduleKind);
            this.sys = new fakes.System(vfs);

            let configFileName: string | undefined;
            let inputFiles = testCase.inputFiles;
            if (this.compilerOptions.project) {
                // Parse project
                configFileName = normalizePath(combinePaths(this.compilerOptions.project, "tsconfig.json"));
                assert(!inputFiles || inputFiles.length === 0, "cannot specify input files and project option together");
            }
            else if (!inputFiles || inputFiles.length === 0) {
                configFileName = findConfigFile("", path => this.sys.fileExists(path));
            }

            let errors: Diagnostic[] | undefined;
            const configFileSourceFiles: SourceFile[] = [];
            if (configFileName) {
                const result = readJsonConfigFile(configFileName, path => this.sys.readFile(path));
                configFileSourceFiles.push(result);
                const configParseHost = new ProjectParseConfigHost(this.sys, this.testCase);
                const configParseResult = parseJsonSourceFileConfigFileContent(result, configParseHost, getDirectoryPath(configFileName), this.compilerOptions);
                inputFiles = configParseResult.fileNames;
                this.compilerOptions = configParseResult.options;
                errors = [...result.parseDiagnostics, ...configParseResult.errors];
            }

            const compilerHost = new ProjectCompilerHost(this.sys, this.compilerOptions, this.testCaseJustName, this.testCase, moduleKind);
            const projectCompilerResult = this.compileProjectFiles(moduleKind, configFileSourceFiles, () => inputFiles, compilerHost, this.compilerOptions);

            this.compilerResult = {
                configFileSourceFiles,
                moduleKind,
                program: projectCompilerResult.program,
                compilerOptions: this.compilerOptions,
                sourceMapData: projectCompilerResult.sourceMapData,
                outputFiles: compilerHost.outputs,
                errors: errors ? concatenate(errors, projectCompilerResult.errors) : projectCompilerResult.errors,
            };
        }

        private get vfs() {
            return this.sys.vfs;
        }

        public static getConfigurations(testCaseFileName: string): ProjectTestConfiguration[] {
            let testCase: ProjectRunnerTestCase & CompilerOptions;

            let testFileText: string | undefined;
            try {
                testFileText = Harness.IO.readFile(testCaseFileName);
            }
            catch (e) {
                assert(false, "Unable to open testcase file: " + testCaseFileName + ": " + e.message);
            }

            try {
                testCase = <ProjectRunnerTestCase & CompilerOptions>JSON.parse(testFileText!);
            }
            catch (e) {
                throw assert(false, "Testcase: " + testCaseFileName + " does not contain valid json format: " + e.message);
            }

            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false);
            fs.mountSync(vpath.resolve(Harness.IO.getWorkspaceRoot(), "tests"), vpath.combine(vfs.srcFolder, "tests"), vfs.createResolver(Harness.IO));
            fs.mkdirpSync(vpath.combine(vfs.srcFolder, testCase.projectRoot));
            fs.chdir(vpath.combine(vfs.srcFolder, testCase.projectRoot));
            fs.makeReadonly();

            return [
                { name: `@module: commonjs`, payload: { testCase, moduleKind: ModuleKind.CommonJS, vfs: fs } },
                { name: `@module: amd`, payload: { testCase, moduleKind: ModuleKind.AMD, vfs: fs } }
            ];
        }

        public verifyResolution() {
            const cwd = this.vfs.cwd();
            const ignoreCase = this.vfs.ignoreCase;
            const resolutionInfo: ProjectRunnerTestCaseResolutionInfo & CompilerOptions = JSON.parse(JSON.stringify(this.testCase));
            resolutionInfo.resolvedInputFiles = this.compilerResult.program!.getSourceFiles()
                .map(({ fileName: input }) =>
                    vpath.beneath(vfs.builtFolder, input, this.vfs.ignoreCase) || vpath.beneath(vfs.testLibFolder, input, this.vfs.ignoreCase) ? Utils.removeTestPathPrefixes(input) :
                    vpath.isAbsolute(input) ? vpath.relative(cwd, input, ignoreCase) :
                    input);

            resolutionInfo.emittedFiles = this.compilerResult.outputFiles!
                .map(output => output.meta.get("fileName") || output.file)
                .map(output => Utils.removeTestPathPrefixes(vpath.isAbsolute(output) ? vpath.relative(cwd, output, ignoreCase) : output));

            const content = JSON.stringify(resolutionInfo, undefined, "    ");
            Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + this.testCaseJustName + ".json", content);
        }

        public verifyDiagnostics() {
            if (this.compilerResult.errors.length) {
                Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + this.testCaseJustName + ".errors.txt", getErrorsBaseline(this.compilerResult));
            }
        }

        public verifyJavaScriptOutput() {
            if (this.testCase.baselineCheck) {
                const errs: Error[] = [];
                let nonSubfolderDiskFiles = 0;
                for (const output of this.compilerResult.outputFiles!) {
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

                        const content = Utils.removeTestPathPrefixes(output.text, /*retainTrailingDirectorySeparator*/ true);
                        Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + diskRelativeName, content as string | null); // TODO: GH#18217
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
            //             filter(compilerResult.outputFiles, outputFile => Harness.Compiler.isJS(outputFile.emittedFileName)));
            //     });
            // }
        }

        public verifyDeclarations() {
            if (!this.compilerResult.errors.length && this.testCase.declaration) {
                const dTsCompileResult = this.compileDeclarations(this.compilerResult);
                if (dTsCompileResult && dTsCompileResult.errors.length) {
                    Harness.Baseline.runBaseline(this.getBaselineFolder(this.compilerResult.moduleKind) + this.testCaseJustName + ".dts.errors.txt", getErrorsBaseline(dTsCompileResult));
                }
            }
        }

        // Project baselines verified go in project/testCaseName/moduleKind/
        private getBaselineFolder(moduleKind: ModuleKind) {
            return "project/" + this.testCaseJustName + "/" + moduleNameToString(moduleKind) + "/";
        }

        private cleanProjectUrl(url: string) {
            let diskProjectPath = normalizeSlashes(Harness.IO.resolvePath(this.testCase.projectRoot)!);
            let projectRootUrl = "file:///" + diskProjectPath;
            const normalizedProjectRoot = normalizeSlashes(this.testCase.projectRoot);
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
                    if (url.charCodeAt(0) !== CharacterCodes.slash) {
                        url = "/" + url;
                    }
                }
            }

            return url;
        }

        private compileProjectFiles(moduleKind: ModuleKind, configFileSourceFiles: readonly SourceFile[],
            getInputFiles: () => readonly string[],
            compilerHost: CompilerHost,
            compilerOptions: CompilerOptions): CompileProjectFilesResult {

            const program = createProgram(getInputFiles(), compilerOptions, compilerHost);
            const errors = getPreEmitDiagnostics(program);

            const { sourceMaps: sourceMapData, diagnostics: emitDiagnostics } = program.emit();

            // Clean up source map data that will be used in baselining
            if (sourceMapData) {
                for (const data of sourceMapData) {
                    data.sourceMap = {
                        ...data.sourceMap,
                        sources: data.sourceMap.sources.map(source => this.cleanProjectUrl(source)),
                        sourceRoot: data.sourceMap.sourceRoot && this.cleanProjectUrl(data.sourceMap.sourceRoot)
                    };
                }
            }

            return {
                configFileSourceFiles,
                moduleKind,
                program,
                errors: concatenate(errors, emitDiagnostics),
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
            forEach(compilerResult.program.getSourceFiles(), sourceFile => {
                if (sourceFile.isDeclarationFile) {
                    if (!vpath.isDefaultLibrary(sourceFile.fileName)) {
                        allInputFiles.unshift(new documents.TextDocument(sourceFile.fileName, sourceFile.text));
                    }
                    rootFiles.unshift(sourceFile.fileName);
                }
                else if (!(compilerOptions.outFile || compilerOptions.out)) {
                    let emitOutputFilePathWithoutExtension: string | undefined;
                    if (compilerOptions.outDir) {
                        let sourceFilePath = getNormalizedAbsolutePath(sourceFile.fileName, compilerResult.program!.getCurrentDirectory());
                        sourceFilePath = sourceFilePath.replace(compilerResult.program!.getCommonSourceDirectory(), "");
                        emitOutputFilePathWithoutExtension = removeFileExtension(combinePaths(compilerOptions.outDir, sourceFilePath));
                    }
                    else {
                        emitOutputFilePathWithoutExtension = removeFileExtension(sourceFile.fileName);
                    }

                    const outputDtsFileName = emitOutputFilePathWithoutExtension + Extension.Dts;
                    const file = findOutputDtsFile(outputDtsFileName);
                    if (file) {
                        allInputFiles.unshift(file);
                        rootFiles.unshift(file.meta.get("fileName") || file.file);
                    }
                }
                else {
                    const outputDtsFileName = removeFileExtension(compilerOptions.outFile || compilerOptions.out!) + Extension.Dts;
                    const outputDtsFile = findOutputDtsFile(outputDtsFileName)!;
                    if (!contains(allInputFiles, outputDtsFile)) {
                        allInputFiles.unshift(outputDtsFile);
                        rootFiles.unshift(outputDtsFile.meta.get("fileName") || outputDtsFile.file);
                    }
                }
            });

            const _vfs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, {
                documents: allInputFiles,
                cwd: vpath.combine(vfs.srcFolder, this.testCase.projectRoot)
            });

            // Dont allow config files since we are compiling existing source options
            const compilerHost = new ProjectCompilerHost(_vfs, compilerResult.compilerOptions!, this.testCaseJustName, this.testCase, compilerResult.moduleKind);
            return this.compileProjectFiles(compilerResult.moduleKind, compilerResult.configFileSourceFiles, () => rootFiles, compilerHost, compilerResult.compilerOptions!);

            function findOutputDtsFile(fileName: string) {
                return forEach(compilerResult.outputFiles, outputFile => outputFile.meta.get("fileName") === fileName ? outputFile : undefined);
            }
        }
    }

    function moduleNameToString(moduleKind: ModuleKind) {
        return moduleKind === ModuleKind.AMD ? "amd" :
            moduleKind === ModuleKind.CommonJS ? "node" : "none";
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
            unitName: isRootedDiskPath(sourceFile.fileName) ?
                Harness.RunnerBase.removeFullPaths(sourceFile.fileName) :
                sourceFile.fileName,
            content: sourceFile.text
        }));

        return Harness.Compiler.getErrorBaseline(inputFiles, compilerResult.errors);
    }

    function createCompilerOptions(testCase: ProjectRunnerTestCase & CompilerOptions, moduleKind: ModuleKind) {
        // Set the special options that depend on other testcase options
        const compilerOptions: CompilerOptions = {
            noErrorTruncation: false,
            skipDefaultLibCheck: false,
            moduleResolution: ModuleResolutionKind.Classic,
            module: moduleKind,
            newLine: NewLineKind.CarriageReturnLineFeed,
            mapRoot: testCase.resolveMapRoot && testCase.mapRoot
                ? vpath.resolve(vfs.srcFolder, testCase.mapRoot)
                : testCase.mapRoot,

            sourceRoot: testCase.resolveSourceRoot && testCase.sourceRoot
                ? vpath.resolve(vfs.srcFolder, testCase.sourceRoot)
                : testCase.sourceRoot
        };

        // Set the values specified using json
        const optionNameMap = arrayToMap(optionDeclarations, option => option.name);
        for (const name in testCase) {
            if (name !== "mapRoot" && name !== "sourceRoot") {
                const option = optionNameMap.get(name);
                if (option) {
                    const optType = option.type;
                    let value = <any>testCase[name];
                    if (!isString(optType)) {
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

