import { incrementalVerifier } from "../../../harness/incrementalUtils";
import {
    createHasErrorMessageLogger,
    createLoggerWithInMemoryLogs,
    Logger,
    nowString,
    replaceAll,
    sanitizeLog,
} from "../../../harness/tsserverLogger";
import * as Harness from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import { ActionWatchTypingLocations } from "../../_namespaces/ts.server";
import { ensureErrorFreeBuild } from "./solutionBuilder";
import {
    changeToHostTrackingWrittenFiles,
    createServerHost,
    File,
    FileOrFolderOrSymLink,
    libFile,
    TestServerHost,
    TestServerHostTrackingWrittenFiles,
} from "./virtualFileSystemWithWatch";

export const customTypesMap = {
    path: "/typesMap.json" as ts.Path,
    content: `{
            "typesMap": {
                "jquery": {
                    "match": "jquery(-(\\\\.?\\\\d+)+)?(\\\\.intellisense)?(\\\\.min)?\\\\.js$",
                    "types": ["jquery"]
                },
                "quack": {
                    "match": "/duckquack-(\\\\d+)\\\\.min\\\\.js",
                    "types": ["duck-types"]
                }
            },
            "simpleMap": {
                "Bacon": "baconjs",
                "bliss": "blissfuljs",
                "commander": "commander",
                "cordova": "cordova",
                "react": "react",
                "lodash": "lodash"
            }
        }`
};
export interface PostExecAction {
    readonly success: boolean;
    requestId: number;
    readonly packageNames: readonly string[];
    readonly callback: ts.server.typingsInstaller.RequestCompletedAction;
}

export function baselineTsserverLogs(scenario: string, subScenario: string, sessionOrService: { logger: Logger; }) {
    ts.Debug.assert(sessionOrService.logger.logs?.length); // Ensure caller used in memory logger
    Harness.Baseline.runBaseline(`tsserver/${scenario}/${subScenario.split(" ").join("-")}.js`, sessionOrService.logger.logs.join("\r\n"));
}

export function appendAllScriptInfos(session: TestSession) {
    session.logger.log("");
    session.logger.log(`ScriptInfos:`);
    session.getProjectService().filenameToScriptInfo.forEach(info => session.logger.log(`path: ${info.path} fileName: ${info.fileName}`));
    session.logger.log("");
}

function loggerToTypingsInstallerLog(logger: Logger): ts.server.typingsInstaller.Log | undefined {
    return logger?.loggingEnabled() ? {
        isEnabled: ts.returnTrue,
        writeLine: s => {
            // This is a VERY VERY NAIVE sanitization strategy.
            // If a substring containing the exact TypeScript version is found,
            // even if it's unrelated to TypeScript itself, then it will be replaced,
            // leaving us with two options:
            //
            //  1. Deal with flip-flopping baselines.
            //  2. Change the TypeScript version until no matching substring is found.
            //
            const initialLog = sanitizeLog(s);
            const pseudoSanitizedLog = replaceAll(initialLog, `@ts${ts.versionMajorMinor}`, `@tsFakeMajor.Minor`);
            return logger.log(`TI:: [${nowString(logger.host!)}] ${pseudoSanitizedLog}`);
        },
    } : undefined;
}

interface TypesRegistryFile {
    entries: ts.MapLike<ts.MapLike<string>>;
}

