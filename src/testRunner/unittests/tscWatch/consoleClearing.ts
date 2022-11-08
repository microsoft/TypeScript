import * as ts from "../../_namespaces/ts";

describe("unittests:: tsc-watch:: console clearing", () => {
    const scenario = "consoleClearing";
    const file: ts.tscWatch.File = {
        path: "/f.ts",
        content: ""
    };

    const makeChangeToFile: ts.tscWatch.TscWatchCompileChange[] = [{
        caption: "Comment added to file f",
        change: sys => sys.modifyFile(file.path, "//"),
        timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
    }];

    function checkConsoleClearingUsingCommandLineOptions(subScenario: string, commandLineOptions?: string[]) {
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario,
            commandLineArgs: ["--w", file.path, ...commandLineOptions || ts.emptyArray],
            sys: () => ts.tscWatch.createWatchedSystem([file, ts.tscWatch.libFile]),
            changes: makeChangeToFile,
        });
    }

    checkConsoleClearingUsingCommandLineOptions("without --diagnostics or --extendedDiagnostics");
    checkConsoleClearingUsingCommandLineOptions("with --diagnostics", ["--diagnostics"]);
    checkConsoleClearingUsingCommandLineOptions("with --extendedDiagnostics", ["--extendedDiagnostics"]);
    checkConsoleClearingUsingCommandLineOptions("with --preserveWatchOutput", ["--preserveWatchOutput"]);

    describe("when preserveWatchOutput is true in config file", () => {
        const compilerOptions: ts.CompilerOptions = {
            preserveWatchOutput: true
        };
        const configFile: ts.tscWatch.File = {
            path: "/tsconfig.json",
            content: JSON.stringify({ compilerOptions })
        };
        const files = [file, configFile, ts.tscWatch.libFile];
        it("using createWatchOfConfigFile ", () => {
            const baseline = ts.tscWatch.createBaseline(ts.tscWatch.createWatchedSystem(files));
            const watch = ts.createWatchProgram(ts.tscWatch.createWatchCompilerHostOfConfigFileForBaseline({
                system: baseline.sys,
                cb: baseline.cb,
                configFileName: configFile.path,
            }));
            // Initially console is cleared if --preserveOutput is not provided since the config file is yet to be parsed
            ts.tscWatch.runWatchBaseline({
                scenario,
                subScenario: "when preserveWatchOutput is true in config file/createWatchOfConfigFile",
                commandLineArgs: ["--w", "-p", configFile.path],
                ...baseline,
                getPrograms: () => [[watch.getCurrentProgram().getProgram(), watch.getCurrentProgram()]],
                changes: makeChangeToFile,
                watchOrSolution: watch
            });
        });
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: "when preserveWatchOutput is true in config file/when createWatchProgram is invoked with configFileParseResult on WatchCompilerHostOfConfigFile",
            commandLineArgs: ["--w", "-p", configFile.path],
            sys: () => ts.tscWatch.createWatchedSystem(files),
            changes: makeChangeToFile,
        });
    });
});
