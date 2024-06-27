import { forEachScenarioForRootsFromReferencedProject } from "../helpers/projectRoots.js";
import {
    noopChange,
    verifyTscWatch,
} from "../helpers/tscWatch.js";
import { createWatchedSystem } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuildWatch:: watchMode:: roots::", () => {
    describe("when root file is from referenced project", () => {
        forEachScenarioForRootsFromReferencedProject((subScenario, getFsContents) => {
            verifyTscWatch({
                scenario: "roots",
                subScenario,
                commandLineArgs: ["--b", "projects/server", "-w", "-v", "--traceResolution", "--explainFiles"],
                sys: () => createWatchedSystem(getFsContents(), { currentDirectory: "/home/src/workspaces" }),
                edits: [
                    noopChange,
                    {
                        caption: "edit logging file",
                        edit: sys => sys.appendFile("/home/src/workspaces/projects/shared/src/logging.ts", "export const x = 10;"),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // build shared
                            sys.runQueuedTimeoutCallbacks(); // build server
                        },
                    },
                    noopChange,
                    {
                        caption: "delete random file",
                        edit: sys => sys.deleteFile("/home/src/workspaces/projects/shared/src/random.ts"),
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks(); // build shared
                            sys.runQueuedTimeoutCallbacks(); // build server
                        },
                    },
                    noopChange,
                ],
            });
        });
    });
});