function loadTypesRegistryFile(typesRegistryFilePath: string, host: TestServerHost, log: ts.server.typingsInstaller.Log): Map<string, ts.MapLike<string>> {
    if (!host.fileExists(typesRegistryFilePath)) {
        if (log.isEnabled()) {
            log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
        }
        return new Map<string, ts.MapLike<string>>();
    }
    try {
        const content = JSON.parse(host.readFile(typesRegistryFilePath)!) as TypesRegistryFile;
        return new Map(Object.entries(content.entries));
    }
    catch (e) {
        if (log.isEnabled()) {
            log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(e as Error).message}, ${(e as Error).stack}`);
        }
        return new Map<string, ts.MapLike<string>>();
    }
}

const typesRegistryPackageName = "types-registry";
function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string {
    return ts.combinePaths(ts.normalizeSlashes(globalTypingsCacheLocation), `node_modules/${typesRegistryPackageName}/index.json`);
}

export class TestTypingsInstallerWorker extends ts.server.typingsInstaller.TypingsInstaller {
    readonly typesRegistry: Map<string, ts.MapLike<string>>;
    protected projectService!: ts.server.ProjectService;
    constructor(
        readonly globalTypingsCacheLocation: string,
        throttleLimit: number,
        installTypingHost: TestServerHost,
        logger: Logger,
        typesRegistry?: string | readonly string[],
    ) {
        const log = loggerToTypingsInstallerLog(logger);
        if (log?.isEnabled()) {
            patchHostTimeouts(
                changeToHostTrackingWrittenFiles(installTypingHost),
                logger
            );
            (installTypingHost as TestSessionAndServiceHost).baselineHost("TI:: Creating typing installer");
        }
        super(
            installTypingHost,
            globalTypingsCacheLocation,
            "/safeList.json" as ts.Path,
            customTypesMap.path,
            throttleLimit,
            log,
        );

        this.ensurePackageDirectoryExists(globalTypingsCacheLocation);

        if (this.log.isEnabled()) {
            this.log.writeLine(`Updating ${typesRegistryPackageName} npm package...`);
            this.log.writeLine(`npm install --ignore-scripts ${typesRegistryPackageName}@${this.latestDistTag}`);
        }
        installTypingHost.ensureFileOrFolder({
            path: getTypesRegistryFileLocation(globalTypingsCacheLocation),
            content: JSON.stringify(
                createTypesRegistryFileContent(typesRegistry ?
                    ts.isString(typesRegistry) ?
                        [typesRegistry] :
                        typesRegistry :
                    ts.emptyArray
                ),
                undefined,
                " ",
            )
        });
        if (this.log.isEnabled()) {
            this.log.writeLine(`TI:: Updated ${typesRegistryPackageName} npm package`);
        }
        this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation), installTypingHost, this.log);
        if (this.log.isEnabled()) {
            (installTypingHost as TestSessionAndServiceHost).baselineHost("TI:: typing installer creation complete");
        }
    }

    protected postExecActions: PostExecAction[] = [];

    executePendingCommands() {
        const actionsToRun = this.postExecActions;
        this.postExecActions = [];
        for (const action of actionsToRun) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`#${action.requestId} with arguments'${JSON.stringify(action.packageNames)}':: ${action.success}`);
            }
            action.callback(action.success);
        }
    }

    attach(projectService: ts.server.ProjectService) {
        this.projectService = projectService;
    }

    getInstallTypingHost() {
        return this.installTypingHost;
    }

    installWorker(requestId: number, packageNames: string[], _cwd: string, cb: ts.server.typingsInstaller.RequestCompletedAction): void {
        if (this.log.isEnabled()) {
            this.log.writeLine(`#${requestId} with arguments'${JSON.stringify(packageNames)}'.`);
        }
        this.addPostExecAction("success", requestId, packageNames, cb);
    }

    sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.WatchTypingLocations) {
        if (this.log.isEnabled()) {
            this.log.writeLine(`Sending response:\n    ${JSON.stringify(response)}`);
        }
        if (response.kind !== ActionWatchTypingLocations) this.projectService.updateTypingsForProject(response);
        else this.projectService.watchTypingLocations(response);
    }

    enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
        const request = ts.server.createInstallTypingsRequest(project, typeAcquisition, unresolvedImports, this.globalTypingsCacheLocation);
        this.install(request);
    }

    addPostExecAction(stdout: string | string[], requestId: number, packageNames: string[], cb: ts.server.typingsInstaller.RequestCompletedAction) {
        const out = ts.isString(stdout) ? stdout : createNpmPackageJsonString(stdout);
        const action: PostExecAction = {
            success: !!out,
            requestId,
            packageNames,
            callback: cb
        };
        this.postExecActions.push(action);
    }
}

