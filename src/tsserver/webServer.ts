/*@internal*/
namespace ts.server {
declare const addEventListener: any;
declare const postMessage: any;
declare const close: any;
declare const location: any;
declare const XMLHttpRequest: any;
declare const self: any;

const nullLogger: ts.server.Logger = {
    close: ts.noop,
    hasLevel: ts.returnFalse,
    loggingEnabled: ts.returnFalse,
    perftrc: ts.noop,
    info: ts.noop,
    msg: ts.noop,
    startGroup: ts.noop,
    endGroup: ts.noop,
    getLogFileName: ts.returnUndefined,
};

function parseServerMode(): ts.LanguageServiceMode | string | undefined {
    const mode = ts.server.findArgument("--serverMode");
    if (!mode) return undefined;
    switch (mode.toLowerCase()) {
        case "partialsemantic":
            return ts.LanguageServiceMode.PartialSemantic;
        case "syntactic":
            return ts.LanguageServiceMode.Syntactic;
        default:
            return mode;
    }
}

export function initializeWebSystem(args: string[]): ts.server.StartInput {
    createWebSystem(args);
    const modeOrUnknown = parseServerMode();
    let serverMode: ts.LanguageServiceMode | undefined;
    let unknownServerMode: string | undefined;
    if (typeof modeOrUnknown === "number") serverMode = modeOrUnknown;
    else unknownServerMode = modeOrUnknown;
    const logger = createLogger();

    // enable deprecation logging
    ts.Debug.loggingHost = {
        log(level, s) {
            switch (level) {
                case ts.LogLevel.Error:
                case ts.LogLevel.Warning:
                    return logger.msg(s, ts.server.Msg.Err);
                case ts.LogLevel.Info:
                case ts.LogLevel.Verbose:
                    return logger.msg(s, ts.server.Msg.Info);
            }
        }
    };

    return {
        args,
        logger,
        cancellationToken: ts.server.nullCancellationToken,
        // Webserver defaults to partial semantic mode
        serverMode: serverMode ?? ts.LanguageServiceMode.PartialSemantic,
        unknownServerMode,
        startSession: startWebSession
    };
}

function createLogger() {
    const cmdLineVerbosity = ts.server.getLogLevel(ts.server.findArgument("--logVerbosity"));
    return cmdLineVerbosity !== undefined ? new ts.server.MainProcessLogger(cmdLineVerbosity, { writeMessage }) : nullLogger;
}

function writeMessage(s: any) {
    postMessage(s);
}

function createWebSystem(args: string[]) {
    ts.Debug.assert(ts.sys === undefined);
    const webHost: ts.server.WebHost = {
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
    const sys = ts.server.createWebSystem(webHost, args, () => ts.server.findArgument("--executingFilePath") || location + "");
    ts.setSys(sys);
    const localeStr = ts.server.findArgument("--locale");
    if (localeStr) {
        ts.validateLocaleAndSetLanguage(localeStr, sys);
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

function startWebSession(options: ts.server.StartSessionOptions, logger: ts.server.Logger, cancellationToken: ts.server.ServerCancellationToken) {
    class WorkerSession extends ts.server.WorkerSession {
        constructor() {
            super(ts.sys as ts.server.ServerHost, { writeMessage }, options, logger, cancellationToken, hrtime);
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
