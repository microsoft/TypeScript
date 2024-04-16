import {
    getConfigDirExtendsSys,
    getSymlinkedExtendsSys,
} from "../helpers/extends";
import { verifyTsc } from "../helpers/tsc";
import { verifyTscWatch } from "../helpers/tscWatch";
import { loadProjectFromFiles } from "../helpers/vfs";

describe("unittests:: tsc:: extends::", () => {
    verifyTscWatch({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-p", "src", "--extendedDiagnostics"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template",
        fs: () => loadProjectFromFiles(getConfigDirExtendsSys(), { cwd: "/home/src/projects/myproject" }),
        commandLineArgs: ["-p", "/home/src/projects/myproject", "--explainFiles"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template showConfig",
        fs: () => loadProjectFromFiles(getConfigDirExtendsSys(), { cwd: "/home/src/projects/myproject" }),
        commandLineArgs: ["-p", "/home/src/projects/myproject", "--showConfig"],
    });

    verifyTsc({
        scenario: "extends",
        subScenario: "configDir template with commandline",
        fs: () => loadProjectFromFiles(getConfigDirExtendsSys(), { cwd: "/home/src/projects/myproject" }),
        commandLineArgs: ["-p", "/home/src/projects/myproject", "--explainFiles", "--outDir", "${configDir}/outDir"], // eslint-disable-line no-template-curly-in-string
    });
});
