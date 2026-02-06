import path from "path";
import { incrementalVerifier } from "../../../harness/incrementalUtils.js";
import { patchServiceForStateBaseline } from "../../../harness/projectServiceStateLogger.js";
import {
    createLoggerWithInMemoryLogs,
    LoggerWithInMemoryLogs,
} from "../../../harness/tsserverLogger.js";
import { FileRangesRequestArgs } from "../../../server/protocol.js";
import { Baseline } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import { patchHostForBuildInfoReadWrite } from "./baseline.js";
import { ensureErrorFreeBuild } from "./solutionBuilder.js";
import { TscWatchCompileChange } from "./tscWatch.js";
import {
    customTypesMap,
    TestTypingsInstallerAdapter,
    TestTypingsInstallerOptions,
} from "./typingsInstaller.js";
import {
    changeToHostTrackingWrittenFiles,
    File,
    FileOrFolderOrSymLink,
    SerializeOutputOrder,
    TestServerHost,
    TestServerHostTrackingWrittenFiles,
} from "./virtualFileSystemWithWatch.js";

export function baselineTsserverLogs(scenario: string, subScenario: string, sessionOrService: { logger: LoggerWithInMemoryLogs; }): void {
    Baseline.runBaseline(`tsserver/${scenario}/${subScenario.split(" ").join("-")}.js`, sessionOrService.logger.logs.join("\r\n"));
}

export function toExternalFile(fileName: string): ts.server.protocol.ExternalFile {
    return { fileName };
}

export function toExternalFiles(fileNames: string[]): ts.server.protocol.ExternalFile[] {
    return ts.map(fileNames, toExternalFile);
}

export type TestSessionAndServiceHost = TestServerHostTrackingWrittenFiles & {
    patched: boolean;
    baselineHost(title: string): void;
};
export function patchHostTimeouts(
    inputHost: TestServerHostTrackingWrittenFiles,
    session: TestSession | undefined,
    logger: LoggerWithInMemoryLogs,
): TestSessionAndServiceHost {
    const host = inputHost as TestSessionAndServiceHost;
    host.service = session?.getProjectService();
    if (session) patchServiceForStateBaseline(session.getProjectService());
    if (host.patched) return host;
    host.patched = true;
    if (!logger.hasLevel(ts.server.LogLevel.verbose)) {
        host.baselineHost = ts.notImplemented;
        return host;
    }

    host.switchToBaseliningInvoke(logger, SerializeOutputOrder.None);
    host.baselineHost = baselineHost;
    host.patched = true;
    return host;

    function baselineHost(title: string) {
        logger.log(title);
        host.serializeState(logger.logs, SerializeOutputOrder.None);
    }
}

