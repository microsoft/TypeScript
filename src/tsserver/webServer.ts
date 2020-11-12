/*@internal*/
namespace ts.server {
    declare const addEventListener: any;
    declare const postMessage: any;
    declare const close: any;
    declare const location: any;
    declare const XMLHttpRequest: any;
    declare const self: any;

    const nullLogger: Logger = {
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

    type MessageLogLevel = "info" | "perf" | "error";

    interface LoggingMessage {
        readonly type: "log";
        readonly level: MessageLogLevel;
        readonly body: string
    }

    class MainProcessLogger implements Logger {

        private currentGroupCount = 0;
        private seq = 0;

        constructor(
            private readonly level: LogLevel
        ) { }

        close(): void {
            // noop
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
            postMessage(<LoggingMessage>{
                type: "log",
                level,
                body,
            });
        }
    }

    let unknownServerMode: string | undefined;
    function parseServerMode(): LanguageServiceMode | undefined {
        const mode = findArgument("--serverMode");
        if (mode !== undefined) {
            switch (mode.toLowerCase()) {
                case "partialsemantic":
                    return LanguageServiceMode.PartialSemantic;
                case "syntactic":
                    return LanguageServiceMode.Syntactic;
                default:
                    unknownServerMode = mode;
                    break;
            }
        }
        // Webserver defaults to partial semantic mode
        return hasArgument("--syntaxOnly") ? LanguageServiceMode.Syntactic : LanguageServiceMode.PartialSemantic;
    }

    export function initializeWebSystem(args: string[]): StartInput {
        createWebSystem(args);
        const serverMode = parseServerMode();
        return {
            args,
            logger: createLogger(),
            cancellationToken: nullCancellationToken,
            serverMode,
            unknownServerMode,
            startSession: startWebSession
        };
    }

    function createLogger() {
        const cmdLineVerbosity = getLogLevel(findArgument("--logVerbosity"));
        return typeof cmdLineVerbosity === "undefined" ? nullLogger : new MainProcessLogger(cmdLineVerbosity);
    }

    function createWebSystem(args: string[]) {
        Debug.assert(ts.sys === undefined);
        const returnEmptyString = () => "";
        // Later we could map ^memfs:/ to do something special if we want to enable more functionality like module resolution or something like that
        const getWebPath = (path: string) => startsWith(path, directorySeparator) ? path.replace(directorySeparator, executingDirectoryPath) : undefined;
        const sys: ServerHost = {
            args,
            newLine: "\r\n", // This can be configured by clients
            useCaseSensitiveFileNames: false, // Use false as the default on web since that is the safest option
            readFile: (path: string, _encoding?: string): string | undefined => {
                const webPath = getWebPath(path);
                if (!webPath) return undefined;

                const request = new XMLHttpRequest();
                request.open("GET", webPath, /* asynchronous */ false);
                request.send();
                return request.status === 200 ? request.responseText : undefined;
            },

            write: postMessage,
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
            fileExists: (path: string): boolean => {
                const webPath = getWebPath(path);
                if (!webPath) return false;

                const request = new XMLHttpRequest();
                request.open("HEAD", webPath, /* asynchronous */ false);
                request.send();
                return request.status === 200;
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
        ts.sys = sys;
        // Do this after sys has been set as findArguments is going to work only then
        const executingDirectoryPath = ensureTrailingDirectorySeparator(getDirectoryPath(findArgument("--executingFilePath") || location + ""));
        const localeStr = findArgument("--locale");
        if (localeStr) {
            validateLocaleAndSetLanguage(localeStr, sys);
        }
    }

    function hrtime(previous?: [number, number]) {
        const now = self.performance.now(performance) * 1e-3;
        let seconds = Math.floor(now);
        let nanoseconds = Math.floor((now % 1) * 1e9);
        if (typeof previous === "number") {
            seconds = seconds - previous[0];
            nanoseconds = nanoseconds - previous[1];
            if (nanoseconds < 0) {
                seconds--;
                nanoseconds += 1e9;
            }
        }
        return [seconds, nanoseconds];
    }

    function startWebSession(options: StartSessionOptions, logger: Logger, cancellationToken: ServerCancellationToken) {
        class WorkerSession extends Session<{}> {
            constructor() {
                const host = sys as ServerHost;

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
                postMessage(msg);
            }

            protected parseMessage(message: {}): protocol.Request {
                return <protocol.Request>message;
            }

            protected toStringMessage(message: {}) {
                return JSON.stringify(message, undefined, 2);
            }

            exit() {
                this.logger.info("Exiting...");
                this.projectService.closeLog();
                close(0);
            }

            listen() {
                addEventListener("message", (message: any) => {
                    this.onMessage(message.data);
                });
            }

            // TODO:: Update all responses to use webPath
        }

        const session = new WorkerSession();

        // Start listening
        session.listen();
    }
}
