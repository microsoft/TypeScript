import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: completions", () => {
    it("works", () => {
        const aTs: ts.projectSystem.File = {
            path: "/a.ts",
            content: "export const foo = 0;",
        };
        const bTs: ts.projectSystem.File = {
            path: "/b.ts",
            content: "foo",
        };
        const tsconfig: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: "{}",
        };

        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([aTs, bTs, tsconfig]));
        ts.projectSystem.openFilesForSession([aTs, bTs], session);

        const requestLocation: ts.projectSystem.protocol.FileLocationRequestArgs = {
            file: bTs.path,
            line: 1,
            offset: 3,
        };

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.CompletionsRequest, ts.projectSystem.protocol.CompletionInfoResponse>(session, ts.projectSystem.protocol.CommandTypes.CompletionInfo, {
            ...requestLocation,
            includeExternalModuleExports: true,
            prefix: "foo",
        });
        const entry: ts.projectSystem.protocol.CompletionEntry = {
            hasAction: true,
            insertText: undefined,
            isRecommended: undefined,
            kind: ts.ScriptElementKind.constElement,
            kindModifiers: ts.ScriptElementKindModifier.exportedModifier,
            name: "foo",
            replacementSpan: undefined,
            isPackageJsonImport: undefined,
            isImportStatementCompletion: undefined,
            sortText: ts.Completions.SortText.AutoImportSuggestions,
            source: "/a",
            sourceDisplay: undefined,
            isSnippet: undefined,
            data: { exportName: "foo", fileName: "/a.ts", ambientModuleName: undefined, isPackageJsonImport: undefined },
            labelDetails: undefined,
        };

        // `data.exportMapKey` contains a SymbolId so should not be mocked up with an expected value here.
        // Just assert that it's a string and then delete it so we can compare everything else with `deepEqual`.
        const exportMapKey = (response?.entries[0].data as any)?.exportMapKey;
        assert.isString(exportMapKey);
        delete (response?.entries[0].data as any).exportMapKey;
        assert.deepEqual<ts.projectSystem.protocol.CompletionInfo | undefined>(response, {
            flags: ts.CompletionInfoFlags.MayIncludeAutoImports,
            isGlobalCompletion: true,
            isIncomplete: undefined,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            optionalReplacementSpan: { start: { line: 1, offset: 1 }, end: { line: 1, offset: 4 } },
            entries: [entry],
        });

        const detailsRequestArgs: ts.projectSystem.protocol.CompletionDetailsRequestArgs = {
            ...requestLocation,
            entryNames: [{ name: "foo", source: "/a", data: { exportName: "foo", fileName: "/a.ts", exportMapKey } }],
        };

        const detailsResponse = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.CompletionDetailsRequest, ts.projectSystem.protocol.CompletionDetailsResponse>(session, ts.projectSystem.protocol.CommandTypes.CompletionDetails, detailsRequestArgs);
        const detailsCommon: ts.projectSystem.protocol.CompletionEntryDetails & ts.CompletionEntryDetails = {
            displayParts: [
                ts.keywordPart(ts.SyntaxKind.ConstKeyword),
                ts.spacePart(),
                ts.displayPart("foo", ts.SymbolDisplayPartKind.localName),
                ts.punctuationPart(ts.SyntaxKind.ColonToken),
                ts.spacePart(),
                ts.displayPart("0", ts.SymbolDisplayPartKind.stringLiteral),
            ],
            documentation: ts.emptyArray,
            kind: ts.ScriptElementKind.constElement,
            kindModifiers: ts.ScriptElementKindModifier.exportedModifier,
            name: "foo",
            source: [{ text: "./a", kind: "text" }],
            sourceDisplay: [{ text: "./a", kind: "text" }],
        };
        assert.deepEqual<readonly ts.projectSystem.protocol.CompletionEntryDetails[] | undefined>(detailsResponse, [
            {
                codeActions: [
                    {
                        description: `Add import from "./a"`,
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

        interface CompletionDetailsFullRequest extends ts.projectSystem.protocol.FileLocationRequest {
            readonly command: ts.projectSystem.protocol.CommandTypes.CompletionDetailsFull;
            readonly arguments: ts.projectSystem.protocol.CompletionDetailsRequestArgs;
        }
        interface CompletionDetailsFullResponse extends ts.projectSystem.protocol.Response {
            readonly body?: readonly ts.CompletionEntryDetails[];
        }
        const detailsFullResponse = ts.projectSystem.executeSessionRequest<CompletionDetailsFullRequest, CompletionDetailsFullResponse>(session, ts.projectSystem.protocol.CommandTypes.CompletionDetailsFull, detailsRequestArgs);
        assert.deepEqual<readonly ts.CompletionEntryDetails[] | undefined>(detailsFullResponse, [
            {
                codeActions: [
                    {
                        description: `Add import from "./a"`,
                        changes: [
                            {
                                fileName: "/b.ts",
                                textChanges: [ts.createTextChange(ts.createTextSpan(0, 0), 'import { foo } from "./a";\n\n')],
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
        const appPackage: ts.projectSystem.File = {
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
        const appFile: ts.projectSystem.File = {
            path: `${projectRoot}/src/app.js`,
            content: `import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
`
        };
        const localNodeModules = `${projectRoot}/node_modules`;
        const localAtTypes = `${localNodeModules}/@types`;
        const localReactPackage: ts.projectSystem.File = {
            path: `${localAtTypes}/react/package.json`,
            content: JSON.stringify({
                name: "@types/react",
                version: "16.9.14",
            })
        };
        const localReact: ts.projectSystem.File = {
            path: `${localAtTypes}/react/index.d.ts`,
            content: `import * as PropTypes from 'prop-types';
`
        };
        const localReactRouterDomPackage: ts.projectSystem.File = {
            path: `${localNodeModules}/react-router-dom/package.json`,
            content: JSON.stringify({
                name: "react-router-dom",
                version: "5.1.2",
            })
        };
        const localReactRouterDom: ts.projectSystem.File = {
            path: `${localNodeModules}/react-router-dom/index.js`,
            content: `export function foo() {}`
        };
        const localPropTypesPackage: ts.projectSystem.File = {
            path: `${localAtTypes}/prop-types/package.json`,
            content: JSON.stringify({
                name: "@types/prop-types",
                version: "15.7.3",
            })
        };
        const localPropTypes: ts.projectSystem.File = {
            path: `${localAtTypes}/prop-types/index.d.ts`,
            content: `export type ReactComponentLike =
    | string
    | ((props: any, context?: any) => any)
    | (new (props: any, context?: any) => any);
`
        };

        const globalCacheLocation = `c:/typescript`;
        const globalAtTypes = `${globalCacheLocation}/node_modules/@types`;
        const globalReactRouterDomPackage: ts.projectSystem.File = {
            path: `${globalAtTypes}/react-router-dom/package.json`,
            content: JSON.stringify({
                name: "@types/react-router-dom",
                version: "5.1.2",
            })
        };
        const globalReactRouterDom: ts.projectSystem.File = {
            path: `${globalAtTypes}/react-router-dom/index.d.ts`,
            content: `import * as React from 'react';
export interface BrowserRouterProps {
    basename?: string;
    getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);
    forceRefresh?: boolean;
    keyLength?: number;
}`
        };
        const globalReactPackage: ts.projectSystem.File = {
            path: `${globalAtTypes}/react/package.json`,
            content: localReactPackage.content
        };
        const globalReact: ts.projectSystem.File = {
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
            appPackage, ts.projectSystem.libFile,
            localReactPackage,
            localReactRouterDomPackage, localReactRouterDom,
            localPropTypesPackage,
            globalReactRouterDomPackage,
            globalReactPackage,
        ];

        const host = ts.projectSystem.createServerHost(files, { windowsStyleRoot: "c:/" });
        const session = ts.projectSystem.createSession(host, {
            typingsInstaller: new ts.projectSystem.TestTypingsInstaller(globalCacheLocation, /*throttleLimit*/ 5, host),
        });
        const service = session.getProjectService();
        ts.projectSystem.openFilesForSession([appFile], session);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        const windowsStyleLibFilePath = "c:/" + ts.projectSystem.libFile.path.substring(1);
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], filesInProject.map(f => f.path).concat(windowsStyleLibFilePath));
        session.executeCommandSeq<ts.projectSystem.protocol.CompletionsRequest>({
            command: ts.projectSystem.protocol.CommandTypes.CompletionInfo,
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
