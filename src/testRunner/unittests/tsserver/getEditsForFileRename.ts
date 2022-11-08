import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: getEditsForFileRename", () => {
    it("works for host implementing 'resolveModuleNames' and 'getResolvedModuleWithFailedLookupLocationsFromCache'", () => {
        const userTs: ts.projectSystem.File = {
            path: "/user.ts",
            content: 'import { x } from "./old";',
        };
        const newTs: ts.projectSystem.File = {
            path: "/new.ts",
            content: "export const x = 0;",
        };
        const tsconfig: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: "{}",
        };

        const host = ts.projectSystem.createServerHost([userTs, newTs, tsconfig]);
        const projectService = ts.projectSystem.createProjectService(host);
        projectService.openClientFile(userTs.path);
        const project = projectService.configuredProjects.get(tsconfig.path)!;

        ts.Debug.assert(!!project.resolveModuleNames);

        const edits = project.getLanguageService().getEditsForFileRename("/old.ts", "/new.ts", ts.testFormatSettings, ts.emptyOptions);
        assert.deepEqual<readonly ts.FileTextChanges[]>(edits, [{
            fileName: "/user.ts",
            textChanges: [{
                span: ts.projectSystem.textSpanFromSubstring(userTs.content, "./old"),
                newText: "./new",
            }],
        }]);
    });

    it("works with multiple projects", () => {
        const aUserTs: ts.projectSystem.File = {
            path: "/a/user.ts",
            content: 'import { x } from "./old";',
        };
        const aOldTs: ts.projectSystem.File = {
            path: "/a/old.ts",
            content: "export const x = 0;",
        };
        const aTsconfig: ts.projectSystem.File = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({ files: ["./old.ts", "./user.ts"] }),
        };
        const bUserTs: ts.projectSystem.File = {
            path: "/b/user.ts",
            content: 'import { x } from "../a/old";',
        };
        const bTsconfig: ts.projectSystem.File = {
            path: "/b/tsconfig.json",
            content: "{}",
        };

        const host = ts.projectSystem.createServerHost([aUserTs, aOldTs, aTsconfig, bUserTs, bTsconfig]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([aUserTs, bUserTs], session);

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.GetEditsForFileRenameRequest, ts.projectSystem.protocol.GetEditsForFileRenameResponse>(session, ts.projectSystem.CommandNames.GetEditsForFileRename, {
            oldFilePath: aOldTs.path,
            newFilePath: "/a/new.ts",
        });
        assert.deepEqual<readonly ts.projectSystem.protocol.FileCodeEdits[]>(response, [
            {
                fileName: aTsconfig.path,
                textChanges: [{ ...ts.projectSystem.protocolTextSpanFromSubstring(aTsconfig.content, "./old.ts"), newText: "new.ts" }],
            },
            {
                fileName: aUserTs.path,
                textChanges: [{ ...ts.projectSystem.protocolTextSpanFromSubstring(aUserTs.content, "./old"), newText: "./new" }],
            },
            {
                fileName: bUserTs.path,
                textChanges: [{ ...ts.projectSystem.protocolTextSpanFromSubstring(bUserTs.content, "../a/old"), newText: "../a/new" }],
            },
        ]);
    });

    it("works with file moved to inferred project", () => {
        const aTs: ts.projectSystem.File = { path: "/a.ts", content: 'import {} from "./b";' };
        const cTs: ts.projectSystem.File = { path: "/c.ts", content: "export {};" };
        const tsconfig: ts.projectSystem.File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./a.ts", "./b.ts"] }) };

        const host = ts.projectSystem.createServerHost([aTs, cTs, tsconfig]);
        const session = ts.projectSystem.createSession(host);
        ts.projectSystem.openFilesForSession([aTs, cTs], session);

        const response = ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.GetEditsForFileRenameRequest, ts.projectSystem.protocol.GetEditsForFileRenameResponse>(session, ts.projectSystem.CommandNames.GetEditsForFileRename, {
            oldFilePath: "/b.ts",
            newFilePath: cTs.path,
        });
        assert.deepEqual<readonly ts.projectSystem.protocol.FileCodeEdits[]>(response, [
            {
                fileName: "/tsconfig.json",
                textChanges: [{ ...ts.projectSystem.protocolTextSpanFromSubstring(tsconfig.content, "./b.ts"), newText: "c.ts" }],
            },
            {
                fileName: "/a.ts",
                textChanges: [{ ...ts.projectSystem.protocolTextSpanFromSubstring(aTs.content, "./b"), newText: "./c" }],
            },
        ]);
    });
});
