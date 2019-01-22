namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: console clearing", () => {
        const currentDirectoryLog = "Current directory: / CaseSensitiveFileNames: false\n";
        const fileWatcherAddedLog = [
            "FileWatcher:: Added:: WatchInfo: /f.ts 250 Source file\n",
            "FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 Source file\n"
        ];

        const file: File = {
            path: "/f.ts",
            content: ""
        };

        function getProgramSynchronizingLog(options: CompilerOptions) {
            return [
                "Synchronizing program\n",
                "CreatingProgramWith::\n",
                "  roots: [\"/f.ts\"]\n",
                `  options: ${JSON.stringify(options)}\n`
            ];
        }

        function isConsoleClearDisabled(options: CompilerOptions) {
            return options.diagnostics || options.extendedDiagnostics || options.preserveWatchOutput;
        }

        function verifyCompilation(host: WatchedSystem, options: CompilerOptions, initialDisableOptions?: CompilerOptions) {
            const disableConsoleClear = isConsoleClearDisabled(options);
            const hasLog = options.extendedDiagnostics || options.diagnostics;
            checkOutputErrorsInitial(host, emptyArray, initialDisableOptions ? isConsoleClearDisabled(initialDisableOptions) : disableConsoleClear, hasLog ? [
                currentDirectoryLog,
                ...getProgramSynchronizingLog(options),
                ...(options.extendedDiagnostics ? fileWatcherAddedLog : emptyArray)
            ] : undefined);
            host.modifyFile(file.path, "//");
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray, disableConsoleClear, hasLog ? [
                "FileWatcher:: Triggered with /f.ts 1:: WatchInfo: /f.ts 250 Source file\n",
                "Scheduling update\n",
                "Elapsed:: 0ms FileWatcher:: Triggered with /f.ts 1:: WatchInfo: /f.ts 250 Source file\n"
            ] : undefined, hasLog ? getProgramSynchronizingLog(options) : undefined);
        }

        function checkConsoleClearingUsingCommandLineOptions(options: CompilerOptions = {}) {
            const files = [file, libFile];
            const host = createWatchedSystem(files);
            createWatchOfFilesAndCompilerOptions([file.path], host, options);
            verifyCompilation(host, options);
        }

        it("without --diagnostics or --extendedDiagnostics", () => {
            checkConsoleClearingUsingCommandLineOptions();
        });
        it("with --diagnostics", () => {
            checkConsoleClearingUsingCommandLineOptions({
                diagnostics: true,
            });
        });
        it("with --extendedDiagnostics", () => {
            checkConsoleClearingUsingCommandLineOptions({
                extendedDiagnostics: true,
            });
        });
        it("with --preserveWatchOutput", () => {
            checkConsoleClearingUsingCommandLineOptions({
                preserveWatchOutput: true,
            });
        });

        describe("when preserveWatchOutput is true in config file", () => {
            const compilerOptions: CompilerOptions = {
                preserveWatchOutput: true
            };
            const configFile: File = {
                path: "/tsconfig.json",
                content: JSON.stringify({ compilerOptions })
            };
            const files = [file, configFile, libFile];
            it("using createWatchOfConfigFile ", () => {
                const host = createWatchedSystem(files);
                createWatchOfConfigFile(configFile.path, host);
                // Initially console is cleared if --preserveOutput is not provided since the config file is yet to be parsed
                verifyCompilation(host, compilerOptions, {});
            });
            it("when createWatchProgram is invoked with configFileParseResult on WatchCompilerHostOfConfigFile", () => {
                const host = createWatchedSystem(files);
                const reportDiagnostic = createDiagnosticReporter(host);
                const optionsToExtend: CompilerOptions = {};
                const configParseResult = parseConfigFileWithSystem(configFile.path, optionsToExtend, host, reportDiagnostic)!;
                const watchCompilerHost = createWatchCompilerHostOfConfigFile(configParseResult.options.configFilePath!, optionsToExtend, host, /*createProgram*/ undefined, reportDiagnostic, createWatchStatusReporter(host));
                watchCompilerHost.configFileParsingResult = configParseResult;
                createWatchProgram(watchCompilerHost);
                verifyCompilation(host, compilerOptions);
            });
        });
    });
}
