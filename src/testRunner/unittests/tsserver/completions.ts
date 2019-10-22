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
                sortText: Completions.SortText.AutoImportSuggestions,
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
            assert.deepEqual<readonly protocol.CompletionEntryDetails[] | undefined>(detailsResponse, [
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
                readonly body?: readonly CompletionEntryDetails[];
            }
            const detailsFullResponse = executeSessionRequest<CompletionDetailsFullRequest, CompletionDetailsFullResponse>(session, protocol.CommandTypes.CompletionDetailsFull, detailsRequestArgs);
            assert.deepEqual<readonly CompletionEntryDetails[] | undefined>(detailsFullResponse, [
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

        describe("completions with project references", () => {
            const config: File = {
                path: `${projectRoot}/tsconfig.json`,
                content: JSON.stringify({
                    include: ["src/**/*"],
                    exclude: ["src/inner/**/*"],
                    references: [{ path: "src/inner" }]
                })
            };
            const newText = "const b: I";
            const mod: File = {
                path: `${projectRoot}/src/module/mod.ts`,
                content: `import { A } from "../inner/test";
A;
${newText}
`
            };
            const innerTsconfig: File = {
                path: `${projectRoot}/src/inner/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true }
                })
            };
            const innerTest: File = {
                path: `${projectRoot}/src/inner/test.ts`,
                content: `import { IAM } from "aws-sdk";
export const A = 5;
declare const blah: IAM;
`
            };
            const awsSdkIndex: File = {
                path: `${projectRoot}/node_modules/aws-sdk/index.d.ts`,
                content: `export * from './lib/core';
export class Config {
    str: string;
};
`
            };
            const awsSdkLibCore: File = {
                path: `${projectRoot}/node_modules/aws-sdk/lib/core.d.ts`,
                content: `export class IAM {
  someProp: string;
}
`
            };

            function getCompletionsFrom(innerTest: File) {
                const host = createServerHost([libFile, config, mod, innerTsconfig, innerTest, awsSdkIndex, awsSdkLibCore]);
                const session = createSession(host);
                openFilesForSession([{ file: mod, projectRootPath: projectRoot }], session);
                const service = session.getProjectService();
                checkNumberOfProjects(service, { configuredProjects: 1 });
                const project = service.configuredProjects.get(config.path)!;
                checkProjectActualFiles(project, [libFile, config, mod, innerTest, awsSdkLibCore, awsSdkIndex].map(f => f.path));
                return (session.executeCommandSeq<protocol.CompletionsRequest>({
                    command: protocol.CommandTypes.CompletionInfo,
                    arguments: {
                        file: mod.path,
                        line: 3,
                        offset: newText.length + 1,
                        includeExternalModuleExports: true,
                    }
                })!.response as protocol.CompletionInfo).entries.filter(entry => entry.hasAction);
            }

            function createCompletionEntry(name: string, source: string): protocol.CompletionEntry {
                return {
                    hasAction: true,
                    insertText: undefined,
                    isRecommended: undefined,
                    kind: ScriptElementKind.classElement,
                    kindModifiers: "export,declare",
                    name,
                    replacementSpan: undefined,
                    sortText: Completions.SortText.AutoImportSuggestions,
                    source
                };
            }

            it("when inner source does not export internal library data", () => {
                assert.deepEqual(
                    getCompletionsFrom(innerTest),
                    [
                        createCompletionEntry("Config", `${projectRoot}/node_modules/aws-sdk/index`),
                        createCompletionEntry("IAM", `${projectRoot}/node_modules/aws-sdk/lib/core`),
                    ]
                );
            });

            it("when inner source exports internal library data", () => {
                assert.deepEqual(
                    getCompletionsFrom({
                        path: innerTest.path,
                        content: `${innerTest.content}export { IAM } from "aws-sdk";
`}),
                    [
                        createCompletionEntry("Config", `${projectRoot}/node_modules/aws-sdk/index`),
                        createCompletionEntry("IAM", `${projectRoot}/node_modules/aws-sdk/lib/core`),
                    ]
                );
            });
        });
    });
}
