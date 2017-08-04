/// <reference types="node" />
/// <reference path="shared.ts" />
/// <reference path="session.ts" />

namespace ts.server {
    interface IOSessionOptions {
        host: ServerHost;
        cancellationToken: ServerCancellationToken;
        canUseEvents: boolean;
        installerEventPort: number;
        useSingleInferredProject: boolean;
        disableAutomaticTypingAcquisition: boolean;
        globalTypingsCacheLocation: string;
        logger: Logger;
        typingSafeListLocation: string;
        npmLocation: string | undefined;
        telemetryEnabled: boolean;
        globalPlugins: string[];
        pluginProbeLocations: string[];
        allowLocalPluginLoads: boolean;
    }

    const net: {
        connect(options: { port: number }, onConnect?: () => void): NodeSocket
    } = require("net");

    const childProcess: {
        fork(modulePath: string, args: string[], options?: { execArgv: string[], env?: MapLike<string> }): NodeChildProcess;
        execFileSync(file: string, args: string[], options: { stdio: "ignore", env: MapLike<string> }): string | Buffer;
    } = require("child_process");

    const os: {
        homedir?(): string;
        tmpdir(): string;
    } = require("os");

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
            case "darwin":
            case "linux":
            case "android": {
                const cacheLocation = getNonWindowsCacheLocation(process.platform === "darwin");
                return combinePaths(combinePaths(cacheLocation, "typescript"), versionMajorMinor);
            }
            default:
                Debug.fail(`unsupported platform '${process.platform}'`);
                return;
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

    interface NodeChildProcess {
        send(message: any, sendHandle?: any): void;
        on(message: "message" | "exit", f: (m: any) => void): void;
        kill(): void;
        pid: number;
    }

    interface NodeSocket {
        write(data: string, encoding: string): boolean;
    }

    interface ReadLineOptions {
        input: NodeJS.ReadableStream;
        output?: NodeJS.WritableStream;
        terminal?: boolean;
        historySize?: number;
    }

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

    type RequireResult = { module: {}, error: undefined } | { module: undefined, error: {} };

    const readline: {
        createInterface(options: ReadLineOptions): NodeJS.EventEmitter;
    } = require("readline");

    const fs: {
        openSync(path: string, options: string): number;
        close(fd: number): void;
        writeSync(fd: number, buffer: Buffer, offset: number, length: number, position?: number): number;
        writeSync(fd: number, data: any, position?: number, enconding?: string): number;
        statSync(path: string): Stats;
        stat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    } = require("fs");


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    class Logger implements server.Logger {
        private fd = -1;
        private seq = 0;
        private inGroup = false;
        private firstInGroup = true;

        constructor(private readonly logFilename: string,
            private readonly traceToConsole: boolean,
            private readonly level: LogLevel) {
            if (this.logFilename) {
                try {
                    this.fd = fs.openSync(this.logFilename, "w");
                }
                catch (_) {
                    // swallow the error and keep logging disabled if file cannot be opened
                }
            }
        }

        static padStringRight(str: string, padding: string) {
            return (str + padding).slice(0, padding.length);
        }

        close() {
            if (this.fd >= 0) {
                fs.close(this.fd);
            }
        }

        getLogFileName() {
            return this.logFilename;
        }

        perftrc(s: string) {
            this.msg(s, Msg.Perf);
        }

        info(s: string) {
            this.msg(s, Msg.Info);
        }

        startGroup() {
            this.inGroup = true;
            this.firstInGroup = true;
        }

        endGroup() {
            this.inGroup = false;
            this.seq++;
            this.firstInGroup = true;
        }

        loggingEnabled() {
            return !!this.logFilename || this.traceToConsole;
        }

        hasLevel(level: LogLevel) {
            return this.loggingEnabled() && this.level >= level;
        }

        msg(s: string, type: Msg.Types = Msg.Err) {
            if (this.fd >= 0 || this.traceToConsole) {
                s = `[${nowString()}] ${s}\n`;
                const prefix = Logger.padStringRight(type + " " + this.seq.toString(), "          ");
                if (this.firstInGroup) {
                    s = prefix + s;
                    this.firstInGroup = false;
                }
                if (!this.inGroup) {
                    this.seq++;
                    this.firstInGroup = true;
                }
                if (this.fd >= 0) {
                    const buf = new Buffer(s);
                    // tslint:disable-next-line no-null-keyword
                    fs.writeSync(this.fd, buf, 0, buf.length, /*position*/ null);
                }
                if (this.traceToConsole) {
                    console.warn(s);
                }
            }
        }
    }

