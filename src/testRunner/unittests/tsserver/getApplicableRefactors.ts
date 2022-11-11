import * as ts from "../../_namespaces/ts";
import { createServerHost, File } from "../virtualFileSystemWithWatch";
import { createSession, openFilesForSession, executeSessionRequest } from "./helpers";

describe("unittests:: tsserver:: getApplicableRefactors", () => {
    it("works when taking position", () => {
        const aTs: File = { path: "/a.ts", content: "" };
        const session = createSession(createServerHost([aTs]));
        openFilesForSession([aTs], session);
        const response = executeSessionRequest<ts.server.protocol.GetApplicableRefactorsRequest, ts.server.protocol.GetApplicableRefactorsResponse>(
            session, ts.server.protocol.CommandTypes.GetApplicableRefactors, { file: aTs.path, line: 1, offset: 1 });
        assert.deepEqual<readonly ts.server.protocol.ApplicableRefactorInfo[] | undefined>(response, []);
    });
});
