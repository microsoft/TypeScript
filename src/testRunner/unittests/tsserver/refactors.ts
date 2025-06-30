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

describe("unittests:: tsserver:: refactors::", () => {
    it("use formatting options", () => {
        const file = {
            path: "/home/src/projects/project/a.ts",
            content: "function f() {\n  1;\n}",
        };
        const host = TestServerHost.createServerHost([file]);
        const session = new TestSession(host);
        openFilesForSession([file], session);

        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                formatOptions: {
                    indentSize: 2,
                },
            },
        });

        session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                refactor: "Extract Symbol",
                action: "function_scope_1",
                file: "/home/src/projects/project/a.ts",
                startLine: 2,
                startOffset: 3,
                endLine: 2,
                endOffset: 4,
            },
        });
        baselineTsserverLogs("refactors", "use formatting options", session);
    });

    it("handles text changes in tsconfig.json", () => {
        const aTs = {
            path: "/home/src/projects/project/a.ts",
            content: "export const a = 0;",
        };
        const tsconfig = {
            path: "/home/src/projects/project/tsconfig.json",
            content: '{ "files": ["./a.ts"] }',
        };

        const host = TestServerHost.createServerHost([aTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                refactor: "Move to a new file",
                action: "Move to a new file",
                file: "/home/src/projects/project/a.ts",
                startLine: 1,
                startOffset: 1,
                endLine: 1,
                endOffset: 20,
            },
        });
        baselineTsserverLogs("refactors", "handles text changes in tsconfig", session);
    });

    it("handles canonicalization of tsconfig path", () => {
        const aTs: File = { path: "/home/src/projects/project/Foo/a.ts", content: "const x = 0;" };
        const tsconfig: File = { path: "/home/src/projects/project/Foo/tsconfig.json", content: '{ "files": ["./a.ts"] }' };
        const host = TestServerHost.createServerHost([aTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                file: aTs.path,
                startLine: 1,
                startOffset: 1,
                endLine: 2,
                endOffset: aTs.content.length,
                refactor: "Move to a new file",
                action: "Move to a new file",
            },
        });
        baselineTsserverLogs("refactors", "handles canonicalization of tsconfig path", session);
    });

    it("handles moving statement to an existing file", () => {
        const aTs: File = { path: "/home/src/projects/project/Foo/a.ts", content: "const x = 0;" };
        const bTs: File = {
            path: "/home/src/projects/project/Foo/b.ts",
            content: `import {} from "./bar";
    const a = 1;`,
        };
        const tsconfig: File = { path: "/home/src/projects/project/Foo/tsconfig.json", content: `{ "files": ["./a.ts", "./b.ts"] }` };
        const host = TestServerHost.createServerHost([aTs, bTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                file: aTs.path,
                startLine: 1,
                startOffset: 1,
                endLine: 2,
                endOffset: aTs.content.length,
                refactor: "Move to file",
                action: "Move to file",
                interactiveRefactorArguments: { targetFile: "/home/src/projects/project/Foo/b.ts" },
            },
        });
        baselineTsserverLogs("refactors", "handles moving statement to an existing file", session);
    });

    it("handles moving statements to a non-TS file", () => {
        const aTs: File = {
            path: "/home/src/projects/project/Foo/a.ts",
            content: "const x = 0;",
        };
        const bTxt: File = {
            path: "/home/src/projects/project/Foo/b.txt",
            content: "",
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/Foo/tsconfig.json",
            content: `{ "files": ["./a.ts"] }`,
        };
        const host = TestServerHost.createServerHost([aTs, bTxt, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                file: aTs.path,
                startLine: 1,
                startOffset: 1,
                endLine: 2,
                endOffset: aTs.content.length,
                refactor: "Move to file",
                action: "Move to file",
                interactiveRefactorArguments: { targetFile: "/home/src/projects/project/Foo/b.txt" },
            },
        });
        baselineTsserverLogs("refactors", "handles moving statements to a non-TS file", session);
    });

    it("handles moving statements to a TS file that is not included in the TS project", () => {
        const fooATs: File = {
            path: "/home/src/projects/project/Foo/a.ts",
            content: "",
        };
        const fooTsconfig: File = {
            path: "/home/src/projects/project/Foo/tsconfig.json",
            content: `{ "files": ["./a.ts"] }`,
        };

        const barATs: File = {
            path: "/home/src/projects/project/Bar/a.ts",
            content: [
                "const a = 1;",
                "const b = 2;",
                "console.log(a, b);",
            ].join("\n"),
        };
        const barTsconfig: File = {
            path: "/home/src/projects/project/Bar/tsconfig.json",
            content: `{ "files": ["./a.ts"] }`,
        };
        const host = TestServerHost.createServerHost([fooATs, fooTsconfig, barATs, barTsconfig]);
        const session = new TestSession(host);
        openFilesForSession([barATs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                file: barATs.path,
                startLine: 1,
                startOffset: 1,
                endLine: 1,
                endOffset: 13,
                refactor: "Move to file",
                action: "Move to file",
                interactiveRefactorArguments: { targetFile: "/home/src/projects/project/Foo/a.ts" },
            },
        });
        baselineTsserverLogs("refactors", "handles moving statements to a TS file that is not included in the TS project", session);
    });
});
