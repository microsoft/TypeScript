import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: getApplicableRefactors", () => {
    it("works when taking position", () => {
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: "" };
        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs]));
        ts.projectSystem.openFilesForSession([aTs], session);
        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.GetApplicableRefactorsRequest, ts.projectSystem.protocol.GetApplicableRefactorsResponse>(
            session, ts.projectSystem.protocol.CommandTypes.GetApplicableRefactors, { file: aTs.path, line: 1, offset: 1 });
        assert.deepEqual<readonly ts.projectSystem.protocol.ApplicableRefactorInfo[] | undefined>(response, []);
    });
});
