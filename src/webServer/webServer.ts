import * as ts from "./_namespaces/ts";

declare const fetch: any;
declare const importScripts: any;

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
export class BaseLogger implements ts.server.Logger {
    private seq = 0;
    private inGroup = false;
    private firstInGroup = true;
    constructor(protected readonly level: ts.server.LogLevel) {
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
        return true;
    }
    hasLevel(level: ts.server.LogLevel) {
        return this.loggingEnabled() && this.level >= level;
    }
    msg(s: string, type: ts.server.Msg = ts.server.Msg.Err) {
        switch (type) {
            case ts.server.Msg.Info:
                ts.perfLogger.logInfoEvent(s);
                break;
            case ts.server.Msg.Perf:
                ts.perfLogger.logPerfEvent(s);
                break;
            default: // Msg.Err
                ts.perfLogger.logErrEvent(s);
                break;
        }

        if (!this.canWrite()) return;

        s = `[${ts.server.nowString()}] ${s}\n`;
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
    protected write(_s: string, _type: ts.server.Msg) {
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
    constructor(level: ts.server.LogLevel, private host: HostWithWriteMessage) {
        super(level);
    }
    protected write(body: string, type: ts.server.Msg) {
        let level: MessageLogLevel;
        switch (type) {
            case ts.server.Msg.Info:
                level = "info";
                break;
            case ts.server.Msg.Perf:
                level = "perf";
                break;
            case ts.server.Msg.Err:
                level = "error";
                break;
            default:
                ts.Debug.assertNever(type);
        }
        this.host.writeMessage({
            type: "log",
            level,
            body,
        } as LoggingMessage);
    }
}

// Attempt to load `dynamicImport`
if (typeof importScripts === "function") {
    try {
        // NOTE: importScripts is synchronous
        importScripts("dynamicImportCompat.js");
    }
    catch {
        // ignored
    }
}

/** @internal */
export function createWebSystem(host: WebHost, args: string[], getExecutingFilePath: () => string): ts.server.ServerHost {
    const returnEmptyString = () => "";
    const getExecutingDirectoryPath = ts.memoize(() => ts.memoize(() => ts.ensureTrailingDirectorySeparator(ts.getDirectoryPath(getExecutingFilePath()))));
    // Later we could map ^memfs:/ to do something special if we want to enable more functionality like module resolution or something like that
    const getWebPath = (path: string) => ts.startsWith(path, ts.directorySeparator) ? path.replace(ts.directorySeparator, getExecutingDirectoryPath()) : undefined;

    const dynamicImport = async (id: string): Promise<any> => {
        const serverDynamicImport: ((id: string) => Promise<any>) | undefined = (ts.server as any).dynamicImport;
        // Use syntactic dynamic import first, if available
        if (serverDynamicImport) {
            return serverDynamicImport(id);
        }

        throw new Error("Dynamic import not implemented");
    };

    return {
        args,
        newLine: "\r\n", // This can be configured by clients
        useCaseSensitiveFileNames: false, // Use false as the default on web since that is the safest option
        readFile: path => {
            const webPath = getWebPath(path);
            return webPath && host.readFile(webPath);
        },
        write: host.writeMessage.bind(host),
        watchFile: ts.returnNoopFileWatcher,
        watchDirectory: ts.returnNoopFileWatcher,

        getExecutingFilePath: () => ts.directorySeparator,
        getCurrentDirectory: returnEmptyString, // For inferred project root if projectRoot path is not set, normalizing the paths

        /* eslint-disable no-restricted-globals */
        setTimeout: (cb, ms, ...args) => setTimeout(cb, ms, ...args),
        clearTimeout: handle => clearTimeout(handle),
        setImmediate: x => setTimeout(x, 0),
        clearImmediate: handle => clearTimeout(handle),
        /* eslint-enable no-restricted-globals */

        importPlugin: async (initialDir: string, moduleName: string): Promise<ts.server.ModuleImportResult> => {
            const packageRoot = ts.combinePaths(initialDir, moduleName);

            let packageJson: any | undefined;
            try {
                const packageJsonResponse = await fetch(ts.combinePaths(packageRoot, "package.json"));
                packageJson = await packageJsonResponse.json();
            }
            catch (e) {
                return { module: undefined, error: new Error("Could not load plugin. Could not load 'package.json'.") };
            }

            const browser = packageJson.browser;
            if (!browser) {
                return { module: undefined, error: new Error("Could not load plugin. No 'browser' field found in package.json.") };
            }

            const scriptPath = ts.combinePaths(packageRoot, browser);
            try {
                const { default: module } = await dynamicImport(scriptPath);
                return { module, error: undefined };
            }
            catch (e) {
                return { module: undefined, error: e };
            }
        },
        exit: ts.notImplemented,

        // Debugging related
        getEnvironmentVariable: returnEmptyString, // TODO:: Used to enable debugging info
        // tryEnableSourceMapsForHost?(): void;
        // debugMode?: boolean;

        // For semantic server mode
        fileExists: path => {
            const webPath = getWebPath(path);
            return !!webPath && host.fileExists(webPath);
        },
        directoryExists: ts.returnFalse, // Module resolution
        readDirectory: ts.notImplemented, // Configured project, typing installer
        getDirectories: () => [], // For automatic type reference directives
        createDirectory: ts.notImplemented, // compile On save
        writeFile: ts.notImplemented, // compile on save
        resolvePath: ts.identity, // Plugins
        // realpath? // Module resolution, symlinks
        // getModifiedTime // File watching
        // createSHA256Hash // telemetry of the project

        // Logging related
        // /*@internal*/ bufferFrom?(input: string, encoding?: string): Buffer;
        // gc?(): void;
        // getMemoryUsage?(): number;
    };
}

/** @internal */
export interface StartSessionOptions {
    globalPlugins: ts.server.SessionOptions["globalPlugins"];
    pluginProbeLocations: ts.server.SessionOptions["pluginProbeLocations"];
    allowLocalPluginLoads: ts.server.SessionOptions["allowLocalPluginLoads"];
    useSingleInferredProject: ts.server.SessionOptions["useSingleInferredProject"];
    useInferredProjectPerProjectRoot: ts.server.SessionOptions["useInferredProjectPerProjectRoot"];
    suppressDiagnosticEvents: ts.server.SessionOptions["suppressDiagnosticEvents"];
    noGetErrOnBackgroundUpdate: ts.server.SessionOptions["noGetErrOnBackgroundUpdate"];
    syntaxOnly: ts.server.SessionOptions["syntaxOnly"];
    serverMode: ts.server.SessionOptions["serverMode"];
}
/** @internal */
export class WorkerSession extends ts.server.Session<{}> {
    constructor(host: ts.server.ServerHost, private webHost: HostWithWriteMessage, options: StartSessionOptions, logger: ts.server.Logger, cancellationToken: ts.server.ServerCancellationToken, hrtime: ts.server.SessionOptions["hrtime"]) {
        super({
            host,
            cancellationToken,
            ...options,
            typingsInstaller: ts.server.nullTypingsInstaller,
            byteLength: ts.notImplemented, // Formats the message text in send of Session which is overriden in this class so not needed
            hrtime,
            logger,
            canUseEvents: true,
        });
    }

    public send(msg: ts.server.protocol.Message) {
        if (msg.type === "event" && !this.canUseEvents) {
            if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                this.logger.info(`Session does not support events: ignored event: ${JSON.stringify(msg)}`);
            }
            return;
        }
        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
            this.logger.info(`${msg.type}:${ts.server.indent(JSON.stringify(msg))}`);
        }
        this.webHost.writeMessage(msg);
    }

    protected parseMessage(message: {}): ts.server.protocol.Request {
        return message as ts.server.protocol.Request;
    }

    protected toStringMessage(message: {}) {
        return JSON.stringify(message, undefined, 2);
    }
}
