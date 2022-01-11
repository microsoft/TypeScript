import { Logger, findArgument, StartInput, nullCancellationToken, getLogLevel, MainProcessLogger, WebHost, StartSessionOptions, ServerCancellationToken, ServerHost } from "./ts.server";
import { noop, returnFalse, returnUndefined, LanguageServiceMode, Debug, server, setSys, validateLocaleAndSetLanguage, performance, sys } from "./ts";
import * as ts from "./ts";
/*@internal*/
declare const addEventListener: any;
/* @internal */
declare const postMessage: any;
/* @internal */
declare const close: any;
/* @internal */
declare const location: any;
/* @internal */
declare const XMLHttpRequest: any;
/* @internal */
declare const self: any;

/* @internal */
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

/* @internal */
function parseServerMode(): LanguageServiceMode | string | undefined {
    const mode = findArgument("--serverMode");
    if (!mode)
        return undefined;
    switch (mode.toLowerCase()) {
        case "partialsemantic":
            return LanguageServiceMode.PartialSemantic;
        case "syntactic":
            return LanguageServiceMode.Syntactic;
        default:
            return mode;
    }
}

/* @internal */
export function initializeWebSystem(args: string[]): StartInput {
    createWebSystem(args);
    const modeOrUnknown = parseServerMode();
    let serverMode: LanguageServiceMode | undefined;
    let unknownServerMode: string | undefined;
    if (typeof modeOrUnknown === "number")
        serverMode = modeOrUnknown;
    else
        unknownServerMode = modeOrUnknown;
    return {
        args,
        logger: createLogger(),
        cancellationToken: nullCancellationToken,
        // Webserver defaults to partial semantic mode
        serverMode: serverMode ?? LanguageServiceMode.PartialSemantic,
        unknownServerMode,
        startSession: startWebSession
    };
}

/* @internal */
function createLogger() {
    const cmdLineVerbosity = getLogLevel(findArgument("--logVerbosity"));
    return cmdLineVerbosity !== undefined ? new MainProcessLogger(cmdLineVerbosity, { writeMessage }) : nullLogger;
}

/* @internal */
function writeMessage(s: any) {
    postMessage(s);
}

/* @internal */
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
    setSys(sys);
    const localeStr = findArgument("--locale");
    if (localeStr) {
        validateLocaleAndSetLanguage(localeStr, sys);
    }
}

/* @internal */
function hrtime(previous?: [
    number,
    number
]) {
    const now = self.performance.now(performance) * 1e-3;
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

/* @internal */
function startWebSession(options: StartSessionOptions, logger: Logger, cancellationToken: ServerCancellationToken) {
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
