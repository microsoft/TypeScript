import * as ts from "../../_namespaces/ts";
import * as Harness from "../../_namespaces/Harness";

describe("unittests:: tsc-watch:: watchAPI:: tsc-watch with custom module resolution", () => {
    it("verify that module resolution with json extension works when returned without extension", () => {
        const configFileJson: any = {
            compilerOptions: { module: "commonjs", resolveJsonModule: true },
            files: ["index.ts"]
        };
        const mainFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/index.ts`,
            content: "import settings from './settings.json';"
        };
        const config: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify(configFileJson)
        };
        const settingsJson: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/settings.json`,
            content: JSON.stringify({ content: "Print this" })
        };
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem(
            [ts.tscWatch.libFile, mainFile, config, settingsJson],
            { currentDirectory: ts.tscWatch.projectRoot }),
        );
        const host = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            system: sys,
            cb,
        });
        const parsedCommandResult = ts.parseJsonConfigFileContent(configFileJson, sys, config.path);
        host.resolveModuleNames = (moduleNames, containingFile) => moduleNames.map(m => {
            const result = ts.resolveModuleName(m, containingFile, parsedCommandResult.options, host);
            const resolvedModule = result.resolvedModule!;
            return {
                resolvedFileName: resolvedModule.resolvedFileName,
                isExternalLibraryImport: resolvedModule.isExternalLibraryImport,
                originalFileName: resolvedModule.originalPath,
            };
        });
        const watch = ts.createWatchProgram(host);
        ts.tscWatch.runWatchBaseline({
            scenario: "watchApi",
            subScenario: "verify that module resolution with json extension works when returned without extension",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: ts.emptyArray,
            watchOrSolution: watch
        });
    });

    describe("hasInvalidatedResolutions", () => {
        function verifyWatch(subScenario: string, implementHasInvalidatedResolution: boolean) {
            it(subScenario, () => {
                const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem({
                    [`${ts.tscWatch.projectRoot}/tsconfig.json`]: JSON.stringify({
                        compilerOptions: { traceResolution: true, extendedDiagnostics: true },
                        files: ["main.ts"]
                    }),
                    [`${ts.tscWatch.projectRoot}/main.ts`]: `import { foo } from "./other";`,
                    [`${ts.tscWatch.projectRoot}/other.d.ts`]: "export function foo(): void;",
                    [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
                }, { currentDirectory: ts.tscWatch.projectRoot }));
                const host = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
                    configFileName: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                    system: sys,
                    cb,
                });
                host.resolveModuleNames = (moduleNames, containingFile, _reusedNames, _redirectedReference, options) =>
                    moduleNames.map(m => ts.resolveModuleName(m, containingFile, options, host).resolvedModule);
                // Invalidate resolutions only when ts file is created
                if (implementHasInvalidatedResolution) host.hasInvalidatedResolutions = () => sys.fileExists(`${ts.tscWatch.projectRoot}/other.ts`);
                const watch = ts.createWatchProgram(host);
                ts.tscWatch.runWatchBaseline({
                    scenario: "watchApi",
                    subScenario,
                    commandLineArgs: ["--w"],
                    sys,
                    baseline,
                    oldSnap,
                    getPrograms,
                    changes: [
                        {
                            caption: "write other with same contents",
                            change: sys => sys.appendFile(`${ts.tscWatch.projectRoot}/other.d.ts`, ""),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "change other file",
                            change: sys => sys.appendFile(`${ts.tscWatch.projectRoot}/other.d.ts`, "export function bar(): void;"),
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                        {
                            caption: "write other with same contents but write ts file",
                            change: sys => {
                                sys.appendFile(`${ts.tscWatch.projectRoot}/other.d.ts`, "");
                                sys.writeFile(`${ts.tscWatch.projectRoot}/other.ts`, "export function foo() {}");
                            },
                            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                        },
                    ],
                    watchOrSolution: watch
                });
            });
        }
        verifyWatch("host implements does not implement hasInvalidatedResolutions", /*implementHasInvalidatedResolution*/ false);
        verifyWatch("host implements hasInvalidatedResolutions", /*implementHasInvalidatedResolution*/ true);
    });
});

