namespace ts.projectSystem {
    describe("unittests:: tsserver:: with project references and tsbuild", () => {
        function createHost(files: ReadonlyArray<File>, rootNames: ReadonlyArray<string>) {
            const host = createServerHost(files);

            // ts build should succeed
            const solutionBuilder = tscWatch.createSolutionBuilder(host, rootNames, {});
            solutionBuilder.buildAllProjects();
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
                const locationOfMyConst = protocolLocationFromSubstring(containerCompositeExec[1].content, "myConst");
                const response = session.executeCommandSeq<protocol.RenameRequest>({
                    command: protocol.CommandTypes.Rename,
                    arguments: {
                        file: containerCompositeExec[1].path,
                        ...locationOfMyConst
                    }
                }).response as protocol.RenameResponseBody;


                const myConstLen = "myConst".length;
                const locationOfMyConstInLib = protocolLocationFromSubstring(containerLib[1].content, "myConst");
                assert.deepEqual(response.locs, [
                    { file: containerCompositeExec[1].path, locs: [{ start: locationOfMyConst, end: { line: locationOfMyConst.line, offset: locationOfMyConst.offset + myConstLen } }] },
                    { file: containerLib[1].path, locs: [{ start: locationOfMyConstInLib, end: { line: locationOfMyConstInLib.line, offset: locationOfMyConstInLib.offset + myConstLen } }] }
                ]);
            });
        });

        describe("with main and depedency project", () => {
            const projectLocation = "/user/username/projects/myproject";
            const dependecyLocation = `${projectLocation}/dependency`;
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
                content: JSON.stringify({ compilerOptions: { composite: true, declarationMap: true } })
            };

            const mainTs: File = {
                path: `${mainLocation}/main.ts`,
                content: `import {
    fn1,
    fn2,
    fn3,
    fn4,
    fn5
} from '../dependency/fns'

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
            const dtsLocation = `${dependecyLocation}/FnS.d.ts`;
            const dtsPath = dtsLocation.toLowerCase() as Path;
            const dtsMapLocation = `${dtsLocation}.map`;
            const dtsMapPath = dtsMapLocation.toLowerCase() as Path;

            const files = [dependencyTs, dependencyConfig, mainTs, mainConfig, libFile, randomFile, randomConfig];

            function verifyScriptInfos(session: TestSession, host: TestServerHost, openInfos: ReadonlyArray<string>, closedInfos: ReadonlyArray<string>, otherWatchedFiles: ReadonlyArray<string>) {
                checkScriptInfos(session.getProjectService(), openInfos.concat(closedInfos));
                checkWatchedFiles(host, closedInfos.concat(otherWatchedFiles).map(f => f.toLowerCase()));
            }

            function verifyInfosWithRandom(session: TestSession, host: TestServerHost, openInfos: ReadonlyArray<string>, closedInfos: ReadonlyArray<string>, otherWatchedFiles: ReadonlyArray<string>) {
                verifyScriptInfos(session, host, openInfos.concat(randomFile.path), closedInfos, otherWatchedFiles.concat(randomConfig.path));
            }

            function verifyOnlyRandomInfos(session: TestSession, host: TestServerHost) {
                verifyScriptInfos(session, host, [randomFile.path], [libFile.path], [randomConfig.path]);
            }

            // Returns request and expected Response, expected response when no map file
            interface SessionAction<Req = protocol.Request, Response = {}> {
                reqName: string;
                request: Partial<Req>;
                expectedResponse: Response;
                expectedResponseNoMap?: Response;
                expectedResponseNoDts?: Response;
            }
            function gotoDefintinionFromMainTs(fn: number): SessionAction<protocol.DefinitionAndBoundSpanRequest, protocol.DefinitionInfoAndBoundSpan> {
                const textSpan = usageSpan(fn);
                const definition: protocol.FileSpan = { file: dependencyTs.path, ...definitionSpan(fn) };
                const declareSpaceLength = "declare ".length;
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
                    },
                    expectedResponseNoMap: {
                        // To the dts
                        definitions: [{ file: dtsPath, start: { line: fn, offset: definition.start.offset + declareSpaceLength }, end: { line: fn, offset: definition.end.offset + declareSpaceLength } }],
                        textSpan
                    },
                    expectedResponseNoDts: {
                        // To import declaration
                        definitions: [{ file: mainTs.path, ...importSpan(fn) }],
                        textSpan
                    }
                };
            }

            function definitionSpan(fn: number): protocol.TextSpan {
                return { start: { line: fn, offset: 17 }, end: { line: fn, offset: 20 } };
            }
            function importSpan(fn: number): protocol.TextSpan {
                return { start: { line: fn + 1, offset: 5 }, end: { line: fn + 1, offset: 8 } };
            }
            function usageSpan(fn: number): protocol.TextSpan {
                return { start: { line: fn + 8, offset: 1 }, end: { line: fn + 8, offset: 4 } };
            }

            function renameFromDependencyTs(fn: number): SessionAction<protocol.RenameRequest, protocol.RenameResponseBody> {
                const triggerSpan = definitionSpan(fn);
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
                            { file: dependencyTs.path, locs: [triggerSpan] }
                        ]
                    }
                };
            }

            function renameFromDependencyTsWithBothProjectsOpen(fn: number): SessionAction<protocol.RenameRequest, protocol.RenameResponseBody> {
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
                    },
                    // Only dependency result
                    expectedResponseNoMap: expectedResponse,
                    expectedResponseNoDts: expectedResponse
                };
            }

            // Returns request and expected Response
            type SessionActionGetter<Req = protocol.Request, Response = {}> = (fn: number) => SessionAction<Req, Response>;
            // Open File, expectedProjectActualFiles, actionGetter, openFileLastLine
            interface DocumentPositionMapperVerifier {
                openFile: File;
                expectedProjectActualFiles: ReadonlyArray<string>;
                actionGetter: SessionActionGetter;
                openFileLastLine: number;
            }
            function verifyDocumentPositionMapperUpdates(
                mainScenario: string,
                verifier: ReadonlyArray<DocumentPositionMapperVerifier>,
                closedInfos: ReadonlyArray<string>) {

                const openFiles = verifier.map(v => v.openFile);
                const expectedProjectActualFiles = verifier.map(v => v.expectedProjectActualFiles);
                const actionGetters = verifier.map(v => v.actionGetter);
                const openFileLastLines = verifier.map(v => v.openFileLastLine);

                const configFiles = openFiles.map(openFile => `${getDirectoryPath(openFile.path)}/tsconfig.json`);
                const openInfos = openFiles.map(f => f.path);
                // When usage and dependency are used, dependency config is part of closedInfo so ignore
                const otherWatchedFiles = verifier.length > 1 ? [configFiles[0]] : configFiles;
                function openTsFile(onHostCreate?: (host: TestServerHost) => void) {
                    const host = createHost(files, [mainConfig.path]);
                    if (onHostCreate) {
                        onHostCreate(host);
                    }
                    const session = createSession(host);
                    openFilesForSession([...openFiles, randomFile], session);
                    return { host, session };
                }

                function checkProject(session: TestSession, noDts?: true) {
                    const service = session.getProjectService();
                    checkNumberOfProjects(service, { configuredProjects: 1 + verifier.length });
                    configFiles.forEach((configFile, index) => {
                        checkProjectActualFiles(
                            service.configuredProjects.get(configFile)!,
                            noDts ?
                                expectedProjectActualFiles[index].filter(f => f.toLowerCase() !== dtsPath) :
                                expectedProjectActualFiles[index]
                        );
                    });
                }

                function verifyInfos(session: TestSession, host: TestServerHost) {
                    verifyInfosWithRandom(session, host, openInfos, closedInfos, otherWatchedFiles);
                }

                function verifyInfosWhenNoMapFile(session: TestSession, host: TestServerHost, dependencyTsOK?: true) {
                    const dtsMapClosedInfo = firstDefined(closedInfos, f => f.toLowerCase() === dtsMapPath ? f : undefined);
                    verifyInfosWithRandom(
                        session,
                        host,
                        openInfos,
                        closedInfos.filter(f => f !== dtsMapClosedInfo && (dependencyTsOK || f !== dependencyTs.path)),
                        dtsMapClosedInfo ? otherWatchedFiles.concat(dtsMapClosedInfo) : otherWatchedFiles
                    );
                }

                function verifyInfosWhenNoDtsFile(session: TestSession, host: TestServerHost, dependencyTsAndMapOk?: true) {
                    const dtsMapClosedInfo = firstDefined(closedInfos, f => f.toLowerCase() === dtsMapPath ? f : undefined);
                    const dtsClosedInfo = firstDefined(closedInfos, f => f.toLowerCase() === dtsPath ? f : undefined);
                    verifyInfosWithRandom(
                        session,
                        host,
                        openInfos,
                        closedInfos.filter(f => (dependencyTsAndMapOk || f !== dtsMapClosedInfo) && f !== dtsClosedInfo && (dependencyTsAndMapOk || f !== dependencyTs.path)),
                        // When project actual file contains dts, it needs to be watched
                        dtsClosedInfo && expectedProjectActualFiles.some(expectedProjectActualFiles => expectedProjectActualFiles.some(f => f.toLowerCase() === dtsPath)) ?
                            otherWatchedFiles.concat(dtsClosedInfo) :
                            otherWatchedFiles
                    );
                }

                function verifyDocumentPositionMapper(session: TestSession, dependencyMap: server.ScriptInfo, documentPositionMapper: server.ScriptInfo["documentPositionMapper"], notEqual?: true) {
                    assert.strictEqual(session.getProjectService().filenameToScriptInfo.get(dtsMapPath), dependencyMap);
                    if (notEqual) {
                        assert.notStrictEqual(dependencyMap.documentPositionMapper, documentPositionMapper);
                    }
                    else {
                        assert.strictEqual(dependencyMap.documentPositionMapper, documentPositionMapper);
                    }
                }

                function action(actionGetter: SessionActionGetter, fn: number, session: TestSession) {
                    const { reqName, request, expectedResponse, expectedResponseNoMap, expectedResponseNoDts } = actionGetter(fn);
                    const { response } = session.executeCommandSeq(request);
                    return { reqName, response, expectedResponse, expectedResponseNoMap, expectedResponseNoDts };
                }

                function firstAction(session: TestSession) {
                    actionGetters.forEach(actionGetter => action(actionGetter, 1, session));
                }

                function verifyAllFnActionWorker(session: TestSession, verifyAction: (result: ReturnType<typeof action>, dtsInfo: server.ScriptInfo | undefined, isFirst: boolean) => void, dtsAbsent?: true) {
                    // action
                    let isFirst = true;
                    for (const actionGetter of actionGetters) {
                        for (let fn = 1; fn <= 5; fn++) {
                            const result = action(actionGetter, fn, session);
                            const dtsInfo = session.getProjectService().filenameToScriptInfo.get(dtsPath);
                            if (dtsAbsent) {
                                assert.isUndefined(dtsInfo);
                            }
                            else {
                                assert.isDefined(dtsInfo);
                            }
                            verifyAction(result, dtsInfo, isFirst);
                            isFirst = false;
                        }
                    }
                }

                function verifyAllFnAction(
                    session: TestSession,
                    host: TestServerHost,
                    firstDocumentPositionMapperNotEquals?: true,
                    dependencyMap?: server.ScriptInfo,
                    documentPositionMapper?: server.ScriptInfo["documentPositionMapper"]
                ) {
                    // action
                    verifyAllFnActionWorker(session, ({ reqName, response, expectedResponse }, dtsInfo, isFirst) => {
                        assert.deepEqual(response, expectedResponse, `Failed on ${reqName}`);
                        verifyInfos(session, host);
                        assert.equal(dtsInfo!.sourceMapFilePath, dtsMapPath);
                        if (isFirst) {
                            if (dependencyMap) {
                                verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper, firstDocumentPositionMapperNotEquals);
                                documentPositionMapper = dependencyMap.documentPositionMapper;
                            }
                            else {
                                dependencyMap = session.getProjectService().filenameToScriptInfo.get(dtsMapPath)!;
                                documentPositionMapper = dependencyMap.documentPositionMapper;
                            }
                        }
                        else {
                            verifyDocumentPositionMapper(session, dependencyMap!, documentPositionMapper);
                        }
                    });
                    return { dependencyMap: dependencyMap!, documentPositionMapper };
                }

                function verifyAllFnActionWithNoMap(
                    session: TestSession,
                    host: TestServerHost,
                    dependencyTsOK?: true
                ) {
                    let sourceMapFilePath: server.ScriptInfo["sourceMapFilePath"];
                    // action
                    verifyAllFnActionWorker(session, ({ reqName, response, expectedResponse, expectedResponseNoMap }, dtsInfo, isFirst) => {
                        assert.deepEqual(response, expectedResponseNoMap || expectedResponse, `Failed on ${reqName}`);
                        verifyInfosWhenNoMapFile(session, host, dependencyTsOK);
                        assert.isUndefined(session.getProjectService().filenameToScriptInfo.get(dtsMapPath));
                        if (isFirst) {
                            assert.isNotString(dtsInfo!.sourceMapFilePath);
                            assert.isNotFalse(dtsInfo!.sourceMapFilePath);
                            assert.isDefined(dtsInfo!.sourceMapFilePath);
                            sourceMapFilePath = dtsInfo!.sourceMapFilePath;
                        }
                        else {
                            assert.equal(dtsInfo!.sourceMapFilePath, sourceMapFilePath);
                        }
                    });
                    return sourceMapFilePath;
                }

                function verifyAllFnActionWithNoDts(
                    session: TestSession,
                    host: TestServerHost,
                    dependencyTsAndMapOk?: true
                ) {
                    // action
                    verifyAllFnActionWorker(session, ({ reqName, response, expectedResponse, expectedResponseNoDts }) => {
                        assert.deepEqual(response, expectedResponseNoDts || expectedResponse, `Failed on ${reqName}`);
                        verifyInfosWhenNoDtsFile(session, host, dependencyTsAndMapOk);
                    }, /*dtsAbsent*/ true);
                }

                function verifyScenarioWithChangesWorker(
                    change: (host: TestServerHost, session: TestSession) => void,
                    afterActionDocumentPositionMapperNotEquals: true | undefined,
                    timeoutBeforeAction: boolean
                ) {
                    const { host, session } = openTsFile();

                    // Create DocumentPositionMapper
                    firstAction(session);
                    const dependencyMap = session.getProjectService().filenameToScriptInfo.get(dtsMapPath)!;
                    const documentPositionMapper = dependencyMap.documentPositionMapper;

                    // change
                    change(host, session);
                    if (timeoutBeforeAction) {
                        host.runQueuedTimeoutCallbacks();
                        checkProject(session);
                        verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper);
                    }

                    // action
                    verifyAllFnAction(session, host, afterActionDocumentPositionMapperNotEquals, dependencyMap, documentPositionMapper);
                }

                function verifyScenarioWithChanges(
                    scenarioName: string,
                    change: (host: TestServerHost, session: TestSession) => void,
                    afterActionDocumentPositionMapperNotEquals?: true
                ) {
                    describe(scenarioName, () => {
                        it("when timeout occurs before request", () => {
                            verifyScenarioWithChangesWorker(change, afterActionDocumentPositionMapperNotEquals, /*timeoutBeforeAction*/ true);
                        });

                        it("when timeout does not occur before request", () => {
                            verifyScenarioWithChangesWorker(change, afterActionDocumentPositionMapperNotEquals, /*timeoutBeforeAction*/ false);
                        });
                    });
                }

                function verifyMainScenarioAndScriptInfoCollection(session: TestSession, host: TestServerHost) {
                    // Main scenario action
                    const { dependencyMap, documentPositionMapper } = verifyAllFnAction(session, host);
                    checkProject(session);
                    verifyInfos(session, host);

                    // Collecting at this point retains dependency.d.ts and map
                    closeFilesForSession([randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyInfos(session, host);
                    verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper);

                    // Closing open file, removes dependencies too
                    closeFilesForSession([...openFiles, randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyOnlyRandomInfos(session, host);
                }

                function verifyMainScenarioAndScriptInfoCollectionWithNoMap(session: TestSession, host: TestServerHost, dependencyTsOKInScenario?: true) {
                    // Main scenario action
                    verifyAllFnActionWithNoMap(session, host, dependencyTsOKInScenario);

                    // Collecting at this point retains dependency.d.ts and map watcher
                    closeFilesForSession([randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyInfosWhenNoMapFile(session, host);

                    // Closing open file, removes dependencies too
                    closeFilesForSession([...openFiles, randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyOnlyRandomInfos(session, host);
                }

                function verifyMainScenarioAndScriptInfoCollectionWithNoDts(session: TestSession, host: TestServerHost, dependencyTsAndMapOk?: true) {
                    // Main scenario action
                    verifyAllFnActionWithNoDts(session, host, dependencyTsAndMapOk);

                    // Collecting at this point retains dependency.d.ts and map watcher
                    closeFilesForSession([randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyInfosWhenNoDtsFile(session, host);

                    // Closing open file, removes dependencies too
                    closeFilesForSession([...openFiles, randomFile], session);
                    openFilesForSession([randomFile], session);
                    verifyOnlyRandomInfos(session, host);
                }

                function verifyScenarioWhenFileNotPresent(
                    scenarioName: string,
                    fileLocation: string,
                    verifyScenarioAndScriptInfoCollection: (session: TestSession, host: TestServerHost, dependencyTsOk?: true) => void,
                    noDts?: true
                ) {
                    describe(scenarioName, () => {
                        it(mainScenario, () => {
                            const { host, session } = openTsFile(host => host.deleteFile(fileLocation));
                            checkProject(session, noDts);

                            verifyScenarioAndScriptInfoCollection(session, host);
                        });

                        it("when file is created", () => {
                            let fileContents: string | undefined;
                            const { host, session } = openTsFile(host => {
                                fileContents = host.readFile(fileLocation);
                                host.deleteFile(fileLocation);
                            });
                            firstAction(session);

                            host.writeFile(fileLocation, fileContents!);
                            verifyMainScenarioAndScriptInfoCollection(session, host);
                        });

                        it("when file is deleted", () => {
                            const { host, session } = openTsFile();
                            firstAction(session);

                            // The dependency file is deleted when orphan files are collected
                            host.deleteFile(fileLocation);
                            verifyScenarioAndScriptInfoCollection(session, host, /*dependencyTsOk*/ true);
                        });
                    });
                }

                it(mainScenario, () => {
                    const { host, session } = openTsFile();
                    checkProject(session);

                    verifyMainScenarioAndScriptInfoCollection(session, host);
                });

                // Edit
                verifyScenarioWithChanges(
                    "when usage file changes, document position mapper doesnt change",
                    (_host, session) => openFiles.forEach(
                        (openFile, index) => session.executeCommandSeq<protocol.ChangeRequest>({
                            command: protocol.CommandTypes.Change,
                            arguments: { file: openFile.path, line: openFileLastLines[index], offset: 1, endLine: openFileLastLines[index], endOffset: 1, insertString: "const x = 10;" }
                        })
                    )
                );

                // Edit dts to add new fn
                verifyScenarioWithChanges(
                    "when dependency .d.ts changes, document position mapper doesnt change",
                    host => host.writeFile(
                        dtsLocation,
                        host.readFile(dtsLocation)!.replace(
                            "//# sourceMappingURL=FnS.d.ts.map",
                            `export declare function fn6(): void;
//# sourceMappingURL=FnS.d.ts.map`
                        )
                    )
                );

                // Edit map file to represent added new line
                verifyScenarioWithChanges(
                    "when dependency file's map changes",
                    host => host.writeFile(
                        dtsMapLocation,
                        `{"version":3,"file":"FnS.d.ts","sourceRoot":"","sources":["FnS.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,eAAO,MAAM,CAAC,KAAK,CAAC"}`
                    ),
                    /*afterActionDocumentPositionMapperNotEquals*/ true
                );

                verifyScenarioWhenFileNotPresent(
                    "when map file is not present",
                    dtsMapLocation,
                    verifyMainScenarioAndScriptInfoCollectionWithNoMap
                );

                verifyScenarioWhenFileNotPresent(
                    "when .d.ts file is not present",
                    dtsLocation,
                    verifyMainScenarioAndScriptInfoCollectionWithNoDts,
                    /*noDts*/ true
                );
            }

            const usageVerifier: DocumentPositionMapperVerifier = {
                openFile: mainTs,
                expectedProjectActualFiles: [mainTs.path, libFile.path, mainConfig.path, dtsPath],
                actionGetter: gotoDefintinionFromMainTs,
                openFileLastLine: 14
            };
            describe("from project that uses dependency", () => {
                const closedInfos = [dependencyTs.path, dependencyConfig.path, libFile.path, dtsPath, dtsMapLocation];
                verifyDocumentPositionMapperUpdates(
                    "can go to definition correctly",
                    [usageVerifier],
                    closedInfos
                );
            });

            const definingVerifier: DocumentPositionMapperVerifier = {
                openFile: dependencyTs,
                expectedProjectActualFiles: [dependencyTs.path, libFile.path, dependencyConfig.path],
                actionGetter: renameFromDependencyTs,
                openFileLastLine: 6
            };
            describe("from defining project", () => {
                const closedInfos = [libFile.path, dtsLocation, dtsMapLocation];
                verifyDocumentPositionMapperUpdates(
                    "rename locations from dependency",
                    [definingVerifier],
                    closedInfos
                );
            });

            describe("when opening depedency and usage project", () => {
                const closedInfos = [libFile.path, dtsPath, dtsMapLocation, dependencyConfig.path];
                verifyDocumentPositionMapperUpdates(
                    "goto Definition in usage and rename locations from defining project",
                    [usageVerifier, { ...definingVerifier, actionGetter: renameFromDependencyTsWithBothProjectsOpen }],
                    closedInfos
                );
            });
        });
    });
}
