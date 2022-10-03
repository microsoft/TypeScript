namespace ts.projectSystem {
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
            const projectService = createProjectService(host);
            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            projectService.inferredProjects[0].getLanguageService().getProgram();
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
            const projectService = createProjectService(host);
            projectService.openClientFile(files[3].path);
            projectService.openClientFile(files[6].path);
            projectService.checkNumberOfProjects({ configuredProjects: 2 });
            const proj1Diags = projectService.configuredProjects.get(files[1].path)!.getLanguageService().getProgram()!.getSemanticDiagnostics();
            Debug.assertEqual(proj1Diags.length, 0);
            const proj2Diags = projectService.configuredProjects.get(files[4].path)!.getLanguageService().getProgram()!.getSemanticDiagnostics();
            Debug.assertEqual(proj2Diags.length, 1);
        });
    });
}
