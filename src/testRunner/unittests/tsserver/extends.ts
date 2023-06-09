import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import { getSymlinkedExtendsSys } from "../helpers/extends";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";

describe("unittests:: tsserver:: extends::", () => {
    it("resolves the symlink path", () => {
        const host = getSymlinkedExtendsSys(/*forTsserver*/ true);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession(["/users/user/projects/myproject/src/index.ts"], session);
        baselineTsserverLogs("tsserver", "resolves the symlink path", session);
    });
});