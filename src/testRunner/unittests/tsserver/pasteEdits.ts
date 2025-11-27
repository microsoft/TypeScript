import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: pasteEdits::", () => {
    it("adds paste edits", () => {
        const target: File = {
            path: "/home/src/projects/project/a/target.ts",
            content: `const a = 1;
const b = 2;
const c = 3;`,
        };
        const file1: File = {
            path: "/home/src/projects/project/a/file1.ts",
            content: `export const r = 1;
export const s = 2;`,
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: "{}",
        };
        const pastedText = `const q = 1;
function e();
const f = r + s;`;

        const host = TestServerHost.createServerHost([target, file1, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([target], session);

        session.executeCommandSeq<ts.server.protocol.GetPasteEditsRequest>({
            command: ts.server.protocol.CommandTypes.GetPasteEdits,
            arguments: {
                file: target.path,
                pastedText: [pastedText],
                pasteLocations: [{ start: { line: 2, offset: 0 }, end: { line: 2, offset: 0 } }],
            },
        });
        verifyGetErrRequest({ session, files: [target.path] });
        baselineTsserverLogs("pasteEdits", "adds paste edits", session);
    });
    it("should not error", () => {
        const file1: File = {
            path: "/home/src/projects/project/file1.ts",
            content: `export const r = 1;
console.log(r);`,
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: "{}",
        };
        const host = TestServerHost.createServerHost([file1, tsconfig]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [],
                closedFiles: [],
                openFiles: [
                    {
                        file: "^/untitled/ts-nul-authority/Untitled-1",
                        fileContent: "function foo(){}\r\n     \r\n",
                        scriptKindName: "TS",
                    },
                ],
            },
        });
        session.executeCommandSeq<ts.server.protocol.GetPasteEditsRequest>({
            command: ts.server.protocol.CommandTypes.GetPasteEdits,
            arguments: {
                file: "^/untitled/ts-nul-authority/Untitled-1",
                pastedText: ["console.log(r);"],
                pasteLocations: [{ start: { line: 1, offset: 0 }, end: { line: 1, offset: 0 } }],
                copiedFrom: { file: file1.path, spans: [{ start: { line: 2, offset: 0 }, end: { line: 2, offset: 13 } }] },
            },
        });
        verifyGetErrRequest({ session, files: ["^/untitled/ts-nul-authority/Untitled-1"] });
        baselineTsserverLogs("pasteEdits", "should not error", session);
    });
});
