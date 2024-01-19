import * as ts from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    libContent,
} from "../helpers/contents";
import {
    baselineTsserverLogs,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: rename", () => {
    it("works with fileToRename", () => {
        const aTs: File = { path: "/a.ts", content: "export const a = 0;" };
        const bTs: File = { path: "/b.ts", content: 'import { a } from "./a";' };

        const host = createServerHost([aTs, bTs]);
        const session = new TestSession(host);
        openFilesForSession([bTs], session);

        // rename fails with allowRenameOfImportPath disabled
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, 'a";'),
        });

        // rename succeeds with allowRenameOfImportPath enabled in host
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { allowRenameOfImportPath: true } },
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, 'a";'),
        });

        // rename succeeds with allowRenameOfImportPath enabled in file
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { allowRenameOfImportPath: false } },
        });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { file: "/b.ts", formatOptions: {}, preferences: { allowRenameOfImportPath: true } },
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, 'a";'),
        });
        baselineTsserverLogs("rename", "works with fileToRename", session);
    });

    it("works with prefixText and suffixText when enabled", () => {
        const aTs: File = { path: "/a.ts", content: "const x = 0; const o = { x };" };
        const host = createServerHost([aTs]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        // rename with prefixText and suffixText disabled
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x"),
        });
        // rename with prefixText and suffixText enabled in host
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { providePrefixAndSuffixTextForRename: true } },
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x"),
        });

        // rename with prefixText and suffixText enabled for file
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { providePrefixAndSuffixTextForRename: false } },
        });
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { file: "/a.ts", formatOptions: {}, preferences: { providePrefixAndSuffixTextForRename: true } },
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x"),
        });
        baselineTsserverLogs("rename", "works with prefixText and suffixText when enabled", session);
    });

    it("export default anonymous function works with prefixText and suffixText when disabled", () => {
        const aTs: File = { path: "/a.ts", content: "export default function() {}" };
        const bTs: File = { path: "/b.ts", content: `import aTest from "./a"; function test() { return aTest(); }` };

        const host = createServerHost([aTs, bTs]);
        const session = new TestSession(host);
        openFilesForSession([bTs], session);

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { providePrefixAndSuffixTextForRename: false } },
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, "aTest("),
        });
        baselineTsserverLogs("rename", "export default anonymous function works with prefixText and suffixText when disabled", session);
    });

    it("rename behavior is based on file of rename initiation", () => {
        const aTs: File = { path: "/a.ts", content: "const x = 1; export { x };" };
        const bTs: File = { path: "/b.ts", content: `import { x } from "./a"; const y = x + 1;` };
        const host = createServerHost([aTs, bTs]);
        const session = new TestSession(host);
        openFilesForSession([aTs, bTs], session);

        // rename from file with prefixText and suffixText enabled
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { file: "/a.ts", formatOptions: {}, preferences: { providePrefixAndSuffixTextForRename: true } },
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(aTs, "x"),
        });

        // rename from file with prefixText and suffixText disabled
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, "x"),
        });
        baselineTsserverLogs("rename", "rename behavior is based on file of rename initiation", session);
    });

    it("with symlinks and case difference", () => {
        const file: File = {
            path: "C:/temp/test/project1/index.ts",
            content: dedent`
                export function myFunc() {
                }
            `,
        };
        const host = createServerHost({
            [file.path]: file.content,
            "C:/temp/test/project1/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    composite: true,
                },
            }),
            "C:/temp/test/project1/package.json": jsonToReadableText({
                name: "project1",
                version: "1.0.0",
                main: "index.js",
            }),
            "C:/temp/test/project2/index.ts": dedent`
                import { myFunc } from 'project1'
                myFunc();
            `,
            "C:/temp/test/project2/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    composite: true,
                },
                references: [
                    { path: "../project1" },
                ],
            }),
            "C:/temp/test/tsconfig.json": jsonToReadableText({
                references: [
                    { path: "./project1" },
                    { path: "./project2" },
                ],
                files: [],
                include: [],
            }),
            "C:/temp/test/node_modules/project1": { symLink: "c:/temp/test/project1" },
            [libFile.path]: libContent,
        }, { windowsStyleRoot: "C:/" });
        const session = new TestSession(host);
        openFilesForSession([file.path.toLowerCase()], session);
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(file, "myFunc"),
        });
        baselineTsserverLogs("rename", "with symlinks and case difference", session);
    });

    it("rename TS file with js extension", () => {
        const aTs: File = { path: "/a.ts", content: "export const a = 1;" };
        const bTs: File = { path: "/b.ts", content: `import * as foo from './a.js';` };

        const host = createServerHost([aTs, bTs]);
        const session = new TestSession(host);
        openFilesForSession([aTs, bTs], session);

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { allowRenameOfImportPath: true } },
        });
        session.executeCommandSeq<ts.server.protocol.RenameRequest>({
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: protocolFileLocationFromSubstring(bTs, "a.js"),
        });
        baselineTsserverLogs("rename", "rename TS file with js extension", session);
    });
});
