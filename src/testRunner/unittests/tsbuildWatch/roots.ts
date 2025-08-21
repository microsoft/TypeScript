import { forEachScenarioForRootsFromReferencedProject } from "../helpers/projectRoots.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: roots::", () => {
    describe("when root file is from referenced project", () => {
        forEachScenarioForRootsFromReferencedProject(
            /*forTsserver*/ false,
            (subScenario, sys, edits) =>
                verifyTscWatch({
                    scenario: "roots",
                    subScenario,
                    commandLineArgs: ["--b", "projects/server", "-w", "-v", "--traceResolution", "--explainFiles"],
                    sys,
                    edits: edits(),
                }),
        );
    });
});
