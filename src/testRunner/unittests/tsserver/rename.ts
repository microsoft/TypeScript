namespace ts.projectSystem {
    describe("tsserver:: rename", () => {
        it("works with fileToRename", () => {
            const aTs: File = { path: "/a.ts", content: "export const a = 0;" };
            const bTs: File = { path: "/b.ts", content: 'import { a } from "./a";' };

            const session = createSession(createServerHost([aTs, bTs]));
            openFilesForSession([bTs], session);

            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(bTs, 'a";'));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    fileToRename: aTs.path,
                    displayName: aTs.path,
                    fullDisplayName: aTs.path,
                    kind: ScriptElementKind.moduleElement,
                    kindModifiers: "",
                    triggerSpan: protocolTextSpanFromSubstring(bTs.content, "a", { index: 1 }),
                },
                locs: [{ file: bTs.path, locs: [protocolRenameSpanFromSubstring(bTs.content, "./a")] }],
            });
        });

        it("works with prefixText and suffixText", () => {
            const aTs: File = { path: "/a.ts", content: "const x = 0; const o = { x };" };
            const session = createSession(createServerHost([aTs]));
            openFilesForSession([aTs], session);

            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, protocolFileLocationFromSubstring(aTs, "x"));
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    fileToRename: undefined,
                    displayName: "x",
                    fullDisplayName: "x",
                    kind: ScriptElementKind.constElement,
                    kindModifiers: ScriptElementKindModifier.none,
                    triggerSpan: protocolTextSpanFromSubstring(aTs.content, "x"),
                },
                locs: [
                    {
                        file: aTs.path,
                        locs: [
                            protocolRenameSpanFromSubstring(aTs.content, "x"),
                            protocolRenameSpanFromSubstring(aTs.content, "x", { index: 1 }, { prefixText: "x: " }),
                        ],
                    },
                ],
            });
        });
    });
}
