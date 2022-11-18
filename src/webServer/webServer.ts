/// <reference lib="dom" />
/// <reference lib="webworker.importscripts" />

import {
    indent,
    Logger,
    LogLevel,
    ModuleImportResult,
    Msg,
    nowString,
    nullTypingsInstaller,
    protocol,
    ServerCancellationToken,
    ServerHost,
    Session,
    SessionOptions,
} from "./_namespaces/ts.server";
import {
    combinePaths,
    Debug,
    directorySeparator,
    ensureTrailingDirectorySeparator,
    getDirectoryPath,
    identity,
    memoize,
    notImplemented,
    perfLogger,
    returnFalse,
    returnNoopFileWatcher,
    startsWith,
} from "./_namespaces/ts";

/** @internal */
export interface HostWithWriteMessage {
    writeMessage(s: any): void;
}
/** @internal */
export interface WebHost extends HostWithWriteMessage {
    readFile(path: string): string | undefined;
    fileExists(path: string): boolean;
}

/** @internal */
export class BaseLogger implements Logger {
    private seq = 0;
    private inGroup = false;
    private firstInGroup = true;
    constructor(protected readonly level: LogLevel) {
    }
    static padStringRight(str: string, padding: string) {
        return (str + padding).slice(0, padding.length);
    }
    close() {
    }
    getLogFileName(): string | undefined {
        return undefined;
    }
    perftrc(s: string) {
        this.msg(s, Msg.Perf);
    }
    info(s: string) {
        this.msg(s, Msg.Info);
    }
    err(s: string) {
        this.msg(s, Msg.Err);
    }
    startGroup() {
        this.inGroup = true;
        this.firstInGroup = true;
    }
    endGroup() {
        this.inGroup = false;
    }
    loggingEnabled() {
        return true;
    }
    hasLevel(level: LogLevel) {
        return this.loggingEnabled() && this.level >= level;
    }
    msg(s: string, type: Msg = Msg.Err) {
        switch (type) {
            case Msg.Info:
                perfLogger.logInfoEvent(s);
                break;
            case Msg.Perf:
                perfLogger.logPerfEvent(s);
                break;
            default: // Msg.Err
                perfLogger.logErrEvent(s);
                break;
        }

        if (!this.canWrite()) return;

        s = `[${nowString()}] ${s}\n`;
        if (!this.inGroup || this.firstInGroup) {
            const prefix = BaseLogger.padStringRight(type + " " + this.seq.toString(), "          ");
            s = prefix + s;
        }
        this.write(s, type);
        if (!this.inGroup) {
            this.seq++;
        }
    }
    protected canWrite() {
        return true;
    }
    protected write(_s: string, _type: Msg) {
    }
}

/** @internal */
export type MessageLogLevel = "info" | "perf" | "error";
/** @internal */
export interface LoggingMessage {
    readonly type: "log";
    readonly level: MessageLogLevel;
    readonly body: string
}
/** @internal */
export class MainProcessLogger extends BaseLogger {
    constructor(level: LogLevel, private host: HostWithWriteMessage) {
        super(level);
    }
    protected write(body: string, type: Msg) {
        let level: MessageLogLevel;
        switch (type) {
            case Msg.Info:
                level = "info";
                break;
            case Msg.Perf:
                level = "perf";
                break;
            case Msg.Err:
                level = "error";
                break;
            default:
                Debug.assertNever(type);
        }
        this.host.writeMessage({
            type: "log",
            level,
            body,
        } as LoggingMessage);
    }
}

