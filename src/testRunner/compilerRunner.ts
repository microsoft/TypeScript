import * as compiler from "./_namespaces/compiler";
import {
    Baseline,
    Compiler,
    FileBasedTest,
    FileBasedTestConfiguration,
    getFileBasedTestConfigurationDescription,
    getFileBasedTestConfigurations,
    IO,
    RunnerBase,
    TestCaseParser,
    TestRunnerKind,
} from "./_namespaces/Harness";
import * as ts from "./_namespaces/ts";
import * as Utils from "./_namespaces/Utils";
import * as vfs from "./_namespaces/vfs";
import * as vpath from "./_namespaces/vpath";

export const enum CompilerTestType {
    Conformance,
    Regressions,
}

interface CompilerFileBasedTest extends FileBasedTest {
    readonly content?: string;
}

export class CompilerBaselineRunner extends RunnerBase {
    private basePath = "tests/cases";
    private testSuiteName: TestRunnerKind;
    private emit: boolean;

    public options: string | undefined;

    constructor(public testType: CompilerTestType) {
        super();
        this.emit = true;
        if (testType === CompilerTestType.Conformance) {
            this.testSuiteName = "conformance";
        }
        else if (testType === CompilerTestType.Regressions) {
            this.testSuiteName = "compiler";
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
        // see also: `enumerateTestFiles` in tests/webTestServer.ts
        return this.enumerateFiles(this.basePath, /\.tsx?$/, { recursive: true }).map(CompilerTest.getConfigurations);
    }

    public initializeTests() {
        describe(this.testSuiteName + " tests", () => {
            describe("Setup compiler for compiler baselines", () => {
                this.parseOptions();
            });

            // this will set up a series of describe/it blocks to run between the setup and cleanup phases
            const files = this.tests.length > 0 ? this.tests : IO.enumerateTestFiles(this);
            files.forEach(test => {
                const file = typeof test === "string" ? test : test.file;
                this.checkTestCodeOutput(vpath.normalizeSeparators(file), typeof test === "string" ? CompilerTest.getConfigurations(test) : test);
            });
        });
    }

    public checkTestCodeOutput(fileName: string, test?: CompilerFileBasedTest) {
        if (test && ts.some(test.configurations)) {
            test.configurations.forEach(configuration => {
                describe(`${this.testSuiteName} tests for ${fileName}${configuration ? ` (${getFileBasedTestConfigurationDescription(configuration)})` : ``}`, () => {
                    this.runSuite(fileName, test, configuration);
                });
            });
        }
        else {
            describe(`${this.testSuiteName} tests for ${fileName}`, () => {
                this.runSuite(fileName, test);
            });
        }
    }

    private runSuite(fileName: string, test?: CompilerFileBasedTest, configuration?: FileBasedTestConfiguration) {
        // Mocha holds onto the closure environment of the describe callback even after the test is done.
        // Everything declared here should be cleared out in the "after" callback.
        let compilerTest!: CompilerTest;
        let isolatedTest!: IsolatedDeclarationTest;
        before(() => {
            let payload;
            if (test && test.content) {
                payload = TestCaseParser.makeUnitsFromTest(test.content, test.file);
            }
            if (payload) {
                isolatedTest = new IsolatedDeclarationTest(fileName, payload, configuration);
            }
            compilerTest = new CompilerTest(fileName, payload, configuration);
        });
        it(`Correct errors for ${fileName}`, () => compilerTest.verifyDiagnostics());
        it(`Correct module resolution tracing for ${fileName}`, () => compilerTest.verifyModuleResolution());
        it(`Correct sourcemap content for ${fileName}`, () => compilerTest.verifySourceMapRecord());
        it(`Correct JS output for ${fileName}`, () => (this.emit && compilerTest.verifyJavaScriptOutput()));
        it(`Correct Sourcemap output for ${fileName}`, () => compilerTest.verifySourceMapOutput());
        it(`Correct type/symbol baselines for ${fileName}`, () => compilerTest.verifyTypesAndSymbols());
        it(`Correct dte emit for ${fileName}`, () => isolatedTest?.verifyDteOutput());
        it(`Correct tsc emit for ${fileName}`, () => isolatedTest?.verifyTscOutput());
        it(`Correct dte/tsc diff ${fileName}`, () => isolatedTest?.verifyDiff());
        after(() => {
            compilerTest = undefined!;
            isolatedTest = undefined!;
        });
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

class CompilerTestBase {
    private static varyBy: readonly string[] = [
        "module",
        "moduleResolution",
        "moduleDetection",
        "allowImportingTsExtensions",
        "target",
        "jsx",
        "noEmit",
        "removeComments",
        "importHelpers",
        "importHelpers",
        "downlevelIteration",
        "isolatedModules",
        "strict",
        "noImplicitAny",
        "strictNullChecks",
        "strictFunctionTypes",
        "strictBindCallApply",
        "strictPropertyInitialization",
        "noImplicitThis",
        "alwaysStrict",
        "allowSyntheticDefaultImports",
        "esModuleInterop",
        "emitDecoratorMetadata",
        "skipDefaultLibCheck",
        "preserveConstEnums",
        "skipLibCheck",
        "exactOptionalPropertyTypes",
        "useDefineForClassFields",
        "useUnknownInCatchVariables",
        "noUncheckedIndexedAccess",
        "noPropertyAccessFromIndexSignature",
        "resolvePackageJsonExports",
        "resolvePackageJsonImports",
        "resolveJsonModule",
        "allowArbitraryExtensions",
    ];
    protected fileName: string;
    protected justName: string;
    protected configuredName: string;
    protected harnessSettings: TestCaseParser.CompilerSettings;
    protected hasNonDtsFiles: boolean;
    protected result: compiler.CompilationResult;
    protected options: ts.CompilerOptions;
    protected tsConfigFiles: Compiler.TestFile[];
    // equivalent to the files that will be passed on the command line
    protected toBeCompiled: Compiler.TestFile[];
    // equivalent to other files on the file system not directly passed to the compiler (ie things that are referenced by other files)
    protected otherFiles: Compiler.TestFile[];

    constructor(fileName: string, testCaseContent?: TestCaseParser.TestCaseContent, configurationOverrides?: TestCaseParser.CompilerSettings) {
        const absoluteRootDir = vfs.srcFolder;
        this.fileName = fileName;
        this.justName = vpath.basename(fileName);
        this.configuredName = this.justName;
        if (configurationOverrides) {
            let configuredName = "";
            const keys = Object
                .keys(configurationOverrides)
                .sort();
            for (const key of keys) {
                if (configuredName) {
                    configuredName += ",";
                }
                configuredName += `${key.toLowerCase()}=${configurationOverrides[key].toLowerCase()}`;
            }
            if (configuredName) {
                const extname = vpath.extname(this.justName);
                const basename = vpath.basename(this.justName, extname, /*ignoreCase*/ true);
                this.configuredName = `${basename}(${configuredName})${extname}`;
            }
        }

        if (testCaseContent === undefined) {
            testCaseContent = TestCaseParser.makeUnitsFromTest(IO.readFile(fileName)!, fileName);
        }

        if (configurationOverrides) {
            testCaseContent = { ...testCaseContent, settings: { ...testCaseContent.settings, ...configurationOverrides } };
        }

        const units = testCaseContent.testUnitData;
        this.toBeCompiled = [];
        this.otherFiles = [];
        this.hasNonDtsFiles = units.some(unit => !ts.fileExtensionIs(unit.name, ts.Extension.Dts));
        this.harnessSettings = testCaseContent.settings;
        let tsConfigOptions: ts.CompilerOptions | undefined;
        this.tsConfigFiles = [];
        if (testCaseContent.tsConfig) {
            tsConfigOptions = ts.cloneCompilerOptions(testCaseContent.tsConfig.options);
            this.tsConfigFiles.push(this.createHarnessTestFile(testCaseContent.tsConfigFileUnitData!));
            for (const unit of units) {
                if (testCaseContent.tsConfig.fileNames.includes(ts.getNormalizedAbsolutePath(unit.name, absoluteRootDir))) {
                    this.toBeCompiled.push(this.createHarnessTestFile(unit));
                }
                else {
                    this.otherFiles.push(this.createHarnessTestFile(unit));
                }
            }
        }
        else {
            const baseUrl = this.harnessSettings.baseUrl;
            if (baseUrl !== undefined && !ts.isRootedDiskPath(baseUrl)) {
                this.harnessSettings.baseUrl = ts.getNormalizedAbsolutePath(baseUrl, absoluteRootDir);
            }

            const lastUnit = units[units.length - 1];
            // We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
            // If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
            // otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.

            if (testCaseContent.settings.noImplicitReferences || /require\(/.test(lastUnit.content) || /reference\spath/.test(lastUnit.content)) {
                this.toBeCompiled.push(this.createHarnessTestFile(lastUnit));
                units.forEach(unit => {
                    if (unit.name !== lastUnit.name) {
                        this.otherFiles.push(this.createHarnessTestFile(unit));
                    }
                });
            }
            else {
                this.toBeCompiled = units.map(unit => {
                    return this.createHarnessTestFile(unit);
                });
            }
        }

        if (tsConfigOptions && tsConfigOptions.configFilePath !== undefined) {
            tsConfigOptions.configFile!.fileName = tsConfigOptions.configFilePath;
        }

        this.result = Compiler.compileFiles(
            this.toBeCompiled,
            this.otherFiles,
            this.harnessSettings,
            /*options*/ tsConfigOptions,
            /*currentDirectory*/ this.harnessSettings.currentDirectory,
            testCaseContent.symlinks,
        );

        this.options = this.result.options;
    }

    public static getConfigurations(file: string): CompilerFileBasedTest {
        // also see `parseCompilerTestConfigurations` in tests/webTestServer.ts
        const content = IO.readFile(file)!;
        const settings = TestCaseParser.extractCompilerSettings(content);
        const configurations = getFileBasedTestConfigurations(settings, CompilerTest.varyBy);
        return { file, configurations, content };
    }

    private createHarnessTestFile(unit: TestCaseParser.TestUnitData): Compiler.TestFile {
        return {
            unitName: unit.name,
            content: unit.content,
            fileOptions: unit.fileOptions,
        };
    }
}
class CompilerTest extends CompilerTestBase {
    public verifyDiagnostics() {
        // check errors
        Compiler.doErrorBaseline(
            this.configuredName,
            this.tsConfigFiles.concat(this.toBeCompiled, this.otherFiles),
            this.result.diagnostics,
            !!this.options.pretty,
        );
    }

    public verifyModuleResolution() {
        if (this.options.traceResolution) {
            Baseline.runBaseline(this.configuredName.replace(/\.tsx?$/, ".trace.json"), JSON.stringify(this.result.traces.map(Utils.sanitizeTraceResolutionLogEntry), undefined, 4));
        }
    }

    public verifySourceMapRecord() {
        if (this.options.sourceMap || this.options.inlineSourceMap || this.options.declarationMap) {
            const record = Utils.removeTestPathPrefixes(this.result.getSourceMapRecord()!);
            const baseline = (this.options.noEmitOnError && this.result.diagnostics.length !== 0) || record === undefined
                // Because of the noEmitOnError option no files are created. We need to return null because baselining isn't required.
                ? null // eslint-disable-line no-null/no-null
                : record;
            Baseline.runBaseline(this.configuredName.replace(/\.tsx?$/, ".sourcemap.txt"), baseline);
        }
    }

    public verifyJavaScriptOutput() {
        if (this.hasNonDtsFiles) {
            Compiler.doJsEmitBaseline(
                this.configuredName,
                this.fileName,
                this.options,
                this.result,
                this.tsConfigFiles,
                this.toBeCompiled,
                this.otherFiles,
                this.harnessSettings,
            );
        }
    }

    public verifySourceMapOutput() {
        Compiler.doSourcemapBaseline(
            this.configuredName,
            this.options,
            this.result,
            this.harnessSettings,
        );
    }

    public verifyTypesAndSymbols() {
        if (this.fileName.includes("APISample")) {
            return;
        }

        const noTypesAndSymbols = this.harnessSettings.noTypesAndSymbols &&
            this.harnessSettings.noTypesAndSymbols.toLowerCase() === "true";
        if (noTypesAndSymbols) {
            return;
        }

        Compiler.doTypeAndSymbolBaseline(
            this.configuredName,
            this.fileName,
            this.result.program!,
            this.toBeCompiled.concat(this.otherFiles).filter(file => !!this.result.program!.getSourceFile(file.unitName)),
            /*opts*/ undefined,
            /*multifile*/ undefined,
            /*skipTypeBaselines*/ undefined,
            /*skipSymbolBaselines*/ undefined,
            !!ts.length(this.result.diagnostics),
        );
    }
}

function changeSettingForIsolatedDeclarations(settings: TestCaseParser.CompilerSettings) {
    const clone: TestCaseParser.CompilerSettings = {
        ...settings,
        allowJS: "false",
        checkJS: "false",
        declaration: "true",
        isolatedDeclarations: "true",
        forceDtsEmit: "true",
    };
    delete clone.outFile;
    delete clone.outfile;
    delete clone.out;
    return clone;
}

function removeOutFromOptions(tsConfig: ts.ParsedCommandLine | undefined) {
    if (!tsConfig) return undefined;

    const clone: ts.ParsedCommandLine = {
        ...tsConfig,
        options: tsConfig.options,
    };
    delete clone.options.outFile;
    delete clone.options.out;
    return clone;
}
export class IsolatedDeclarationTest extends CompilerTestBase {
    private dteDiagnostics: ts.Diagnostic[];
    private isOutputEquivalent: boolean;
    private dteDtsFile: Compiler.TestFile[];
    private tscDtsFiles: Compiler.TestFile[];
    constructor(fileName: string, testCaseContent: TestCaseParser.TestCaseContent, configurationOverrides?: TestCaseParser.CompilerSettings) {
        super(
            fileName,
            {
                ...testCaseContent,
                settings: changeSettingForIsolatedDeclarations(testCaseContent.settings),
                tsConfig: removeOutFromOptions(testCaseContent.tsConfig),
            },
            configurationOverrides,
            // /*forceIncludeAllFiles*/ true,
        );
        const options = { ...this.options };
        ts.setConfigFileInOptions(options, options && options.configFile);

        const currentDirectory = this.harnessSettings.currentDirectory ?? vfs.srcFolder;
        const dteResult = Compiler.compileDeclarationFilesWithIsolatedEmitter(
            this.toBeCompiled,
            this.otherFiles,
            this.result.host,
            this.options,
            currentDirectory,
        );
        this.dteDiagnostics = dteResult.diagnostics;
        this.dteDtsFile = [...ts.mapDefinedIterator(dteResult.dts, ([, f]) => ({
            unitName: this.result.host.vfs.realpathSync(f.file),
            content: f.text,
        }))];
        this.dteDtsFile.sort((a, b) => this.result.host.vfs.stringComparer(a.unitName, b.unitName));

        // With force get JSON definition files we need to ignore
        this.tscDtsFiles = [...ts.mapDefinedIterator(this.result.dts, ([name, f]) =>
            name.endsWith(".d.json.ts") ? undefined : {
                unitName: this.result.host.vfs.realpathSync(f.file),
                content: f.text,
            })];
        this.tscDtsFiles.sort((a, b) => this.result.host.vfs.stringComparer(a.unitName, b.unitName));

        // If DTE is the same as TS output we don't need to do any extra checks.
        this.isOutputEquivalent = this.dteDtsFile.length === this.tscDtsFiles.length && this.dteDtsFile
            .every((dteDecl, index) => {
                const tscDecl = this.tscDtsFiles[index];
                return tscDecl.unitName === dteDecl.unitName && dteDecl.content === tscDecl.content;
            });
    }
    private static dteDiagnosticErrors = new Set([
        ts.Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_declaration_emit.code,
        ts.Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotation_may_unblock_declaration_emit.code,
        ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.code,
        // ts.Diagnostics.Declaration_emit_for_this_file_requires_adding_a_type_reference_directive_Add_a_type_reference_directive_to_0_to_unblock_declaration_emit.code,
    ]);

    verifyDteOutput() {
        if (this.isOutputEquivalent) return;
        Compiler.doDeclarationBaseline(
            this.configuredName,
            "isolated-declarations/original/dte",
            this.fileName,
            this.dteDtsFile,
            this.dteDiagnostics,
            this.toBeCompiled,
            this.otherFiles,
            this.options.pretty,
        );
    }
    verifyTscOutput() {
        if (this.isOutputEquivalent) return;
        Compiler.doDeclarationBaseline(
            this.configuredName,
            "isolated-declarations/original/tsc",
            this.fileName,
            this.tscDtsFiles,
            this.result.diagnostics.filter(p => IsolatedDeclarationTest.dteDiagnosticErrors.has(p.code)),
            this.toBeCompiled,
            this.otherFiles,
            this.options.pretty,
        );
    }
    verifyDiff() {
        if (this.isOutputEquivalent) return;
        Compiler.doDeclarationDiffBaseline(
            this.configuredName,
            "isolated-declarations/original/diff",
            this.fileName,
            this.dteDtsFile,
            this.tscDtsFiles,
        );
    }
}
