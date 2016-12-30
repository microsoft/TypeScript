/// <reference types="node" />
/// <reference path="shared.ts" />
/// <reference path="session.ts" />
// used in fs.writeSync
/* tslint:disable:no-null-keyword */

namespace ts.server {

    const net: {
        connect(options: { port: number }, onConnect?: () => void): NodeSocket
    } = require("net");

    const childProcess: {
        fork(modulePath: string, args: string[], options?: { execArgv: string[], env?: MapLike<string> }): NodeChildProcess;
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
                return combinePaths(normalizeSlashes(basePath), "Microsoft/TypeScript");
            }
            case "darwin":
            case "linux":
            case "android": {
                const cacheLocation = getNonWindowsCacheLocation(process.platform === "darwin");
                return combinePaths(cacheLocation, "typescript");
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
        const usersDir = platformIsDarwin ? "Users" : "home"
        const homePath = (os.homedir && os.homedir()) ||
            process.env.HOME ||
            ((process.env.LOGNAME || process.env.USER) && `/${usersDir}/${process.env.LOGNAME || process.env.USER}`) ||
            os.tmpdir();
        const cacheFolder = platformIsDarwin
            ? "Library/Caches"
            : ".cache"
        return combinePaths(normalizeSlashes(homePath), cacheFolder);
    }

    interface NodeChildProcess {
        send(message: any, sendHandle?: any): void;
        on(message: "message", f: (m: any) => void): void;
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

    class Logger implements ts.server.Logger {
        private fd = -1;
        private seq = 0;
        private inGroup = false;
        private firstInGroup = true;

        constructor(private readonly logFilename: string,
            private readonly traceToConsole: boolean,
            private readonly level: LogLevel) {
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
            if (this.fd < 0) {
                if (this.logFilename) {
                    this.fd = fs.openSync(this.logFilename, "w");
                }
            }
            if (this.fd >= 0 || this.traceToConsole) {
                s = s + "\n";
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
                    fs.writeSync(this.fd, buf, 0, buf.length, null);
                }
                if (this.traceToConsole) {
                    console.warn(s);
                }
            }
        }
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
            const execArgv: string[] = [];
            {
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

        private handleMessage(response: SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes) {
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`Received response: ${JSON.stringify(response)}`);
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
            if (response.kind == ActionSet && this.socket) {
                this.sendEvent(0, "setTypings", response);
            }
        }
    }

    class IOSession extends Session {
        constructor(
            host: ServerHost,
            cancellationToken: HostCancellationToken,
            installerEventPort: number,
            canUseEvents: boolean,
            useSingleInferredProject: boolean,
            disableAutomaticTypingAcquisition: boolean,
            globalTypingsCacheLocation: string,
            telemetryEnabled: boolean,
            logger: server.Logger) {
                const typingsInstaller = disableAutomaticTypingAcquisition
                    ? undefined
                    : new NodeTypingsInstaller(telemetryEnabled, logger, host, installerEventPort, globalTypingsCacheLocation, host.newLine);

                super(
                    host,
                    cancellationToken,
                    useSingleInferredProject,
                    typingsInstaller || nullTypingsInstaller,
                    Buffer.byteLength,
                    process.hrtime,
                    logger,
                    canUseEvents);

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
                        const level: LogLevel = (<any>LogLevel)[value];
                        logEnv.detailLevel = typeof level === "number" ? level : LogLevel.normal;
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

    // TSS_LOG "{ level: "normal | verbose | terse", file?: string}"
    function createLoggerFromEnv() {
        let fileName: string = undefined;
        let detailLevel = LogLevel.normal;
        let traceToConsole = false;
        const logEnvStr = process.env["TSS_LOG"];
        if (logEnvStr) {
            const logEnv = parseLoggingEnvironmentString(logEnvStr);
            if (logEnv.logToFile) {
                if (logEnv.file) {
                    fileName = logEnv.file;
                }
                else {
                    fileName = __dirname + "/.log" + process.pid.toString();
                }
            }
            if (logEnv.detailLevel) {
                detailLevel = logEnv.detailLevel;
            }
            traceToConsole = logEnv.traceToConsole;
        }
        return new Logger(fileName, traceToConsole, detailLevel);
    }
    // This places log file in the directory containing editorServices.js
    // TODO: check that this location is writable

    // average async stat takes about 30 microseconds
    // set chunk size to do 30 files in < 1 millisecond
    function createPollingWatchedFileSet(interval = 2500, chunkSize = 30) {
        const watchedFiles: WatchedFile[] = [];
        let nextFileToCheck = 0;
        let watchTimer: any;

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
                    watchedFile.callback(watchedFile.fileName);
                }
                else if (watchedFile.mtime.getTime() !== stats.mtime.getTime()) {
                    watchedFile.mtime = getModifiedTime(watchedFile.fileName);
                    watchedFile.callback(watchedFile.fileName, watchedFile.mtime.getTime() === 0);
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
                mtime: getModifiedTime(fileName)
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

        return {
            getModifiedTime: getModifiedTime,
            poll: poll,
            startWatchTimer: startWatchTimer,
            addFile: addFile,
            removeFile: removeFile
        };
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
    const logger = createLoggerFromEnv();

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

    const sys = <ServerHost>ts.sys;

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

    let cancellationToken: HostCancellationToken;
    try {
        const factory = require("./cancellationToken");
        cancellationToken = factory(sys.args);
    }
    catch (e) {
        cancellationToken = {
            isCancellationRequested: () => false
        };
    };

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

    const useSingleInferredProject = hasArgument("--useSingleInferredProject");
    const disableAutomaticTypingAcquisition = hasArgument("--disableAutomaticTypingAcquisition");
    const telemetryEnabled = hasArgument(Arguments.EnableTelemetry);

    const ioSession = new IOSession(
        sys,
        cancellationToken,
        eventPort,
        /*canUseEvents*/ eventPort === undefined,
        useSingleInferredProject,
        disableAutomaticTypingAcquisition,
        getGlobalTypingsCacheLocation(),
        telemetryEnabled,
        logger);
    process.on("uncaughtException", function (err: Error) {
        ioSession.logError(err, "unknown");
    });
    // See https://github.com/Microsoft/TypeScript/issues/11348
    (process as any).noAsar = true;
    // Start listening
    ioSession.listen();
}
