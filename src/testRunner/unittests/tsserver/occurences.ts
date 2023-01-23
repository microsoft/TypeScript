import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createSession,
    openFilesForSession,
} from "./helpers";

describe("unittests:: tsserver:: occurrence highlight on string", () => {
    it("should be marked if only on string values", () => {
        const file1: File = {
            path: "/a/b/file1.ts",
            content: `let t1 = "div";\nlet t2 = "div";\nlet t3 = { "div": 123 };\nlet t4 = t3["div"];`
        };

        const host = createServerHost([file1]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.FileLocationRequest>({
            command: ts.server.protocol.CommandTypes.Occurrences,
            arguments: { file: file1.path, line: 1, offset: 11 }
        });

        session.executeCommandSeq<ts.server.protocol.FileLocationRequest>({
            command: ts.server.protocol.CommandTypes.Occurrences,
            arguments: { file: file1.path, line: 3, offset: 13 }
        });

        session.executeCommandSeq<ts.server.protocol.FileLocationRequest>({
            command: ts.server.protocol.CommandTypes.Occurrences,
            arguments: { file: file1.path, line: 4, offset: 14 }
        });
        baselineTsserverLogs("occurences", "should be marked if only on string values", session);
    });
});
