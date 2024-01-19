import {
    getSymlinkedExtendsSys,
} from "../helpers/extends";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";

describe("unittests:: tsserver:: extends::", () => {
    it("resolves the symlink path", () => {
        const host = getSymlinkedExtendsSys(/*forTsserver*/ true);
        const session = new TestSession(host);
        openFilesForSession(["/users/user/projects/myproject/src/index.ts"], session);
        baselineTsserverLogs("tsserver", "resolves the symlink path", session);
    });
});