describe("unittests:: tsc-watch:: watchAPI:: tsc-watch expose error count to watch status reporter", () => {
    it("verify that the error count is correctly passed down to the watch status reporter", () => {
        const config: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: { module: "commonjs" },
                files: ["index.ts"]
            })
        };
        const mainFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/index.ts`,
            content: "let compiler = new Compiler(); for (let i = 0; j < 5; i++) {}"
        };
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem(
            [ts.tscWatch.libFile, mainFile, config],
            { currentDirectory: ts.tscWatch.projectRoot }),
        );
        const host = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
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
        ts.tscWatch.runWatchBaseline({
            scenario: "watchApi",
            subScenario: "verify that the error count is correctly passed down to the watch status reporter",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: ts.emptyArray,
            watchOrSolution: watch
        });
    });
});

describe("unittests:: tsc-watch:: watchAPI:: when watchHost does not implement setTimeout or clearTimeout", () => {
    it("verifies that getProgram gets updated program if new file is added to the program", () => {
        const config: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const mainFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/main.ts`,
            content: "const x = 10;"
        };
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem([config, mainFile, ts.tscWatch.libFile]));
        const host = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            system: sys,
            cb,
        });
        host.setTimeout = undefined;
        host.clearTimeout = undefined;
        const watch = ts.createWatchProgram(host);
        ts.tscWatch.runWatchBaseline({
            scenario: "watchApi",
            subScenario: "without timesouts on host program gets updated",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: [{
                caption: "Write a file",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/bar.ts`, "const y =10;"),
                timeouts: sys => {
                    sys.checkTimeoutQueueLength(0);
                    watch.getProgram();
                }
            }],
            watchOrSolution: watch
        });
    });
});

describe("unittests:: tsc-watch:: watchAPI:: when watchHost can add extraFileExtensions to process", () => {
    it("verifies that extraFileExtensions are supported to get the program with other extensions", () => {
        const config: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const mainFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/main.ts`,
            content: "const x = 10;"
        };
        const otherFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/other.vue`,
            content: ""
        };
        const { sys, baseline, oldSnap, cb, getPrograms } = ts.tscWatch.createBaseline(
            ts.tscWatch.createWatchedSystem([config, mainFile, otherFile, ts.tscWatch.libFile])
        );
        const host = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            optionsToExtend: { allowNonTsExtensions: true },
            extraFileExtensions: [{ extension: ".vue", isMixedContent: true, scriptKind: ts.ScriptKind.Deferred }],
            system: sys,
            cb,
        });
        const watch = ts.createWatchProgram(host);
        ts.tscWatch.runWatchBaseline({
            scenario: "watchApi",
            subScenario: "extraFileExtensions are supported",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: [{
                caption: "Write a file",
                change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/other2.vue`, otherFile.content),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }],
            watchOrSolution: watch
        });
    });
});

