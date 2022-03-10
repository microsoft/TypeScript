namespace ts.projectSystem {
    const packageJson: File = {
        path: "/package.json",
        content: `{ "dependencies": { "mobx": "*" } }`
    };
    const aTs: File = {
        path: "/src/a.ts",
        content: "export const foo = 0;",
    };
    const bTs: File = {
        path: "/src/b.ts",
        content: "foo",
    };
    const cTs: File = {
        path: "/src/c.ts",
        content: "import ",
    };
    const bSymlink: SymLink = {
        path: "/src/b-link.ts",
        symLink: "./b.ts",
    };
    const tsconfig: File = {
        path: "/tsconfig.json",
        content: `{ "include": ["src"] }`,
    };
    const ambientDeclaration: File = {
        path: "/src/ambient.d.ts",
        content: "declare module 'ambient' {}"
    };
    const mobxPackageJson: File = {
        path: "/node_modules/mobx/package.json",
        content: `{ "name": "mobx", "version": "1.0.0" }`
    };
    const mobxDts: File = {
        path: "/node_modules/mobx/index.d.ts",
        content: "export declare function observable(): unknown;"
    };

    describe("unittests:: tsserver:: moduleSpecifierCache", () => {
        it("caches importability within a file", () => {
            const { moduleSpecifierCache } = setup();
            assert.isTrue(moduleSpecifierCache.get(bTs.path as Path, aTs.path as Path, {}, {})?.isAutoImportable);
        });

        it("caches module specifiers within a file", () => {
            const { moduleSpecifierCache, triggerCompletions } = setup();
            // Completion at an import statement will calculate and cache module specifiers
            triggerCompletions({ file: cTs.path, line: 1, offset: cTs.content.length + 1 });
            const mobxCache = moduleSpecifierCache.get(cTs.path as Path, mobxDts.path as Path, {}, {});
            assert.deepEqual(mobxCache, {
                modulePaths: [{
                    path: mobxDts.path,
                    isInNodeModules: true,
                    isRedirect: false
                }],
                moduleSpecifiers: ["mobx"],
                isAutoImportable: true,
            });
        });

        it("invalidates module specifiers when changes happen in contained node_modules directories", () => {
            const { host, moduleSpecifierCache, triggerCompletions } = setup();
            // Completion at an import statement will calculate and cache module specifiers
            triggerCompletions({ file: cTs.path, line: 1, offset: cTs.content.length + 1 });
            checkWatchedDirectories(host, ["/src", "/node_modules"], /*recursive*/ true);
            host.writeFile("/node_modules/.staging/mobx-12345678/package.json", "{}");
            host.runQueuedTimeoutCallbacks();
            assert.equal(moduleSpecifierCache.count(), 0);
        });

        it("does not invalidate the cache when new files are added", () => {
            const { host, moduleSpecifierCache } = setup();
            host.writeFile("/src/a2.ts", aTs.content);
            host.runQueuedTimeoutCallbacks();
            assert.isTrue(moduleSpecifierCache.get(bTs.path as Path, aTs.path as Path, {}, {})?.isAutoImportable);
        });

        it("invalidates the cache when symlinks are added or removed", () => {
            const { host, moduleSpecifierCache } = setup();
            host.renameFile(bSymlink.path, "/src/b-link2.ts");
            host.runQueuedTimeoutCallbacks();
            assert.equal(moduleSpecifierCache.count(), 0);
        });

        it("invalidates the cache when local package.json changes", () => {
            const { host, moduleSpecifierCache } = setup();
            host.writeFile("/package.json", `{}`);
            host.runQueuedTimeoutCallbacks();
            assert.equal(moduleSpecifierCache.count(), 0);
        });

        it("invalidates the cache when module resolution settings change", () => {
            const { host, moduleSpecifierCache } = setup();
            host.writeFile(tsconfig.path, `{ "compilerOptions": { "moduleResolution": "classic" }, "include": ["src"] }`);
            host.runQueuedTimeoutCallbacks();
            assert.equal(moduleSpecifierCache.count(), 0);
        });

        it("invalidates the cache when user preferences change", () => {
            const { moduleSpecifierCache, session, triggerCompletions } = setup();
            const preferences: UserPreferences = { importModuleSpecifierPreference: "project-relative" };

            assert.ok(getWithPreferences({}));
            executeSessionRequest<protocol.ConfigureRequest, protocol.ConfigureResponse>(session, protocol.CommandTypes.Configure, { preferences });
            // Nothing changes yet
            assert.ok(getWithPreferences({}));
            assert.isUndefined(getWithPreferences(preferences));
            // Completions will request (getting nothing) and set the cache with new preferences
            triggerCompletions({ file: bTs.path, line: 1, offset: 3 });
            assert.isUndefined(getWithPreferences({}));
            assert.ok(getWithPreferences(preferences));

            // Test other affecting preference
            executeSessionRequest<protocol.ConfigureRequest, protocol.ConfigureResponse>(session, protocol.CommandTypes.Configure, {
                preferences: { importModuleSpecifierEnding: "js" },
            });
            triggerCompletions({ file: bTs.path, line: 1, offset: 3 });
            assert.isUndefined(getWithPreferences(preferences));

            function getWithPreferences(preferences: UserPreferences) {
                return moduleSpecifierCache.get(bTs.path as Path, aTs.path as Path, preferences, {});
            }
        });
    });

    function setup() {
        const host = createServerHost([aTs, bTs, cTs, bSymlink, ambientDeclaration, tsconfig, packageJson, mobxPackageJson, mobxDts]);
        const session = createSession(host);
        openFilesForSession([aTs, bTs, cTs], session);
        const projectService = session.getProjectService();
        const project = configuredProjectAt(projectService, 0);
        executeSessionRequest<protocol.ConfigureRequest, protocol.ConfigureResponse>(session, protocol.CommandTypes.Configure, {
            preferences: {
                includeCompletionsForImportStatements: true,
                includeCompletionsForModuleExports: true,
                includeCompletionsWithInsertText: true,
                includeCompletionsWithSnippetText: true,
            },
        });
        triggerCompletions({ file: bTs.path, line: 1, offset: 3 });

        return { host, project, projectService, session, moduleSpecifierCache: project.getModuleSpecifierCache(), triggerCompletions };

        function triggerCompletions(requestLocation: protocol.FileLocationRequestArgs) {
            executeSessionRequest<protocol.CompletionsRequest, protocol.CompletionInfoResponse>(session, protocol.CommandTypes.CompletionInfo, {
                ...requestLocation,
            });
        }
    }
}
