import { Baseline } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    applyEdit,
    commandLineCallbacks,
    createBaseline,
    TscWatchSystem,
} from "../helpers/baseline.js";
import { compilerOptionsToConfigJson } from "../helpers/contents.js";
import {
    createWatchCompilerHostOfConfigFileForBaseline,
    createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline,
    runWatchBaseline,
    watchBaseline,
} from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: watchAPI:: tsc-watch with custom module resolution", () => {
    it("verify that module resolution with json extension works when returned without extension", () => {
        const configFileJson: any = {
            compilerOptions: { module: "commonjs", resolveJsonModule: true },
            files: ["index.ts"],
        };
        const mainFile: File = {
            path: `/user/username/projects/myproject/index.ts`,
            content: "import settings from './settings.json';",
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText(configFileJson),
        };
        const settingsJson: File = {
            path: `/user/username/projects/myproject/settings.json`,
            content: jsonToReadableText({ content: "Print this" }),
        };
        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [mainFile, config, settingsJson],
            { currentDirectory: "/user/username/projects/myproject" },
        ));
        const host = createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            system: sys,
            cb,
        });
        const parsedCommandResult = ts.parseJsonConfigFileContent(configFileJson, sys, ts.getDirectoryPath(config.path));
        host.resolveModuleNames = (moduleNames, containingFile) =>
            moduleNames.map(m => {
                const result = ts.resolveModuleName(m, containingFile, parsedCommandResult.options, host);
                const resolvedModule = result.resolvedModule!;
                return {
                    resolvedFileName: resolvedModule.resolvedFileName,
                    isExternalLibraryImport: resolvedModule.isExternalLibraryImport,
                    originalFileName: resolvedModule.originalPath,
                };
            });
        const watch = ts.createWatchProgram(host);
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "verify that module resolution with json extension works when returned without extension",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            getPrograms,
            watchOrSolution: watch,
        });
    });

    describe("hasInvalidatedResolutions", () => {
        function verifyWatch(subScenario: string, implementHasInvalidatedResolution: boolean) {
            it(subScenario, () => {
                const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem({
                    [`/user/username/projects/myproject/tsconfig.json`]: jsonToReadableText({
                        compilerOptions: { traceResolution: true, extendedDiagnostics: true },
                        files: ["main.ts"],
                    }),
                    [`/user/username/projects/myproject/main.ts`]: `import { foo } from "./other";`,
                    [`/user/username/projects/myproject/other.d.ts`]: "export function foo(): void;",
                }, { currentDirectory: "/user/username/projects/myproject" }));
                const host = createWatchCompilerHostOfConfigFileForBaseline({
                    configFileName: `/user/username/projects/myproject/tsconfig.json`,
                    system: sys,
                    cb,
                });
                host.resolveModuleNames = (moduleNames, containingFile, _reusedNames, _redirectedReference, options) => moduleNames.map(m => ts.resolveModuleName(m, containingFile, options, host).resolvedModule);
                // Invalidate resolutions only when ts file is created
                if (implementHasInvalidatedResolution) host.hasInvalidatedResolutions = () => sys.fileExists(`/user/username/projects/myproject/other.ts`);
                const watch = ts.createWatchProgram(host);
                runWatchBaseline({
                    scenario: "watchApi",
                    subScenario,
                    commandLineArgs: ["--w"],
                    sys,
                    baseline,
                    getPrograms,
                    edits: [
                        {
                            caption: "write other with same contents",
                            edit: sys => sys.appendFile(`/user/username/projects/myproject/other.d.ts`, ""),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "change other file",
                            edit: sys => sys.appendFile(`/user/username/projects/myproject/other.d.ts`, "export function bar(): void;"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "write other with same contents but write ts file",
                            edit: sys => {
                                sys.appendFile(`/user/username/projects/myproject/other.d.ts`, "");
                                sys.writeFile(`/user/username/projects/myproject/other.ts`, "export function foo() {}");
                            },
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ],
                    watchOrSolution: watch,
                });
            });
        }
        verifyWatch("host implements does not implement hasInvalidatedResolutions", /*implementHasInvalidatedResolution*/ false);
        verifyWatch("host implements hasInvalidatedResolutions", /*implementHasInvalidatedResolution*/ true);
    });
});

