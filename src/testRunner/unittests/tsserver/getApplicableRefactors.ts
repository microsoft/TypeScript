import { createServerHost, File } from "../virtualFileSystemWithWatch";
import { protocol } from "../../_namespaces/ts.server";
import { createSession, openFilesForSession, executeSessionRequest } from "./helpers";

describe("unittests:: tsserver:: getApplicableRefactors", () => {
    it("works when taking position", () => {
        const aTs: File = { path: "/a.ts", content: "" };
        const session = createSession(createServerHost([aTs]));
        openFilesForSession([aTs], session);
        const response = executeSessionRequest<protocol.GetApplicableRefactorsRequest, protocol.GetApplicableRefactorsResponse>(
            session, protocol.CommandTypes.GetApplicableRefactors, { file: aTs.path, line: 1, offset: 1 });
        assert.deepEqual<readonly protocol.ApplicableRefactorInfo[] | undefined>(response, []);
    });
});
