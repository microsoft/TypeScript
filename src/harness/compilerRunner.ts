/// <reference path="harness.ts" />
/// <reference path="runnerbase.ts" />
/// <reference path="typeWriter.ts" />
/// <reference path="./vpath.ts" />
/// <reference path="./vfs.ts" />
/// <reference path="./compiler.ts" />
/// <reference path="./documents.ts" />

const enum CompilerTestType {
    Conformance,
    Regressions,
    Test262
}

class CompilerBaselineRunner extends RunnerBase {
    private basePath = "tests/cases";
    private testSuiteName: TestRunnerKind;
    private emit: boolean;

    public options: string;

    constructor(public testType: CompilerTestType) {
        super();
        this.emit = true;
        if (testType === CompilerTestType.Conformance) {
            this.testSuiteName = "conformance";
        }
        else if (testType === CompilerTestType.Regressions) {
            this.testSuiteName = "compiler";
        }
        else if (testType === CompilerTestType.Test262) {
            this.testSuiteName = "test262";
        }
        else {
            this.testSuiteName = "compiler"; // default to this for historical reasons
        }
        this.basePath += "/" + this.testSuiteName;
    }

    public kind() {
        return this.testSuiteName;
    }

    public enumerateTestFiles() {
        return this.enumerateFiles(this.basePath, /\.tsx?$/, { recursive: true });
    }

    public initializeTests() {
        describe(this.testSuiteName + " tests", () => {
            describe("Setup compiler for compiler baselines", () => {
                this.parseOptions();
            });

            // this will set up a series of describe/it blocks to run between the setup and cleanup phases
            const files = this.tests.length > 0 ? this.tests : this.enumerateTestFiles();
            files.forEach(file => { this.checkTestCodeOutput(vpath.normalizeSeparators(file)); });
        });
    }

    public checkTestCodeOutput(fileName: string) {
        for (const { name, payload } of CompilerTest.getConfigurations(fileName)) {
            describe(`${this.testSuiteName} tests for ${fileName}${name ? ` (${name})` : ``}`, () => {
                this.runSuite(fileName, payload);
            });
        }
    }

    private runSuite(fileName: string, testCaseContent: Harness.TestCaseParser.TestCaseContent) {
        // Mocha holds onto the closure environment of the describe callback even after the test is done.
        // Everything declared here should be cleared out in the "after" callback.
        let compilerTest: CompilerTest | undefined;
        before(() => { compilerTest = new CompilerTest(fileName, testCaseContent); });
        it(`Correct errors for ${fileName}`, () => { compilerTest.verifyDiagnostics(); });
        it(`Correct module resolution tracing for ${fileName}`, () => { compilerTest.verifyModuleResolution(); });
        it(`Correct sourcemap content for ${fileName}`, () => { compilerTest.verifySourceMapRecord(); });
        it(`Correct JS output for ${fileName}`, () => { if (this.emit) compilerTest.verifyJavaScriptOutput(); });
        it(`Correct Sourcemap output for ${fileName}`, () => { compilerTest.verifySourceMapOutput(); });
        it(`Correct type/symbol baselines for ${fileName}`, () => { compilerTest.verifyTypesAndSymbols(); });
        after(() => { compilerTest = undefined; });
    }

    private parseOptions() {
        if (this.options && this.options.length > 0) {
            this.emit = false;

            const opts = this.options.split(",");
            for (const opt of opts) {
                switch (opt) {
                    case "emit":
                        this.emit = true;
                        break;
                    default:
                        throw new Error("unsupported flag");
                }
            }
        }
    }
}

interface CompilerTestConfiguration {
    name: string;
    payload: Harness.TestCaseParser.TestCaseContent;
}

class CompilerTest {
    private fileName: string;
    private justName: string;
    private lastUnit: Harness.TestCaseParser.TestUnitData;
    private harnessSettings: Harness.TestCaseParser.CompilerSettings;
    private hasNonDtsFiles: boolean;
    private result: compiler.CompilationResult;
    private options: ts.CompilerOptions;
    private tsConfigFiles: Harness.Compiler.TestFile[];
    // equivalent to the files that will be passed on the command line
    private toBeCompiled: Harness.Compiler.TestFile[];
    // equivalent to other files on the file system not directly passed to the compiler (ie things that are referenced by other files)
    private otherFiles: Harness.Compiler.TestFile[];