export class TestTypingsInstaller<T extends TestTypingsInstallerWorker = TestTypingsInstallerWorker> implements ts.server.ITypingsInstaller {
    protected projectService!: ts.server.ProjectService;
    public installer!: T;
    constructor(
        readonly globalTypingsCacheLocation: string,
        private throttleLimit: number,
        private installTypingHost: TestServerHost,
        private logger: Logger,
        private workerConstructor?: new (...args: ConstructorParameters<typeof TestTypingsInstallerWorker>) => T,
        private typesRegistry?: string | readonly string[],
    ) {
    }

    isKnownTypesPackageName = ts.notImplemented;
    installPackage = ts.notImplemented;

    attach(projectService: ts.server.ProjectService) {
        this.projectService = projectService;
    }

    onProjectClosed(p: ts.server.Project) {
        this.installer?.closeProject({ projectName: p.getProjectName(), kind: "closeProject" });
    }

    enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
        if (!this.installer) {
            if (this.workerConstructor) {
                this.installer ??= new this.workerConstructor(this.globalTypingsCacheLocation, this.throttleLimit, this.installTypingHost, this.logger, this.typesRegistry);
            }
            else {
                this.installer = new TestTypingsInstallerWorker(this.globalTypingsCacheLocation, this.throttleLimit, this.installTypingHost, this.logger, this.typesRegistry) as T;
            }
            this.installer.attach(this.projectService);
        }
        this.installer.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
    }
}

function createNpmPackageJsonString(installedTypings: string[]): string {
    const dependencies: ts.MapLike<any> = {};
    for (const typing of installedTypings) {
        dependencies[typing] = "1.0.0";
    }
    return JSON.stringify({ dependencies });
}

function createTypesRegistryFileContent(list: readonly string[]): TypesRegistryFile {
    const versionMap = {
        "latest": "1.3.0",
        "ts2.0": "1.0.0",
        "ts2.1": "1.0.0",
        "ts2.2": "1.2.0",
        "ts2.3": "1.3.0",
        "ts2.4": "1.3.0",
        "ts2.5": "1.3.0",
        "ts2.6": "1.3.0",
        "ts2.7": "1.3.0"
    };
    const entries: ts.MapLike<ts.MapLike<string>> = {};
    for (const l of list) {
        entries[l] = versionMap;
    }
    return { entries };
}

export function createTypesRegistry(...list: string[]) {
    return new Map(Object.entries(createTypesRegistryFileContent(list).entries));
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
    logTimeoutQueueLength(): void;
};
function patchHostTimeouts(
    inputHost: TestServerHostTrackingWrittenFiles,
    logger: Logger,
) {
    const host = inputHost as TestSessionAndServiceHost;
    if (host.patched) return host;
    host.patched = true;
    if (!logger.hasLevel(ts.server.LogLevel.verbose)) {
        host.logTimeoutQueueLength = ts.notImplemented;
        host.baselineHost = ts.notImplemented;
        return host;
    }

    const originalRunQueuedTimeoutCallbacks = host.runQueuedTimeoutCallbacks;
    const originalRunQueuedImmediateCallbacks = host.runQueuedImmediateCallbacks;
    const originalSetTime = host.setTime;
    let hostDiff: ReturnType<TestServerHost["snap"]> | undefined;

    host.runQueuedTimeoutCallbacks = runQueuedTimeoutCallbacks;
    host.runQueuedImmediateCallbacks = runQueuedImmediateCallbacks;
    host.logTimeoutQueueLength = logTimeoutQueueLength;
    host.setTime = setTime;
    host.baselineHost = baselineHost;
    host.patched = true;
    return host;

    function setTime(time: number) {
        logger.log(`Host is moving to new time`);
        return originalSetTime.call(host, time);
    }

    function logTimeoutQueueLength() {
        logger.log(host.timeoutCallbacks.log());
        host.baselineHost(host.immediateCallbacks.log());
    }

    function runQueuedTimeoutCallbacks(timeoutId?: number) {
        host.baselineHost(`Before running ${host.timeoutCallbacks.log()}`);
        if (timeoutId !== undefined) logger.log(`Invoking ${host.timeoutCallbacks.callbackType} callback:: timeoutId:: ${timeoutId}:: ${host.timeoutCallbacks.map[timeoutId].args[0]}`);
        originalRunQueuedTimeoutCallbacks.call(host, timeoutId);
        host.baselineHost(`After running ${host.timeoutCallbacks.log()}`);
    }

    function runQueuedImmediateCallbacks() {
        host.baselineHost(`Before running ${host.immediateCallbacks.log()}`);
        originalRunQueuedImmediateCallbacks.call(host);
        host.baselineHost(`After running ${host.immediateCallbacks.log()}`);
    }

    function baselineHost(title: string) {
        logger.log(title);
        ts.Debug.assertIsDefined(logger.logs);
        host.diff(logger.logs, hostDiff);
        host.serializeWatches(logger.logs);
        hostDiff = host.snap();
        host.writtenFiles.clear();
    }
}

