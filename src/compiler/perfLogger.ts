/* @internal */
namespace ts {
    type PerfLogger = typeof import("@microsoft/typescript-etw"); // tslint:disable-line:no-implicit-dependencies
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
        // require() will throw an exception if the module is not installed
        // It may also return undefined if not installed properly
        etwModule = require("@microsoft/typescript-etw"); // tslint:disable-line:no-implicit-dependencies
    }
    catch (e) {
        etwModule = undefined;
    }

    /** Performance logger that will generate ETW events if possible */
    export const perfLogger: PerfLogger = etwModule ? etwModule : nullLogger;

    perfLogger.logInfoEvent(`Starting TypeScript v${versionMajorMinor} with command line: ${JSON.stringify(process.argv)}`);
}
