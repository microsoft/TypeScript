import childProcess from "child_process";
import fs from "fs";
import net from "net";
import os from "os";
import readline from "readline";
import {
    CharacterCodes,
    combinePaths,
    createQueue,
    Debug,
    directorySeparator,
    DirectoryWatcherCallback,
    FileWatcher,
    getDirectoryPath,
    getRootLength,
    LanguageServiceMode,
    noop,
    noopFileWatcher,
    normalizePath,
    normalizeSlashes,
    startTracing,
    stripQuotes,
    sys,
    toFileNameLowerCase,
    tracing,
    validateLocaleAndSetLanguage,
    versionMajorMinor,
    WatchOptions,
} from "../typescript/typescript.js";
import * as ts from "../typescript/typescript.js";
import {
    getLogLevel,
    StartInput,
    StartSessionOptions,
} from "./common.js";

interface LogOptions {
    file?: string;
    detailLevel?: ts.server.LogLevel;
    traceToConsole?: boolean;
    logToFile?: boolean;
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
                    const level = getLogLevel(value);
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
        if (
            pathStart.charCodeAt(0) === CharacterCodes.doubleQuote &&
            pathStart.charCodeAt(pathStart.length - 1) !== CharacterCodes.doubleQuote
        ) {
            for (let i = initialIndex + 1; i < args.length; i++) {
                pathStart += " ";
                pathStart += args[i];
                extraPartCounter++;
                if (pathStart.charCodeAt(pathStart.length - 1) === CharacterCodes.doubleQuote) break;
            }
        }
        return { value: stripQuotes(pathStart), extraPartCounter };
    }
}

function parseServerMode(): LanguageServiceMode | string | undefined {
    const mode = ts.server.findArgument("--serverMode");
    if (!mode) return undefined;

    switch (mode.toLowerCase()) {
        case "semantic":
            return LanguageServiceMode.Semantic;
        case "partialsemantic":
            return LanguageServiceMode.PartialSemantic;
        case "syntactic":
            return LanguageServiceMode.Syntactic;
        default:
            return mode;
    }
}

