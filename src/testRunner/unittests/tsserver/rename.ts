import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
    protocolFileLocationFromSubstring,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: rename", () => {
    it("works with fileToRename", () => {
        const aTs: File = { path: "/a.ts", content: "export const a = 0;" };
        const bTs: File = { path: "/b.ts", content: 'import { a } from "./a";' };

        const host = createServerHost([aTs, bTs]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([bTs], session);

        // rename fails with allowRenameOfImportPath disabled
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, 'a";')
        });

        // rename succeeds with allowRenameOfImportPath enabled in host
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { allowRenameOfImportPath: true } }
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, 'a";')
        });

        // rename succeeds with allowRenameOfImportPath enabled in file
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { allowRenameOfImportPath: false } }
        });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { file: "/b.ts", formatOptions: {}, preferences: { allowRenameOfImportPath: true } }
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, 'a";')
        });
        baselineTsserverLogs("rename", "works with fileToRename", session);
    });

    it("works with prefixText and suffixText when enabled", () => {
        const aTs: File = { path: "/a.ts", content: "const x = 0; const o = { x };" };
        const host = createServerHost([aTs]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([aTs], session);

        // rename with prefixText and suffixText disabled
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x")
        });
        // rename with prefixText and suffixText enabled in host
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { providePrefixAndSuffixTextForRename: true } }
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x")
        });

        // rename with prefixText and suffixText enabled for file
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { providePrefixAndSuffixTextForRename: false } }
        });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { file: "/a.ts", formatOptions: {}, preferences: { providePrefixAndSuffixTextForRename: true } }
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x")
        });
        baselineTsserverLogs("rename", "works with prefixText and suffixText when enabled", session);
    });

    it("export default anonymous function works with prefixText and suffixText when disabled", () => {
        const aTs: File = { path: "/a.ts", content: "export default function() {}" };
        const bTs: File = { path: "/b.ts", content: `import aTest from "./a"; function test() { return aTest(); }` };

        const host = createServerHost([aTs, bTs]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([bTs], session);

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { providePrefixAndSuffixTextForRename: false } }
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, "aTest(")
        });
        baselineTsserverLogs("rename", "export default anonymous function works with prefixText and suffixText when disabled", session);
    });

    it("rename behavior is based on file of rename initiation", () => {
        const aTs: File = { path: "/a.ts", content: "const x = 1; export { x };" };
        const bTs: File = { path: "/b.ts", content: `import { x } from "./a"; const y = x + 1;` };
        const host = createServerHost([aTs, bTs]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([aTs, bTs], session);

        // rename from file with prefixText and suffixText enabled
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { file: "/a.ts", formatOptions: {}, preferences: { providePrefixAndSuffixTextForRename: true } }
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x")
        });

        // rename from file with prefixText and suffixText disabled
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, "x")
        });
        baselineTsserverLogs("rename", "rename behavior is based on file of rename initiation", session);
    });
});
