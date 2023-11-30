import * as Utils from "../../_namespaces/Utils";
import {
    baselineTsserverLogs,
    logDiagnostics,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: languageService", () => {
    it("should work correctly on case-sensitive file systems", () => {
        const lib = {
            path: "/a/Lib/lib.d.ts",
            content: "let x: number",
        };
        const f = {
            path: "/a/b/app.ts",
            content: "let x = 1;",
        };
        const host = createServerHost([lib, f], { executingFilePath: "/a/Lib/tsc.js", useCaseSensitiveFileNames: true });
        const session = new TestSession(host);
        openFilesForSession([f], session);
        baselineTsserverLogs("languageService", "should work correctly on case-sensitive file systems", session);
    });

    it("should support multiple projects with the same file under differing `paths` settings", () => {
        const files = [
            {
                path: "/project/shared.ts",
                content: Utils.dedent`
                    import {foo_a} from "foo";
                    `,
            },
            {
                path: `/project/a/tsconfig.json`,
                content: `{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }`,
            },
            {
                path: `/project/a/foo.d.ts`,
                content: Utils.dedent`
                    export const foo_a = 1;
                    `,
            },
            {
                path: "/project/a/index.ts",
                content: `import "../shared";`,
            },
            {
                path: `/project/b/tsconfig.json`,
                content: `{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }`,
            },
            {
                path: `/project/b/foo.d.ts`,
                content: Utils.dedent`
                    export const foo_b = 1;
                    `,
            },
            {
                path: "/project/b/index.ts",
                content: `import "../shared";`,
            },
        ];

        const host = createServerHost(files, { executingFilePath: "/project/tsc.js", useCaseSensitiveFileNames: true });
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
