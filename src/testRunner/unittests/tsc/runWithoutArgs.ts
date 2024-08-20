import { emptyArray } from "../../_namespaces/ts.js";
import { verifyTsc } from "../helpers/tsc.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsc:: runWithoutArgs::", () => {
    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
        sys: () => loadProjectFromFiles({}, { environmentVariables: new Map([["TS_TEST_TERMINAL_WIDTH", "120"]]) }),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped when host can't provide terminal width",
        sys: () => loadProjectFromFiles({}),
        commandLineArgs: emptyArray,
    });

    verifyTsc({
        scenario: "runWithoutArgs",
        subScenario: "does not add color when NO_COLOR is set",
        sys: () => loadProjectFromFiles({}, { environmentVariables: new Map([["NO_COLOR", "true"]]) }),
        commandLineArgs: emptyArray,
    });
});