function patchSessionToHandleWatchEvents(session: TestSession) {
    const event = session.event;
    const idToClose = new Map<number, () => void>();
    session.event = (data, eventName) => {
        event.call(session, data, eventName);
        switch (eventName) {
            case ts.server.CreateFileWatcherEvent:
                watchFile(data as ts.server.protocol.CreateFileWatcherEventBody);
                break;
            case ts.server.CreateDirectoryWatcherEvent:
                watchDirectory(data as ts.server.protocol.CreateDirectoryWatcherEventBody);
                break;
            case ts.server.CloseFileWatcherEvent:
                closeWatcher(data as ts.server.protocol.CloseFileWatcherEventBody);
                break;
            default:
                break;
        }
    };

    function watchFile(event: ts.server.protocol.CreateFileWatcherEventBody) {
        createWatcher(
            "watchFile",
            event,
            recordChange =>
                session.host.watchUtils.pollingWatch(
                    session.host.toNormalizedAbsolutePath(event.path),
                    {
                        cb: (fileName, eventKind) =>
                            recordChange(
                                event.id,
                                session.host.windowsStyleRoot ?
                                    path.win32.resolve(fileName) :
                                    path.posix.resolve(fileName),
                                eventKind === ts.FileWatcherEventKind.Created ?
                                    "created" :
                                    eventKind === ts.FileWatcherEventKind.Deleted ? "deleted" : "updated",
                                /*ignoreUpdate*/ false,
                            ),
                        pollingInterval: undefined!,
                        event,
                    },
                ),
        );
    }

    function watchDirectory(event: ts.server.protocol.CreateDirectoryWatcherEventBody) {
        createWatcher(
            "watchDirectory",
            event,
            recordChange =>
                session.host.watchUtils.fsWatch(
                    session.host.toNormalizedAbsolutePath(event.path),
                    event.recursive,
                    {
                        cb: (eventName, relativeFileName) => {
                            if (!relativeFileName) return;
                            const fileName = session.host.windowsStyleRoot ?
                                path.win32.join(event.path, relativeFileName) :
                                path.posix.join(event.path, relativeFileName);
                            if (eventName === "change") {
                                recordChange(
                                    event.id,
                                    fileName,
                                    "updated",
                                    !!event.ignoreUpdate,
                                );
                            }
                            else {
                                recordChange(
                                    event.id,
                                    fileName,
                                    session.host.fileExists(fileName) || session.host.directoryExists(fileName) ?
                                        "created" :
                                        "deleted",
                                    !!event.ignoreUpdate,
                                );
                            }
                        },
                        inode: undefined,
                        event,
                    },
                ),
        );
    }

    function createWatcher(
        watchType: string,
        event: ts.server.protocol.CreateFileWatcherEventBody | ts.server.protocol.CreateDirectoryWatcherEventBody,
        create: (
            recordChange: (
                id: number,
                file: string,
                eventType: "created" | "deleted" | "updated",
                ignoreUpdate: boolean,
            ) => void,
        ) => ts.FileWatcher,
    ) {
        session.logger.log(`Custom ${watchType}:: Added:: ${JSON.stringify(event)}`);
        ts.Debug.assert(!idToClose.has(event.id));
        const result = create((id, file, eventType, ignoreUpdate) => {
            const ignored = eventType === "updated" && ignoreUpdate;
            session.logger.log(`Custom ${watchType}:: Triggered${ignoreUpdate ? " Ignored" : ""}:: ${JSON.stringify(event)}:: ${file} ${eventType}`);
            if (!ignored) {
                let watchChange = session.watchChanges.get(id);
                if (!watchChange) session.watchChanges.set(id, watchChange = { id });
                (watchChange[eventType] ??= []).push(file);
            }
        });
        idToClose.set(event.id, () => {
            session.logger.log(`Custom ${watchType}:: Close:: ${JSON.stringify(event)}`);
            result.close();
        });
    }

    function closeWatcher(data: ts.server.protocol.CloseFileWatcherEventBody) {
        const close = idToClose.get(data.id);
        if (close) {
            idToClose.delete(data.id);
            close();
        }
    }
}

export interface TestSessionOptions extends ts.server.SessionOptions, TestTypingsInstallerOptions {
    host: TestServerHost;
    logger: LoggerWithInMemoryLogs;
    disableAutomaticTypingAcquisition?: boolean;
    useCancellationToken?: boolean | number;
    regionDiagLineCountThreshold?: number;
}
export type TestSessionPartialOptionsAndHost =
    & Partial<Omit<TestSessionOptions, "typingsInstaller" | "cancellationToken">>
    & Pick<TestSessionOptions, "host">;
export type TestSessionConstructorOptions = TestServerHost | TestSessionPartialOptionsAndHost;
export type TestSessionRequest<T extends ts.server.protocol.Request> = Pick<T, "command" | "arguments">;

function getTestSessionPartialOptionsAndHost(optsOrHost: TestSessionConstructorOptions): TestSessionPartialOptionsAndHost {
    // eslint-disable-next-line local/no-in-operator
    return "host" in optsOrHost ?
        optsOrHost :
        { host: optsOrHost };
}
export class TestSession extends ts.server.Session {
    private seq = 0;
    public override host!: TestSessionAndServiceHost;
    public override logger!: LoggerWithInMemoryLogs;
    public override readonly typingsInstaller!: TestTypingsInstallerAdapter;
    public serverCancellationToken: TestServerCancellationToken;
    public watchChanges: Map<number, ts.server.protocol.WatchChangeRequestArgs> = new Map();

