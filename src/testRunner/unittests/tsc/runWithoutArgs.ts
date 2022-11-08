import * as ts from "../../_namespaces/ts";

describe("unittests:: tsc:: runWithoutArgs::", () => {
    ts.verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
        fs: () => ts.loadProjectFromFiles({}),
        commandLineArgs: [],
        environmentVariables: { TS_TEST_TERMINAL_WIDTH: "120" }
    });

    ts.verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host can't provide terminal width",
        fs: () => ts.loadProjectFromFiles({}),
        commandLineArgs: [],
    });

    ts.verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "does not add color when NO_COLOR is set",
        fs: () => ts.loadProjectFromFiles({}),
        commandLineArgs: [],
        environmentVariables: { NO_COLOR: "true" }
    });

});
