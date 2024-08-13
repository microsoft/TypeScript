import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
    textSpanFromSubstring,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: getEditsForFileRename", () => {
    it("works for host implementing 'resolveModuleNames' and 'getResolvedModuleWithFailedLookupLocationsFromCache'", () => {
        const userTs: File = {
            path: "/user.ts",
            content: 'import { x } from "./old";',
        };
        const newTs: File = {
            path: "/new.ts",
            content: "export const x = 0;",
        };
        const tsconfig: File = {
            path: "/tsconfig.json",
            content: "{}",
        };

        const host = createServerHost([userTs, newTs, tsconfig]);
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
        const edits = service.getEditsForFileRename("/old.ts", "/new.ts", ts.testFormatSettings, ts.emptyOptions);
        assert.deepEqual<readonly ts.FileTextChanges[]>(edits, [{
            fileName: "/user.ts",
            textChanges: [{
                span: textSpanFromSubstring(userTs.content, "./old"),
                newText: "./new",
            }],
        }]);
    });

    it("works with multiple projects", () => {
        const aUserTs: File = {
            path: "/a/user.ts",
            content: 'import { x } from "./old";',
        };
        const aOldTs: File = {
            path: "/a/old.ts",
            content: "export const x = 0;",
        };
        const aTsconfig: File = {
            path: "/a/tsconfig.json",
            content: jsonToReadableText({ files: ["./old.ts", "./user.ts"] }),
        };
        const bUserTs: File = {
            path: "/b/user.ts",
            content: 'import { x } from "../a/old";',
        };
        const bTsconfig: File = {
            path: "/b/tsconfig.json",
            content: "{}",
        };

        const host = createServerHost([aUserTs, aOldTs, aTsconfig, bUserTs, bTsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aUserTs, bUserTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForFileRename,
            arguments: {
                oldFilePath: aOldTs.path,
                newFilePath: "/a/new.ts",
            },
        });
        baselineTsserverLogs("getEditsForFileRename", "works with multiple projects", session);
    });

    it("works with file moved to inferred project", () => {
        const aTs: File = { path: "/a.ts", content: 'import {} from "./b";' };
        const cTs: File = { path: "/c.ts", content: "export {};" };
        const tsconfig: File = { path: "/tsconfig.json", content: jsonToReadableText({ files: ["./a.ts", "./b.ts"] }) };

        const host = createServerHost([aTs, cTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([aTs, cTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
            command: ts.server.protocol.CommandTypes.GetEditsForFileRename,
            arguments: {
                oldFilePath: "/b.ts",
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
                    const oldFilePath = "/home/src/myproject/src/old.ts";
                    const host = createServerHost({
                        "/home/src/myproject/src/index.ts": `import {} from '@/old';`,
                        [oldFilePath]: `export const x = 10;`,
                        "/home/src/myproject/tsconfig.json": jsonToReadableText({
                            compilerOptions: {
                                paths: {
                                    "@/*": ["./src/*"],
                                },
                            },
                        }),
                        [libFile.path]: libFile.content,
                    });
                    const session = new TestSession({ host, canUseWatchEvents: true, canUseEvents: true });
                    if (withUpdateOpen) {
                        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                            command: ts.server.protocol.CommandTypes.UpdateOpen,
                            arguments: {
                                openFiles: [
                                    {
                                        file: "/home/src/myproject/src/index.ts",
                                        projectRootPath: "/home/src/myproject",
                                    },
                                    {
                                        file: oldFilePath,
                                        projectRootPath: "/home/src/myproject",
                                    },
                                ],
                            },
                        });
                    }
                    else {
                        openFilesForSession([
                            { file: "/home/src/myproject/src/index.ts", projectRootPath: "/home/src/myproject" },
                            { file: oldFilePath, projectRootPath: "/home/src/myproject" },
                        ], session);
                    }
                    const newFilePath = "/home/src/myproject/src/new.ts";
                    host.renameFile(oldFilePath, newFilePath);
                    if (!openedBeforeChange) session.invokeWatchChanges();
                    if (withUpdateOpen) {
                        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                            command: ts.server.protocol.CommandTypes.UpdateOpen,
                            arguments: {
                                openFiles: [{
                                    file: newFilePath,
                                    fileContent: `export const x = 10;`,
                                    projectRootPath: "/home/src/myproject",
                                }],
                                closedFiles: [oldFilePath],
                            },
                        });
                    }
                    else {
                        closeFilesForSession([oldFilePath], session);
                        openFilesForSession([{ file: newFilePath, projectRootPath: "/home/src/myproject", content: `export const x = 10;` }], session);
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
                        files: ["/home/src/myproject/src/index.ts"],
                    });
                    baselineTsserverLogs("getEditsForFileRename", `works with when file is opened ${openedBeforeChange ? "before" : "after"} seeing file existance on the disk${closedBeforeChange ? " closed before change" : ""}${withUpdateOpen ? " with updateOpen" : ""}`, session);
                });
            });
        })
    );
});
