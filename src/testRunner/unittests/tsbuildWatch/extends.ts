import { forConfigDirExtendsSysScenario } from "../helpers/extends.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: extends::", () => {
    forConfigDirExtendsSysScenario(
        /*forTsserver*/ false,
        (subScenario, sys, edits) =>
            verifyTscWatch({
                scenario: "extends",
                subScenario,
                sys,
                commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--explainFiles", "-v"],
                edits: edits(),
            }),
    );
});
