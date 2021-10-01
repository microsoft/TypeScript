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
                isPackageJsonImport: undefined,
                isImportStatementCompletion: undefined,
                sortText: Completions.SortText.AutoImportSuggestions,
                source: "/a",
                sourceDisplay: undefined,
                isSnippet: undefined,
                data: { exportName: "foo", fileName: "/a.ts", ambientModuleName: undefined, isPackageJsonImport: undefined, moduleSpecifier: undefined }
            };
            assert.deepEqual<protocol.CompletionInfo | undefined>(response, {
                isGlobalCompletion: true,
                isIncomplete: undefined,
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                optionalReplacementSpan: { start: { line: 1, offset: 1 }, end: { line: 1, offset: 4 } },
                entries: [entry],
            });

            const detailsRequestArgs: protocol.CompletionDetailsRequestArgs = {
                ...requestLocation,
                entryNames: [{ name: "foo", source: "/a", data: { exportName: "foo", fileName: "/a.ts" } }],
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
                sourceDisplay: [{ text: "./a", kind: "text" }],
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
                    tags: [],
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
                    tags: [],
                    ...detailsCommon,
                }
            ]);
        });

        it("works when files are included from two different drives of windows", () => {
            const projectRoot = "e:/myproject";
            const appPackage: File = {
                path: `${projectRoot}/package.json`,
                content: JSON.stringify({
                    name: "test",
                    version: "0.1.0",
                    dependencies: {
                        "react": "^16.12.0",
                        "react-router-dom": "^5.1.2",
                    }
                })
            };
            const appFile: File = {
                path: `${projectRoot}/src/app.js`,
                content: `import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
`
            };
            const localNodeModules = `${projectRoot}/node_modules`;
            const localAtTypes = `${localNodeModules}/@types`;
            const localReactPackage: File = {
                path: `${localAtTypes}/react/package.json`,
                content: JSON.stringify({
                    name: "@types/react",
                    version: "16.9.14",
                })
            };
            const localReact: File = {
                path: `${localAtTypes}/react/index.d.ts`,
                content: `import * as PropTypes from 'prop-types';
`
            };
            const localReactRouterDomPackage: File = {
                path: `${localNodeModules}/react-router-dom/package.json`,
                content: JSON.stringify({
                    name: "react-router-dom",
                    version: "5.1.2",
                })
            };
            const localReactRouterDom: File = {
                path: `${localNodeModules}/react-router-dom/index.js`,
                content: `export function foo() {}`
            };
            const localPropTypesPackage: File = {
                path: `${localAtTypes}/prop-types/package.json`,
                content: JSON.stringify({
                    name: "@types/prop-types",
                    version: "15.7.3",
                })
            };
            const localPropTypes: File = {
                path: `${localAtTypes}/prop-types/index.d.ts`,
                content: `export type ReactComponentLike =
    | string
    | ((props: any, context?: any) => any)
    | (new (props: any, context?: any) => any);
`
            };

            const globalCacheLocation = `c:/typescript`;
            const globalAtTypes = `${globalCacheLocation}/node_modules/@types`;
            const globalReactRouterDomPackage: File = {
                path: `${globalAtTypes}/react-router-dom/package.json`,
                content: JSON.stringify({
                    name: "@types/react-router-dom",
                    version: "5.1.2",
                })
            };
            const globalReactRouterDom: File = {
                path: `${globalAtTypes}/react-router-dom/index.d.ts`,
                content: `import * as React from 'react';
export interface BrowserRouterProps {
    basename?: string;
    getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);
    forceRefresh?: boolean;
    keyLength?: number;
}`
            };
            const globalReactPackage: File = {
                path: `${globalAtTypes}/react/package.json`,
                content: localReactPackage.content
            };
            const globalReact: File = {
                path: `${globalAtTypes}/react/index.d.ts`,
                content: localReact.content
            };

            const filesInProject = [
                appFile,
                localReact,
                localPropTypes,
                globalReactRouterDom,
                globalReact,
            ];
            const files = [
                ...filesInProject,
                appPackage, libFile,
                localReactPackage,
                localReactRouterDomPackage, localReactRouterDom,
                localPropTypesPackage,
                globalReactRouterDomPackage,
                globalReactPackage,
            ];

            const host = createServerHost(files, { windowsStyleRoot: "c:/" });
            const session = createSession(host, {
                typingsInstaller: new TestTypingsInstaller(globalCacheLocation, /*throttleLimit*/ 5, host),
            });
            const service = session.getProjectService();
            openFilesForSession([appFile], session);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const windowsStyleLibFilePath = "c:/" + libFile.path.substring(1);
            checkProjectActualFiles(service.inferredProjects[0], filesInProject.map(f => f.path).concat(windowsStyleLibFilePath));
            session.executeCommandSeq<protocol.CompletionsRequest>({
                command: protocol.CommandTypes.CompletionInfo,
                arguments: {
                    file: appFile.path,
                    line: 5,
                    offset: 1,
                    includeExternalModuleExports: true,
                    includeInsertTextCompletions: true
                }
            });
        });
    });
}
