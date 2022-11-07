/*@internal*/
namespace ts.server {
interface LogOptions {
    file?: string;
    detailLevel?: ts.server.LogLevel;
    traceToConsole?: boolean;
    logToFile?: boolean;
}

interface NodeChildProcess {
    send(message: any, sendHandle?: any): void;
    on(message: "message" | "exit", f: (m: any) => void): void;
    kill(): void;
    pid: number;
}

interface ReadLineOptions {
    input: NodeJS.ReadableStream;
    output?: NodeJS.WritableStream;
    terminal?: boolean;
    historySize?: number;
}

interface NodeSocket {
    write(data: string, encoding: string): boolean;
}

function parseLoggingEnvironmentString(logEnvStr: string | undefined): LogOptions {
    if (!logEnvStr) {
        return {};
    }
    const logEnv: LogOptions = { logToFile: true };
    const args = logEnvStr.split(" ");
    const len = args.length - 1;
    for (let i = 0; i < len; i += 2) {
        const option = args[i];
        const { value, extraPartCounter } = getEntireValue(i + 1);
        i += extraPartCounter;
        if (option && value) {
            switch (option) {
                case "-file":
                    logEnv.file = value;
                    break;
                case "-level":
                    const level = ts.server.getLogLevel(value);
                    logEnv.detailLevel = level !== undefined ? level : ts.server.LogLevel.normal;
                    break;
                case "-traceToConsole":
                    logEnv.traceToConsole = value.toLowerCase() === "true";
                    break;
                case "-logToFile":
                    logEnv.logToFile = value.toLowerCase() === "true";
                    break;
            }
        }
    }
    return logEnv;

    function getEntireValue(initialIndex: number) {
        let pathStart = args[initialIndex];
        let extraPartCounter = 0;
        if (pathStart.charCodeAt(0) === ts.CharacterCodes.doubleQuote &&
            pathStart.charCodeAt(pathStart.length - 1) !== ts.CharacterCodes.doubleQuote) {
            for (let i = initialIndex + 1; i < args.length; i++) {
                pathStart += " ";
                pathStart += args[i];
                extraPartCounter++;
                if (pathStart.charCodeAt(pathStart.length - 1) === ts.CharacterCodes.doubleQuote) break;
            }
        }
        return { value: ts.stripQuotes(pathStart), extraPartCounter };
    }
}

function parseServerMode(): ts.LanguageServiceMode | string | undefined {
    const mode = ts.server.findArgument("--serverMode");
    if (!mode) return undefined;

    switch (mode.toLowerCase()) {
        case "semantic":
            return ts.LanguageServiceMode.Semantic;
        case "partialsemantic":
            return ts.LanguageServiceMode.PartialSemantic;
        case "syntactic":
            return ts.LanguageServiceMode.Syntactic;
        default:
            return mode;
    }
}

export function initializeNodeSystem(): ts.server.StartInput {
    const sys = ts.Debug.checkDefined(ts.sys) as ts.server.ServerHost;
    const childProcess: {
        execFileSync(file: string, args: string[], options: { stdio: "ignore", env: ts.MapLike<string> }): string | Buffer;
    } = require("child_process");

    interface Stats {
        isFile(): boolean;
        isDirectory(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isSymbolicLink(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
    }

    const fs: {
        openSync(path: string, options: string): number;
        close(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
        writeSync(fd: number, buffer: Buffer, offset: number, length: number, position?: number): number;
        statSync(path: string): Stats;
        stat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    } = require("fs");

    class Logger extends ts.server.BaseLogger {
        private fd = -1;
        constructor(
            private readonly logFilename: string,
            private readonly traceToConsole: boolean,
            level: ts.server.LogLevel
        ) {
            super(level);
            if (this.logFilename) {
                try {
                    this.fd = fs.openSync(this.logFilename, "w");
                }
                catch (_) {
                    // swallow the error and keep logging disabled if file cannot be opened
                }
            }
        }

        close() {
            if (this.fd >= 0) {
                fs.close(this.fd, ts.noop);
            }
        }

        getLogFileName() {
            return this.logFilename;
        }

        loggingEnabled() {
            return !!this.logFilename || this.traceToConsole;
        }

        protected canWrite() {
            return this.fd >= 0 || this.traceToConsole;
        }

        protected write(s: string, _type: ts.server.Msg) {
            if (this.fd >= 0) {
                const buf = sys.bufferFrom!(s);
                // eslint-disable-next-line no-null/no-null
                fs.writeSync(this.fd, buf as globalThis.Buffer, 0, buf.length, /*position*/ null!); // TODO: GH#18217
            }
            if (this.traceToConsole) {
                console.warn(s);
            }
        }
    }

    const nodeVersion = ts.getNodeMajorVersion();
    // use watchGuard process on Windows when node version is 4 or later
    const useWatchGuard = process.platform === "win32" && nodeVersion! >= 4;
    const originalWatchDirectory: ts.server.ServerHost["watchDirectory"] = sys.watchDirectory.bind(sys);
    const logger = createLogger();

    // enable deprecation logging
    ts.Debug.loggingHost = {
        log(level, s) {
            switch (level) {
                case ts.LogLevel.Error:
                case ts.LogLevel.Warning:
                    return logger.msg(s, ts.server.Msg.Err);
                case ts.LogLevel.Info:
                case ts.LogLevel.Verbose:
                    return logger.msg(s, ts.server.Msg.Info);
            }
        }
    };

    const pending = ts.createQueue<Buffer>();
    let canWrite = true;

    if (useWatchGuard) {
        const currentDrive = extractWatchDirectoryCacheKey(sys.resolvePath(sys.getCurrentDirectory()), /*currentDriveKey*/ undefined);
        const statusCache = new ts.Map<string, boolean>();
        sys.watchDirectory = (path, callback, recursive, options) => {
            const cacheKey = extractWatchDirectoryCacheKey(path, currentDrive);
            let status = cacheKey && statusCache.get(cacheKey);
            if (status === undefined) {
                if (logger.hasLevel(ts.server.LogLevel.verbose)) {
                    logger.info(`${cacheKey} for path ${path} not found in cache...`);
                }
                try {
                    const args = [ts.combinePaths(__dirname, "watchGuard.js"), path];
                    if (logger.hasLevel(ts.server.LogLevel.verbose)) {
                        logger.info(`Starting ${process.execPath} with args:${ts.server.stringifyIndented(args)}`);
                    }
                    childProcess.execFileSync(process.execPath, args, { stdio: "ignore", env: { ELECTRON_RUN_AS_NODE: "1" } });
                    status = true;
                    if (logger.hasLevel(ts.server.LogLevel.verbose)) {
                        logger.info(`WatchGuard for path ${path} returned: OK`);
                    }
                }
                catch (e) {
                    status = false;
                    if (logger.hasLevel(ts.server.LogLevel.verbose)) {
                        logger.info(`WatchGuard for path ${path} returned: ${e.message}`);
                    }
                }
                if (cacheKey) {
                    statusCache.set(cacheKey, status);
                }
            }
            else if (logger.hasLevel(ts.server.LogLevel.verbose)) {
                logger.info(`watchDirectory for ${path} uses cached drive information.`);
            }
            if (status) {
                // this drive is safe to use - call real 'watchDirectory'
                return watchDirectorySwallowingException(path, callback, recursive, options);
            }
            else {
                // this drive is unsafe - return no-op watcher
                return ts.noopFileWatcher;
            }
        };
    }
    else {
        sys.watchDirectory = watchDirectorySwallowingException;
    }

    // Override sys.write because fs.writeSync is not reliable on Node 4
    sys.write = (s: string) => writeMessage(sys.bufferFrom!(s, "utf8") as globalThis.Buffer);

    /* eslint-disable no-restricted-globals */
    sys.setTimeout = setTimeout;
    sys.clearTimeout = clearTimeout;
    sys.setImmediate = setImmediate;
    sys.clearImmediate = clearImmediate;
    /* eslint-enable no-restricted-globals */

    if (typeof global !== "undefined" && global.gc) {
        sys.gc = () => global.gc?.();
    }

    sys.require = (initialDir: string, moduleName: string): ts.server.ModuleImportResult => {
        try {
            return { module: require(ts.resolveJSModule(moduleName, initialDir, sys)), error: undefined };
        }
        catch (error) {
            return { module: undefined, error };
        }
    };

    let cancellationToken: ts.server.ServerCancellationToken;
    try {
        const factory = require("./cancellationToken");
        cancellationToken = factory(sys.args);
    }
    catch (e) {
        cancellationToken = ts.server.nullCancellationToken;
    }

    const localeStr = ts.server.findArgument("--locale");
    if (localeStr) {
        ts.validateLocaleAndSetLanguage(localeStr, sys);
    }

    const modeOrUnknown = parseServerMode();
    let serverMode: ts.LanguageServiceMode | undefined;
    let unknownServerMode: string | undefined;
    if (modeOrUnknown !== undefined) {
        if (typeof modeOrUnknown === "number") serverMode = modeOrUnknown;
        else unknownServerMode = modeOrUnknown;
    }
    return {
        args: process.argv,
        logger,
        cancellationToken,
        serverMode,
        unknownServerMode,
        startSession: startNodeSession
    };

    // TSS_LOG "{ level: "normal | verbose | terse", file?: string}"
    function createLogger() {
        const cmdLineLogFileName = ts.server.findArgument("--logFile");
        const cmdLineVerbosity = ts.server.getLogLevel(ts.server.findArgument("--logVerbosity"));
        const envLogOptions = parseLoggingEnvironmentString(process.env.TSS_LOG);

        const unsubstitutedLogFileName = cmdLineLogFileName
            ? ts.stripQuotes(cmdLineLogFileName)
            : envLogOptions.logToFile
                ? envLogOptions.file || (__dirname + "/.log" + process.pid.toString())
                : undefined;

        const substitutedLogFileName = unsubstitutedLogFileName
            ? unsubstitutedLogFileName.replace("PID", process.pid.toString())
            : undefined;

        const logVerbosity = cmdLineVerbosity || envLogOptions.detailLevel;
        return new Logger(substitutedLogFileName!, envLogOptions.traceToConsole!, logVerbosity!); // TODO: GH#18217
    }

    function writeMessage(buf: Buffer) {
        if (!canWrite) {
            pending.enqueue(buf);
        }
        else {
            canWrite = false;
            process.stdout.write(buf, setCanWriteFlagAndWriteMessageIfNecessary);
        }
    }

    function setCanWriteFlagAndWriteMessageIfNecessary() {
        canWrite = true;
        if (!pending.isEmpty()) {
            writeMessage(pending.dequeue());
        }
    }

    function extractWatchDirectoryCacheKey(path: string, currentDriveKey: string | undefined) {
        path = ts.normalizeSlashes(path);
        if (isUNCPath(path)) {
            // UNC path: extract server name
            // //server/location
            //         ^ <- from 0 to this position
            const firstSlash = path.indexOf(ts.directorySeparator, 2);
            return firstSlash !== -1 ? ts.toFileNameLowerCase(path.substring(0, firstSlash)) : path;
        }
        const rootLength = ts.getRootLength(path);
        if (rootLength === 0) {
            // relative path - assume file is on the current drive
            return currentDriveKey;
        }
        if (path.charCodeAt(1) === ts.CharacterCodes.colon && path.charCodeAt(2) === ts.CharacterCodes.slash) {
            // rooted path that starts with c:/... - extract drive letter
            return ts.toFileNameLowerCase(path.charAt(0));
        }
        if (path.charCodeAt(0) === ts.CharacterCodes.slash && path.charCodeAt(1) !== ts.CharacterCodes.slash) {
            // rooted path that starts with slash - /somename - use key for current drive
            return currentDriveKey;
        }
        // do not cache any other cases
        return undefined;
    }

    function isUNCPath(s: string): boolean {
        return s.length > 2 && s.charCodeAt(0) === ts.CharacterCodes.slash && s.charCodeAt(1) === ts.CharacterCodes.slash;
    }

    // This is the function that catches the exceptions when watching directory, and yet lets project service continue to function
    // Eg. on linux the number of watches are limited and one could easily exhaust watches and the exception ENOSPC is thrown when creating watcher at that point
    function watchDirectorySwallowingException(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher {
        try {
            return originalWatchDirectory(path, callback, recursive, options);
        }
        catch (e) {
            logger.info(`Exception when creating directory watcher: ${e.message}`);
            return ts.noopFileWatcher;
        }
    }
}

function parseEventPort(eventPortStr: string | undefined) {
    const eventPort = eventPortStr === undefined ? undefined : parseInt(eventPortStr);
    return eventPort !== undefined && !isNaN(eventPort) ? eventPort : undefined;
}

function startNodeSession(options: ts.server.StartSessionOptions, logger: ts.server.Logger, cancellationToken: ts.server.ServerCancellationToken) {
    const childProcess: {
        fork(modulePath: string, args: string[], options?: { execArgv: string[], env?: ts.MapLike<string> }): NodeChildProcess;
    } = require("child_process");

    const os: {
        homedir?(): string;
        tmpdir(): string;
    } = require("os");

    const net: {
        connect(options: { port: number }, onConnect?: () => void): NodeSocket
    } = require("net");

    const readline: {
        createInterface(options: ReadLineOptions): NodeJS.EventEmitter;
    } = require("readline");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    interface QueuedOperation {
        operationId: string;
        operation: () => void;
    }

    class NodeTypingsInstaller implements ts.server.ITypingsInstaller {
        private installer!: NodeChildProcess;
        private projectService!: ts.server.ProjectService;
        private activeRequestCount = 0;
        private requestQueue = ts.createQueue<QueuedOperation>();
        private requestMap = new ts.Map<string, QueuedOperation>(); // Maps operation ID to newest requestQueue entry with that ID
        /** We will lazily request the types registry on the first call to `isKnownTypesPackageName` and store it in `typesRegistryCache`. */
        private requestedRegistry = false;
        private typesRegistryCache: ts.ESMap<string, ts.MapLike<string>> | undefined;

        // This number is essentially arbitrary.  Processing more than one typings request
        // at a time makes sense, but having too many in the pipe results in a hang
        // (see https://github.com/nodejs/node/issues/7657).
        // It would be preferable to base our limit on the amount of space left in the
        // buffer, but we have yet to find a way to retrieve that value.
        private static readonly maxActiveRequestCount = 10;
        private static readonly requestDelayMillis = 100;
        private packageInstalledPromise: { resolve(value: ts.ApplyCodeActionCommandResult): void, reject(reason: unknown): void } | undefined;

        constructor(
            private readonly telemetryEnabled: boolean,
            private readonly logger: ts.server.Logger,
            private readonly host: ts.server.ServerHost,
            readonly globalTypingsCacheLocation: string,
            readonly typingSafeListLocation: string,
            readonly typesMapLocation: string,
            private readonly npmLocation: string | undefined,
            private readonly validateDefaultNpmLocation: boolean,
            private event: ts.server.Event) {
        }

        isKnownTypesPackageName(name: string): boolean {
            // We want to avoid looking this up in the registry as that is expensive. So first check that it's actually an NPM package.
            const validationResult = ts.JsTyping.validatePackageName(name);
            if (validationResult !== ts.JsTyping.NameValidationResult.Ok) {
                return false;
            }

            if (this.requestedRegistry) {
                return !!this.typesRegistryCache && this.typesRegistryCache.has(name);
            }

            this.requestedRegistry = true;
            this.send({ kind: "typesRegistry" });
            return false;
        }

        installPackage(options: ts.server.InstallPackageOptionsWithProject): Promise<ts.ApplyCodeActionCommandResult> {
            this.send<ts.server.InstallPackageRequest>({ kind: "installPackage", ...options });
            ts.Debug.assert(this.packageInstalledPromise === undefined);
            return new Promise<ts.ApplyCodeActionCommandResult>((resolve, reject) => {
                this.packageInstalledPromise = { resolve, reject };
            });
        }

        attach(projectService: ts.server.ProjectService) {
            this.projectService = projectService;
            if (this.logger.hasLevel(ts.server.LogLevel.requestTime)) {
                this.logger.info("Binding...");
            }

            const args: string[] = [ts.server.Arguments.GlobalCacheLocation, this.globalTypingsCacheLocation];
            if (this.telemetryEnabled) {
                args.push(ts.server.Arguments.EnableTelemetry);
            }
            if (this.logger.loggingEnabled() && this.logger.getLogFileName()) {
                args.push(ts.server.Arguments.LogFile, ts.combinePaths(ts.getDirectoryPath(ts.normalizeSlashes(this.logger.getLogFileName()!)), `ti-${process.pid}.log`));
            }
            if (this.typingSafeListLocation) {
                args.push(ts.server.Arguments.TypingSafeListLocation, this.typingSafeListLocation);
            }
            if (this.typesMapLocation) {
                args.push(ts.server.Arguments.TypesMapLocation, this.typesMapLocation);
            }
            if (this.npmLocation) {
                args.push(ts.server.Arguments.NpmLocation, this.npmLocation);
            }
            if (this.validateDefaultNpmLocation) {
                args.push(ts.server.Arguments.ValidateDefaultNpmLocation);
            }

            const execArgv: string[] = [];
            for (const arg of process.execArgv) {
                const match = /^--((?:debug|inspect)(?:-brk)?)(?:=(\d+))?$/.exec(arg);
                if (match) {
                    // if port is specified - use port + 1
                    // otherwise pick a default port depending on if 'debug' or 'inspect' and use its value + 1
                    const currentPort = match[2] !== undefined
                        ? +match[2]
                        : match[1].charAt(0) === "d" ? 5858 : 9229;
                    execArgv.push(`--${match[1]}=${currentPort + 1}`);
                    break;
                }
            }

            this.installer = childProcess.fork(ts.combinePaths(__dirname, "typingsInstaller.js"), args, { execArgv });
            this.installer.on("message", m => this.handleMessage(m));

            // We have to schedule this event to the next tick
            // cause this fn will be called during
            // new IOSession => super(which is Session) => new ProjectService => NodeTypingsInstaller.attach
            // and if "event" is referencing "this" before super class is initialized, it will be a ReferenceError in ES6 class.
            this.host.setImmediate(() => this.event({ pid: this.installer.pid }, "typingsInstallerPid"));

            process.on("exit", () => {
                this.installer.kill();
            });
        }

        onProjectClosed(p: ts.server.Project): void {
            this.send({ projectName: p.getProjectName(), kind: "closeProject" });
        }

        private send<T extends ts.server.TypingInstallerRequestUnion>(rq: T): void {
            this.installer.send(rq);
        }

        enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>): void {
            const request = ts.server.createInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                    this.logger.info(`Scheduling throttled operation:${ts.server.stringifyIndented(request)}`);
                }
            }

            const operationId = project.getProjectName();
            const operation = () => {
                if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                    this.logger.info(`Sending request:${ts.server.stringifyIndented(request)}`);
                }
                this.send(request);
            };
            const queuedRequest: QueuedOperation = { operationId, operation };

            if (this.activeRequestCount < NodeTypingsInstaller.maxActiveRequestCount) {
                this.scheduleRequest(queuedRequest);
            }
            else {
                if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                    this.logger.info(`Deferring request for: ${operationId}`);
                }
                this.requestQueue.enqueue(queuedRequest);
                this.requestMap.set(operationId, queuedRequest);
            }
        }

        private handleMessage(response: ts.server.TypesRegistryResponse | ts.server.PackageInstalledResponse | ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes | ts.server.InitializationFailedResponse) {
            if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                this.logger.info(`Received response:${ts.server.stringifyIndented(response)}`);
            }

            switch (response.kind) {
                case ts.server.EventTypesRegistry:
                    this.typesRegistryCache = new ts.Map(ts.getEntries(response.typesRegistry));
                    break;
                case ts.server.ActionPackageInstalled: {
                    const { success, message } = response;
                    if (success) {
                        this.packageInstalledPromise!.resolve({ successMessage: message });
                    }
                    else {
                        this.packageInstalledPromise!.reject(message);
                    }
                    this.packageInstalledPromise = undefined;

                    this.projectService.updateTypingsForProject(response);

                    // The behavior is the same as for setTypings, so send the same event.
                    this.event(response, "setTypings");
                    break;
                }
                case ts.server.EventInitializationFailed: {
                    const body: ts.server.protocol.TypesInstallerInitializationFailedEventBody = {
                        message: response.message
                    };
                    const eventName: ts.server.protocol.TypesInstallerInitializationFailedEventName = "typesInstallerInitializationFailed";
                    this.event(body, eventName);
                    break;
                }
                case ts.server.EventBeginInstallTypes: {
                    const body: ts.server.protocol.BeginInstallTypesEventBody = {
                        eventId: response.eventId,
                        packages: response.packagesToInstall,
                    };
                    const eventName: ts.server.protocol.BeginInstallTypesEventName = "beginInstallTypes";
                    this.event(body, eventName);
                    break;
                }
                case ts.server.EventEndInstallTypes: {
                    if (this.telemetryEnabled) {
                        const body: ts.server.protocol.TypingsInstalledTelemetryEventBody = {
                            telemetryEventName: "typingsInstalled",
                            payload: {
                                installedPackages: response.packagesToInstall.join(","),
                                installSuccess: response.installSuccess,
                                typingsInstallerVersion: response.typingsInstallerVersion
                            }
                        };
                        const eventName: ts.server.protocol.TelemetryEventName = "telemetry";
                        this.event(body, eventName);
                    }

                    const body: ts.server.protocol.EndInstallTypesEventBody = {
                        eventId: response.eventId,
                        packages: response.packagesToInstall,
                        success: response.installSuccess,
                    };
                    const eventName: ts.server.protocol.EndInstallTypesEventName = "endInstallTypes";
                    this.event(body, eventName);
                    break;
                }
                case ts.server.ActionInvalidate: {
                    this.projectService.updateTypingsForProject(response);
                    break;
                }
                case ts.server.ActionSet: {
                    if (this.activeRequestCount > 0) {
                        this.activeRequestCount--;
                    }
                    else {
                        ts.Debug.fail("Received too many responses");
                    }

                    while (!this.requestQueue.isEmpty()) {
                        const queuedRequest = this.requestQueue.dequeue();
                        if (this.requestMap.get(queuedRequest.operationId) === queuedRequest) {
                            this.requestMap.delete(queuedRequest.operationId);
                            this.scheduleRequest(queuedRequest);
                            break;
                        }

                        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                            this.logger.info(`Skipping defunct request for: ${queuedRequest.operationId}`);
                        }
                    }

                    this.projectService.updateTypingsForProject(response);

                    this.event(response, "setTypings");

                    break;
                }
                default:
                    ts.assertType<never>(response);
            }
        }

        private scheduleRequest(request: QueuedOperation) {
            if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                this.logger.info(`Scheduling request for: ${request.operationId}`);
            }
            this.activeRequestCount++;
            this.host.setTimeout(request.operation, NodeTypingsInstaller.requestDelayMillis);
        }
    }

    class IOSession extends ts.server.Session {
        private eventPort: number | undefined;
        private eventSocket: NodeSocket | undefined;
        private socketEventQueue: { body: any, eventName: string }[] | undefined;
        /** No longer needed if syntax target is es6 or above. Any access to "this" before initialized will be a runtime error. */
        private constructed: boolean | undefined;

        constructor() {
            const event = (body: object, eventName: string) => {
                this.event(body, eventName);
            };

            const host = ts.sys as ts.server.ServerHost;

            const typingsInstaller = disableAutomaticTypingAcquisition
                ? undefined
                : new NodeTypingsInstaller(telemetryEnabled, logger, host, getGlobalTypingsCacheLocation(), typingSafeListLocation, typesMapLocation, npmLocation, validateDefaultNpmLocation, event);

            super({
                host,
                cancellationToken,
                ...options,
                typingsInstaller: typingsInstaller || ts.server.nullTypingsInstaller,
                byteLength: Buffer.byteLength,
                hrtime: process.hrtime,
                logger,
                canUseEvents: true,
                typesMapLocation,
            });

            this.eventPort = eventPort;
            if (this.canUseEvents && this.eventPort) {
                const s = net.connect({ port: this.eventPort }, () => {
                    this.eventSocket = s;
                    if (this.socketEventQueue) {
                        // flush queue.
                        for (const event of this.socketEventQueue) {
                            this.writeToEventSocket(event.body, event.eventName);
                        }
                        this.socketEventQueue = undefined;
                    }
                });
            }

            this.constructed = true;
        }

        event<T extends object>(body: T, eventName: string): void {
            ts.Debug.assert(!!this.constructed, "Should only call `IOSession.prototype.event` on an initialized IOSession");

            if (this.canUseEvents && this.eventPort) {
                if (!this.eventSocket) {
                    if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                        this.logger.info(`eventPort: event "${eventName}" queued, but socket not yet initialized`);
                    }
                    (this.socketEventQueue || (this.socketEventQueue = [])).push({ body, eventName });
                    return;
                }
                else {
                    ts.Debug.assert(this.socketEventQueue === undefined);
                    this.writeToEventSocket(body, eventName);
                }
            }
            else {
                super.event(body, eventName);
            }
        }

        private writeToEventSocket(body: object, eventName: string): void {
            this.eventSocket!.write(ts.server.formatMessage(ts.server.toEvent(eventName, body), this.logger, this.byteLength, this.host.newLine), "utf8");
        }

        exit() {
            this.logger.info("Exiting...");
            this.projectService.closeLog();
            ts.tracing?.stopTracing();
            process.exit(0);
        }

        listen() {
            rl.on("line", (input: string) => {
                const message = input.trim();
                this.onMessage(message);
            });

            rl.on("close", () => {
                this.exit();
            });
        }
    }

    class IpcIOSession extends IOSession {

        protected writeMessage(msg: ts.server.protocol.Message): void {
            const verboseLogging = logger.hasLevel(ts.server.LogLevel.verbose);
            if (verboseLogging) {
                const json = JSON.stringify(msg);
                logger.info(`${msg.type}:${ts.server.indent(json)}`);
            }

            process.send!(msg);
        }

        protected parseMessage(message: any): ts.server.protocol.Request {
            return message as ts.server.protocol.Request;
        }

        protected toStringMessage(message: any) {
            return JSON.stringify(message, undefined, 2);
        }

        public listen() {
            process.on("message", (e: any) => {
                this.onMessage(e);
            });

            process.on("disconnect", () => {
                this.exit();
            });
        }
    }

    const eventPort: number | undefined = parseEventPort(ts.server.findArgument("--eventPort"));
    const typingSafeListLocation = ts.server.findArgument(ts.server.Arguments.TypingSafeListLocation)!; // TODO: GH#18217
    const typesMapLocation = ts.server.findArgument(ts.server.Arguments.TypesMapLocation) || ts.combinePaths(ts.getDirectoryPath(ts.sys.getExecutingFilePath()), "typesMap.json");
    const npmLocation = ts.server.findArgument(ts.server.Arguments.NpmLocation);
    const validateDefaultNpmLocation = ts.server.hasArgument(ts.server.Arguments.ValidateDefaultNpmLocation);
    const disableAutomaticTypingAcquisition = ts.server.hasArgument("--disableAutomaticTypingAcquisition");
    const useNodeIpc = ts.server.hasArgument("--useNodeIpc");
    const telemetryEnabled = ts.server.hasArgument(ts.server.Arguments.EnableTelemetry);
    const commandLineTraceDir = ts.server.findArgument("--traceDirectory");
    const traceDir = commandLineTraceDir
        ? ts.stripQuotes(commandLineTraceDir)
        : process.env.TSS_TRACE;
    if (traceDir) {
        ts.startTracing("server", traceDir);
    }

    const ioSession = useNodeIpc ? new IpcIOSession() : new IOSession();
    process.on("uncaughtException", err => {
        ioSession.logError(err, "unknown");
    });
    // See https://github.com/Microsoft/TypeScript/issues/11348
    (process as any).noAsar = true;
    // Start listening
    ioSession.listen();

    function getGlobalTypingsCacheLocation() {
        switch (process.platform) {
            case "win32": {
                const basePath = process.env.LOCALAPPDATA ||
                    process.env.APPDATA ||
                    (os.homedir && os.homedir()) ||
                    process.env.USERPROFILE ||
                    (process.env.HOMEDRIVE && process.env.HOMEPATH && ts.normalizeSlashes(process.env.HOMEDRIVE + process.env.HOMEPATH)) ||
                    os.tmpdir();
                return ts.combinePaths(ts.combinePaths(ts.normalizeSlashes(basePath), "Microsoft/TypeScript"), ts.versionMajorMinor);
            }
            case "openbsd":
            case "freebsd":
            case "netbsd":
            case "darwin":
            case "linux":
            case "android": {
                const cacheLocation = getNonWindowsCacheLocation(process.platform === "darwin");
                return ts.combinePaths(ts.combinePaths(cacheLocation, "typescript"), ts.versionMajorMinor);
            }
            default:
                return ts.Debug.fail(`unsupported platform '${process.platform}'`);
        }
    }

    function getNonWindowsCacheLocation(platformIsDarwin: boolean) {
        if (process.env.XDG_CACHE_HOME) {
            return process.env.XDG_CACHE_HOME;
        }
        const usersDir = platformIsDarwin ? "Users" : "home";
        const homePath = (os.homedir && os.homedir()) ||
            process.env.HOME ||
            ((process.env.LOGNAME || process.env.USER) && `/${usersDir}/${process.env.LOGNAME || process.env.USER}`) ||
            os.tmpdir();
        const cacheFolder = platformIsDarwin
            ? "Library/Caches"
            : ".cache";
        return ts.combinePaths(ts.normalizeSlashes(homePath), cacheFolder);
    }
}
}
