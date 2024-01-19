import {
    incrementalVerifier,
} from "../../../harness/incrementalUtils";
import {
    createLoggerWithInMemoryLogs,
    LoggerWithInMemoryLogs,
} from "../../../harness/tsserverLogger";
import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    ensureErrorFreeBuild,
} from "./solutionBuilder";
import {
    customTypesMap,
    TestTypingsInstallerAdapter,
    TestTypingsInstallerOptions,
} from "./typingsInstaller";
import {
    changeToHostTrackingWrittenFiles,
    createServerHost,
    File,
    FileOrFolderOrSymLink,
    libFile,
    SerializeOutputOrder,
    StateLogger,
    TestServerHost,
    TestServerHostTrackingWrittenFiles,
} from "./virtualFileSystemWithWatch";

export function baselineTsserverLogs(scenario: string, subScenario: string, sessionOrService: { logger: LoggerWithInMemoryLogs; }) {
    Harness.Baseline.runBaseline(`tsserver/${scenario}/${subScenario.split(" ").join("-")}.js`, sessionOrService.logger.logs.join("\r\n"));
}

export function appendAllScriptInfos(session: TestSession) {
    session.logger.log("");
    session.logger.log(`ScriptInfos:`);
    session.getProjectService().filenameToScriptInfo.forEach(info => session.logger.log(`path: ${info.path} fileName: ${info.fileName}`));
    session.logger.log("");
}

export function toExternalFile(fileName: string): ts.server.protocol.ExternalFile {
    return { fileName };
}

export function toExternalFiles(fileNames: string[]) {
    return ts.map(fileNames, toExternalFile);
}

export type TestSessionAndServiceHost = TestServerHostTrackingWrittenFiles & {
    patched: boolean;
    baselineHost(title: string): void;
};
export function patchHostTimeouts(
    inputHost: TestServerHostTrackingWrittenFiles,
    logger: LoggerWithInMemoryLogs,
) {
    const host = inputHost as TestSessionAndServiceHost;
    if (host.patched) return host;
    host.patched = true;
    if (!logger.hasLevel(ts.server.LogLevel.verbose)) {
        host.baselineHost = ts.notImplemented;
        return host;
    }

    const originalSetTime = host.setTime;

    host.timeoutCallbacks.switchToBaseliningInvoke(logger, SerializeOutputOrder.None);
    host.immediateCallbacks.switchToBaseliningInvoke(logger as StateLogger, SerializeOutputOrder.None);
    host.pendingInstalls.switchToBaseliningInvoke(logger, SerializeOutputOrder.None);
    host.setTime = setTime;
    host.baselineHost = baselineHost;
    host.patched = true;
    return host;

    function setTime(time: number) {
        logger.log(`Host is moving to new time`);
        return originalSetTime.call(host, time);
    }

    function baselineHost(title: string) {
        logger.log(title);
        host.serializeState(logger.logs, SerializeOutputOrder.None);
    }
}

export interface TestSessionOptions extends ts.server.SessionOptions, TestTypingsInstallerOptions {
    host: TestServerHost;
    logger: LoggerWithInMemoryLogs;
    disableAutomaticTypingAcquisition?: boolean;
    useCancellationToken?: boolean | number;
}
export type TestSessionPartialOptionsAndHost = Partial<Omit<TestSessionOptions, "typingsInstaller" | "cancellationToken">> & Pick<TestSessionOptions, "host">;
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
            changeToHostTrackingWrittenFiles(this.host),
            this.logger,
        );
    }

    getProjectService() {
        return this.projectService;
    }

    public getSeq() {
        return this.seq;
    }

    public getNextSeq() {
        return this.seq + 1;
    }

    public override executeCommand(request: ts.server.protocol.Request) {
        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
            this.host.baselineHost("Before request");
            this.logger.info(`request:${ts.server.stringifyIndented(request)}`);
        }
        const response = super.executeCommand(request);
        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
            this.logger.info(`response:${ts.server.stringifyIndented(response.response === ts.getSupportedCodeFixes() ? { ...response, response: "ts.getSupportedCodeFixes()" } : response)}`);
            this.host.baselineHost("After request");
        }
        return response;
    }

    public executeCommandSeq<T extends ts.server.protocol.Request>(inputRequest: TestSessionRequest<T>) {
        this.seq++;
        const request: T = inputRequest as T;
        request.seq = this.seq;
        request.type = "request";
        return this.executeCommand(request);
    }
}

export function createSessionWithCustomEventHandler(
    optsOrHost: TestSessionConstructorOptions,
    customAction?: (event: ts.server.ProjectServiceEvent) => void,
) {
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

    setRequest(requestId: number) {
        this.currentId = requestId;
        this.logger.log(`TestServerCancellationToken:: Cancellation Request id:: ${requestId}`);
    }

    setRequestToCancel(requestId: number) {
        this.logger.log(`TestServerCancellationToken:: Setting request to cancel:: ${requestId}`);
        this.resetToken();
        this.requestToCancel = requestId;
    }

    resetRequest(requestId: number) {
        this.logger.log(`TestServerCancellationToken:: resetRequest:: ${requestId} is ${requestId === this.currentId ? "as expected" : `expected to be ${this.currentId}`}`);
        assert.equal(requestId, this.currentId, "unexpected request id in cancellation");
        this.currentId = undefined;
    }

    isCancellationRequested() {
        this.isCancellationRequestedCount++;
        // If the request id is the request to cancel and isCancellationRequestedCount
        // has been met then cancel the request. Ex: cancel the request if it is a
        // nav bar request & isCancellationRequested() has already been called three times.
        const result = this.requestToCancel === this.currentId && this.isCancellationRequestedCount >= this.cancelAfterRequest;
        if (result) this.logger.log(`TestServerCancellationToken:: Cancellation is requested`);
        return result;
    }

    resetToken() {
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

export function closeFilesForSession(files: readonly (File | string)[], session: TestSession): void {
    for (const file of files) {
        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: ts.isString(file) ? file : file.path },
        });
    }
}

