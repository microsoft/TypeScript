/*@internal*/
namespace ts.server {
    export interface HostWithPostMessage {
        writeMessage(s: any): void;
    }
    export interface WebHost extends HostWithPostMessage {
        readFile(path: string): string | undefined;
        fileExists(path: string): boolean;
    }

    export type MessageLogLevel = "info" | "perf" | "error";
    export interface LoggingMessage {
        readonly type: "log";
        readonly level: MessageLogLevel;
        readonly body: string
    }
    export class MainProcessLogger implements Logger {
        private currentGroupCount = 0;
        private seq = 0;
        close = noop;

        constructor(private readonly level: LogLevel, private host: HostWithPostMessage) {
        }

        hasLevel(level: LogLevel): boolean {
            return this.level >= level;
        }

        loggingEnabled(): boolean {
            return true;
        }

        perftrc(s: string): void {
            this.msg(s, Msg.Perf);
        }

        info(s: string): void {
            this.msg(s, Msg.Info);
        }

        err(s: string) {
            this.msg(s, Msg.Err);
        }

        startGroup(): void {
            ++this.currentGroupCount;
        }

        endGroup(): void {
            this.currentGroupCount = Math.max(0, this.currentGroupCount - 1);
        }

        msg(s: string, type: Msg = Msg.Err): void {
            s = `${type} ${this.seq.toString()} [${nowString()}] ${s}`;

            switch (type) {
                case Msg.Info:
                    this.write("info", s);
                    break;

                case Msg.Perf:
                    this.write("perf", s);
                    break;

                case Msg.Err:
                default:
                    this.write("error", s);
                    break;
            }

            if (this.currentGroupCount === 0) {
                this.seq++;
            }
        }

        getLogFileName(): string | undefined {
            return undefined;
        }

        private write(level: MessageLogLevel, body: string) {
            this.host.writeMessage(<LoggingMessage>{
                type: "log",
                level,
                body,
            });
        }
    }

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
            setTimeout,
            clearTimeout,
            setImmediate: x => setTimeout(x, 0),
            clearImmediate: clearTimeout,
            /* eslint-enable no-restricted-globals */

            require: () => ({ module: undefined, error: new Error("Not implemented") }),
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
            // /*@internal*/ bufferFrom?(input: string, encoding?: string): Buffer;
            // gc?(): void;
            // getMemoryUsage?(): number;
        };
    }

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
    export class WorkerSession extends Session<{}> {
        constructor(host: ServerHost, private webHost: HostWithPostMessage, options: StartSessionOptions, logger: Logger, cancellationToken: ServerCancellationToken, hrtime: SessionOptions["hrtime"]) {
            super({
                host,
                cancellationToken,
                ...options,
                typingsInstaller: nullTypingsInstaller,
                byteLength: notImplemented, // Formats the message text in send of Session which is override in this class so not needed
                hrtime,
                logger,
                canUseEvents: false,
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
            return <protocol.Request>message;
        }

        protected toStringMessage(message: {}) {
            return JSON.stringify(message, undefined, 2);
        }
    }
}