export interface TestSessionOptions extends ts.server.SessionOptions {
    logger: Logger;
    allowNonBaseliningLogger?: boolean;
}

export type TestSessionRequest<T extends ts.server.protocol.Request> = Pick<T, "command" | "arguments">;
export class TestSession extends ts.server.Session {
    private seq = 0;
    public testhost: TestSessionAndServiceHost;
    public override logger: Logger;

    constructor(opts: TestSessionOptions) {
        super(opts);
        this.logger = opts.logger;
        ts.Debug.assert(opts.allowNonBaseliningLogger || this.logger.hasLevel(ts.server.LogLevel.verbose), "Use Baselining logger and baseline tsserver log or create using allowNonBaseliningLogger");
        this.testhost = patchHostTimeouts(
            changeToHostTrackingWrittenFiles(this.host as TestServerHost),
            this.logger
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
            this.testhost.baselineHost("Before request");
            this.logger.info(`request:${ts.server.indent(JSON.stringify(request, undefined, 2))}`);
        }
        const response = super.executeCommand(request);
        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
            this.logger.info(`response:${ts.server.indent(JSON.stringify(response.response === ts.getSupportedCodeFixes() ? { ...response, response: "ts.getSupportedCodeFixes()" } : response, undefined, 2))}`);
            this.testhost.baselineHost("After request");
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

export function createSession(host: TestServerHost, opts: Partial<TestSessionOptions> = {}) {
    const logger = opts.logger || createHasErrorMessageLogger();
    if (opts.typingsInstaller === undefined) {
        opts.typingsInstaller = new TestTypingsInstaller(host.getHostSpecificPath("/a/data/"), /*throttleLimit*/ 5, host, logger);
    }

    if (opts.eventHandler !== undefined) {
        opts.canUseEvents = true;
    }

    const sessionOptions: TestSessionOptions = {
        host,
        cancellationToken: ts.server.nullCancellationToken,
        useSingleInferredProject: false,
        useInferredProjectPerProjectRoot: false,
        typingsInstaller: undefined!, // TODO: GH#18217
        byteLength: Buffer.byteLength,
        hrtime: process.hrtime,
        logger,
        canUseEvents: false,
        incrementalVerifier,
    };

    return new TestSession({ ...sessionOptions, ...opts });
}

export function createSessionWithCustomEventHandler(host: TestServerHost, opts?: Partial<TestSessionOptions>) {
    const session = createSession(host, { eventHandler, logger: createLoggerWithInMemoryLogs(host), ...opts });
    return session;
    function eventHandler(event: ts.server.ProjectServiceEvent) {
        let data = event.data as any;
        switch (event.eventName) {
            // No change to data
            case ts.server.ProjectsUpdatedInBackgroundEvent:
            case ts.server.LargeFileReferencedEvent:
            case ts.server.ProjectInfoTelemetryEvent:
            case ts.server.OpenFileInfoTelemetryEvent:
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
    }
}

export interface TestProjectServiceOptions extends ts.server.ProjectServiceOptions {
    logger: Logger;
    allowNonBaseliningLogger?: boolean;
}

export class TestProjectService extends ts.server.ProjectService {
    public testhost: TestSessionAndServiceHost;
    constructor(host: TestServerHost, public override logger: Logger, cancellationToken: ts.HostCancellationToken, useSingleInferredProject: boolean,
        typingsInstaller: ts.server.ITypingsInstaller, opts: Partial<TestProjectServiceOptions> = {}) {
        super({
            host,
            logger,
            session: undefined,
            cancellationToken,
            useSingleInferredProject,
            useInferredProjectPerProjectRoot: false,
            typingsInstaller,
            typesMapLocation: customTypesMap.path,
            incrementalVerifier,
            ...opts
        });
        ts.Debug.assert(opts.allowNonBaseliningLogger || this.logger.hasLevel(ts.server.LogLevel.verbose), "Use Baselining logger and baseline tsserver log or create using allowNonBaseliningLogger");
        this.testhost = patchHostTimeouts(
            changeToHostTrackingWrittenFiles(this.host as TestServerHost),
            this.logger
        );
        if (logger.hasLevel(ts.server.LogLevel.verbose)) this.testhost.baselineHost("Creating project service");
    }
}

export function createProjectService(host: TestServerHost, options?: Partial<TestProjectServiceOptions>) {
    const cancellationToken = options?.cancellationToken || ts.server.nullCancellationToken;
    const logger = options?.logger || createHasErrorMessageLogger();
    const useSingleInferredProject = options?.useSingleInferredProject !== undefined ? options.useSingleInferredProject : false;
    return new TestProjectService(host, logger, cancellationToken, useSingleInferredProject, options?.typingsInstaller || ts.server.nullTypingsInstaller, options);
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

    constructor(private logger: Logger, private cancelAfterRequest = 0) {
    }

    setRequest(requestId: number) {
        this.currentId = requestId;
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

export function openFilesForSession(files: readonly (string | File | {
    readonly file: File | string,
    readonly projectRootPath?: string,
    content?: string,
    scriptKindName?: ts.server.protocol.ScriptKindName,
})[], session: TestSession): void {
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
                    { file: file.path }
        });
    }
}

export function closeFilesForSession(files: readonly (File | string)[], session: TestSession): void {
    for (const file of files) {
        session.executeCommandSeq<ts.server.protocol.CloseRequest>({
            command: ts.server.protocol.CommandTypes.Close,
            arguments: { file: ts.isString(file) ? file : file.path }
        });
    }
}

export function openExternalProjectForSession(project: ts.server.protocol.ExternalProject, session: TestSession) {
    session.executeCommandSeq<ts.server.protocol.OpenExternalProjectRequest>({
        command: ts.server.protocol.CommandTypes.OpenExternalProject,
        arguments: project
    });
}

export function openExternalProjectsForSession(projects: ts.server.protocol.ExternalProject[], session: TestSession) {
    session.executeCommandSeq<ts.server.protocol.OpenExternalProjectsRequest>({
        command: ts.server.protocol.CommandTypes.OpenExternalProjects,
        arguments: { projects }
    });
}

export function setCompilerOptionsForInferredProjectsRequestForSession(
    options: ts.server.protocol.InferredProjectCompilerOptions | ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs,
    session: TestSession
) {
    session.executeCommandSeq<ts.server.protocol.SetCompilerOptionsForInferredProjectsRequest>({
        command: ts.server.protocol.CommandTypes.CompilerOptionsForInferredProjects,
        arguments: "options" in options ? // eslint-disable-line local/no-in-operator
            options as ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs :
            { options }
    });
}

export function logDiagnostics(sessionOrService: TestSession | TestProjectService, diagnosticsType: string, project: ts.server.Project, diagnostics: readonly ts.Diagnostic[]) {
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
        arguments: { delay: 0, files: files.map(filePath) }
    });
    checkAllErrors(request);
}

