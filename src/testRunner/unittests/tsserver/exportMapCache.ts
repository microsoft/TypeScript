namespace ts.projectSystem {
    describe("unittests:: tsserver:: exportMapCache", () => {

        describe("unittests:: tsserver:: exportMapCache:: main program and package.json AutoImportProvider", () => {
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
            const mobxPackageJson: File = {
                path: "/node_modules/mobx/package.json",
                content: `{ "name": "mobx", "version": "1.0.0" }`
            };
            const mobxDts: File = {
                path: "/node_modules/mobx/index.d.ts",
                content: "export declare function observable(): unknown;"
            };
            const exportEqualsMappedType: File = {
                path: "/lib/foo/constants.d.ts",
                content: `
                    type Signals = "SIGINT" | "SIGABRT";
                    declare const exp: {} & { [K in Signals]: K };
                    export = exp;`,
            };

            const files = [aTs, bTs, ambientDeclaration, tsconfig, packageJson, mobxPackageJson, mobxDts, exportEqualsMappedType];
            const openFiles = [aTs, bTs];
            const requestLocation: protocol.FileLocationRequestArgs = {
                file: bTs.path,
                line: 1,
                offset: 3,
            };
            const setup = createSetup(files, openFiles, requestLocation);

            it("caches auto-imports in the same file", () => {
                const { exportMapCache } = setup();
                assert.ok(exportMapCache.isUsableByFile(bTs.path as Path));
                assert.ok(!exportMapCache.isEmpty());
            });

            it("invalidates the cache when new files are added", () => {
                const { host, exportMapCache } = setup();
                host.writeFile("/src/a2.ts", aTs.content);
                host.runQueuedTimeoutCallbacks();
                assert.ok(!exportMapCache.isUsableByFile(bTs.path as Path));
                assert.ok(exportMapCache.isEmpty());
            });

            it("invalidates the cache when files are deleted", () => {
                const { host, projectService, exportMapCache } = setup();
                projectService.closeClientFile(aTs.path);
                host.deleteFile(aTs.path);
                host.runQueuedTimeoutCallbacks();
                assert.ok(!exportMapCache.isUsableByFile(bTs.path as Path));
                assert.ok(exportMapCache.isEmpty());
            });

            it("does not invalidate the cache when package.json is changed inconsequentially", () => {
                const { host, exportMapCache, project } = setup();
                host.writeFile("/package.json", `{ "name": "blah", "dependencies": { "mobx": "*" } }`);
                host.runQueuedTimeoutCallbacks();
                project.getPackageJsonAutoImportProvider();
                assert.ok(exportMapCache.isUsableByFile(bTs.path as Path));
                assert.ok(!exportMapCache.isEmpty());
            });

            it("invalidates the cache when package.json change results in AutoImportProvider change", () => {
                const { host, exportMapCache, project } = setup();
                host.writeFile("/package.json", `{}`);
                host.runQueuedTimeoutCallbacks();
                project.getPackageJsonAutoImportProvider();
                assert.ok(!exportMapCache.isUsableByFile(bTs.path as Path));
                assert.ok(exportMapCache.isEmpty());
            });

            it("does not store transient symbols through program updates", () => {
                const { exportMapCache, project, session } = setup();
                // SIGINT, exported from /lib/foo/constants.d.ts, is a mapped type property, which will be a transient symbol.
                // Transient symbols contain types, which retain the checkers they came from, so are not safe to cache.
                // We clear symbols from the cache during updateGraph, leaving only the information about how to re-get them
                // (see getters on `CachedSymbolExportInfo`). We can roughly test that this is working by ensuring that
                // accessing a transient symbol with two different checkers results in different symbol identities, since
                // transient symbols are recreated with every new checker.
                const programBefore = project.getCurrentProgram()!;
                let sigintPropBefore: readonly SymbolExportInfo[] | undefined;
                exportMapCache.forEach(bTs.path as Path, (info, getSymbolName) => {
                    if (getSymbolName() === "SIGINT") sigintPropBefore = info;
                });
                assert.ok(sigintPropBefore);
                assert.ok(sigintPropBefore![0].symbol.flags & SymbolFlags.Transient);
                const symbolIdBefore = getSymbolId(sigintPropBefore![0].symbol);

                // Update program without clearing cache
                session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName: bTs.path,
                            textChanges: [{
                                newText: " ",
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 1 },
                            }]
                        }]
                    }
                });
                project.getLanguageService(/*ensureSynchronized*/ true);
                assert.notEqual(programBefore, project.getCurrentProgram()!);

                // Get same info from cache again
                let sigintPropAfter: readonly SymbolExportInfo[] | undefined;
                exportMapCache.forEach(bTs.path as Path, (info, getSymbolName) => {
                    if (getSymbolName() === "SIGINT") sigintPropAfter = info;
                });
                assert.ok(sigintPropAfter);
                assert.notEqual(symbolIdBefore, getSymbolId(sigintPropAfter![0].symbol));
            });
        });

        describe("unittests:: tsserver:: exportMapCache:: project references", () => {
            const libTsconfig: File = {
                path: "/packages/lib/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "composite": true,
                        "module": "commonjs"
                    }
                }`,
            };

            const libIndex: File = {
                path: "/packages/lib/index.ts",
                content: `export const foo = 0;`,
            };

            const appTsconfig: File = {
                path: "/packages/app/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "composite": true,
                        "module": "commonjs"
                    },
                    "references": [
                        { "path": "../lib" }
                    ]
                }`,
            };

            const appIndex: File = {
                path: "/packages/app/index.ts",
                content: `foo`,
            };

            const setup = createSetup([libTsconfig, libIndex, appTsconfig, appIndex], [appIndex, libIndex], {
                file: appIndex.path,
                line: 1,
                offset: 1,
            });

            it("does not invalidate the cache when referenced project changes inconsequentially", () => {
                const { session, project, projectService, exportMapCache } = setup();
                session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName: libIndex.path,
                            textChanges: [{
                                newText: "\nfoo.toFixed()",
                                start: { line: 1, offset: 3 },
                                end: { line: 1, offset: 3 },
                            }]
                        }]
                    }
                });

                projectService.findConfiguredProjectByProjectName(libTsconfig.path as server.NormalizedPath)!.getLanguageService(/*ensureSynchronized*/ true);
                project.getLanguageService(/*ensureSynchronized*/ true);
                assert.ok(exportMapCache.isUsableByFile(appIndex.path as Path));
                assert.ok(!exportMapCache.isEmpty());
            });

            it("invalidates the cache when referenced project changes signatures", () => {
                const { session, project, projectService, exportMapCache } = setup();
                session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName: libIndex.path,
                            textChanges: [{
                                newText: "export const bar = 0;",
                                start: { line: 1, offset: 1 },
                                end: { line: 1, offset: 3 },
                            }]
                        }]
                    }
                });

                projectService.findConfiguredProjectByProjectName(libTsconfig.path as server.NormalizedPath)!.getLanguageService(/*ensureSynchronized*/ true);
                project.getLanguageService(/*ensureSynchronized*/ true);
                assert.ok(!exportMapCache.isUsableByFile(appIndex.path as Path));
                assert.ok(exportMapCache.isEmpty());
            });
        });

        function createSetup(files: readonly File[], openFiles: readonly File[], completionRequestLocation: protocol.FileLocationRequestArgs) {
            return () => {
                const host = createServerHost(files);
                const session = createSession(host);
                executeSessionRequest<protocol.ConfigureRequest, protocol.ConfigureResponse>(session, protocol.CommandTypes.Configure, {
                    preferences: {
                        includeProjectReferenceAutoImports: "on",
                        includeCompletionsForModuleExports: true,
                        allowIncompleteCompletions: true,
                    },
                });
                openFilesForSession(openFiles, session);
                const projectService = session.getProjectService();
                const project = configuredProjectAt(projectService, 0);
                triggerCompletions();
                const checker = project.getLanguageService().getProgram()!.getTypeChecker();
                return { host, project, projectService, session, exportMapCache: project.getCachedExportInfoMap(), checker, triggerCompletions };
                function triggerCompletions() {
                    executeSessionRequest<protocol.CompletionsRequest, protocol.CompletionInfoResponse>(session, protocol.CommandTypes.CompletionInfo, {
                        ...completionRequestLocation,
                        includeExternalModuleExports: true,
                        prefix: "foo",
                    });
                }
            };
        }
    });

}