    constructor(fileName: string, testCaseContent: Harness.TestCaseParser.TestCaseContent) {
        this.fileName = fileName;
        this.justName = vpath.basename(fileName);
        const rootDir = fileName.indexOf("conformance") === -1 ? "tests/cases/compiler/" : ts.getDirectoryPath(fileName) + "/";
        const units = testCaseContent.testUnitData;
        this.harnessSettings = testCaseContent.settings;
        let tsConfigOptions: ts.CompilerOptions;
        this.tsConfigFiles = [];
        if (testCaseContent.tsConfig) {
            assert.equal(testCaseContent.tsConfig.fileNames.length, 0, `list of files in tsconfig is not currently supported`);

            tsConfigOptions = ts.cloneCompilerOptions(testCaseContent.tsConfig.options);
            this.tsConfigFiles.push(this.createHarnessTestFile(testCaseContent.tsConfigFileUnitData, rootDir, ts.combinePaths(rootDir, tsConfigOptions.configFilePath)));
        }
        else {
            const baseUrl = this.harnessSettings.baseUrl;
            if (baseUrl !== undefined && !ts.isRootedDiskPath(baseUrl)) {
                this.harnessSettings.baseUrl = ts.getNormalizedAbsolutePath(baseUrl, rootDir);
            }
        }

        this.lastUnit = units[units.length - 1];
        this.hasNonDtsFiles = ts.forEach(units, unit => !ts.fileExtensionIs(unit.name, ts.Extension.Dts));
        // We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
        // If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
        // otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.
        this.toBeCompiled = [];
        this.otherFiles = [];

        if (testCaseContent.settings.noImplicitReferences || /require\(/.test(this.lastUnit.content) || /reference\spath/.test(this.lastUnit.content)) {
            this.toBeCompiled.push(this.createHarnessTestFile(this.lastUnit, rootDir));
            units.forEach(unit => {
                if (unit.name !== this.lastUnit.name) {
                    this.otherFiles.push(this.createHarnessTestFile(unit, rootDir));
                }
            });
        }
        else {
            this.toBeCompiled = units.map(unit => {
                return this.createHarnessTestFile(unit, rootDir);
            });
        }

        if (tsConfigOptions && tsConfigOptions.configFilePath !== undefined) {
            tsConfigOptions.configFilePath = ts.combinePaths(rootDir, tsConfigOptions.configFilePath);
            tsConfigOptions.configFile.fileName = tsConfigOptions.configFilePath;
        }

        this.result = Harness.Compiler.compileFiles(
            this.toBeCompiled,
            this.otherFiles,
            this.harnessSettings,
            /*options*/ tsConfigOptions,
            /*currentDirectory*/ this.harnessSettings.currentDirectory);

        this.options = this.result.options;
    }

    public static getConfigurations(fileName: string) {
        const content = Harness.IO.readFile(fileName);
        const rootDir = fileName.indexOf("conformance") === -1 ? "tests/cases/compiler/" : ts.getDirectoryPath(fileName) + "/";
        const testCaseContent = Harness.TestCaseParser.makeUnitsFromTest(content, fileName, rootDir);
        const configurations: CompilerTestConfiguration[] = [];
        const scriptTargets = this._split(testCaseContent.settings.target);
        const moduleKinds = this._split(testCaseContent.settings.module);
        for (const scriptTarget of scriptTargets) {
            for (const moduleKind of moduleKinds) {
                let name = "";
                if (moduleKinds.length > 1) {
                    name += `@module: ${moduleKind || "none"}`;
                }
                if (scriptTargets.length > 1) {
                    if (name) name += ", ";
                    name += `@target: ${scriptTarget || "none"}`;
                }

                const settings = { ...testCaseContent.settings };
                if (scriptTarget) settings.target = scriptTarget;
                if (moduleKind) settings.module = moduleKind;
                configurations.push({ name, payload: { ...testCaseContent, settings } });
            }
        }

        return configurations;
    }

    public verifyDiagnostics() {
        // check errors
        Harness.Compiler.doErrorBaseline(
            this.justName,
            this.tsConfigFiles.concat(this.toBeCompiled, this.otherFiles),
            this.result.diagnostics,
            !!this.options.pretty);
    }

    public verifyModuleResolution() {
        if (this.options.traceResolution) {
            Harness.Baseline.runBaseline(this.justName.replace(/\.tsx?$/, ".trace.json"), () => {
                return utils.removeTestPathPrefixes(JSON.stringify(this.result.traces, undefined, 4));
            });
        }
    }

    public verifySourceMapRecord() {
        if (this.options.sourceMap || this.options.inlineSourceMap || this.options.declarationMap) {
            Harness.Baseline.runBaseline(this.justName.replace(/\.tsx?$/, ".sourcemap.txt"), () => {
                const record = utils.removeTestPathPrefixes(this.result.getSourceMapRecord());
                if ((this.options.noEmitOnError && this.result.diagnostics.length !== 0) || record === undefined) {
                    // Because of the noEmitOnError option no files are created. We need to return null because baselining isn't required.
                    /* tslint:disable:no-null-keyword */
                    return null;
                    /* tslint:enable:no-null-keyword */
                }
                return record;
            });
        }
    }

    public verifyJavaScriptOutput() {
        if (this.hasNonDtsFiles) {
            Harness.Compiler.doJsEmitBaseline(
                this.justName,
                this.fileName,
                this.options,
                this.result,
                this.tsConfigFiles,
                this.toBeCompiled,
                this.otherFiles,
                this.harnessSettings);
        }
    }

    public verifySourceMapOutput() {
        Harness.Compiler.doSourcemapBaseline(
            this.justName,
            this.options,
            this.result,
            this.harnessSettings);
    }

    public verifyTypesAndSymbols() {
        if (this.fileName.indexOf("APISample") >= 0) {
            return;
        }

        Harness.Compiler.doTypeAndSymbolBaseline(
            this.justName,
            this.result.program,
            this.toBeCompiled.concat(this.otherFiles).filter(file => !!this.result.program.getSourceFile(file.unitName)));
    }

    private static _split(text: string) {
        const entries = text && text.split(",").map(s => s.toLowerCase().trim()).filter(s => s.length > 0);
        return entries && entries.length > 0 ? entries : [""];
    }

    private makeUnitName(name: string, root: string) {
        const path = ts.toPath(name, root, ts.identity);
        const pathStart = ts.toPath(Harness.IO.getCurrentDirectory(), "", ts.identity);
        return pathStart ? path.replace(pathStart, "/") : path;
    }

    private createHarnessTestFile(lastUnit: Harness.TestCaseParser.TestUnitData, rootDir: string, unitName?: string): Harness.Compiler.TestFile {
        return { unitName: unitName || this.makeUnitName(lastUnit.name, rootDir), content: lastUnit.content, fileOptions: lastUnit.fileOptions };
    }
}