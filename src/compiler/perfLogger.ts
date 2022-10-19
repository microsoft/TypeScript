/* @internal */
namespace ts {
type PerfLogger = typeof import("@microsoft/typescript-etw");
const nullLogger: PerfLogger = {
    logEvent: ts.noop,
    logErrEvent: ts.noop,
    logPerfEvent: ts.noop,
    logInfoEvent: ts.noop,
    logStartCommand: ts.noop,
    logStopCommand: ts.noop,
    logStartUpdateProgram: ts.noop,
    logStopUpdateProgram: ts.noop,
    logStartUpdateGraph: ts.noop,
    logStopUpdateGraph: ts.noop,
    logStartResolveModule: ts.noop,
    logStopResolveModule: ts.noop,
    logStartParseSourceFile: ts.noop,
    logStopParseSourceFile: ts.noop,
    logStartReadFile: ts.noop,
    logStopReadFile: ts.noop,
    logStartBindFile: ts.noop,
    logStopBindFile: ts.noop,
    logStartScheduledOperation: ts.noop,
    logStopScheduledOperation: ts.noop,
};

// Load optional module to enable Event Tracing for Windows
// See https://github.com/microsoft/typescript-etw for more information
let etwModule;
try {
    const etwModulePath = process.env.TS_ETW_MODULE_PATH ?? "./node_modules/@microsoft/typescript-etw";

    // require() will throw an exception if the module is not found
    // It may also return undefined if not installed properly
    etwModule = require(etwModulePath);
}
catch (e) {
    etwModule = undefined;
}

/** Performance logger that will generate ETW events if possible - check for `logEvent` member, as `etwModule` will be `{}` when browserified */
export const perfLogger: PerfLogger = etwModule && etwModule.logEvent ? etwModule : nullLogger;
}