    constructor(optsOrHost: TestSessionConstructorOptions) {
        const opts = getTestSessionPartialOptionsAndHost(optsOrHost);
        opts.logger = opts.logger || createLoggerWithInMemoryLogs(opts.host);
        const typingsInstaller = !opts.disableAutomaticTypingAcquisition ? new TestTypingsInstallerAdapter(opts) : undefined;
        const cancellationToken = opts.useCancellationToken ?
            new TestServerCancellationToken(
                opts.logger,
                ts.isNumber(opts.useCancellationToken) ? opts.useCancellationToken : undefined,
            ) :
            ts.server.nullCancellationToken;
        super({
            cancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            noGetErrOnBackgroundUpdate: true,
            byteLength: Buffer.byteLength,
            hrtime: process.hrtime,
            logger: opts.logger,
            canUseEvents: true,
            incrementalVerifier,
            typesMapLocation: customTypesMap.path,
            typingsInstaller,
            ...opts,
        });
        if (typingsInstaller) typingsInstaller.session = this;
        this.serverCancellationToken = cancellationToken as TestServerCancellationToken;
        patchHostTimeouts(
            changeToHostTrackingWrittenFiles(patchHostForBuildInfoReadWrite(this.host)),
            this,
            this.logger,
        );
        if (opts.regionDiagLineCountThreshold !== undefined) {
            this.regionDiagLineCountThreshold = opts.regionDiagLineCountThreshold;
        }
        if (opts.canUseWatchEvents) patchSessionToHandleWatchEvents(this);
    }

    getProjectService(): ts.server.ProjectService {
        return this.projectService;
    }

    public getSeq(): number {
        return this.seq;
    }

    public getNextSeq(): number {
        return this.seq + 1;
    }

    public override executeCommand(request: ts.server.protocol.Request): ts.server.HandlerResponse {
        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
            this.host.baselineHost("Before request");
            this.logger.info(`request:${ts.server.stringifyIndented(request)}`);
        }
        const response = super.executeCommand(request);
        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
            if (response.responseRequired) this.logger.info(`response:${ts.server.stringifyIndented(response.response === ts.getSupportedCodeFixes() ? { ...response, response: "ts.getSupportedCodeFixes()" } : response)}`);
            this.host.baselineHost("After request");
        }
        return response;
    }

    public executeCommandSeq<T extends ts.server.protocol.Request>(inputRequest: TestSessionRequest<T>): ts.server.HandlerResponse {
        this.seq++;
        const request: T = inputRequest as T;
        request.seq = this.seq;
        request.type = "request";
        return this.executeCommand(request);
    }

    public invokeWatchChanges(): void {
        const changes = ts.singleOrMany(ts.arrayFrom(this.watchChanges.values()));
        this.watchChanges.clear();
        this.executeCommandSeq<ts.server.protocol.WatchChangeRequest>({
            command: ts.server.protocol.CommandTypes.WatchChange,
            arguments: changes,
        });
    }
}

export function createSessionWithCustomEventHandler(
    optsOrHost: TestSessionConstructorOptions,
    customAction?: (event: ts.server.ProjectServiceEvent) => void,
): TestSession {
    const opts = getTestSessionPartialOptionsAndHost(optsOrHost);
    opts.eventHandler = eventHandler;
    const session = new TestSession(opts);
    return session;
    function eventHandler(event: ts.server.ProjectServiceEvent) {
        let data = event.data as any;
        switch (event.eventName) {
            // No change to data
            case ts.server.ProjectsUpdatedInBackgroundEvent:
            case ts.server.LargeFileReferencedEvent:
            case ts.server.ProjectInfoTelemetryEvent:
            case ts.server.OpenFileInfoTelemetryEvent:
            case ts.server.CreateFileWatcherEvent:
            case ts.server.CreateDirectoryWatcherEvent:
            case ts.server.CloseFileWatcherEvent:
                break;
            // Convert project to project name
            case ts.server.ProjectLoadingStartEvent:
            case ts.server.ProjectLoadingFinishEvent:
            case ts.server.ProjectLanguageServiceStateEvent:
                data = { ...data, project: event.data.project.getProjectName() };
                break;
            // Map diagnostics
            case ts.server.ConfigFileDiagEvent:
                data = { ...data, diagnostics: ts.map(event.data.diagnostics, diagnostic => ts.server.formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ true)) };
                break;
            default:
                ts.Debug.assertNever(event);
        }
        session.event(data, `CustomHandler::${event.eventName}`);
        customAction?.(event);
    }
}

