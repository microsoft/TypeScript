import * as ts from "./_namespaces/ts";
import {
    Compiler,
} from "./harnessIO";

export const HarnessLSCouldNotResolveModule = "HarnessLanguageService:: Could not resolve module";

export function replaceAll(source: string, searchValue: string, replaceValue: string): string {
    let result: string | undefined = (source as string & { replaceAll: typeof source.replace; }).replaceAll?.(searchValue, replaceValue);

    if (result !== undefined) {
        return result;
    }

    result = "";
    const searchLength = searchValue.length;
    while (true) {
        const index = source.indexOf(searchValue);
        if (index < 0) {
            break;
        }
        result += source.slice(0, index);
        result += replaceValue;
        source = source.slice(index + searchLength);
    }
    result += source;
    return result;
}

export interface Logger extends ts.server.Logger {
    logs?: string[];
    log(s: string): void;
    host?: ts.server.ServerHost;
}

export function nullLogger(): Logger {
    return {
        close: ts.noop,
        hasLevel: ts.returnFalse,
        loggingEnabled: ts.returnFalse,
        perftrc: ts.noop,
        info: ts.noop,
        msg: ts.noop,
        startGroup: ts.noop,
        endGroup: ts.noop,
        getLogFileName: ts.returnUndefined,
        log: ts.noop,
        isTestLogger: true,
    };
}

export function createHasErrorMessageLogger(): Logger {
    const logger = nullLogger();
    logger.msg = (s, type) => ts.Debug.fail(`Error: ${s}, type: ${type}`);
    return logger;
}
function handleLoggerGroup(logger: Logger, host: ts.server.ServerHost, logText: (s: string) => void, sanitizeLibs: true | undefined): Logger {
    logger.hasLevel = ts.returnTrue;
    logger.loggingEnabled = ts.returnTrue;
    logger.host = host;
    if (host) logText(`currentDirectory:: ${host.getCurrentDirectory()} useCaseSensitiveFileNames: ${host.useCaseSensitiveFileNames}`);

    let inGroup = false;
    let firstInGroup = false;
    logger.startGroup = () => {
        inGroup = true;
        firstInGroup = true;
    };
    logger.endGroup = () => inGroup = false;
    logger.info = s => msg(s, ts.server.Msg.Info, log);
    logger.log = log;
    return logger;

    function log(s: string) {
        logText((sanitizeLibs ? sanitizeLibFileText : ts.identity)(sanitizeLog(s)));
    }

    function msg(s: string, type = ts.server.Msg.Err, write: (s: string) => void) {
        s = `[${nowString(logger)}] ${s}`;
        if (!inGroup || firstInGroup) s = padStringRight(type + " seq", "          ") + s;
        if (ts.Debug.isDebugging) console.log(s);
        write(s);
    }

    function padStringRight(str: string, padding: string) {
        return (str + padding).slice(0, padding.length);
    }
}

export function nowString(logger: Logger) {
    // E.g. "12:34:56.789"
    logger.host?.now?.(); // To increment the time but not print it to avoid the baseline updates
    return `hh:mm:ss:mss`;
}

export function createLoggerWritingToConsole(host: ts.server.ServerHost, sanitizeLibs?: true) {
    const logger = createHasErrorMessageLogger();
    logger.logs = [];
    logger.logs.push = (...args) => {
        args.forEach(s => console.log(s));
        return 0;
    };
    return handleLoggerGroup(
        logger,
        host,
        s => console.log(s),
        sanitizeLibs,
    ) as LoggerWithInMemoryLogs;
}

export function sanitizeLog(s: string): string {
    s = s.replace(/Elapsed::?\s*\d+(?:\.\d+)?ms/g, "Elapsed:: *ms");
    s = s.replace(/"updateGraphDurationMs":\s*\d+(?:\.\d+)?/g, `"updateGraphDurationMs": *`);
    s = s.replace(/"createAutoImportProviderProgramDurationMs":\s*\d+(?:\.\d+)?/g, `"createAutoImportProviderProgramDurationMs": *`);
    s = replaceAll(s, ts.version, "FakeVersion");
    s = s.replace(/getCompletionData: Get current token: \d+(?:\.\d+)?/g, `getCompletionData: Get current token: *`);
    s = s.replace(/getCompletionData: Is inside comment: \d+(?:\.\d+)?/g, `getCompletionData: Is inside comment: *`);
    s = s.replace(/getCompletionData: Get previous token: \d+(?:\.\d+)?/g, `getCompletionData: Get previous token: *`);
    s = s.replace(/getCompletionsAtPosition: isCompletionListBlocker: \d+(?:\.\d+)?/g, `getCompletionsAtPosition: isCompletionListBlocker: *`);
    s = s.replace(/getCompletionData: Semantic work: \d+(?:\.\d+)?/g, `getCompletionData: Semantic work: *`);
    s = s.replace(/getCompletionsAtPosition: getCompletionEntriesFromSymbols: \d+(?:\.\d+)?/g, `getCompletionsAtPosition: getCompletionEntriesFromSymbols: *`);
    s = s.replace(/forEachExternalModuleToImportFrom autoImportProvider: \d+(?:\.\d+)?/g, `forEachExternalModuleToImportFrom autoImportProvider: *`);
    s = s.replace(/getExportInfoMap: done in \d+(?:\.\d+)?/g, `getExportInfoMap: done in *`);
    s = s.replace(/collectAutoImports: \d+(?:\.\d+)?/g, `collectAutoImports: *`);
    s = s.replace(/continuePreviousIncompleteResponse: \d+(?:\.\d+)?/g, `continuePreviousIncompleteResponse: *`);
    s = s.replace(/dependencies in \d+(?:\.\d+)?/g, `dependencies in *`);
    s = s.replace(/"exportMapKey":\s*"\d+ \d+ /g, match => match.replace(/ \d+ /, ` * `));
    s = s.replace(/getIndentationAtPosition: getCurrentSourceFile: \d+(?:\.\d+)?/, `getIndentationAtPosition: getCurrentSourceFile: *`);
    s = s.replace(/getIndentationAtPosition: computeIndentation\s*: \d+(?:\.\d+)?/, `getIndentationAtPosition: computeIndentation: *`);
    s = replaceAll(s, `@ts${ts.versionMajorMinor}`, `@tsFakeMajor.Minor`);
    s = sanitizeHarnessLSException(s);
    return s;
}

function sanitizeHarnessLSException(s: string) {
    const index = s.indexOf(HarnessLSCouldNotResolveModule);
    if (index > 0) s = s.substring(0, index) + HarnessLSCouldNotResolveModule;
    return s;
}

export function sanitizeLibFileText(s: string): string {
    Compiler.libFileNameSourceFileMap?.forEach((lib, fileName) => {
        s = replaceAll(s, JSON.stringify(lib.text), `${fileName}-Text`);
        s = replaceAll(s, lib.text, `${fileName}-Text`);
    });
    return s;
}

export interface LoggerWithInMemoryLogs extends Logger {
    logs: string[];
}

export function createLoggerWithInMemoryLogs(host: ts.server.ServerHost, sanitizeLibs?: true): LoggerWithInMemoryLogs {
    const logger = createHasErrorMessageLogger();
    logger.logs = [];
    return handleLoggerGroup(logger, host, s => logger.logs!.push(s), sanitizeLibs) as LoggerWithInMemoryLogs;
}
