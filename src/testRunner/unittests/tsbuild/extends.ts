import {
    getConfigDirExtendsSys,
    getSymlinkedExtendsSys,
} from "../helpers/extends";
import { verifyTsc } from "../helpers/tsc";
import { verifyTscWatch } from "../helpers/tscWatch";
import { loadProjectFromFiles } from "../helpers/vfs";

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
