import { emptyArray } from "../../_namespaces/ts.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: runWithoutArgs::", () => {
    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
        sys: () =>
            TestServerHost.createWatchedSystem(
                {},
                {
                    currentDirectory: "/",
                    environmentVariables: new Map([["TS_TEST_TERMINAL_WIDTH", "120"]]),
                },
            ),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host can't provide terminal width",
        sys: () =>
            TestServerHost.createWatchedSystem(
                {},
                { currentDirectory: "/" },
            ),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "does not add color when NO_COLOR is set",
        sys: () =>
            TestServerHost.createWatchedSystem(
                {},
                {
                    currentDirectory: "/",
                    environmentVariables: new Map([["NO_COLOR", "true"]]),
                },
            ),
        commandLineArgs: emptyArray,
    });
});
