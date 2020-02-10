namespace ts.projectSystem {
    describe("unittests:: tsserver:: with project references and tsbuild", () => {
        function createHost(files: readonly TestFSWithWatch.FileOrFolderOrSymLink[], rootNames: readonly string[]) {
            const host = createServerHost(files);

            // ts build should succeed
            const solutionBuilder = tscWatch.createSolutionBuilder(host, rootNames, {});
            solutionBuilder.build();
            assert.equal(host.getOutput().length, 0, JSON.stringify(host.getOutput(), /*replacer*/ undefined, " "));

            return host;
        }

        describe("with container project", () => {
            function getProjectFiles(project: string): [File, File] {
                return [
                    TestFSWithWatch.getTsBuildProjectFile(project, "tsconfig.json"),
                    TestFSWithWatch.getTsBuildProjectFile(project, "index.ts"),
                ];
            }

            const project = "container";
            const containerLib = getProjectFiles("container/lib");
            const containerExec = getProjectFiles("container/exec");
            const containerCompositeExec = getProjectFiles("container/compositeExec");
            const containerConfig = TestFSWithWatch.getTsBuildProjectFile(project, "tsconfig.json");
            const files = [libFile, ...containerLib, ...containerExec, ...containerCompositeExec, containerConfig];

            it("does not error on container only project", () => {
                const host = createHost(files, [containerConfig.path]);

                // Open external project for the folder
                const session = createSession(host);
                const service = session.getProjectService();
                service.openExternalProjects([{
                    projectFileName: TestFSWithWatch.getTsBuildProjectFilePath(project, project),
                    rootFiles: files.map(f => ({ fileName: f.path })),
                    options: {}
                }]);
                checkNumberOfProjects(service, { configuredProjects: 4 });
                files.forEach(f => {
                    const args: protocol.FileRequestArgs = {
                        file: f.path,
                        projectFileName: endsWith(f.path, "tsconfig.json") ? f.path : undefined
                    };
                    const syntaxDiagnostics = session.executeCommandSeq<protocol.SyntacticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SyntacticDiagnosticsSync,
                        arguments: args
                    }).response;
                    assert.deepEqual(syntaxDiagnostics, []);
                    const semanticDiagnostics = session.executeCommandSeq<protocol.SemanticDiagnosticsSyncRequest>({
                        command: protocol.CommandTypes.SemanticDiagnosticsSync,
                        arguments: args
                    }).response;
                    assert.deepEqual(semanticDiagnostics, []);
                });
                const containerProject = service.configuredProjects.get(containerConfig.path)!;
                checkProjectActualFiles(containerProject, [containerConfig.path]);
                const optionsDiagnostics = session.executeCommandSeq<protocol.CompilerOptionsDiagnosticsRequest>({
                    command: protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
                    arguments: { projectFileName: containerProject.projectName }
                }).response;
                assert.deepEqual(optionsDiagnostics, []);
            });

            it("can successfully find references with --out options", () => {
                const host = createHost(files, [containerConfig.path]);
                const session = createSession(host);
                openFilesForSession([containerCompositeExec[1]], session);
                const service = session.getProjectService();
                checkNumberOfProjects(service, { configuredProjects: 2 }); // compositeExec and solution
                const solutionProject = service.configuredProjects.get(containerConfig.path)!;
                assert.isTrue(solutionProject.isInitialLoadPending());
                const { file: myConstFile, start: myConstStart, end: myConstEnd } = protocolFileSpanFromSubstring({
                    file: containerCompositeExec[1],
                    text: "myConst",
                });
                const response = session.executeCommandSeq<protocol.RenameRequest>({
                    command: protocol.CommandTypes.Rename,
                    arguments: { file: myConstFile, ...myConstStart }
                }).response as protocol.RenameResponseBody;

                const locationOfMyConstInLib = protocolFileSpanWithContextFromSubstring({
                    file: containerLib[1],
                    text: "myConst",
                    contextText: "export const myConst = 30;"
                });
                const { file: _, ...renameTextOfMyConstInLib } = locationOfMyConstInLib;
                const locationOfMyConstInExec = protocolFileSpanWithContextFromSubstring({
                    file: containerExec[1],
                    text: "myConst"
                });
                const { file: myConstInExecFile, ...renameTextOfMyConstInExec } = locationOfMyConstInExec;
                assert.deepEqual(response.locs, [
                    { file: locationOfMyConstInLib.file, locs: [renameTextOfMyConstInLib] },
                    { file: myConstFile, locs: [{ start: myConstStart, end: myConstEnd }] },
                    { file: myConstInExecFile, locs: [renameTextOfMyConstInExec] },
                ]);
                checkNumberOfProjects(service, { configuredProjects: 4 });
                assert.isFalse(solutionProject.isInitialLoadPending());
            });

            it("ancestor and project ref management", () => {
                const tempFile: File = {
                    path: `/user/username/projects/temp/temp.ts`,
                    content: "let x = 10"
                };
                const host = createHost(files.concat([tempFile]), [containerConfig.path]);
                const session = createSession(host);
                openFilesForSession([containerCompositeExec[1]], session);
                const service = session.getProjectService();
                checkNumberOfProjects(service, { configuredProjects: 2 }); // compositeExec and solution
                const solutionProject = service.configuredProjects.get(containerConfig.path)!;
                assert.isTrue(solutionProject.isInitialLoadPending());

                // Open temp file and verify all projects alive
                openFilesForSession([tempFile], session);
                checkNumberOfProjects(service, { configuredProjects: 2, inferredProjects: 1 });
                assert.isTrue(solutionProject.isInitialLoadPending());

                const locationOfMyConst = protocolLocationFromSubstring(containerCompositeExec[1].content, "myConst");
                session.executeCommandSeq<protocol.RenameRequest>({
                    command: protocol.CommandTypes.Rename,
                    arguments: {
                        file: containerCompositeExec[1].path,
                        ...locationOfMyConst
                    }
                });

                // Ref projects are loaded
                checkNumberOfProjects(service, { configuredProjects: 4, inferredProjects: 1 });
                assert.isFalse(solutionProject.isInitialLoadPending());

                // Open temp file and verify all projects alive
                service.closeClientFile(tempFile.path);
                openFilesForSession([tempFile], session);
                checkNumberOfProjects(service, { configuredProjects: 4, inferredProjects: 1 });

                // Close all files and open temp file, only inferred project should be alive
                service.closeClientFile(containerCompositeExec[1].path);
                service.closeClientFile(tempFile.path);
                openFilesForSession([tempFile], session);
                checkNumberOfProjects(service, { inferredProjects: 1 });
            });
        });

        describe("with main and depedency project", () => {
            const dependecyLocation = `${tscWatch.projectRoot}/dependency`;
            const dependecyDeclsLocation = `${tscWatch.projectRoot}/decls`;
            const mainLocation = `${tscWatch.projectRoot}/main`;
            const dependencyTs: File = {
                path: `${dependecyLocation}/FnS.ts`,
                content: `export function fn1() { }
export function fn2() { }
export function fn3() { }
export function fn4() { }
export function fn5() { }
`
            };
            const dependencyTsPath = dependencyTs.path.toLowerCase();
            const dependencyConfig: File = {
                path: `${dependecyLocation}/tsconfig.json`,
                content: JSON.stringify({ compilerOptions: { composite: true, declarationMap: true, declarationDir: "../decls" } })
            };

            const mainTs: File = {
                path: `${mainLocation}/main.ts`,
                content: `import {
    fn1,
    fn2,
    fn3,
    fn4,
    fn5
} from '../decls/fns'

fn1();
fn2();
fn3();
fn4();
fn5();
`
            };
            const mainConfig: File = {
                path: `${mainLocation}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: { composite: true, declarationMap: true },
                    references: [{ path: "../dependency" }]
                })
            };

            const randomFile: File = {
                path: `${tscWatch.projectRoot}/random/random.ts`,
                content: "let a = 10;"
            };
            const randomConfig: File = {
                path: `${tscWatch.projectRoot}/random/tsconfig.json`,
                content: "{}"
            };
            const dtsLocation = `${dependecyDeclsLocation}/FnS.d.ts`;
            const dtsPath = dtsLocation.toLowerCase() as Path;
            const dtsMapLocation = `${dependecyDeclsLocation}/FnS.d.ts.map`;
            const dtsMapPath = dtsMapLocation.toLowerCase() as Path;

            const files = [dependencyTs, dependencyConfig, mainTs, mainConfig, libFile, randomFile, randomConfig];

            function verifyScriptInfos(session: TestSession, host: TestServerHost, openInfos: readonly string[], closedInfos: readonly string[], otherWatchedFiles: readonly string[], additionalInfo: string) {
                checkScriptInfos(session.getProjectService(), openInfos.concat(closedInfos), additionalInfo);
                checkWatchedFiles(host, closedInfos.concat(otherWatchedFiles).map(f => f.toLowerCase()), additionalInfo);
            }

            function verifyInfosWithRandom(session: TestSession, host: TestServerHost, openInfos: readonly string[], closedInfos: readonly string[], otherWatchedFiles: readonly string[], reqName: string) {
                verifyScriptInfos(session, host, openInfos.concat(randomFile.path), closedInfos, otherWatchedFiles.concat(randomConfig.path), reqName);
            }

            function verifyOnlyRandomInfos(session: TestSession, host: TestServerHost) {
                verifyScriptInfos(session, host, [randomFile.path], [libFile.path], [randomConfig.path], "Random");
            }

            function declarationSpan(fn: number): protocol.TextSpanWithContext {
                return {
                    start: { line: fn, offset: 17 },
                    end: { line: fn, offset: 20 },
                    contextStart: { line: fn, offset: 1 },
                    contextEnd: { line: fn, offset: 26 }
                };
            }
            function importSpan(fn: number): protocol.TextSpanWithContext {
                return {
                    start: { line: fn + 1, offset: 5 },
                    end: { line: fn + 1, offset: 8 },
                    contextStart: { line: 1, offset: 1 },
                    contextEnd: { line: 7, offset: 22 }
                };
            }
            function usageSpan(fn: number): protocol.TextSpan {
                return { start: { line: fn + 8, offset: 1 }, end: { line: fn + 8, offset: 4 } };
            }

            function goToDefFromMainTs(fn: number): Action<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                const textSpan = usageSpan(fn);
                const definition: protocol.FileSpan = { file: dependencyTs.path, ...declarationSpan(fn) };
                return {
                    reqName: "goToDef",
                    request: {
                        command: protocol.CommandTypes.DefinitionAndBoundSpan,
                        arguments: { file: mainTs.path, ...textSpan.start }
                    },
                    expectedResponse: {
                        // To dependency
                        definitions: [definition],
                        textSpan
                    }
                };
            }

            function goToDefFromMainTsWithNoMap(fn: number): Action<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                const textSpan = usageSpan(fn);
                const definition = declarationSpan(fn);
                const declareSpaceLength = "declare ".length;
                return {
                    reqName: "goToDef",
                    request: {
                        command: protocol.CommandTypes.DefinitionAndBoundSpan,
                        arguments: { file: mainTs.path, ...textSpan.start }
                    },
                    expectedResponse: {
                        // To the dts
                        definitions: [{
                            file: dtsPath,
                            start: { line: fn, offset: definition.start.offset + declareSpaceLength },
                            end: { line: fn, offset: definition.end.offset + declareSpaceLength },
                            contextStart: { line: fn, offset: 1 },
                            contextEnd: { line: fn, offset: 37 }
                        }],
                        textSpan
                    }
                };
            }

            function goToDefFromMainTsWithNoDts(fn: number): Action<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                const textSpan = usageSpan(fn);
                return {
                    reqName: "goToDef",
                    request: {
                        command: protocol.CommandTypes.DefinitionAndBoundSpan,
                        arguments: { file: mainTs.path, ...textSpan.start }
                    },
                    expectedResponse: {
                        // To import declaration
                        definitions: [{ file: mainTs.path, ...importSpan(fn) }],
                        textSpan
                    }
                };
            }

            function goToDefFromMainTsWithDependencyChange(fn: number): Action<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                const textSpan = usageSpan(fn);
                return {
                    reqName: "goToDef",
                    request: {
                        command: protocol.CommandTypes.DefinitionAndBoundSpan,
                        arguments: { file: mainTs.path, ...textSpan.start }
                    },
                    expectedResponse: {
                        // Definition on fn + 1 line
                        definitions: [{ file: dependencyTs.path, ...declarationSpan(fn + 1) }],
                        textSpan
                    }
                };
            }

            function goToDefFromMainTsProjectInfoVerifier(withRefs: boolean): ProjectInfoVerifier {
                return {
                    openFile: mainTs,
                    openFileLastLine: 14,
                    configFile: mainConfig,
                    expectedProjectActualFiles: withRefs ?
                        [mainTs.path, libFile.path, mainConfig.path, dependencyTs.path] :
                        [mainTs.path, libFile.path, mainConfig.path, dtsPath]
                };
            }

            function renameFromDependencyTs(fn: number): Action<protocol.RenameRequest, protocol.RenameResponseBody> {
                const defSpan = declarationSpan(fn);
                const { contextStart: _, contextEnd: _1, ...triggerSpan } = defSpan;
                return {
                    reqName: "rename",
                    request: {
                        command: protocol.CommandTypes.Rename,
                        arguments: { file: dependencyTs.path, ...triggerSpan.start }
                    },
                    expectedResponse: {
                        info: {
                            canRename: true,
                            fileToRename: undefined,
                            displayName: `fn${fn}`,
                            fullDisplayName: `"${dependecyLocation}/FnS".fn${fn}`,
                            kind: ScriptElementKind.functionElement,
                            kindModifiers: "export",
                            triggerSpan
                        },
                        locs: [
                            { file: dependencyTs.path, locs: [defSpan] }
                        ]
                    }
                };
            }

            function renameFromDependencyTsWithDependencyChange(fn: number): Action<protocol.RenameRequest, protocol.RenameResponseBody> {
                const { expectedResponse: { info, locs }, ...rest } = renameFromDependencyTs(fn + 1);

                return {
                    ...rest,
                    expectedResponse: {
                        info: {
                            ...info as protocol.RenameInfoSuccess,
                            displayName: `fn${fn}`,
                            fullDisplayName: `"${dependecyLocation}/FnS".fn${fn}`,
                        },
                        locs
                    }
                };
            }

            function renameFromDependencyTsProjectInfoVerifier(): ProjectInfoVerifier {
                return {
                    openFile: dependencyTs,
                    openFileLastLine: 6,
                    configFile: dependencyConfig,
                    expectedProjectActualFiles: [dependencyTs.path, libFile.path, dependencyConfig.path]
                };
            }

            function renameFromDependencyTsWithBothProjectsOpen(fn: number): Action<protocol.RenameRequest, protocol.RenameResponseBody> {
                const { reqName, request, expectedResponse } = renameFromDependencyTs(fn);
                const { info, locs } = expectedResponse;
                return {
                    reqName,
                    request,
                    expectedResponse: {
                        info,
                        locs: [
                            locs[0],
                            {
                                file: mainTs.path,
                                locs: [
                                    importSpan(fn),
                                    usageSpan(fn)
                                ]
                            }
                        ]
                    }
                };
            }

            function renameFromDependencyTsWithBothProjectsOpenWithDependencyChange(fn: number): Action<protocol.RenameRequest, protocol.RenameResponseBody> {
                const { reqName, request, expectedResponse, } = renameFromDependencyTsWithDependencyChange(fn);
                const { info, locs } = expectedResponse;
                return {
                    reqName,
                    request,
                    expectedResponse: {
                        info,
                        locs: [
                            locs[0],
                            {
                                file: mainTs.path,
                                locs: [
                                    importSpan(fn),
                                    usageSpan(fn)
                                ]
                            }
                        ]
                    }
                };
            }

            function removePath(array: readonly string[], ...delPaths: string[]) {
                return array.filter(a => {
                    const aLower = a.toLowerCase();
                    return delPaths.every(dPath => dPath !== aLower);
                });
            }

            interface Action<Req = protocol.Request, Response = {}> {
                reqName: string;
                request: Partial<Req>;
                expectedResponse: Response;
            }
            interface ActionInfo<Req = protocol.Request, Response = {}> {
                action: (fn: number) => Action<Req, Response>;
                closedInfos: readonly string[];
                otherWatchedFiles: readonly string[];
                expectsDts: boolean;
                expectsMap: boolean;
                freshMapInfo?: boolean;
                freshDocumentMapper?: boolean;
                skipDtsMapCheck?: boolean;
            }
            type ActionKey = keyof ActionInfoVerifier;
            type ActionInfoGetterFn<Req = protocol.Request, Response = {}> = () => ActionInfo<Req, Response>;
            type ActionInfoSpreader<Req = protocol.Request, Response = {}> = [
                ActionKey, // Key to get initial value and pass this value to spread function
                (actionInfo: ActionInfo<Req, Response>) => Partial<ActionInfo<Req, Response>>
            ];
            type ActionInfoGetter<Req = protocol.Request, Response = {}> = ActionInfoGetterFn<Req, Response> | ActionKey | ActionInfoSpreader<Req, Response>;
            interface ProjectInfoVerifier {
                openFile: File;
                openFileLastLine: number;
                configFile: File;
                expectedProjectActualFiles: readonly string[];
            }
            interface ActionInfoVerifier<Req = protocol.Request, Response = {}> {
                main: ActionInfoGetter<Req, Response>;
                change: ActionInfoGetter<Req, Response>;
                dtsChange: ActionInfoGetter<Req, Response>;
                mapChange: ActionInfoGetter<Req, Response>;
                noMap: ActionInfoGetter<Req, Response>;
                mapFileCreated: ActionInfoGetter<Req, Response>;
                mapFileDeleted: ActionInfoGetter<Req, Response>;
                noDts: ActionInfoGetter<Req, Response>;
                dtsFileCreated: ActionInfoGetter<Req, Response>;
                dtsFileDeleted: ActionInfoGetter<Req, Response>;
                dependencyChange: ActionInfoGetter<Req, Response>;
                noBuild: ActionInfoGetter<Req, Response>;
            }
            interface DocumentPositionMapperVerifier<Req = protocol.Request, Response = {}> extends ProjectInfoVerifier, ActionInfoVerifier<Req, Response> {
            }

            interface VerifierAndWithRefs {
                withRefs: boolean;
                disableSourceOfProjectReferenceRedirect?: true;
                verifier: (withRefs: boolean) => readonly DocumentPositionMapperVerifier[];
            }

            function openFiles(verifiers: readonly DocumentPositionMapperVerifier[]) {
                return verifiers.map(v => v.openFile);
            }
            interface OpenTsFile extends VerifierAndWithRefs {
                onHostCreate?: (host: TestServerHost) => void;
            }
            function openTsFile({ withRefs, disableSourceOfProjectReferenceRedirect, verifier, onHostCreate }: OpenTsFile) {
                const host = createHost(files, [mainConfig.path]);
                if (!withRefs) {
                    // Erase project reference
                    host.writeFile(mainConfig.path, JSON.stringify({
                        compilerOptions: { composite: true, declarationMap: true }
                    }));
                }
                else if (disableSourceOfProjectReferenceRedirect) {
                    // Erase project reference
                    host.writeFile(mainConfig.path, JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            declarationMap: true,
                            disableSourceOfProjectReferenceRedirect: !!disableSourceOfProjectReferenceRedirect
                        },
                        references: [{ path: "../dependency" }]
                    }));
                }
                if (onHostCreate) {
                    onHostCreate(host);
                }
                const session = createSession(host);
                const verifiers = verifier(withRefs && !disableSourceOfProjectReferenceRedirect);
                openFilesForSession([...openFiles(verifiers), randomFile], session);
                return { host, session, verifiers };
            }

            function checkProject(session: TestSession, verifiers: readonly DocumentPositionMapperVerifier[], noDts?: true) {
                const service = session.getProjectService();
                checkNumberOfProjects(service, { configuredProjects: 1 + verifiers.length });
                verifiers.forEach(({ configFile, expectedProjectActualFiles }) => {
                    checkProjectActualFiles(
                        service.configuredProjects.get(configFile.path.toLowerCase())!,
                        noDts ?
                            expectedProjectActualFiles.filter(f => f.toLowerCase() !== dtsPath) :
                            expectedProjectActualFiles
                    );
                });
            }

            function firstAction(session: TestSession, verifiers: readonly DocumentPositionMapperVerifier[]) {
                for (const { action } of getActionInfo(verifiers, "main")) {
                    const { request } = action(1);
                    session.executeCommandSeq(request);
                }
            }

            function verifyAction(session: TestSession, { reqName, request, expectedResponse }: Action) {
                const { response } = session.executeCommandSeq(request);
                assert.deepEqual(response, expectedResponse, `Failed Request: ${reqName}`);
            }

            function verifyScriptInfoPresence(session: TestSession, path: string, expectedToBePresent: boolean, reqName: string) {
                const info = session.getProjectService().filenameToScriptInfo.get(path);
                if (expectedToBePresent) {
                    assert.isDefined(info, `${reqName}:: ${path} expected to be present`);
                }
                else {
                    assert.isUndefined(info, `${reqName}:: ${path} expected to be not present`);
                }
                return info;
            }

            interface VerifyDocumentPositionMapper {
                session: TestSession;
                dependencyMap: server.ScriptInfo | undefined;
                documentPositionMapper: server.ScriptInfo["documentPositionMapper"];
                equal: boolean;
                debugInfo: string;
            }
            function verifyDocumentPositionMapper({ session, dependencyMap, documentPositionMapper, equal, debugInfo }: VerifyDocumentPositionMapper) {
                assert.strictEqual(session.getProjectService().filenameToScriptInfo.get(dtsMapPath), dependencyMap, debugInfo);
                if (dependencyMap) {
                    if (equal) {
                        assert.strictEqual(dependencyMap.documentPositionMapper, documentPositionMapper, debugInfo);
                    }
                    else {
                        assert.notStrictEqual(dependencyMap.documentPositionMapper, documentPositionMapper, debugInfo);
                    }
                }
            }

            function getActionInfoOfVerfier(verifier: DocumentPositionMapperVerifier, actionKey: ActionKey): ActionInfo {
                const actionInfoGetter = verifier[actionKey];
                if (isString(actionInfoGetter)) {
                    return getActionInfoOfVerfier(verifier, actionInfoGetter);
                }

                if (isArray(actionInfoGetter)) {
                    const initialValue = getActionInfoOfVerfier(verifier, actionInfoGetter[0]);
                    return {
                        ...initialValue,
                        ...actionInfoGetter[1](initialValue)
                    };
                }

                return actionInfoGetter();
            }

            function getActionInfo(verifiers: readonly DocumentPositionMapperVerifier[], actionKey: ActionKey): ActionInfo[] {
                return verifiers.map(v => getActionInfoOfVerfier(v, actionKey));
            }

            interface VerifyAllFnAction {
                session: TestSession;
                host: TestServerHost;
                verifiers: readonly DocumentPositionMapperVerifier[];
                actionKey: ActionKey;
                sourceMapPath?: server.ScriptInfo["sourceMapFilePath"];
                dependencyMap?: server.ScriptInfo | undefined;
                documentPositionMapper?: server.ScriptInfo["documentPositionMapper"];
            }
            interface VerifyAllFnActionResult {
                actionInfos: readonly ActionInfo[];
                actionKey: ActionKey;
                dependencyMap: server.ScriptInfo | undefined;
                documentPositionMapper: server.ScriptInfo["documentPositionMapper"] | undefined;
            }
            function verifyAllFnAction({
                session,
                host,
                verifiers,
                actionKey,
                dependencyMap,
                documentPositionMapper,
            }: VerifyAllFnAction): VerifyAllFnActionResult {
                const actionInfos = getActionInfo(verifiers, actionKey);
                let sourceMapPath: server.ScriptInfo["sourceMapFilePath"] | undefined;
                // action
                let first = true;
                for (const {
                    action,
                    closedInfos,
                    otherWatchedFiles,
                    expectsDts,
                    expectsMap,
                    freshMapInfo,
                    freshDocumentMapper,
                    skipDtsMapCheck
                } of actionInfos) {
                    for (let fn = 1; fn <= 5; fn++) {
                        const fnAction = action(fn);
                        verifyAction(session, fnAction);
                        const debugInfo = `${actionKey}:: ${fnAction.reqName}:: ${fn}`;
                        const dtsInfo = verifyScriptInfoPresence(session, dtsPath, expectsDts, debugInfo);
                        const dtsMapInfo = verifyScriptInfoPresence(session, dtsMapPath, expectsMap, debugInfo);
                        verifyInfosWithRandom(
                            session,
                            host,
                            openFiles(verifiers).map(f => f.path),
                            closedInfos,
                            otherWatchedFiles,
                            debugInfo
                        );

                        if (dtsInfo) {
                            if (first || (fn === 1 && freshMapInfo)) {
                                if (!skipDtsMapCheck) {
                                    if (dtsMapInfo) {
                                        assert.equal(dtsInfo.sourceMapFilePath, dtsMapPath, debugInfo);
                                    }
                                    else {
                                        assert.isNotString(dtsInfo.sourceMapFilePath, debugInfo);
                                        assert.isNotFalse(dtsInfo.sourceMapFilePath, debugInfo);
                                        assert.isDefined(dtsInfo.sourceMapFilePath, debugInfo);
                                    }
                                }
                            }
                            else {
                                assert.equal(dtsInfo.sourceMapFilePath, sourceMapPath, debugInfo);
                            }
                        }

                        if (!first && (fn !== 1 || !freshMapInfo)) {
                            verifyDocumentPositionMapper({
                                session,
                                dependencyMap,
                                documentPositionMapper,
                                equal: fn !== 1 || !freshDocumentMapper,
                                debugInfo
                            });
                        }
                        sourceMapPath = dtsInfo && dtsInfo.sourceMapFilePath;
                        dependencyMap = dtsMapInfo;
                        documentPositionMapper = dependencyMap && dependencyMap.documentPositionMapper;
                        first = false;
                    }
                }

                return { actionInfos, actionKey, dependencyMap, documentPositionMapper };
            }

            function verifyScriptInfoCollection(
                session: TestSession,
                host: TestServerHost,
                verifiers: readonly DocumentPositionMapperVerifier[],
                { dependencyMap, documentPositionMapper, actionInfos, actionKey }: VerifyAllFnActionResult
            ) {
                // Collecting at this point retains dependency.d.ts and map
                closeFilesForSession([randomFile], session);
                openFilesForSession([randomFile], session);

                const { closedInfos, otherWatchedFiles } = last(actionInfos);
                const debugInfo = `${actionKey} Collection`;
                verifyInfosWithRandom(
                    session,
                    host,
                    openFiles(verifiers).map(f => f.path),
                    closedInfos,
                    otherWatchedFiles,
                    debugInfo
                );
                verifyDocumentPositionMapper({
                    session,
                    dependencyMap,
                    documentPositionMapper,
                    equal: true,
                    debugInfo
                });

                // Closing open file, removes dependencies too
                closeFilesForSession([...openFiles(verifiers), randomFile], session);
                openFilesForSession([randomFile], session);
                verifyOnlyRandomInfos(session, host);
            }

            function verifyScenarioAndScriptInfoCollection(
                session: TestSession,
                host: TestServerHost,
                verifiers: readonly DocumentPositionMapperVerifier[],
                actionKey: ActionKey,
                noDts?: true
            ) {
                // Main scenario action
                const result = verifyAllFnAction({ session, host, verifiers, actionKey });
                checkProject(session, verifiers, noDts);
                verifyScriptInfoCollection(session, host, verifiers, result);
            }

            function verifyScenarioWithChangesWorker(
                {
                    scenarioName,
                    verifier,
                    withRefs,
                    change,
                    afterChangeActionKey
                }: VerifyScenarioWithChanges,
                timeoutBeforeAction: boolean,
            ) {
                it(scenarioName, () => {
                    const { host, session, verifiers } = openTsFile({ verifier, withRefs });

                    // Create DocumentPositionMapper
                    firstAction(session, verifiers);
                    const dependencyMap = session.getProjectService().filenameToScriptInfo.get(dtsMapPath);
                    const documentPositionMapper = dependencyMap && dependencyMap.documentPositionMapper;

                    // change
                    change(host, session, verifiers);
                    if (timeoutBeforeAction) {
                        host.runQueuedTimeoutCallbacks();
                        checkProject(session, verifiers);
                        verifyDocumentPositionMapper({
                            session,
                            dependencyMap,
                            documentPositionMapper,
                            equal: true,
                            debugInfo: "After change timeout"
                        });
                    }

                    // action
                    verifyAllFnAction({
                        session,
                        host,
                        verifiers,
                        actionKey: afterChangeActionKey,
                        dependencyMap,
                        documentPositionMapper
                    });
                });
            }

            interface VerifyScenarioWithChanges extends VerifierAndWithRefs {
                scenarioName: string;
                change: (host: TestServerHost, session: TestSession, verifiers: readonly DocumentPositionMapperVerifier[]) => void;
                afterChangeActionKey: ActionKey;
            }
            function verifyScenarioWithChanges(verify: VerifyScenarioWithChanges) {
                describe("when timeout occurs before request", () => {
                    verifyScenarioWithChangesWorker(verify, /*timeoutBeforeAction*/ true);
                });

                describe("when timeout does not occur before request", () => {
                    verifyScenarioWithChangesWorker(verify, /*timeoutBeforeAction*/ false);
                });
            }

            interface VerifyScenarioWhenFileNotPresent extends VerifierAndWithRefs {
                scenarioName: string;
                fileLocation: string;
                fileNotPresentKey: ActionKey;
                fileCreatedKey: ActionKey;
                fileDeletedKey: ActionKey;
                noDts?: true;
            }
            function verifyScenarioWhenFileNotPresent({
                scenarioName,
                verifier,
                withRefs,
                fileLocation,
                fileNotPresentKey,
                fileCreatedKey,
                fileDeletedKey,
                noDts
            }: VerifyScenarioWhenFileNotPresent) {
                describe(scenarioName, () => {
                    it("when file is not present", () => {
                        const { host, session, verifiers } = openTsFile({
                            verifier,
                            withRefs,
                            onHostCreate: host => host.deleteFile(fileLocation)
                        });
                        checkProject(session, verifiers, noDts);

                        verifyScenarioAndScriptInfoCollection(session, host, verifiers, fileNotPresentKey, noDts);
                    });

                    it("when file is created after actions on projects", () => {
                        let fileContents: string | undefined;
                        const { host, session, verifiers } = openTsFile({
                            verifier,
                            withRefs,
                            onHostCreate: host => {
                                fileContents = host.readFile(fileLocation);
                                host.deleteFile(fileLocation);
                            }
                        });
                        firstAction(session, verifiers);

                        host.writeFile(fileLocation, fileContents!);
                        verifyScenarioAndScriptInfoCollection(session, host, verifiers, fileCreatedKey);
                    });

                    it("when file is deleted after actions on the projects", () => {
                        const { host, session, verifiers } = openTsFile({ verifier, withRefs });
                        firstAction(session, verifiers);

                        // The dependency file is deleted when orphan files are collected
                        host.deleteFile(fileLocation);
                        // Verify with deleted action key
                        verifyAllFnAction({ session, host, verifiers, actionKey: fileDeletedKey });
                        checkProject(session, verifiers, noDts);

                        // Script info collection should behave as fileNotPresentKey
                        verifyScriptInfoCollection(
                            session,
                            host,
                            verifiers,
                            {
                                actionInfos: getActionInfo(verifiers, fileNotPresentKey),
                                actionKey: fileNotPresentKey,
                                dependencyMap: undefined,
                                documentPositionMapper: undefined
                            }
                        );
                    });
                });
            }

            function verifyScenarioWorker({ mainScenario, verifier }: VerifyScenario, withRefs: boolean, disableSourceOfProjectReferenceRedirect?: true) {
                it(mainScenario, () => {
                    const { host, session, verifiers } = openTsFile({ withRefs, disableSourceOfProjectReferenceRedirect, verifier });
                    checkProject(session, verifiers);
                    verifyScenarioAndScriptInfoCollection(session, host, verifiers, "main");
                });

                // Edit
                verifyScenarioWithChanges({
                    scenarioName: "when usage file changes, document position mapper doesnt change",
                    verifier,
                    withRefs,
                    disableSourceOfProjectReferenceRedirect,
                    change: (_host, session, verifiers) => verifiers.forEach(
                        verifier => session.executeCommandSeq<protocol.ChangeRequest>({
                            command: protocol.CommandTypes.Change,
                            arguments: {
                                file: verifier.openFile.path,
                                line: verifier.openFileLastLine,
                                offset: 1,
                                endLine: verifier.openFileLastLine,
                                endOffset: 1,
                                insertString: "const x = 10;"
                            }
                        })
                    ),
                    afterChangeActionKey: "change"
                });

                // Edit dts to add new fn
                verifyScenarioWithChanges({
                    scenarioName: "when dependency .d.ts changes, document position mapper doesnt change",
                    verifier,
                    withRefs,
                    disableSourceOfProjectReferenceRedirect,
                    change: host => host.writeFile(
                        dtsLocation,
                        host.readFile(dtsLocation)!.replace(
                            "//# sourceMappingURL=FnS.d.ts.map",
                            `export declare function fn6(): void;
//# sourceMappingURL=FnS.d.ts.map`
                        )
                    ),
                    afterChangeActionKey: "dtsChange"
                });

                // Edit map file to represent added new line
                verifyScenarioWithChanges({
                    scenarioName: "when dependency file's map changes",
                    verifier,
                    withRefs,
                    disableSourceOfProjectReferenceRedirect,
                    change: host => host.writeFile(
                        dtsMapLocation,
                        `{"version":3,"file":"FnS.d.ts","sourceRoot":"","sources":["../dependency/FnS.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,eAAO,MAAM,CAAC,KAAK,CAAC"}`
                    ),
                    afterChangeActionKey: "mapChange"
                });

                verifyScenarioWhenFileNotPresent({
                    scenarioName: "with depedency files map file",
                    verifier,
                    withRefs,
                    disableSourceOfProjectReferenceRedirect,
                    fileLocation: dtsMapLocation,
                    fileNotPresentKey: "noMap",
                    fileCreatedKey: "mapFileCreated",
                    fileDeletedKey: "mapFileDeleted"
                });

                verifyScenarioWhenFileNotPresent({
                    scenarioName: "with depedency .d.ts file",
                    verifier,
                    withRefs,
                    disableSourceOfProjectReferenceRedirect,
                    fileLocation: dtsLocation,
                    fileNotPresentKey: "noDts",
                    fileCreatedKey: "dtsFileCreated",
                    fileDeletedKey: "dtsFileDeleted",
                    noDts: true
                });

                if (withRefs && !disableSourceOfProjectReferenceRedirect) {
                    verifyScenarioWithChanges({
                        scenarioName: "when defining project source changes",
                        verifier,
                        withRefs,
                        change: (host, session, verifiers) => {
                            // Make change, without rebuild of solution
                            if (contains(openFiles(verifiers), dependencyTs)) {
                                session.executeCommandSeq<protocol.ChangeRequest>({
                                    command: protocol.CommandTypes.Change,
                                    arguments: {
                                        file: dependencyTs.path, line: 1, offset: 1, endLine: 1, endOffset: 1, insertString: `function fooBar() { }
`}
                                });
                            }
                            else {
                                host.writeFile(dependencyTs.path, `function fooBar() { }
${dependencyTs.content}`);
                            }
                        },
                        afterChangeActionKey: "dependencyChange"
                    });

                    it("when projects are not built", () => {
                        const host = createServerHost(files);
                        const session = createSession(host);
                        const verifiers = verifier(withRefs);
                        openFilesForSession([...openFiles(verifiers), randomFile], session);
                        verifyScenarioAndScriptInfoCollection(session, host, verifiers, "noBuild");
                    });
                }
            }

            interface VerifyScenario {
                mainScenario: string;
                verifier: (withRefs: boolean) => readonly DocumentPositionMapperVerifier[];
            }
            function verifyScenario(scenario: VerifyScenario) {
                describe("when main tsconfig doesnt have project reference", () => {
                    verifyScenarioWorker(scenario, /*withRefs*/ false);
                });
                describe("when main tsconfig has project reference", () => {
                    verifyScenarioWorker(scenario, /*withRefs*/ true);
                });
                describe("when main tsconfig has but has disableSourceOfProjectReferenceRedirect", () => {
                    verifyScenarioWorker(scenario, /*withRefs*/ true);
                });
            }

            describe("from project that uses dependency", () => {
                verifyScenario({
                    mainScenario: "can go to definition correctly",
                    verifier: withRefs => [
                        {
                            ...goToDefFromMainTsProjectInfoVerifier(withRefs),
                            main: () => ({
                                action: goToDefFromMainTs,
                                closedInfos: withRefs ?
                                    [dependencyTs.path, dependencyConfig.path, libFile.path] :
                                    [dependencyTs.path, libFile.path, dtsPath, dtsMapLocation],
                                otherWatchedFiles: [mainConfig.path],
                                expectsDts: !withRefs, // Dts script info present only if no project reference
                                expectsMap: !withRefs // Map script info present only if no project reference
                            }),
                            change: "main",
                            dtsChange: "main",
                            mapChange: ["main", () => ({
                                freshDocumentMapper: true
                            })],
                            noMap: withRefs ?
                                "main" :
                                ["main", main => ({
                                    action: goToDefFromMainTsWithNoMap,
                                    // Because map is deleted, dts and dependency are released
                                    closedInfos: removePath(main.closedInfos, dtsMapPath, dependencyTsPath),
                                    // Watches deleted file
                                    otherWatchedFiles: main.otherWatchedFiles.concat(dtsMapLocation),
                                    expectsMap: false
                                })],
                            mapFileCreated: "main",
                            mapFileDeleted: withRefs ?
                                "main" :
                                ["noMap", noMap => ({
                                    // The script info for depedency is collected only after file open
                                    closedInfos: noMap.closedInfos.concat(dependencyTs.path)
                                })],
                            noDts: withRefs ?
                                "main" :
                                ["main", main => ({
                                    action: goToDefFromMainTsWithNoDts,
                                    // No dts, no map, no dependency
                                    closedInfos: removePath(main.closedInfos, dtsPath, dtsMapPath, dependencyTsPath),
                                    expectsDts: false,
                                    expectsMap: false
                                })],
                            dtsFileCreated: "main",
                            dtsFileDeleted: withRefs ?
                                "main" :
                                ["noDts", noDts => ({
                                    // The script info for map is collected only after file open
                                    closedInfos: noDts.closedInfos.concat(dependencyTs.path, dtsMapLocation),
                                    expectsMap: true
                                })],
                            dependencyChange: ["main", () => ({
                                action: goToDefFromMainTsWithDependencyChange,
                            })],
                            noBuild: "noDts"
                        }
                    ]
                });
            });

            describe("from defining project", () => {
                verifyScenario({
                    mainScenario: "rename locations from dependency",
                    verifier: () => [
                        {
                            ...renameFromDependencyTsProjectInfoVerifier(),
                            main: () => ({
                                action: renameFromDependencyTs,
                                closedInfos: [libFile.path, dtsLocation, dtsMapLocation],
                                otherWatchedFiles: [dependencyConfig.path],
                                expectsDts: true,
                                expectsMap: true
                            }),
                            change: "main",
                            dtsChange: "main",
                            mapChange: ["main", () => ({
                                freshDocumentMapper: true
                            })],
                            noMap: ["main", main => ({
                                // No map
                                closedInfos: removePath(main.closedInfos, dtsMapPath),
                                // watch map
                                otherWatchedFiles: [...main.otherWatchedFiles, dtsMapLocation],
                                expectsMap: false
                            })],
                            mapFileCreated: "main",
                            mapFileDeleted: "noMap",
                            noDts: ["main", main => ({
                                // no dts or map since dts itself doesnt exist
                                closedInfos: removePath(main.closedInfos, dtsMapPath, dtsPath),
                                // watch deleted file
                                otherWatchedFiles: [...main.otherWatchedFiles, dtsLocation],
                                expectsDts: false,
                                expectsMap: false
                            })],
                            dtsFileCreated: "main",
                            dtsFileDeleted: ["noDts", noDts => ({
                                // Map is collected after file open
                                closedInfos: noDts.closedInfos.concat(dtsMapLocation),
                                expectsMap: true
                            })],
                            dependencyChange: ["main", () => ({
                                action: renameFromDependencyTsWithDependencyChange
                            })],
                            noBuild: "noDts"
                        }
                    ]
                });
            });

            describe("when opening depedency and usage project", () => {
                verifyScenario({
                    mainScenario: "goto Definition in usage and rename locations from defining project",
                    verifier: withRefs => [
                        {
                            ...goToDefFromMainTsProjectInfoVerifier(withRefs),
                            main: () => ({
                                action: goToDefFromMainTs,
                                // DependencyTs is open, so omit it from closed infos
                                closedInfos: withRefs ?
                                    [dependencyConfig.path, libFile.path] :
                                    [libFile.path, dtsPath, dtsMapLocation],
                                otherWatchedFiles: withRefs ?
                                    [mainConfig.path] : // Its in closed info
                                    [mainConfig.path, dependencyConfig.path],
                                expectsDts: !withRefs, // Dts script info present only if no project reference
                                expectsMap: !withRefs // Map script info present only if no project reference
                            }),
                            change: withRefs ?
                                ["main", main => ({
                                    // Because before this rename is done the closed info remains same as rename's main operation
                                    closedInfos: main.closedInfos.concat(dtsLocation, dtsMapLocation),
                                    expectsDts: true,
                                    expectsMap: true
                                })] :
                                "main",
                            dtsChange: "change",
                            mapChange: "change",
                            noMap: withRefs ?
                                "main" :
                                ["main", main => ({
                                    action: goToDefFromMainTsWithNoMap,
                                    closedInfos: removePath(main.closedInfos, dtsMapPath),
                                    otherWatchedFiles: main.otherWatchedFiles.concat(dtsMapLocation),
                                    expectsMap: false
                                })],
                            mapFileCreated: withRefs ?
                                ["main", main => ({
                                    // Because before this rename is done the closed info remains same as rename's main
                                    closedInfos: main.closedInfos.concat(dtsLocation),
                                    expectsDts: true,
                                    // This operation doesnt need map so the map info path in dts is not refreshed
                                    skipDtsMapCheck: withRefs
                                })] :
                                "main",
                            mapFileDeleted: withRefs ?
                                ["noMap", noMap => ({
                                    // Because before this rename is done the closed info remains same as rename's noMap operation
                                    closedInfos: noMap.closedInfos.concat(dtsLocation),
                                    expectsDts: true,
                                    // This operation doesnt need map so the map info path in dts is not refreshed
                                    skipDtsMapCheck: true
                                })] :
                                "noMap",
                            noDts: withRefs ?
                                "main" :
                                ["main", main => ({
                                    action: goToDefFromMainTsWithNoDts,
                                    closedInfos: removePath(main.closedInfos, dtsMapPath, dtsPath),
                                    expectsDts: false,
                                    expectsMap: false
                                })],
                            dtsFileCreated: withRefs ?
                                ["main", main => ({
                                    // Since the project for dependency is not updated, the watcher from rename for dts still there
                                    otherWatchedFiles: main.otherWatchedFiles.concat(dtsLocation)
                                })] :
                                "main",
                            dtsFileDeleted: ["noDts", noDts => ({
                                // Map collection after file open
                                closedInfos: noDts.closedInfos.concat(dtsMapLocation),
                                expectsMap: true
                            })],
                            dependencyChange: ["change", () => ({
                                action: goToDefFromMainTsWithDependencyChange,
                            })],
                            noBuild: "noDts"
                        },
                        {
                            ...renameFromDependencyTsProjectInfoVerifier(),
                            main: () => ({
                                action: renameFromDependencyTsWithBothProjectsOpen,
                                // DependencyTs is open, so omit it from closed infos
                                closedInfos: withRefs ?
                                    [dependencyConfig.path, libFile.path, dtsLocation, dtsMapLocation] :
                                    [libFile.path, dtsPath, dtsMapLocation],
                                otherWatchedFiles: withRefs ?
                                    [mainConfig.path] : // Its in closed info
                                    [mainConfig.path, dependencyConfig.path],
                                expectsDts: true,
                                expectsMap: true,
                                freshMapInfo: withRefs
                            }),
                            change: ["main", () => ({
                                freshMapInfo: false
                            })],
                            dtsChange: "change",
                            mapChange: ["main", () => ({
                                freshMapInfo: false,
                                freshDocumentMapper: withRefs
                            })],
                            noMap: ["main", main => ({
                                action: withRefs ?
                                    renameFromDependencyTsWithBothProjectsOpen :
                                    renameFromDependencyTs,
                                closedInfos: removePath(main.closedInfos, dtsMapPath),
                                otherWatchedFiles: main.otherWatchedFiles.concat(dtsMapLocation),
                                expectsMap: false,
                                freshDocumentMapper: withRefs
                            })],
                            mapFileCreated: "main",
                            mapFileDeleted: "noMap",
                            noDts: ["change", change => ({
                                action: withRefs ?
                                    renameFromDependencyTsWithBothProjectsOpen :
                                    renameFromDependencyTs,
                                closedInfos: removePath(change.closedInfos, dtsPath, dtsMapPath),
                                otherWatchedFiles: change.otherWatchedFiles.concat(dtsLocation),
                                expectsDts: false,
                                expectsMap: false
                            })],
                            dtsFileCreated: "main",
                            dtsFileDeleted: ["noDts", noDts => ({
                                // Map collection after file open
                                closedInfos: noDts.closedInfos.concat(dtsMapLocation),
                                expectsMap: true
                            })],
                            dependencyChange: ["change", () => ({
                                action: renameFromDependencyTsWithBothProjectsOpenWithDependencyChange
                            })],
                            noBuild: "noDts"
                        }
                    ]
                });
            });
        });

        describe("when root file is file from referenced project", () => {
            function verify(disableSourceOfProjectReferenceRedirect: boolean) {
                const projectLocation = `/user/username/projects/project`;
                const commonConfig: File = {
                    path: `${projectLocation}/src/common/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            declarationMap: true,
                            outDir: "../../out",
                            baseUrl: "..",
                            disableSourceOfProjectReferenceRedirect
                        },
                        include: ["./**/*"]
                    })
                };
                const keyboardTs: File = {
                    path: `${projectLocation}/src/common/input/keyboard.ts`,
                    content: `function bar() { return "just a random function so .d.ts location doesnt match"; }
export function evaluateKeyboardEvent() { }`
                };
                const keyboardTestTs: File = {
                    path: `${projectLocation}/src/common/input/keyboard.test.ts`,
                    content: `import { evaluateKeyboardEvent } from 'common/input/keyboard';
function testEvaluateKeyboardEvent() {
    return evaluateKeyboardEvent();
}
`
                };
                const srcConfig: File = {
                    path: `${projectLocation}/src/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            composite: true,
                            declarationMap: true,
                            outDir: "../out",
                            baseUrl: ".",
                            paths: {
                                "common/*": ["./common/*"],
                            },
                            tsBuildInfoFile: "../out/src.tsconfig.tsbuildinfo",
                            disableSourceOfProjectReferenceRedirect
                        },
                        include: ["./**/*"],
                        references: [
                            { path: "./common" }
                        ]
                    })
                };
                const terminalTs: File = {
                    path: `${projectLocation}/src/terminal.ts`,
                    content: `import { evaluateKeyboardEvent } from 'common/input/keyboard';
function foo() {
    return evaluateKeyboardEvent();
}
`
                };
                const host = createHost(
                    [commonConfig, keyboardTs, keyboardTestTs, srcConfig, terminalTs, libFile],
                    [srcConfig.path]
                );
                const session = createSession(host);
                openFilesForSession([keyboardTs, terminalTs], session);

                const searchStr = "evaluateKeyboardEvent";
                const importStr = `import { evaluateKeyboardEvent } from 'common/input/keyboard';`;
                const result = session.executeCommandSeq<protocol.ReferencesRequest>({
                    command: protocol.CommandTypes.References,
                    arguments: protocolFileLocationFromSubstring(keyboardTs, searchStr)
                }).response as protocol.ReferencesResponseBody;
                assert.deepEqual(result, {
                    refs: [
                        makeReferenceItem({
                            file: keyboardTs,
                            text: searchStr,
                            contextText: `export function evaluateKeyboardEvent() { }`,
                            isDefinition: true,
                            lineText: `export function evaluateKeyboardEvent() { }`
                        }),
                        makeReferenceItem({
                            file: keyboardTestTs,
                            text: searchStr,
                            contextText: importStr,
                            isDefinition: true,
                            lineText: importStr
                        }),
                        makeReferenceItem({
                            file: keyboardTestTs,
                            text: searchStr,
                            options: { index: 1 },
                            isDefinition: false,
                            lineText: `    return evaluateKeyboardEvent();`
                        }),
                        makeReferenceItem({
                            file: terminalTs,
                            text: searchStr,
                            contextText: importStr,
                            isDefinition: true,
                            lineText: importStr
                        }),
                        makeReferenceItem({
                            file: terminalTs,
                            text: searchStr,
                            options: { index: 1 },
                            isDefinition: false,
                            lineText: `    return evaluateKeyboardEvent();`
                        }),
                    ],
                    symbolName: searchStr,
                    symbolStartOffset: protocolLocationFromSubstring(keyboardTs.content, searchStr).offset,
                    symbolDisplayString: "function evaluateKeyboardEvent(): void"
                });
            }

            it(`when using declaration file maps to navigate between projects`, () => {
                verify(/*disableSourceOfProjectReferenceRedirect*/ true);
            });
            it(`when using original source files in the project`, () => {
                verify(/*disableSourceOfProjectReferenceRedirect*/ false);
            });
        });

        it("reusing d.ts files from composite and non composite projects", () => {
            const configA: File = {
                path: `${tscWatch.projectRoot}/compositea/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "../dist/",
                        rootDir: "../",
                        baseUrl: "../",
                        paths: { "@ref/*": ["./dist/*"] }
                    }
                })
            };
            const aTs: File = {
                path: `${tscWatch.projectRoot}/compositea/a.ts`,
                content: `import { b } from "@ref/compositeb/b";`
            };
            const a2Ts: File = {
                path: `${tscWatch.projectRoot}/compositea/a2.ts`,
                content: `export const x = 10;`
            };
            const configB: File = {
                path: `${tscWatch.projectRoot}/compositeb/tsconfig.json`,
                content: configA.content
            };
            const bTs: File = {
                path: `${tscWatch.projectRoot}/compositeb/b.ts`,
                content: "export function b() {}"
            };
            const bDts: File = {
                path: `${tscWatch.projectRoot}/dist/compositeb/b.d.ts`,
                content: "export declare function b(): void;"
            };
            const configC: File = {
                path: `${tscWatch.projectRoot}/compositec/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        outDir: "../dist/",
                        rootDir: "../",
                        baseUrl: "../",
                        paths: { "@ref/*": ["./*"] }
                    },
                    references: [{ path: "../compositeb" }]
                })
            };
            const cTs: File = {
                path: `${tscWatch.projectRoot}/compositec/c.ts`,
                content: aTs.content
            };
            const files = [libFile, aTs, a2Ts, configA, bDts, bTs, configB, cTs, configC];
            const host = createServerHost(files);
            const service = createProjectService(host);
            service.openClientFile(aTs.path);
            service.checkNumberOfProjects({ configuredProjects: 1 });

            // project A referencing b.d.ts without project reference
            const projectA = service.configuredProjects.get(configA.path)!;
            assert.isDefined(projectA);
            checkProjectActualFiles(projectA, [aTs.path, a2Ts.path, bDts.path, libFile.path, configA.path]);

            // reuses b.d.ts but sets the path and resolved path since projectC has project references
            // as the real resolution was to b.ts
            service.openClientFile(cTs.path);
            service.checkNumberOfProjects({ configuredProjects: 2 });
            const projectC = service.configuredProjects.get(configC.path)!;
            checkProjectActualFiles(projectC, [cTs.path, bTs.path, libFile.path, configC.path]);

            // Now new project for project A tries to reuse b but there is no filesByName mapping for b's source location
            host.writeFile(a2Ts.path, `${a2Ts.content}export const y = 30;`);
            assert.isTrue(projectA.dirty);
            projectA.updateGraph();
        });

        describe("when references are monorepo like with symlinks", () => {
            interface Packages {
                bPackageJson: File;
                aTest: File;
                bFoo: File;
                bBar: File;
                bSymlink: SymLink;
            }
            function verifySymlinkScenario(packages: () => Packages) {
                describe("when solution is not built", () => {
                    it("with preserveSymlinks turned off", () => {
                        verifySession(packages(), /*alreadyBuilt*/ false, {});
                    });

                    it("with preserveSymlinks turned on", () => {
                        verifySession(packages(), /*alreadyBuilt*/ false, { preserveSymlinks: true });
                    });
                });

                describe("when solution is already built", () => {
                    it("with preserveSymlinks turned off", () => {
                        verifySession(packages(), /*alreadyBuilt*/ true, {});
                    });

                    it("with preserveSymlinks turned on", () => {
                        verifySession(packages(), /*alreadyBuilt*/ true, { preserveSymlinks: true });
                    });
                });
            }

            function verifySession({ bPackageJson, aTest, bFoo, bBar, bSymlink }: Packages, alreadyBuilt: boolean, extraOptions: CompilerOptions) {
                const aConfig = config("A", extraOptions, ["../B"]);
                const bConfig = config("B", extraOptions);
                const files = [libFile, bPackageJson, aConfig, bConfig, aTest, bFoo, bBar, bSymlink];
                const host = alreadyBuilt ?
                    createHost(files, [aConfig.path]) :
                    createServerHost(files);

                // Create symlink in node module
                const session = createSession(host, { canUseEvents: true });
                openFilesForSession([aTest], session);
                const service = session.getProjectService();
                const project = service.configuredProjects.get(aConfig.path.toLowerCase())!;
                assert.deepEqual(project.getAllProjectErrors(), []);
                checkProjectActualFiles(
                    project,
                    [aConfig.path, aTest.path, bFoo.path, bBar.path, libFile.path]
                );
                verifyGetErrRequest({
                    host,
                    session,
                    expected: [
                        { file: aTest, syntax: [], semantic: [], suggestion: [] }
                    ]
                });
                session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName: aTest.path,
                            textChanges: [{
                                newText: "\n",
                                start: { line: 5, offset: 1 },
                                end: { line: 5, offset: 1 }
                            }]
                        }]
                    }
                });
                verifyGetErrRequest({
                    host,
                    session,
                    expected: [
                        { file: aTest, syntax: [], semantic: [], suggestion: [] }
                    ]
                });
            }

            function config(packageName: string, extraOptions: CompilerOptions, references?: string[]): File {
                return {
                    path: `${tscWatch.projectRoot}/packages/${packageName}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            outDir: "lib",
                            rootDir: "src",
                            composite: true,
                            ...extraOptions
                        },
                        include: ["src"],
                        ...(references ? { references: references.map(path => ({ path })) } : {})
                    })
                };
            }

            function file(packageName: string, fileName: string, content: string): File {
                return {
                    path: `${tscWatch.projectRoot}/packages/${packageName}/src/${fileName}`,
                    content
                };
            }

            function verifyMonoRepoLike(scope = "") {
                describe("when packageJson has types field and has index.ts", () => {
                    verifySymlinkScenario(() => ({
                        bPackageJson: {
                            path: `${tscWatch.projectRoot}/packages/B/package.json`,
                            content: JSON.stringify({
                                main: "lib/index.js",
                                types: "lib/index.d.ts"
                            })
                        },
                        aTest: file("A", "index.ts", `import { foo } from '${scope}b';
import { bar } from '${scope}b/lib/bar';
foo();
bar();
`),
                        bFoo: file("B", "index.ts", `export function foo() { }`),
                        bBar: file("B", "bar.ts", `export function bar() { }`),
                        bSymlink: {
                            path: `${tscWatch.projectRoot}/node_modules/${scope}b`,
                            symLink: `${tscWatch.projectRoot}/packages/B`
                        }
                    }));
                });

                describe("when referencing file from subFolder", () => {
                    verifySymlinkScenario(() => ({
                        bPackageJson: {
                            path: `${tscWatch.projectRoot}/packages/B/package.json`,
                            content: "{}"
                        },
                        aTest: file("A", "test.ts", `import { foo } from '${scope}b/lib/foo';
import { bar } from '${scope}b/lib/bar/foo';
foo();
bar();
`),
                        bFoo: file("B", "foo.ts", `export function foo() { }`),
                        bBar: file("B", "bar/foo.ts", `export function bar() { }`),
                        bSymlink: {
                            path: `${tscWatch.projectRoot}/node_modules/${scope}b`,
                            symLink: `${tscWatch.projectRoot}/packages/B`
                        }
                    }));
                });
            }
            describe("when package is not scoped", () => {
                verifyMonoRepoLike();
            });
            describe("when package is scoped", () => {
                verifyMonoRepoLike("@issue/");
            });
        });

        it("when finding local reference doesnt load ancestor/sibling projects", () => {
            const solutionLocation = "/user/username/projects/solution";
            const solution: File = {
                path: `${solutionLocation}/tsconfig.json`,
                content: JSON.stringify({
                    files: [],
                    include: [],
                    references: [
                        { path: "./compiler" },
                        { path: "./services" },
                    ]
                })
            };
            const compilerConfig: File = {
                path: `${solutionLocation}/compiler/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        module: "none"
                    },
                    files: ["./types.ts", "./program.ts"]
                })
            };
            const typesFile: File = {
                path: `${solutionLocation}/compiler/types.ts`,
                content: `
                namespace ts {
                    export interface Program {
                        getSourceFiles(): string[];
                    }
                }`
            };
            const programFile: File = {
                path: `${solutionLocation}/compiler/program.ts`,
                content: `
                namespace ts {
                    export const program: Program = {
                        getSourceFiles: () => [getSourceFile()]
                    };
                    function getSourceFile() { return "something"; }
                }`
            };
            const servicesConfig: File = {
                path: `${solutionLocation}/services/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true
                    },
                    files: ["./services.ts"],
                    references: [
                        { path: "../compiler" }
                    ]
                })
            };
            const servicesFile: File = {
                path: `${solutionLocation}/services/services.ts`,
                content: `
                namespace ts {
                    const result = program.getSourceFiles();
                }`
            };

            const files = [libFile, solution, compilerConfig, typesFile, programFile, servicesConfig, servicesFile, libFile];
            const host = createServerHost(files);
            const session = createSession(host);
            const service = session.getProjectService();
            service.openClientFile(programFile.path);
            checkNumberOfProjects(service, { configuredProjects: 2 });
            const compilerProject = service.configuredProjects.get(compilerConfig.path)!;
            checkProjectActualFiles(compilerProject, [libFile.path, typesFile.path, programFile.path, compilerConfig.path]);
            const solutionProject = service.configuredProjects.get(solution.path)!;
            assert.isTrue(solutionProject.isInitialLoadPending());

            // Find all references for getSourceFile
            const response = session.executeCommandSeq<protocol.ReferencesRequest>({
                command: protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(programFile, "getSourceFile", { index: 1 })
            }).response as protocol.ReferencesResponseBody;
            assert.deepEqual(response, {
                refs: [
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFile",
                        options: { index: 1 },
                        isDefinition: false,
                        lineText: `                        getSourceFiles: () => [getSourceFile()]`,
                    }),
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFile",
                        options: { index: 2 },
                        contextText: `function getSourceFile() { return "something"; }`,
                        isDefinition: true,
                        lineText: `                    function getSourceFile() { return "something"; }`,
                    })
                ],
                symbolName: "getSourceFile",
                symbolStartOffset: protocolLocationFromSubstring(programFile.content, "getSourceFile", { index: 1 }).offset,
                symbolDisplayString: "function getSourceFile(): string"
            });
            // Shouldnt load more projects
            checkNumberOfProjects(service, { configuredProjects: 2 });
            assert.isTrue(solutionProject.isInitialLoadPending());

            // Find all references for getSourceFiles
            const getSourceFilesResponse = session.executeCommandSeq<protocol.ReferencesRequest>({
                command: protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(programFile, "getSourceFiles")
            }).response as protocol.ReferencesResponseBody;
            assert.deepEqual(getSourceFilesResponse, {
                refs: [
                    makeReferenceItem({
                        file: typesFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles(): string[];`,
                        isDefinition: true,
                        isWriteAccess: false,
                        lineText: `                        getSourceFiles(): string[];`,
                    }),
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles: () => [getSourceFile()]`,
                        isDefinition: true,
                        lineText: `                        getSourceFiles: () => [getSourceFile()]`,
                    }),
                    makeReferenceItem({
                        file: servicesFile,
                        text: "getSourceFiles",
                        isDefinition: false,
                        lineText: `                    const result = program.getSourceFiles();`,
                    })
                ],
                symbolName: "getSourceFiles",
                symbolStartOffset: protocolLocationFromSubstring(typesFile.content, "getSourceFiles").offset,
                symbolDisplayString: "(method) ts.Program.getSourceFiles(): string[]"
            });

            // Should load more projects
            checkNumberOfProjects(service, { configuredProjects: 3 });
            assert.isFalse(solutionProject.isInitialLoadPending());
            checkProjectActualFiles(solutionProject, [solution.path]);
            checkProjectActualFiles(service.configuredProjects.get(servicesConfig.path)!, [servicesFile.path, servicesConfig.path, libFile.path, typesFile.path, programFile.path]);
        });

        it("when disableSolutionSearching is true, solution and siblings are not loaded", () => {
            const solutionLocation = "/user/username/projects/solution";
            const solution: File = {
                path: `${solutionLocation}/tsconfig.json`,
                content: JSON.stringify({
                    files: [],
                    include: [],
                    references: [
                        { path: "./compiler" },
                        { path: "./services" },
                    ]
                })
            };
            const compilerConfig: File = {
                path: `${solutionLocation}/compiler/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true,
                        module: "none",
                        disableSolutionSearching: true
                    },
                    files: ["./types.ts", "./program.ts"]
                })
            };
            const typesFile: File = {
                path: `${solutionLocation}/compiler/types.ts`,
                content: `
                namespace ts {
                    export interface Program {
                        getSourceFiles(): string[];
                    }
                }`
            };
            const programFile: File = {
                path: `${solutionLocation}/compiler/program.ts`,
                content: `
                namespace ts {
                    export const program: Program = {
                        getSourceFiles: () => [getSourceFile()]
                    };
                    function getSourceFile() { return "something"; }
                }`
            };
            const servicesConfig: File = {
                path: `${solutionLocation}/services/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        composite: true
                    },
                    files: ["./services.ts"],
                    references: [
                        { path: "../compiler" }
                    ]
                })
            };
            const servicesFile: File = {
                path: `${solutionLocation}/services/services.ts`,
                content: `
                namespace ts {
                    const result = program.getSourceFiles();
                }`
            };

            const files = [libFile, solution, compilerConfig, typesFile, programFile, servicesConfig, servicesFile, libFile];
            const host = createServerHost(files);
            const session = createSession(host);
            const service = session.getProjectService();
            service.openClientFile(programFile.path);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const compilerProject = service.configuredProjects.get(compilerConfig.path)!;
            checkProjectActualFiles(compilerProject, [libFile.path, typesFile.path, programFile.path, compilerConfig.path]);

            // Find all references
            const getSourceFilesResponse = session.executeCommandSeq<protocol.ReferencesRequest>({
                command: protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(programFile, "getSourceFiles")
            }).response as protocol.ReferencesResponseBody;
            assert.deepEqual(getSourceFilesResponse, {
                refs: [
                    makeReferenceItem({
                        file: typesFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles(): string[];`,
                        isDefinition: true,
                        isWriteAccess: false,
                        lineText: `                        getSourceFiles(): string[];`,
                    }),
                    makeReferenceItem({
                        file: programFile,
                        text: "getSourceFiles",
                        contextText: `getSourceFiles: () => [getSourceFile()]`,
                        isDefinition: true,
                        lineText: `                        getSourceFiles: () => [getSourceFile()]`,
                    }),
                ],
                symbolName: "getSourceFiles",
                symbolStartOffset: protocolLocationFromSubstring(typesFile.content, "getSourceFiles").offset,
                symbolDisplayString: "(method) ts.Program.getSourceFiles(): string[]"
            });

            // No new solutions/projects loaded
            checkNumberOfProjects(service, { configuredProjects: 1 });
        });
    });
}
