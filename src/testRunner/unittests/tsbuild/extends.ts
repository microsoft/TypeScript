import {
    getConfigDirExtendsSys,
    getSymlinkedExtendsSys,
} from "../helpers/extends.js";
import { verifyTsc } from "../helpers/tsc.js";

describe("unittests:: tsbuild:: extends::", () => {
    verifyTsc({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-b", "src", "--extendedDiagnostics"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template",
        sys: getConfigDirExtendsSys,
        commandLineArgs: ["-b", "--explainFiles", "--v"],
    });
});
