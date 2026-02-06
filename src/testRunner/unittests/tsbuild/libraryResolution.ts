import { forEachLibResolutionScenario } from "../helpers/libraryResolution.js";
import { verifyTsc } from "../helpers/tsc.js";

describe("unittests:: tsbuild:: libraryResolution:: library file resolution", () => {
    forEachLibResolutionScenario(
        /*forTsserver*/ false,
        /*withoutConfig*/ undefined,
        (subScenario, sys) =>
            verifyTsc({
                scenario: "libraryResolution",
                subScenario,
                sys,
                commandLineArgs: ["-b", "project1", "project2", "project3", "project4", "--verbose", "--explainFiles"],
                baselinePrograms: true,
            }),
    );
});
