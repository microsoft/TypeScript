import { forEachScenarioForRootsFromReferencedProject } from "../helpers/projectRoots.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: projectRootFiles:: roots::", () => {
    describe("when root file is from referenced project", () => {
        forEachScenarioForRootsFromReferencedProject((subScenario, getFsContents) => {
            it(subScenario, () => {
                const host = createServerHost(getFsContents(), { currentDirectory: "/home/src/workspaces" });
                const session = new TestSession(host);
                openFilesForSession(["/home/src/workspaces/projects/server/src/server.ts"], session);

                host.appendFile("/home/src/workspaces/projects/shared/src/logging.ts", "export const x = 10;");
                host.runQueuedTimeoutCallbacks();

                host.deleteFile("/home/src/workspaces/projects/shared/src/random.ts");
                host.runQueuedTimeoutCallbacks();

                baselineTsserverLogs("projectRootFiles", subScenario, session);
            });
        });
    });
});