    // E.g. "12:34:56.789"
    function nowString() {
        const d = new Date();
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
    }

    class NodeTypingsInstaller implements ITypingsInstaller {
        private installer: NodeChildProcess;
        private installerPidReported = false;
        private socket: NodeSocket;
        private projectService: ProjectService;
        private throttledOperations: ThrottledOperations;
        private eventSender: EventSender;

        constructor(
            private readonly telemetryEnabled: boolean,
            private readonly logger: server.Logger,
            host: ServerHost,
            eventPort: number,
            readonly globalTypingsCacheLocation: string,
            readonly typingSafeListLocation: string,
            private readonly npmLocation: string | undefined,
            private newLine: string) {
            this.throttledOperations = new ThrottledOperations(host);
            if (eventPort) {
                const s = net.connect({ port: eventPort }, () => {
                    this.socket = s;
                    this.reportInstallerProcessId();
                });
            }
        }

        private reportInstallerProcessId() {
            if (this.installerPidReported) {
                return;
            }
            if (this.socket && this.installer) {
                this.sendEvent(0, "typingsInstallerPid", { pid: this.installer.pid });
                this.installerPidReported = true;
            }
        }

        private sendEvent(seq: number, event: string, body: any): void {
            this.socket.write(formatMessage({ seq, type: "event", event, body }, this.logger, Buffer.byteLength, this.newLine), "utf8");
        }

        setTelemetrySender(telemetrySender: EventSender) {
            this.eventSender = telemetrySender;
        }

        attach(projectService: ProjectService) {
            this.projectService = projectService;
            if (this.logger.hasLevel(LogLevel.requestTime)) {
                this.logger.info("Binding...");
            }

            const args: string[] = [Arguments.GlobalCacheLocation, this.globalTypingsCacheLocation];
            if (this.telemetryEnabled) {
                args.push(Arguments.EnableTelemetry);
            }
            if (this.logger.loggingEnabled() && this.logger.getLogFileName()) {
                args.push(Arguments.LogFile, combinePaths(getDirectoryPath(normalizeSlashes(this.logger.getLogFileName())), `ti-${process.pid}.log`));
            }
            if (this.typingSafeListLocation) {
                args.push(Arguments.TypingSafeListLocation, this.typingSafeListLocation);
            }
            if (this.npmLocation) {
                args.push(Arguments.NpmLocation, this.npmLocation);
            }

            const execArgv: string[] = [];
            for (const arg of process.execArgv) {
                const match = /^--(debug|inspect)(=(\d+))?$/.exec(arg);
                if (match) {
                    // if port is specified - use port + 1
                    // otherwise pick a default port depending on if 'debug' or 'inspect' and use its value + 1
                    const currentPort = match[3] !== undefined
                        ? +match[3]
                        : match[1] === "debug" ? 5858 : 9229;
                    execArgv.push(`--${match[1]}=${currentPort + 1}`);
                    break;
                }
            }

            this.installer = childProcess.fork(combinePaths(__dirname, "typingsInstaller.js"), args, { execArgv });
            this.installer.on("message", m => this.handleMessage(m));
            this.reportInstallerProcessId();

            process.on("exit", () => {
                this.installer.kill();
            });
        }

