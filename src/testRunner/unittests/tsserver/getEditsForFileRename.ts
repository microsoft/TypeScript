namespace ts.projectSystem {
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
            const projectService = createProjectService(host);
            projectService.openClientFile(userTs.path);
            const project = projectService.configuredProjects.get(tsconfig.path)!;

            Debug.assert(!!project.resolveModuleNames);

            const edits = project.getLanguageService().getEditsForFileRename("/old.ts", "/new.ts", testFormatSettings, emptyOptions);
            assert.deepEqual<ReadonlyArray<FileTextChanges>>(edits, [{
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
                content: JSON.stringify({ files: ["./old.ts", "./user.ts"] }),
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
            const session = createSession(host);
            openFilesForSession([aUserTs, bUserTs], session);

            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, CommandNames.GetEditsForFileRename, {
                oldFilePath: aOldTs.path,
                newFilePath: "/a/new.ts",
            });
            assert.deepEqual<ReadonlyArray<protocol.FileCodeEdits>>(response, [
                {
                    fileName: aTsconfig.path,
                    textChanges: [{ ...protocolTextSpanFromSubstring(aTsconfig.content, "./old.ts"), newText: "new.ts" }],
                },
                {
                    fileName: aUserTs.path,
                    textChanges: [{ ...protocolTextSpanFromSubstring(aUserTs.content, "./old"), newText: "./new" }],
                },
                {
                    fileName: bUserTs.path,
                    textChanges: [{ ...protocolTextSpanFromSubstring(bUserTs.content, "../a/old"), newText: "../a/new" }],
                },
            ]);
        });

        it("works with file moved to inferred project", () => {
            const aTs: File = { path: "/a.ts", content: 'import {} from "./b";' };
            const cTs: File = { path: "/c.ts", content: "export {};" };
            const tsconfig: File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./a.ts", "./b.ts"] }) };

            const host = createServerHost([aTs, cTs, tsconfig]);
            const session = createSession(host);
            openFilesForSession([aTs, cTs], session);

            const response = executeSessionRequest<protocol.GetEditsForFileRenameRequest, protocol.GetEditsForFileRenameResponse>(session, CommandNames.GetEditsForFileRename, {
                oldFilePath: "/b.ts",
                newFilePath: cTs.path,
            });
            assert.deepEqual<ReadonlyArray<protocol.FileCodeEdits>>(response, [
                {
                    fileName: "/tsconfig.json",
                    textChanges: [{ ...protocolTextSpanFromSubstring(tsconfig.content, "./b.ts"), newText: "c.ts" }],
                },
                {
                    fileName: "/a.ts",
                    textChanges: [{ ...protocolTextSpanFromSubstring(aTs.content, "./b"), newText: "./c" }],
                },
            ]);
        });
    });
}