describe("unittests:: tsc-watch:: watchAPI:: when watchHost uses createSemanticDiagnosticsBuilderProgram", () => {
    function createSystem(configText: string, mainText: string) {
        const config: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: configText
        };
        const mainFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/main.ts`,
            content: mainText
        };
        const otherFile: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/other.ts`,
            content: "export const y = 10;"
        };
        return {
            ...ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem([config, mainFile, otherFile, ts.tscWatch.libFile])),
            config,
            mainFile,
            otherFile,
        };
    }

    function createWatch<T extends ts.BuilderProgram>(
        baseline: string[],
        config: ts.tscWatch.File,
        sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles,
        createProgram: ts.CreateProgram<T>,
        optionsToExtend?: ts.CompilerOptions,
    ) {
        const { cb, getPrograms } = ts.commandLineCallbacks(sys);
        baseline.push(`tsc --w${optionsToExtend?.noEmit ? " --noEmit" : ""}`);
        const oldSnap = sys.snap();
        const host = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline<T>({
            configFileName: config.path,
            optionsToExtend,
            createProgram,
            system: sys,
            cb,
        });
        const watch = ts.createWatchProgram(host);
        ts.tscWatch.watchBaseline({
            baseline,
            getPrograms,
            oldPrograms: ts.emptyArray,
            sys,
            oldSnap,
        });
        watch.close();
    }

    function verifyOutputs(baseline: string[], sys: ts.System, emitSys: ts.System) {
        baseline.push("Checking if output is same as EmitAndSemanticDiagnosticsBuilderProgram::");
        for (const output of [`${ts.tscWatch.projectRoot}/main.js`, `${ts.tscWatch.projectRoot}/main.d.ts`, `${ts.tscWatch.projectRoot}/other.js`, `${ts.tscWatch.projectRoot}/other.d.ts`, `${ts.tscWatch.projectRoot}/tsconfig.tsbuildinfo`]) {
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
        sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles,
        emitSys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles,
        change: (sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles) => void,
        caption: string
    ) {
        // Change file
        ts.tscWatch.applyChange(sys, baseline, change, caption);
        ts.tscWatch.applyChange(emitSys, emitBaseline, change, caption);
    }

    function verifyBuilder<T extends ts.BuilderProgram>(
        baseline: string[],
        emitBaseline: string[],
        config: ts.tscWatch.File,
        sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles,
        emitSys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles,
        createProgram: ts.CreateProgram<T>,
        optionsToExtend?: ts.CompilerOptions) {
        createWatch(baseline, config, sys, createProgram, optionsToExtend);
        createWatch(emitBaseline, config, emitSys, ts.createEmitAndSemanticDiagnosticsBuilderProgram, optionsToExtend);
        verifyOutputs(baseline, sys, emitSys);
    }

    it("verifies that noEmit is handled on createSemanticDiagnosticsBuilderProgram and typechecking happens only on affected files", () => {
        const { sys, baseline, oldSnap, cb, getPrograms, config, mainFile } = createSystem("{}", "export const x = 10;");
        const host = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config.path,
            optionsToExtend: { noEmit: true },
            createProgram: ts.createSemanticDiagnosticsBuilderProgram,
            system: sys,
            cb,
        });
        const watch = ts.createWatchProgram(host);
        ts.tscWatch.runWatchBaseline({
            scenario: "watchApi",
            subScenario: "verifies that noEmit is handled on createSemanticDiagnosticsBuilderProgram",
            commandLineArgs: ["--w", "--p", config.path],
            sys,
            baseline,
            oldSnap,
            getPrograms,
            changes: [{
                caption: "Modify a file",
                change: sys => sys.appendFile(mainFile.path, "\n// SomeComment"),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }],
            watchOrSolution: watch
        });
    });

    describe("noEmit with composite writes the tsbuildinfo with pending affected files correctly", () => {
        let baseline: string[];
        let emitBaseline: string[];
        before(() => {
            const configText = JSON.stringify({ compilerOptions: { composite: true } });
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
            Harness.Baseline.runBaseline(`tscWatch/watchApi/noEmit-with-composite-with-semantic-builder.js`, baseline.join("\r\n"));
        });
        it("baseline in createEmitAndSemanticDiagnosticsBuilderProgram:: noEmit with composite writes the tsbuildinfo with pending affected files correctly", () => {
            Harness.Baseline.runBaseline(`tscWatch/watchApi/noEmit-with-composite-with-emit-builder.js`, emitBaseline.join("\r\n"));
        });
    });

    describe("noEmitOnError with composite writes the tsbuildinfo with pending affected files correctly", () => {
        let baseline: string[];
        let emitBaseline: string[];
        before(() => {
            const configText = JSON.stringify({ compilerOptions: { composite: true, noEmitOnError: true } });
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
            Harness.Baseline.runBaseline(`tscWatch/watchApi/noEmitOnError-with-composite-with-semantic-builder.js`, baseline.join("\r\n"));
        });
        it("baseline in createEmitAndSemanticDiagnosticsBuilderProgram:: noEmitOnError with composite writes the tsbuildinfo with pending affected files correctly", () => {
            Harness.Baseline.runBaseline(`tscWatch/watchApi/noEmitOnError-with-composite-with-emit-builder.js`, emitBaseline.join("\r\n"));
        });
    });

    it("SemanticDiagnosticsBuilderProgram emitDtsOnly does not update affected files pending emit", () => {
        // Initial
        const { sys, baseline, config, mainFile } = createSystem(JSON.stringify({ compilerOptions: { composite: true, noEmitOnError: true } }), "export const x: string = 10;");
        createWatch(baseline, config, sys, ts.createSemanticDiagnosticsBuilderProgram);

        // Fix error and emit
        ts.tscWatch.applyChange(sys, baseline, sys => sys.writeFile(mainFile.path, "export const x = 10;"), "Fix error");

        const { cb, getPrograms } = ts.commandLineCallbacks(sys);
        const oldSnap = sys.snap();
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
            program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDts*/ true);
            reportWatchStatus(
                ts.createCompilerDiagnostic(ts.getWatchErrorSummaryDiagnosticMessage(diagnostics.length), diagnostics.length),
                sys.newLine,
                program.getCompilerOptions(),
                diagnostics.length
            );
            cb(program);
        };
        ts.createWatchProgram(host);
        ts.tscWatch.watchBaseline({
            baseline,
            getPrograms,
            oldPrograms: ts.emptyArray,
            sys,
            oldSnap,
        });
        Harness.Baseline.runBaseline(`tscWatch/watchApi/semantic-builder-emitOnlyDts.js`, baseline.join("\r\n"));
    });
});

