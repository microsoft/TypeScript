import { getFsForLibResolution } from "../helpers/libraryResolution";
import { verifyTsc } from "../helpers/tsc";

describe("unittests:: tsbuild:: libraryResolution:: library file resolution", () => {
    function verify(libRedirection?: true) {
        verifyTsc({
            scenario: "libraryResolution",
            subScenario: `with config${libRedirection ? " with redirection" : ""}`,
            fs: () => getFsForLibResolution(libRedirection),
            commandLineArgs: ["-b", "project1", "project2", "project3", "project4", "--verbose", "--explainFiles"],
            baselinePrograms: true,
        });
    }
    verify();
    verify(/*libRedirection*/ true);
});
