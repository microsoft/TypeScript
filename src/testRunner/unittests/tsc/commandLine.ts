import { emptyArray } from "../../_namespaces/ts.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: commandLine::", () => {
    verifyTsc({
        scenario: "commandLine",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
        sys: () =>
            TestServerHost.createWatchedSystem(emptyArray, {
                environmentVariables: new Map([["TS_TEST_TERMINAL_WIDTH", "120"]]),
            }),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "commandLine",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host can't provide terminal width",
        sys: () => TestServerHost.createWatchedSystem(emptyArray),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "commandLine",
        subScenario: "does not add color when NO_COLOR is set",
        sys: () =>
            TestServerHost.createWatchedSystem(emptyArray, {
                environmentVariables: new Map([["NO_COLOR", "true"]]),
            }),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "commandLine",
        subScenario: "when build not first argument",
        sys: () => TestServerHost.createWatchedSystem(emptyArray),
        commandLineArgs: ["--verbose", "--build"],
    });

    verifyTsc({
        scenario: "commandLine",
        subScenario: "help",
        sys: () => TestServerHost.createWatchedSystem(emptyArray),
        commandLineArgs: ["--help"],
    });

    verifyTsc({
        scenario: "commandLine",
        subScenario: "help all",
        sys: () => TestServerHost.createWatchedSystem(emptyArray),
        commandLineArgs: ["--help", "--all"],
    });
});
