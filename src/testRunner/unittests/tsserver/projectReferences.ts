namespace ts.projectSystem {
    describe("unittests:: tsserver:: with project references and tsbuild", () => {
        function createHost(files: ReadonlyArray<File>, rootNames: ReadonlyArray<string>) {
            const host = createServerHost(files);

            // ts build should succeed
            const solutionBuilder = tscWatch.createSolutionBuilder(host, rootNames, {});
            solutionBuilder.build();
            assert.equal(host.getOutput().length, 0);

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
                checkNumberOfProjects(service, { configuredProjects: 1 });
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
                assert.deepEqual(response.locs, [
                    { file: locationOfMyConstInLib.file, locs: [renameTextOfMyConstInLib] },
                    { file: myConstFile, locs: [{ start: myConstStart, end: myConstEnd }] }
                ]);
            });
        });

        describe("with main and depedency project", () => {
            const projectLocation = "/user/username/projects/myproject";
            const dependecyLocation = `${projectLocation}/dependency`;
            const dependecyDeclsLocation = `${projectLocation}/decls`;
            const mainLocation = `${projectLocation}/main`;
            const dependencyTs: File = {
                path: `${dependecyLocation}/FnS.ts`,
                content: `export function fn1() { }
export function fn2() { }
export function fn3() { }
export function fn4() { }
export function fn5() { }
`
            };
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
                path: `${projectLocation}/random/random.ts`,
                content: "let a = 10;"
            };
            const randomConfig: File = {
                path: `${projectLocation}/random/tsconfig.json`,
                content: "{}"
            };
            const dtsLocation = `${dependecyDeclsLocation}/FnS.d.ts`;
            const dtsPath = dtsLocation.toLowerCase() as Path;
            const dtsMapLocation = `${dependecyDeclsLocation}/FnS.d.ts.map`;
            const dtsMapPath = dtsMapLocation.toLowerCase() as Path;

            const files = [dependencyTs, dependencyConfig, mainTs, mainConfig, libFile, randomFile, randomConfig];

            function verifyScriptInfos(session: TestSession, host: TestServerHost, openInfos: ReadonlyArray<string>, closedInfos: ReadonlyArray<string>, otherWatchedFiles: ReadonlyArray<string>, additionalInfo: string) {
                checkScriptInfos(session.getProjectService(), openInfos.concat(closedInfos), additionalInfo);
                checkWatchedFiles(host, closedInfos.concat(otherWatchedFiles).map(f => f.toLowerCase()), additionalInfo);
            }

            function verifyInfosWithRandom(session: TestSession, host: TestServerHost, openInfos: ReadonlyArray<string>, closedInfos: ReadonlyArray<string>, otherWatchedFiles: ReadonlyArray<string>, reqName: string) {
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

            interface Action<Req = protocol.Request, Response = {}> {
                reqName: string;
                request: Partial<Req>;
                expectedResponse: Response;
            }
            interface ActionInfo<Req = protocol.Request, Response = {}> {
                action: (fn: number) => Action<Req, Response>;
                closedInfos: () => readonly string[];
                otherWatchedFiles: () => readonly string[];
                expectsDts: boolean;
                expectsMap: boolean;
            }
            type ActionKey = keyof ActionInfoVerifier;
            type ActionInfoGetterFn<Req = protocol.Request, Response = {}> = () => ActionInfo<Req, Response>;
            type ActionInfoGetter<Req = protocol.Request, Response = {}> = ActionInfoGetterFn<Req, Response> | ActionKey;
            interface ProjectInfoVerifier {
                openFile: File;
                openFileLastLine: number;
                configFile: File;
                expectedProjectActualFiles: readonly string[];
            }
            interface ActionInfoVerifier<Req = protocol.Request, Response = {}> {
                main: ActionInfoGetter<Req, Response>;
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
                verifier: (withRefs: boolean) => readonly DocumentPositionMapperVerifier[];
            }

            function openFiles(verifiers: readonly DocumentPositionMapperVerifier[]) {
                return verifiers.map(v => v.openFile);
            }
            interface OpenTsFile extends VerifierAndWithRefs {
                onHostCreate?: (host: TestServerHost) => void;
            }
            function openTsFile({ withRefs, verifier, onHostCreate }: OpenTsFile) {
                const host = createHost(files, [mainConfig.path]);
                if (!withRefs) {
                    // Erase project reference
                    host.writeFile(mainConfig.path, JSON.stringify({
                        compilerOptions: { composite: true, declarationMap: true }
                    }));
                }
                if (onHostCreate) {
                    onHostCreate(host);
                }
                const session = createSession(host);
                const verifiers = verifier(withRefs);
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

            function verifyDocumentPositionMapper(session: TestSession, dependencyMap: server.ScriptInfo | undefined, documentPositionMapper: server.ScriptInfo["documentPositionMapper"], equal: boolean) {
                assert.strictEqual(session.getProjectService().filenameToScriptInfo.get(dtsMapPath), dependencyMap);
                if (dependencyMap) {
                    if (equal) {
                        assert.strictEqual(dependencyMap.documentPositionMapper, documentPositionMapper);
                    }
                    else {
                        assert.notStrictEqual(dependencyMap.documentPositionMapper, documentPositionMapper);
                    }
                }
            }

            function getActionInfo(verifiers: readonly DocumentPositionMapperVerifier[], actionKey: ActionKey): ActionInfo[] {
                return verifiers.map(v => {
                    let actionInfoGetter = v[actionKey];
                    while (isString(actionInfoGetter)) {
                        actionInfoGetter = v[actionInfoGetter];
                    }
                    return actionInfoGetter();
                });
            }

            interface VerifyAllFnAction {
                session: TestSession;
                host: TestServerHost;
                verifiers: readonly DocumentPositionMapperVerifier[];
                actionKey: ActionKey;
                sourceMapPath?: server.ScriptInfo["sourceMapFilePath"];
                dependencyMap?: server.ScriptInfo | undefined;
                documentPositionMapper?: server.ScriptInfo["documentPositionMapper"];
                firstEquals?: boolean;
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
                firstEquals
            }: VerifyAllFnAction): VerifyAllFnActionResult {
                const actionInfos = getActionInfo(verifiers, actionKey);
                let sourceMapPath: server.ScriptInfo["sourceMapFilePath"] | undefined;
                // action
                let first = true;
                for (const { action, closedInfos, otherWatchedFiles, expectsDts, expectsMap } of actionInfos) {
                    for (let fn = 1; fn <= 5; fn++) {
                        const fnAction = action(fn);
                        verifyAction(session, fnAction);
                        const dtsInfo = verifyScriptInfoPresence(session, dtsPath, expectsDts, fnAction.reqName);
                        const dtsMapInfo = verifyScriptInfoPresence(session, dtsMapPath, expectsMap, fnAction.reqName);
                        verifyInfosWithRandom(
                            session,
                            host,
                            openFiles(verifiers).map(f => f.path),
                            closedInfos(),
                            otherWatchedFiles(),
                            `${actionKey}:: ${fnAction.reqName}`
                        );

                        if (dtsInfo) {
                            if (first) {
                                if (dtsMapInfo) {
                                    assert.equal(dtsInfo.sourceMapFilePath, dtsMapPath, `${actionKey}:: ${fnAction.reqName}`);
                                }
                                else {
                                    assert.isNotString(dtsInfo.sourceMapFilePath);
                                    assert.isNotFalse(dtsInfo.sourceMapFilePath);
                                    assert.isDefined(dtsInfo.sourceMapFilePath);
                                }
                            }
                            else {
                                assert.equal(dtsInfo.sourceMapFilePath, sourceMapPath, `${actionKey}:: ${fnAction.reqName}`);
                            }
                        }
                        if (!first || firstEquals !== undefined) {
                            verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper, !first || !!firstEquals);
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
                verifyInfosWithRandom(
                    session,
                    host,
                    openFiles(verifiers).map(f => f.path),
                    closedInfos(),
                    otherWatchedFiles(),
                    `${actionKey} Collection`
                );
                verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper, /*equal*/ true);

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
                    afterActionDocumentPositionMapperNotEquals,
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
                        verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper, /*equal*/ true);
                    }

                    // action
                    verifyAllFnAction({
                        session,
                        host,
                        verifiers,
                        actionKey: afterChangeActionKey,
                        dependencyMap,
                        documentPositionMapper,
                        firstEquals: !afterActionDocumentPositionMapperNotEquals
                    });
                });
            }

            interface VerifyScenarioWithChanges extends VerifierAndWithRefs {
                scenarioName: string;
                change: (host: TestServerHost, session: TestSession, verifiers: readonly DocumentPositionMapperVerifier[]) => void;
                afterActionDocumentPositionMapperNotEquals?: true;
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
                        const result = verifyAllFnAction({ session, host, verifiers, actionKey: fileDeletedKey });
                        checkProject(session, verifiers, noDts);

                        // Script info collection should behave as fileNotPresentKey
                        verifyScriptInfoCollection(
                            session,
                            host,
                            verifiers,
                            {
                                actionInfos: getActionInfo(verifiers, fileNotPresentKey),
                                actionKey: result.actionKey,
                                dependencyMap: undefined,
                                documentPositionMapper: undefined
                            }
                        );
                    });
                });
            }

            function verifyScenarioWorker({ mainScenario, verifier }: VerifyScenario, withRefs: boolean) {
                it(mainScenario, () => {
                    const { host, session, verifiers } = openTsFile({ withRefs, verifier });
                    checkProject(session, verifiers);
                    verifyScenarioAndScriptInfoCollection(session, host, verifiers, "main");
                });

                // Edit
                verifyScenarioWithChanges({
                    scenarioName: "when usage file changes, document position mapper doesnt change",
                    verifier,
                    withRefs,
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
                    afterChangeActionKey: "main"
                });

                // Edit dts to add new fn
                verifyScenarioWithChanges({
                    scenarioName: "when dependency .d.ts changes, document position mapper doesnt change",
                    verifier,
                    withRefs,
                    change: host => host.writeFile(
                        dtsLocation,
                        host.readFile(dtsLocation)!.replace(
                            "//# sourceMappingURL=FnS.d.ts.map",
                            `export declare function fn6(): void;
//# sourceMappingURL=FnS.d.ts.map`
                        )
                    ),
                    afterChangeActionKey: "main"
                });

                // Edit map file to represent added new line
                verifyScenarioWithChanges({
                    scenarioName: "when dependency file's map changes",
                    verifier,
                    withRefs,
                    change: host => host.writeFile(
                        dtsMapLocation,
                        `{"version":3,"file":"FnS.d.ts","sourceRoot":"","sources":["../dependency/FnS.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,eAAO,MAAM,CAAC,KAAK,CAAC"}`
                    ),
                    afterChangeActionKey: "main",
                    afterActionDocumentPositionMapperNotEquals: true
                });

                verifyScenarioWhenFileNotPresent({
                    scenarioName: "with depedency files map file",
                    verifier,
                    withRefs,
                    fileLocation: dtsMapLocation,
                    fileNotPresentKey: "noMap",
                    fileCreatedKey: "mapFileCreated",
                    fileDeletedKey: "mapFileDeleted"
                });

                verifyScenarioWhenFileNotPresent({
                    scenarioName: "with depedency .d.ts file",
                    verifier,
                    withRefs,
                    fileLocation: dtsLocation,
                    fileNotPresentKey: "noDts",
                    fileCreatedKey: "dtsFileCreated",
                    fileDeletedKey: "dtsFileDeleted",
                    noDts: true
                });

                if (withRefs) {
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

                    it("when d.ts file is not generated", () => {
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
            }

            describe("from project that uses dependency", () => {
                function goToDefActionInfo(withRefs: boolean): ActionInfo<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                    return {
                        action: goToDefFromMainTs,
                        closedInfos: () => withRefs ?
                            [dependencyTs.path, dependencyConfig.path, libFile.path] :
                            [dependencyTs.path, libFile.path, dtsPath, dtsMapLocation],
                        otherWatchedFiles: () => [mainConfig.path],
                        expectsDts: !withRefs, // Dts script info present only if no project reference
                        expectsMap: !withRefs // Map script info present only if no project reference
                    };
                }

                function goToDefNoMapActionInfo(withRefs: boolean): ActionInfo<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                    return {
                        ...goToDefActionInfo(withRefs),
                        action: withRefs ?
                            goToDefFromMainTs :
                            goToDefFromMainTsWithNoMap,
                        closedInfos: () => withRefs ?
                            [dependencyTs.path, dependencyConfig.path, libFile.path] :
                            [libFile.path, dtsPath], // Because map is deleted, dts and dependency are released
                        otherWatchedFiles: () => withRefs ?
                            [mainConfig.path] :
                            [mainConfig.path, dtsMapPath], // Watches deleted file
                        expectsMap: false
                    };
                }

                function goToDefNoDtsActionInfo(withRefs: boolean): ActionInfo<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                    return {
                        ...goToDefActionInfo(withRefs),
                        action: withRefs ?
                            goToDefFromMainTs :
                            goToDefFromMainTsWithNoDts,
                        closedInfos: () => withRefs ?
                            [dependencyTs.path, dependencyConfig.path, libFile.path] :
                            [libFile.path], // No dts means no map, no dependency
                        expectsDts: false,
                        expectsMap: false
                    };
                }

                verifyScenario({
                    mainScenario: "can go to definition correctly",
                    verifier: withRefs => [
                        {
                            ...goToDefFromMainTsProjectInfoVerifier(withRefs),
                            main: () => goToDefActionInfo(withRefs),
                            noMap: () => goToDefNoMapActionInfo(withRefs),
                            mapFileCreated: "main",
                            mapFileDeleted: () => ({
                                ...goToDefNoMapActionInfo(withRefs),
                                closedInfos: () => withRefs ?
                                    [dependencyTs.path, dependencyConfig.path, libFile.path] :
                                    // The script info for depedency is collected only after file open
                                    [dependencyTs.path, libFile.path, dtsPath]
                            }),
                            noDts: () => goToDefNoDtsActionInfo(withRefs),
                            dtsFileCreated: "main",
                            dtsFileDeleted: () => ({
                                ...goToDefNoDtsActionInfo(withRefs),
                                // The script info for map is collected only after file open
                                closedInfos: () => withRefs ?
                                    [dependencyTs.path, dependencyConfig.path, libFile.path] :
                                    [dependencyTs.path, libFile.path, dtsMapLocation],
                                expectsMap: !withRefs
                            }),
                            dependencyChange: () => ({
                                ...goToDefActionInfo(withRefs),
                                action: goToDefFromMainTsWithDependencyChange,
                                expectsDts: false,
                                expectsMap: false
                            }),
                            noBuild: "main"
                        }
                    ]
                });
            });

            describe("from defining project", () => {
                function renameActionInfo(): ActionInfo<protocol.RenameRequest, protocol.RenameResponseBody> {
                    return {
                        action: renameFromDependencyTs,
                        closedInfos: () => [libFile.path, dtsLocation, dtsMapLocation],
                        otherWatchedFiles: () => [dependencyConfig.path],
                        expectsDts: true,
                        expectsMap: true
                    };
                }

                function renameNoMapActionInfo(): ActionInfo<protocol.RenameRequest, protocol.RenameResponseBody> {
                    return {
                        ...renameActionInfo(),
                        closedInfos: () => [libFile.path, dtsLocation], // No map
                        otherWatchedFiles: () => [dependencyConfig.path, dtsMapLocation], // watch map
                        expectsMap: false
                    };
                }

                function renameNoDtsActionInfo(): ActionInfo<protocol.RenameRequest, protocol.RenameResponseBody> {
                    return {
                        action: renameFromDependencyTs,
                        closedInfos: () => [libFile.path], // no dts or map since dts itself doesnt exist
                        otherWatchedFiles: () => [dependencyConfig.path, dtsPath], // watch deleted file
                        expectsDts: false,
                        expectsMap: false
                    };
                }

                verifyScenario({
                    mainScenario: "rename locations from dependency",
                    verifier: () => [
                        {
                            ...renameFromDependencyTsProjectInfoVerifier(),
                            main: renameActionInfo,
                            noMap: renameNoMapActionInfo,
                            mapFileCreated: "main",
                            mapFileDeleted: "noMap",
                            noDts: renameNoDtsActionInfo,
                            dtsFileCreated: "main",
                            dtsFileDeleted: () => ({
                                ...renameNoDtsActionInfo(),
                                // Map is collected after file open
                                closedInfos: () => [libFile.path, dtsMapLocation],
                                expectsMap: true
                            }),
                            dependencyChange: () => ({
                                ...renameActionInfo(),
                                action: renameFromDependencyTsWithDependencyChange
                            }),
                            noBuild: () => ({
                                action: renameFromDependencyTs,
                                closedInfos: () => [libFile.path], // No dts or map since its not built/present
                                // Watching for creation of dts so that it can give correct results across projects
                                otherWatchedFiles: () => [dependencyConfig.path, dtsPath],
                                expectsDts: false,
                                expectsMap: false
                            })
                        }
                    ]
                });
            });

            describe("when opening depedency and usage project", () => {
                function closedInfos(withRefs: boolean) {
                    // DependencyTs is open, so omit it from closed infos
                    return () => withRefs ?
                        [dependencyConfig.path, libFile.path] :
                        [libFile.path, dtsPath, dtsMapLocation];
                }

                function otherWatchedFiles(withRefs: boolean) {
                    return () => withRefs ?
                        [mainConfig.path] : // Its in closed info
                        [mainConfig.path, dependencyConfig.path];
                }

                function goToDefActionInfo(withRefs: boolean): ActionInfo<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                    return {
                        action: goToDefFromMainTs,
                        closedInfos: closedInfos(withRefs),
                        otherWatchedFiles: otherWatchedFiles(withRefs),
                        expectsDts: !withRefs, // Dts script info present only if no project reference
                        expectsMap: !withRefs // Map script info present only if no project reference
                    };
                }

                function renameActionInfo(withRefs: boolean): ActionInfo<protocol.RenameRequest, protocol.RenameResponseBody> {
                    return {
                        action: renameFromDependencyTsWithBothProjectsOpen,
                        closedInfos: closedInfos(withRefs),
                        otherWatchedFiles: otherWatchedFiles(withRefs),
                        expectsDts: !withRefs, // Dts script info present only if no project reference
                        expectsMap: !withRefs // Map script info present only if no project reference
                    };
                }

                function closedInfosNoMap(withRefs: boolean) {
                    return withRefs ?
                        closedInfos(withRefs) :
                        () => [libFile.path, dtsPath]; // No map
                }

                function otherWatchedFilesNoMap(withRefs: boolean) {
                    return withRefs ?
                        otherWatchedFiles(withRefs) :
                        () => [mainConfig.path, dependencyConfig.path, dtsMapLocation]; // Watch map file
                }

                function goToDefNoMapActionInfo(withRefs: boolean): ActionInfo<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                    return {
                        ...goToDefActionInfo(withRefs),
                        action: withRefs ?
                            goToDefFromMainTs :
                            goToDefFromMainTsWithNoMap,
                        closedInfos: closedInfosNoMap(withRefs),
                        otherWatchedFiles: otherWatchedFilesNoMap(withRefs),
                        expectsMap: false
                    };
                }

                function renameNoMapActionInfo(withRefs: boolean): ActionInfo<protocol.RenameRequest, protocol.RenameResponseBody> {
                    return {
                        ...renameActionInfo(withRefs),
                        action: withRefs ?
                            renameFromDependencyTsWithBothProjectsOpen :
                            renameFromDependencyTs,
                        closedInfos: closedInfosNoMap(withRefs),
                        otherWatchedFiles: otherWatchedFilesNoMap(withRefs),
                        expectsMap: false
                    };
                }

                function closedInfosNoDts(withRefs: boolean) {
                    return withRefs ?
                        closedInfos(withRefs) :
                        () => [libFile.path]; // No dts or map
                }

                function otherWatchedFilesNoDts(withRefs: boolean) {
                    return withRefs ?
                        otherWatchedFiles(withRefs) :
                        () => [mainConfig.path, dependencyConfig.path, dtsPath]; // Watch dts
                }

                function goToDefNoDtsActionInfo(withRefs: boolean): ActionInfo<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                    return {
                        ...goToDefActionInfo(withRefs),
                        action: withRefs ?
                            goToDefFromMainTs :
                            goToDefFromMainTsWithNoDts,
                        closedInfos: closedInfosNoDts(withRefs),
                        expectsDts: false,
                        expectsMap: false
                    };
                }

                function renameNoDtsActionInfo(withRefs: boolean): ActionInfo<protocol.RenameRequest, protocol.RenameResponseBody> {
                    return {
                        action: withRefs ?
                            renameFromDependencyTsWithBothProjectsOpen :
                            renameFromDependencyTs,
                        closedInfos: closedInfosNoDts(withRefs),
                        otherWatchedFiles: otherWatchedFilesNoDts(withRefs),
                        expectsDts: false,
                        expectsMap: false
                    };
                }

                function closedInfosDtsFileDeleted(withRefs: boolean) {
                    // Map collection after file open
                    return withRefs ?
                        closedInfos(withRefs) :
                        () => [libFile.path, dtsMapLocation];
                }

                verifyScenario({
                    mainScenario: "goto Definition in usage and rename locations from defining project",
                    verifier: withRefs => [
                        {
                            ...goToDefFromMainTsProjectInfoVerifier(withRefs),
                            main: () => goToDefActionInfo(withRefs),
                            noMap: () => goToDefNoMapActionInfo(withRefs),
                            mapFileCreated: "main",
                            mapFileDeleted: "noMap",
                            noDts: () => goToDefNoDtsActionInfo(withRefs),
                            dtsFileCreated: "main",
                            dtsFileDeleted: () => ({
                                ...goToDefNoDtsActionInfo(withRefs),
                                // Map collection after file open
                                closedInfos: closedInfosDtsFileDeleted(withRefs),
                                expectsMap: !withRefs
                            }),
                            dependencyChange: () => ({
                                ...goToDefActionInfo(withRefs),
                                action: goToDefFromMainTsWithDependencyChange,
                                expectsDts: false,
                                expectsMap: false
                            }),
                            noBuild: "main"
                        },
                        {
                            ...renameFromDependencyTsProjectInfoVerifier(),
                            main: () => renameActionInfo(withRefs),
                            noMap: () => renameNoMapActionInfo(withRefs),
                            mapFileCreated: "main",
                            mapFileDeleted: "noMap",
                            noDts: () => renameNoDtsActionInfo(withRefs),
                            dtsFileCreated: "main",
                            dtsFileDeleted: () => ({
                                ...renameNoDtsActionInfo(withRefs),
                                // Map collection after file open
                                closedInfos: closedInfosDtsFileDeleted(withRefs),
                                expectsMap: !withRefs
                            }),
                            dependencyChange: () => ({
                                ...renameActionInfo(withRefs),
                                action: renameFromDependencyTsWithBothProjectsOpenWithDependencyChange
                            }),
                            noBuild: () => ({
                                ...renameActionInfo(withRefs),
                                expectDts: false
                            })
                        }
                    ]
                });
            });
        });

        it("reusing d.ts files from composite and non composite projects", () => {
            const projectLocation = "/user/username/projects/myproject";
            const configA: File = {
                path: `${projectLocation}/compositea/tsconfig.json`,
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
                path: `${projectLocation}/compositea/a.ts`,
                content: `import { b } from "@ref/compositeb/b";`
            };
            const a2Ts: File = {
                path: `${projectLocation}/compositea/a2.ts`,
                content: `export const x = 10;`
            };
            const configB: File = {
                path: `${projectLocation}/compositeb/tsconfig.json`,
                content: configA.content
            };
            const bTs: File = {
                path: `${projectLocation}/compositeb/b.ts`,
                content: "export function b() {}"
            };
            const bDts: File = {
                path: `${projectLocation}/dist/compositeb/b.d.ts`,
                content: "export declare function b(): void;"
            };
            const configC: File = {
                path: `${projectLocation}/compositec/tsconfig.json`,
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
                path: `${projectLocation}/compositec/c.ts`,
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
    });
}