interface SkipErrors { semantic?: true; suggestion?: true }
export interface CheckAllErrors extends VerifyGetErrRequestBase {
    files: readonly any[];
    skip?: readonly (SkipErrors | undefined)[];
}
function checkAllErrors({ session, existingTimeouts, files, skip }: CheckAllErrors) {
    ts.Debug.assert(session.logger.logs?.length);
    for (let i = 0; i < files.length; i++) {
        session.testhost.runQueuedTimeoutCallbacks(existingTimeouts ? session.testhost.getNextTimeoutId() - 1 : undefined);
        if (!skip?.[i]?.semantic) session.testhost.runQueuedImmediateCallbacks();
        if (!skip?.[i]?.suggestion) session.testhost.runQueuedImmediateCallbacks();
    }
}

function filePath(file: string | File) {
    return ts.isString(file) ? file : file.path;
}

function verifyErrorsUsingGeterr({scenario, subScenario, allFiles, openFiles, getErrRequest }: VerifyGetErrScenario) {
    it("verifies the errors in open file", () => {
        const host = createServerHost([...allFiles(), libFile]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession(openFiles(), session);

        verifyGetErrRequest({ session, files: getErrRequest() });
        baselineTsserverLogs(scenario, `${subScenario} getErr`, session);
    });
}

function verifyErrorsUsingGeterrForProject({ scenario, subScenario, allFiles, openFiles, getErrForProjectRequest }: VerifyGetErrScenario) {
    it("verifies the errors in projects", () => {
        const host = createServerHost([...allFiles(), libFile]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession(openFiles(), session);

        for (const expected of getErrForProjectRequest()) {
            session.executeCommandSeq<ts.server.protocol.GeterrForProjectRequest>({
                command: ts.server.protocol.CommandTypes.GeterrForProject,
                arguments: { delay: 0, file: filePath(expected.project) }
            });
            checkAllErrors({ session, files: expected.files });
        }
        baselineTsserverLogs(scenario, `${subScenario} geterrForProject`, session);
    });
}

function verifyErrorsUsingSyncMethods({ scenario, subScenario, allFiles, openFiles, syncDiagnostics }: VerifyGetErrScenario) {
    it("verifies the errors using sync commands", () => {
        const host = createServerHost([...allFiles(), libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession(openFiles(), session);
        for (const { file, project } of syncDiagnostics()) {
            const reqArgs = { file: filePath(file), projectFileName: project && filePath(project) };
            session.executeCommandSeq<ts.server.protocol.SyntacticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SyntacticDiagnosticsSync,
                arguments: reqArgs
            });
            session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                arguments: reqArgs
            });
            session.executeCommandSeq<ts.server.protocol.SuggestionDiagnosticsSyncRequest>({
                command: ts.server.protocol.CommandTypes.SuggestionDiagnosticsSync,
                arguments: reqArgs
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

export function verifyDynamic(service: ts.server.ProjectService, path: string) {
    (service.logger as Logger).log(`${path} isDynamic:: ${service.filenameToScriptInfo.get(path)!.isDynamic}`);
}

export function createHostWithSolutionBuild(files: readonly FileOrFolderOrSymLink[], rootNames: readonly string[]) {
    const host = createServerHost(files);
    // ts build should succeed
    ensureErrorFreeBuild(host, rootNames);
    return host;
}

export function logInferredProjectsOrphanStatus(projectService: ts.server.ProjectService) {
    projectService.inferredProjects.forEach(inferredProject => (projectService.logger as Logger).log(`Inferred project: ${inferredProject.projectName} isOrphan:: ${inferredProject.isOrphan()} isClosed: ${inferredProject.isClosed()}`));
}

export function logConfiguredProjectsHasOpenRefStatus(projectService: ts.server.ProjectService) {
    projectService.configuredProjects.forEach(configuredProject => (projectService.logger as Logger).log(`Configured project: ${configuredProject.projectName} hasOpenRef:: ${configuredProject.hasOpenRef()} isClosed: ${configuredProject.isClosed()}`));
}
