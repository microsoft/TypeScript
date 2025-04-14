import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { createBaseline } from "../helpers/baseline.js";
import {
    createWatchCompilerHostOfConfigFileForBaseline,
    runWatchBaseline,
    TscWatchCompileChange,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: consoleClearing::", () => {
    const scenario = "consoleClearing";
    const file: File = {
        path: "/user/username/projects/myproject/f.ts",
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
            sys: () => TestServerHost.createWatchedSystem([file], { currentDirectory: ts.getDirectoryPath(file.path) }),
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
            path: "/user/username/projects/myproject/tsconfig.json",
            content: jsonToReadableText({ compilerOptions }),
        };
        it("using createWatchOfConfigFile ", () => {
            const baseline = createBaseline(sys());
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
            sys,
            edits: makeChangeToFile,
        });

        function sys() {
            return TestServerHost.createWatchedSystem(
                [file, configFile],
                { currentDirectory: ts.getDirectoryPath(configFile.path) },
            );
        }
    });
});