export function openExternalProjectForSession(project: ts.server.protocol.ExternalProject, session: TestSession) {
    session.executeCommandSeq<ts.server.protocol.OpenExternalProjectRequest>({
        command: ts.server.protocol.CommandTypes.OpenExternalProject,
        arguments: project,
    });
}

export function openExternalProjectsForSession(projects: ts.server.protocol.ExternalProject[], session: TestSession) {
    session.executeCommandSeq<ts.server.protocol.OpenExternalProjectsRequest>({
        command: ts.server.protocol.CommandTypes.OpenExternalProjects,
        arguments: { projects },
    });
}

export function setCompilerOptionsForInferredProjectsRequestForSession(
    options: ts.server.protocol.InferredProjectCompilerOptions | ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs,
    session: TestSession,
) {
    session.executeCommandSeq<ts.server.protocol.SetCompilerOptionsForInferredProjectsRequest>({
        command: ts.server.protocol.CommandTypes.CompilerOptionsForInferredProjects,
        arguments: "options" in options ? // eslint-disable-line local/no-in-operator
            options as ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs :
            { options },
    });
}

export function logDiagnostics(sessionOrService: TestSession, diagnosticsType: string, project: ts.server.Project, diagnostics: readonly ts.Diagnostic[]) {
    sessionOrService.logger.info(`${diagnosticsType}:: ${diagnostics.length}`);
    diagnostics.forEach(d => sessionOrService.logger.info(ts.formatDiagnostic(d, project)));
}
export interface VerifyGetErrRequestBase {
    session: TestSession;
    existingTimeouts?: boolean;
}
export interface VerifyGetErrRequest extends VerifyGetErrRequestBase {
    files: readonly (string | File)[];
    skip?: CheckAllErrors["skip"];
}
export function verifyGetErrRequest(request: VerifyGetErrRequest) {
    const { session, files } = request;
    session.executeCommandSeq<ts.server.protocol.GeterrRequest>({
        command: ts.server.protocol.CommandTypes.Geterr,
        arguments: { delay: 0, files: files.map(filePath) },
    });
    checkAllErrors(request);
}

interface SkipErrors {
    semantic?: true;
    suggestion?: true;
}
export interface CheckAllErrors extends VerifyGetErrRequestBase {
    files: readonly any[];
    skip?: readonly (SkipErrors | undefined)[];
}
function checkAllErrors({ session, existingTimeouts, files, skip }: CheckAllErrors) {
    for (let i = 0; i < files.length; i++) {
        session.host.runQueuedTimeoutCallbacks(existingTimeouts ? session.host.getNextTimeoutId() - 1 : undefined);
        if (!skip?.[i]?.semantic) session.host.runQueuedImmediateCallbacks();
        if (!skip?.[i]?.suggestion) session.host.runQueuedImmediateCallbacks();
    }
}

function filePath(file: string | File) {
    return ts.isString(file) ? file : file.path;
}

function verifyErrorsUsingGeterr({ scenario, subScenario, allFiles, openFiles, getErrRequest }: VerifyGetErrScenario) {
    it("verifies the errors in open file", () => {
        const host = createServerHost([...allFiles(), libFile]);
        const session = new TestSession(host);
        openFilesForSession(openFiles(), session);

        verifyGetErrRequest({ session, files: getErrRequest() });
        baselineTsserverLogs(scenario, `${subScenario} getErr`, session);
    });
}

function verifyErrorsUsingGeterrForProject({ scenario, subScenario, allFiles, openFiles, getErrForProjectRequest }: VerifyGetErrScenario) {
    it("verifies the errors in projects", () => {
        const host = createServerHost([...allFiles(), libFile]);
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
        const host = createServerHost([...allFiles(), libFile]);
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
export function verifyGetErrScenario(scenario: VerifyGetErrScenario) {
    verifyErrorsUsingGeterr(scenario);
    verifyErrorsUsingGeterrForProject(scenario);
    verifyErrorsUsingSyncMethods(scenario);
}

export function verifyDynamic(session: TestSession, path: string) {
    session.logger.log(`${path} isDynamic:: ${session.getProjectService().filenameToScriptInfo.get(path)!.isDynamic}`);
}

export function createHostWithSolutionBuild(files: readonly FileOrFolderOrSymLink[], rootNames: readonly string[]) {
    const host = createServerHost(files);
    // ts build should succeed
    ensureErrorFreeBuild(host, rootNames);
    return host;
}

export function logInferredProjectsOrphanStatus(session: TestSession) {
    session.getProjectService().inferredProjects.forEach(inferredProject => session.logger.log(`Inferred project: ${inferredProject.projectName} isOrphan:: ${inferredProject.isOrphan()} isClosed: ${inferredProject.isClosed()}`));
}

export function logConfiguredProjectsHasOpenRefStatus(session: TestSession) {
    session.getProjectService().configuredProjects.forEach(configuredProject => session.logger.log(`Configured project: ${configuredProject.projectName} hasOpenRef:: ${configuredProject.hasOpenRef()} isClosed: ${configuredProject.isClosed()}`));
}
