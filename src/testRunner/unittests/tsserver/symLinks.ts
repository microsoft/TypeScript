namespace ts.projectSystem {
    describe("unittests:: tsserver:: symLinks", () => {
        it("rename in common file renames all project", () => {
            const projects = "/users/username/projects";
            const folderA = `${projects}/a`;
            const aFile: File = {
                path: `${folderA}/a.ts`,
                content: `import {C} from "./c/fc"; console.log(C)`
            };
            const aTsconfig: File = {
                path: `${folderA}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { module: "commonjs" } })
            };
            const aC: SymLink = {
                path: `${folderA}/c`,
                symLink: "../c"
            };
            const aFc = `${folderA}/c/fc.ts`;

            const folderB = `${projects}/b`;
            const bFile: File = {
                path: `${folderB}/b.ts`,
                content: `import {C} from "./c/fc"; console.log(C)`
            };
            const bTsconfig: File = {
                path: `${folderB}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { module: "commonjs" } })
            };
            const bC: SymLink = {
                path: `${folderB}/c`,
                symLink: "../c"
            };
            const bFc = `${folderB}/c/fc.ts`;

            const folderC = `${projects}/c`;
            const cFile: File = {
                path: `${folderC}/fc.ts`,
                content: `export const C = 8`
            };

            const files = [cFile, libFile, aFile, aTsconfig, aC, bFile, bTsconfig, bC];
            const host = createServerHost(files);
            const session = createSession(host);
            const projectService = session.getProjectService();
            openFilesForSession(
                [
                    { file: aFile, projectRootPath: folderA },
                    { file: bFile, projectRootPath: folderB },
                    { file: aFc, projectRootPath: folderA },
                    { file: bFc, projectRootPath: folderB },
                ],
                session);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.isDefined(projectService.configuredProjects.get(aTsconfig.path));
            assert.isDefined(projectService.configuredProjects.get(bTsconfig.path));

            const response = executeSessionRequest<protocol.RenameRequest, protocol.RenameResponse>(session, protocol.CommandTypes.Rename, { file: aFc, ...protocolLocationFromSubstring(cFile.content, "C") });

            assert.equal(aFile.content, bFile.content);
            const abLocs: protocol.RenameTextSpan[] = [
                protocolRenameSpanFromSubstring({
                    fileText: aFile.content,
                    text: "C",
                    contextText: `import {C} from "./c/fc";`
                }),
                protocolRenameSpanFromSubstring({
                    fileText: aFile.content,
                    text: "C",
                    options: { index: 1 }
                }),
            ];
            const span = protocolRenameSpanFromSubstring({
                fileText: cFile.content,
                text: "C",
                contextText: "export const C = 8"
            });
            const cLocs: protocol.RenameTextSpan[] = [span];
            assert.deepEqual<protocol.RenameResponseBody | undefined>(response, {
                info: {
                    canRename: true,
                    displayName: "C",
                    fileToRename: undefined,
                    fullDisplayName: '"/users/username/projects/a/c/fc".C',
                    kind: ScriptElementKind.constElement,
                    kindModifiers: ScriptElementKindModifier.exportedModifier,
                    triggerSpan: protocolTextSpanFromSubstring(cFile.content, "C"),
                },
                locs: [
                    { file: aFc, locs: cLocs },
                    { file: aFile.path, locs: abLocs },
                    { file: bFc, locs: cLocs },
                    { file: bFile.path, locs: abLocs },
                ],
            });
        });

        describe("module resolution when symlinked folder contents change and resolve modules", () => {
            const projectRootPath = "/users/username/projects/myproject";
            const packages = `${projectRootPath}/javascript/packages`;
            const recognizersDateTime = `${packages}/recognizers-date-time`;
            const recognizersText = `${packages}/recognizers-text`;
            const recognizersTextDist = `${recognizersText}/dist`;
            const moduleName = "@microsoft/recognizers-text";
            const moduleNameInFile = `"${moduleName}"`;
            const recognizersDateTimeSrcFile: File = {
                path: `${recognizersDateTime}/src/datetime/baseDate.ts`,
                content: `import {C} from ${moduleNameInFile};
new C();`
            };
            const recognizerDateTimeTsconfigPath = `${recognizersDateTime}/tsconfig.json`;
            const recognizerDateTimeTsconfigWithoutPathMapping: File = {
                path: recognizerDateTimeTsconfigPath,
                content: JSON.stringify({
                    include: ["src"]
                })
            };
            const recognizerDateTimeTsconfigWithPathMapping: File = {
                path: recognizerDateTimeTsconfigPath,
                content: JSON.stringify({
                    compilerOptions: {
                        rootDir: "src",
                        baseUrl: "./",
                        paths: {
                            "@microsoft/*": ["../*"]
                        }
                    },
                    include: ["src"]
                })
            };
            const nodeModulesRecorgnizersText: SymLink = {
                path: `${recognizersDateTime}/node_modules/@microsoft/recognizers-text`,
                symLink: recognizersText
            };
            const recognizerTextSrcFile: File = {
                path: `${recognizersText}/src/recognizers-text.ts`,
                content: `export class C { method () { return 10; } }`
            };
            const recongnizerTextDistTypingFile: File = {
                path: `${recognizersTextDist}/types/recognizers-text.d.ts`,
                content: `export class C { method(): number; }`
            };
            const recongnizerTextPackageJson: File = {
                path: `${recognizersText}/package.json`,
                content: JSON.stringify({
                    typings: "dist/types/recognizers-text.d.ts"
                })
            };
            const filesInProjectWithUnresolvedModule = [recognizerDateTimeTsconfigPath, libFile.path, recognizersDateTimeSrcFile.path];
            const filesInProjectWithResolvedModule = [...filesInProjectWithUnresolvedModule, recongnizerTextDistTypingFile.path];

            function verifyErrors(session: TestSession, semanticErrors: protocol.Diagnostic[]) {
                verifyGetErrRequest({
                    session,
                    host: session.testhost,
                    expected: [{
                        file: recognizersDateTimeSrcFile,
                        syntax: [],
                        semantic: semanticErrors,
                        suggestion: []
                    }]
                });
            }

            function verifyWatchedFilesAndDirectories(host: TestServerHost, files: string[], recursiveDirectories: ReadonlyMap<number>, nonRecursiveDirectories: string[]) {
                checkWatchedFilesDetailed(host, files.filter(f => f !== recognizersDateTimeSrcFile.path), 1);
                checkWatchedDirectoriesDetailed(host, nonRecursiveDirectories, 1, /*recursive*/ false);
                checkWatchedDirectoriesDetailed(host, recursiveDirectories, /*recursive*/ true);
            }

            function createSessionAndOpenFile(host: TestServerHost) {
                const session = createSession(host, { canUseEvents: true });
                session.executeCommandSeq<protocol.OpenRequest>({
                    command: protocol.CommandTypes.Open,
                    arguments: {
                        file: recognizersDateTimeSrcFile.path,
                        projectRootPath
                    }
                });
                return session;
            }

            function verifyModuleResolution(withPathMapping: boolean) {
                describe(withPathMapping ? "when tsconfig file contains path mapping" : "when tsconfig does not contain path mapping", () => {
                    const filesWithSources = [libFile, recognizersDateTimeSrcFile, withPathMapping ? recognizerDateTimeTsconfigWithPathMapping : recognizerDateTimeTsconfigWithoutPathMapping, recognizerTextSrcFile, recongnizerTextPackageJson];

                    const watchedDirectoriesWithResolvedModule = arrayToMap(getTypeRootsFromLocation(recognizersDateTime), k => k, () => 1);
                    watchedDirectoriesWithResolvedModule.set(`${recognizersDateTime}/src`, withPathMapping ? 1 : 2); // wild card + failed lookups
                    if (!withPathMapping) {
                        watchedDirectoriesWithResolvedModule.set(`${recognizersDateTime}/node_modules`, 1); // failed lookups
                    }
                    const watchedDirectoriesWithUnresolvedModule = cloneMap(watchedDirectoriesWithResolvedModule);
                    watchedDirectoriesWithUnresolvedModule.set(`${recognizersDateTime}/src`, 2); // wild card + failed lookups
                    [`${recognizersDateTime}/node_modules`, ...(withPathMapping ? [recognizersText] : emptyArray), ...getNodeModuleDirectories(packages)].forEach(d => {
                        watchedDirectoriesWithUnresolvedModule.set(d, 1);
                    });
                    const nonRecursiveWatchedDirectories = withPathMapping ? [packages] : emptyArray;

                    function verifyProjectWithResolvedModule(session: TestSession) {
                        const projectService = session.getProjectService();
                        const project = projectService.configuredProjects.get(recognizerDateTimeTsconfigPath)!;
                        checkProjectActualFiles(project, filesInProjectWithResolvedModule);
                        verifyWatchedFilesAndDirectories(session.testhost, filesInProjectWithResolvedModule, watchedDirectoriesWithResolvedModule, nonRecursiveWatchedDirectories);
                        verifyErrors(session, []);
                    }

                    function verifyProjectWithUnresolvedModule(session: TestSession) {
                        const projectService = session.getProjectService();
                        const project = projectService.configuredProjects.get(recognizerDateTimeTsconfigPath)!;
                        checkProjectActualFiles(project, filesInProjectWithUnresolvedModule);
                        verifyWatchedFilesAndDirectories(session.testhost, filesInProjectWithUnresolvedModule, watchedDirectoriesWithUnresolvedModule, nonRecursiveWatchedDirectories);
                        const startOffset = recognizersDateTimeSrcFile.content.indexOf('"') + 1;
                        verifyErrors(session, [
                            createDiagnostic({ line: 1, offset: startOffset }, { line: 1, offset: startOffset + moduleNameInFile.length }, Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations, [moduleName])
                        ]);
                    }

                    it("when project compiles from sources", () => {
                        const host = createServerHost(filesWithSources);
                        const session = createSessionAndOpenFile(host);
                        verifyProjectWithUnresolvedModule(session);

                        host.ensureFileOrFolder(nodeModulesRecorgnizersText);
                        host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                        host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                        host.runQueuedTimeoutCallbacks(); // Actual update

                        verifyProjectWithResolvedModule(session);
                    });

                    it("when project has node_modules setup but doesnt have modules in typings folder and then recompiles", () => {
                        const host = createServerHost([...filesWithSources, nodeModulesRecorgnizersText]);
                        const session = createSessionAndOpenFile(host);
                        verifyProjectWithUnresolvedModule(session);

                        host.writeFile(recongnizerTextDistTypingFile.path, recongnizerTextDistTypingFile.content);
                        host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                        host.runQueuedTimeoutCallbacks(); // Actual update

                        if (withPathMapping) {
                            verifyProjectWithResolvedModule(session);
                        }
                        else {
                            // Cannot handle the resolution update
                            verifyProjectWithUnresolvedModule(session);
                        }
                    });

                    it("when project recompiles after deleting generated folders", () => {
                        const host = createServerHost([...filesWithSources, nodeModulesRecorgnizersText, recongnizerTextDistTypingFile]);
                        const session = createSessionAndOpenFile(host);

                        verifyProjectWithResolvedModule(session);

                        host.deleteFolder(recognizersTextDist, /*recursive*/ true);
                        host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                        host.runQueuedTimeoutCallbacks(); // Actual update

                        verifyProjectWithUnresolvedModule(session);

                        host.ensureFileOrFolder(recongnizerTextDistTypingFile);
                        host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                        host.runQueuedTimeoutCallbacks(); // Actual update

                        if (withPathMapping) {
                            verifyProjectWithResolvedModule(session);
                        }
                        else {
                            // Cannot handle the resolution update
                            verifyProjectWithUnresolvedModule(session);
                        }
                    });
                });
            }

            verifyModuleResolution(/*withPathMapping*/ false);
            verifyModuleResolution(/*withPathMapping*/ true);
        });
    });
}
