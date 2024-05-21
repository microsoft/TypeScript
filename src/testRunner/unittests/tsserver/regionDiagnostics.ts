import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: regionDiagnostics", () => {
    it("diagnostics for select nodes", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: `function foo(x: number, y: string): number {
    return x + y;
}



foo(10, 50);`,
        };
        const host = createServerHost([file1]);
        const session = new TestSession(host);

        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: { file: file1.path },
        });

        verifyGetErrRequest({
            session,
            files: [{
                file: file1.path,
                ranges: [{ startLine: 6, startOffset: 1, endLine: 7, endOffset: 13 }],
            }],
        });

        baselineTsserverLogs("regionDiagnostics", "diagnostics for select nodes", session);
    });
});
