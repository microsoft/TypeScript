import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
} from "../helpers/virtualFileSystemWithWatch";
describe("unittests:: tsserver:: inconsistentErrorInEditor", () => {
    it("should not error", () => {
        const host = createServerHost([]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [],
                closedFiles: [],
                openFiles: [
                    {
                        file: "^/untitled/ts-nul-authority/Untitled-1",
                        fileContent: "export function foo<U>() {\r\n    /*$*/return bar<U>;\r\n}\r\n\r\nexport function bar<T>(x: T) {\r\n    return x;\r\n}\r\n\r\nlet x = foo()(42);",
                        scriptKindName: "TS",
                    },
                ],
            },
        });
        session.executeCommandSeq<ts.server.protocol.EncodedSemanticClassificationsRequest>({
            command: ts.server.protocol.CommandTypes.EncodedSemanticClassificationsFull,
            arguments: {
                file: "^/untitled/ts-nul-authority/Untitled-1",
                start: 0,
                length: 128,
                format: "2020",
            },
        });
        verifyGetErrRequest({ session, files: ["^/untitled/ts-nul-authority/Untitled-1"] });
        baselineTsserverLogs("inconsistentErrorInEditor", "should not error", session);
    });
});

describe("unittests:: tsserver:: inconsistentErrorInEditor2", () => {
    it("should not error", () => {
        const host = createServerHost([]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [],
                closedFiles: [],
                openFiles: [
                    {
                        file: "^/untitled/ts-nul-authority/Untitled-1",
                        fileContent: "function fn(Foo: number) {\r\n     type Foo = typeof Foo;\r\n    return 0 as any as {x: Foo};\r\n}",
                        scriptKindName: "TS",
                    },
                ],
            },
        });
        session.executeCommandSeq<ts.server.protocol.EncodedSemanticClassificationsRequest>({
            command: ts.server.protocol.CommandTypes.EncodedSemanticClassificationsFull,
            arguments: {
                file: "^/untitled/ts-nul-authority/Untitled-1",
                start: 0,
                length: 128,
                format: "2020",
            },
        });
        verifyGetErrRequest({ session, files: ["^/untitled/ts-nul-authority/Untitled-1"] });
        baselineTsserverLogs("inconsistentErrorInEditor2", "should not error", session);
    });
});
