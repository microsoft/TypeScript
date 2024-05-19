import {
    getCommandLineArgsForLibResolution,
    getFsForLibResolution,
    getFsForLibResolutionUnknown,
} from "../helpers/libraryResolution.js";
import { verifyTsc } from "../helpers/tsc.js";

describe("unittests:: tsc:: libraryResolution:: library file resolution", () => {
    function verify(libRedirection?: true, withoutConfig?: true) {
        verifyTsc({
            scenario: "libraryResolution",
            subScenario: `${withoutConfig ? "without" : "with"} config${libRedirection ? " with redirection" : ""}`,
            fs: () => getFsForLibResolution(libRedirection),
            commandLineArgs: getCommandLineArgsForLibResolution(withoutConfig),
            baselinePrograms: true,
        });
    }
    verify();
    verify(/*libRedirection*/ true);
    verify(/*libRedirection*/ undefined, /*withoutConfig*/ true);
    verify(/*libRedirection*/ true, /*withoutConfig*/ true);

    verifyTsc({
        scenario: "libraryResolution",
        subScenario: "unknown lib",
        fs: () => getFsForLibResolutionUnknown(),
        commandLineArgs: getCommandLineArgsForLibResolution(/*withoutConfig*/ undefined),
        baselinePrograms: true,
    });
});
