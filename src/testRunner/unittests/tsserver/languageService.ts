import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as Utils from "../../_namespaces/Utils";
import {
    baselineTsserverLogs,
    createProjectService,
    logDiagnostics,
} from "../helpers/tsserver";
import { createServerHost } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: languageService", () => {
    it("should work correctly on case-sensitive file systems", () => {
        const lib = {
            path: "/a/Lib/lib.d.ts",
            content: "let x: number"
        };
        const f = {
            path: "/a/b/app.ts",
            content: "let x = 1;"
        };
        const host = createServerHost([lib, f], { executingFilePath: "/a/Lib/tsc.js", useCaseSensitiveFileNames: true });
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(f.path);
        projectService.inferredProjects[0].getLanguageService().getProgram();
        baselineTsserverLogs("languageService", "should work correctly on case-sensitive file systems", projectService);
    });

    it("should support multiple projects with the same file under differing `paths` settings", () => {
        const files = [
            {
                path: "/project/shared.ts",
                content: Utils.dedent`
                    import {foo_a} from "foo";
                    `
            },
            {
                path: `/project/a/tsconfig.json`,
                content: `{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }`
            },
            {
                path: `/project/a/foo.d.ts`,
                content: Utils.dedent`
                    export const foo_a = 1;
                    `
            },
            {
                path: "/project/a/index.ts",
                content: `import "../shared";`
            },
            {
                path: `/project/b/tsconfig.json`,
                content: `{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }`
            },
            {
                path: `/project/b/foo.d.ts`,
                content: Utils.dedent`
                    export const foo_b = 1;
                    `
            },
            {
                path: "/project/b/index.ts",
                content: `import "../shared";`
            }
        ];

        const host = createServerHost(files, { executingFilePath: "/project/tsc.js", useCaseSensitiveFileNames: true });
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(files[3].path);
        projectService.openClientFile(files[6].path);
        logDiagnostics(
            projectService,
            `getSemanticDiagnostics:: ${files[1].path}`,
            projectService.configuredProjects.get(files[1].path)!,
            projectService.configuredProjects.get(files[1].path)!.getLanguageService().getProgram()!.getSemanticDiagnostics(),
        );
        logDiagnostics(
            projectService,
            `getSemanticDiagnostics:: ${files[4].path}`,
            projectService.configuredProjects.get(files[4].path)!,
            projectService.configuredProjects.get(files[4].path)!.getLanguageService().getProgram()!.getSemanticDiagnostics(),
        );
        baselineTsserverLogs("languageService", "should support multiple projects with the same file under differing paths settings", projectService);
    });
});
