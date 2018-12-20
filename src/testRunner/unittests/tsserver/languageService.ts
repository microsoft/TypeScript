namespace ts.projectSystem {
    describe("unittests:: tsserver:: Language service", () => {
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
    });
}
