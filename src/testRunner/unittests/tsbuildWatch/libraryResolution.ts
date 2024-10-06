import { forEachLibResolutionScenario } from "../helpers/libraryResolution.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: libraryResolution:: library file resolution", () => {
    forEachLibResolutionScenario(
        /*forTsserver*/ false,
        /*withoutConfig*/ undefined,
        (subScenario, sys) =>
            verifyTscWatch({
                scenario: "libraryResolution",
                subScenario,
                sys,
                commandLineArgs: ["-b", "-w", "project1", "project2", "project3", "project4", "--verbose", "--explainFiles", "--extendedDiagnostics"],
            }),
    );
});
