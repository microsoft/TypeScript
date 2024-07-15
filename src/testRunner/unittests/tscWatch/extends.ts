import {
    getConfigDirExtendsSys,
    getSymlinkedExtendsSys,
    modifyFirstExtendedConfigOfConfigDirExtendsSys,
} from "../helpers/extends.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import { createWatchedSystem } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc-watch:: extends::", () => {
    verifyTscWatch({
        scenario: "extends",
        subScenario: "resolves the symlink path",
        sys: getSymlinkedExtendsSys,
        commandLineArgs: ["-w", "-p", "src", "--extendedDiagnostics"],
    });

    verifyTscWatch({
        scenario: "extends",
        subScenario: "configDir template",
        sys: () => createWatchedSystem(getConfigDirExtendsSys(), { currentDirectory: "/home/src/projects/myproject" }),
        commandLineArgs: ["-w", "--extendedDiagnostics", "--explainFiles"],
        edits: [{
            caption: "edit extended config file",
            edit: modifyFirstExtendedConfigOfConfigDirExtendsSys,
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        }],
    });
});