describe("unittests:: tscWatch:: watchAPI:: tsc-watch expose error count to watch status reporter", () => {
    it("verify that the error count is correctly passed down to the watch status reporter", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: { module: "commonjs" },
                files: ["index.ts"],
            }),
        };
        const mainFile: File = {
            path: `/user/username/projects/myproject/index.ts`,
            content: "let compiler = new Compiler(); for (let i = 0; j < 5; i++) {}",
        };
        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [mainFile, config],
            { currentDirectory: ts.getDirectoryPath(config.path) },
        ));
        const host = createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            system: sys,
            cb,
        });
        const existing = host.onWatchStatusChange!;
        let watchedErrorCount;
        host.onWatchStatusChange = (diagnostic, newLine, options, errorCount) => {
            existing.call(host, diagnostic, newLine, options, errorCount);
            watchedErrorCount = errorCount;
        };
        const watch = ts.createWatchProgram(host);
        assert.equal(watchedErrorCount, 2, "The error count was expected to be 2 for the file change");
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "verify that the error count is correctly passed down to the watch status reporter",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            getPrograms,
            watchOrSolution: watch,
        });
    });
});

describe("unittests:: tscWatch:: watchAPI:: when watchHost does not implement setTimeout or clearTimeout", () => {
    it("verifies that getProgram gets updated program if new file is added to the program", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const mainFile: File = {
            path: `/user/username/projects/myproject/main.ts`,
            content: "const x = 10;",
        };
        const { sys, baseline, cb, getPrograms } = createBaseline(TestServerHost.createWatchedSystem(
            [config, mainFile],
            { currentDirectory: ts.getDirectoryPath(config.path) },
        ));
        const host = createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            system: sys,
            cb,
        });
        host.setTimeout = undefined;
        host.clearTimeout = undefined;
        const watch = ts.createWatchProgram(host);
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "without timesouts on host program gets updated",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            getPrograms,
            edits: [{
                caption: "Write a file",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/bar.ts`, "const y =10;"),
                timeouts: () => {
                    watch.getProgram();
                },
            }],
            watchOrSolution: watch,
        });
    });
});

describe("unittests:: tscWatch:: watchAPI:: when watchHost can add extraFileExtensions to process", () => {
    it("verifies that extraFileExtensions are supported to get the program with other extensions", () => {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const mainFile: File = {
            path: `/user/username/projects/myproject/main.ts`,
            content: "const x = 10;",
        };
        const otherFile: File = {
            path: `/user/username/projects/myproject/other.vue`,
            content: "",
        };
        const { sys, baseline, cb, getPrograms } = createBaseline(
            TestServerHost.createWatchedSystem(
                [config, mainFile, otherFile],
                { currentDirectory: ts.getDirectoryPath(config.path) },
            ),
        );
        const host = createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            optionsToExtend: { allowNonTsExtensions: true },
            extraFileExtensions: [{ extension: ".vue", isMixedContent: true, scriptKind: ts.ScriptKind.Deferred }],
            system: sys,
            cb,
        });
        const watch = ts.createWatchProgram(host);
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "extraFileExtensions are supported",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            getPrograms,
            edits: [{
                caption: "Write a file",
                edit: sys => sys.writeFile(`/user/username/projects/myproject/other2.vue`, otherFile.content),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            }],
            watchOrSolution: watch,
        });
    });
});

describe("unittests:: tscWatch:: watchAPI:: when watchHost uses createSemanticDiagnosticsBuilderProgram", () => {
    function createSystem(configText: string, mainText: string) {
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: configText,
        };
        const mainFile: File = {
            path: `/user/username/projects/myproject/main.ts`,
            content: mainText,
        };
        const otherFile: File = {
            path: `/user/username/projects/myproject/other.ts`,
            content: "export const y = 10;",
        };
        return {
            ...createBaseline(TestServerHost.createWatchedSystem(
                [config, mainFile, otherFile],
                { currentDirectory: ts.getDirectoryPath(config.path) },
            )),
            config,
            mainFile,
            otherFile,
        };
    }

    function createWatch<T extends ts.BuilderProgram>(
        baseline: string[],
        config: File,
        sys: TscWatchSystem,
        createProgram: ts.CreateProgram<T>,
        optionsToExtend?: ts.CompilerOptions,
    ) {
        const { cb, getPrograms } = commandLineCallbacks(sys);
        baseline.push(`tsc --w${optionsToExtend?.noEmit ? " --noEmit" : ""}`);
        const host = createWatchCompilerHostOfConfigFileForBaseline<T>({
            configFileName: config.path,
            optionsToExtend,
            createProgram,
            system: sys,
            cb,
        });
        const watch = ts.createWatchProgram(host);
        watchBaseline({
            baseline,
            getPrograms,
            oldPrograms: ts.emptyArray,
            sys,
        });
        watch.close();
    }

    function verifyOutputs(baseline: string[], sys: ts.System, emitSys: ts.System) {
        baseline.push("Checking if output is same as EmitAndSemanticDiagnosticsBuilderProgram::");
        for (const output of [`/user/username/projects/myproject/main.js`, `/user/username/projects/myproject/main.d.ts`, `/user/username/projects/myproject/other.js`, `/user/username/projects/myproject/other.d.ts`, `/user/username/projects/myproject/tsconfig.tsbuildinfo`]) {
            baseline.push(`Output file text for ${output} is same:: ${sys.readFile(output) === emitSys.readFile(output)}`);
        }
        baseline.push("");
    }

    function createSystemForBuilderTest(configText: string, mainText: string) {
        const result = createSystem(configText, mainText);
        const { sys: emitSys, baseline: emitBaseline } = createSystem(configText, mainText);
        return { ...result, emitSys, emitBaseline };
    }

    function applyChangeForBuilderTest(
        baseline: string[],
        emitBaseline: string[],
        sys: TscWatchSystem,
        emitSys: TscWatchSystem,
        change: (sys: TscWatchSystem) => void,
        caption: string,
    ) {
        // Change file
        applyEdit(sys, baseline, change, caption);
        applyEdit(emitSys, emitBaseline, change, caption);
    }

    function verifyBuilder<T extends ts.BuilderProgram>(
        baseline: string[],
        emitBaseline: string[],
        config: File,
        sys: TscWatchSystem,
        emitSys: TscWatchSystem,
        createProgram: ts.CreateProgram<T>,
        optionsToExtend?: ts.CompilerOptions,
    ) {
        createWatch(baseline, config, sys, createProgram, optionsToExtend);
        createWatch(emitBaseline, config, emitSys, ts.createEmitAndSemanticDiagnosticsBuilderProgram, optionsToExtend);
        verifyOutputs(baseline, sys, emitSys);
    }

    function verify(outFileOptions: ts.CompilerOptions | undefined) {
        function scenarioName(scenario: string) {
            return `${outFileOptions ? "outFile" : "multiFile"}/${scenario}`;
        }
        function baselineName(baseline: string) {
            return `tscWatch/watchApi/${outFileOptions ? "outFile" : "multiFile"}/${baseline}.js`;
        }
        it(scenarioName("verifies that noEmit is handled on createSemanticDiagnosticsBuilderProgram and typechecking happens only on affected files"), () => {
            const { sys, baseline, cb, getPrograms, config, mainFile } = createSystem("{}", "export const x = 10;");
            const host = createWatchCompilerHostOfConfigFileForBaseline({
                configFileName: config.path,
                optionsToExtend: { noEmit: true, ...outFileOptions },
                createProgram: ts.createSemanticDiagnosticsBuilderProgram,
                system: sys,
                cb,
            });
            const watch = ts.createWatchProgram(host);
            runWatchBaseline({
                scenario: "watchApi",
                subScenario: scenarioName("verifies that noEmit is handled on createSemanticDiagnosticsBuilderProgram"),
                commandLineArgs: ["--w", "--p", config.path],
                sys,
                baseline,
                getPrograms,
                edits: [{
                    caption: "Modify a file",
                    edit: sys => sys.appendFile(mainFile.path, "\n// SomeComment"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                }],
                watchOrSolution: watch,
            });
        });
        describe(scenarioName("noEmit with composite writes the tsbuildinfo with pending affected files correctly"), () => {
            let baseline: string[];
            let emitBaseline: string[];
            before(() => {
                const configText = jsonToReadableText({ compilerOptions: { composite: true, ...outFileOptions ? compilerOptionsToConfigJson(outFileOptions) : undefined } });
                const mainText = "export const x = 10;";
                const result = createSystemForBuilderTest(configText, mainText);
                baseline = result.baseline;
                emitBaseline = result.emitBaseline;
                const { sys, config, mainFile, emitSys } = result;

                // No Emit
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createEmitAndSemanticDiagnosticsBuilderProgram, { noEmit: true });

                // Emit on both sys should result in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createEmitAndSemanticDiagnosticsBuilderProgram);

                // Change file
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.appendFile(mainFile.path, "\n// SomeComment"), "Add comment");

                // Verify noEmit results in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createSemanticDiagnosticsBuilderProgram, { noEmit: true });

                // Emit on both sys should result in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createEmitAndSemanticDiagnosticsBuilderProgram);

                // Change file
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.appendFile(mainFile.path, "\n// SomeComment"), "Add comment");

                // Emit on both the builders should result in same files
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createSemanticDiagnosticsBuilderProgram);
            });
            after(() => {
                baseline = undefined!;
                emitBaseline = undefined!;
            });
            it("noEmit with composite writes the tsbuildinfo with pending affected files correctly", () => {
                Baseline.runBaseline(baselineName("noEmit-with-composite-with-semantic-builder"), baseline.join("\r\n"));
            });
            it("baseline in createEmitAndSemanticDiagnosticsBuilderProgram:: noEmit with composite writes the tsbuildinfo with pending affected files correctly", () => {
                Baseline.runBaseline(baselineName("noEmit-with-composite-with-emit-builder"), emitBaseline.join("\r\n"));
            });
        });

        describe(scenarioName("noEmitOnError with composite writes the tsbuildinfo with pending affected files correctly"), () => {
            let baseline: string[];
            let emitBaseline: string[];
            before(() => {
                const configText = jsonToReadableText({ compilerOptions: { composite: true, noEmitOnError: true, ...outFileOptions ? compilerOptionsToConfigJson(outFileOptions) : undefined } });
                const mainText = "export const x: string = 10;";
                const result = createSystemForBuilderTest(configText, mainText);
                baseline = result.baseline;
                emitBaseline = result.emitBaseline;
                const { sys, config, mainFile, emitSys } = result;

                // Verify noEmit results in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createSemanticDiagnosticsBuilderProgram);

                // Change file
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.appendFile(mainFile.path, "\n// SomeComment"), "Add comment");

                // Verify noEmit results in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createSemanticDiagnosticsBuilderProgram);

                // Fix error
                const fixed = "export const x = 10;";
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.writeFile(mainFile.path, fixed), "Fix error");

                // Emit on both the builders should result in same files
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, ts.createSemanticDiagnosticsBuilderProgram);
            });

            it("noEmitOnError with composite writes the tsbuildinfo with pending affected files correctly", () => {
                Baseline.runBaseline(baselineName("noEmitOnError-with-composite-with-semantic-builder"), baseline.join("\r\n"));
            });
            it("baseline in createEmitAndSemanticDiagnosticsBuilderProgram:: noEmitOnError with composite writes the tsbuildinfo with pending affected files correctly", () => {
                Baseline.runBaseline(baselineName("noEmitOnError-with-composite-with-emit-builder"), emitBaseline.join("\r\n"));
            });
        });

        it(scenarioName("SemanticDiagnosticsBuilderProgram emitDtsOnly does not update affected files pending emit"), () => {
            // Initial
            const { sys, baseline, config, mainFile } = createSystem(jsonToReadableText({ compilerOptions: { composite: true, noEmitOnError: true, ...outFileOptions ? compilerOptionsToConfigJson(outFileOptions) : undefined } }), "export const x: string = 10;");
            createWatch(baseline, config, sys, ts.createSemanticDiagnosticsBuilderProgram);

            // Fix error and emit
            applyEdit(sys, baseline, sys => sys.writeFile(mainFile.path, "export const x = 10;"), "Fix error");

            const { cb, getPrograms } = commandLineCallbacks(sys);
            const reportDiagnostic = ts.createDiagnosticReporter(sys, /*pretty*/ true);
            const reportWatchStatus = ts.createWatchStatusReporter(sys, /*pretty*/ true);
            const host = ts.createWatchCompilerHostOfConfigFile({
                configFileName: config.path,
                createProgram: ts.createSemanticDiagnosticsBuilderProgram,
                system: sys,
                reportDiagnostic,
                reportWatchStatus,
            });
            host.afterProgramCreate = program => {
                const diagnostics = ts.sortAndDeduplicateDiagnostics(program.getSemanticDiagnostics());
                diagnostics.forEach(reportDiagnostic);
                // Buildinfo should still have affectedFilesPendingEmit since we are only emitting dts files
                program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ true);
                reportWatchStatus(
                    ts.createCompilerDiagnostic(ts.getWatchErrorSummaryDiagnosticMessage(diagnostics.length), diagnostics.length),
                    sys.newLine,
                    program.getCompilerOptions(),
                    diagnostics.length,
                );
                cb(program);
            };
            ts.createWatchProgram(host);
            watchBaseline({
                baseline,
                getPrograms,
                oldPrograms: ts.emptyArray,
                sys,
            });
            Baseline.runBaseline(baselineName("semantic-builder-emitOnlyDts"), baseline.join("\r\n"));
        });
    }
    verify(/*outFileOptions*/ undefined);
    verify({ outFile: "../outFile.js", module: ts.ModuleKind.AMD });
});

describe("unittests:: tscWatch:: watchAPI:: when getParsedCommandLine is implemented", () => {
    function setup(useSourceOfProjectReferenceRedirect?: () => boolean) {
        const config1: File = {
            path: `/user/username/projects/myproject/projects/project1/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    module: "none",
                    composite: true,
                },
                exclude: ["temp"],
            }),
        };
        const class1: File = {
            path: `/user/username/projects/myproject/projects/project1/class1.ts`,
            content: `class class1 {}`,
        };
        const class1Dts: File = {
            path: `/user/username/projects/myproject/projects/project1/class1.d.ts`,
            content: `declare class class1 {}`,
        };
        const config2: File = {
            path: `/user/username/projects/myproject/projects/project2/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    module: "none",
                    composite: true,
                },
                references: [
                    { path: "../project1" },
                ],
            }),
        };
        const class2: File = {
            path: `/user/username/projects/myproject/projects/project2/class2.ts`,
            content: `class class2 {}`,
        };
        const system = TestServerHost.createWatchedSystem(
            [config1, class1, class1Dts, config2, class2],
            { currentDirectory: "/user/username/projects/myproject/projects" },
        );
        const baseline = createBaseline(system);
        const compilerHost = createWatchCompilerHostOfConfigFileForBaseline({
            cb: baseline.cb,
            system,
            configFileName: config2.path,
            optionsToExtend: { extendedDiagnostics: true },
        });
        compilerHost.useSourceOfProjectReferenceRedirect = useSourceOfProjectReferenceRedirect;
        const calledGetParsedCommandLine = new Set<string>();
        compilerHost.getParsedCommandLine = fileName => {
            assert.isFalse(calledGetParsedCommandLine.has(fileName), `Already called on ${fileName}`);
            calledGetParsedCommandLine.add(fileName);
            return ts.getParsedCommandLineOfConfigFile(fileName, /*optionsToExtend*/ undefined, {
                useCaseSensitiveFileNames: true,
                fileExists: path => system.fileExists(path),
                readFile: path => system.readFile(path),
                getCurrentDirectory: () => system.getCurrentDirectory(),
                readDirectory: (path, extensions, excludes, includes, depth) => system.readDirectory(path, extensions, excludes, includes, depth),
                onUnRecoverableConfigFileDiagnostic: ts.noop,
            });
        };
        const watch = ts.createWatchProgram(compilerHost);
        return { watch, baseline, config2, calledGetParsedCommandLine };
    }

    it("when new file is added to the referenced project with host implementing getParsedCommandLine", () => {
        const { watch, baseline, config2, calledGetParsedCommandLine } = setup(ts.returnTrue);
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "when new file is added to the referenced project with host implementing getParsedCommandLine",
            commandLineArgs: ["--w", "-p", config2.path, "--extendedDiagnostics"],
            ...baseline,
            edits: [
                {
                    caption: "Add class3 to project1",
                    edit: sys => {
                        calledGetParsedCommandLine.clear();
                        sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.ts`, `class class3 {}`);
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Add excluded file to project1",
                    edit: sys => sys.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                    timeouts: ts.noop,
                },
                {
                    caption: "Add output of class3",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`, `declare class class3 {}`),
                    timeouts: ts.noop,
                },
            ],
            watchOrSolution: watch,
            useSourceOfProjectReferenceRedirect: ts.returnTrue,
        });
    });

    it("when new file is added to the referenced project with host implementing getParsedCommandLine without implementing useSourceOfProjectReferenceRedirect", () => {
        const { watch, baseline, config2, calledGetParsedCommandLine } = setup();
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "when new file is added to the referenced project with host implementing getParsedCommandLine without implementing useSourceOfProjectReferenceRedirect",
            commandLineArgs: ["--w", "-p", config2.path, "--extendedDiagnostics"],
            ...baseline,
            edits: [
                {
                    caption: "Add class3 to project1",
                    edit: sys => {
                        calledGetParsedCommandLine.clear();
                        sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.ts`, `class class3 {}`);
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Add class3 output to project1",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`, `declare class class3 {}`),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Add excluded file to project1",
                    edit: sys => sys.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                    timeouts: ts.noop,
                },
                {
                    caption: "Delete output of class3",
                    edit: sys => sys.deleteFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Add output of class3",
                    edit: sys => sys.writeFile(`/user/username/projects/myproject/projects/project1/class3.d.ts`, `declare class class3 {}`),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
            watchOrSolution: watch,
        });
    });
});

