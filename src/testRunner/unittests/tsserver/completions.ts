import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: completions::", () => {
    it("works", () => {
        const aTs: File = {
            path: "/home/src/project/project/a.ts",
            content: "export const foo = 0;",
        };
        const bTs: File = {
            path: "/home/src/project/project/b.ts",
            content: "foo",
        };
        const tsconfig: File = {
            path: "/home/src/project/project/tsconfig.json",
            content: "{}",
        };

        const host = TestServerHost.createServerHost([aTs, bTs, tsconfig]);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includePackageJsonAutoImports: "auto",
                    includeCompletionsForModuleExports: true,
                },
            },
        });
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
                prefix: "foo",
            },
        }).response as ts.server.protocol.CompletionInfo;
        const exportMapKey = (response?.entries[0].data as any)?.exportMapKey;
        session.executeCommandSeq<ts.server.protocol.CompletionDetailsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionDetails,
            arguments: {
                ...requestLocation,
                entryNames: [{
                    name: "foo",
                    source: "/home/src/project/project/a",
                    data: {
                        exportName: "foo",
                        fileName: "/home/src/project/project/a.ts",
                        exportMapKey,
                    },
                }],
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
                entryNames: [{
                    name: "foo",
                    source: "/home/src/project/project/a",
                    data: {
                        exportName: "foo",
                        fileName: "/home/src/project/project/a.ts",
                        exportMapKey,
                    },
                }],
            },
        });
        baselineTsserverLogs("completions", "works", session);
    });

    it("works when files are included from two different drives of windows", () => {
        const projectRoot = "e:/solution/myproject";
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
            localReactPackage,
            localReactRouterDomPackage,
            localReactRouterDom,
            localPropTypesPackage,
            globalReactRouterDomPackage,
            globalReactPackage,
        ];

        const host = TestServerHost.createServerHost(files, { windowsStyleRoot: "c:/", typingsInstallerGlobalCacheLocation: globalTypingsCacheLocation });
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includePackageJsonAutoImports: "auto",
                    includeCompletionsForModuleExports: true,
                    includeCompletionsWithInsertText: true,
                },
            },
        });
        openFilesForSession([appFile], session);
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: appFile.path,
                line: 5,
                offset: 1,
            },
        });
        baselineTsserverLogs(
            "completions",
            "works when files are included from two different drives of windows",
            session,
        );
    });

    it("in project where there are no imports but has project references setup", () => {
        const host = TestServerHost.createServerHost({
            "/user/username/projects/app/src/index.ts": "",
            "/user/username/projects/app/tsconfig.json": JSON.stringify(
                {
                    compilerOptions: { outDir: "dist", rootDir: "src" },
                    include: ["./src/**/*"],
                    references: [
                        { path: "../shared" },
                    ],
                },
                undefined,
                " ",
            ),
            "/user/username/projects/app/package.json": JSON.stringify(
                {
                    name: "app",
                    version: "1.0.0",
                    main: "dist/index.js",
                    dependencies: {
                        shared: "1.0.0",
                    },
                },
                undefined,
                " ",
            ),
            "/user/username/projects/shared/src/index.ts": "export class MyClass { }",
            "/user/username/projects/shared/tsconfig.json": JSON.stringify(
                {
                    compilerOptions: { composite: true, outDir: "dist", rootDir: "src" },
                    include: ["./src/**/*"],
                },
                undefined,
                " ",
            ),
            "/user/username/projects/shared/package.json": JSON.stringify(
                {
                    name: "shared",
                    version: "1.0.0",
                    main: "dist/index.js",
                },
                undefined,
                " ",
            ),
            "/user/username/projects/app/node_modules/shared": { symLink: "/user/username/projects/shared" },
        });
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includePackageJsonAutoImports: "auto",
                    includeCompletionsForModuleExports: true,
                    includeCompletionsWithInsertText: true,
                },
            },
        });
        openFilesForSession(["/user/username/projects/app/src/index.ts"], session);
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: "/user/username/projects/app/src/index.ts",
                line: 1,
                offset: 1,
            },
        });
        baselineTsserverLogs("completions", "in project where there are no imports but has project references setup", session);
    });

    describe("in project reference setup with path mapping", () => {
        function completions(session: TestSession, includeExternalModuleExports?: boolean) {
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: {
                    file: "/user/username/projects/app/src/index.ts",
                    line: 1,
                    offset: 1,
                    includeExternalModuleExports: includeExternalModuleExports ? true : undefined,
                },
            });
        }
        function configure(session: TestSession, includeCompletionsForModuleExports: boolean) {
            session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
                command: ts.server.protocol.CommandTypes.Configure,
                arguments: {
                    preferences: {
                        includePackageJsonAutoImports: "auto",
                        includeCompletionsForModuleExports: includeCompletionsForModuleExports ? true : undefined,
                        includeCompletionsWithInsertText: true,
                    },
                },
            });
        }
        function verify(withExistingImport: boolean, includeCompletionsForModuleExports: boolean) {
            it(`in project reference setup with path mapping${withExistingImport ? " with existing import" : ""}${!includeCompletionsForModuleExports ? " without includeCompletionsForModuleExports" : ""}`, () => {
                const host = TestServerHost.createServerHost({
                    "/user/username/projects/app/src/index.ts": `

${withExistingImport ? "import { MyClass } from 'shared';" : ""}`,
                    "/user/username/projects/app/tsconfig.json": JSON.stringify(
                        {
                            compilerOptions: {
                                outDir: "dist",
                                rootDir: "src",
                                paths: {
                                    "shared": ["./../shared/src/index.ts"],
                                    "shared/*": ["./../shared/src/*.ts"],
                                },
                            },
                            include: ["./src/**/*"],
                            references: [
                                { path: "../shared" },
                            ],
                        },
                        undefined,
                        " ",
                    ),
                    "/user/username/projects/app/package.json": JSON.stringify(
                        {
                            name: "app",
                            version: "1.0.0",
                            main: "dist/index.js",
                            dependencies: {
                                shared: "1.0.0",
                            },
                        },
                        undefined,
                        " ",
                    ),
                    "/user/username/projects/shared/src/index.ts": "export class MyClass { }",
                    "/user/username/projects/shared/src/helper.ts": "export class MyHelper { }",
                    "/user/username/projects/shared/tsconfig.json": JSON.stringify(
                        {
                            compilerOptions: { composite: true, outDir: "dist", rootDir: "src" },
                            include: ["./src/**/*"],
                            references: [
                                { path: "../mylib" },
                            ],
                        },
                        undefined,
                        " ",
                    ),
                    "/user/username/projects/shared/package.json": JSON.stringify(
                        {
                            name: "shared",
                            version: "1.0.0",
                            main: "dist/index.js",
                        },
                        undefined,
                        " ",
                    ),
                    // Indirect ones should not be offered through auto import
                    "/user/username/projects/mylib/src/index.ts": "export class MyLibClass { }",
                    "/user/username/projects/mylib/tsconfig.json": JSON.stringify(
                        {
                            compilerOptions: { composite: true, outDir: "dist", rootDir: "src" },
                            include: ["./src/**/*"],
                        },
                        undefined,
                        " ",
                    ),
                    "/user/username/projects/mylib/package.json": JSON.stringify(
                        {
                            name: "mylib",
                            version: "1.0.0",
                            main: "dist/index.js",
                        },
                        undefined,
                        " ",
                    ),
                });
                const session = new TestSession(host);
                configure(session, includeCompletionsForModuleExports);
                openFilesForSession(["/user/username/projects/app/src/index.ts"], session);
                completions(session, !includeCompletionsForModuleExports);
                host.writeFile("/user/username/projects/shared/src/other.ts", "export class OtherClass { }");
                completions(session, !includeCompletionsForModuleExports);
                host.writeFile("/user/username/projects/mylib/src/otherlib.ts", "export class OtherLibClass { }");
                completions(session, !includeCompletionsForModuleExports);
                configure(session, !includeCompletionsForModuleExports);
                completions(session, includeCompletionsForModuleExports);
                baselineTsserverLogs("completions", `in project reference setup with path mapping${withExistingImport ? " with existing import" : ""}${!includeCompletionsForModuleExports ? " without includeCompletionsForModuleExports" : ""}`, session);
            });
        }
        verify(/*withExistingImport*/ true, /*includeCompletionsForModuleExports*/ true);
        verify(/*withExistingImport*/ false, /*includeCompletionsForModuleExports*/ true);
        verify(/*withExistingImport*/ true, /*includeCompletionsForModuleExports*/ false);
        verify(/*withExistingImport*/ false, /*includeCompletionsForModuleExports*/ false);
    });
});
