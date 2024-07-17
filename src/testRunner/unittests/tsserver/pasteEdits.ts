import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: pasteEdits", () => {
    it("adds paste edits", () => {
        const target: File = {
            path: "/project/a/target.ts",
            content: `const a = 1;
const b = 2;
const c = 3;`,
        };
        const file1: File = {
            path: "/project/a/file1.ts",
            content: `export const r = 1;
export const s = 2;`,
        };
        const tsconfig: File = {
            path: "/project/tsconfig.json",
            content: "{}",
        };
        const pastedText = `const q = 1;
function e();
const f = r + s;`;

        const host = createServerHost([target, file1, tsconfig, libFile]);
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
});
