import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

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

        const host = createServerHost([aTs, bTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs, bTs], session);

        const requestLocation: ts.server.protocol.FileLocationRequestArgs = {
            file: bTs.path,
            line: 1,
            offset: 3,
        };

        const response = session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                ...requestLocation,
                includeExternalModuleExports: true,
                prefix: "foo",
            },
        }).response as ts.server.protocol.CompletionInfo;
        const exportMapKey = (response?.entries[0].data as any)?.exportMapKey;
        session.executeCommandSeq<ts.server.protocol.CompletionDetailsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionDetails,
            arguments: {
                ...requestLocation,
                entryNames: [{ name: "foo", source: "/a", data: { exportName: "foo", fileName: "/a.ts", exportMapKey } }],
            },
        });

        interface CompletionDetailsFullRequest extends ts.server.protocol.FileLocationRequest {
            readonly command: ts.server.protocol.CommandTypes.CompletionDetailsFull;
            readonly arguments: ts.server.protocol.CompletionDetailsRequestArgs;
        }
        session.executeCommandSeq<CompletionDetailsFullRequest>({
            command: ts.server.protocol.CommandTypes.CompletionDetailsFull,
            arguments: {
                ...requestLocation,
                entryNames: [{ name: "foo", source: "/a", data: { exportName: "foo", fileName: "/a.ts", exportMapKey } }],
            },
        });
        baselineTsserverLogs("completions", "works", session);
    });

    it("works when files are included from two different drives of windows", () => {
        const projectRoot = "e:/myproject";
        const appPackage: File = {
            path: `${projectRoot}/package.json`,
            content: jsonToReadableText({
                name: "test",
                version: "0.1.0",
                dependencies: {
                    "react": "^16.12.0",
                    "react-router-dom": "^5.1.2",
                },
            }),
        };
        const appFile: File = {
            path: `${projectRoot}/src/app.js`,
            content: `import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
`,
        };
        const localNodeModules = `${projectRoot}/node_modules`;
        const localAtTypes = `${localNodeModules}/@types`;
        const localReactPackage: File = {
            path: `${localAtTypes}/react/package.json`,
            content: jsonToReadableText({
                name: "@types/react",
                version: "16.9.14",
            }),
        };
        const localReact: File = {
            path: `${localAtTypes}/react/index.d.ts`,
            content: `import * as PropTypes from 'prop-types';
export class Component {}
`,
        };
        const localReactRouterDomPackage: File = {
            path: `${localNodeModules}/react-router-dom/package.json`,
            content: jsonToReadableText({
                name: "react-router-dom",
                version: "5.1.2",
            }),
        };
        const localReactRouterDom: File = {
            path: `${localNodeModules}/react-router-dom/index.js`,
            content: `export function foo() {}`,
        };
        const localPropTypesPackage: File = {
            path: `${localAtTypes}/prop-types/package.json`,
            content: jsonToReadableText({
                name: "@types/prop-types",
                version: "15.7.3",
            }),
        };
        const localPropTypes: File = {
            path: `${localAtTypes}/prop-types/index.d.ts`,
            content: `export type ReactComponentLike =
    | string
    | ((props: any, context?: any) => any)
    | (new (props: any, context?: any) => any);

export const PropTypes = {};
`,
        };

        const globalTypingsCacheLocation = `c:/typescript`;
        const globalAtTypes = `${globalTypingsCacheLocation}/node_modules/@types`;
        const globalReactRouterDomPackage: File = {
            path: `${globalAtTypes}/react-router-dom/package.json`,
            content: jsonToReadableText({
                name: "@types/react-router-dom",
                version: "5.1.2",
            }),
        };
        const globalReactRouterDom: File = {
            path: `${globalAtTypes}/react-router-dom/index.d.ts`,
            content: `import * as React from 'react';
export interface BrowserRouterProps {
    basename?: string;
    getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);
    forceRefresh?: boolean;
    keyLength?: number;
}`,
        };
        const globalReactPackage: File = {
            path: `${globalAtTypes}/react/package.json`,
            content: localReactPackage.content,
        };
        const globalReact: File = {
            path: `${globalAtTypes}/react/index.d.ts`,
            content: localReact.content,
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
            appPackage,
            libFile,
            localReactPackage,
            localReactRouterDomPackage,
            localReactRouterDom,
            localPropTypesPackage,
            globalReactRouterDomPackage,
            globalReactPackage,
        ];

        const host = createServerHost(files, { windowsStyleRoot: "c:/" });
        const session = new TestSession({ host, globalTypingsCacheLocation });
        openFilesForSession([appFile], session);
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: appFile.path,
                line: 5,
                offset: 1,
                includeExternalModuleExports: true,
                includeInsertTextCompletions: true,
            },
        });
        baselineTsserverLogs(
            "completions",
            "works when files are included from two different drives of windows",
            session,
        );
    });
});
