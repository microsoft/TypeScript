import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

// More tests in fourslash/smartSelection_*
describe("unittests:: tsserver:: smartSelection", () => {
    it("works for simple JavaScript", () => {
        const file: File = {
            path: "/file.js",
            content: `
class Foo {
    bar(a, b) {
        if (a === b) {
            return true;
        }
        return false;
    }
}`,
        };
        const host = createServerHost([file, libFile]);
        const session = new TestSession(host);
        openFilesForSession([file], session);
        session.executeCommandSeq<ts.server.protocol.SelectionRangeRequest>({
            command: ts.server.protocol.CommandTypes.SelectionRange,
            arguments: {
                file: file.path,
                locations: [
                    { line: 4, offset: 13 }, // a === b
                ],
            },
        });
        baselineTsserverLogs("smartSelection", "works for simple JavaScript", session);
    });
});
