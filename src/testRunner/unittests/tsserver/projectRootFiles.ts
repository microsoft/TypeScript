import { noop } from "../../_namespaces/ts.js";
import { forEachScenarioForRootsFromReferencedProject } from "../helpers/projectRoots.js";
import {
    baselineTsserverLogs,
    forEachTscWatchEdit,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";

describe("unittests:: tsserver:: projectRootFiles:: roots::", () => {
    describe("when root file is from referenced project", () => {
        forEachScenarioForRootsFromReferencedProject(/*forTsserver*/ true, (subScenario, sys, edits) => {
            it(subScenario, () => {
                const session = new TestSession(sys());
                openFilesForSession(["/home/src/workspaces/solution/projects/server/src/server.ts"], session);
                forEachTscWatchEdit(session, edits(), noop);
                baselineTsserverLogs("projectRootFiles", subScenario, session);
            });
        });
    });
});
