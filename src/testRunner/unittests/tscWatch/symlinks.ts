import { forEachMonorepoSymlinkScenario } from "../helpers/monorepoSymlinkedSiblingPackages.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";

describe("unittests:: tscWatch:: symlinks::", () => {
    forEachMonorepoSymlinkScenario(/*forTsserver*/ false, (subScenario, sys, edits, project) => {
        verifyTscWatch({
            scenario: "symlinks",
            subScenario,
            commandLineArgs: ["--w", "-p", project, "--extendedDiagnostics", "--explainFiles", "--traceResolution"],
            sys,
            edits: edits(),
        });
    });
});
