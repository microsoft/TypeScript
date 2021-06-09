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
    const bSymlink: SymLink = {
        path: "/b-link.ts",
        symLink: "./b.ts",
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

    describe("unittests:: tsserver:: moduleSpecifierCache", () => {
        it("caches importability within a file", () => {
            const { moduleSpecifierCache } = setup();
            assert.isTrue(moduleSpecifierCache.get(bTs.path as Path, aTs.path as Path));
        });

        it("does not invalidate the cache when new files are added", () => {
            const { host, moduleSpecifierCache } = setup();
            host.writeFile("/src/a2.ts", aTs.content);
            host.runQueuedTimeoutCallbacks();
            assert.isTrue(moduleSpecifierCache.get(bTs.path as Path, aTs.path as Path));
        });

        it("invalidates the cache when symlinks are added or removed", () => {
            const { host, moduleSpecifierCache } = setup();
            host.renameFile(bSymlink.path, "/b-link2.ts");
            host.runQueuedTimeoutCallbacks();
            assert.equal(moduleSpecifierCache.count(), 0);
        });

        it("invalidates the cache when package.json changes", () => {
            const { host, moduleSpecifierCache } = setup();
            host.writeFile("/package.json", `{}`);
            host.runQueuedTimeoutCallbacks();
            assert.isUndefined(moduleSpecifierCache.get(bTs.path as Path, aTs.path as Path));
        });
    });

    function setup() {
        const host = createServerHost([aTs, bTs, bSymlink, ambientDeclaration, tsconfig, packageJson, mobxDts]);
        const session = createSession(host);
        openFilesForSession([aTs, bTs], session);
        const projectService = session.getProjectService();
        const project = configuredProjectAt(projectService, 0);
        triggerCompletions();
        return { host, project, projectService, moduleSpecifierCache: project.getModuleSpecifierCache(), triggerCompletions };

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
