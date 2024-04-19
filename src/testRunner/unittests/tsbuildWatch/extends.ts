import {
    getConfigDirExtendsSys,
    modifyFirstExtendedConfigOfConfigDirExtendsSys,
} from "../helpers/extends";
import { verifyTscWatch } from "../helpers/tscWatch";
import { createWatchedSystem } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsbuildWatch:: watchMode:: extends::", () => {
    verifyTscWatch({
        scenario: "extends",
        subScenario: "configDir template",
        sys: () => createWatchedSystem(getConfigDirExtendsSys(), { currentDirectory: "/home/src/projects/myproject" }),
        commandLineArgs: ["-b", "-w", "--extendedDiagnostics", "--explainFiles", "-v"],
        edits: [{
            caption: "edit extended config file",
            edit: modifyFirstExtendedConfigOfConfigDirExtendsSys,
            timeouts: sys => sys.runQueuedTimeoutCallbacks(),
        }],
    });
});
