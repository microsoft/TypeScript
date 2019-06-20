namespace ts.projectSystem {
    describe("unittests:: tsserver:: getExportReferences", () => {
        const mainTs: File = {
            path: "/main.ts",
            content: 'import { value, valueA, valueB, valueC, valueD } from "./mod";',
        };
        const modTs: File = {
            path: "/mod.ts",
            content: `export const value = 0;
export const [valueA, valueB] = [0, 1];
export const { valueC, valueD } = { valueC: 0, valueD: 1 };`,
        };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: "{}",
        };

        function makeSampleSession() {
            const host = createServerHost([mainTs, modTs, tsconfig]);
            const session = createSession(host);
            openFilesForSession([mainTs, modTs], session);
            return session;
        }

        const referenceMainTs = (mainTs: File, text: string): protocol.ReferencesResponseItem =>
            makeReferenceItem({
                file: mainTs,
                isDefinition: true,
                lineText: 'import { value, valueA, valueB, valueC, valueD } from "./mod";',
                contextText: 'import { value, valueA, valueB, valueC, valueD } from "./mod";',
                text,
            });

        it("should get const variable declaration references", () => {
            const session = makeSampleSession();

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
            const expectResponse = {
                refs: [referenceModTs(modTs), referenceMainTs(mainTs, "value")],
                symbolDisplayString: "const value: 0",
                symbolName: "value",
                symbolStartOffset: protocolLocationFromSubstring(modTs.content, "value").offset,
            };

            assert.deepEqual(response, expectResponse);
        });

        it("should get array destructuring declaration references", () => {
            const session = makeSampleSession();
            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(
                session,
                protocol.CommandTypes.References,
                protocolFileLocationFromSubstring(modTs, "valueA"),
            );

            const referenceModTs = (modTs: File): protocol.ReferencesResponseItem =>
                makeReferenceItem({
                    file: modTs,
                    isDefinition: true,
                    lineText: "export const [valueA, valueB] = [0, 1];",
                    contextText: "export const [valueA, valueB] = [0, 1];",
                    text: "valueA",
                });

            const expectResponse = {
                refs: [referenceModTs(modTs), referenceMainTs(mainTs, "valueA")],
                symbolDisplayString: "const valueA: number",
                symbolName: "valueA",
                symbolStartOffset: protocolLocationFromSubstring(modTs.content, "valueA").offset,
            };

            assert.deepEqual(response, expectResponse);
        });

        it("should get object destructuring declaration references", () => {
            const session = makeSampleSession();
            const response = executeSessionRequest<protocol.ReferencesRequest, protocol.ReferencesResponse>(
                session,
                protocol.CommandTypes.References,
                protocolFileLocationFromSubstring(modTs, "valueC"),
            );

            const referenceModTs = (
                modTs: File,
                opts: {
                    contextText: string;
                    options?: SpanFromSubstringOptions;
                    contextOptions?: SpanFromSubstringOptions;
                },
            ): protocol.ReferencesResponseItem =>
                makeReferenceItem({
                    file: modTs,
                    isDefinition: true,
                    lineText: "export const { valueC, valueD } = { valueC: 0, valueD: 1 };",
                    contextText: opts.contextText,
                    text: "valueC",
                    options: opts.options,
                    contextOptions: opts.contextOptions,
                });

            const expectResponse = {
                refs: [
                    referenceModTs(modTs, {
                        contextText: "export const { valueC, valueD } = { valueC: 0, valueD: 1 };",
                    }),
                    referenceMainTs(mainTs, "valueC"),
                    referenceModTs(modTs, {
                        contextText: "valueC: 0",
                        options: { index: 1 },
                    }),
                ],
                symbolDisplayString: "const valueC: number",
                symbolName: "valueC",
                symbolStartOffset: protocolLocationFromSubstring(modTs.content, "valueC").offset,
            };

            assert.deepEqual(response, expectResponse);
        });
    });
}
