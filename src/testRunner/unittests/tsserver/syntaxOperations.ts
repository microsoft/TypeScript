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

describe("unittests:: tsserver:: syntaxOperations::", () => {
    it("works when file is removed and added with different content", () => {
        const app: File = {
            path: `/user/username/projects/myproject/app.ts`,
            content: "console.log('Hello world');",
        };
        const unitTest1: File = {
            path: `/user/username/projects/myproject/unitTest1.ts`,
            content: `import assert = require('assert');

describe("Test Suite 1", () => {
    it("Test A", () => {
        assert.ok(true, "This shouldn't fail");
    });

    it("Test B", () => {
        assert.ok(1 === 1, "This shouldn't fail");
        assert.ok(false, "This should fail");
    });
});`,
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const files = [app, tsconfig];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([{ file: app.path, content: app.content }], session);

        host.writeFile(unitTest1.path, unitTest1.content);
        host.runQueuedTimeoutCallbacks();

        openFilesForSession([{ file: unitTest1.path, content: unitTest1.content }], session);

        session.executeCommandSeq<ts.server.protocol.FileRequest>({
            command: ts.server.protocol.CommandTypes.NavBarFull,
            arguments: { file: unitTest1.path },
        });
        host.deleteFile(unitTest1.path);
        host.runQueuedTimeoutCallbacks();

        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: unitTest1.path },
        });
        host.runQueuedTimeoutCallbacks();

        const unitTest1WithChangedContent: File = {
            path: unitTest1.path,
            content: `import assert = require('assert');

export function Test1() {
    assert.ok(true, "This shouldn't fail");
};

export function Test2() {
    assert.ok(1 === 1, "This shouldn't fail");
    assert.ok(false, "This should fail");
};`,
        };
        host.writeFile(unitTest1.path, unitTest1WithChangedContent.content);
        host.runQueuedTimeoutCallbacks();

        openFilesForSession([{ file: unitTest1WithChangedContent, content: unitTest1WithChangedContent.content }], session);

        session.executeCommandSeq<ts.server.protocol.FileRequest>({
            command: ts.server.protocol.CommandTypes.NavBarFull,
            arguments: { file: unitTest1WithChangedContent.path },
        });
        baselineTsserverLogs("syntaxOperations", "file is removed and added with different content", session);
    });
});
