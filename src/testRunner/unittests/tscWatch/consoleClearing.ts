namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: console clearing", () => {
        const scenario = "consoleClearing";
        const file: File = {
            path: "/f.ts",
            content: ""
        };

        function makeChangeToFile(sys: WatchedSystem) {
            sys.modifyFile(file.path, "//");
            sys.runQueuedTimeoutCallbacks();
            return "Comment added to file f";
        }

        function checkConsoleClearingUsingCommandLineOptions(subScenario: string, commandLineOptions?: string[]) {
            verifyTscWatch({
                scenario,
                subScenario,
                commandLineArgs: ["--w", file.path, ...commandLineOptions || emptyArray],
                sys: () => createWatchedSystem([file, libFile]),
                changes: [
                    makeChangeToFile
                ],
            });
        }

        checkConsoleClearingUsingCommandLineOptions("without --diagnostics or --extendedDiagnostics");
        checkConsoleClearingUsingCommandLineOptions("with --diagnostics", ["--diagnostics"]);
        checkConsoleClearingUsingCommandLineOptions("with --extendedDiagnostics", ["--extendedDiagnostics"]);
        checkConsoleClearingUsingCommandLineOptions("with --preserveWatchOutput", ["--preserveWatchOutput"]);

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
                const sys = TestFSWithWatch.changeToHostTrackingWrittenFiles(
                    createWatchedSystem(files)
                );
                const watch = createWatchOfConfigFile(configFile.path, sys);
                // Initially console is cleared if --preserveOutput is not provided since the config file is yet to be parsed
                runWatchBaseline({
                    scenario,
                    subScenario: "when preserveWatchOutput is true in config file/createWatchOfConfigFile",
                    commandLineArgs: ["--w", "-p", configFile.path],
                    sys,
                    getPrograms: () => [[watch(), watch.getBuilderProgram()]],
                    changes: [
                        makeChangeToFile
                    ]
                });
            });
            verifyTscWatch({
                scenario,
                subScenario: "when preserveWatchOutput is true in config file/when createWatchProgram is invoked with configFileParseResult on WatchCompilerHostOfConfigFile",
                commandLineArgs: ["--w", "-p", configFile.path],
                sys: () => createWatchedSystem(files),
                changes: [
                    makeChangeToFile
                ],
            });
        });
    });
}
