import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: duplicate packages", () => {
    // Tests that 'moduleSpecifiers.ts' will import from the redirecting file, and not from the file it redirects to, if that can provide a global module specifier.
    it("works with import fixes", () => {
        const packageContent = "export const foo: number;";
        const packageJsonContent = JSON.stringify({ name: "foo", version: "1.2.3" });
        const aFooIndex: File = { path: "/a/node_modules/foo/index.d.ts", content: packageContent };
        const aFooPackage: File = { path: "/a/node_modules/foo/package.json", content: packageJsonContent };
        const bFooIndex: File = { path: "/b/node_modules/foo/index.d.ts", content: packageContent };
        const bFooPackage: File = { path: "/b/node_modules/foo/package.json", content: packageJsonContent };

        const userContent = 'import("foo");\nfoo';
        const aUser: File = { path: "/a/user.ts", content: userContent };
        const bUser: File = { path: "/b/user.ts", content: userContent };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: "{}",
        };

        const host = createServerHost([aFooIndex, aFooPackage, bFooIndex, bFooPackage, aUser, bUser, tsconfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });

        openFilesForSession([aUser, bUser], session);

        for (const user of [aUser, bUser]) {
            session.executeCommandSeq<ts.server.protocol.CodeFixRequest>({
                command: ts.server.protocol.CommandTypes.GetCodeFixes,
                arguments: {
                    file: user.path,
                    startLine: 2,
                    startOffset: 1,
                    endLine: 2,
                    endOffset: 4,
                    errorCodes: [ts.Diagnostics.Cannot_find_name_0.code],
                }
            });
        }
        baselineTsserverLogs("duplicatePackages", "works with import fixes", session);
    });
});
