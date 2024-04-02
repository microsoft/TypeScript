import { getSysForLibResolution } from "../helpers/libraryResolution";
import { verifyTscWatch } from "../helpers/tscWatch";

describe("unittests:: tsbuildWatch:: watchMode:: libraryResolution:: library file resolution", () => {
    function verify(libRedirection?: true) {
        verifyTscWatch({
            scenario: "libraryResolution",
            subScenario: `with config${libRedirection ? " with redirection" : ""}`,
            sys: () => getSysForLibResolution(libRedirection),
            commandLineArgs: ["-b", "-w", "project1", "project2", "project3", "project4", "--verbose", "--explainFiles", "--extendedDiagnostics"],
        });
    }
    verify();
    verify(/*libRedirection*/ true);
});
