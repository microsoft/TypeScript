import { getSymlinkedExtendsSys } from "../helpers/extends";
import { verifyTscWatch } from "../helpers/tscWatch";

describe("unittests:: tsbuild:: extends::", () => {
    verifyTscWatch({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-b", "src", "--extendedDiagnostics"],
    });
});