        onProjectClosed(p: Project): void {
            this.installer.send({ projectName: p.getProjectName(), kind: "closeProject" });
        }

        enqueueInstallTypingsRequest(project: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>): void {
            const request = createInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            if (this.logger.hasLevel(LogLevel.verbose)) {
                if (this.logger.hasLevel(LogLevel.verbose)) {
                    this.logger.info(`Scheduling throttled operation: ${JSON.stringify(request)}`);
                }
            }
            this.throttledOperations.schedule(project.getProjectName(), /*ms*/ 250, () => {
                if (this.logger.hasLevel(LogLevel.verbose)) {
                    this.logger.info(`Sending request: ${JSON.stringify(request)}`);
                }
                this.installer.send(request);
            });
        }

        private handleMessage(response: SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes | InitializationFailedResponse) {
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`Received response: ${JSON.stringify(response)}`);
            }

            if (response.kind === EventInitializationFailed) {
                if (!this.eventSender) {
                    return;
                }
                const body: protocol.TypesInstallerInitializationFailedEventBody = {
                    message: response.message
                };
                const eventName: protocol.TypesInstallerInitializationFailedEventName = "typesInstallerInitializationFailed";
                this.eventSender.event(body, eventName);
                return;
            }

            if (response.kind === EventBeginInstallTypes) {
                if (!this.eventSender) {
                    return;
                }
                const body: protocol.BeginInstallTypesEventBody = {
                    eventId: response.eventId,
                    packages: response.packagesToInstall,
                };
                const eventName: protocol.BeginInstallTypesEventName = "beginInstallTypes";
                this.eventSender.event(body, eventName);

                return;
            }

            if (response.kind === EventEndInstallTypes) {
                if (!this.eventSender) {
                    return;
                }
                if (this.telemetryEnabled) {
                    const body: protocol.TypingsInstalledTelemetryEventBody = {
                        telemetryEventName: "typingsInstalled",
                        payload: {
                            installedPackages: response.packagesToInstall.join(","),
                            installSuccess: response.installSuccess,
                            typingsInstallerVersion: response.typingsInstallerVersion
                        }
                    };
                    const eventName: protocol.TelemetryEventName = "telemetry";
                    this.eventSender.event(body, eventName);
                }

                const body: protocol.EndInstallTypesEventBody = {
                    eventId: response.eventId,
                    packages: response.packagesToInstall,
                    success: response.installSuccess,
                };
                const eventName: protocol.EndInstallTypesEventName = "endInstallTypes";
                this.eventSender.event(body, eventName);
                return;
            }

