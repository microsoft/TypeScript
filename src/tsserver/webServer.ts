/*@internal*/

/// <reference lib="webworker" />

namespace ts.server {
    // declare const lol: import("vscode-sync-api-client").ApiClient
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

    function parseServerMode(): LanguageServiceMode | string | undefined {
        const mode = findArgument("--serverMode");
        if (!mode) return undefined;
        switch (mode.toLowerCase()) {
            case "partialsemantic":
                return LanguageServiceMode.PartialSemantic;
            case "syntactic":
                return LanguageServiceMode.Syntactic;
            case "semantic":
                if (hasArgument("--vfs")) return LanguageServiceMode.Semantic;
            default:
                return mode;
        }
    }

    export function initializeWebSystem(args: string[]): StartInput {
        createWebSystem(args);
        const modeOrUnknown = parseServerMode();
        let serverMode: LanguageServiceMode | undefined;
        let unknownServerMode: string | undefined;
        if (typeof modeOrUnknown === "number") serverMode = modeOrUnknown;
        else unknownServerMode = modeOrUnknown;
        const logger = createLogger();

        // enable deprecation logging
        Debug.loggingHost = {
            log(level, s) {
                switch (level) {
                    case ts.LogLevel.Error:
                    case ts.LogLevel.Warning:
                        return logger.msg(s, Msg.Err);
                    case ts.LogLevel.Info:
                    case ts.LogLevel.Verbose:
                        return logger.msg(s, Msg.Info);
                }
            }
        };

        return {
            args,
            logger,
            cancellationToken: nullCancellationToken,
            // Webserver defaults to partial semantic mode
            serverMode: serverMode ?? (hasArgument("--vfs") ? LanguageServiceMode.Semantic : LanguageServiceMode.PartialSemantic),
            unknownServerMode,
            startSession: startWebSession
        };
    }

    function createLogger() {
        const cmdLineVerbosity = getLogLevel(findArgument("--logVerbosity"));
        return cmdLineVerbosity !== undefined ? new MainProcessLogger(cmdLineVerbosity, { writeMessage }) : nullLogger;
    }

    function writeMessage(s: any) {
        postMessage(s);
    }

    /**
     * This is called from initializeWebSystem,
     *  which is indirectly called from the toplevel code in tsserver/server that registers a message.
     *  When *something* fires the message, it calls
     * which calls initializeWebSystem above, but it doesn't need to change much
     * first create a webhost, which will need to alternately create a vscode-sync-api-host or SOMETHING
     * then createWebSystem in webserver/webserver.ts, with a thunk for finding arguments (doesn't work until after setSys)
     *    createWebSystem probably needs *some* changes, but not many -- probably not enough to fork it,
     *    but MAYBE since it is a lot of work built around a minimal webHost
     */
    function createWebSystem(args: string[]) {
        Debug.assert(ts.sys === undefined);
        let sys: ServerHost;
        // TODO: Actually copy this from the old PR
        if (args.includes("--vfs")) {
            sys = {} as any
            // TODO: maybe createWebSystem could still work
        }
        else {
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
            sys = server.createWebSystem(webHost, args, () => findArgument("--executingFilePath") || location + "");
        }
        setSys(sys);
        const localeStr = findArgument("--locale");
        if (localeStr) {
            validateLocaleAndSetLanguage(localeStr, sys);
        }
    }

    function hrtime(previous?: [number, number]) {
        const now = self.performance.now() * 1e-3;
        let seconds = Math.floor(now);
        let nanoseconds = Math.floor((now % 1) * 1e9);
        if (previous) {
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
        class WorkerSession extends server.WorkerSession {
            constructor() {
                super(sys as ServerHost, { writeMessage }, options, logger, cancellationToken, hrtime);
            }

            exit() {
                this.logger.info("Exiting...");
                this.projectService.closeLog();
                close();
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