describe("unittests:: tsc-watch:: watchAPI:: when getParsedCommandLine is implemented", () => {
    function setup(useSourceOfProjectReferenceRedirect?: () => boolean) {
        const config1: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/projects/project1/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    module: "none",
                    composite: true
                },
                exclude: ["temp"]
            })
        };
        const class1: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/projects/project1/class1.ts`,
            content: `class class1 {}`
        };
        const class1Dts: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/projects/project1/class1.d.ts`,
            content: `declare class class1 {}`
        };
        const config2: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/projects/project2/tsconfig.json`,
            content: JSON.stringify({
                compilerOptions: {
                    module: "none",
                    composite: true
                },
                references: [
                    { path: "../project1" }
                ]
            })
        };
        const class2: ts.tscWatch.File = {
            path: `${ts.tscWatch.projectRoot}/projects/project2/class2.ts`,
            content: `class class2 {}`
        };
        const system = ts.tscWatch.createWatchedSystem([config1, class1, class1Dts, config2, class2, ts.tscWatch.libFile]);
        const baseline = ts.tscWatch.createBaseline(system);
        const compilerHost = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
            cb: baseline.cb,
            system,
            configFileName: config2.path,
            optionsToExtend: { extendedDiagnostics: true }
        });
        compilerHost.useSourceOfProjectReferenceRedirect = useSourceOfProjectReferenceRedirect;
        const calledGetParsedCommandLine = new ts.Set<string>();
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
        ts.tscWatch.runWatchBaseline({
            scenario: "watchApi",
            subScenario: "when new file is added to the referenced project with host implementing getParsedCommandLine",
            commandLineArgs: ["--w", "-p", config2.path, "--extendedDiagnostics"],
            ...baseline,
            changes: [
                {
                    caption: "Add class3 to project1",
                    change: sys => {
                        calledGetParsedCommandLine.clear();
                        sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.ts`, `class class3 {}`);
                    },
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "Add excluded file to project1",
                    change: sys => sys.ensureFileOrFolder({ path: `${ts.tscWatch.projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                    timeouts: sys => sys.checkTimeoutQueueLength(0),
                },
                {
                    caption: "Add output of class3",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                    timeouts: sys => sys.checkTimeoutQueueLength(0),
                },
            ],
            watchOrSolution: watch
        });
    });

    it("when new file is added to the referenced project with host implementing getParsedCommandLine without implementing useSourceOfProjectReferenceRedirect", () => {
        const { watch, baseline, config2, calledGetParsedCommandLine } = setup();
        ts.tscWatch.runWatchBaseline({
            scenario: "watchApi",
            subScenario: "when new file is added to the referenced project with host implementing getParsedCommandLine without implementing useSourceOfProjectReferenceRedirect",
            commandLineArgs: ["--w", "-p", config2.path, "--extendedDiagnostics"],
            ...baseline,
            changes: [
                {
                    caption: "Add class3 to project1",
                    change: sys => {
                        calledGetParsedCommandLine.clear();
                        sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.ts`, `class class3 {}`);
                    },
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "Add class3 output to project1",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "Add excluded file to project1",
                    change: sys => sys.ensureFileOrFolder({ path: `${ts.tscWatch.projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                    timeouts: sys => sys.checkTimeoutQueueLength(0),
                },
                {
                    caption: "Delete output of class3",
                    change: sys => sys.deleteFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.d.ts`),
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                },
                {
                    caption: "Add output of class3",
                    change: sys => sys.writeFile(`${ts.tscWatch.projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                },
            ],
            watchOrSolution: watch
        });
    });
});

describe("unittests:: tsc-watch:: watchAPI:: when builder emit occurs with emitOnlyDtsFiles", () => {
    function verify(subScenario: string, outFile?: string) {
        it(subScenario, () => {
            const system = ts.tscWatch.createWatchedSystem({
                [`${ts.tscWatch.projectRoot}/tsconfig.json`]: JSON.stringify({
                    compilerOptions: { composite: true, noEmitOnError: true, module: "amd", outFile },
                    files: ["a.ts", "b.ts"],
                }),
                [`${ts.tscWatch.projectRoot}/a.ts`]: "export const x = 10;",
                [`${ts.tscWatch.projectRoot}/b.ts`]: "export const y: 10 = 20;",
                [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
            }, { currentDirectory: ts.tscWatch.projectRoot });
            const baseline = ts.tscWatch.createBaseline(system);
            const compilerHost = ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
                cb: baseline.cb,
                system,
                configFileName: `${ts.tscWatch.projectRoot}/tsconfig.json`,
                optionsToExtend: { extendedDiagnostics: true }
            });
            const originalEmitProgram = compilerHost.afterProgramCreate;
            compilerHost.afterProgramCreate = myAfterProgramCreate;
            let callFullEmit = true;
            const watch = ts.createWatchProgram(compilerHost);
            ts.tscWatch.runWatchBaseline({
                scenario: "watchApi",
                subScenario,
                commandLineArgs: ["--w", "--extendedDiagnostics"],
                ...baseline,
                changes: [
                    {
                        caption: "Fix error but run emit with emitOnlyDts",
                        change: sys => {
                            sys.writeFile(`${ts.tscWatch.projectRoot}/b.ts`, `export const y = 10;`);
                            callFullEmit = false;
                        },
                        timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                    },
                    {
                        caption: "Emit with emitOnlyDts shouldnt emit anything",
                        change: () => {
                            const program = watch.getCurrentProgram();
                            program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ true);
                            baseline.cb(program);
                        },
                        timeouts: sys => sys.checkTimeoutQueueLength(0),
                    },
                    {
                        caption: "Emit all files",
                        change: () => {
                            const program = watch.getCurrentProgram();
                            program.emit();
                            baseline.cb(program);
                        },
                        timeouts: sys => sys.checkTimeoutQueueLength(0),
                    },
                    {
                        caption: "Emit with emitOnlyDts shouldnt emit anything",
                        change: () => {
                            const program = watch.getCurrentProgram();
                            program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ true);
                            baseline.cb(program);
                        },
                        timeouts: sys => sys.checkTimeoutQueueLength(0),
                    },
                    {
                        caption: "Emit full should not emit anything",
                        change: () => {
                            const program = watch.getCurrentProgram();
                            program.emit();
                            baseline.cb(program);
                        },
                        timeouts: sys => sys.checkTimeoutQueueLength(0),
                    },
                ],
                watchOrSolution: watch
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
    verify("when emitting with emitOnlyDtsFiles");
    verify("when emitting with emitOnlyDtsFiles with outFile", "outFile.js");
});
