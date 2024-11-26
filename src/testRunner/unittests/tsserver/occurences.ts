import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: occurences:: highlight on string", () => {
    it("should be marked if only on string values", () => {
        const file1: File = {
            path: "/home/src/projects/project/a/b/file1.ts",
            content: `let t1 = "div";\nlet t2 = "div";\nlet t3 = { "div": 123 };\nlet t4 = t3["div"];`,
        };

        const host = TestServerHost.createServerHost([file1]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.DocumentHighlightsRequest>({
            command: ts.server.protocol.CommandTypes.DocumentHighlights,
            arguments: { file: file1.path, line: 1, offset: 11, filesToSearch: [file1.path] },
        });

        session.executeCommandSeq<ts.server.protocol.DocumentHighlightsRequest>({
            command: ts.server.protocol.CommandTypes.DocumentHighlights,
            arguments: { file: file1.path, line: 3, offset: 13, filesToSearch: [file1.path] },
        });

        session.executeCommandSeq<ts.server.protocol.DocumentHighlightsRequest>({
            command: ts.server.protocol.CommandTypes.DocumentHighlights,
            arguments: { file: file1.path, line: 4, offset: 14, filesToSearch: [file1.path] },
        });
        baselineTsserverLogs("occurences", "should be marked if only on string values", session);
    });
});