export function protocolLocationFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): ts.server.protocol.Location {
    const start = nthIndexOf(str, substring, options ? options.index : 0);
    ts.Debug.assert(start !== -1);
    return protocolToLocation(str)(start);
}

export function protocolToLocation(text: string): (pos: number) => ts.server.protocol.Location {
    const lineStarts = ts.computeLineStarts(text);
    return pos => {
        const x = ts.computeLineAndCharacterOfPosition(lineStarts, pos);
        return { line: x.line + 1, offset: x.character + 1 };
    };
}

export function protocolTextSpanFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): ts.server.protocol.TextSpan {
    const span = textSpanFromSubstring(str, substring, options);
    const toLocation = protocolToLocation(str);
    return { start: toLocation(span.start), end: toLocation(ts.textSpanEnd(span)) };
}

export function textSpanFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): ts.TextSpan {
    const start = nthIndexOf(str, substring, options ? options.index : 0);
    ts.Debug.assert(start !== -1);
    return ts.createTextSpan(start, substring.length);
}

export function protocolTextSpanToFileRange(span: ts.server.protocol.TextSpan): ts.server.protocol.FileRange {
    return {
        startLine: span.start.line,
        startOffset: span.start.offset,
        endLine: span.end.line,
        endOffset: span.end.offset,
    };
}

export function protocolFileLocationFromSubstring(file: File, substring: string, options?: SpanFromSubstringOptions): ts.server.protocol.FileLocationRequestArgs {
    return { file: file.path, ...protocolLocationFromSubstring(file.content, substring, options) };
}

export interface SpanFromSubstringOptions {
    readonly index: number;
}

function nthIndexOf(str: string, substr: string, n: number): number {
    let index = -1;
    for (; n >= 0; n--) {
        index = str.indexOf(substr, index + 1);
        if (index === -1) return -1;
    }
    return index;
}

/**
 * Test server cancellation token used to mock host token cancellation requests.
 * The cancelAfterRequest constructor param specifies how many isCancellationRequested() calls
 * should be made before canceling the token. The id of the request to cancel should be set with
 * setRequestToCancel();
 */
export class TestServerCancellationToken implements ts.server.ServerCancellationToken {
    private currentId: number | undefined = -1;
    private requestToCancel = -1;
    private isCancellationRequestedCount = 0;

    constructor(private logger: LoggerWithInMemoryLogs, private cancelAfterRequest = 0) {
    }

    setRequest(requestId: number): void {
        this.currentId = requestId;
        this.logger.log(`TestServerCancellationToken:: Cancellation Request id:: ${requestId}`);
    }

    setRequestToCancel(requestId: number): void {
        this.logger.log(`TestServerCancellationToken:: Setting request to cancel:: ${requestId}`);
        this.resetToken();
        this.requestToCancel = requestId;
    }

    resetRequest(requestId: number): void {
        this.logger.log(`TestServerCancellationToken:: resetRequest:: ${requestId} is ${requestId === this.currentId ? "as expected" : `expected to be ${this.currentId}`}`);
        assert.equal(requestId, this.currentId, "unexpected request id in cancellation");
        this.currentId = undefined;
    }

    isCancellationRequested(): boolean {
        this.isCancellationRequestedCount++;
        // If the request id is the request to cancel and isCancellationRequestedCount
        // has been met then cancel the request. Ex: cancel the request if it is a
        // nav bar request & isCancellationRequested() has already been called three times.
        const result = this.requestToCancel === this.currentId && this.isCancellationRequestedCount >= this.cancelAfterRequest;
        if (result) this.logger.log(`TestServerCancellationToken:: Cancellation is requested`);
        return result;
    }

    resetToken(): void {
        this.currentId = -1;
        this.isCancellationRequestedCount = 0;
        this.requestToCancel = -1;
    }
}

