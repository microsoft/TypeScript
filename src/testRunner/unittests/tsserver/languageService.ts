import { dedent } from "../../_namespaces/Utils.js";
import { tscTypeScriptTestLocation } from "../helpers/contents.js";
import {
    baselineTsserverLogs,
    logDiagnostics,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: languageService::", () => {
    it("should work correctly on case-sensitive file systems", () => {
        const f = {
            path: "/home/src/projects/project/app.ts",
            content: "let x = 1;",
        };
        const host = TestServerHost.createServerHost([f], {
            executingFilePath: tscTypeScriptTestLocation.replace("/Lib/", "/lib/"),
            useCaseSensitiveFileNames: true,
        });
        const session = new TestSession(host);
        openFilesForSession([f], session);
        baselineTsserverLogs("languageService", "should work correctly on case-sensitive file systems", session);
    });

    it("should support multiple projects with the same file under differing `paths` settings", () => {
        const files = [
            {
                path: "/home/src/projects/project/shared.ts",
                content: dedent`
                    import {foo_a} from "foo";
                    `,
            },
            {
                path: `/home/src/projects/project/a/tsconfig.json`,
                content: `{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }`,
            },
            {
                path: `/home/src/projects/project/a/foo.d.ts`,
                content: dedent`
                    export const foo_a = 1;
                    `,
            },
            {
                path: "/home/src/projects/project/a/index.ts",
                content: `import "../shared";`,
            },
            {
                path: `/home/src/projects/project/b/tsconfig.json`,
                content: `{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }`,
            },
            {
                path: `/home/src/projects/project/b/foo.d.ts`,
                content: dedent`
                    export const foo_b = 1;
                    `,
            },
            {
                path: "/home/src/projects/project/b/index.ts",
                content: `import "../shared";`,
            },
        ];

        const host = TestServerHost.createServerHost(files, { useCaseSensitiveFileNames: true });
        const session = new TestSession(host);
        openFilesForSession([files[3], files[6].path], session);
        logDiagnostics(
            session,
            `getSemanticDiagnostics:: ${files[1].path}`,
            session.getProjectService().configuredProjects.get(files[1].path)!,
            session.getProjectService().configuredProjects.get(files[1].path)!.getLanguageService().getProgram()!.getSemanticDiagnostics(),
        );
        logDiagnostics(
            session,
            `getSemanticDiagnostics:: ${files[4].path}`,
            session.getProjectService().configuredProjects.get(files[4].path)!,
            session.getProjectService().configuredProjects.get(files[4].path)!.getLanguageService().getProgram()!.getSemanticDiagnostics(),
        );
        baselineTsserverLogs("languageService", "should support multiple projects with the same file under differing paths settings", session);
    });
});
