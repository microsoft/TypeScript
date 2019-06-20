namespace ts.projectSystem {
    describe("unittests:: tsserver:: getExportReferences", () => {
        it("should get const variable declaration references", () => {
            const mainTs: File = {
                path: "/main.ts",
                content: 'import { value } from "./mod";',
            };
            const modTs: File = {
                path: "/mod.ts",
                content: "export const value = 0;",
            };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}",
            };

            const host = createServerHost([mainTs, modTs, tsconfig]);
            const session = createSession(host);
            openFilesForSession([mainTs, modTs], session);

            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(
                session,
                protocol.CommandTypes.References,
                protocolFileLocationFromSubstring(modTs, "value"),
            );

            const referenceModTs = (modTs: File): protocol.ReferencesResponseItem =>
                makeReferenceItem({
                    file: modTs,
                    isDefinition: true,
                    lineText: "export const value = 0;",
                    contextText: "export const value = 0;",
                    text: "value",
                });
            const referenceMainTs = (mainTs: File): protocol.ReferencesResponseItem =>
                makeReferenceItem({
                    file: mainTs,
                    isDefinition: true,
                    lineText: 'import { value } from "./mod";',
                    contextText: 'import { value } from "./mod";',
                    text: "value",
                });

            const expectResponse = {
                refs: [referenceModTs(modTs), referenceMainTs(mainTs)],
                symbolDisplayString: "const value: 0",
                symbolName: "value",
                symbolStartOffset: protocolLocationFromSubstring(modTs.content, "value").offset,
            };

            assert.deepEqual(response, expectResponse);
        });
    });
}