/** @internal */
export function initializeNodeSystem(): StartInput {
    const sys = Debug.checkDefined(ts.sys) as ts.server.ServerHost;

    class Logger implements Logger {
        private seq = 0;
        private inGroup = false;
        private firstInGroup = true;
        private fd = -1;
        constructor(
            private readonly logFilename: string,
            private readonly traceToConsole: boolean,
            private readonly level: ts.server.LogLevel,
        ) {
            if (this.logFilename) {
                try {
                    this.fd = fs.openSync(this.logFilename, "w");
                }
                catch {
                    // swallow the error and keep logging disabled if file cannot be opened
                }
            }
        }
        static padStringRight(str: string, padding: string) {
            return (str + padding).slice(0, padding.length);
        }
        close() {
            if (this.fd >= 0) {
                fs.close(this.fd, noop);
            }
        }
        getLogFileName(): string | undefined {
            return this.logFilename;
        }
        perftrc(s: string) {
            this.msg(s, ts.server.Msg.Perf);
        }
        info(s: string) {
            this.msg(s, ts.server.Msg.Info);
        }
        err(s: string) {
            this.msg(s, ts.server.Msg.Err);
        }
        startGroup() {
            this.inGroup = true;
            this.firstInGroup = true;
        }
        endGroup() {
            this.inGroup = false;
        }
        loggingEnabled() {
            return !!this.logFilename || this.traceToConsole;
        }
        hasLevel(level: ts.server.LogLevel) {
            return this.loggingEnabled() && this.level >= level;
        }
        msg(s: string, type: ts.server.Msg = ts.server.Msg.Err) {
            if (!this.canWrite()) return;

            s = `[${ts.server.nowString()}] ${s}\n`;
            if (!this.inGroup || this.firstInGroup) {
                const prefix = Logger.padStringRight(type + " " + this.seq.toString(), "          ");
                s = prefix + s;
            }
            this.write(s, type);
            if (!this.inGroup) {
                this.seq++;
            }
        }
        protected canWrite() {
            return this.fd >= 0 || this.traceToConsole;
        }
        protected write(s: string, _type: ts.server.Msg) {
            if (this.fd >= 0) {
                const buf = Buffer.from(s);
                // eslint-disable-next-line no-restricted-syntax
                fs.writeSync(this.fd, buf, 0, buf.length, /*position*/ null);
            }
            if (this.traceToConsole) {
                console.warn(s);
            }
        }
    }

    const libDirectory = getDirectoryPath(normalizePath(sys.getExecutingFilePath()));

    const useWatchGuard = process.platform === "win32";
    const originalWatchDirectory: ts.server.ServerHost["watchDirectory"] = sys.watchDirectory.bind(sys);
    const logger = createLogger();

    // enable deprecation logging
    Debug.loggingHost = {
        log(level, s) {
            switch (level) {
                case ts.LogLevel.Error:
                case ts.LogLevel.Warning:
                    return logger.msg(s, ts.server.Msg.Err);
                case ts.LogLevel.Info:
                case ts.LogLevel.Verbose:
                    return logger.msg(s, ts.server.Msg.Info);
            }
        },
    };

    const pending = createQueue<Buffer>();
    let canWrite = true;

    if (useWatchGuard) {
        const currentDrive = extractWatchDirectoryCacheKey(sys.resolvePath(sys.getCurrentDirectory()), /*currentDriveKey*/ undefined);
        const statusCache = new Map<string, boolean>();
        sys.watchDirectory = (path, callback, recursive, options) => {
            const cacheKey = extractWatchDirectoryCacheKey(path, currentDrive);
            let status = cacheKey && statusCache.get(cacheKey);
            if (status === undefined) {
                if (logger.hasLevel(ts.server.LogLevel.verbose)) {
                    logger.info(`${cacheKey} for path ${path} not found in cache...`);
                }
                try {
                    const args = [combinePaths(libDirectory, "watchGuard.js"), path];
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
                return noopFileWatcher;
            }
        };
    }
    else {
        sys.watchDirectory = watchDirectorySwallowingException;
    }

    // Override sys.write because fs.writeSync is not reliable on Node 4
    sys.write = (s: string) => writeMessage(Buffer.from(s, "utf8"));

    /* eslint-disable no-restricted-globals */
    sys.setTimeout = setTimeout;
    sys.clearTimeout = clearTimeout;
    sys.setImmediate = setImmediate;
    sys.clearImmediate = clearImmediate;
    /* eslint-enable no-restricted-globals */

    if (typeof global !== "undefined" && global.gc) {
        sys.gc = () => global.gc?.();
    }

    const cancellationToken = createCancellationToken(sys.args);

    const localeStr = ts.server.findArgument("--locale");
    if (localeStr) {
        validateLocaleAndSetLanguage(localeStr, sys);
    }

    const modeOrUnknown = parseServerMode();
    let serverMode: LanguageServiceMode | undefined;
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
        startSession: startNodeSession,
    };

    // TSS_LOG "{ level: "normal | verbose | terse", file?: string}"
    function createLogger() {
        const cmdLineLogFileName = ts.server.findArgument("--logFile");
        const cmdLineVerbosity = getLogLevel(ts.server.findArgument("--logVerbosity"));
        const envLogOptions = parseLoggingEnvironmentString(process.env.TSS_LOG);

        const unsubstitutedLogFileName = cmdLineLogFileName
            ? stripQuotes(cmdLineLogFileName)
            : envLogOptions.logToFile
            ? envLogOptions.file || (libDirectory + "/.log" + process.pid.toString())
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
        path = normalizeSlashes(path);
        if (isUNCPath(path)) {
            // UNC path: extract server name
            // //server/location
            //         ^ <- from 0 to this position
            const firstSlash = path.indexOf(directorySeparator, 2);
            return firstSlash !== -1 ? toFileNameLowerCase(path.substring(0, firstSlash)) : path;
        }
        const rootLength = getRootLength(path);
        if (rootLength === 0) {
            // relative path - assume file is on the current drive
            return currentDriveKey;
        }
        if (path.charCodeAt(1) === CharacterCodes.colon && path.charCodeAt(2) === CharacterCodes.slash) {
            // rooted path that starts with c:/... - extract drive letter
            return toFileNameLowerCase(path.charAt(0));
        }
        if (path.charCodeAt(0) === CharacterCodes.slash && path.charCodeAt(1) !== CharacterCodes.slash) {
            // rooted path that starts with slash - /somename - use key for current drive
            return currentDriveKey;
        }
        // do not cache any other cases
        return undefined;
    }

    function isUNCPath(s: string): boolean {
        return s.length > 2 && s.charCodeAt(0) === CharacterCodes.slash && s.charCodeAt(1) === CharacterCodes.slash;
    }

    // This is the function that catches the exceptions when watching directory, and yet lets project service continue to function
    // Eg. on linux the number of watches are limited and one could easily exhaust watches and the exception ENOSPC is thrown when creating watcher at that point
    function watchDirectorySwallowingException(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher {
        try {
            return originalWatchDirectory(path, callback, recursive, options);
        }
        catch (e) {
            logger.info(`Exception when creating directory watcher: ${e.message}`);
            return noopFileWatcher;
        }
    }
}

function parseEventPort(eventPortStr: string | undefined) {
    const eventPort = eventPortStr === undefined ? undefined : parseInt(eventPortStr);
    return eventPort !== undefined && !isNaN(eventPort) ? eventPort : undefined;
}
function startNodeSession(options: StartSessionOptions, logger: ts.server.Logger, cancellationToken: ts.server.ServerCancellationToken) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    class NodeTypingsInstallerAdapter extends ts.server.TypingsInstallerAdapter {
        protected override installer!: childProcess.ChildProcess;
        // This number is essentially arbitrary.  Processing more than one typings request
        // at a time makes sense, but having too many in the pipe results in a hang
        // (see https://github.com/nodejs/node/issues/7657).
        // It would be preferable to base our limit on the amount of space left in the
        // buffer, but we have yet to find a way to retrieve that value.
        private static readonly maxActiveRequestCount = 10;

        constructor(
            telemetryEnabled: boolean,
            logger: ts.server.Logger,
            host: ts.server.ServerHost,
            globalTypingsCacheLocation: string,
            readonly typingSafeListLocation: string,
            readonly typesMapLocation: string,
            private readonly npmLocation: string | undefined,
            private readonly validateDefaultNpmLocation: boolean,
            event: ts.server.Event,
        ) {
            super(
                telemetryEnabled,
                logger,
                host,
                globalTypingsCacheLocation,
                event,
                NodeTypingsInstallerAdapter.maxActiveRequestCount,
            );
        }

        createInstallerProcess() {
            if (this.logger.hasLevel(ts.server.LogLevel.requestTime)) {
                this.logger.info("Binding...");
            }

            const args: string[] = [ts.server.Arguments.GlobalCacheLocation, this.globalTypingsCacheLocation];
            if (this.telemetryEnabled) {
                args.push(ts.server.Arguments.EnableTelemetry);
            }
            if (this.logger.loggingEnabled() && this.logger.getLogFileName()) {
                args.push(ts.server.Arguments.LogFile, combinePaths(getDirectoryPath(normalizeSlashes(this.logger.getLogFileName()!)), `ti-${process.pid}.log`));
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

            const typingsInstaller = combinePaths(getDirectoryPath(sys.getExecutingFilePath()), "typingsInstaller.js");
            this.installer = childProcess.fork(typingsInstaller, args, { execArgv });
            this.installer.on("message", m => this.handleMessage(m as any));

            // We have to schedule this event to the next tick
            // cause this fn will be called during
            // new IOSession => super(which is Session) => new ProjectService => NodeTypingsInstaller.attach
            // and if "event" is referencing "this" before super class is initialized, it will be a ReferenceError in ES6 class.
            this.host.setImmediate(() => this.event({ pid: this.installer.pid }, "typingsInstallerPid"));

            process.on("exit", () => {
                this.installer.kill();
            });
            return this.installer;
        }
    }

    class IOSession extends ts.server.Session {
        private eventPort: number | undefined;
        private eventSocket: net.Socket | undefined;
        private socketEventQueue: { body: any; eventName: string; }[] | undefined;
        /** No longer needed if syntax target is es6 or above. Any access to "this" before initialized will be a runtime error. */
        private constructed: boolean | undefined;

        constructor() {
            const event = (body: object, eventName: string) => {
                this.event(body, eventName);
            };

            const host = sys as ts.server.ServerHost;

            const typingsInstaller = disableAutomaticTypingAcquisition
                ? undefined
                : new NodeTypingsInstallerAdapter(telemetryEnabled, logger, host, getGlobalTypingsCacheLocation(), typingSafeListLocation, typesMapLocation, npmLocation, validateDefaultNpmLocation, event);

            super({
                host,
                cancellationToken,
                ...options,
                typingsInstaller,
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

        override event<T extends object>(body: T, eventName: string): void {
            Debug.assert(!!this.constructed, "Should only call `IOSession.prototype.event` on an initialized IOSession");

            if (this.canUseEvents && this.eventPort) {
                if (!this.eventSocket) {
                    if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                        this.logger.info(`eventPort: event "${eventName}" queued, but socket not yet initialized`);
                    }
                    (this.socketEventQueue || (this.socketEventQueue = [])).push({ body, eventName });
                    return;
                }
                else {
                    Debug.assert(this.socketEventQueue === undefined);
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

        override exit() {
            this.logger.info("Exiting...");
            this.projectService.closeLog();
            tracing?.stopTracing();
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
        protected override writeMessage(msg: ts.server.protocol.Message): void {
            const verboseLogging = logger.hasLevel(ts.server.LogLevel.verbose);
            if (verboseLogging) {
                const json = JSON.stringify(msg);
                logger.info(`${msg.type}:${ts.server.indent(json)}`);
            }

            process.send!(msg);
        }

        protected override parseMessage(message: any): ts.server.protocol.Request {
            return message as ts.server.protocol.Request;
        }

        protected override toStringMessage(message: any) {
            return JSON.stringify(message, undefined, 2);
        }

        public override listen() {
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
    const typesMapLocation = ts.server.findArgument(ts.server.Arguments.TypesMapLocation) || combinePaths(getDirectoryPath(sys.getExecutingFilePath()), "typesMap.json");
    const npmLocation = ts.server.findArgument(ts.server.Arguments.NpmLocation);
    const validateDefaultNpmLocation = ts.server.hasArgument(ts.server.Arguments.ValidateDefaultNpmLocation);
    const disableAutomaticTypingAcquisition = ts.server.hasArgument("--disableAutomaticTypingAcquisition");
    const useNodeIpc = ts.server.hasArgument("--useNodeIpc");
    const telemetryEnabled = ts.server.hasArgument(ts.server.Arguments.EnableTelemetry);
    const commandLineTraceDir = ts.server.findArgument("--traceDirectory");
    const traceDir = commandLineTraceDir
        ? stripQuotes(commandLineTraceDir)
        : process.env.TSS_TRACE;
    if (traceDir) {
        startTracing("server", traceDir);
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
                    (process.env.HOMEDRIVE && process.env.HOMEPATH && normalizeSlashes(process.env.HOMEDRIVE + process.env.HOMEPATH)) ||
                    os.tmpdir();
                return combinePaths(combinePaths(normalizeSlashes(basePath), "Microsoft/TypeScript"), versionMajorMinor);
            }
            case "openbsd":
            case "freebsd":
            case "netbsd":
            case "darwin":
            case "linux":
            case "android": {
                const cacheLocation = getNonWindowsCacheLocation(process.platform === "darwin");
                return combinePaths(combinePaths(cacheLocation, "typescript"), versionMajorMinor);
            }
            default:
                return Debug.fail(`unsupported platform '${process.platform}'`);
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
        return combinePaths(normalizeSlashes(homePath), cacheFolder);
    }
}

function pipeExists(name: string): boolean {
    // Unlike statSync, existsSync doesn't throw an exception if the target doesn't exist.
    // A comment in the node code suggests they're stuck with that decision for back compat
    // (https://github.com/nodejs/node/blob/9da241b600182a9ff400f6efc24f11a6303c27f7/lib/fs.js#L222).
    // Caveat: If a named pipe does exist, the first call to existsSync will return true, as for
    // statSync.  Subsequent calls will return false, whereas statSync would throw an exception
    // indicating that the pipe was busy.  The difference is immaterial, since our statSync
    // implementation returned false from its catch block.
    return fs.existsSync(name);
}

function createCancellationToken(args: string[]): ts.server.ServerCancellationToken {
    let cancellationPipeName: string | undefined;
    for (let i = 0; i < args.length - 1; i++) {
        if (args[i] === "--cancellationPipeName") {
            cancellationPipeName = args[i + 1];
            break;
        }
    }
    if (!cancellationPipeName) {
        return ts.server.nullCancellationToken;
    }
    // cancellationPipeName is a string without '*' inside that can optionally end with '*'
    // when client wants to signal cancellation it should create a named pipe with name=<cancellationPipeName>
    // server will synchronously check the presence of the pipe and treat its existence as indicator that current request should be canceled.
    // in case if client prefers to use more fine-grained schema than one name for all request it can add '*' to the end of cancellationPipeName.
    // in this case pipe name will be build dynamically as <cancellationPipeName><request_seq>.
    if (cancellationPipeName.charAt(cancellationPipeName.length - 1) === "*") {
        const namePrefix = cancellationPipeName.slice(0, -1);
        if (namePrefix.length === 0 || namePrefix.includes("*")) {
            throw new Error("Invalid name for template cancellation pipe: it should have length greater than 2 characters and contain only one '*'.");
        }
        let perRequestPipeName: string | undefined;
        let currentRequestId: number;
        return {
            isCancellationRequested: () => perRequestPipeName !== undefined && pipeExists(perRequestPipeName),
            setRequest(requestId: number) {
                currentRequestId = requestId;
                perRequestPipeName = namePrefix + requestId;
            },
            resetRequest(requestId: number) {
                if (currentRequestId !== requestId) {
                    throw new Error(`Mismatched request id, expected ${currentRequestId}, actual ${requestId}`);
                }
                perRequestPipeName = undefined;
            },
        };
    }
    else {
        return {
            isCancellationRequested: () => pipeExists(cancellationPipeName),
            setRequest: (_requestId: number): void => void 0,
            resetRequest: (_requestId: number): void => void 0,
        };
    }
}
