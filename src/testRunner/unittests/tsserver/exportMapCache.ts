namespace ts.projectSystem {
    const packageJson: File = {
        path: "/package.json",
        content: `{ "dependencies": { "mobx": "*" } }`
    };
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
    const mobxDts: File = {
        path: "/node_modules/mobx/index.d.ts",
        content: "export declare function observable(): unknown;"
    };

    describe("unittests:: tsserver:: exportMapCache", () => {
        it("caches auto-imports in the same file", () => {
            const { exportMapCache, checker } = setup();
            assert.ok(exportMapCache.get(bTs.path as Path, checker));
        });

        it("invalidates the cache when new files are added", () => {
            const { host, exportMapCache, checker } = setup();
            host.writeFile("/src/a2.ts", aTs.content);
            host.runQueuedTimeoutCallbacks();
            assert.isUndefined(exportMapCache.get(bTs.path as Path, checker));
        });

        it("invalidates the cache when files are deleted", () => {
            const { host, projectService, exportMapCache, checker } = setup();
            projectService.closeClientFile(aTs.path);
            host.deleteFile(aTs.path);
            host.runQueuedTimeoutCallbacks();
            assert.isUndefined(exportMapCache.get(bTs.path as Path, checker));
        });

        it("does not invalidate the cache when package.json is changed inconsequentially", () => {
            const { host, exportMapCache, checker, project } = setup();
            host.writeFile("/package.json", `{ "name": "blah", "dependencies": { "mobx": "*" } }`);
            host.runQueuedTimeoutCallbacks();
            project.getPackageJsonAutoImportProvider();
            assert.ok(exportMapCache.get(bTs.path as Path, checker));
        });

        it("invalidates the cache when package.json change results in AutoImportProvider change", () => {
            const { host, exportMapCache, checker, project } = setup();
            host.writeFile("/package.json", `{}`);
            host.runQueuedTimeoutCallbacks();
            project.getPackageJsonAutoImportProvider();
            assert.isUndefined(exportMapCache.get(bTs.path as Path, checker));
        });
    });

    function setup() {
        const host = createServerHost([aTs, bTs, ambientDeclaration, tsconfig, packageJson, mobxDts]);
        const session = createSession(host);
        openFilesForSession([aTs, bTs], session);
        const projectService = session.getProjectService();
        const project = configuredProjectAt(projectService, 0);
        triggerCompletions();
        const checker = project.getLanguageService().getProgram()!.getTypeChecker();
        return { host, project, projectService, exportMapCache: project.getExportMapCache(), checker, triggerCompletions };

        function triggerCompletions() {
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
        }
    }
}
