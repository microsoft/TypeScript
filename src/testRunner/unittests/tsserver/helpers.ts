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
        path: "/typesMap.json" as Path,
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

    export interface Logger extends server.Logger {
        logs: string[];
    }

    export function nullLogger(): Logger {
        return {
            close: noop,
            hasLevel: returnFalse,
            loggingEnabled: returnFalse,
            perftrc: noop,
            info: noop,
            msg: noop,
            startGroup: noop,
            endGroup: noop,
            getLogFileName: returnUndefined,
            logs: [],
        };
    }

    export function createHasErrorMessageLogger(): Logger {
        return {
            ...nullLogger(),
            msg: (s, type) => Debug.fail(`Error: ${s}, type: ${type}`),
        };
    }

    export function createLoggerWritingToConsole(): Logger {
        return {
            ...nullLogger(),
            hasLevel: returnTrue,
            loggingEnabled: returnTrue,
            perftrc: s => console.log(s),
            info: s => console.log(s),
            msg: (s, type) => console.log(`${type}:: ${s}`),
        };
    }

    export function createLoggerWithInMemoryLogs(): Logger {
        const logger = createHasErrorMessageLogger();
        return {
            ...logger,
            hasLevel: returnTrue,
            loggingEnabled: returnTrue,
            info: s => logger.logs.push(
                s.replace(/Elapsed::?\s*\d+(?:\.\d+)?ms/g, "Elapsed:: *ms")
                    .replace(/\"updateGraphDurationMs\"\:\d+(?:\.\d+)?/g, `"updateGraphDurationMs":*`)
                    .replace(/\"createAutoImportProviderProgramDurationMs\"\:\d+(?:\.\d+)?/g, `"createAutoImportProviderProgramDurationMs":*`)
                    .replace(`"version":"${version}"`, `"version":"FakeVersion"`)
            )
        };
    }

    export function baselineTsserverLogs(scenario: string, subScenario: string, sessionOrService: TestSession | TestProjectService) {
        Debug.assert(sessionOrService.logger.logs.length); // Ensure caller used in memory logger
        Harness.Baseline.runBaseline(`tsserver/${scenario}/${subScenario.split(" ").join("-")}.js`, sessionOrService.logger.logs.join("\r\n"));
    }

    export function appendAllScriptInfos(service: server.ProjectService, logs: string[]) {
        logs.push("");
        logs.push(`ScriptInfos:`);
        service.filenameToScriptInfo.forEach(info => logs.push(`path: ${info.path} fileName: ${info.fileName}`));
        logs.push("");
    }

    export function appendProjectFileText(project: server.Project, logs: string[]) {
        logs.push("");
        logs.push(`Project: ${project.getProjectName()}`);
        project.getCurrentProgram()?.getSourceFiles().forEach(f => {
            logs.push(JSON.stringify({ fileName: f.fileName, version: f.version }));
            logs.push(f.text);
            logs.push("");
        });
        logs.push("");
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

    export function createTypesRegistry(...list: string[]): ESMap<string, MapLike<string>> {
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

    export interface TestSessionOptions extends server.SessionOptions {
        logger: Logger;
    }

    export class TestSession extends server.Session {
        private seq = 0;
        public events: protocol.Event[] = [];
        public testhost: TestServerHost = this.host as TestServerHost;
        public logger: Logger;

        constructor(opts: TestSessionOptions) {
            super(opts);
            this.logger = opts.logger;
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

        public executeCommand(request: protocol.Request) {
            const verboseLogging = this.logger.hasLevel(server.LogLevel.verbose);
            if (verboseLogging) this.logger.info(`request:${JSON.stringify(request)}`);
            const result = super.executeCommand(request);
            if (verboseLogging) this.logger.info(`response:${JSON.stringify(result)}`);
            return result;
        }

        public executeCommandSeq<T extends server.protocol.Request>(request: Partial<T>) {
            this.seq++;
            request.seq = this.seq;
            request.type = "request";
            return this.executeCommand(request as T);
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

    export function createSession(host: server.ServerHost, opts: Partial<TestSessionOptions> = {}) {
        if (opts.typingsInstaller === undefined) {
            opts.typingsInstaller = new TestTypingsInstaller("/a/data/", /*throttleLimit*/ 5, host);
        }

        if (opts.eventHandler !== undefined) {
            opts.canUseEvents = true;
        }

        const sessionOptions: TestSessionOptions = {
            host,
            cancellationToken: server.nullCancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            typingsInstaller: undefined!, // TODO: GH#18217
            byteLength: Utils.byteLength,
            hrtime: process.hrtime,
            logger: opts.logger || createHasErrorMessageLogger(),
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

    export function createSessionWithDefaultEventHandler<T extends protocol.AnyEvent>(host: TestServerHost, eventNames: T["event"] | T["event"][], opts: Partial<TestSessionOptions> = {}) {
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

    export interface TestProjectServiceOptions extends server.ProjectServiceOptions {
        logger: Logger;
    }

    export class TestProjectService extends server.ProjectService {
        constructor(host: server.ServerHost, public logger: Logger, cancellationToken: HostCancellationToken, useSingleInferredProject: boolean,
            typingsInstaller: server.ITypingsInstaller, opts: Partial<TestProjectServiceOptions> = {}) {
            super({
                host,
                logger,
                session: undefined,
                cancellationToken,
                useSingleInferredProject,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller,
                typesMapLocation: customTypesMap.path,
                ...opts
            });
        }

        checkNumberOfProjects(count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
            checkNumberOfProjects(this, count);
        }
    }

    export function createProjectService(host: server.ServerHost, options?: Partial<TestProjectServiceOptions>) {
        const cancellationToken = options?.cancellationToken || server.nullCancellationToken;
        const logger = options?.logger || createHasErrorMessageLogger();
        const useSingleInferredProject = options?.useSingleInferredProject !== undefined ? options.useSingleInferredProject : false;
        return new TestProjectService(host, logger, cancellationToken, useSingleInferredProject, options?.typingsInstaller || server.nullTypingsInstaller, options);
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

    export function checkOrphanScriptInfos(service: server.ProjectService, expectedFiles: readonly string[]) {
        checkArray("Orphan ScriptInfos:", arrayFrom(mapDefinedIterator(
            service.filenameToScriptInfo.values(),
            v => v.containingProjects.length === 0 ? v.fileName : undefined
        )), expectedFiles);
    }

    export function checkProjectActualFiles(project: server.Project, expectedFiles: readonly string[]) {
        checkArray(`${server.ProjectKind[project.projectKind]} project: ${project.getProjectName()}:: actual files`, project.getFileNames(), expectedFiles);
    }

    export function checkProjectRootFiles(project: server.Project, expectedFiles: readonly string[]) {
        checkArray(`${server.ProjectKind[project.projectKind]} project: ${project.getProjectName()}::, rootFileNames`, project.getRootFiles(), expectedFiles);
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
        checkArray("Open files", arrayFrom(projectService.openFiles.keys(), path => projectService.getScriptInfoForPath(path as Path)!.fileName), expectedFiles.map(file => file.path));
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

    export interface MakeReferenceItem extends DocumentSpanFromSubstring {
        isDefinition?: boolean;
        isWriteAccess?: boolean;
        lineText: string;
    }

    export function makeReferenceItem({ isDefinition, isWriteAccess, lineText, ...rest }: MakeReferenceItem): protocol.ReferencesResponseItem {
        return {
            ...protocolFileSpanWithContextFromSubstring(rest),
            isDefinition,
            isWriteAccess: isWriteAccess === undefined ? !!isDefinition : isWriteAccess,
            lineText,
        };
    }

    export interface VerifyGetErrRequestBase {
        session: TestSession;
        host: TestServerHost;
        existingTimeouts?: number;
    }
    export interface VerifyGetErrRequest extends VerifyGetErrRequestBase {
        files: readonly (string | File)[];
        skip?: CheckAllErrors["skip"];
    }
    export function verifyGetErrRequest(request: VerifyGetErrRequest) {
        const { session, files } = request;
        session.executeCommandSeq<protocol.GeterrRequest>({
            command: protocol.CommandTypes.Geterr,
            arguments: { delay: 0, files: files.map(filePath) }
        });
        checkAllErrors(request);
    }

    interface SkipErrors { semantic?: true; suggestion?: true };
    export interface CheckAllErrors extends VerifyGetErrRequestBase {
        files: readonly any[];
        skip?: readonly (SkipErrors | undefined)[];
    }
    function checkAllErrors({ session, host, existingTimeouts, files, skip }: CheckAllErrors) {
        Debug.assert(session.logger.logs.length);
        for (let i = 0; i < files.length; i++) {
            if (existingTimeouts !== undefined) {
                host.checkTimeoutQueueLength(existingTimeouts + 1);
                host.runQueuedTimeoutCallbacks(host.getNextTimeoutId() - 1);
            }
            else {
                host.checkTimeoutQueueLengthAndRun(1);
            }
            if (!skip?.[i]?.semantic) host.runQueuedImmediateCallbacks(1);
            if (!skip?.[i]?.suggestion) host.runQueuedImmediateCallbacks(1);
        }
    }

    function filePath(file: string | File) {
        return isString(file) ? file : file.path;
    }

    function verifyErrorsUsingGeterr({scenario, subScenario, allFiles, openFiles, getErrRequest }: VerifyGetErrScenario) {
        it("verifies the errors in open file", () => {
            const host = createServerHost([...allFiles(), libFile]);
            const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs() });
            openFilesForSession(openFiles(), session);

            verifyGetErrRequest({ session, host, files: getErrRequest() });
            baselineTsserverLogs(scenario, `${subScenario} getErr`, session);
        });
    }

    function verifyErrorsUsingGeterrForProject({ scenario, subScenario, allFiles, openFiles, getErrForProjectRequest }: VerifyGetErrScenario) {
        it("verifies the errors in projects", () => {
            const host = createServerHost([...allFiles(), libFile]);
            const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs() });
            openFilesForSession(openFiles(), session);

            for (const expected of getErrForProjectRequest()) {
                session.executeCommandSeq<protocol.GeterrForProjectRequest>({
                    command: protocol.CommandTypes.GeterrForProject,
                    arguments: { delay: 0, file: filePath(expected.project) }
                });
                checkAllErrors({ session, host, files: expected.files });
            }
            baselineTsserverLogs(scenario, `${subScenario} geterrForProject`, session);
        });
    }

    function verifyErrorsUsingSyncMethods({ scenario, subScenario, allFiles, openFiles, syncDiagnostics }: VerifyGetErrScenario) {
        it("verifies the errors using sync commands", () => {
            const host = createServerHost([...allFiles(), libFile]);
            const session = createSession(host, { logger: createLoggerWithInMemoryLogs() });
            openFilesForSession(openFiles(), session);
            for (const { file, project } of syncDiagnostics()) {
                const reqArgs = { file: filePath(file), projectFileName: project && filePath(project) };
                session.executeCommandSeq<protocol.SyntacticDiagnosticsSyncRequest>({
                    command: protocol.CommandTypes.SyntacticDiagnosticsSync,
                    arguments: reqArgs
                });
                session.executeCommandSeq<protocol.SemanticDiagnosticsSyncRequest>({
                    command: protocol.CommandTypes.SemanticDiagnosticsSync,
                    arguments: reqArgs
                });
                session.executeCommandSeq<protocol.SuggestionDiagnosticsSyncRequest>({
                    command: protocol.CommandTypes.SuggestionDiagnosticsSync,
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
}