export function openFilesForSession(
    files: readonly (string | File | {
        readonly file: File | string;
        readonly projectRootPath?: string;
        content?: string;
        scriptKindName?: ts.server.protocol.ScriptKindName;
    })[],
    session: TestSession,
): void {
    for (const file of files) {
        session.executeCommandSeq<ts.server.protocol.OpenRequest>({
            command: ts.server.protocol.CommandTypes.Open,
            arguments: ts.isString(file) ?
                { file } :
                "file" in file ? // eslint-disable-line local/no-in-operator
                {
                    file: typeof file.file === "string" ? file.file : file.file.path,
                    projectRootPath: file.projectRootPath,
                    fileContent: file.content,
                    scriptKindName: file.scriptKindName,
                } :
                { file: file.path },
        });
    }
}

export function projectInfoForSession(
    session: TestSession,
    file: string | File,
) {
    return session.executeCommandSeq<ts.server.protocol.ProjectInfoRequest>({
        command: ts.server.protocol.CommandTypes.ProjectInfo,
        arguments: {
            file: ts.isString(file) ? file : file.path,
            needFileNameList: false,
            needDefaultConfiguredProjectInfo: true,
        },
    }).response as ts.server.protocol.ProjectInfo;
}

export function closeFilesForSession(files: readonly (File | string)[], session: TestSession): void {
    for (const file of files) {
        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: ts.isString(file) ? file : file.path },
        });
    }
}

export function openExternalProjectForSession(project: ts.server.protocol.ExternalProject, session: TestSession): void {
    session.executeCommandSeq<ts.server.protocol.OpenExternalProjectRequest>({
        command: ts.server.protocol.CommandTypes.OpenExternalProject,
        arguments: project,
    });
}

export function openExternalProjectsForSession(projects: ts.server.protocol.ExternalProject[], session: TestSession): void {
    session.executeCommandSeq<ts.server.protocol.OpenExternalProjectsRequest>({
        command: ts.server.protocol.CommandTypes.OpenExternalProjects,
        arguments: { projects },
    });
}

export function setCompilerOptionsForInferredProjectsRequestForSession(
    options: ts.server.protocol.InferredProjectCompilerOptions | ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs,
    session: TestSession,
): void {
    session.executeCommandSeq<ts.server.protocol.SetCompilerOptionsForInferredProjectsRequest>({
        command: ts.server.protocol.CommandTypes.CompilerOptionsForInferredProjects,
        arguments: "options" in options ? // eslint-disable-line local/no-in-operator
            options as ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs :
            { options },
    });
}

export function logDiagnostics(sessionOrService: TestSession, diagnosticsType: string, project: ts.server.Project, diagnostics: readonly ts.Diagnostic[]): void {
    sessionOrService.logger.info(`${diagnosticsType}:: ${diagnostics.length}`);
    diagnostics.forEach(d => sessionOrService.logger.info(ts.formatDiagnostic(d, project)));
}
export interface VerifyGetErrRequestBase {
    session: TestSession;
    existingTimeouts?: boolean;
}
export interface VerifyGetErrRequest extends VerifyGetErrRequestBase {
    files: readonly (string | File | FileRangesRequestArgs)[];
    skip?: CheckAllErrors["skip"];
}
export function verifyGetErrRequest(request: VerifyGetErrRequest): void {
    const { session, files } = request;
    session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
        command: ts.server.protocol.CommandTypes.Geterr,
        arguments: {
            delay: 0,
            files: files.map(file => {
                if (typeof file !== "string" && !(file as FileRangesRequestArgs).ranges) {
                    return filePath(file as File);
                }
                return file as string | FileRangesRequestArgs;
            }),
        },
    });
    checkAllErrors(request);
}

interface SkipErrors {
    semantic?: true;
    suggestion?: true;
    /** Region semantic checking will only happen if this is */
    regionSemantic?: false;
}
export interface CheckAllErrors extends VerifyGetErrRequestBase {
    files: readonly any[];
    skip?: readonly (SkipErrors | undefined)[];
}
function checkAllErrors({ session, existingTimeouts, files, skip }: CheckAllErrors) {
    for (let i = 0; i < files.length; i++) {
        session.host.runQueuedTimeoutCallbacks(existingTimeouts ? session.host.getNextTimeoutId() - 1 : undefined);
        if (skip?.[i]?.regionSemantic === false) session.host.runQueuedImmediateCallbacks();
        if (!skip?.[i]?.semantic) session.host.runQueuedImmediateCallbacks();
        if (!skip?.[i]?.suggestion) session.host.runQueuedImmediateCallbacks();
    }
}