/** @internal */
export function createWebSystem(host: WebHost, args: string[], getExecutingFilePath: () => string): ServerHost {
    const returnEmptyString = () => "";
    const getExecutingDirectoryPath = memoize(() => memoize(() => ensureTrailingDirectorySeparator(getDirectoryPath(getExecutingFilePath()))));
    // Later we could map ^memfs:/ to do something special if we want to enable more functionality like module resolution or something like that
    const getWebPath = (path: string) => startsWith(path, directorySeparator) ? path.replace(directorySeparator, getExecutingDirectoryPath()) : undefined;

    return {
        args,
        newLine: "\r\n", // This can be configured by clients
        useCaseSensitiveFileNames: false, // Use false as the default on web since that is the safest option
        readFile: path => {
            const webPath = getWebPath(path);
            return webPath && host.readFile(webPath);
        },
        write: host.writeMessage.bind(host),
        watchFile: returnNoopFileWatcher,
        watchDirectory: returnNoopFileWatcher,

        getExecutingFilePath: () => directorySeparator,
        getCurrentDirectory: returnEmptyString, // For inferred project root if projectRoot path is not set, normalizing the paths

        /* eslint-disable no-restricted-globals */
        setTimeout: (cb, ms, ...args) => setTimeout(cb, ms, ...args),
        clearTimeout: handle => clearTimeout(handle),
        setImmediate: x => setTimeout(x, 0),
        clearImmediate: handle => clearTimeout(handle),
        /* eslint-enable no-restricted-globals */

        importPlugin: async (initialDir: string, moduleName: string): Promise<ModuleImportResult> => {
            const packageRoot = combinePaths(initialDir, moduleName);

            let packageJson: any | undefined;
            try {
                const packageJsonResponse = await fetch(combinePaths(packageRoot, "package.json"));
                packageJson = await packageJsonResponse.json();
            }
            catch (e) {
                return { module: undefined, error: new Error("Could not load plugin. Could not load 'package.json'.") };
            }

            const browser = packageJson.browser;
            if (!browser) {
                return { module: undefined, error: new Error("Could not load plugin. No 'browser' field found in package.json.") };
            }

            const scriptPath = combinePaths(packageRoot, browser);
            try {
                const { default: module } = await import(scriptPath);
                return { module, error: undefined };
            }
            catch (e) {
                return { module: undefined, error: e };
            }
        },
        exit: notImplemented,

        // Debugging related
        getEnvironmentVariable: returnEmptyString, // TODO:: Used to enable debugging info
        // tryEnableSourceMapsForHost?(): void;
        // debugMode?: boolean;

        // For semantic server mode
        fileExists: path => {
            const webPath = getWebPath(path);
            return !!webPath && host.fileExists(webPath);
        },
        directoryExists: returnFalse, // Module resolution
        readDirectory: notImplemented, // Configured project, typing installer
        getDirectories: () => [], // For automatic type reference directives
        createDirectory: notImplemented, // compile On save
        writeFile: notImplemented, // compile on save
        resolvePath: identity, // Plugins
        // realpath? // Module resolution, symlinks
        // getModifiedTime // File watching
        // createSHA256Hash // telemetry of the project

        // Logging related
        // /** @internal */ bufferFrom?(input: string, encoding?: string): Buffer;
        // gc?(): void;
        // getMemoryUsage?(): number;
    };
}

/** @internal */
export interface StartSessionOptions {
    globalPlugins: SessionOptions["globalPlugins"];
    pluginProbeLocations: SessionOptions["pluginProbeLocations"];
    allowLocalPluginLoads: SessionOptions["allowLocalPluginLoads"];
    useSingleInferredProject: SessionOptions["useSingleInferredProject"];
    useInferredProjectPerProjectRoot: SessionOptions["useInferredProjectPerProjectRoot"];
    suppressDiagnosticEvents: SessionOptions["suppressDiagnosticEvents"];
    noGetErrOnBackgroundUpdate: SessionOptions["noGetErrOnBackgroundUpdate"];
    syntaxOnly: SessionOptions["syntaxOnly"];
    serverMode: SessionOptions["serverMode"];
}
/** @internal */
export class WorkerSession extends Session<{}> {
    constructor(host: ServerHost, private webHost: HostWithWriteMessage, options: StartSessionOptions, logger: Logger, cancellationToken: ServerCancellationToken, hrtime: SessionOptions["hrtime"]) {
        super({
            host,
            cancellationToken,
            ...options,
            typingsInstaller: nullTypingsInstaller,
            byteLength: notImplemented, // Formats the message text in send of Session which is overriden in this class so not needed
            hrtime,
            logger,
            canUseEvents: true,
        });
    }

    public send(msg: protocol.Message) {
        if (msg.type === "event" && !this.canUseEvents) {
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`Session does not support events: ignored event: ${JSON.stringify(msg)}`);
            }
            return;
        }
        if (this.logger.hasLevel(LogLevel.verbose)) {
            this.logger.info(`${msg.type}:${indent(JSON.stringify(msg))}`);
        }
        this.webHost.writeMessage(msg);
    }

    protected parseMessage(message: {}): protocol.Request {
        return message as protocol.Request;
    }

    protected toStringMessage(message: {}) {
        return JSON.stringify(message, undefined, 2);
    }
}
