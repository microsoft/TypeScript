namespace ts.projectSystem {
    describe("unittests:: tsserver:: completions", () => {
        it("works", () => {
            const aTs: File = {
                path: "/a.ts",
                content: "export const foo = 0;",
            };
            const bTs: File = {
                path: "/b.ts",
                content: "foo",
            };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}",
            };

            const session = createSession(createServerHost([aTs, bTs, tsconfig]));
            openFilesForSession([aTs, bTs], session);

            const requestLocation: protocol.FileLocationRequestArgs = {
                file: bTs.path,
                line: 1,
                offset: 3,
            };

            const response = executeSessionRequest<protocol.CompletionsRequest, protocol.CompletionInfoResponse>(session, protocol.CommandTypes.CompletionInfo, {
                ...requestLocation,
                includeExternalModuleExports: true,
                prefix: "foo",
            });
            const entry: protocol.CompletionEntry = {
                hasAction: true,
                insertText: undefined,
                isRecommended: undefined,
                kind: ScriptElementKind.constElement,
                kindModifiers: ScriptElementKindModifier.exportedModifier,
                name: "foo",
                replacementSpan: undefined,
                sortText: "0",
                source: "/a",
            };
            assert.deepEqual<protocol.CompletionInfo | undefined>(response, {
                isGlobalCompletion: true,
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: [entry],
            });

            const detailsRequestArgs: protocol.CompletionDetailsRequestArgs = {
                ...requestLocation,
                entryNames: [{ name: "foo", source: "/a" }],
            };

            const detailsResponse = executeSessionRequest<protocol.CompletionDetailsRequest, protocol.CompletionDetailsResponse>(session, protocol.CommandTypes.CompletionDetails, detailsRequestArgs);
            const detailsCommon: protocol.CompletionEntryDetails & CompletionEntryDetails = {
                displayParts: [
                    keywordPart(SyntaxKind.ConstKeyword),
                    spacePart(),
                    displayPart("foo", SymbolDisplayPartKind.localName),
                    punctuationPart(SyntaxKind.ColonToken),
                    spacePart(),
                    displayPart("0", SymbolDisplayPartKind.stringLiteral),
                ],
                documentation: emptyArray,
                kind: ScriptElementKind.constElement,
                kindModifiers: ScriptElementKindModifier.exportedModifier,
                name: "foo",
                source: [{ text: "./a", kind: "text" }],
                tags: undefined,
            };
            assert.deepEqual<ReadonlyArray<protocol.CompletionEntryDetails> | undefined>(detailsResponse, [
                {
                    codeActions: [
                        {
                            description: `Import 'foo' from module "./a"`,
                            changes: [
                                {
                                    fileName: "/b.ts",
                                    textChanges: [
                                        {
                                            start: { line: 1, offset: 1 },
                                            end: { line: 1, offset: 1 },
                                            newText: 'import { foo } from "./a";\n\n',
                                        },
                                    ],
                                },
                            ],
                            commands: undefined,
                        },
                    ],
                    ...detailsCommon,
                },
            ]);

            interface CompletionDetailsFullRequest extends protocol.FileLocationRequest {
                readonly command: protocol.CommandTypes.CompletionDetailsFull;
                readonly arguments: protocol.CompletionDetailsRequestArgs;
            }
            interface CompletionDetailsFullResponse extends protocol.Response {
                readonly body?: ReadonlyArray<CompletionEntryDetails>;
            }
            const detailsFullResponse = executeSessionRequest<CompletionDetailsFullRequest, CompletionDetailsFullResponse>(session, protocol.CommandTypes.CompletionDetailsFull, detailsRequestArgs);
            assert.deepEqual<ReadonlyArray<CompletionEntryDetails> | undefined>(detailsFullResponse, [
                {
                    codeActions: [
                        {
                            description: `Import 'foo' from module "./a"`,
                            changes: [
                                {
                                    fileName: "/b.ts",
                                    textChanges: [createTextChange(createTextSpan(0, 0), 'import { foo } from "./a";\n\n')],
                                },
                            ],
                            commands: undefined,
                        }
                    ],
                    ...detailsCommon,
                }
            ]);
        });
    });
}
