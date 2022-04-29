/* @internal */
namespace ts {
    type PerfLogger = typeof import("@microsoft/typescript-etw");
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
