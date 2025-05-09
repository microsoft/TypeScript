import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createHostWithSolutionBuild,
    openFilesForSession,
    TestSession,
    TestSessionRequest,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: projectReferencesSourcemap:: with project references and tsbuild source map", () => {
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

    const files = [dependencyTs, dependencyConfig, mainTs, mainConfig, randomFile, randomConfig];

    function changeDtsFile(session: TestSession, content?: string) {
        session.host.writeFile(
            dtsLocation,
            (content ?? session.host.readFile(dtsLocation)!).replace(
                "//# sourceMappingURL=FnS.d.ts.map",
                `export declare function fn6(): void;
//# sourceMappingURL=FnS.d.ts.map`,
            ),
        );
    }

    function changeDtsMapFile(session: TestSession) {
        session.host.writeFile(
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

    function runActions(
        session: TestSession,
        action: Action | Action[],
        max = 5,
    ) {
        if (!ts.isArray(action)) {
            for (let fn = 1; fn <= max; fn++) {
                const fnAction = action(fn);
                session.executeCommandSeq(fnAction);
            }
        }
        else {
            action.forEach(action => runActions(session, action, max));
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
        closeFilesForSession(openFiles, session);
        openFilesForSession([randomFile], session);
    }

    type OnHostCreate = (host: TestServerHost) => void;
    function createSessionWithoutProjectReferences(onHostCreate?: OnHostCreate) {
        const host = createHostWithSolutionBuild(files, [mainConfig.path]);
        // Erase project reference
        writeConfigWithoutProjectReferences(host);
        onHostCreate?.(host);
        return new TestSession(host);
    }

    function writeConfigWithoutProjectReferences(host: TestServerHost) {
        host.writeFile(
            mainConfig.path,
            jsonToReadableText({
                compilerOptions: { composite: true, declarationMap: true },
            }),
        );
    }

    function createSessionWithProjectReferences(onHostCreate?: OnHostCreate) {
        const host = createHostWithSolutionBuild(files, [mainConfig.path]);
        onHostCreate?.(host);
        return new TestSession(host);
    }

    function createSessionWithDisabledProjectReferences(onHostCreate?: OnHostCreate) {
        const host = createHostWithSolutionBuild(files, [mainConfig.path]);
        // Erase project reference
        WithDisabledProjectReferences(host);
        onHostCreate?.(host);
        return new TestSession(host);
    }

    function WithDisabledProjectReferences(host: TestServerHost) {
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

    function verifyForAllSessionTypes<T>(worker: (type: SessionType, options: T) => void, options: T) {
        describe("when main tsconfig doesnt have project reference", () => {
            worker(SessionType.NoReference, options);
        });
        describe("when main tsconfig has project reference", () => {
            worker(SessionType.ProjectReference, options);
        });
        describe("when main tsconfig has disableSourceOfProjectReferenceRedirect along with project reference", () => {
            worker(SessionType.DisableSourceOfProjectReferenceRedirect, options);
        });
    }

    function createSession(type: SessionType, onHostCreate?: OnHostCreate) {
        return type === SessionType.NoReference ? createSessionWithoutProjectReferences(onHostCreate) :
            type === SessionType.ProjectReference ? createSessionWithProjectReferences(onHostCreate) :
            type === SessionType.DisableSourceOfProjectReferenceRedirect ?
            createSessionWithDisabledProjectReferences(onHostCreate) :
            ts.Debug.assertNever(type);
    }

    function setup(type: SessionType, openFiles: readonly File[], action: Action | Action[], max?: number, onHostCreate?: OnHostCreate) {
        const session = createSession(type, onHostCreate);
        openFilesForSession(openFiles, session);
        runActions(session, action, max);
        return session;
    }

    enum SessionType {
        NoReference = "configHasNoReference",
        ProjectReference = "configWithReference",
        DisableSourceOfProjectReferenceRedirect = "disabledSourceRef",
    }
    type ScenarioLocation = "usageProject" | "dependency" | "dependencyAndUsage";
    type Action = (fn: number) => TestSessionRequest<ts.server.protocol.Request>;
    interface VerifyActionOptions {
        scenarioLocation: ScenarioLocation;
        type: SessionType;
        scenario: string;
        openFiles: readonly File[];
        action: Action | Action[];
    }
    function verifyAction(options: VerifyActionOptions) {
        it(options.scenario, () => {
            const session = setup(options.type, options.openFiles, options.action);
            verifyScriptInfoCollectionWith(session, options.openFiles);
            baselineTsserverLogs("projectReferencesSourcemap", `${options.scenarioLocation}/${options.type}/${options.scenario}`, session);
        });
    }
    interface VerifyScenarioWithChangesOptions {
        scenarioLocation: ScenarioLocation;
        type: SessionType;
        scenario: string;
        openFiles: readonly File[];
        change: (session: TestSession) => void;
        action: Action | Action[];
        actionAfterChange?: Action | Action[];
    }
    function verifyScenarioWithChangesWorker(options: VerifyScenarioWithChangesOptions, timeoutBeforeAction: boolean) {
        it(`${options.scenario}, when timeout ${timeoutBeforeAction ? "occurs" : "does not occur"} before request`, () => {
            // Create DocumentPositionMapper
            const session = setup(options.type, options.openFiles, options.action, 1);

            // change
            options.change(session);
            if (timeoutBeforeAction) session.host.runQueuedTimeoutCallbacks();

            // action
            runActions(session, options.actionAfterChange || options.action);
            baselineTsserverLogs("projectReferencesSourcemap", `${options.scenarioLocation}/${options.type}/${options.scenario}${timeoutBeforeAction ? " with timeout before request" : ""}`, session);
        });
    }
    function verifyScenarioWithChanges(options: VerifyScenarioWithChangesOptions) {
        verifyScenarioWithChangesWorker(options, /*timeoutBeforeAction*/ true);
        verifyScenarioWithChangesWorker(options, /*timeoutBeforeAction*/ false);
    }
    interface VerifyFileRenamesOptions {
        scenarioLocation: ScenarioLocation;
        type: SessionType;
        file: "dts" | "dtsMap";
        openFiles: readonly File[];
        action: Action | Action[];
    }
    function verifyFileChangeAndRenames(options: VerifyFileRenamesOptions) {
        function file(options: VerifyFileRenamesOptions) {
            return options.file === "dts" ? dtsLocation : dtsMapLocation;
        }
        enum ChangeAsRenameType {
            NoTimeout = "no timeout",
            TimeoutAfterDelete = "timeout after delete",
            TimeoutAfterWrite = "timeout after write",
            ActionBeforeWrite = "action before write",
        }
        function change(options: VerifyFileRenamesOptions) {
            return options.file === "dts" ? changeDtsFile : changeDtsMapFile;
        }
        function verifyChangeAsRename(withChange: boolean) {
            [
                ChangeAsRenameType.NoTimeout,
                ChangeAsRenameType.TimeoutAfterDelete,
                ChangeAsRenameType.TimeoutAfterWrite,
                ChangeAsRenameType.ActionBeforeWrite,
            ].forEach(changeAsRenameType => {
                it(`with ${options.file} file, change as rename  ${changeAsRenameType}`, () => {
                    const session = setup(options.type, options.openFiles, options.action, 1);
                    const location = file(options);
                    const fileContents = session.host.readFile(location)!;
                    session.host.deleteFile(location);
                    switch (changeAsRenameType) {
                        case ChangeAsRenameType.TimeoutAfterDelete:
                            session.host.runQueuedTimeoutCallbacks();
                            break;
                        case ChangeAsRenameType.ActionBeforeWrite:
                            runActions(session, options.action, 2);
                            break;
                        default:
                            session.host.baselineHost(`Before write ${location}`);
                    }
                    if (withChange) change(options)(session, fileContents);
                    else session.host.writeFile(location, fileContents);
                    if (changeAsRenameType === ChangeAsRenameType.TimeoutAfterWrite) session.host.runQueuedTimeoutCallbacks();
                    runActions(session, options.action, 2);
                    baselineTsserverLogs("projectReferencesSourcemap", `${options.scenarioLocation}/${options.type}/dependency ${options.file} ${withChange ? "change" : "rewrite"} as rename ${changeAsRenameType}`, session);
                });
            });
        }
        // Edit to add new fn
        verifyScenarioWithChanges({
            scenarioLocation: options.scenarioLocation,
            type: options.type,
            scenario: `dependency ${options.file} changes`,
            openFiles: options.openFiles,
            change: change(options),
            action: options.action,
        });
        verifyChangeAsRename(/*withChange*/ true);
        verifyChangeAsRename(/*withChange*/ false);
        it(`with ${options.file} file, when file is not present`, () => {
            const session = setup(options.type, options.openFiles, options.action, undefined, host => host.deleteFile(file(options)));
            verifyScriptInfoCollectionWith(session, options.openFiles);
            baselineTsserverLogs("projectReferencesSourcemap", `${options.scenarioLocation}/${options.type}/dependency ${options.file} not present`, session);
        });
        it(`with ${options.file} file, when file is created after actions on projects`, () => {
            let fileContents: string;
            const location = file(options);
            const session = setup(options.type, options.openFiles, options.action, 1, host => {
                fileContents = host.readFile(location)!;
                host.deleteFile(location);
            });
            session.host.writeFile(location, fileContents!);
            runActions(session, options.action);
            verifyScriptInfoCollectionWith(session, options.openFiles);
            baselineTsserverLogs("projectReferencesSourcemap", `${options.scenarioLocation}/${options.type}/dependency ${options.file} created`, session);
        });
        it(`with ${options.file} file, when file is deleted after actions on the projects`, () => {
            const session = setup(options.type, options.openFiles, options.action, 1);
            session.host.deleteFile(file(options));
            runActions(session, options.action);
            verifyScriptInfoCollectionWith(session, options.openFiles);
            baselineTsserverLogs("projectReferencesSourcemap", `${options.scenarioLocation}/${options.type}/dependency ${options.file} deleted`, session);
        });
    }

    interface VerifyScenario {
        scenarioLocation: ScenarioLocation;
        scenario: string;
        openFiles: readonly File[];
        action: Action | Action[];
        change: (session: TestSession) => void;
        referenceChange: (session: TestSession) => void;
        referenceChangeAction?: Action | Action[];
    }
    function verifyScenario(options: VerifyScenario) {
        verifyForAllSessionTypes((type, options) => {
            verifyAction({
                scenarioLocation: options.scenarioLocation,
                type,
                scenario: options.scenario,
                openFiles: options.openFiles,
                action: options.action,
            });

            // Edit
            verifyScenarioWithChanges({
                scenarioLocation: options.scenarioLocation,
                type,
                scenario: "usage file changes",
                openFiles: options.openFiles,
                change: options.change,
                action: options.action,
            });

            verifyFileChangeAndRenames({
                scenarioLocation: options.scenarioLocation,
                type,
                file: "dtsMap",
                openFiles: options.openFiles,
                action: options.action,
            });

            verifyFileChangeAndRenames({
                scenarioLocation: options.scenarioLocation,
                type,
                file: "dts",
                openFiles: options.openFiles,
                action: options.action,
            });

            if (type !== SessionType.ProjectReference) return;

            verifyScenarioWithChanges({
                scenarioLocation: options.scenarioLocation,
                type,
                scenario: "dependency source changes",
                openFiles: options.openFiles,
                change: options.referenceChange,
                action: options.action,
                actionAfterChange: options.referenceChangeAction,
            });

            it("when projects are not built", () => {
                const host = TestServerHost.createServerHost(files);
                const session = new TestSession(host);
                openFilesForSession(options.openFiles, session);
                runActions(session, options.action);
                verifyScriptInfoCollectionWith(session, options.openFiles);
                baselineTsserverLogs("projectReferencesSourcemap", `${options.scenarioLocation}/${type}/when projects are not built`, session);
            });
        }, options);
    }

    describe("from project that uses dependency: goToDef", () => {
        verifyScenario({
            scenarioLocation: "usageProject",
            scenario: "can go to definition correctly",
            openFiles: [mainTs, randomFile],
            action: goToDefFromMainTs,
            change: makeChangeToMainTs,
            referenceChange: session =>
                session.host.writeFile(
                    dependencyTs.path,
                    `function fooBar() { }\n${dependencyTs.content}`,
                ),
        });
    });

    describe("from defining project: rename", () => {
        verifyScenario({
            scenarioLocation: "dependency",
            scenario: "rename locations",
            openFiles: [dependencyTs, randomFile],
            action: renameFromDependencyTs,
            change: makeChangeToDependencyTs,
            referenceChange: session =>
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: dependencyTs.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: "function fooBar() { }\n",
                    },
                }),
            referenceChangeAction: renameFromDependencyTsWithDependencyChange,
        });
    });

    describe("when opening depedency and usage project: goToDef and rename", () => {
        verifyScenario({
            scenarioLocation: "dependencyAndUsage",
            scenario: "goToDef and rename locations",
            openFiles: [mainTs, dependencyTs, randomFile],
            action: [goToDefFromMainTs, renameFromDependencyTs],
            change: session => {
                makeChangeToMainTs(session);
                makeChangeToDependencyTs(session);
            },
            referenceChange: session =>
                session.executeCommandSeq<ts.server.protocol.ChangeRequest>({
                    command: ts.server.protocol.CommandTypes.Change,
                    arguments: {
                        file: dependencyTs.path,
                        line: 1,
                        offset: 1,
                        endLine: 1,
                        endOffset: 1,
                        insertString: "function fooBar() { }\n",
                    },
                }),
            referenceChangeAction: [goToDefFromMainTs, renameFromDependencyTsWithDependencyChange],
        });

        verifyForAllSessionTypes(type => {
            it("goto Definition in usage and rename locations, deleting config file", () => {
                const session = createSession(type);
                openFilesForSession([mainTs], session);
                session.executeCommandSeq<ts.server.protocol.RenameRequest>({
                    command: ts.server.protocol.CommandTypes.Rename,
                    arguments: { file: mainTs.path, line: 2, offset: 17 },
                });

                verifyMainConfigDelete(mainConfig, /*runTimeoutAfterDelete*/ true, /*openRandomAfterDelete*/ false);
                verifyMainConfigDelete(mainConfig, /*runTimeoutAfterDelete*/ true, /*openRandomAfterDelete*/ true);
                verifyMainConfigDelete(mainConfig, /*runTimeoutAfterDelete*/ false, /*openRandomAfterDelete*/ false);
                verifyMainConfigDelete(mainConfig, /*runTimeoutAfterDelete*/ false, /*openRandomAfterDelete*/ true);

                verifyMainConfigDelete(dependencyConfig, /*runTimeoutAfterDelete*/ true, /*openRandomAfterDelete*/ false);
                verifyMainConfigDelete(dependencyConfig, /*runTimeoutAfterDelete*/ false, /*openRandomAfterDelete*/ true);
                verifyMainConfigDelete(dependencyConfig, /*runTimeoutAfterDelete*/ true, /*openRandomAfterDelete*/ true);
                verifyMainConfigDelete(dependencyConfig, /*runTimeoutAfterDelete*/ false, /*openRandomAfterDelete*/ false);

                baselineTsserverLogs("projectReferencesSourcemap", `dependencyAndUsage/${type}/goToDef and rename locations and deleting config file`, session);

                function verifyMainConfigDelete(
                    config: File,
                    runTimeoutAfterDelete: boolean,
                    openRandomAfterDelete: boolean,
                ) {
                    const configContent = session.host.readFile(config.path)!;
                    session.host.deleteFile(config.path);
                    if (runTimeoutAfterDelete) session.host.runQueuedTimeoutCallbacks();
                    if (openRandomAfterDelete) {
                        openFilesForSession([randomFile], session);
                        closeFilesForSession([randomFile], session);
                    }
                    session.host.writeFile(config.path, configContent);
                    session.host.runQueuedTimeoutCallbacks();
                    openFilesForSession([randomFile], session);
                    closeFilesForSession([randomFile], session);
                }
            });
        }, /*options*/ undefined);
    });
});
