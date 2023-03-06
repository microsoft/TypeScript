import { noop } from "./_namespaces/ts";

/** @internal */
export interface PerfLogger {
    logEvent(msg: string): void;
    logErrEvent(msg: string): void;
    logPerfEvent(msg: string): void;
    logInfoEvent(msg: string): void;
    logStartCommand(command: string, msg: string): void;
    logStopCommand(command: string, msg: string): void;
    logStartUpdateProgram(msg: string): void;
    logStopUpdateProgram(msg: string): void;
    logStartUpdateGraph(): void;
    logStopUpdateGraph(): void;
    logStartResolveModule(name: string): void;
    logStopResolveModule(success: string): void;
    logStartParseSourceFile(filename: string): void;
    logStopParseSourceFile(): void;
    logStartReadFile(filename: string): void;
    logStopReadFile(): void;
    logStartBindFile(filename: string): void;
    logStopBindFile(): void;
    logStartScheduledOperation(operationId: string): void;
    logStopScheduledOperation(): void;
}

const nullLogger: PerfLogger = {
    logEvent: noop,
    logErrEvent: noop,
    logPerfEvent: noop,
    logInfoEvent: noop,
    logStartCommand: noop,
    logStopCommand: noop,
    logStartUpdateProgram: noop,
    logStopUpdateProgram: noop,
    logStartUpdateGraph: noop,
    logStopUpdateGraph: noop,
    logStartResolveModule: noop,
    logStopResolveModule: noop,
    logStartParseSourceFile: noop,
    logStopParseSourceFile: noop,
    logStartReadFile: noop,
    logStopReadFile: noop,
    logStartBindFile: noop,
    logStopBindFile: noop,
    logStartScheduledOperation: noop,
    logStopScheduledOperation: noop,
};

// Load optional module to enable Event Tracing for Windows
// See https://github.com/microsoft/typescript-etw for more information
let etwModule: typeof import("@microsoft/typescript-etw") | undefined;
try {
    const etwModulePath = process.env.TS_ETW_MODULE_PATH ?? "./node_modules/@microsoft/typescript-etw";

    // require() will throw an exception if the module is not found
    // It may also return undefined if not installed properly
    etwModule = require(etwModulePath);
}
catch (e) {
    etwModule = undefined;
}

/**
 * Performance logger that will generate ETW events if possible - check for `logEvent` member, as `etwModule` will be `{}` when browserified
 *
 * @internal
 */
export const perfLogger: PerfLogger = etwModule?.logEvent ? etwModule : nullLogger;
