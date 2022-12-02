import * as ts from "../../_namespaces/ts";
import {
    createServerHost,
    File,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    createLoggerWithInMemoryLogs,
    createProjectService,
    createSession,
    openFilesForSession,
    textSpanFromSubstring,
} from "./helpers";

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

        ts.Debug.assert(!!project.resolveModuleNames);

        const edits = project.getLanguageService().getEditsForFileRename("/old.ts", "/new.ts", ts.testFormatSettings, ts.emptyOptions);
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
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([aUserTs, bUserTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
            command: ts.server.CommandNames.GetEditsForFileRename,
            arguments: {
                oldFilePath: aOldTs.path,
                newFilePath: "/a/new.ts",
            }
        });
        baselineTsserverLogs("getEditsForFileRename", "works with multiple projects", session);
    });

    it("works with file moved to inferred project", () => {
        const aTs: File = { path: "/a.ts", content: 'import {} from "./b";' };
        const cTs: File = { path: "/c.ts", content: "export {};" };
        const tsconfig: File = { path: "/tsconfig.json", content: JSON.stringify({ files: ["./a.ts", "./b.ts"] }) };

        const host = createServerHost([aTs, cTs, tsconfig]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([aTs, cTs], session);

        session.executeCommandSeq<ts.server.protocol.GetEditsForFileRenameRequest>({
            command: ts.server.CommandNames.GetEditsForFileRename,
            arguments: {
                oldFilePath: "/b.ts",
                newFilePath: cTs.path,
            }
        });
        baselineTsserverLogs("getEditsForFileRename", "works with file moved to inferred project", session);
    });
});
