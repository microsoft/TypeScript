import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    protocolTextSpanFromSubstring,
    TestSession,
    textSpanFromSubstring,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: getEditsForFileRename::", () => {
    it("works for host implementing 'resolveModuleNames' and 'getResolvedModuleWithFailedLookupLocationsFromCache'", () => {
        const userTs: File = {
            path: "/home/src/projects/project//user.ts",
            content: 'import { x } from "./old";',
        };
        const newTs: File = {
            path: "/home/src/projects/project/new.ts",
            content: "export const x = 0;",
        };
        const tsconfig: File = {
            path: "/home/src/projects/project/tsconfig.json",
            content: "{}",
        };

        const host = TestServerHost.createServerHost([userTs, newTs, tsconfig]);
        const options: ts.CompilerOptions = {};
        const moduleResolutionCache = ts.createModuleResolutionCache(host.getCurrentDirectory(), ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames), options);
        const lsHost: ts.LanguageServiceHost = {
            getCompilationSettings: () => options,
            getScriptFileNames: () => [newTs.path, userTs.path],
            getScriptVersion: fileName => host.readFile(fileName)!,
            getScriptSnapshot: fileName => {
                const text = host.readFile(fileName);
                return text ? ts.ScriptSnapshot.fromString(text) : undefined;
            },
            getCurrentDirectory: () => host.getCurrentDirectory(),
            getDefaultLibFileName: options => ts.getDefaultLibFileName(options),
            readFile: path => host.readFile(path),
            fileExists: path => host.fileExists(path),
            resolveModuleNames: (moduleNames, containingFile) => moduleNames.map(name => ts.resolveModuleName(name, containingFile, options, lsHost, moduleResolutionCache).resolvedModule),
            getResolvedModuleWithFailedLookupLocationsFromCache: (moduleName, containingFile, mode) => moduleResolutionCache.getFromDirectoryCache(moduleName, mode, ts.getDirectoryPath(containingFile), /*redirectedReference*/ undefined),
        };
        const service = ts.createLanguageService(lsHost);
        const edits = service.getEditsForFileRename("/home/src/projects/project/old.ts", "/home/src/projects/project/new.ts", ts.testFormatSettings, ts.emptyOptions);
        assert.deepEqual<readonly ts.FileTextChanges[]>(edits, [{
            fileName: "/home/src/projects/project/user.ts",
            textChanges: [{
                span: textSpanFromSubstring(userTs.content, "./old"),
                newText: "./new",
            }],
        }]);
    });

    it("works with multiple projects", () => {
        const aUserTs: File = {
            path: "/home/src/projects/project/a/user.ts",
            content: 'import { x } from "./old";',
        };
        const aOldTs: File = {
            path: "/home/src/projects/project/a/old.ts",
            content: "export const x = 0;",
        };
        const aTsconfig: File = {
            path: "/home/src/projects/project/a/tsconfig.json",
            content: jsonToReadableText({ files: ["./old.ts", "./user.ts"] }),
        };
        const bUserTs: File = {
            path: "/home/src/projects/project/b/user.ts",
            content: 'import { x } from "../a/old";',
        };
        const bTsconfig: File = {
            path: "/home/src/projects/project/b/tsconfig.json",
            content: "{}",
        };

        const host = TestServerHost.createServerHost([aUserTs, aOldTs, aTsconfig, bUserTs, bTsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aUserTs, bUserTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForFileRename,
            arguments: {
                oldFilePath: aOldTs.path,
                newFilePath: "/home/src/projects/project/a/new.ts",
            },
        });
        baselineTsserverLogs("getEditsForFileRename", "works with multiple projects", session);
    });

    it("works with file moved to inferred project", () => {
        const aTs: File = { path: "/home/src/projects/project/a.ts", content: 'import {} from "./b";' };
        const cTs: File = { path: "/home/src/projects/project/c.ts", content: "export {};" };
        const tsconfig: File = { path: "/home/src/projects/project/tsconfig.json", content: jsonToReadableText({ files: ["./a.ts", "./b.ts"] }) };

        const host = TestServerHost.createServerHost([aTs, cTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs, cTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForFileRename,
            arguments: {
                oldFilePath: "/home/src/projects/project/b.ts",
                newFilePath: cTs.path,
            },
        });
        baselineTsserverLogs("getEditsForFileRename", "works with file moved to inferred project", session);
    });

    [false, true].forEach(withUpdateOpen =>
        [true, false].forEach(openedBeforeChange => {
            [true, false].forEach(closedBeforeChange => {
                if (closedBeforeChange && !openedBeforeChange) return;
                it(`works with when file is opened ${openedBeforeChange ? "before" : "after"} seeing file existance on the disk${closedBeforeChange ? " closed before change" : ""}${withUpdateOpen ? " with updateOpen" : ""}`, () => {
                    const oldFilePath = "/home/src/projects/myproject/src/old.ts";
                    const host = TestServerHost.createServerHost({
                        "/home/src/projects/myproject/src/index.ts": `import {} from '@/old';`,
                        [oldFilePath]: `export const x = 10;`,
                        "/home/src/projects/myproject/tsconfig.json": jsonToReadableText({
                            compilerOptions: {
                                paths: {
                                    "@/*": ["./src/*"],
                                },
                            },
                        }),
                    });
                    const session = new TestSession({ host, canUseWatchEvents: true, canUseEvents: true });
                    if (withUpdateOpen) {
                        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                            command: ts.server.protocol.CommandTypes.UpdateOpen,
                            arguments: {
                                openFiles: [
                                    {
                                        file: "/home/src/projects/myproject/src/index.ts",
                                        projectRootPath: "/home/src/projects/myproject",
                                    },
                                    {
                                        file: oldFilePath,
                                        projectRootPath: "/home/src/projects/myproject",
                                    },
                                ],
                            },
                        });
                    }
                    else {
                        openFilesForSession([
                            { file: "/home/src/projects/myproject/src/index.ts", projectRootPath: "/home/src/projects/myproject" },
                            { file: oldFilePath, projectRootPath: "/home/src/projects/myproject" },
                        ], session);
                    }
                    const newFilePath = "/home/src/projects/myproject/src/new.ts";
                    host.renameFile(oldFilePath, newFilePath);
                    if (!openedBeforeChange) session.invokeWatchChanges();
                    if (withUpdateOpen) {
                        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                            command: ts.server.protocol.CommandTypes.UpdateOpen,
                            arguments: {
                                openFiles: [{
                                    file: newFilePath,
                                    fileContent: `export const x = 10;`,
                                    projectRootPath: "/home/src/projects/myproject",
                                }],
                                closedFiles: [oldFilePath],
                            },
                        });
                    }
                    else {
                        closeFilesForSession([oldFilePath], session);
                        openFilesForSession([{ file: newFilePath, projectRootPath: "/home/src/projects/myproject", content: `export const x = 10;` }], session);
                    }
                    session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
                        command: ts.server.protocol.CommandTypes.GetEditsForFileRename,
                        arguments: { oldFilePath, newFilePath },
                    });
                    if (closedBeforeChange) {
                        if (withUpdateOpen) {
                            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                                command: ts.server.protocol.CommandTypes.UpdateOpen,
                                arguments: { closedFiles: [newFilePath] },
                            });
                        }
                        else closeFilesForSession([newFilePath], session);
                    }
                    if (openedBeforeChange) session.invokeWatchChanges();
                    if (!closedBeforeChange) {
                        if (withUpdateOpen) {
                            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                                command: ts.server.protocol.CommandTypes.UpdateOpen,
                                arguments: { closedFiles: [newFilePath] },
                            });
                        }
                        else closeFilesForSession([newFilePath], session);
                    }
                    verifyGetErrRequest({
                        session,
                        files: ["/home/src/projects/myproject/src/index.ts"],
                    });
                    baselineTsserverLogs("getEditsForFileRename", `works with when file is opened ${openedBeforeChange ? "before" : "after"} seeing file existance on the disk${closedBeforeChange ? " closed before change" : ""}${withUpdateOpen ? " with updateOpen" : ""}`, session);
                });
            });
        })
    );

    [true, false].forEach(canUseWatchEvents =>
        it(`works when moving file to and from folder${canUseWatchEvents ? " canUseWatchEvents" : ""}`, () => {
            const alertText = dedent`
                export function alert(message: string) {
                    console.log(\`ALERT: \${message}\`);
                }
            `;
            const projectRootPath = "/home/src/myprojects/project";
            const indexTs = `${projectRootPath}/index.ts`;
            const indexFileText = dedent`
                import { alert } from '@app/components/whatever/alert';
                alert('Hello, world!');
            `;
            const componentsWhatever = `${projectRootPath}/components/whatever`;
            const functionsWhatever = `${projectRootPath}/functions/whatever`;
            const host = TestServerHost.createServerHost({
                "/home/src/myprojects/project/tsconfig.json": jsonToReadableText({
                    compilerOptions: {
                        target: "es2016",
                        module: "commonjs",
                        paths: {
                            "@app/*": [
                                "./*",
                            ],
                        },
                        esModuleInterop: true,
                        forceConsistentCasingInFileNames: true,
                        strict: true,
                        skipLibCheck: true,
                    },
                }),
                [indexTs]: indexFileText,
                [`${componentsWhatever}/alert.ts`]: alertText,
                [`${functionsWhatever}/placeholder.txt`]: "",
            });
            const session = new TestSession({ host, canUseWatchEvents, canUseEvents: true });
            openFilesForSession([{ file: indexTs, projectRootPath }], session);
            host.renameFolder(componentsWhatever, functionsWhatever, /*skipFolderEntryWatches*/ true);
            if (canUseWatchEvents) session.invokeWatchChanges();
            openFilesForSession([{
                file: `${functionsWhatever}/alert.ts`,
                content: alertText,
                projectRootPath,
            }], session);
            session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
                command: ts.server.protocol.CommandTypes.GetEditsForFileRename,
                arguments: { oldFilePath: componentsWhatever, newFilePath: functionsWhatever },
            });
            // Apply edit to index.ts
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: indexTs,
                        textChanges: [{
                            ...protocolTextSpanFromSubstring(indexFileText, "@app/components/whatever/alert"),
                            newText: "@app/functions/whatever/alert",
                        }],
                    }],
                },
            });
            host.runQueuedTimeoutCallbacks();
            host.renameFolder(functionsWhatever, componentsWhatever, /*skipFolderEntryWatches*/ true);
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    openFiles: [{
                        file: `${componentsWhatever}/alert.ts`,
                        fileContent: alertText,
                        projectRootPath,
                    }],
                    closedFiles: [`${functionsWhatever}/alert.ts`],
                },
            });
            session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
                command: ts.server.protocol.CommandTypes.GetEditsForFileRename,
                arguments: { oldFilePath: functionsWhatever, newFilePath: componentsWhatever },
            });
            if (canUseWatchEvents) session.invokeWatchChanges();
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("getEditsForFileRename", `works when moving file to and from folder${canUseWatchEvents ? " canUseWatchEvents" : ""}`, session);
        })
    );
});