            this.projectService.updateTypingsForProject(response);
            if (response.kind === ActionSet && this.socket) {
                this.sendEvent(0, "setTypings", response);
            }
        }
    }

    class IOSession extends Session {
        constructor(options: IOSessionOptions) {
            const { host, installerEventPort, globalTypingsCacheLocation, typingSafeListLocation, npmLocation, canUseEvents } = options;
            const typingsInstaller = disableAutomaticTypingAcquisition
                ? undefined
                : new NodeTypingsInstaller(telemetryEnabled, logger, host, installerEventPort, globalTypingsCacheLocation, typingSafeListLocation, npmLocation, host.newLine);

            super({
                host,
                cancellationToken,
                useSingleInferredProject,
                typingsInstaller: typingsInstaller || nullTypingsInstaller,
                byteLength: Buffer.byteLength,
                hrtime: process.hrtime,
                logger,
                canUseEvents,
                globalPlugins: options.globalPlugins,
                pluginProbeLocations: options.pluginProbeLocations,
                allowLocalPluginLoads: options.allowLocalPluginLoads });

            if (telemetryEnabled && typingsInstaller) {
                typingsInstaller.setTelemetrySender(this);
            }
        }

        exit() {
            this.logger.info("Exiting...");
            this.projectService.closeLog();
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

    interface LogOptions {
        file?: string;
        detailLevel?: LogLevel;
        traceToConsole?: boolean;
        logToFile?: boolean;
    }

    function parseLoggingEnvironmentString(logEnvStr: string): LogOptions {
        if (!logEnvStr) {
            return {};
        }
        const logEnv: LogOptions = { logToFile: true };
        const args = logEnvStr.split(" ");
        const len = args.length - 1;
        for (let i = 0; i < len; i += 2) {
            const option = args[i];
            const value = args[i + 1];
            if (option && value) {
                switch (option) {
                    case "-file":
                        logEnv.file = stripQuotes(value);
                        break;
                    case "-level":
                        const level = getLogLevel(value);
                        logEnv.detailLevel = level !== undefined ? level : LogLevel.normal;
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
    }

    function getLogLevel(level: string) {
        if (level) {
            const l = level.toLowerCase();
            for (const name in LogLevel) {
                if (isNaN(+name) && l === name.toLowerCase()) {
                    return <LogLevel><any>LogLevel[name];
                }
            }
        }
        return undefined;
    }

    // TSS_LOG "{ level: "normal | verbose | terse", file?: string}"
    function createLogger() {
        const cmdLineLogFileName = findArgument("--logFile");
        const cmdLineVerbosity = getLogLevel(findArgument("--logVerbosity"));
        const envLogOptions = parseLoggingEnvironmentString(process.env["TSS_LOG"]);

        const logFileName = cmdLineLogFileName
            ? stripQuotes(cmdLineLogFileName)
            : envLogOptions.logToFile
                ? envLogOptions.file || (__dirname + "/.log" + process.pid.toString())
                : undefined;

        const logVerbosity = cmdLineVerbosity || envLogOptions.detailLevel;
        return new Logger(logFileName, envLogOptions.traceToConsole, logVerbosity);
    }
    // This places log file in the directory containing editorServices.js
    // TODO: check that this location is writable

    // average async stat takes about 30 microseconds
    // set chunk size to do 30 files in < 1 millisecond
    function createPollingWatchedFileSet(interval = 2500, chunkSize = 30) {
        const watchedFiles: WatchedFile[] = [];
        let nextFileToCheck = 0;
        let watchTimer: any;
        return { getModifiedTime, poll, startWatchTimer, addFile, removeFile };

        function getModifiedTime(fileName: string): Date {
            return fs.statSync(fileName).mtime;
        }

        function poll(checkedIndex: number) {
            const watchedFile = watchedFiles[checkedIndex];
            if (!watchedFile) {
                return;
            }

            fs.stat(watchedFile.fileName, (err: any, stats: any) => {
                if (err) {
                    watchedFile.callback(watchedFile.fileName, FileWatcherEventKind.Changed);
                }
                else {
                    const oldTime = watchedFile.mtime.getTime();
                    const newTime = stats.mtime.getTime();
                    if (oldTime !== newTime) {
                        watchedFile.mtime = stats.mtime;
                        const eventKind = oldTime === 0
                            ? FileWatcherEventKind.Created
                            : newTime === 0
                                ? FileWatcherEventKind.Deleted
                                : FileWatcherEventKind.Changed;
                        watchedFile.callback(watchedFile.fileName, eventKind);
                    }
                }
            });
        }

        // this implementation uses polling and
        // stat due to inconsistencies of fs.watch
        // and efficiency of stat on modern filesystems
        function startWatchTimer() {
            watchTimer = setInterval(() => {
                let count = 0;
                let nextToCheck = nextFileToCheck;
                let firstCheck = -1;
                while ((count < chunkSize) && (nextToCheck !== firstCheck)) {
                    poll(nextToCheck);
                    if (firstCheck < 0) {
                        firstCheck = nextToCheck;
                    }
                    nextToCheck++;
                    if (nextToCheck === watchedFiles.length) {
                        nextToCheck = 0;
                    }
                    count++;
                }
                nextFileToCheck = nextToCheck;
            }, interval);
        }

        function addFile(fileName: string, callback: FileWatcherCallback): WatchedFile {
            const file: WatchedFile = {
                fileName,
                callback,
                mtime: sys.fileExists(fileName)
                    ? getModifiedTime(fileName)
                    : new Date(0) // Any subsequent modification will occur after this time
            };

            watchedFiles.push(file);
            if (watchedFiles.length === 1) {
                startWatchTimer();
            }
            return file;
        }

        function removeFile(file: WatchedFile) {
            unorderedRemoveItem(watchedFiles, file);
        }
    }

    // REVIEW: for now this implementation uses polling.
    // The advantage of polling is that it works reliably
    // on all os and with network mounted files.
    // For 90 referenced files, the average time to detect
    // changes is 2*msInterval (by default 5 seconds).
    // The overhead of this is .04 percent (1/2500) with
    // average pause of < 1 millisecond (and max
    // pause less than 1.5 milliseconds); question is
    // do we anticipate reference sets in the 100s and
    // do we care about waiting 10-20 seconds to detect
    // changes for large reference sets? If so, do we want
    // to increase the chunk size or decrease the interval
    // time dynamically to match the large reference set?
    const pollingWatchedFileSet = createPollingWatchedFileSet();

    const pending: Buffer[] = [];
    let canWrite = true;

    function writeMessage(buf: Buffer) {
        if (!canWrite) {
            pending.push(buf);
        }
        else {
            canWrite = false;
            process.stdout.write(buf, setCanWriteFlagAndWriteMessageIfNecessary);
        }
    }

    function setCanWriteFlagAndWriteMessageIfNecessary() {
        canWrite = true;
        if (pending.length) {
            writeMessage(pending.shift());
        }
    }

    function extractWatchDirectoryCacheKey(path: string, currentDriveKey: string) {
        path = normalizeSlashes(path);
        if (isUNCPath(path)) {
            // UNC path: extract server name
            // //server/location
            //         ^ <- from 0 to this position
            const firstSlash = path.indexOf(directorySeparator, 2);
            return firstSlash !== -1 ? path.substring(0, firstSlash).toLowerCase() : path;
        }
        const rootLength = getRootLength(path);
        if (rootLength === 0) {
            // relative path - assume file is on the current drive
            return currentDriveKey;
        }
        if (path.charCodeAt(1) === CharacterCodes.colon && path.charCodeAt(2) === CharacterCodes.slash) {
            // rooted path that starts with c:/... - extract drive letter
            return path.charAt(0).toLowerCase();
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

    const logger = createLogger();

    const sys = <ServerHost>ts.sys;
    // use watchGuard process on Windows when node version is 4 or later
    const useWatchGuard = process.platform === "win32" && getNodeMajorVersion() >= 4;
    if (useWatchGuard) {
        const currentDrive = extractWatchDirectoryCacheKey(sys.resolvePath(sys.getCurrentDirectory()), /*currentDriveKey*/ undefined);
        const statusCache = createMap<boolean>();
        const originalWatchDirectory = sys.watchDirectory;
        sys.watchDirectory = function (path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher {
            const cacheKey = extractWatchDirectoryCacheKey(path, currentDrive);
            let status = cacheKey && statusCache.get(cacheKey);
            if (status === undefined) {
                if (logger.hasLevel(LogLevel.verbose)) {
                    logger.info(`${cacheKey} for path ${path} not found in cache...`);
                }
                try {
                    const args = [combinePaths(__dirname, "watchGuard.js"), path];
                    if (logger.hasLevel(LogLevel.verbose)) {
                        logger.info(`Starting ${process.execPath} with args ${JSON.stringify(args)}`);
                    }
                    childProcess.execFileSync(process.execPath, args, { stdio: "ignore", env: { "ELECTRON_RUN_AS_NODE": "1" } });
                    status = true;
                    if (logger.hasLevel(LogLevel.verbose)) {
                        logger.info(`WatchGuard for path ${path} returned: OK`);
                    }
                }
                catch (e) {
                    status = false;
                    if (logger.hasLevel(LogLevel.verbose)) {
                        logger.info(`WatchGuard for path ${path} returned: ${e.message}`);
                    }
                }
                if (cacheKey) {
                    statusCache.set(cacheKey, status);
                }
            }
            else if (logger.hasLevel(LogLevel.verbose)) {
                logger.info(`watchDirectory for ${path} uses cached drive information.`);
            }
            if (status) {
                // this drive is safe to use - call real 'watchDirectory'
                return originalWatchDirectory.call(sys, path, callback, recursive);
            }
            else {
                // this drive is unsafe - return no-op watcher
                return { close() { } };
            }
        };
    }

    // Override sys.write because fs.writeSync is not reliable on Node 4
    sys.write = (s: string) => writeMessage(new Buffer(s, "utf8"));
    sys.watchFile = (fileName, callback) => {
        const watchedFile = pollingWatchedFileSet.addFile(fileName, callback);
        return {
            close: () => pollingWatchedFileSet.removeFile(watchedFile)
        };
    };

    sys.setTimeout = setTimeout;
    sys.clearTimeout = clearTimeout;
    sys.setImmediate = setImmediate;
    sys.clearImmediate = clearImmediate;
    if (typeof global !== "undefined" && global.gc) {
        sys.gc = () => global.gc();
    }

    sys.require = (initialDir: string, moduleName: string): RequireResult => {
        try {
            return { module: require(resolveJavaScriptModule(moduleName, initialDir, sys)), error: undefined };
        }
        catch (error) {
            return { module: undefined, error };
        }
    };

    let cancellationToken: ServerCancellationToken;
    try {
        const factory = require("./cancellationToken");
        cancellationToken = factory(sys.args);
    }
    catch (e) {
        cancellationToken = nullCancellationToken;
    }

    let eventPort: number;
    {
        const str = findArgument("--eventPort");
        const v = str && parseInt(str);
        if (!isNaN(v)) {
            eventPort = v;
        }
    }

    const localeStr = findArgument("--locale");
    if (localeStr) {
        validateLocaleAndSetLanguage(localeStr, sys);
    }

    setStackTraceLimit();

    const typingSafeListLocation = findArgument(Arguments.TypingSafeListLocation);
    const npmLocation = findArgument(Arguments.NpmLocation);

    const globalPlugins = (findArgument("--globalPlugins") || "").split(",");
    const pluginProbeLocations = (findArgument("--pluginProbeLocations") || "").split(",");
    const allowLocalPluginLoads = hasArgument("--allowLocalPluginLoads");

    const useSingleInferredProject = hasArgument("--useSingleInferredProject");
    const disableAutomaticTypingAcquisition = hasArgument("--disableAutomaticTypingAcquisition");
    const telemetryEnabled = hasArgument(Arguments.EnableTelemetry);

    const options: IOSessionOptions = {
        host: sys,
        cancellationToken,
        installerEventPort: eventPort,
        canUseEvents: eventPort === undefined,
        useSingleInferredProject,
        disableAutomaticTypingAcquisition,
        globalTypingsCacheLocation: getGlobalTypingsCacheLocation(),
        typingSafeListLocation,
        npmLocation,
        telemetryEnabled,
        logger,
        globalPlugins,
        pluginProbeLocations,
        allowLocalPluginLoads
    };

    const ioSession = new IOSession(options);
    process.on("uncaughtException", function (err: Error) {
        ioSession.logError(err, "unknown");
    });
    // See https://github.com/Microsoft/TypeScript/issues/11348
    (process as any).noAsar = true;
    // Start listening
    ioSession.listen();
}
