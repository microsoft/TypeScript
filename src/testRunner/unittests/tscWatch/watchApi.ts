namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: watchAPI:: tsc-watch with custom module resolution", () => {
        const configFileJson: any = {
            compilerOptions: { module: "commonjs", resolveJsonModule: true },
            files: ["index.ts"]
        };
        const mainFile: File = {
            path: `${projectRoot}/index.ts`,
            content: "import settings from './settings.json';"
        };
        const config: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: JSON.stringify(configFileJson)
        };
        const settingsJson: File = {
            path: `${projectRoot}/settings.json`,
            content: JSON.stringify({ content: "Print this" })
        };

        it("verify that module resolution with json extension works when returned without extension", () => {
            const { sys, baseline, oldSnap, cb, getPrograms } = createBaseline(createWatchedSystem(
                [libFile, mainFile, config, settingsJson],
                { currentDirectory: projectRoot }),
            );
            const host = createWatchCompilerHostOfConfigFileForBaseline({
                configFileName: config.path,
                system: sys,
                cb,
            });
            const parsedCommandResult = parseJsonConfigFileContent(configFileJson, sys, config.path);
            host.resolveModuleNames = (moduleNames, containingFile) => moduleNames.map(m => {
                const result = resolveModuleName(m, containingFile, parsedCommandResult.options, host);
                const resolvedModule = result.resolvedModule!;
                return {
                    resolvedFileName: resolvedModule.resolvedFileName,
                    isExternalLibraryImport: resolvedModule.isExternalLibraryImport,
                    originalFileName: resolvedModule.originalPath,
                };
            });
            const watch = createWatchProgram(host);
            runWatchBaseline({
                scenario: "watchApi",
                subScenario: "verify that module resolution with json extension works when returned without extension",
                commandLineArgs: ["--w", "--p", config.path],
                sys,
                baseline,
                oldSnap,
                getPrograms,
                changes: emptyArray,
                watchOrSolution: watch
            });
        });
    });

    describe("unittests:: tsc-watch:: watchAPI:: tsc-watch expose error count to watch status reporter", () => {
        it("verify that the error count is correctly passed down to the watch status reporter", () => {
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { module: "commonjs" },
                    files: ["index.ts"]
                })
            };
            const mainFile: File = {
                path: `${projectRoot}/index.ts`,
                content: "let compiler = new Compiler(); for (let i = 0; j < 5; i++) {}"
            };
            const { sys, baseline, oldSnap, cb, getPrograms } = createBaseline(createWatchedSystem(
                [libFile, mainFile, config],
                { currentDirectory: projectRoot }),
            );
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
            const watch = createWatchProgram(host);
            assert.equal(watchedErrorCount, 2, "The error count was expected to be 2 for the file change");
            runWatchBaseline({
                scenario: "watchApi",
                subScenario: "verify that the error count is correctly passed down to the watch status reporter",
                commandLineArgs: ["--w", "--p", config.path],
                sys,
                baseline,
                oldSnap,
                getPrograms,
                changes: emptyArray,
                watchOrSolution: watch
            });
        });
    });

    describe("unittests:: tsc-watch:: watchAPI:: when watchHost does not implement setTimeout or clearTimeout", () => {
        it("verifies that getProgram gets updated program if new file is added to the program", () => {
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const mainFile: File = {
                path: `${projectRoot}/main.ts`,
                content: "const x = 10;"
            };
            const { sys, baseline, oldSnap, cb, getPrograms } = createBaseline(createWatchedSystem([config, mainFile, libFile]));
            const host = createWatchCompilerHostOfConfigFileForBaseline({
                configFileName: config.path,
                system: sys,
                cb,
            });
            host.setTimeout = undefined;
            host.clearTimeout = undefined;
            const watch = createWatchProgram(host);
            runWatchBaseline({
                scenario: "watchApi",
                subScenario: "without timesouts on host program gets updated",
                commandLineArgs: ["--w", "--p", config.path],
                sys,
                baseline,
                oldSnap,
                getPrograms,
                changes: [{
                    caption: "Write a file",
                    change: sys => sys.writeFile(`${projectRoot}/bar.ts`, "const y =10;"),
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
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: "{}"
            };
            const mainFile: File = {
                path: `${projectRoot}/main.ts`,
                content: "const x = 10;"
            };
            const otherFile: File = {
                path: `${projectRoot}/other.vue`,
                content: ""
            };
            const { sys, baseline, oldSnap, cb, getPrograms } = createBaseline(
                createWatchedSystem([config, mainFile, otherFile, libFile])
            );
            const host = createWatchCompilerHostOfConfigFileForBaseline({
                configFileName: config.path,
                optionsToExtend: { allowNonTsExtensions: true },
                extraFileExtensions: [{ extension: ".vue", isMixedContent: true, scriptKind: ScriptKind.Deferred }],
                system: sys,
                cb,
            });
            const watch = createWatchProgram(host);
            runWatchBaseline({
                scenario: "watchApi",
                subScenario: "extraFileExtensions are supported",
                commandLineArgs: ["--w", "--p", config.path],
                sys,
                baseline,
                oldSnap,
                getPrograms,
                changes: [{
                    caption: "Write a file",
                    change: sys => sys.writeFile(`${projectRoot}/other2.vue`, otherFile.content),
                    timeouts: checkSingleTimeoutQueueLengthAndRun,
                }],
                watchOrSolution: watch
            });
        });
    });

    describe("unittests:: tsc-watch:: watchAPI:: when watchHost uses createSemanticDiagnosticsBuilderProgram", () => {
        function createSystem(configText: string, mainText: string) {
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: configText
            };
            const mainFile: File = {
                path: `${projectRoot}/main.ts`,
                content: mainText
            };
            const otherFile: File = {
                path: `${projectRoot}/other.ts`,
                content: "export const y = 10;"
            };
            return {
                ...createBaseline(createWatchedSystem([config, mainFile, otherFile, libFile])),
                config,
                mainFile,
                otherFile,
            };
        }

        function createWatch<T extends BuilderProgram>(
            baseline: string[],
            config: File,
            sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles,
            createProgram: CreateProgram<T>,
            optionsToExtend?: CompilerOptions,
        ) {
            const { cb, getPrograms } = commandLineCallbacks(sys);
            baseline.push(`tsc --w${optionsToExtend?.noEmit ? " --noEmit" : ""}`);
            const oldSnap = sys.snap();
            const host = createWatchCompilerHostOfConfigFileForBaseline<T>({
                configFileName: config.path,
                optionsToExtend,
                createProgram,
                system: sys,
                cb,
            });
            const watch = createWatchProgram(host);
            watchBaseline({
                baseline,
                getPrograms,
                oldPrograms: emptyArray,
                sys,
                oldSnap,
            });
            watch.close();
        }

        function verifyOutputs(baseline: string[], sys: System, emitSys: System) {
            baseline.push("Checking if output is same as EmitAndSemanticDiagnosticsBuilderProgram::");
            for (const output of [`${projectRoot}/main.js`, `${projectRoot}/main.d.ts`, `${projectRoot}/other.js`, `${projectRoot}/other.d.ts`, `${projectRoot}/tsconfig.tsbuildinfo`]) {
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
            sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles,
            emitSys: TestFSWithWatch.TestServerHostTrackingWrittenFiles,
            change: (sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles) => void,
            caption: string
        ) {
            // Change file
            applyChange(sys, baseline, change, caption);
            applyChange(emitSys, emitBaseline, change, caption);
        }

        function verifyBuilder<T extends BuilderProgram>(
            baseline: string[],
            emitBaseline: string[],
            config: File,
            sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles,
            emitSys: TestFSWithWatch.TestServerHostTrackingWrittenFiles,
            createProgram: CreateProgram<T>,
            optionsToExtend?: CompilerOptions) {
            createWatch(baseline, config, sys, createProgram, optionsToExtend);
            createWatch(emitBaseline, config, emitSys, createEmitAndSemanticDiagnosticsBuilderProgram, optionsToExtend);
            verifyOutputs(baseline, sys, emitSys);
        }

        it("verifies that noEmit is handled on createSemanticDiagnosticsBuilderProgram and typechecking happens only on affected files", () => {
            const { sys, baseline, oldSnap, cb, getPrograms, config, mainFile } = createSystem("{}", "export const x = 10;");
            const host = createWatchCompilerHostOfConfigFileForBaseline({
                configFileName: config.path,
                optionsToExtend: { noEmit: true },
                createProgram: createSemanticDiagnosticsBuilderProgram,
                system: sys,
                cb,
            });
            const watch = createWatchProgram(host);
            runWatchBaseline({
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
                    timeouts: runQueuedTimeoutCallbacks,
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
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createEmitAndSemanticDiagnosticsBuilderProgram, { noEmit: true });

                // Emit on both sys should result in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createEmitAndSemanticDiagnosticsBuilderProgram);

                // Change file
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.appendFile(mainFile.path, "\n// SomeComment"), "Add comment");

                // Verify noEmit results in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createSemanticDiagnosticsBuilderProgram, { noEmit: true });

                // Emit on both sys should result in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createEmitAndSemanticDiagnosticsBuilderProgram);

                // Change file
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.appendFile(mainFile.path, "\n// SomeComment"), "Add comment");

                // Emit on both the builders should result in same files
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createSemanticDiagnosticsBuilderProgram);
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
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createSemanticDiagnosticsBuilderProgram);

                // Change file
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.appendFile(mainFile.path, "\n// SomeComment"), "Add comment");

                // Verify noEmit results in same output
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createSemanticDiagnosticsBuilderProgram);

                // Fix error
                const fixed = "export const x = 10;";
                applyChangeForBuilderTest(baseline, emitBaseline, sys, emitSys, sys => sys.writeFile(mainFile.path, fixed), "Fix error");

                // Emit on both the builders should result in same files
                verifyBuilder(baseline, emitBaseline, config, sys, emitSys, createSemanticDiagnosticsBuilderProgram);
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
            createWatch(baseline, config, sys, createSemanticDiagnosticsBuilderProgram);

            // Fix error and emit
            applyChange(sys, baseline, sys => sys.writeFile(mainFile.path, "export const x = 10;"), "Fix error");

            const { cb, getPrograms } = commandLineCallbacks(sys);
            const oldSnap = sys.snap();
            const reportDiagnostic = createDiagnosticReporter(sys, /*pretty*/ true);
            const reportWatchStatus = createWatchStatusReporter(sys, /*pretty*/ true);
            const host = createWatchCompilerHostOfConfigFile({
                configFileName: config.path,
                createProgram: createSemanticDiagnosticsBuilderProgram,
                system: sys,
                reportDiagnostic,
                reportWatchStatus,
            });
            host.afterProgramCreate = program => {
                const diagnostics = sortAndDeduplicateDiagnostics(program.getSemanticDiagnostics());
                diagnostics.forEach(reportDiagnostic);
                // Buildinfo should still have affectedFilesPendingEmit since we are only emitting dts files
                program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDts*/ true);
                reportWatchStatus(
                    createCompilerDiagnostic(getWatchErrorSummaryDiagnosticMessage(diagnostics.length), diagnostics.length),
                    sys.newLine,
                    program.getCompilerOptions(),
                    diagnostics.length
                );
                cb(program);
            };
            createWatchProgram(host);
            watchBaseline({
                baseline,
                getPrograms,
                oldPrograms: emptyArray,
                sys,
                oldSnap,
            });
            Harness.Baseline.runBaseline(`tscWatch/watchApi/semantic-builder-emitOnlyDts.js`, baseline.join("\r\n"));
        });
    });

    describe("unittests:: tsc-watch:: watchAPI:: when getParsedCommandLine is implemented", () => {
        function setup(useSourceOfProjectReferenceRedirect?: () => boolean) {
            const config1: File = {
                path: `${projectRoot}/projects/project1/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "none",
                        composite: true
                    },
                    exclude: ["temp"]
                })
            };
            const class1: File = {
                path: `${projectRoot}/projects/project1/class1.ts`,
                content: `class class1 {}`
            };
            const class1Dts: File = {
                path: `${projectRoot}/projects/project1/class1.d.ts`,
                content: `declare class class1 {}`
            };
            const config2: File = {
                path: `${projectRoot}/projects/project2/tsconfig.json`,
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
            const class2: File = {
                path: `${projectRoot}/projects/project2/class2.ts`,
                content: `class class2 {}`
            };
            const system = createWatchedSystem([config1, class1, class1Dts, config2, class2, libFile]);
            const baseline = createBaseline(system);
            const compilerHost = createWatchCompilerHostOfConfigFileForBaseline({
                cb: baseline.cb,
                system,
                configFileName: config2.path,
                optionsToExtend: { extendedDiagnostics: true }
            });
            compilerHost.useSourceOfProjectReferenceRedirect = useSourceOfProjectReferenceRedirect;
            const calledGetParsedCommandLine = new Set<string>();
            compilerHost.getParsedCommandLine = fileName => {
                assert.isFalse(calledGetParsedCommandLine.has(fileName), `Already called on ${fileName}`);
                calledGetParsedCommandLine.add(fileName);
                return getParsedCommandLineOfConfigFile(fileName, /*optionsToExtend*/ undefined, {
                    useCaseSensitiveFileNames: true,
                    fileExists: path => system.fileExists(path),
                    readFile: path => system.readFile(path),
                    getCurrentDirectory: () => system.getCurrentDirectory(),
                    readDirectory: (path, extensions, excludes, includes, depth) => system.readDirectory(path, extensions, excludes, includes, depth),
                    onUnRecoverableConfigFileDiagnostic: noop,
                });
            };
            const watch = createWatchProgram(compilerHost);
            return { watch, baseline, config2, calledGetParsedCommandLine };
        }

        it("when new file is added to the referenced project with host implementing getParsedCommandLine", () => {
            const { watch, baseline, config2, calledGetParsedCommandLine } = setup(returnTrue);
            runWatchBaseline({
                scenario: "watchApi",
                subScenario: "when new file is added to the referenced project with host implementing getParsedCommandLine",
                commandLineArgs: ["--w", "-p", config2.path, "--extendedDiagnostics"],
                ...baseline,
                changes: [
                    {
                        caption: "Add class3 to project1",
                        change: sys => {
                            calledGetParsedCommandLine.clear();
                            sys.writeFile(`${projectRoot}/projects/project1/class3.ts`, `class class3 {}`);
                        },
                        timeouts: checkSingleTimeoutQueueLengthAndRun,
                    },
                    {
                        caption: "Add excluded file to project1",
                        change: sys => sys.ensureFileOrFolder({ path: `${projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                        timeouts: sys => sys.checkTimeoutQueueLength(0),
                    },
                    {
                        caption: "Add output of class3",
                        change: sys => sys.writeFile(`${projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                        timeouts: sys => sys.checkTimeoutQueueLength(0),
                    },
                ],
                watchOrSolution: watch
            });
        });

        it("when new file is added to the referenced project with host implementing getParsedCommandLine without implementing useSourceOfProjectReferenceRedirect", () => {
            const { watch, baseline, config2, calledGetParsedCommandLine } = setup();
            runWatchBaseline({
                scenario: "watchApi",
                subScenario: "when new file is added to the referenced project with host implementing getParsedCommandLine without implementing useSourceOfProjectReferenceRedirect",
                commandLineArgs: ["--w", "-p", config2.path, "--extendedDiagnostics"],
                ...baseline,
                changes: [
                    {
                        caption: "Add class3 to project1",
                        change: sys => {
                            calledGetParsedCommandLine.clear();
                            sys.writeFile(`${projectRoot}/projects/project1/class3.ts`, `class class3 {}`);
                        },
                        timeouts: checkSingleTimeoutQueueLengthAndRun,
                    },
                    {
                        caption: "Add class3 output to project1",
                        change: sys => sys.writeFile(`${projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                        timeouts: checkSingleTimeoutQueueLengthAndRun,
                    },
                    {
                        caption: "Add excluded file to project1",
                        change: sys => sys.ensureFileOrFolder({ path: `${projectRoot}/projects/project1/temp/file.d.ts`, content: `declare class file {}` }),
                        timeouts: sys => sys.checkTimeoutQueueLength(0),
                    },
                    {
                        caption: "Delete output of class3",
                        change: sys => sys.deleteFile(`${projectRoot}/projects/project1/class3.d.ts`),
                        timeouts: checkSingleTimeoutQueueLengthAndRun,
                    },
                    {
                        caption: "Add output of class3",
                        change: sys => sys.writeFile(`${projectRoot}/projects/project1/class3.d.ts`, `declare class class3 {}`),
                        timeouts: checkSingleTimeoutQueueLengthAndRun,
                    },
                ],
                watchOrSolution: watch
            });
        });
    });
}
