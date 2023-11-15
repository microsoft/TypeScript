import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createHostWithSolutionBuild,
    openFilesForSession,
    TestSession,
    TestSessionRequest,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: with project references and tsbuild source map", () => {
    const dependecyLocation = `/user/username/projects/myproject/dependency`;
    const dependecyDeclsLocation = `/user/username/projects/myproject/decls`;
    const mainLocation = `/user/username/projects/myproject/main`;
    const dependencyTs: File = {
        path: `${dependecyLocation}/FnS.ts`,
        content: `export function fn1() { }
export function fn2() { }
export function fn3() { }
export function fn4() { }
export function fn5() { }
`,
    };
    const dependencyConfig: File = {
        path: `${dependecyLocation}/tsconfig.json`,
        content: jsonToReadableText({ compilerOptions: { composite: true, declarationMap: true, declarationDir: "../decls" } }),
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
`,
    };
    const mainConfig: File = {
        path: `${mainLocation}/tsconfig.json`,
        content: jsonToReadableText({
            compilerOptions: { composite: true, declarationMap: true },
            references: [{ path: "../dependency" }],
        }),
    };

    const randomFile: File = {
        path: `/user/username/projects/myproject/random/random.ts`,
        content: "let a = 10;",
    };
    const randomConfig: File = {
        path: `/user/username/projects/myproject/random/tsconfig.json`,
        content: "{}",
    };
    const dtsLocation = `${dependecyDeclsLocation}/FnS.d.ts`;
    const dtsPath = dtsLocation.toLowerCase() as ts.Path;
    const dtsMapLocation = `${dependecyDeclsLocation}/FnS.d.ts.map`;
    const dtsMapPath = dtsMapLocation.toLowerCase() as ts.Path;

    const files = [dependencyTs, dependencyConfig, mainTs, mainConfig, libFile, randomFile, randomConfig];

    function changeDtsFile(host: TestServerHost) {
        host.writeFile(
            dtsLocation,
            host.readFile(dtsLocation)!.replace(
                "//# sourceMappingURL=FnS.d.ts.map",
                `export declare function fn6(): void;
//# sourceMappingURL=FnS.d.ts.map`,
            ),
        );
    }

    function changeDtsMapFile(host: TestServerHost) {
        host.writeFile(
            dtsMapLocation,
            jsonToReadableText({
                version: 3,
                file: "FnS.d.ts",
                sourceRoot: "",
                sources: ["../dependency/FnS.ts"],
                names: [],
                mappings: "AAAA,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,wBAAgB,GAAG,SAAM;AACzB,eAAO,MAAM,CAAC,KAAK,CAAC",
            }),
        );
    }

    function goToDefFromMainTs(fn: number): TestSessionRequest<ts.server.protocol.DefinitionAndBoundSpanRequest> {
        return {
            command: ts.server.protocol.CommandTypes.DefinitionAndBoundSpan,
            arguments: { file: mainTs.path, line: fn + 8, offset: 1 },
        };
    }

    function renameFromDependencyTs(fn: number): TestSessionRequest<ts.server.protocol.RenameRequest> {
        return {
            command: ts.server.protocol.CommandTypes.Rename,
            arguments: { file: dependencyTs.path, line: fn, offset: 17 },
        };
    }

    function renameFromDependencyTsWithDependencyChange(fn: number) {
        return renameFromDependencyTs(fn + 1);
    }

    function verifyDocumentPositionMapper(
        session: TestSession,
        dependencyMap: ts.server.ScriptInfo | undefined,
        documentPositionMapper: ts.server.ScriptInfo["documentPositionMapper"],
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
        dependencyMap: ts.server.ScriptInfo | undefined,
        documentPositionMapper: ts.server.ScriptInfo["documentPositionMapper"],
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

    function verifyAllFnAction<Req extends ts.server.protocol.Request>(
        session: TestSession,
        action: (fn: number) => TestSessionRequest<Req>,
        existingDependencyMap: ts.server.ScriptInfo | undefined,
        existingDocumentPositionMapper: ts.server.ScriptInfo["documentPositionMapper"],
        existingMapEqual: boolean,
        existingDocumentPositionMapperEqual: boolean,
        skipMapPathInDtsInfo?: boolean,
    ) {
        let sourceMapPath: ts.server.ScriptInfo["sourceMapFilePath"] | undefined;
        let dependencyMap: ts.server.ScriptInfo | undefined;
        let documentPositionMapper: ts.server.ScriptInfo["documentPositionMapper"];
        for (let fn = 1; fn <= 5; fn++) {
            const fnAction = action(fn);
            session.executeCommandSeq(fnAction);
            const debugInfo = `${jsonToReadableText(fnAction)}:: ${fn}`;
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
        openFiles: readonly File[],
    ) {
        const { dependencyMap, documentPositionMapper } = getDocumentPositionMapper(session);

        // Collecting at this point retains dependency.d.ts and map
        closeFilesForSession([randomFile], session);
        openFilesForSession([randomFile], session);

        // If map is not collected, document position mapper shouldnt change
        if (session.getProjectService().filenameToScriptInfo.has(dtsMapPath)) {
            verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);
        }

        // Closing open file, removes dependencies too
        closeFilesForSession([...openFiles, randomFile], session);
        openFilesForSession([randomFile], session);
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
        host.writeFile(
            mainConfig.path,
            jsonToReadableText({
                compilerOptions: { composite: true, declarationMap: true },
            }),
        );
        onHostCreate?.(host);
        const session = new TestSession(host);
        return { host, session };
    }

    function createSessionWithProjectReferences(onHostCreate?: OnHostCreate) {
        const host = createHostWithSolutionBuild(files, [mainConfig.path]);
        onHostCreate?.(host);
        const session = new TestSession(host);
        return { host, session };
    }

    function createSessionWithDisabledProjectReferences(onHostCreate?: OnHostCreate) {
        const host = createHostWithSolutionBuild(files, [mainConfig.path]);
        // Erase project reference
        host.writeFile(
            mainConfig.path,
            jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    declarationMap: true,
                    disableSourceOfProjectReferenceRedirect: true,
                },
                references: [{ path: "../dependency" }],
            }),
        );
        onHostCreate?.(host);
        const session = new TestSession(host);
        return { host, session };
    }

    function getDocumentPositionMapper(session: TestSession) {
        const dependencyMap = session.getProjectService().filenameToScriptInfo.get(dtsMapPath);
        const documentPositionMapper = dependencyMap?.documentPositionMapper;
        return { dependencyMap, documentPositionMapper };
    }

    function makeChangeToMainTs(session: TestSession) {
        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: mainTs.path,
                line: 14,
                offset: 1,
                endLine: 14,
                endOffset: 1,
                insertString: "const x = 10;",
            },
        });
    }

    function makeChangeToDependencyTs(session: TestSession) {
        session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: dependencyTs.path,
                line: 6,
                offset: 1,
                endLine: 6,
                endOffset: 1,
                insertString: "const x = 10;",
            },
        });
    }

    describe("from project that uses dependency: goToDef", () => {
        function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => ReturnType<CreateSessionFn>, onHostCreate: OnHostCreate | undefined) {
            const result = setup(onHostCreate);
            result.session.executeCommandSeq(goToDefFromMainTs(1));
            return { ...result, ...getDocumentPositionMapper(result.session) };
        }

        describe("when main tsconfig doesnt have project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTs(createSessionWithoutProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("can go to definition correctly", () => {
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/can go to definition correctly", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts deleted", session);
            });
        });
        describe("when main tsconfig has project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTs(createSessionWithProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("can go to definition correctly", () => {
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/can go to definition correctly", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts deleted", session);
            });
            it(`when defining project source changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                // Make change, without rebuild of solution
                host.writeFile(
                    dependencyTs.path,
                    `function fooBar() { }
${dependencyTs.content}`,
                );
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency source changes with timeout before request", session);
            });
            it(`when defining project source changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session } = setupWithAction();

                // change
                // Make change, without rebuild of solution
                host.writeFile(
                    dependencyTs.path,
                    `function fooBar() { }
${dependencyTs.content}`,
                );

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency source changes", session);
            });

            it("when projects are not built", () => {
                const host = createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession([mainTs, randomFile], session);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/when projects are not built", session);
            });
        });
        describe("when main tsconfig has disableSourceOfProjectReferenceRedirect along with project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTs(createSessionWithDisabledProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("can go to definition correctly", () => {
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/can go to definition correctly", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts deleted", session);
            });
        });
    });

    describe("from defining project: rename", () => {
        function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => ReturnType<CreateSessionFn>, onHostCreate: OnHostCreate | undefined) {
            const result = setup(onHostCreate);
            result.session.executeCommandSeq(renameFromDependencyTs(1));
            return { ...result, ...getDocumentPositionMapper(result.session) };
        }

        describe("when main tsconfig doesnt have project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithDependencyTs(createSessionWithoutProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("rename locations from dependency", () => {
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToDependencyTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap not present", session);
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
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts not present", session);
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
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts deleted", session);
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
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToDependencyTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap not present", session);
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
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts not present", session);
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
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts deleted", session);
            });
            it(`when defining project source changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                // Make change, without rebuild of solution
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: dependencyTs.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `function fooBar() { }
`,
                    },
                });
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTsWithDependencyChange,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency source changes with timeout before request", session);
            });
            it(`when defining project source changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session } = setupWithAction();

                // change
                // Make change, without rebuild of solution
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: dependencyTs.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `function fooBar() { }
`,
                    },
                });

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTsWithDependencyChange,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency source changes", session);
            });

            it("when projects are not built", () => {
                const host = createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession([dependencyTs, randomFile], session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/when projects are not built", session);
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
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToDependencyTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap not present", session);
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
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts not present", session);
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
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts deleted", session);
            });
        });
    });

    describe("when opening depedency and usage project: goToDef and rename", () => {
        function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => ReturnType<CreateSessionFn>, onHostCreate: OnHostCreate | undefined) {
            const result = setup(onHostCreate);
            result.session.executeCommandSeq(goToDefFromMainTs(1));
            result.session.executeCommandSeq(renameFromDependencyTs(1));
            return { ...result, ...getDocumentPositionMapper(result.session) };
        }

        describe("when main tsconfig doesnt have project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTsAndDependencyTs(createSessionWithoutProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("goto Definition in usage and rename locations from defining project", () => {
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap, documentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/goToDef and rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    newDependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    newDependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    newDependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts deleted", session);
            });
        });
        describe("when main tsconfig has project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTsAndDependencyTs(createSessionWithProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("goto Definition in usage and rename locations from defining project", () => {
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/gotoDef and rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                    /*skipMapPathInDtsInfo*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                    /*skipMapPathInDtsInfo*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts deleted", session);
            });
            it(`when defining project source changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                // Make change, without rebuild of solution
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: dependencyTs.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `function fooBar() { }
`,
                    },
                });
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTsWithDependencyChange,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency source changes with timeout before request", session);
            });
            it(`when defining project source changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                // Make change, without rebuild of solution
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: dependencyTs.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: `function fooBar() { }
 `,
                    },
                });

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTsWithDependencyChange,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency source changes", session);
            });

            it("when projects are not built", () => {
                const host = createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession([mainTs, dependencyTs, randomFile], session);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/when projects are not built", session);
            });
        });
        describe("when main tsconfig has disableSourceOfProjectReferenceRedirect along with project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTsAndDependencyTs(createSessionWithDisabledProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("goto Definition in usage and rename locations from defining project", () => {
                const { session } = setup();
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap, documentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/gotoDef and rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);
                host.runQueuedTimeoutCallbacks();
                verifyDocumentPositionMapperEqual(session, dependencyMap, documentPositionMapper);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // change
                changeDtsMapFile(host);

                // action
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    newDependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsMapLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    newDependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const { session } = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    /*existingDependencyMap*/ undefined,
                    /*existingDocumentPositionMapper*/ undefined,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts not present", session);
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
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ false,
                    /*existingDocumentPositionMapperEqual*/ false,
                );
                const { dependencyMap: newDependencyMap, documentPositionMapper: newDocumentPositionMapper } = getDocumentPositionMapper(session);
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    newDependencyMap,
                    newDocumentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const { host, session, dependencyMap, documentPositionMapper } = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                host.deleteFile(dtsLocation);
                verifyAllFnAction(
                    session,
                    goToDefFromMainTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyAllFnAction(
                    session,
                    renameFromDependencyTs,
                    dependencyMap,
                    documentPositionMapper,
                    /*existingMapEqual*/ true,
                    /*existingDocumentPositionMapperEqual*/ true,
                );
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts deleted", session);
            });
        });
    });
});
