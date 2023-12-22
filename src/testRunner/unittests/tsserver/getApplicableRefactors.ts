import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: getApplicableRefactors", () => {
    it("works when taking position", () => {
        const aTs: File = { path: "/a.ts", content: "" };
        const host = createServerHost([aTs]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: { file: aTs.path, line: 1, offset: 1 },
        });
        baselineTsserverLogs("getApplicableRefactors", "works when taking position", session);
    });
});
