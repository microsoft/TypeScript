import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import {
    baselineTsserverLogs,
    createSession,
    openExternalProjectForSession,
    toExternalFile,
} from "../helpers/tsserver";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: importHelpers", () => {
    it("should not crash in tsserver", () => {
        const f1 = {
            path: "/a/app.ts",
            content: "export async function foo() { return 100; }"
        };
        const tslib = {
            path: "/a/node_modules/tslib/index.d.ts",
            content: ""
        };
        const host = createServerHost([f1, tslib]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openExternalProjectForSession({ projectFileName: "p", rootFiles: [toExternalFile(f1.path)], options: { importHelpers: true } }, session);
        baselineTsserverLogs("importHelpers", "should not crash in tsserver", session);
    });
});
