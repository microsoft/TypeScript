import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    createBaseline,
    createWatchCompilerHostOfConfigFileForBaseline,
    runWatchBaseline,
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsc-watch:: console clearing", () => {
    const scenario = "consoleClearing";
    const file: File = {
        path: "/f.ts",
        content: "",
    };

    const makeChangeToFile: TscWatchCompileChange[] = [{
        caption: "Comment added to file f",
        edit: sys => sys.modifyFile(file.path, "//"),
        timeouts: sys => sys.runQueuedTimeoutCallbacks(),
    }];

    function checkConsoleClearingUsingCommandLineOptions(subScenario: string, commandLineOptions?: string[]) {
        verifyTscWatch({
            scenario,
            subScenario,
            commandLineArgs: ["--w", file.path, ...commandLineOptions || ts.emptyArray],
            sys: () => createWatchedSystem([file, libFile]),
            edits: makeChangeToFile,
        });
    }

    checkConsoleClearingUsingCommandLineOptions("without --diagnostics or --extendedDiagnostics");
    checkConsoleClearingUsingCommandLineOptions("with --diagnostics", ["--diagnostics"]);
    checkConsoleClearingUsingCommandLineOptions("with --extendedDiagnostics", ["--extendedDiagnostics"]);
    checkConsoleClearingUsingCommandLineOptions("with --preserveWatchOutput", ["--preserveWatchOutput"]);

    describe("when preserveWatchOutput is true in config file", () => {
        const compilerOptions: ts.CompilerOptions = {
            preserveWatchOutput: true,
        };
        const configFile: File = {
            path: "/tsconfig.json",
            content: jsonToReadableText({ compilerOptions }),
        };
        const files = [file, configFile, libFile];
        it("using createWatchOfConfigFile ", () => {
            const baseline = createBaseline(createWatchedSystem(files));
            const watch = ts.createWatchProgram(createWatchCompilerHostOfConfigFileForBaseline({
                system: baseline.sys,
                cb: baseline.cb,
                configFileName: configFile.path,
            }));
            // Initially console is cleared if --preserveOutput is not provided since the config file is yet to be parsed
            runWatchBaseline({
                scenario,
                subScenario: "when preserveWatchOutput is true in config file/createWatchOfConfigFile",
                commandLineArgs: ["--w", "-p", configFile.path],
                ...baseline,
                getPrograms: () => [[watch.getCurrentProgram().getProgram(), watch.getCurrentProgram()]],
                edits: makeChangeToFile,
                watchOrSolution: watch,
            });
        });
        verifyTscWatch({
            scenario,
            subScenario: "when preserveWatchOutput is true in config file/when createWatchProgram is invoked with configFileParseResult on WatchCompilerHostOfConfigFile",
            commandLineArgs: ["--w", "-p", configFile.path],
            sys: () => createWatchedSystem(files),
            edits: makeChangeToFile,
        });
    });
});
