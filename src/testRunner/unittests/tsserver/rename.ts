import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: rename", () => {
    it("works with fileToRename", () => {
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: "export const a = 0;" };
        const bTs: ts.projectSystem.File = { path: "/b.ts", content: 'import { a } from "./a";' };

        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs, bTs]));
        ts.projectSystem.openFilesForSession([bTs], session);

        // rename fails with allowRenameOfImportPath disabled
        const response1 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(bTs, 'a";'));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response1, {
            info: {
                canRename: false,
                localizedErrorMessage: "You cannot rename this element."
            },
            locs: [],
        });

        // rename succeeds with allowRenameOfImportPath enabled in host
        session.getProjectService().setHostConfiguration({ preferences: { allowRenameOfImportPath: true } });
        const response2 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(bTs, 'a";'));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response2, {
            info: {
                canRename: true,
                fileToRename: aTs.path,
                displayName: aTs.path,
                fullDisplayName: aTs.path,
                kind: ts.ScriptElementKind.moduleElement,
                kindModifiers: "",
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(bTs.content, "a", { index: 1 }),
            },
            locs: [{
                file: bTs.path,
                locs: [
                    ts.projectSystem.protocolRenameSpanFromSubstring({
                        fileText: bTs.content,
                        text: "./a",
                        contextText: bTs.content
                    })
                ]
            }],
        });

        // rename succeeds with allowRenameOfImportPath enabled in file
        session.getProjectService().setHostConfiguration({ preferences: { allowRenameOfImportPath: false } });
        session.getProjectService().setHostConfiguration({ file: "/b.ts", formatOptions: {}, preferences: { allowRenameOfImportPath: true } });
        const response3 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(bTs, 'a";'));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response3, {
            info: {
                canRename: true,
                fileToRename: aTs.path,
                displayName: aTs.path,
                fullDisplayName: aTs.path,
                kind: ts.ScriptElementKind.moduleElement,
                kindModifiers: "",
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(bTs.content, "a", { index: 1 }),
            },
            locs: [{
                file: bTs.path,
                locs: [
                    ts.projectSystem.protocolRenameSpanFromSubstring({
                        fileText: bTs.content,
                        text: "./a",
                        contextText: bTs.content
                    })
                ]
            }],
        });
    });

    it("works with prefixText and suffixText when enabled", () => {
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: "const x = 0; const o = { x };" };
        const host = ts.projectSystem.createServerHost([aTs]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([aTs], session);

        // rename with prefixText and suffixText disabled
        const response1 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(aTs, "x"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response1, {
            info: {
                canRename: true,
                fileToRename: undefined,
                displayName: "x",
                fullDisplayName: "x",
                kind: ts.ScriptElementKind.constElement,
                kindModifiers: ts.ScriptElementKindModifier.none,
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(aTs.content, "x"),
            },
            locs: [
                {
                    file: aTs.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            contextText: "const x = 0;"
                        }),
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            options: { index: 1 }
                        }),
                    ],
                },
            ],
        });

        // rename with prefixText and suffixText enabled in host
        session.getProjectService().setHostConfiguration({ preferences: { providePrefixAndSuffixTextForRename: true } });
        const response2 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(aTs, "x"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response2, {
            info: {
                canRename: true,
                fileToRename: undefined,
                displayName: "x",
                fullDisplayName: "x",
                kind: ts.ScriptElementKind.constElement,
                kindModifiers: ts.ScriptElementKindModifier.none,
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(aTs.content, "x"),
            },
            locs: [
                {
                    file: aTs.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            contextText: "const x = 0;"
                        }),
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            options: { index: 1 },
                            prefixSuffixText: { prefixText: "x: " }
                        }),
                    ],
                },
            ],
        });

        // rename with prefixText and suffixText enabled for file
        session.getProjectService().setHostConfiguration({ preferences: { providePrefixAndSuffixTextForRename: false } });
        session.getProjectService().setHostConfiguration({ file: "/a.ts", formatOptions: {}, preferences: { providePrefixAndSuffixTextForRename: true } });
        const response3 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(aTs, "x"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response3, {
            info: {
                canRename: true,
                fileToRename: undefined,
                displayName: "x",
                fullDisplayName: "x",
                kind: ts.ScriptElementKind.constElement,
                kindModifiers: ts.ScriptElementKindModifier.none,
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(aTs.content, "x"),
            },
            locs: [
                {
                    file: aTs.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            contextText: "const x = 0;"
                        }),
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            options: { index: 1 },
                            prefixSuffixText: { prefixText: "x: " }
                        }),
                    ],
                },
            ],
        });
    });

    it("export default anonymous function works with prefixText and suffixText when disabled", () => {
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: "export default function() {}" };
        const bTs: ts.projectSystem.File = { path: "/b.ts", content: `import aTest from "./a"; function test() { return aTest(); }` };

        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs, bTs]));
        ts.projectSystem.openFilesForSession([bTs], session);

        session.getProjectService().setHostConfiguration({ preferences: { providePrefixAndSuffixTextForRename: false } });
        const response1 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(bTs, "aTest("));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response1, {
            info: {
                canRename: true,
                fileToRename: undefined,
                displayName: "aTest",
                fullDisplayName: "aTest",
                kind: ts.ScriptElementKind.alias,
                kindModifiers: "export",
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(bTs.content, "aTest", { index: 1 })
            },
            locs: [{
                file: bTs.path,
                locs: [
                    ts.projectSystem.protocolRenameSpanFromSubstring({
                        fileText: bTs.content,
                        text: "aTest",
                        contextText: `import aTest from "./a";`
                    }),
                    ts.projectSystem.protocolRenameSpanFromSubstring({
                        fileText: bTs.content,
                        text: "aTest",
                        options: { index: 1 },
                    })
                ]
            }],
        });
    });

    it("rename behavior is based on file of rename initiation", () => {
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: "const x = 1; export { x };" };
        const bTs: ts.projectSystem.File = { path: "/b.ts", content: `import { x } from "./a"; const y = x + 1;` };
        const host = ts.projectSystem.createServerHost([aTs, bTs]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([aTs, bTs], session);

        // rename from file with prefixText and suffixText enabled
        session.getProjectService().setHostConfiguration({ file: "/a.ts", formatOptions: {}, preferences: { providePrefixAndSuffixTextForRename: true } });
        const response1 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(aTs, "x"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response1, {
            info: {
                canRename: true,
                fileToRename: undefined,
                displayName: "x",
                fullDisplayName: "x",
                kind: ts.ScriptElementKind.constElement,
                kindModifiers: ts.ScriptElementKindModifier.none,
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(aTs.content, "x"),
            },
            locs: [
                {
                    file: aTs.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            contextText: "const x = 1;"
                        }),
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            options: { index: 2 },
                            contextText: "export { x };",
                            prefixSuffixText: { suffixText: " as x" }
                        }),
                    ],
                },
            ],
        });

        // rename from file with prefixText and suffixText disabled
        const response2 = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.RenameRequest, ts.projectSystem.protocol.RenameResponse>(session, ts.projectSystem.protocol.CommandTypes.Rename, ts.projectSystem.protocolFileLocationFromSubstring(bTs, "x"));
        assert.deepEqual<ts.projectSystem.protocol.RenameResponseBody | undefined>(response2, {
            info: {
                canRename: true,
                fileToRename: undefined,
                displayName: "x",
                fullDisplayName: "x",
                kind: ts.ScriptElementKind.alias,
                kindModifiers: ts.ScriptElementKindModifier.none,
                triggerSpan: ts.projectSystem.protocolTextSpanFromSubstring(bTs.content, "x"),
            },
            locs: [
                {
                    file: bTs.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: bTs.content,
                            text: "x",
                            contextText: `import { x } from "./a";`
                        }),
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: bTs.content,
                            text: "x",
                            options: { index: 1 },
                        })
                    ]
                },
                {
                    file: aTs.path,
                    locs: [
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            contextText: "const x = 1;"
                        }),
                        ts.projectSystem.protocolRenameSpanFromSubstring({
                            fileText: aTs.content,
                            text: "x",
                            options: { index: 2 },
                            contextText: "export { x };",
                        }),
                    ],
                },
            ],
        });
    });
});
