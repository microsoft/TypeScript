import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: refactors", () => {
    it("use formatting options", () => {
        const file = {
            path: "/a.ts",
            content: "function f() {\n  1;\n}",
        };
        const host = ts.projectSystem.createServerHost([file]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([file], session);

        const response0 = session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                formatOptions: {
                    indentSize: 2,
                },
            },
        }).response;
        assert.deepEqual(response0, /*expected*/ undefined);

        const response1 = session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                refactor: "Extract Symbol",
                action: "function_scope_1",
                file: "/a.ts",
                startLine: 2,
                startOffset: 3,
                endLine: 2,
                endOffset: 4,
            },
        }).response;
        assert.deepEqual(response1, {
            edits: [
                {
                    fileName: "/a.ts",
                    textChanges: [
                        {
                            start: { line: 2, offset: 3 },
                            end: { line: 2, offset: 5 },
                            newText: "newFunction();",
                        },
                        {
                            start: { line: 3, offset: 2 },
                            end: { line: 3, offset: 2 },
                            newText: "\n\nfunction newFunction() {\n  1;\n}\n",
                        },
                    ]
                }
            ],
            renameFilename: "/a.ts",
            renameLocation: { line: 2, offset: 3 },
        });
    });

    it("handles text changes in tsconfig.json", () => {
        const aTs = {
            path: "/a.ts",
            content: "export const a = 0;",
        };
        const tsconfig = {
            path: "/tsconfig.json",
            content: '{ "files": ["./a.ts"] }',
        };

        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs, tsconfig]));
        ts.projectSystem.openFilesForSession([aTs], session);

        const response1 = session.executeCommandSeq<ts.server.protocol.GetEditsForRefactorRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForRefactor,
            arguments: {
                refactor: "Move to a new file",
                action: "Move to a new file",
                file: "/a.ts",
                startLine: 1,
                startOffset: 1,
                endLine: 1,
                endOffset: 20,
            },
        }).response;
        assert.deepEqual(response1, {
            edits: [
                {
                    fileName: "/a.ts",
                    textChanges: [
                        {
                            start: { line: 1, offset: 1 },
                            end: { line: 1, offset: 20 },
                            newText: "",
                        },
                    ],
                },
                {
                    fileName: "/tsconfig.json",
                    textChanges: [
                        {
                            start: { line: 1, offset: 21 },
                            end: { line: 1, offset: 21 },
                            newText: ", \"./a.1.ts\"",
                        },
                    ],
                },
                {
                    fileName: "/a.1.ts",
                    textChanges: [
                        {
                            start: { line: 0, offset: 0 },
                            end: { line: 0, offset: 0 },
                            newText: "export const a = 0;\n",
                        },
                    ],
                }
            ],
            renameFilename: undefined,
            renameLocation: undefined,
        });
    });

    it("handles canonicalization of tsconfig path", () => {
        const aTs: ts.projectSystem.File = { path: "/Foo/a.ts", content: "const x = 0;" };
        const tsconfig: ts.projectSystem.File = { path: "/Foo/tsconfig.json", content: '{ "files": ["./a.ts"] }' };
        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs, tsconfig]));
        ts.projectSystem.openFilesForSession([aTs], session);

        const result = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.GetEditsForRefactorRequest, ts.projectSystem.protocol.GetEditsForRefactorResponse>(session, ts.projectSystem.protocol.CommandTypes.GetEditsForRefactor, {
            file: aTs.path,
            startLine: 1,
            startOffset: 1,
            endLine: 2,
            endOffset: aTs.content.length,
            refactor: "Move to a new file",
            action: "Move to a new file",
        });
        assert.deepEqual<ts.projectSystem.protocol.RefactorEditInfo | undefined>(result, {
            edits: [
                {
                    fileName: aTs.path,
                    textChanges: [{ start: { line: 1, offset: 1 }, end: { line: 1, offset: aTs.content.length + 1 }, newText: "" }],
                },
                {
                    fileName: tsconfig.path,
                    textChanges: [{ start: { line: 1, offset: 21 }, end: { line: 1, offset: 21 }, newText: ', "./x.ts"' }],
                },
                {
                    fileName: "/Foo/x.ts",
                    textChanges: [{ start: { line: 0, offset: 0 }, end: { line: 0, offset: 0 }, newText: "const x = 0;\n" }],
                },
            ],
            renameFilename: undefined,
            renameLocation: undefined,
        });
    });
});
