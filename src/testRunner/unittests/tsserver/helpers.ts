namespace ts.projectSystem {
    export import TI = server.typingsInstaller;
    export import protocol = server.protocol;
    export import CommandNames = server.CommandNames;

    export import TestServerHost = TestFSWithWatch.TestServerHost;
    export type File = TestFSWithWatch.File;
    export type SymLink = TestFSWithWatch.SymLink;
    export type Folder = TestFSWithWatch.Folder;
    export import createServerHost = TestFSWithWatch.createServerHost;
    export import checkArray = TestFSWithWatch.checkArray;
    export import libFile = TestFSWithWatch.libFile;
    export import checkWatchedFiles = TestFSWithWatch.checkWatchedFiles;
    export import checkWatchedFilesDetailed = TestFSWithWatch.checkWatchedFilesDetailed;
    export import checkWatchedDirectories = TestFSWithWatch.checkWatchedDirectories;
    export import checkWatchedDirectoriesDetailed = TestFSWithWatch.checkWatchedDirectoriesDetailed;

    export import commonFile1 = tscWatch.commonFile1;
    export import commonFile2 = tscWatch.commonFile2;

    const outputEventRegex = /Content\-Length: [\d]+\r\n\r\n/;
    export function mapOutputToJson(s: string) {
        return convertToObject(
            parseJsonText("json.json", s.replace(outputEventRegex, "")),
            []
        );
    }

    export const customTypesMap = {
        path: <Path>"/typesMap.json",
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
        readonly callback: TI.RequestCompletedAction;
    }

    export const nullLogger: server.Logger = {
        close: noop,
        hasLevel: returnFalse,
        loggingEnabled: returnFalse,
        perftrc: noop,
        info: noop,
        msg: noop,
        startGroup: noop,
        endGroup: noop,
        getLogFileName: returnUndefined,
    };

    export function createHasErrorMessageLogger() {
        let hasErrorMsg = false;
        const { close, hasLevel, loggingEnabled, startGroup, endGroup, info, getLogFileName, perftrc } = nullLogger;
        const logger: server.Logger = {
            close, hasLevel, loggingEnabled, startGroup, endGroup, info, getLogFileName, perftrc,
            msg: (s, type) => {
                Debug.fail(`Error: ${s}, type: ${type}`);
                hasErrorMsg = true;
            }
        };
        return { logger, hasErrorMsg: () => hasErrorMsg };
    }

    export function createLoggerWritingToConsole(): server.Logger {
        const { close, startGroup, endGroup, getLogFileName } = nullLogger;
        return {
            close,
            hasLevel: returnTrue,
            loggingEnabled: returnTrue,
            perftrc: s => console.log(s),
            info: s => console.log(s),
            msg: (s, type) => console.log(`${type}:: ${s}`),
            startGroup,
            endGroup,
            getLogFileName
        };
    }

    export class TestTypingsInstaller extends TI.TypingsInstaller implements server.ITypingsInstaller {
        protected projectService!: server.ProjectService;
        constructor(
            readonly globalTypingsCacheLocation: string,
            throttleLimit: number,
            installTypingHost: server.ServerHost,
            readonly typesRegistry = new Map<string, MapLike<string>>(),
            log?: TI.Log) {
            super(installTypingHost, globalTypingsCacheLocation, TestFSWithWatch.safeList.path, customTypesMap.path, throttleLimit, log);
        }

        protected postExecActions: PostExecAction[] = [];

        isKnownTypesPackageName = notImplemented;
        installPackage = notImplemented;
        inspectValue = notImplemented;

        executePendingCommands() {
            const actionsToRun = this.postExecActions;
            this.postExecActions = [];
            for (const action of actionsToRun) {
                action.callback(action.success);
            }
        }

        checkPendingCommands(expectedCount: number) {
            assert.equal(this.postExecActions.length, expectedCount, `Expected ${expectedCount} post install actions`);
        }

        onProjectClosed = noop;

        attach(projectService: server.ProjectService) {
            this.projectService = projectService;
        }

        getInstallTypingHost() {
            return this.installTypingHost;
        }

        installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
            this.addPostExecAction("success", cb);
        }

        sendResponse(response: server.SetTypings | server.InvalidateCachedTypings) {
            this.projectService.updateTypingsForProject(response);
        }

        enqueueInstallTypingsRequest(project: server.Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>) {
            const request = server.createInstallTypingsRequest(project, typeAcquisition, unresolvedImports, this.globalTypingsCacheLocation);
            this.install(request);
        }

        addPostExecAction(stdout: string | string[], cb: TI.RequestCompletedAction) {
            const out = isString(stdout) ? stdout : createNpmPackageJsonString(stdout);
            const action: PostExecAction = {
                success: !!out,
                callback: cb
            };
            this.postExecActions.push(action);
        }
    }

    function createNpmPackageJsonString(installedTypings: string[]): string {
        const dependencies: MapLike<any> = {};
        for (const typing of installedTypings) {
            dependencies[typing] = "1.0.0";
        }
        return JSON.stringify({ dependencies });
    }

    export function createTypesRegistry(...list: string[]): Map<string, MapLike<string>> {
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
        const map = new Map<string, MapLike<string>>();
        for (const l of list) {
            map.set(l, versionMap);
        }
        return map;
    }

    export function toExternalFile(fileName: string): protocol.ExternalFile {
        return { fileName };
    }

    export function toExternalFiles(fileNames: string[]) {
        return map(fileNames, toExternalFile);
    }

    export function fileStats(nonZeroStats: Partial<server.FileStats>): server.FileStats {
        return { ts: 0, tsSize: 0, tsx: 0, tsxSize: 0, dts: 0, dtsSize: 0, js: 0, jsSize: 0, jsx: 0, jsxSize: 0, deferred: 0, deferredSize: 0, ...nonZeroStats };
    }

    export interface ConfigFileDiagnostic {
        fileName: string | undefined;
        start: number | undefined;
        length: number | undefined;
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        reportsUnnecessary?: {};
        reportsDeprecated?: {};
        source?: string;
        relatedInformation?: DiagnosticRelatedInformation[];
    }

    export class TestServerEventManager {
        private events: server.ProjectServiceEvent[] = [];
        readonly session: TestSession;
        readonly service: server.ProjectService;
        readonly host: TestServerHost;
        constructor(files: File[], suppressDiagnosticEvents?: boolean) {
            this.host = createServerHost(files);
            this.session = createSession(this.host, {
                canUseEvents: true,
                eventHandler: event => this.events.push(event),
                suppressDiagnosticEvents,
            });
            this.service = this.session.getProjectService();
        }

        getEvents(): readonly server.ProjectServiceEvent[] {
            const events = this.events;
            this.events = [];
            return events;
        }

        getEvent<T extends server.ProjectServiceEvent>(eventName: T["eventName"]): T["data"] {
            let eventData: T["data"] | undefined;
            filterMutate(this.events, e => {
                if (e.eventName === eventName) {
                    if (eventData !== undefined) {
                        assert(false, "more than one event found");
                    }
                    eventData = e.data;
                    return false;
                }
                return true;
            });
            return Debug.checkDefined(eventData);
        }

        hasZeroEvent<T extends server.ProjectServiceEvent>(eventName: T["eventName"]) {
            this.events.forEach(event => assert.notEqual(event.eventName, eventName));
        }

        checkSingleConfigFileDiagEvent(configFileName: string, triggerFile: string, errors: readonly ConfigFileDiagnostic[]) {
            const eventData = this.getEvent<server.ConfigFileDiagEvent>(server.ConfigFileDiagEvent);
            assert.equal(eventData.configFileName, configFileName);
            assert.equal(eventData.triggerFile, triggerFile);
            const actual = eventData.diagnostics.map(({ file, messageText, ...rest }) => ({ fileName: file && file.fileName, messageText: isString(messageText) ? messageText : "", ...rest }));
            if (errors) {
                assert.deepEqual(actual, errors);
            }
        }

        assertProjectInfoTelemetryEvent(partial: Partial<server.ProjectInfoTelemetryEventData>, configFile = "/tsconfig.json"): void {
            assert.deepEqual<server.ProjectInfoTelemetryEventData>(this.getEvent<server.ProjectInfoTelemetryEvent>(server.ProjectInfoTelemetryEvent), {
                projectId: sys.createSHA256Hash!(configFile),
                fileStats: fileStats({ ts: 1 }),
                compilerOptions: {},
                extends: false,
                files: false,
                include: false,
                exclude: false,
                compileOnSave: false,
                typeAcquisition: {
                    enable: false,
                    exclude: false,
                    include: false,
                },
                configFileName: "tsconfig.json",
                projectType: "configured",
                languageServiceEnabled: true,
                version: ts.version, // eslint-disable-line @typescript-eslint/no-unnecessary-qualifier
                ...partial,
            });
        }

        assertOpenFileTelemetryEvent(info: server.OpenFileInfo): void {
            assert.deepEqual<server.OpenFileInfoTelemetryEventData>(this.getEvent<server.OpenFileInfoTelemetryEvent>(server.OpenFileInfoTelemetryEvent), { info });
        }
        assertNoOpenFilesTelemetryEvent(): void {
            this.hasZeroEvent<server.OpenFileInfoTelemetryEvent>(server.OpenFileInfoTelemetryEvent);
        }
    }

    export class TestSession extends server.Session {
        private seq = 0;
        public events: protocol.Event[] = [];
        public testhost: TestServerHost = this.host as TestServerHost;

        getProjectService() {
            return this.projectService;
        }

        public getSeq() {
            return this.seq;
        }

        public getNextSeq() {
            return this.seq + 1;
        }

        public executeCommandSeq<T extends server.protocol.Request>(request: Partial<T>) {
            this.seq++;
            request.seq = this.seq;
            request.type = "request";
            return this.executeCommand(<T>request);
        }

        public event<T extends object>(body: T, eventName: string) {
            this.events.push(server.toEvent(eventName, body));
            super.event(body, eventName);
        }

        public clearMessages() {
            clear(this.events);
            this.testhost.clearOutput();
        }
    }

    export function createSession(host: server.ServerHost, opts: Partial<server.SessionOptions> = {}) {
        if (opts.typingsInstaller === undefined) {
            opts.typingsInstaller = new TestTypingsInstaller("/a/data/", /*throttleLimit*/ 5, host);
        }

        if (opts.eventHandler !== undefined) {
            opts.canUseEvents = true;
        }

        const sessionOptions: server.SessionOptions = {
            host,
            cancellationToken: server.nullCancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            typingsInstaller: undefined!, // TODO: GH#18217
            byteLength: Utils.byteLength,
            hrtime: process.hrtime,
            logger: opts.logger || createHasErrorMessageLogger().logger,
            canUseEvents: false
        };

        return new TestSession({ ...sessionOptions, ...opts });
    }

    export function createSessionWithEventTracking<T extends server.ProjectServiceEvent>(host: server.ServerHost, eventName: T["eventName"], ...eventNames: T["eventName"][]) {
        const events: T[] = [];
        const session = createSession(host, {
            eventHandler: e => {
                if (e.eventName === eventName || eventNames.some(eventName => e.eventName === eventName)) {
                    events.push(e as T);
                }
            }
        });

        return { session, events };
    }

    export function createSessionWithDefaultEventHandler<T extends protocol.AnyEvent>(host: TestServerHost, eventNames: T["event"] | T["event"][], opts: Partial<server.SessionOptions> = {}) {
        const session = createSession(host, { canUseEvents: true, ...opts });

        return {
            session,
            getEvents,
            clearEvents
        };

        function getEvents() {
            return mapDefined(host.getOutput(), s => {
                const e = mapOutputToJson(s);
                return (isArray(eventNames) ? eventNames.some(eventName => e.event === eventName) : e.event === eventNames) ? e as T : undefined;
            });
        }

        function clearEvents() {
            session.clearMessages();
        }
    }

    export interface CreateProjectServiceParameters {
        cancellationToken?: HostCancellationToken;
        logger?: server.Logger;
        useSingleInferredProject?: boolean;
        typingsInstaller?: server.ITypingsInstaller;
        eventHandler?: server.ProjectServiceEventHandler;
    }

    export class TestProjectService extends server.ProjectService {
        constructor(host: server.ServerHost, logger: server.Logger, cancellationToken: HostCancellationToken, useSingleInferredProject: boolean,
            typingsInstaller: server.ITypingsInstaller, eventHandler: server.ProjectServiceEventHandler, opts: Partial<server.ProjectServiceOptions> = {}) {
            super({
                host,
                logger,
                cancellationToken,
                useSingleInferredProject,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller,
                typesMapLocation: customTypesMap.path,
                eventHandler,
                ...opts
            });
        }

        checkNumberOfProjects(count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
            checkNumberOfProjects(this, count);
        }
    }
    export function createProjectService(host: server.ServerHost, parameters: CreateProjectServiceParameters = {}, options?: Partial<server.ProjectServiceOptions>) {
        const cancellationToken = parameters.cancellationToken || server.nullCancellationToken;
        const logger = parameters.logger || createHasErrorMessageLogger().logger;
        const useSingleInferredProject = parameters.useSingleInferredProject !== undefined ? parameters.useSingleInferredProject : false;
        return new TestProjectService(host, logger, cancellationToken, useSingleInferredProject, parameters.typingsInstaller!, parameters.eventHandler!, options); // TODO: GH#18217
    }

    export function checkNumberOfConfiguredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.configuredProjects.size, expected, `expected ${expected} configured project(s)`);
    }

    export function checkNumberOfExternalProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.externalProjects.length, expected, `expected ${expected} external project(s)`);
    }

    export function checkNumberOfInferredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.inferredProjects.length, expected, `expected ${expected} inferred project(s)`);
    }

    export function checkNumberOfProjects(projectService: server.ProjectService, count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
        checkNumberOfConfiguredProjects(projectService, count.configuredProjects || 0);
        checkNumberOfExternalProjects(projectService, count.externalProjects || 0);
        checkNumberOfInferredProjects(projectService, count.inferredProjects || 0);
    }

    export function configuredProjectAt(projectService: server.ProjectService, index: number) {
        const values = projectService.configuredProjects.values();
        while (index > 0) {
            const iterResult = values.next();
            if (iterResult.done) return Debug.fail("Expected a result.");
            index--;
        }
        const iterResult = values.next();
        if (iterResult.done) return Debug.fail("Expected a result.");
        return iterResult.value;
    }

    export function checkProjectActualFiles(project: server.Project, expectedFiles: readonly string[]) {
        checkArray(`${server.ProjectKind[project.projectKind]} project, actual files`, project.getFileNames(), expectedFiles);
    }

    export function checkProjectRootFiles(project: server.Project, expectedFiles: readonly string[]) {
        checkArray(`${server.ProjectKind[project.projectKind]} project, rootFileNames`, project.getRootFiles(), expectedFiles);
    }

    export function mapCombinedPathsInAncestor(dir: string, path2: string, mapAncestor: (ancestor: string) => boolean) {
        dir = normalizePath(dir);
        const result: string[] = [];
        forEachAncestorDirectory(dir, ancestor => {
            if (mapAncestor(ancestor)) {
                result.push(combinePaths(ancestor, path2));
            }
        });
        return result;
    }

    export function getRootsToWatchWithAncestorDirectory(dir: string, path2: string) {
        return mapCombinedPathsInAncestor(dir, path2, ancestor => ancestor.split(directorySeparator).length > 4);
    }

    export const nodeModules = "node_modules";
    export function getNodeModuleDirectories(dir: string) {
        return getRootsToWatchWithAncestorDirectory(dir, nodeModules);
    }

    export const nodeModulesAtTypes = "node_modules/@types";
    export function getTypeRootsFromLocation(currentDirectory: string) {
        return getRootsToWatchWithAncestorDirectory(currentDirectory, nodeModulesAtTypes);
    }

    export function getConfigFilesToWatch(folder: string) {
        return [
            ...getRootsToWatchWithAncestorDirectory(folder, "tsconfig.json"),
            ...getRootsToWatchWithAncestorDirectory(folder, "jsconfig.json")
        ];
    }

    export function checkOpenFiles(projectService: server.ProjectService, expectedFiles: File[]) {
        checkArray("Open files", arrayFrom(projectService.openFiles.keys(), path => projectService.getScriptInfoForPath(path)!.fileName), expectedFiles.map(file => file.path));
    }

    export function checkScriptInfos(projectService: server.ProjectService, expectedFiles: readonly string[], additionInfo?: string) {
        checkArray(`ScriptInfos files: ${additionInfo || ""}`, arrayFrom(projectService.filenameToScriptInfo.values(), info => info.fileName), expectedFiles);
    }

    export function protocolLocationFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): protocol.Location {
        const start = nthIndexOf(str, substring, options ? options.index : 0);
        Debug.assert(start !== -1);
        return protocolToLocation(str)(start);
    }

    export function protocolToLocation(text: string): (pos: number) => protocol.Location {
        const lineStarts = computeLineStarts(text);
        return pos => {
            const x = computeLineAndCharacterOfPosition(lineStarts, pos);
            return { line: x.line + 1, offset: x.character + 1 };
        };
    }

    export function protocolTextSpanFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): protocol.TextSpan {
        const span = textSpanFromSubstring(str, substring, options);
        const toLocation = protocolToLocation(str);
        return { start: toLocation(span.start), end: toLocation(textSpanEnd(span)) };
    }

    export interface DocumentSpanFromSubstring {
        file: File;
        text: string;
        options?: SpanFromSubstringOptions;
        contextText?: string;
        contextOptions?: SpanFromSubstringOptions;
    }
    export function protocolFileSpanFromSubstring({ file, text, options }: DocumentSpanFromSubstring): protocol.FileSpan {
        return { file: file.path, ...protocolTextSpanFromSubstring(file.content, text, options) };
    }

    interface FileSpanWithContextFromSubString {
        file: File;
        text: string;
        options?: SpanFromSubstringOptions;
        contextText?: string;
        contextOptions?: SpanFromSubstringOptions;
    }
    export function protocolFileSpanWithContextFromSubstring({ contextText, contextOptions, ...rest }: FileSpanWithContextFromSubString): protocol.FileSpanWithContext {
        const result = protocolFileSpanFromSubstring(rest);
        const contextSpan = contextText !== undefined ?
            protocolFileSpanFromSubstring({ file: rest.file, text: contextText, options: contextOptions }) :
            undefined;
        return contextSpan ?
            {
                ...result,
                contextStart: contextSpan.start,
                contextEnd: contextSpan.end
            } :
            result;
    }

    export interface ProtocolTextSpanWithContextFromString {
        fileText: string;
        text: string;
        options?: SpanFromSubstringOptions;
        contextText?: string;
        contextOptions?: SpanFromSubstringOptions;
    }
    export function protocolTextSpanWithContextFromSubstring({ fileText, text, options, contextText, contextOptions }: ProtocolTextSpanWithContextFromString): protocol.TextSpanWithContext {
        const span = textSpanFromSubstring(fileText, text, options);
        const toLocation = protocolToLocation(fileText);
        const contextSpan = contextText !== undefined ? textSpanFromSubstring(fileText, contextText, contextOptions) : undefined;
        return {
            start: toLocation(span.start),
            end: toLocation(textSpanEnd(span)),
            ...contextSpan && {
                contextStart: toLocation(contextSpan.start),
                contextEnd: toLocation(textSpanEnd(contextSpan))
            }
        };
    }

    export interface ProtocolRenameSpanFromSubstring extends ProtocolTextSpanWithContextFromString {
        prefixSuffixText?: {
            readonly prefixText?: string;
            readonly suffixText?: string;
        };
    }
    export function protocolRenameSpanFromSubstring({ prefixSuffixText, ...rest }: ProtocolRenameSpanFromSubstring): protocol.RenameTextSpan {
        return {
            ...protocolTextSpanWithContextFromSubstring(rest),
            ...prefixSuffixText
        };
    }

    export function textSpanFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): TextSpan {
        const start = nthIndexOf(str, substring, options ? options.index : 0);
        Debug.assert(start !== -1);
        return createTextSpan(start, substring.length);
    }

    export function protocolFileLocationFromSubstring(file: File, substring: string, options?: SpanFromSubstringOptions): protocol.FileLocationRequestArgs {
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
    export class TestServerCancellationToken implements server.ServerCancellationToken {
        private currentId: number | undefined = -1;
        private requestToCancel = -1;
        private isCancellationRequestedCount = 0;

        constructor(private cancelAfterRequest = 0) {
        }

        setRequest(requestId: number) {
            this.currentId = requestId;
        }

        setRequestToCancel(requestId: number) {
            this.resetToken();
            this.requestToCancel = requestId;
        }

        resetRequest(requestId: number) {
            assert.equal(requestId, this.currentId, "unexpected request id in cancellation");
            this.currentId = undefined;
        }

        isCancellationRequested() {
            this.isCancellationRequestedCount++;
            // If the request id is the request to cancel and isCancellationRequestedCount
            // has been met then cancel the request. Ex: cancel the request if it is a
            // nav bar request & isCancellationRequested() has already been called three times.
            return this.requestToCancel === this.currentId && this.isCancellationRequestedCount >= this.cancelAfterRequest;
        }

        resetToken() {
            this.currentId = -1;
            this.isCancellationRequestedCount = 0;
            this.requestToCancel = -1;
        }
    }

    export function makeSessionRequest<T>(command: string, args: T): protocol.Request {
        return {
            seq: 0,
            type: "request",
            command,
            arguments: args
        };
    }

    export function executeSessionRequest<TRequest extends protocol.Request, TResponse extends protocol.Response>(session: server.Session, command: TRequest["command"], args: TRequest["arguments"]): TResponse["body"] {
        return session.executeCommand(makeSessionRequest(command, args)).response as TResponse["body"];
    }

    export function executeSessionRequestNoResponse<TRequest extends protocol.Request>(session: server.Session, command: TRequest["command"], args: TRequest["arguments"]): void {
        session.executeCommand(makeSessionRequest(command, args));
    }

    export function openFilesForSession(files: readonly (File | { readonly file: File | string, readonly projectRootPath: string, content?: string })[], session: server.Session): void {
        for (const file of files) {
            session.executeCommand(makeSessionRequest<protocol.OpenRequestArgs>(CommandNames.Open,
                "projectRootPath" in file ? { file: typeof file.file === "string" ? file.file : file.file.path, projectRootPath: file.projectRootPath } : { file: file.path })); // eslint-disable-line no-in-operator
        }
    }

    export function closeFilesForSession(files: readonly File[], session: server.Session): void {
        for (const file of files) {
            session.executeCommand(makeSessionRequest<protocol.FileRequestArgs>(CommandNames.Close, { file: file.path }));
        }
    }

    export interface ErrorInformation {
        diagnosticMessage: DiagnosticMessage;
        errorTextArguments?: string[];
    }

    function getProtocolDiagnosticMessage({ diagnosticMessage, errorTextArguments = [] }: ErrorInformation) {
        return formatStringFromArgs(diagnosticMessage.message, errorTextArguments);
    }

    export function verifyDiagnostics(actual: readonly server.protocol.Diagnostic[], expected: readonly ErrorInformation[]) {
        const expectedErrors = expected.map(getProtocolDiagnosticMessage);
        assert.deepEqual(actual.map(diag => flattenDiagnosticMessageText(diag.text, "\n")), expectedErrors);
    }

    export function verifyNoDiagnostics(actual: server.protocol.Diagnostic[]) {
        verifyDiagnostics(actual, []);
    }

    export function checkErrorMessage(session: TestSession, eventName: protocol.DiagnosticEventKind, diagnostics: protocol.DiagnosticEventBody, isMostRecent = false): void {
        checkNthEvent(session, server.toEvent(eventName, diagnostics), 0, isMostRecent);
    }

    export function createDiagnostic(start: protocol.Location, end: protocol.Location, message: DiagnosticMessage, args: readonly string[] = [], category = diagnosticCategoryName(message), reportsUnnecessary?: {}, relatedInformation?: protocol.DiagnosticRelatedInformation[], reportsDeprecated?: {}): protocol.Diagnostic {
        return { start, end, text: formatStringFromArgs(message.message, args), code: message.code, category, reportsUnnecessary, reportsDeprecated, relatedInformation, source: undefined };
    }

    export function checkCompleteEvent(session: TestSession, numberOfCurrentEvents: number, expectedSequenceId: number, isMostRecent = true): void {
        checkNthEvent(session, server.toEvent("requestCompleted", { request_seq: expectedSequenceId }), numberOfCurrentEvents - 1, isMostRecent);
    }

    export function checkProjectUpdatedInBackgroundEvent(session: TestSession, openFiles: string[]) {
        checkNthEvent(session, server.toEvent("projectsUpdatedInBackground", { openFiles }), 0, /*isMostRecent*/ true);
    }

    export function checkNoDiagnosticEvents(session: TestSession) {
        for (const event of session.events) {
            assert.isFalse(event.event.endsWith("Diag"), JSON.stringify(event));
        }
    }
    export function projectLoadingStartEvent(projectName: string, reason: string, seq?: number): protocol.ProjectLoadingStartEvent {
        return {
            seq: seq || 0,
            type: "event",
            event: server.ProjectLoadingStartEvent,
            body: { projectName, reason }
        };
    }

    export function projectLoadingFinishEvent(projectName: string, seq?: number): protocol.ProjectLoadingFinishEvent {
        return {
            seq: seq || 0,
            type: "event",
            event: server.ProjectLoadingFinishEvent,
            body: { projectName }
        };
    }

    export function projectInfoTelemetryEvent(seq?: number): protocol.TelemetryEvent {
        return telemetryEvent(server.ProjectInfoTelemetryEvent, "", seq);
    }

    function telemetryEvent(telemetryEventName: string, payload: any, seq?: number): protocol.TelemetryEvent {
        return {
            seq: seq || 0,
            type: "event",
            event: "telemetry",
            body: {
                telemetryEventName,
                payload
            }
        };
    }

    export function configFileDiagEvent(triggerFile: string, configFile: string, diagnostics: protocol.DiagnosticWithFileName[], seq?: number): protocol.ConfigFileDiagnosticEvent {
        return {
            seq: seq || 0,
            type: "event",
            event: server.ConfigFileDiagEvent,
            body: {
                triggerFile,
                configFile,
                diagnostics
            }
        };
    }

    export function checkEvents(session: TestSession, expectedEvents: protocol.Event[]) {
        const events = session.events;
        assert.equal(events.length, expectedEvents.length, `Actual:: ${JSON.stringify(session.events, /*replacer*/ undefined, " ")}`);
        expectedEvents.forEach((expectedEvent, index) => {
            if (expectedEvent.event === "telemetry") {
                // Ignore payload
                const { body, ...actual } = events[index] as protocol.TelemetryEvent;
                const { body: expectedBody, ...expected } = expectedEvent as protocol.TelemetryEvent;
                assert.deepEqual(actual, expected, `Expected ${JSON.stringify(expectedEvent)} at ${index} in ${JSON.stringify(events)}`);
                assert.equal(body.telemetryEventName, expectedBody.telemetryEventName, `Expected ${JSON.stringify(expectedEvent)} at ${index} in ${JSON.stringify(events)}`);
            }
            else {
                checkNthEvent(session, expectedEvent, index, index === expectedEvents.length);
            }
        });
    }

    export function checkNthEvent(session: TestSession, expectedEvent: protocol.Event, index: number, isMostRecent: boolean) {
        const events = session.events;
        assert.deepEqual(events[index], expectedEvent, `Expected ${JSON.stringify(expectedEvent)} at ${index} in ${JSON.stringify(events)}`);

        const outputs = session.testhost.getOutput();
        assert.equal(outputs[index], server.formatMessage(expectedEvent, nullLogger, Utils.byteLength, session.testhost.newLine));

        if (isMostRecent) {
            assert.strictEqual(events.length, index + 1, JSON.stringify(events));
            assert.strictEqual(outputs.length, index + 1, JSON.stringify(outputs));
        }
    }

    export interface MakeReferenceItem extends DocumentSpanFromSubstring {
        isDefinition: boolean;
        isWriteAccess?: boolean;
        lineText: string;
    }

    export function makeReferenceItem({ isDefinition, isWriteAccess, lineText, ...rest }: MakeReferenceItem): protocol.ReferencesResponseItem {
        return {
            ...protocolFileSpanWithContextFromSubstring(rest),
            isDefinition,
            isWriteAccess: isWriteAccess === undefined ? isDefinition : isWriteAccess,
            lineText,
        };
    }

    export interface GetErrDiagnostics {
        file: string | File;
        syntax?: protocol.Diagnostic[];
        semantic?: protocol.Diagnostic[];
        suggestion?: protocol.Diagnostic[];
    }
    export interface VerifyGetErrRequestBase {
        session: TestSession;
        host: TestServerHost;
        onErrEvent?: () => void;
        existingTimeouts?: number;
    }
    export interface VerifyGetErrRequest extends VerifyGetErrRequestBase {
        expected: readonly GetErrDiagnostics[];
    }
    export function verifyGetErrRequest(request: VerifyGetErrRequest) {
        const { session, expected } = request;
        session.clearMessages();
        const expectedSequenceId = session.getNextSeq();
        session.executeCommandSeq<protocol.GeterrRequest>({
            command: protocol.CommandTypes.Geterr,
            arguments: {
                delay: 0,
                files: expected.map(f => filePath(f.file))
            }
        });
        checkAllErrors({ ...request, expectedSequenceId });
    }

    export interface VerifyGetErrRequestNoErrors extends VerifyGetErrRequestBase {
        files: readonly (string | File)[];
    }
    export function verifyGetErrRequestNoErrors(request: VerifyGetErrRequestNoErrors) {
        verifyGetErrRequest({
            ...request,
            expected: request.files.map(file => ({ file, syntax: [], semantic: [], suggestion: [] }))
        });
    }

    export interface CheckAllErrors extends VerifyGetErrRequest {
        expectedSequenceId: number;
    }
    function checkAllErrors({ expected, expectedSequenceId, ...rest }: CheckAllErrors) {
        for (let i = 0; i < expected.length; i++) {
            checkErrorsInFile({
                ...rest,
                expected: expected[i],
                expectedSequenceId: i === expected.length - 1 ? expectedSequenceId : undefined,
            });
        }
    }

    function filePath(file: string | File) {
        return isString(file) ? file : file.path;
    }
    interface CheckErrorsInFile extends VerifyGetErrRequestBase {
        expected: GetErrDiagnostics;
        expectedSequenceId?: number;
    }
    function checkErrorsInFile({
        session, host, onErrEvent, existingTimeouts, expectedSequenceId,
        expected: { file, syntax, semantic, suggestion },
    }: CheckErrorsInFile) {
        onErrEvent = onErrEvent || noop;
        if (existingTimeouts !== undefined) {
            host.checkTimeoutQueueLength(existingTimeouts + 1);
            host.runQueuedTimeoutCallbacks(host.getNextTimeoutId() - 1);
        }
        else {
            host.checkTimeoutQueueLengthAndRun(1);
        }
        if (syntax) {
            onErrEvent();
            checkErrorMessage(session, "syntaxDiag", { file: filePath(file), diagnostics: syntax });
        }
        if (semantic) {
            session.clearMessages();

            host.runQueuedImmediateCallbacks(1);
            onErrEvent();
            checkErrorMessage(session, "semanticDiag", { file: filePath(file), diagnostics: semantic });
        }
        if (suggestion) {
            session.clearMessages();

            host.runQueuedImmediateCallbacks(1);
            onErrEvent();
            checkErrorMessage(session, "suggestionDiag", { file: filePath(file), diagnostics: suggestion });
        }
        if (expectedSequenceId !== undefined) {
            checkCompleteEvent(session, syntax || semantic || suggestion ? 2 : 1, expectedSequenceId);
        }
        session.clearMessages();
    }

    function verifyErrorsUsingGeterr({ allFiles, openFiles, expectedGetErr }: VerifyGetErrScenario) {
        it("verifies the errors in open file", () => {
            const host = createServerHost([...allFiles(), libFile]);
            const session = createSession(host, { canUseEvents: true, });
            openFilesForSession(openFiles(), session);

            verifyGetErrRequest({ session, host, expected: expectedGetErr() });
        });
    }

    function verifyErrorsUsingGeterrForProject({ allFiles, openFiles, expectedGetErrForProject }: VerifyGetErrScenario) {
        it("verifies the errors in projects", () => {
            const host = createServerHost([...allFiles(), libFile]);
            const session = createSession(host, { canUseEvents: true, });
            openFilesForSession(openFiles(), session);

            session.clearMessages();
            for (const expected of expectedGetErrForProject()) {
                const expectedSequenceId = session.getNextSeq();
                session.executeCommandSeq<protocol.GeterrForProjectRequest>({
                    command: protocol.CommandTypes.GeterrForProject,
                    arguments: {
                        delay: 0,
                        file: expected.project
                    }
                });

                checkAllErrors({ session, host, expected: expected.errors, expectedSequenceId });
            }
        });
    }

    function verifyErrorsUsingSyncMethods({ allFiles, openFiles, expectedSyncDiagnostics }: VerifyGetErrScenario) {
        it("verifies the errors using sync commands", () => {
            const host = createServerHost([...allFiles(), libFile]);
            const session = createSession(host);
            openFilesForSession(openFiles(), session);
            for (const { file, project, syntax, semantic, suggestion } of expectedSyncDiagnostics()) {
                const actualSyntax = session.executeCommandSeq<protocol.SyntacticDiagnosticsSyncRequest>({
                    command: protocol.CommandTypes.SyntacticDiagnosticsSync,
                    arguments: {
                        file: filePath(file),
                        projectFileName: project
                    }
                }).response as protocol.Diagnostic[];
                assert.deepEqual(actualSyntax, syntax, `Syntax diagnostics for file: ${filePath(file)}, project: ${project}`);
                const actualSemantic = session.executeCommandSeq<protocol.SemanticDiagnosticsSyncRequest>({
                    command: protocol.CommandTypes.SemanticDiagnosticsSync,
                    arguments: {
                        file: filePath(file),
                        projectFileName: project
                    }
                }).response as protocol.Diagnostic[];
                assert.deepEqual(actualSemantic, semantic, `Semantic diagnostics for file: ${filePath(file)}, project: ${project}`);
                const actualSuggestion = session.executeCommandSeq<protocol.SuggestionDiagnosticsSyncRequest>({
                    command: protocol.CommandTypes.SuggestionDiagnosticsSync,
                    arguments: {
                        file: filePath(file),
                        projectFileName: project
                    }
                }).response as protocol.Diagnostic[];
                assert.deepEqual(actualSuggestion, suggestion, `Suggestion diagnostics for file: ${filePath(file)}, project: ${project}`);
            }
        });
    }

    function verifyConfigFileErrors({ allFiles, openFiles, expectedConfigFileDiagEvents }: VerifyGetErrScenario) {
        it("verify config file errors", () => {
            const host = createServerHost([...allFiles(), libFile]);
            const { session, events } = createSessionWithEventTracking<server.ConfigFileDiagEvent>(host, server.ConfigFileDiagEvent);

            for (const file of openFiles()) {
                session.executeCommandSeq<protocol.OpenRequest>({
                    command: protocol.CommandTypes.Open,
                    arguments: { file: file.path }
                });
            }

            assert.deepEqual(events, expectedConfigFileDiagEvents().map(data => ({
                eventName: server.ConfigFileDiagEvent,
                data
            })));
        });
    }

    export interface GetErrForProjectDiagnostics {
        project: string;
        errors: readonly GetErrDiagnostics[];
    }
    export interface SyncDiagnostics extends GetErrDiagnostics {
        project?: string;
    }
    export interface VerifyGetErrScenario {
        allFiles: () => readonly File[];
        openFiles: () => readonly File[];
        expectedGetErr: () => readonly GetErrDiagnostics[];
        expectedGetErrForProject: () => readonly GetErrForProjectDiagnostics[];
        expectedSyncDiagnostics: () => readonly SyncDiagnostics[];
        expectedConfigFileDiagEvents: () => readonly server.ConfigFileDiagEvent["data"][];
    }
    export function verifyGetErrScenario(scenario: VerifyGetErrScenario) {
        verifyErrorsUsingGeterr(scenario);
        verifyErrorsUsingGeterrForProject(scenario);
        verifyErrorsUsingSyncMethods(scenario);
        verifyConfigFileErrors(scenario);
    }

    export function emptyDiagnostics(file: File): GetErrDiagnostics {
        return {
            file,
            syntax: emptyArray,
            semantic: emptyArray,
            suggestion: emptyArray
        };
    }

    export function syncDiagnostics(diagnostics: GetErrDiagnostics, project: string): SyncDiagnostics {
        return { project, ...diagnostics };
    }
}
