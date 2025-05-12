import {
    getConfigDirExtendsSys,
    getSymlinkedExtendsSys,
} from "../helpers/extends.js";
import { verifyTsc } from "../helpers/tsc.js";

describe("unittests:: tsc:: extends::", () => {
    verifyTsc({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-p", "src", "--extendedDiagnostics"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template",
        sys: getConfigDirExtendsSys,
        commandLineArgs: ["--explainFiles"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template showConfig",
        sys: getConfigDirExtendsSys,
        commandLineArgs: ["--showConfig"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template with commandline",
        sys: getConfigDirExtendsSys,
        commandLineArgs: ["--explainFiles", "--outDir", "${configDir}/outDir"], // eslint-disable-line no-template-curly-in-string
    });
});
