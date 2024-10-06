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

describe("unittests:: tsserver:: getApplicableRefactors::", () => {
    it("works when taking position", () => {
        const aTs: File = { path: "/home/src/projects/project/a.ts", content: "" };
        const host = TestServerHost.createServerHost([aTs]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: { file: aTs.path, line: 1, offset: 1 },
        });
        baselineTsserverLogs("getApplicableRefactors", "works when taking position", session);
    });

    it("returns the affected range of text for extract symbol refactor", () => {
        const file1: File = {
            path: "/home/src/projects/project/a.ts",
            content: `class Foo {
    someMethod(m: number) {
        var x = m;
        x = x * 3;
        var y = 30;
        var j = 10;
        var z = y + j;
        console.log(z);
        var q = 10;
        return q;
    }
}`,
        };
        const host = TestServerHost.createServerHost([file1]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: { file: file1.path, startLine: 3, startOffset: 9, endLine: 5, endOffset: 20 },
        });
        baselineTsserverLogs("getApplicableRefactors", "returns the affected range of text for extract symbol refactor", session);
    });

    it("returns the affected range of text for extract type refactor", () => {
        const file1: File = {
            path: "/home/src/projects/project/a.ts",
            content: `type A<B, C, D = B> = Partial<C | string | D> & D | C;`,
        };
        const host = TestServerHost.createServerHost([file1]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: { file: file1.path, startLine: 1, startOffset: 26, endLine: 1, endOffset: 38 },
        });
        baselineTsserverLogs("getApplicableRefactors", "returns the affected range of text for extract type refactor", session);
    });

    it("returns the affected range of text for 'move to file' and 'move to new file' refactors", () => {
        const file1: File = {
            path: "/home/src/projects/project/a.ts",
            content: `const a = 1;
const b = 1;
function foo() { }`,
        };
        const host = TestServerHost.createServerHost([file1]);
        const session = new TestSession(host);
        openFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: { allowTextChangesInNewFiles: true },
            },
        });
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: { file: file1.path, startLine: 1, startOffset: 3, endLine: 2, endOffset: 3, includeInteractiveActions: true },
        });
        baselineTsserverLogs("getApplicableRefactors", "returns the affected range of text for 'move to file' and 'move to new file' refactors", session);
    });
});
