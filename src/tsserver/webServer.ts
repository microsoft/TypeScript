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

    // Save off original versions before they are overwitten
    const consoleLog = console.log.bind(console);
    const consoleError = console.error.bind(console);

    class ConsoleLogger implements Logger {

        private readonly topLevelGroupName = "TS Server";

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
                    this.write(() => { consoleLog(s); });
                    break;

                case Msg.Perf:
                    this.write(() => { consoleLog(s); });
                    break;

                case Msg.Err:
                default:
                    this.write(() => { consoleError(s); });
                    break;
            }

            if (this.currentGroupCount === 0) {
                this.seq++;
            }
        }

        getLogFileName(): string | undefined {
            return undefined;
        }

        private write(f: () => void) {
            console.group(this.topLevelGroupName);
            try {
                f();
            }
            finally {
                console.groupEnd();
            }
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
        return typeof cmdLineVerbosity === "undefined"
            ? nullLogger
            : new ConsoleLogger(cmdLineVerbosity);
    }

    function getLogLevel(level: string | undefined) {
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

    function createWebSystem(args: string[]) {
        Debug.assert(ts.sys === undefined);
        const returnEmptyString = () => "";

        const sys: ServerHost = {
            args,
            newLine: "\r\n", // This can be configured by clients
            useCaseSensitiveFileNames: false, // Use false as the default on web since that is the safest option
            readFile: (path: string, _encoding?: string): string | undefined => {
                if (!path.startsWith("http:") && !path.startsWith("https:")) {
                    return undefined;
                }

                const request = new XMLHttpRequest();
                request.open("GET", path, /* asynchronous */ false);
                request.send();

                if (request.status !== 200) {
                    return undefined;
                }

                return request.responseText;
            },

            write: postMessage,
            watchFile: returnNoopFileWatcher,
            watchDirectory: returnNoopFileWatcher,

            getExecutingFilePath: () => {
                return findArgument("--executingFilePath") || location + "";
            },
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
                if (!path.startsWith("http:") && !path.startsWith("https:")) {
                    return false;
                }

                const request = new XMLHttpRequest();
                request.open("HEAD", path, /* asynchronous */ false);
                request.send();

                return request.status === 200;
            },
            directoryExists: (_path: string): boolean => {
                return false;
            },
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
        // TODO:: Locale setting?
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
                return message.toString();
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
        }

        const session = new WorkerSession();

        // Start listening
        session.listen();
    }
}
