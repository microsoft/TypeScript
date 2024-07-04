import * as ts from "../../_namespaces/ts.js";
import {
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: getEditsForRefactor", () => {
    it("handles shorthand references of old imports gracefully", () => {
        const file1: File = {
            path: "/store.ts",
            content: `export const store = { example: true };`,
        };
        const file2: File = {
            path: "/test.ts",
            content: `import { store } from "./store";
function a() {
  return { store };
}
function b() {
  return store;
}`,
        };
        const host = createServerHost([file1, file2]);
        const session = new TestSession(host);
        openFilesForSession([file1, file2], session);

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: { allowTextChangesInNewFiles: true },
            },
        });

        const resp = session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                file: file2.path,
                startLine: 5,
                startOffset: 0,
                endLine: 7,
                endOffset: 1,
                refactor: "Move to a new file",
                action: "Move to a new file",
            },
        });

        const refactorEditInfo = resp.response as ts.server.protocol.RefactorEditInfo;

        if (refactorEditInfo.edits.find(x => x.fileName === "/a.ts")?.textChanges.some(x => x.start.line === 1)) {
            throw new Error("Tried to remove import from source");
        }
    });
});
