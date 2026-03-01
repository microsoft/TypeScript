import * as ts from "../../_namespaces/ts.js";
import {
    forConfigDirExtendsSysScenario,
    getSymlinkedExtendsSys,
} from "../helpers/extends.js";
import {
    baselineTsserverLogs,
    forEachTscWatchEdit,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";

describe("unittests:: tsserver:: extends::", () => {
    it("resolves the symlink path", () => {
        const host = getSymlinkedExtendsSys(/*forTsserver*/ true);
        const session = new TestSession(host);
        openFilesForSession(["/users/user/projects/myproject/src/index.ts"], session);
        baselineTsserverLogs("extends", "resolves the symlink path", session);
    });

    forConfigDirExtendsSysScenario(/*forTsserver*/ true, (subScenario, sys, edits) => {
        it(subScenario, () => {
            const host = sys();
            const session = new TestSession(host);
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: {
                    watchOptions: {
                        excludeDirectories: ["${configDir}/node_modules"], // eslint-disable-line no-template-curly-in-string
                    },
                },
            });
            openFilesForSession(["/home/src/projects/myproject/src/secondary.ts"], session);
            forEachTscWatchEdit(session, edits(), ts.noop);
            baselineTsserverLogs("extends", subScenario, session);
        });
    });
});
