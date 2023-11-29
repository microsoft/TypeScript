import * as compiler from "./_namespaces/compiler";
import {
    fixTestFiles,
} from "./_namespaces/fixer";
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
        let environment!: CompilerTestEnvironment;
        before(() => {
            let payload;
            if (test && test.content) {
                payload = TestCaseParser.makeUnitsFromTest(test.content, test.file);
            }
            environment = CompilerTest.initializeCompilerEnvironment(fileName, payload, configuration);
            const fileSystem = environment.fileSystem.makeReadonly();

            compilerTest = new CompilerTest({
                ...environment,
                fileSystem: fileSystem.shadow(),
            });
        });
        it(`Correct errors for ${fileName}`, () => compilerTest.verifyDiagnostics());
        it(`Correct module resolution tracing for ${fileName}`, () => compilerTest.verifyModuleResolution());
        it(`Correct sourcemap content for ${fileName}`, () => compilerTest.verifySourceMapRecord());
        it(`Correct JS output for ${fileName}`, () => (this.emit && compilerTest.verifyJavaScriptOutput()));
        it(`Correct Sourcemap output for ${fileName}`, () => compilerTest.verifySourceMapOutput());
        it(`Correct type/symbol baselines for ${fileName}`, () => compilerTest.verifyTypesAndSymbols());

        describe("isolated declarations", () => {
            let isolatedTest: IsolatedDeclarationTest | undefined;
            before(() => {
                const isolatedTestEnv = IsolatedDeclarationTest.transformEnvironment(environment);
                if (isolatedTestEnv) {
                    isolatedTest = new IsolatedDeclarationTest(isolatedTestEnv);
                }
            });
            it(`Correct dte emit for ${fileName}`, () => isolatedTest?.verifyDteOutput());
            it(`Correct tsc emit for ${fileName}`, () => isolatedTest?.verifyTscOutput());
            it(`Correct dte/tsc diff ${fileName}`, () => isolatedTest?.verifyDiff());

            after(() => {
                isolatedTest = undefined!;
            });
        });

        describe("isolated declarations fixed", () => {
            let fixedIsolatedTest: FixedIsolatedDeclarationTest | undefined;
            before(() => {
                const fixedIsolatedTestEnv = FixedIsolatedDeclarationTest.fixTestProject(environment);
                if (fixedIsolatedTestEnv) {
                    fixedIsolatedTest = new FixedIsolatedDeclarationTest(fixedIsolatedTestEnv);
                }
            });
            it(`Correct dte emit for ${fileName}`, () => fixedIsolatedTest?.verifyDteOutput());
            it(`Correct tsc emit for ${fileName}`, () => fixedIsolatedTest?.verifyTscOutput());
            it(`Correct dte/tsc diff ${fileName}`, () => fixedIsolatedTest?.verifyDiff());
            it(`Correct dte map emit for ${fileName}`, () => fixedIsolatedTest?.verifyDteMapOutput());
            it(`Correct tsc map emit for ${fileName}`, () => fixedIsolatedTest?.verifyTscMapOutput());
            it(`Correct dte/tsc map diff ${fileName}`, () => fixedIsolatedTest?.verifyMapDiff());

            after(() => {
                fixedIsolatedTest = undefined!;
            });
        });

        after(() => {
            compilerTest = undefined!;
            environment = undefined!;
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
interface CompilerTestEnvironment {
    fileName: string;
    justName: string;
    toBeCompiled: Compiler.TestFile[];
    otherFiles: Compiler.TestFile[];
    tsConfigFiles: Compiler.TestFile[];
    allFiles: Compiler.TestFile[];
    compilerOptions: ts.CompilerOptions & Compiler.HarnessOptions;
    configuredName: string;
    hasNonDtsFiles: boolean;
    testCaseContent: TestCaseParser.TestCaseContent;
    configurationOverrides?: TestCaseParser.CompilerSettings;
    fileSystem: vfs.FileSystem;
    programFileNames: string[];
    symlinks: vfs.FileSet | undefined;
    typeScriptVersion?: string;
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
        "verbatimModuleSyntax",
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
    protected allFiles: Compiler.TestFile[];

    constructor(compilerEnvironment: CompilerTestEnvironment) {
        this.fileName = compilerEnvironment.fileName;
        this.justName = compilerEnvironment.justName;
        this.hasNonDtsFiles = compilerEnvironment.hasNonDtsFiles;
        this.configuredName = compilerEnvironment.configuredName;
        this.toBeCompiled = compilerEnvironment.toBeCompiled;
        this.otherFiles = compilerEnvironment.otherFiles;
        this.allFiles = compilerEnvironment.allFiles;
        this.tsConfigFiles = compilerEnvironment.tsConfigFiles;

        this.harnessSettings = compilerEnvironment.testCaseContent.settings;

        this.result = Compiler.compileFilesWithEnvironment(compilerEnvironment);

        this.options = this.result.options;
    }

    public static initializeCompilerEnvironment(fileName: string, testCaseContent?: TestCaseParser.TestCaseContent, configurationOverrides?: TestCaseParser.CompilerSettings): CompilerTestEnvironment {
        const justName = vpath.basename(fileName);
        let configuredName = justName;
        if (configurationOverrides) {
            configuredName = "";
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
                const extname = vpath.extname(justName);
                const basename = vpath.basename(justName, extname, /*ignoreCase*/ true);
                configuredName = `${basename}(${configuredName})${extname}`;
            }
        }

        if (testCaseContent === undefined) {
            testCaseContent = TestCaseParser.makeUnitsFromTest(IO.readFile(fileName)!, fileName);
        }

        if (configurationOverrides) {
            testCaseContent = { ...testCaseContent, settings: { ...testCaseContent.settings, ...configurationOverrides } };
        }

        const absoluteRootDir = vfs.srcFolder;
        const units = testCaseContent.testUnitData;
        let toBeCompiled = [];
        const otherFiles = [];
        const hasNonDtsFiles = testCaseContent.testUnitData.some(unit => !ts.fileExtensionIs(unit.name, ts.Extension.Dts));
        const harnessSettings = testCaseContent.settings;
        let tsConfigOptions: ts.CompilerOptions | undefined;
        const tsConfigFiles = [];
        if (testCaseContent.tsConfig) {
            tsConfigOptions = ts.cloneCompilerOptions(testCaseContent.tsConfig.options);
            tsConfigFiles.push(this.createHarnessTestFile(testCaseContent.tsConfigFileUnitData!));
            for (const unit of units) {
                if (testCaseContent.tsConfig.fileNames.includes(ts.getNormalizedAbsolutePath(unit.name, absoluteRootDir))) {
                    toBeCompiled.push(this.createHarnessTestFile(unit));
                }
                else {
                    otherFiles.push(this.createHarnessTestFile(unit));
                }
            }
        }
        else {
            const baseUrl = harnessSettings.baseUrl;
            if (baseUrl !== undefined && !ts.isRootedDiskPath(baseUrl)) {
                harnessSettings.baseUrl = ts.getNormalizedAbsolutePath(baseUrl, absoluteRootDir);
            }

            const lastUnit = units[units.length - 1];
            // We need to assemble the list of input files for the compiler and other related files on the 'filesystem' (ie in a multi-file test)
            // If the last file in a test uses require or a triple slash reference we'll assume all other files will be brought in via references,
            // otherwise, assume all files are just meant to be in the same compilation session without explicit references to one another.

            if (testCaseContent.settings.noImplicitReferences || /require\(/.test(lastUnit.content) || /reference\spath/.test(lastUnit.content)) {
                toBeCompiled.push(this.createHarnessTestFile(lastUnit));
                units.forEach(unit => {
                    if (unit.name !== lastUnit.name) {
                        otherFiles.push(this.createHarnessTestFile(unit));
                    }
                });
            }
            else {
                toBeCompiled = units.map(unit => {
                    return this.createHarnessTestFile(unit);
                });
            }
        }

        if (tsConfigOptions && tsConfigOptions.configFilePath !== undefined) {
            tsConfigOptions.configFile!.fileName = tsConfigOptions.configFilePath;
        }

        const { fileSystem, compilerOptions, programFileNames, typeScriptVersion } = Compiler.prepareEnvironment(
            toBeCompiled,
            otherFiles,
            harnessSettings,
            tsConfigOptions,
            harnessSettings.currentDirectory,
            testCaseContent.symlinks,
        );

        return {
            fileName,
            justName,
            toBeCompiled,
            programFileNames,
            fileSystem,
            otherFiles,
            tsConfigFiles,
            compilerOptions,
            configuredName,
            hasNonDtsFiles,
            testCaseContent,
            configurationOverrides,
            typeScriptVersion,
            symlinks: testCaseContent.symlinks,
            allFiles: ts.concatenate(toBeCompiled, otherFiles),
        };
    }

    public static getConfigurations(file: string): CompilerFileBasedTest {
        // also see `parseCompilerTestConfigurations` in tests/webTestServer.ts
        const content = IO.readFile(file)!;
        const settings = TestCaseParser.extractCompilerSettings(content);
        const configurations = getFileBasedTestConfigurations(settings, CompilerTest.varyBy);
        return { file, configurations, content };
    }

    protected static createHarnessTestFile(unit: TestCaseParser.TestUnitData): Compiler.TestFile {
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

class IsolatedDeclarationTest extends CompilerTestBase {
    protected dteDiagnostics: readonly ts.Diagnostic[];
    protected tscNonIsolatedDeclarationsErrors: readonly ts.Diagnostic[];
    protected isOutputEquivalent: boolean;
    protected dteDtsFiles: Compiler.TestFile[];
    protected tscDtsFiles: Compiler.TestFile[];
    protected dteDtsMapFiles: Compiler.TestFile[];
    protected tscDtsMapFiles: Compiler.TestFile[];
    protected tscIsolatedDeclarationsErrors: readonly ts.Diagnostic[];
    protected isDiagnosticEquivalent: boolean;
    protected isOutputMapEquivalent: boolean;

    static transformEnvironment(compilerEnvironment: CompilerTestEnvironment): CompilerTestEnvironment | undefined {
        const options = compilerEnvironment.compilerOptions;
        // Exclude tests some tests
        // - those explicitly not opting into isolatedDeclarations
        // - those that do not usually emit output anyway
        if (options.isolatedDeclarations === false || options.noEmit || options.noTypesAndSymbols) {
            return undefined;
        }
        const clonedOptions: ts.CompilerOptions & Compiler.HarnessOptions = ts.cloneCompilerOptions(compilerEnvironment.compilerOptions);
        clonedOptions.declaration = true;
        if (clonedOptions.isolatedDeclarations === undefined) {
            clonedOptions.isolatedDeclarations = true;
        }
        clonedOptions.allowJs = false;
        clonedOptions.checkJs = false;
        clonedOptions.skipLibCheck = true;
        clonedOptions.forceDtsEmit = true;
        delete clonedOptions.outFile;
        delete clonedOptions.out;
        delete clonedOptions.declarationMap;

        const clonedSettings: TestCaseParser.CompilerSettings = {
            ...compilerEnvironment.testCaseContent.settings,
            allowJS: "false",
            checkJS: "false",
            declaration: "true",
            isolatedDeclarations: "true",
            forceDtsEmit: "true",
            skipLibCheck: "true",
        };
        delete clonedSettings.outFile;
        delete clonedSettings.declarationMap;
        delete clonedSettings.outfile;
        delete clonedSettings.out;

        return {
            ...compilerEnvironment,
            fileSystem: compilerEnvironment.fileSystem.shadow(),
            testCaseContent: {
                ...compilerEnvironment.testCaseContent,
                settings: clonedSettings,
            },
            compilerOptions: clonedOptions,
        };
    }
    constructor(compilerEnvironment: CompilerTestEnvironment) {
        super(compilerEnvironment);

        const tscResult = this.result;
        const fileCompare = (a: Compiler.TestFile, b: Compiler.TestFile) => this.result.host.vfs.stringComparer(a.unitName, b.unitName);
        const currentDirectory = this.harnessSettings.currentDirectory ?? vfs.srcFolder;
        const dteResult = Compiler.compileDeclarationFilesWithIsolatedEmitter(
            this.toBeCompiled,
            this.otherFiles,
            tscResult.host,
            this.options,
            currentDirectory,
        );
        this.dteDiagnostics = ts.sortAndDeduplicateDiagnostics(dteResult.diagnostics);
        this.dteDtsFiles = [...ts.mapDefinedIterator(dteResult.dts, ([, f]) => f.asTestFile())];
        this.dteDtsFiles.sort(fileCompare);
        this.dteDtsMapFiles = [...ts.mapDefinedIterator(dteResult.dtsMap, ([, f]) => f.asTestFile())];
        this.dteDtsMapFiles.sort(fileCompare);

        // With force get JSON definition files we need to ignore
        this.tscDtsFiles = [...ts.mapDefinedIterator(tscResult.dts, ([name, f]) => name.endsWith(".d.json.ts") ? undefined : f.asTestFile())];

        this.tscDtsFiles.sort(fileCompare);
        this.tscDtsMapFiles = ts.mapDefined(this.tscDtsFiles, f => tscResult.maps.get(f.unitName + ".map")?.asTestFile());
        this.tscDtsMapFiles.sort(fileCompare);

        const tscDiagnostics = ts.sortAndDeduplicateDiagnostics(this.result.diagnostics);
        this.tscNonIsolatedDeclarationsErrors = tscDiagnostics.filter(d => !IsolatedDeclarationTest.dteDiagnosticErrors.has(d.code));
        this.tscIsolatedDeclarationsErrors = tscDiagnostics.filter(d => IsolatedDeclarationTest.dteDiagnosticErrors.has(d.code));

        // If DTE is the same as TS output we don't need to do any extra checks.
        this.isOutputEquivalent = this.dteDtsFiles.length === this.tscDtsFiles.length && this.dteDtsFiles
            .every((dteDecl, index) => {
                const tscDecl = this.tscDtsFiles[index];
                return tscDecl.unitName === dteDecl.unitName && dteDecl.content === tscDecl.content;
            });

        this.isOutputMapEquivalent = this.dteDtsMapFiles.length === this.tscDtsMapFiles.length && this.dteDtsMapFiles
            .every((dteDecl, index) => {
                const tscDecl = this.tscDtsMapFiles[index];
                return tscDecl.unitName === dteDecl.unitName && dteDecl.content === tscDecl.content;
            });

        this.isDiagnosticEquivalent = this.tscIsolatedDeclarationsErrors.length === this.dteDiagnostics.length &&
            this.dteDiagnostics.every((dteDiag, index) => {
                const tscDiag = this.tscIsolatedDeclarationsErrors[index];
                return tscDiag.code === dteDiag.code
                    && tscDiag.file?.fileName === dteDiag.file?.fileName
                    && tscDiag.start === dteDiag.start
                    && tscDiag.length === dteDiag.length;
            });
    }
    private static dteDiagnosticErrors = new Set([
        ts.Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.code,
        ts.Diagnostics.Declaration_emit_for_this_file_requires_adding_a_type_reference_directive_Add_a_type_reference_directive_to_0_to_unblock_declaration_emit.code,
        ts.Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function.code,
        ts.Diagnostics.Reference_directives_are_not_supported_in_isolated_declaration_mode.code,
        ts.Diagnostics.Declaration_emit_for_class_expressions_are_not_supported_with_isolatedDeclarations.code,
    ]);
    protected get baselinePath() {
        return "isolated-declarations/original";
    }
    protected get diffReason() {
        return this.harnessSettings.isolatedDeclarationDiffReason;
    }
    verifyDteOutput() {
        if (this.isOutputEquivalent && this.isDiagnosticEquivalent) return;
        Compiler.doDeclarationBaseline(
            this.configuredName,
            this.baselinePath + "/dte",
            this.fileName,
            this.dteDtsFiles,
            ts.concatenate(this.dteDiagnostics, this.tscNonIsolatedDeclarationsErrors),
            this.allFiles,
            this.options.pretty,
        );
    }
    verifyTscOutput() {
        if (this.isOutputEquivalent && this.isDiagnosticEquivalent) return;
        Compiler.doDeclarationBaseline(
            this.configuredName,
            this.baselinePath + "/tsc",
            this.fileName,
            this.tscDtsFiles,
            ts.concatenate(this.tscIsolatedDeclarationsErrors, this.tscNonIsolatedDeclarationsErrors),
            this.allFiles,
            this.options.pretty,
        );
    }
    verifyDteMapOutput() {
        // No point to check maps if output is different
        if (this.isOutputMapEquivalent || !this.isOutputEquivalent) return;
        Compiler.doDeclarationMapBaseline(
            this.configuredName,
            this.baselinePath + "/dte",
            this.fileName,
            this.dteDtsFiles,
            this.dteDtsMapFiles,
            this.allFiles,
        );
    }
    verifyTscMapOutput() {
        // No point to check maps if output is different
        if (this.isOutputMapEquivalent || !this.isOutputEquivalent) return;
        Compiler.doDeclarationMapBaseline(
            this.configuredName,
            this.baselinePath + "/tsc",
            this.fileName,
            this.tscDtsFiles,
            this.tscDtsMapFiles,
            this.allFiles,
        );
    }

    verifyDiff() {
        if (this.isOutputEquivalent && this.isDiagnosticEquivalent) return;
        Compiler.doDeclarationDiffBaseline(
            this.configuredName,
            this.baselinePath + "/diff",
            this.fileName,
            this.dteDtsFiles,
            ts.concatenate(this.dteDiagnostics, this.tscNonIsolatedDeclarationsErrors),
            this.tscDtsFiles,
            ts.concatenate(this.tscIsolatedDeclarationsErrors, this.tscNonIsolatedDeclarationsErrors),
            this.allFiles,
            this.options.pretty,
            this.diffReason,
        );
    }

    verifyMapDiff() {
        // No point to check maps if output is different
        if (this.isOutputMapEquivalent || !this.isOutputEquivalent) return;
        Compiler.doDeclarationMapDiffBaseline(
            this.configuredName,
            this.baselinePath + "/diff",
            this.fileName,
            this.dteDtsFiles,
            this.dteDtsMapFiles,
            this.tscDtsFiles,
            this.tscDtsMapFiles,
            this.allFiles,
            this.diffReason,
        );
    }
}

class FixedIsolatedDeclarationTest extends IsolatedDeclarationTest {
    static fixTestProject(compilerEnvironment: CompilerTestEnvironment): CompilerTestEnvironment | undefined {
        // Exclude test that disable types and symbols (good proxy for very complex test)
        if (compilerEnvironment.compilerOptions.noTypesAndSymbols) {
            return undefined;
        }
        if (!compilerEnvironment.compilerOptions.declaration) {
            return undefined;
        }

        const env = IsolatedDeclarationTest.transformEnvironment(compilerEnvironment);
        if (!env) {
            return undefined;
        }

        env.compilerOptions.isolatedDeclarations = false;
        env.compilerOptions.declarationMap = true;
        env.compilerOptions.forceDtsEmit = false;

        const autoFixCacheTest = ts.combinePaths("tests/auto-fixed", compilerEnvironment.configuredName);
        const existingTransformedTest = IO.readFile(autoFixCacheTest);
        const hash = ts.sys.createHash!(env.testCaseContent.sourceCode);
        const fixedTest = existingTransformedTest && TestCaseParser.makeUnitsFromTest(existingTransformedTest, compilerEnvironment.fileName);
        let transformSucceeded = true;
        let hasReferenceDirectiveErrors = false;
        if (fixedTest && fixedTest.settings.hash === hash) {
            transformSucceeded = fixedTest.settings.succeeded !== "false";
            hasReferenceDirectiveErrors = fixedTest.settings.hasReferenceDirectiveErrors !== "false";
            if (transformSucceeded) {
                env.allFiles = env.allFiles.map(f => {
                    const testUnit = fixedTest.testUnitData.find(t => t.name === f.unitName);
                    ts.Debug.assert(testUnit, "All files should be in the cached auto fixed version of the test");
                    env.fileSystem.writeFileSync(testUnit.name, testUnit.content);
                    return this.createHarnessTestFile(testUnit);
                });
                env.otherFiles = env.otherFiles.map(o => env.allFiles.find(f => f.unitName === o.unitName)!);
                env.toBeCompiled = env.toBeCompiled.map(o => env.allFiles.find(f => f.unitName === o.unitName)!);
            }
        }
        else {
            const fixerOptions = ts.cloneCompilerOptions(env.compilerOptions);
            fixerOptions.isolatedDeclarations = true;
            const fixResults = fixTestFiles(env.fileSystem, env.programFileNames, fixerOptions);
            let cachedTest = "// @hash: " + hash + "\n";
            if (!fixResults.success) {
                transformSucceeded = false;
                cachedTest += "// @succeeded: false\n";
            }
            else {
                hasReferenceDirectiveErrors = fixResults.unfixedDiagnostics.some(d => FixedIsolatedDeclarationTest.referenceDirectiveErrors.has(d.code));
                cachedTest += "// @hasReferenceDirectiveErrors: " + hasReferenceDirectiveErrors + "\n";
                for (const file of env.allFiles) {
                    cachedTest += "\n// @fileName: " + file.unitName + "\n";
                    const content = env.fileSystem.readFileSync(file.unitName, "utf-8");
                    file.content = content;
                    cachedTest += content;
                }
            }
            IO.writeFile(autoFixCacheTest, cachedTest);
        }
        if (!transformSucceeded || hasReferenceDirectiveErrors) {
            return undefined;
        }
        env.fileSystem.makeReadonly();
        env.fileSystem = env.fileSystem.shadow();
        return env;
    }
    private static referenceDirectiveErrors = new Set([
        ts.Diagnostics.Declaration_emit_for_this_file_requires_adding_a_type_reference_directive_Add_a_type_reference_directive_to_0_to_unblock_declaration_emit.code,
        ts.Diagnostics.Reference_directives_are_not_supported_in_isolated_declaration_mode.code,
    ]);
    constructor(compilerEnvironment: CompilerTestEnvironment) {
        super(compilerEnvironment);

        // Suppress diff for tests with reference directives.
        if (
            this.dteDiagnostics.some(d => d.code === ts.Diagnostics.Reference_directives_are_not_supported_in_isolated_declaration_mode.code)
        ) {
            this.isOutputMapEquivalent = true;
            this.isDiagnosticEquivalent = true;
            this.isOutputEquivalent = true;
        }
    }

    protected override get baselinePath() {
        return "isolated-declarations/auto-fixed";
    }

    protected override get diffReason() {
        return this.harnessSettings.isolatedDeclarationFixedDiffReason;
    }
}
