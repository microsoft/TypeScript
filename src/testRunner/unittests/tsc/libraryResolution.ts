import {
    getCommandLineArgsForLibResolution,
    getFsForLibResolution,
} from "../helpers/libraryResolution";
import {
    verifyTsc,
} from "../helpers/tsc";

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
});
