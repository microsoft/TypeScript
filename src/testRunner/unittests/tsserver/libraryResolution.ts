import { noop } from "../../_namespaces/ts.js";
import { forEachLibResolutionScenario } from "../helpers/libraryResolution.js";
import {
    baselineTsserverLogs,
    forEachTscWatchEdit,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";

describe("unittests:: tsserver:: libraryResolution::", () => {
    forEachLibResolutionScenario(
        /*forTsserver*/ true,
        /*withoutConfig*/ undefined,
        (scenario, sys, edits) => {
            it(scenario, () => {
                const session = new TestSession(sys());
                openFilesForSession(["/home/src/workspace/projects/project1/index.ts"], session);
                forEachTscWatchEdit(session, edits(), noop);
                baselineTsserverLogs("libraryResolution", scenario, session);
            });
        },
    );
});