describe("unittests:: tscWatch:: watchAPI:: when builder emit occurs with emitOnlyDtsFiles", () => {
    function verify(subScenario: string, outFile?: string) {
        it(subScenario, () => {
            const system = TestServerHost.createWatchedSystem({
                [`/user/username/projects/myproject/tsconfig.json`]: jsonToReadableText({
                    compilerOptions: { composite: true, noEmitOnError: true, module: "amd", outFile },
                    files: ["a.ts", "b.ts"],
                }),
                [`/user/username/projects/myproject/a.ts`]: "export const x = 10;",
                [`/user/username/projects/myproject/b.ts`]: "export const y: 10 = 20;",
            }, { currentDirectory: "/user/username/projects/myproject" });
            const baseline = createBaseline(system);
            const compilerHost = createWatchCompilerHostOfConfigFileForBaseline({
                cb: baseline.cb,
                system,
                configFileName: `/user/username/projects/myproject/tsconfig.json`,
                optionsToExtend: { extendedDiagnostics: true },
            });
            const originalEmitProgram = compilerHost.afterProgramCreate;
            compilerHost.afterProgramCreate = myAfterProgramCreate;
            let callFullEmit = true;
            const watch = ts.createWatchProgram(compilerHost);
            runWatchBaseline({
                scenario: "watchApi",
                subScenario,
                commandLineArgs: ["--w", "--extendedDiagnostics"],
                ...baseline,
                edits: [
                    {
                        caption: "Fix error but run emit with emitOnlyDts",
                        edit: sys => {
                            sys.writeFile(`/user/username/projects/myproject/b.ts`, `export const y = 10;`);
                            callFullEmit = false;
                        },
                        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                    },
                    {
                        caption: "Emit with emitOnlyDts shouldnt emit anything",
                        edit: () => {
                            const program = watch.getCurrentProgram();
                            program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ true);
                            baseline.cb(program);
                        },
                        timeouts: ts.noop,
                    },
                    {
                        caption: "Emit all files",
                        edit: () => {
                            const program = watch.getCurrentProgram();
                            program.emit();
                            baseline.cb(program);
                        },
                        timeouts: ts.noop,
                    },
                    {
                        caption: "Emit with emitOnlyDts shouldnt emit anything",
                        edit: () => {
                            const program = watch.getCurrentProgram();
                            program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ true);
                            baseline.cb(program);
                        },
                        timeouts: ts.noop,
                    },
                    {
                        caption: "Emit full should not emit anything",
                        edit: () => {
                            const program = watch.getCurrentProgram();
                            program.emit();
                            baseline.cb(program);
                        },
                        timeouts: ts.noop,
                    },
                ],
                watchOrSolution: watch,
            });

            function myAfterProgramCreate(program: ts.EmitAndSemanticDiagnosticsBuilderProgram) {
                if (callFullEmit) {
                    originalEmitProgram!.call(compilerHost, program);
                }
                else {
                    program.getSemanticDiagnostics(); // Get Diagnostics
                    program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ true);
                    baseline.cb(program);
                }
            }
        });
    }
    verify("multiFile/when emitting with emitOnlyDtsFiles");
    verify("outFile/when emitting with emitOnlyDtsFiles", "outFile.js");
});

