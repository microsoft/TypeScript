namespace ts.projectSystem {
    describe("unittests:: tsserver:: with project references and tsbuild source map", () => {
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

        function changeDtsFile(host: TestServerHost) {
            host.writeFile(
                dtsLocation,
                host.readFile(dtsLocation)!.replace(
                    "//# sourceMappingURL=FnS.d.ts.map",
                    `export declare function fn6(): void;
//# sourceMappingURL=FnS.d.ts.map`
                )
            );
        }

        function changeDtsMapFile(host: TestServerHost) {
            host.writeFile(
                dtsMapLocation,
                `{"version":3,"file":"FnS.d.ts","sourceRoot":"","sources":["../dependency/FnS.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,eAAO,MAAM,CAAC,KAAK,CAAC"}`
            );
        }

        function verifyScriptInfos(session: TestSession, host: TestServerHost, openInfos: readonly string[], closedInfos: readonly string[], otherWatchedFiles: readonly string[], additionalInfo?: string) {
            checkScriptInfos(session.getProjectService(), openInfos.concat(closedInfos), additionalInfo);
            checkWatchedFiles(host, closedInfos.concat(otherWatchedFiles).map(f => f.toLowerCase()), additionalInfo);
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

        interface Action<Req = protocol.Request, Response = unknown> {
            reqName: string;
            request: Partial<Req>;
            expectedResponse: Response;
        }

        function verifyAction(session: TestSession, { reqName, request, expectedResponse }: Action) {
            const { response } = session.executeCommandSeq(request);
            assert.deepEqual(response, expectedResponse, `Failed Request: ${reqName}`);
        }

        function verifyDocumentPositionMapper(
            session: TestSession,
            dependencyMap: server.ScriptInfo | undefined,
            documentPositionMapper: server.ScriptInfo["documentPositionMapper"],
            equal: boolean,
            debugInfo?: string,
        ) {
            assert.strictEqual(session.getProjectService().filenameToScriptInfo.get(dtsMapPath), dependencyMap, `${debugInfo} dependencyMap`);
            if (dependencyMap) {
                verifyEquality(dependencyMap.documentPositionMapper, documentPositionMapper, equal, `${debugInfo} DocumentPositionMapper`);
            }
        }

        function verifyDocumentPositionMapperEqual(
            session: TestSession,
            dependencyMap: server.ScriptInfo | undefined,
            documentPositionMapper: server.ScriptInfo["documentPositionMapper"],
            debugInfo?: string,
        ) {
            verifyDocumentPositionMapper(session, dependencyMap, documentPositionMapper, /*equal*/ true, debugInfo);
        }

        function verifyEquality<T>(actual: T, expected: T, equal: boolean, debugInfo?: string) {
            if (equal) {
                assert.strictEqual(actual, expected, debugInfo);
            }
            else {
                assert.notStrictEqual(actual, expected, debugInfo);
            }
        }

        function verifyAllFnAction<Req = protocol.Request, Response = {}>(
            session: TestSession,
            host: TestServerHost,
            action: (fn: number) => Action<Req, Response>,
            expectedInfos: readonly string[],
            expectedWatchedFiles: readonly string[],
            existingDependencyMap: server.ScriptInfo | undefined,
            existingDocumentPositionMapper: server.ScriptInfo["documentPositionMapper"],
            existingMapEqual: boolean,
            existingDocumentPositionMapperEqual: boolean,
            skipMapPathInDtsInfo?: boolean
        ) {
            let sourceMapPath: server.ScriptInfo["sourceMapFilePath"] | undefined;
            let dependencyMap: server.ScriptInfo | undefined;
            let documentPositionMapper: server.ScriptInfo["documentPositionMapper"];
            for (let fn = 1; fn <= 5; fn++) {
                const fnAction = action(fn);
                verifyAction(session, fnAction);
                const debugInfo = `${fnAction.reqName}:: ${fn}`;
                checkScriptInfos(session.getProjectService(), expectedInfos, debugInfo);
                checkWatchedFiles(host, expectedWatchedFiles, debugInfo);
                const dtsInfo = session.getProjectService().getScriptInfoForPath(dtsPath);
                const dtsMapInfo = session.getProjectService().getScriptInfoForPath(dtsMapPath);

                if (fn === 1) {
                    if (dtsInfo) {
                        if (!skipMapPathInDtsInfo) {
                            if (dtsMapInfo) {
                                assert.equal(dtsInfo.sourceMapFilePath, dtsMapPath, `${debugInfo} sourceMapFilePath`);
                            }
                            else {
                                assert.isNotString(dtsInfo.sourceMapFilePath, `${debugInfo} sourceMapFilePath`);
                                assert.isNotFalse(dtsInfo.sourceMapFilePath, `${debugInfo} sourceMapFilePath`);
                                assert.isDefined(dtsInfo.sourceMapFilePath, `${debugInfo} sourceMapFilePath`);
                            }
                        }
                    }
                    verifyEquality(dtsMapInfo, existingDependencyMap, existingMapEqual, `${debugInfo} dependencyMap`);
                    verifyEquality(existingDocumentPositionMapper, dtsMapInfo?.documentPositionMapper, existingDocumentPositionMapperEqual, `${debugInfo} DocumentPositionMapper`);
                    sourceMapPath = dtsInfo?.sourceMapFilePath;
                    dependencyMap = dtsMapInfo;
                    documentPositionMapper = dependencyMap?.documentPositionMapper;
                }
                else {
                    assert.equal(dtsInfo?.sourceMapFilePath, sourceMapPath, `${debugInfo} sourceMapFilePath`);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper, debugInfo);
                }
            }
        }

        function verifyScriptInfoCollectionWith(
            session: TestSession,
            host: TestServerHost,
            openFiles: readonly File[],
            expectedInfos: readonly string[],
            expectedWatchedFiles: readonly string[],
        ) {
            const { dependencyMap, documentPositionMapper } = getDocumentPositionMapper(session);

            // Collecting at this point retains dependency.d.ts and map
            closeFilesForSession([randomFile], session);
            openFilesForSession([randomFile], session);

            checkScriptInfos(session.getProjectService(), expectedInfos);
            checkWatchedFiles(host, expectedWatchedFiles);
            // If map is not collected, document position mapper shouldnt change
            if (session.getProjectService().filenameToScriptInfo.has(dtsMapPath)) {
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);
            }

            // Closing open file, removes dependencies too
            closeFilesForSession([...openFiles, randomFile], session);
            openFilesForSession([randomFile], session);
            verifyOnlyRandomInfos(session, host);
        }

        type OnHostCreate = (host: TestServerHost) => void;
        type CreateSessionFn = (onHostCreate?: OnHostCreate) => { host: TestServerHost; session: TestSession; };
        function setupWith(createSession: CreateSessionFn, openFiles: readonly File[], onHostCreate: OnHostCreate | undefined) {
            const result = createSession(onHostCreate);
            openFilesForSession(openFiles, result.session);
            return result;
        }

        function setupWithMainTs(createSession: CreateSessionFn, onHostCreate: OnHostCreate | undefined) {
            return setupWith(createSession, [mainTs, randomFile], onHostCreate);
        }

        function setupWithDependencyTs(createSession: CreateSessionFn, onHostCreate: OnHostCreate | undefined) {
            return setupWith(createSession, [dependencyTs, randomFile], onHostCreate);
        }

        function setupWithMainTsAndDependencyTs(createSession: CreateSessionFn, onHostCreate: OnHostCreate | undefined) {
            return setupWith(createSession, [mainTs, dependencyTs, randomFile], onHostCreate);
        }

        function createSessionWithoutProjectReferences(onHostCreate?: OnHostCreate) {
            const host = createHostWithSolutionBuild(files, [mainConfig.path]);
            // Erase project reference
            host.writeFile(mainConfig.path, JSON.stringify({
                compilerOptions: { composite: true, declarationMap: true }
            }));
            onHostCreate?.(host);
            const session = createSession(host);
            return { host, session };
        }

        function createSessionWithProjectReferences(onHostCreate?: OnHostCreate) {
            const host = createHostWithSolutionBuild(files, [mainConfig.path]);
            onHostCreate?.(host);
            const session = createSession(host);
            return { host, session };
        }

        function createSessionWithDisabledProjectReferences(onHostCreate?: OnHostCreate) {
            const host = createHostWithSolutionBuild(files, [mainConfig.path]);
            // Erase project reference
            host.writeFile(mainConfig.path, JSON.stringify({
                compilerOptions: {
                    composite: true,
                    declarationMap: true,
                    disableSourceOfProjectReferenceRedirect: true
                },
                references: [{ path: "../dependency" }]
            }));
            onHostCreate?.(host);
            const session = createSession(host);
            return { host, session };
        }

        function getDocumentPositionMapper(session: TestSession) {
            const dependencyMap = session.getProjectService().filenameToScriptInfo.get(dtsMapPath);
            const documentPositionMapper = dependencyMap?.documentPositionMapper;
            return { dependencyMap, documentPositionMapper };
        }

        function checkMainProjectWithoutProjectReferences(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(mainConfig.path)!, [mainTs.path, libFile.path, mainConfig.path, dtsPath]);
        }

        function checkMainProjectWithoutProjectReferencesWithoutDts(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(mainConfig.path)!, [mainTs.path, libFile.path, mainConfig.path]);
        }

        function checkMainProjectWithProjectReferences(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(mainConfig.path)!, [mainTs.path, libFile.path, mainConfig.path, dependencyTs.path]);
        }

        function checkMainProjectWithDisabledProjectReferences(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(mainConfig.path)!, [mainTs.path, libFile.path, mainConfig.path, dtsPath]);
        }

        function checkMainProjectWithDisabledProjectReferencesWithoutDts(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(mainConfig.path)!, [mainTs.path, libFile.path, mainConfig.path]);
        }

        function checkDependencyProjectWith(session: TestSession) {
            checkProjectActualFiles(session.getProjectService().configuredProjects.get(dependencyConfig.path)!, [dependencyTs.path, libFile.path, dependencyConfig.path]);
        }

        function makeChangeToMainTs(session: TestSession) {
            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
                arguments: {
                    file: mainTs.path,
                    line: 14,
                    offset: 1,
                    endLine: 14,
                    endOffset: 1,
                    insertString: "const x = 10;"
                }
            });
        }

        function makeChangeToDependencyTs(session: TestSession) {
            session.executeCommandSeq<protocol.ChangeRequest>({
                command: protocol.CommandTypes.Change,
                arguments: {
                    file: dependencyTs.path,
                    line: 6,
                    offset: 1,
                    endLine: 6,
                    endOffset: 1,
                    insertString: "const x = 10;"
                }
            });
        }

        describe("from project that uses dependency: goToDef", () => {
            function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => ReturnType<CreateSessionFn>, onHostCreate: OnHostCreate | undefined) {
                const result = setup(onHostCreate);
                result.session.executeCommandSeq(goToDefFromMainTs(1).request);
                return { ...result, ...getDocumentPositionMapper(result.session) };
            }

            function verifyScriptInfoCollection(
                session: TestSession,
                host: TestServerHost,
                expectedInfos: readonly string[],
                expectedWatchedFiles: readonly string[],
            ) {
                return verifyScriptInfoCollectionWith(session, host, [mainTs], expectedInfos, expectedWatchedFiles);
            }

            describe("when main tsconfig doesnt have project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithMainTs(createSessionWithoutProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                function checkProjects(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
                    checkMainProjectWithoutProjectReferences(session);
                }

                function checkProjectsWithoutDts(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
                    checkMainProjectWithoutProjectReferencesWithoutDts(session);
                }

                function expectedScriptInfosWhenMapped() {
                    return [mainTs.path, randomFile.path, dependencyTs.path, libFile.path, dtsPath, dtsMapLocation];
                }

                function expectedWatchedFilesWhenMapped() {
                    return [dependencyTsPath, libFile.path, dtsPath, dtsMapPath, mainConfig.path, randomConfig.path];
                }

                function expectedScriptInfosWhenNoMap() {
                    // Because map is deleted, map and dependency are released
                    return removePath(expectedScriptInfosWhenMapped(), dtsMapPath, dependencyTsPath);
                }

                function expectedWatchedFilesWhenNoMap() {
                    // Watches deleted file
                    return removePath(expectedWatchedFilesWhenMapped(), dependencyTsPath);
                }

                function expectedScriptInfosWhenNoDts() {
                    // No dts, no map, no dependency
                    return removePath(expectedScriptInfosWhenMapped(), dtsPath, dtsMapPath, dependencyTsPath);
                }

                function expectedWatchedFilesWhenNoDts() {
                    return removePath(expectedWatchedFilesWhenMapped(), dtsPath, dtsMapPath, dependencyTsPath);
                }

                it("can go to definition correctly", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        // The script info for map is collected only after file open
                        expectedScriptInfosWhenNoMap().concat(dependencyTs.path),
                        expectedWatchedFilesWhenNoMap().concat(dependencyTsPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjectsWithoutDts(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        // The script info for map is collected only after file open
                        expectedScriptInfosWhenNoDts().concat(dependencyTs.path, dtsMapLocation),
                        expectedWatchedFilesWhenNoDts().concat(dependencyTsPath, dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
            });
            describe("when main tsconfig has project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithMainTs(createSessionWithProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                function checkProjects(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
                    checkMainProjectWithProjectReferences(session);
                }

                function expectedScriptInfos() {
                    return [dependencyTs.path, libFile.path, mainTs.path, randomFile.path];
                }

                function expectedWatchedFiles() {
                    return [dependencyTsPath, dependencyConfig.path, libFile.path, mainConfig.path, randomConfig.path];
                }

                it("can go to definition correctly", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });

                it(`when defining project source changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    // Make change, without rebuild of solution
                    host.writeFile(dependencyTs.path, `function fooBar() { }
${dependencyTs.content}`);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithDependencyChange,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when defining project source changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session } = setupWithAction();

                    // change
                    // Make change, without rebuild of solution
                    host.writeFile(dependencyTs.path, `function fooBar() { }
${dependencyTs.content}`);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithDependencyChange,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                it("when projects are not built", () => {
                    const host = createServerHost(files);
                    const session = createSession(host);
                    openFilesForSession([mainTs, randomFile], session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });
            });
            describe("when main tsconfig has disableSourceOfProjectReferenceRedirect along with project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithMainTs(createSessionWithDisabledProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                function checkProjects(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
                    checkMainProjectWithDisabledProjectReferences(session);
                }

                function checkProjectsWithoutDts(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
                    checkMainProjectWithDisabledProjectReferencesWithoutDts(session);
                }

                function expectedScriptInfosWhenMapped() {
                    return [mainTs.path, randomFile.path, dependencyTs.path, libFile.path, dtsPath, dtsMapLocation];
                }

                function expectedWatchedFilesWhenMapped() {
                    return [dependencyTsPath, libFile.path, dtsPath, dtsMapPath, mainConfig.path, randomConfig.path, dependencyConfig.path];
                }

                function expectedScriptInfosWhenNoMap() {
                    // Because map is deleted, map and dependency are released
                    return removePath(expectedScriptInfosWhenMapped(), dtsMapPath, dependencyTsPath);
                }

                function expectedWatchedFilesWhenNoMap() {
                    // Watches deleted file
                    return removePath(expectedWatchedFilesWhenMapped(), dependencyTsPath);
                }

                function expectedScriptInfosWhenNoDts() {
                    // No dts, no map, no dependency
                    return removePath(expectedScriptInfosWhenMapped(), dtsPath, dtsMapPath, dependencyTsPath);
                }

                function expectedWatchedFilesWhenNoDts() {
                    return removePath(expectedWatchedFilesWhenMapped(), dtsPath, dtsMapPath, dependencyTsPath);
                }

                it("can go to definition correctly", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        // The script info for map is collected only after file open
                        expectedScriptInfosWhenNoMap().concat(dependencyTs.path),
                        expectedWatchedFilesWhenNoMap().concat(dependencyTsPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjectsWithoutDts(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        // The script info for map is collected only after file open
                        expectedScriptInfosWhenNoDts().concat(dependencyTs.path, dtsMapLocation),
                        expectedWatchedFilesWhenNoDts().concat(dependencyTsPath, dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
            });
        });

        describe("from defining project: rename", () => {
            function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => ReturnType<CreateSessionFn>, onHostCreate: OnHostCreate | undefined) {
                const result = setup(onHostCreate);
                result.session.executeCommandSeq(renameFromDependencyTs(1).request);
                return { ...result, ...getDocumentPositionMapper(result.session) };
            }

            function verifyScriptInfoCollection(
                session: TestSession,
                host: TestServerHost,
                expectedInfos: readonly string[],
                expectedWatchedFiles: readonly string[],
            ) {
                return verifyScriptInfoCollectionWith(session, host, [dependencyTs], expectedInfos, expectedWatchedFiles);
            }

            function checkProjects(session: TestSession) {
                checkNumberOfProjects(session.getProjectService(), { configuredProjects: 2 });
                checkDependencyProjectWith(session);
            }

            function expectedScriptInfos() {
                return [libFile.path, dtsLocation, dtsMapLocation, dependencyTs.path, randomFile.path];
            }

            function expectedWatchedFiles() {
                return [libFile.path, dtsPath, dtsMapPath, dependencyConfig.path, randomConfig.path];
            }

            function expectedScriptInfosWhenNoMap() {
                // No map
                return removePath(expectedScriptInfos(), dtsMapPath);
            }

            function expectedWatchedFilesWhenNoMap() {
                // Watches deleted file = map file
                return expectedWatchedFiles();
            }

            function expectedScriptInfosWhenNoDts() {
                // no dts or map since dts itself doesnt exist
                return removePath(expectedScriptInfos(), dtsPath, dtsMapPath);
            }

            function expectedWatchedFilesWhenNoDts() {
                // watch deleted file
                return removePath(expectedWatchedFiles(), dtsMapPath);
            }

            describe("when main tsconfig doesnt have project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithDependencyTs(createSessionWithoutProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                it("rename locations from dependency", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToDependencyTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToDependencyTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        // Map is collected after file open
                        expectedScriptInfosWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesWhenNoDts().concat(dtsPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
            });
            describe("when main tsconfig has project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithDependencyTs(createSessionWithProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                it("rename locations from dependency", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToDependencyTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToDependencyTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        // Map is collected after file open
                        expectedScriptInfosWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesWhenNoDts().concat(dtsPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });

                it(`when defining project source changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    // Make change, without rebuild of solution
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path, line: 1, offset: 1, endLine: 1, endOffset: 1, insertString: `function fooBar() { }
`}
                    });
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithDependencyChange,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });
                it(`when defining project source changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session } = setupWithAction();

                    // change
                    // Make change, without rebuild of solution
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path, line: 1, offset: 1, endLine: 1, endOffset: 1, insertString: `function fooBar() { }
`}
                    });

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithDependencyChange,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });

                it("when projects are not built", () => {
                    const host = createServerHost(files);
                    const session = createSession(host);
                    openFilesForSession([dependencyTs, randomFile], session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
            });
            describe("when main tsconfig has disableSourceOfProjectReferenceRedirect along with project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithDependencyTs(createSessionWithDisabledProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                it("rename locations from dependency", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToDependencyTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToDependencyTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfos(),
                        expectedWatchedFiles(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfos(),
                        expectedWatchedFiles()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        // Map is collected after file open
                        expectedScriptInfosWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesWhenNoDts().concat(dtsPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoDts(),
                        expectedWatchedFilesWhenNoDts(),
                    );
                });
            });
        });

        describe("when opening depedency and usage project: goToDef and rename", () => {
            function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => ReturnType<CreateSessionFn>, onHostCreate: OnHostCreate | undefined) {
                const result = setup(onHostCreate);
                result.session.executeCommandSeq(goToDefFromMainTs(1).request);
                result.session.executeCommandSeq(renameFromDependencyTsWithBothProjectsOpen(1).request);
                return { ...result, ...getDocumentPositionMapper(result.session) };
            }

            function verifyScriptInfoCollection(
                session: TestSession,
                host: TestServerHost,
                expectedInfos: readonly string[],
                expectedWatchedFiles: readonly string[],
            ) {
                return verifyScriptInfoCollectionWith(session, host, [mainTs, dependencyTs], expectedInfos, expectedWatchedFiles);
            }

            describe("when main tsconfig doesnt have project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithMainTsAndDependencyTs(createSessionWithoutProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                function checkProjects(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 3 });
                    checkMainProjectWithoutProjectReferences(session);
                    checkDependencyProjectWith(session);
                }

                function checkProjectsWithoutDts(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 3 });
                    checkMainProjectWithoutProjectReferencesWithoutDts(session);
                    checkDependencyProjectWith(session);
                }

                function expectedScriptInfosWhenMapped() {
                    return [mainTs.path, randomFile.path, dependencyTs.path, libFile.path, dtsPath, dtsMapLocation];
                }

                function expectedWatchedFilesWhenMapped() {
                    return [libFile.path, dtsPath, dtsMapPath, mainConfig.path, randomConfig.path, dependencyConfig.path];
                }

                function expectedScriptInfosWhenNoMap() {
                    // Because map is deleted, map and dependency are released
                    return removePath(expectedScriptInfosWhenMapped(), dtsMapPath);
                }

                function expectedWatchedFilesWhenNoMap() {
                    // Watches deleted file
                    return expectedWatchedFilesWhenMapped();
                }

                function expectedScriptInfosAfterGotoDefWhenNoDts() {
                    // No dts, no map
                    return removePath(expectedScriptInfosWhenMapped(), dtsPath, dtsMapPath);
                }

                function expectedWatchedFilesAfterGotoDefWhenNoDts() {
                    return removePath(expectedWatchedFilesWhenMapped(), dtsPath, dtsMapPath);
                }

                function expectedScriptInfosAfterRenameWhenNoDts() {
                    // No dts, no map
                    return removePath(expectedScriptInfosWhenMapped(), dtsPath, dtsMapPath);
                }

                function expectedWatchedFilesAfterRenameWhenNoDts() {
                    // Watches dts file but not map file
                    return removePath(expectedWatchedFilesWhenMapped(), dtsMapPath);
                }

                it("goto Definition in usage and rename locations from defining project", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap, documentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    makeChangeToDependencyTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    makeChangeToDependencyTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        newDependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        newDependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjectsWithoutDts(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        expectedScriptInfosAfterGotoDefWhenNoDts(),
                        expectedWatchedFilesAfterGotoDefWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        newDependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        // The script info for map is collected only after file open
                        expectedScriptInfosAfterGotoDefWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesAfterGotoDefWhenNoDts().concat(dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        // The script info for map is collected only after file open
                        expectedScriptInfosAfterRenameWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesAfterRenameWhenNoDts().concat(dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                    );
                });
            });
            describe("when main tsconfig has project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithMainTsAndDependencyTs(createSessionWithProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                function checkProjects(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 3 });
                    checkMainProjectWithProjectReferences(session);
                    checkDependencyProjectWith(session);
                }

                function expectedScriptInfosAfterGotoDef() {
                    return [dependencyTs.path, libFile.path, mainTs.path, randomFile.path];
                }

                function expectedWatchedFilesAfterGotoDef() {
                    return [dependencyConfig.path, libFile.path, mainConfig.path, randomConfig.path];
                }

                function expectedScriptInfosAfterRenameWhenMapped() {
                    return expectedScriptInfosAfterGotoDef().concat(dtsLocation, dtsMapLocation);
                }

                function expectedWatchedFilesAfterRenameWhenMapped() {
                    return expectedWatchedFilesAfterGotoDef().concat(dtsPath, dtsMapPath);
                }

                function expectedScriptInfosAfterRenameWhenNoMap() {
                    // Map file is not present
                    return removePath(expectedScriptInfosAfterRenameWhenMapped(), dtsMapPath);
                }

                function expectedWatchedFilesAfterRenameWhenNoMap() {
                    // Watches map file
                    return expectedWatchedFilesAfterRenameWhenMapped();
                }

                function expectedScriptInfosAfterRenameWhenNoDts() {
                    // map and dts not present
                    return removePath(expectedScriptInfosAfterRenameWhenMapped(), dtsPath, dtsMapPath);
                }

                function expectedWatchedFilesAfterRenameWhenNoDts() {
                    // Watches dts file but not map
                    return removePath(expectedWatchedFilesAfterRenameWhenMapped(), dtsMapPath);
                }

                it("goto Definition in usage and rename locations from defining project", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterGotoDef(),
                        expectedWatchedFilesAfterGotoDef(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    makeChangeToDependencyTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    makeChangeToDependencyTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterGotoDef(),
                        expectedWatchedFilesAfterGotoDef(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenNoMap(),
                        expectedWatchedFilesAfterRenameWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoMap(),
                        expectedWatchedFilesAfterRenameWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenNoMap(),
                        // Map file is reset so its not watched any more, as this action doesnt need map
                        removePath(expectedWatchedFilesAfterRenameWhenNoMap(), dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true,
                        /*skipMapPathInDtsInfo*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterRenameWhenNoMap(),
                        // Map file is reset so its not watched any more, as this action doesnt need map
                        removePath(expectedWatchedFilesAfterRenameWhenNoMap(), dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false,
                        /*skipMapPathInDtsInfo*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenNoMap(),
                        expectedWatchedFilesAfterRenameWhenNoMap(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoMap(),
                        expectedWatchedFilesAfterRenameWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterGotoDef(),
                        expectedWatchedFilesAfterGotoDef(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterGotoDef(),
                        // Since the project for dependency is not updated, the watcher from rename for dts still there
                        expectedWatchedFilesAfterGotoDef().concat(dtsPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        // Map collection after file open
                        expectedScriptInfosAfterRenameWhenNoDts().concat(dtsMapLocation),
                        // not watching dts since this operation doesnt need it
                        removePath(expectedWatchedFilesAfterRenameWhenNoDts(), dtsPath).concat(dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        // Map collection after file open
                        expectedScriptInfosAfterRenameWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesAfterRenameWhenNoDts().concat(dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                    );
                });

                it(`when defining project source changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    // Make change, without rebuild of solution
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path, line: 1, offset: 1, endLine: 1, endOffset: 1, insertString: `function fooBar() { }
`}
                    });
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithDependencyChange,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpenWithDependencyChange,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when defining project source changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    // Make change, without rebuild of solution
                    session.executeCommandSeq<protocol.ChangeRequest>({
                        command: protocol.CommandTypes.Change,
                        arguments: {
                            file: dependencyTs.path, line: 1, offset: 1, endLine: 1, endOffset: 1, insertString: `function fooBar() { }
`}
                    });

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithDependencyChange,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpenWithDependencyChange,
                        expectedScriptInfosAfterRenameWhenMapped(),
                        expectedWatchedFilesAfterRenameWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                it("when projects are not built", () => {
                    const host = createServerHost(files);
                    const session = createSession(host);
                    openFilesForSession([mainTs, dependencyTs, randomFile], session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosAfterGotoDef(),
                        expectedWatchedFilesAfterGotoDef(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                    );
                });
            });
            describe("when main tsconfig has disableSourceOfProjectReferenceRedirect along with project reference", () => {
                function setup(onHostCreate?: OnHostCreate) {
                    return setupWithMainTsAndDependencyTs(createSessionWithDisabledProjectReferences, onHostCreate);
                }

                function setupWithAction(onHostCreate?: OnHostCreate) {
                    return setupWithActionWith(setup, onHostCreate);
                }

                function checkProjects(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 3 });
                    checkMainProjectWithDisabledProjectReferences(session);
                    checkDependencyProjectWith(session);
                }

                function checkProjectsWithoutDts(session: TestSession) {
                    checkNumberOfProjects(session.getProjectService(), { configuredProjects: 3 });
                    checkMainProjectWithDisabledProjectReferencesWithoutDts(session);
                    checkDependencyProjectWith(session);
                }

                function expectedScriptInfosWhenMapped() {
                    return [mainTs.path, randomFile.path, dependencyTs.path, libFile.path, dtsPath, dtsMapLocation];
                }

                function expectedWatchedFilesWhenMapped() {
                    return [libFile.path, dtsPath, dtsMapPath, mainConfig.path, randomConfig.path, dependencyConfig.path];
                }

                function expectedScriptInfosWhenNoMap() {
                    // Because map is deleted, map and dependency are released
                    return removePath(expectedScriptInfosWhenMapped(), dtsMapPath);
                }

                function expectedWatchedFilesWhenNoMap() {
                    // Watches deleted file
                    return expectedWatchedFilesWhenMapped();
                }

                function expectedScriptInfosAfterGotoDefWhenNoDts() {
                    // No dts, no map
                    return removePath(expectedScriptInfosWhenMapped(), dtsPath, dtsMapPath);
                }

                function expectedWatchedFilesAfterGotoDefWhenNoDts() {
                    return removePath(expectedWatchedFilesWhenMapped(), dtsPath, dtsMapPath);
                }

                function expectedScriptInfosAfterRenameWhenNoDts() {
                    // No dts, no map
                    return removePath(expectedScriptInfosWhenMapped(), dtsPath, dtsMapPath);
                }

                function expectedWatchedFilesAfterRenameWhenNoDts() {
                    // Watches dts file but not map file
                    return removePath(expectedWatchedFilesWhenMapped(), dtsMapPath);
                }

                it("goto Definition in usage and rename locations from defining project", () => {
                    const { host, session } = setup();
                    checkProjects(session);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap, documentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                    );
                });

                // Edit
                it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    makeChangeToDependencyTs(session);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    makeChangeToMainTs(session);
                    makeChangeToDependencyTs(session);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit dts to add new fn
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                // Edit map file to represent added new line
                it(`when dependency file's map changes, when timeout occurs before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);
                    host.runQueuedTimeoutCallbacks();
                    checkProjects(session);
                    verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });
                it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                    // Create DocumentPositionMapper
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // change
                    changeDtsMapFile(host);

                    // action
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                });

                it(`with depedency files map file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsMapLocation));
                    checkProjects(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });
                it(`with depedency files map file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsMapLocation)!;
                        host.deleteFile(dtsMapLocation);
                    });

                    host.writeFile(dtsMapLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        newDependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsMapLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoMap,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                        newDependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);

                    // Script info collection should behave as fileNotPresentKey
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenNoMap(),
                        expectedWatchedFilesWhenNoMap(),
                    );
                });

                it(`with depedency .d.ts file, when file is not present`, () => {
                    const { host, session } = setup(host => host.deleteFile(dtsLocation));
                    checkProjectsWithoutDts(session);

                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        expectedScriptInfosAfterGotoDefWhenNoDts(),
                        expectedWatchedFilesAfterGotoDefWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                        /*existingDependencyMap*/ undefined,
                        /*existingDocumentPositionMapper*/ undefined,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                    );
                });
                it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                    let fileContents: string;
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction(host => {
                        fileContents = host.readFile(dtsLocation)!;
                        host.deleteFile(dtsLocation);
                    });

                    host.writeFile(dtsLocation, fileContents!);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTs,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ false,
                        /*existingDocumentPositionMapperEqual*/ false
                    );
                    const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTsWithBothProjectsOpen,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped(),
                        newDependencyMap,
                        newDocumentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjects(session);
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosWhenMapped(),
                        expectedWatchedFilesWhenMapped()
                    );
                });
                it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                    const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                    // The dependency file is deleted when orphan files are collected
                    host.deleteFile(dtsLocation);
                    verifyAllFnAction(
                        session,
                        host,
                        goToDefFromMainTsWithNoDts,
                        // The script info for map is collected only after file open
                        expectedScriptInfosAfterGotoDefWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesAfterGotoDefWhenNoDts().concat(dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    verifyAllFnAction(
                        session,
                        host,
                        renameFromDependencyTs,
                        // The script info for map is collected only after file open
                        expectedScriptInfosAfterRenameWhenNoDts().concat(dtsMapLocation),
                        expectedWatchedFilesAfterRenameWhenNoDts().concat(dtsMapPath),
                        dependencyMap,
                        documentPositionMapper,
                        /*existingMapEqual*/ true,
                        /*existingDocumentPositionMapperEqual*/ true
                    );
                    checkProjectsWithoutDts(session);

                    // Script info collection should behave as "noDts"
                    verifyScriptInfoCollection(
                        session,
                        host,
                        expectedScriptInfosAfterRenameWhenNoDts(),
                        expectedWatchedFilesAfterRenameWhenNoDts(),
                    );
                });
            });
        });
    });
}
