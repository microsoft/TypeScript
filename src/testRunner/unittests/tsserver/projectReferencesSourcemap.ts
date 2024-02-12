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
    const dtsMapLocation = `${dependecyDeclsLocation}/FnS.d.ts.map`;

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

    function verifyAllFnAction<Req extends ts.server.protocol.Request>(
        session: TestSession,
        action: (fn: number) => TestSessionRequest<Req>,
    ) {
        for (let fn = 1; fn <= 5; fn++) {
            const fnAction = action(fn);
            session.executeCommandSeq(fnAction);
        }
    }

    function verifyScriptInfoCollectionWith(
        session: TestSession,
        openFiles: readonly File[],
    ) {
        // Collecting at this point retains dependency.d.ts and map
        closeFilesForSession([randomFile], session);
        openFilesForSession([randomFile], session);

        // Closing open file, removes dependencies too
        closeFilesForSession([...openFiles, randomFile], session);
        openFilesForSession([randomFile], session);
    }

    type OnHostCreate = (host: TestServerHost) => void;
    type CreateSessionFn = (onHostCreate?: OnHostCreate) => TestSession;
    function setupWith(createSession: CreateSessionFn, openFiles: readonly File[], onHostCreate: OnHostCreate | undefined) {
        const session = createSession(onHostCreate);
        openFilesForSession(openFiles, session);
        return session;
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
        return new TestSession(host);
    }

    function createSessionWithProjectReferences(onHostCreate?: OnHostCreate) {
        const host = createHostWithSolutionBuild(files, [mainConfig.path]);
        onHostCreate?.(host);
        return new TestSession(host);
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
        return new TestSession(host);
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
        function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => TestSession, onHostCreate: OnHostCreate | undefined) {
            const session = setup(onHostCreate);
            session.executeCommandSeq(goToDefFromMainTs(1));
            return session;
        }

        describe("when main tsconfig doesnt have project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTs(createSessionWithoutProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("can go to definition correctly", () => {
                const session = setup();
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/can go to definition correctly", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configHasNoReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
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
                const session = setup();
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/can go to definition correctly", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency dts deleted", session);
            });
            it(`when defining project source changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                // Make change, without rebuild of solution
                session.host.writeFile(
                    dependencyTs.path,
                    `function fooBar() { }
${dependencyTs.content}`,
                );
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency source changes with timeout before request", session);
            });
            it(`when defining project source changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                // Make change, without rebuild of solution
                session.host.writeFile(
                    dependencyTs.path,
                    `function fooBar() { }
${dependencyTs.content}`,
                );

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/configWithReference/dependency source changes", session);
            });

            it("when projects are not built", () => {
                const host = createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession([mainTs, randomFile], session);
                verifyAllFnAction(session, goToDefFromMainTs);
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
                const session = setup();
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/can go to definition correctly", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyScriptInfoCollectionWith(session, [mainTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "usageProject/disabledSourceRef/dependency dts deleted", session);
            });
        });
    });

    describe("from defining project: rename", () => {
        function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => TestSession, onHostCreate: OnHostCreate | undefined) {
            const session = setup(onHostCreate);
            session.executeCommandSeq(renameFromDependencyTs(1));
            return session;
        }

        describe("when main tsconfig doesnt have project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithDependencyTs(createSessionWithoutProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("rename locations from dependency", () => {
                const session = setup();
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToDependencyTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configHasNoReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, renameFromDependencyTs);
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
                const session = setup();
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToDependencyTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency dts deleted", session);
            });
            it(`when defining project source changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

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
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTsWithDependencyChange);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency source changes with timeout before request", session);
            });
            it(`when defining project source changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

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
                verifyAllFnAction(session, renameFromDependencyTsWithDependencyChange);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/configWithReference/dependency source changes", session);
            });

            it("when projects are not built", () => {
                const host = createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession([dependencyTs, randomFile], session);
                verifyAllFnAction(session, renameFromDependencyTs);
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
                const session = setup();
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToDependencyTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependency/disabledSourceRef/dependency dts deleted", session);
            });
        });
    });

    describe("when opening depedency and usage project: goToDef and rename", () => {
        function setupWithActionWith(setup: (onHostCreate?: OnHostCreate) => TestSession, onHostCreate: OnHostCreate | undefined) {
            const session = setup(onHostCreate);
            session.executeCommandSeq(goToDefFromMainTs(1));
            session.executeCommandSeq(renameFromDependencyTs(1));
            return session;
        }

        describe("when main tsconfig doesnt have project reference", () => {
            function setup(onHostCreate?: OnHostCreate) {
                return setupWithMainTsAndDependencyTs(createSessionWithoutProjectReferences, onHostCreate);
            }

            function setupWithAction(onHostCreate?: OnHostCreate) {
                return setupWithActionWith(setup, onHostCreate);
            }

            it("goto Definition in usage and rename locations from defining project", () => {
                const session = setup();
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/goToDef and rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configHasNoReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
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
                const session = setup();
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/gotoDef and rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency dts deleted", session);
            });
            it(`when defining project source changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

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
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTsWithDependencyChange);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency source changes with timeout before request", session);
            });
            it(`when defining project source changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

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
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTsWithDependencyChange);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/configWithReference/dependency source changes", session);
            });

            it("when projects are not built", () => {
                const host = createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession([mainTs, dependencyTs, randomFile], session);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
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
                const session = setup();
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/gotoDef and rename locations", session);
            });

            // Edit
            it(`when usage file changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/usage file changes with timeout before request", session);
            });
            it(`when usage file changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/usage file changes", session);
            });

            // Edit dts to add new fn
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts changes with timeout before request", session);
            });
            it(`when dependency .d.ts changes, document position mapper doesnt change, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts changes", session);
            });

            // Edit map file to represent added new line
            it(`when dependency file's map changes, when timeout occurs before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);
                session.host.runQueuedTimeoutCallbacks();

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap changes with timeout before request", session);
            });
            it(`when dependency file's map changes, when timeout does not occur before request`, () => {
                // Create DocumentPositionMapper
                const session = setupWithAction();

                // change
                changeDtsMapFile(session.host);

                // action
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap changes", session);
            });

            it(`with depedency files map file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsMapLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap not present", session);
            });
            it(`with depedency files map file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsMapLocation)!;
                    host.deleteFile(dtsMapLocation);
                });

                session.host.writeFile(dtsMapLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap created", session);
            });
            it(`with depedency files map file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsMapLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dtsMap deleted", session);
            });

            it(`with depedency .d.ts file, when file is not present`, () => {
                const session = setup(host => host.deleteFile(dtsLocation));

                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts not present", session);
            });
            it(`with depedency .d.ts file, when file is created after actions on projects`, () => {
                let fileContents: string;
                const session = setupWithAction(host => {
                    fileContents = host.readFile(dtsLocation)!;
                    host.deleteFile(dtsLocation);
                });

                session.host.writeFile(dtsLocation, fileContents!);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts created", session);
            });
            it(`with depedency .d.ts file, when file is deleted after actions on the projects`, () => {
                const session = setupWithAction();

                // The dependency file is deleted when orphan files are collected
                session.host.deleteFile(dtsLocation);
                verifyAllFnAction(session, goToDefFromMainTs);
                verifyAllFnAction(session, renameFromDependencyTs);
                verifyScriptInfoCollectionWith(session, [mainTs, dependencyTs]);
                baselineTsserverLogs("projectReferencesSourcemap", "dependencyAndUsage/disabledSourceRef/dependency dts deleted", session);
            });
        });
    });
});