function filePath(file: string | File) {
    return ts.isString(file) ? file : file.path;
}

function verifyErrorsUsingGeterr({ scenario, subScenario, allFiles, openFiles, getErrRequest }: VerifyGetErrScenario) {
    it("verifies the errors in open file", () => {
        const host = TestServerHost.createServerHost(allFiles());
        const session = new TestSession(host);
        openFilesForSession(openFiles(), session);

        verifyGetErrRequest({ session, files: getErrRequest() });
        baselineTsserverLogs(scenario, `${subScenario} getErr`, session);
    });
}

function verifyErrorsUsingGeterrForProject({ scenario, subScenario, allFiles, openFiles, getErrForProjectRequest }: VerifyGetErrScenario) {
    it("verifies the errors in projects", () => {
        const host = TestServerHost.createServerHost(allFiles());
        const session = new TestSession(host);
        openFilesForSession(openFiles(), session);

        for (const expected of getErrForProjectRequest()) {
            session.executeCommandSeq<ts.server.protocol.GeterrForProjectRequest>({
                command: ts.server.protocol.CommandTypes.GeterrForProject,
                arguments: { delay: 0, file: filePath(expected.project) },
            });
            checkAllErrors({ session, files: expected.files });
        }
        baselineTsserverLogs(scenario, `${subScenario} geterrForProject`, session);
    });
}

function verifyErrorsUsingSyncMethods({ scenario, subScenario, allFiles, openFiles, syncDiagnostics }: VerifyGetErrScenario) {
    it("verifies the errors using sync commands", () => {
        const host = TestServerHost.createServerHost(allFiles());
        const session = new TestSession(host);
        openFilesForSession(openFiles(), session);
        for (const { file, project } of syncDiagnostics()) {
            const reqArgs = { file: filePath(file), projectFileName: project && filePath(project) };
            session.executeCommandSeq<ts.server.protocol.SyntacticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SyntacticDiagnosticsSync,
                arguments: reqArgs,
            });
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: reqArgs,
            });
            session.executeCommandSeq<ts.server.protocol.SuggestionDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SuggestionDiagnosticsSync,
                arguments: reqArgs,
            });
        }
        baselineTsserverLogs(scenario, `${subScenario} gerErr with sync commands`, session);
    });
}

export interface GetErrForProjectDiagnostics {
    project: string | File;
    files: readonly (string | File)[];
    skip?: CheckAllErrors["skip"];
}
export interface SyncDiagnostics {
    file: string | File;
    project?: string | File;
}
export interface VerifyGetErrScenario {
    scenario: string;
    subScenario: string;
    allFiles: () => readonly File[];
    openFiles: () => readonly File[];
    getErrRequest: () => VerifyGetErrRequest["files"];
    getErrForProjectRequest: () => readonly GetErrForProjectDiagnostics[];
    syncDiagnostics: () => readonly SyncDiagnostics[];
}
export function verifyGetErrScenario(scenario: VerifyGetErrScenario): void {
    verifyErrorsUsingGeterr(scenario);
    verifyErrorsUsingGeterrForProject(scenario);
    verifyErrorsUsingSyncMethods(scenario);
}

export function createHostWithSolutionBuild(files: readonly FileOrFolderOrSymLink[], rootNames: readonly string[]): TestServerHost {
    const host = TestServerHost.createServerHost(files);
    // ts build should succeed
    ensureErrorFreeBuild(host, rootNames);
    return host;
}

export function forEachTscWatchEdit(
    session: TestSession,
    edits: readonly TscWatchCompileChange[],
    action: () => void,
): void {
    edits.forEach(edit => {
        session.logger.log(edit.caption);
        edit.edit(session.host);
        if (session.watchChanges.size) session.invokeWatchChanges();
        edit.timeouts(session.host, undefined!, undefined!);
        action();
    });
}
