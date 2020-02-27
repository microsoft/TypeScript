namespace ts.projectSystem {
    const aTs: File = {
        path: "/a.ts",
        content: "export const foo = 0;",
    };
    const bTs: File = {
        path: "/b.ts",
        content: "foo",
    };
    const tsconfig: File = {
        path: "/tsconfig.json",
        content: "{}",
    };
    const ambientDeclaration: File = {
        path: "/ambient.d.ts",
        content: "declare module 'ambient' {}"
    };

    describe("unittests:: tsserver:: importSuggestionsCache", () => {
        it("caches auto-imports in the same file", () => {
            const { importSuggestionsCache, checker } = setup();
            assert.ok(importSuggestionsCache.get(bTs.path, checker));
        });

        it("invalidates the cache when new files are added", () => {
            const { host, importSuggestionsCache, checker } = setup();
            host.reloadFS([aTs, bTs, ambientDeclaration, tsconfig, { ...aTs, path: "/src/a2.ts" }]);
            host.runQueuedTimeoutCallbacks();
            assert.isUndefined(importSuggestionsCache.get(bTs.path, checker));
        });

        it("invalidates the cache when files are deleted", () => {
            const { host, projectService, importSuggestionsCache, checker } = setup();
            projectService.closeClientFile(aTs.path);
            host.reloadFS([bTs, ambientDeclaration, tsconfig]);
            host.runQueuedTimeoutCallbacks();
            assert.isUndefined(importSuggestionsCache.get(bTs.path, checker));
        });
    });

    function setup() {
        const host = createServerHost([aTs, bTs, ambientDeclaration, tsconfig]);
        const session = createSession(host);
        openFilesForSession([aTs, bTs], session);
        const projectService = session.getProjectService();
        const project = configuredProjectAt(projectService, 0);
        const requestLocation: protocol.FileLocationRequestArgs = {
            file: bTs.path,
            line: 1,
            offset: 3,
        };
        executeSessionRequest<protocol.CompletionsRequest, protocol.CompletionInfoResponse>(session, protocol.CommandTypes.CompletionInfo, {
            ...requestLocation,
            includeExternalModuleExports: true,
            prefix: "foo",
        });
        const checker = project.getLanguageService().getProgram()!.getTypeChecker();
        return { host, project, projectService, importSuggestionsCache: project.getImportSuggestionsCache(), checker };
    }
}
