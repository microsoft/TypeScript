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
        return typeof cmdLineVerbosity === "undefined" ? nullLogger : new MainProcessLogger(cmdLineVerbosity, { writeMessage });
    }

    function writeMessage(s: any) {
        postMessage(s);
    }

    function createWebSystem(args: string[]) {
        Debug.assert(ts.sys === undefined);
        const webHost: WebHost = {
            readFile: webPath => {
                const request = new XMLHttpRequest();
                request.open("GET", webPath, /* asynchronous */ false);
                request.send();
                return request.status === 200 ? request.responseText : undefined;
            },
            fileExists: webPath => {
                const request = new XMLHttpRequest();
                request.open("HEAD", webPath, /* asynchronous */ false);
                request.send();
                return request.status === 200;
            },
            writeMessage,
        };
        // Do this after sys has been set as findArguments is going to work only then
        const sys = server.createWebSystem(webHost, args, () => findArgument("--executingFilePath") || location + "");
        ts.sys = sys;
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
        debugger;
        class WorkerSession extends server.WorkerSession {
            constructor() {
                super(sys as ServerHost, { writeMessage }, options, logger, cancellationToken, hrtime);
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
