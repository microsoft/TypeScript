import {
    getConfigDirExtendsSys,
    getSymlinkedExtendsSys,
} from "../helpers/extends.js";
import { verifyTsc } from "../helpers/tsc.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import { loadProjectFromFiles } from "../helpers/vfs.js";

describe("unittests:: tsbuild:: extends::", () => {
    verifyTscWatch({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-b", "src", "--extendedDiagnostics"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template",
        fs: () => loadProjectFromFiles(getConfigDirExtendsSys(), { cwd: "/home/src/projects/myproject" }),
        commandLineArgs: ["-b", "/home/src/projects/myproject", "--explainFiles", "--v"],
    });
});
