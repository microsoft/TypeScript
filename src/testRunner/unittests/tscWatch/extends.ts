import {
    forConfigDirExtendsSysScenario,
    getSymlinkedExtendsSys,
} from "../helpers/extends.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";

describe("unittests:: tscWatch:: extends::", () => {
    verifyTscWatch({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-w", "-p", "src", "--extendedDiagnostics"],
    });

    forConfigDirExtendsSysScenario(
        /*forTsserver*/ false,
        (subScenario, sys, edits) =>
            verifyTscWatch({
                scenario: "extends",
                subScenario,
                sys,
                commandLineArgs: ["-w", "--extendedDiagnostics", "--explainFiles"],
                edits: edits(),
            }),
    );
});
