import { verifyTsc } from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsc:: runWithoutArgs::", () => {
    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
        fs: () => loadProjectFromFiles({}),
        commandLineArgs: [],
        environmentVariables: { TS_TEST_TERMINAL_WIDTH: "120" },
    });

    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host can't provide terminal width",
        fs: () => loadProjectFromFiles({}),
        commandLineArgs: [],
    });

    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "does not add color when NO_COLOR is set",
        fs: () => loadProjectFromFiles({}),
        commandLineArgs: [],
        environmentVariables: { NO_COLOR: "true" },
    });
});