describe("unittests:: tscWatch:: watchAPI:: when creating program with project references but not config file", () => {
    function setup(libExtends: boolean) {
        const system = TestServerHost.createWatchedSystem({
            "/user/username/projects/project/tsconfig.json": jsonToReadableText({
                compilerOptions: { types: [] },
                files: ["app.ts"],
                references: [{ path: "./lib" }],
            }),
            "/user/username/projects/project/app.ts": dedent`
                import { one } from './lib';
                console.log(one);
            `,
            "/user/username/projects/project/lib/tsconfig.json": jsonToReadableText({
                extends: libExtends ? "./tsconfig.base.json" : undefined,
                compilerOptions: libExtends ? undefined : { composite: true, types: [] },
                files: ["index.ts"],
            }),
            "/user/username/projects/project/lib/tsconfig.base.json": jsonToReadableText({
                compilerOptions: { composite: true, types: [] },
            }),
            "/user/username/projects/project/lib/index.ts": "export const one = 1;",
            "/user/username/projects/project/lib/index.d.ts": "export const one = 1;",
        }, { currentDirectory: "/user/username/projects/project" });
        const baseline = createBaseline(system);
        const commandLine = ts.getParsedCommandLineOfConfigFile(
            "/user/username/projects/project/tsconfig.json",
            { extendedDiagnostics: true },
            {
                useCaseSensitiveFileNames: true,
                fileExists: path => system.fileExists(path),
                readFile: path => system.readFile(path),
                getCurrentDirectory: () => system.getCurrentDirectory(),
                readDirectory: (path, extensions, excludes, includes, depth) => system.readDirectory(path, extensions, excludes, includes, depth),
                onUnRecoverableConfigFileDiagnostic: ts.noop,
            },
        )!;
        const compilerHost = createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline({
            cb: baseline.cb,
            system,
            rootFiles: commandLine.fileNames,
            options: commandLine.options,
            projectReferences: commandLine.projectReferences,
            watchOptions: commandLine.watchOptions,
        });
        const watch = ts.createWatchProgram(compilerHost);
        return { watch, baseline };
    }

    it("when watching referenced project when there is no config file name", () => {
        const { watch, baseline } = setup(/*libExtends*/ false);
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "when watching referenced project when there is no config file name",
            commandLineArgs: ["--w", "-p", ".", "--extendedDiagnostics"],
            ...baseline,
            edits: [
                {
                    caption: "Modify lib tsconfig",
                    edit: sys =>
                        sys.writeFile(
                            `/user/username/projects/project/lib/tsconfig.json`,
                            jsonToReadableText({
                                compilerOptions: { composite: true },
                                files: ["index.ts"],
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
            watchOrSolution: watch,
        });
    });

    it("when watching referenced project with extends when there is no config file name", () => {
        const { watch, baseline } = setup(/*libExtends*/ true);
        runWatchBaseline({
            scenario: "watchApi",
            subScenario: "when watching referenced project with extends when there is no config file name",
            commandLineArgs: ["--w", "-p", ".", "--extendedDiagnostics"],
            ...baseline,
            edits: [
                {
                    caption: "Modify lib tsconfig",
                    edit: sys =>
                        sys.writeFile(
                            `/user/username/projects/project/lib/tsconfig.json`,
                            jsonToReadableText({
                                extends: "./tsconfig.base.json",
                                compilerOptions: { typeRoots: [] },
                                files: ["index.ts"],
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Modify lib extends",
                    edit: sys =>
                        sys.writeFile(
                            `/user/username/projects/project/lib/tsconfig.base.json`,
                            jsonToReadableText({
                                compilerOptions: { composite: true },
                            }),
                        ),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
            watchOrSolution: watch,
        });
    });
});
