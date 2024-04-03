import { getSymlinkedExtendsSys } from "../helpers/extends";
import { verifyTscWatch } from "../helpers/tscWatch";

describe("unittests:: tsc-watch:: extends::", () => {
    verifyTscWatch({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-w", "-p", "src", "--extendedDiagnostics"],
    });
});
