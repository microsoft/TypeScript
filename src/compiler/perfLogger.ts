/* @internal */
namespace ts {
    export type PerfLogger = typeof import("@microsoft/typescript-etw"); // tslint:disable-line:no-implicit-dependencies

    export class NullLogger implements PerfLogger {
        logEvent(_msg: string): void {
            return;
        }
        logErrEvent(_msg: string): void {
            return;
        }
        logPerfEvent(_msg: string): void {
            return;
        }
        logInfoEvent(_msg: string): void {
            return;
        }
        logStartCommand(_command: string, _msg: string): void {
            return;
        }
        logStopCommand(_command: string, _msg: string): void {
            return;
        }
        logStartUpdateProgram(_msg: string): void {
            return;
        }
        logStopUpdateProgram(_msg: string): void {
            return;
        }
        logStartUpdateGraph(): void {
            return;
        }
        logStopUpdateGraph(): void {
            return;
        }
        logStartResolveModule(_name: string): void {
            return;
        }
        logStopResolveModule(_success: string): void {
            return;
        }
        logStartParseSourceFile(_filename: string): void {
            return;
        }
        logStopParseSourceFile(): void {
            return;
        }
        logStartReadFile(_filename: string): void {
            return;
        }
        logStopReadFile(): void {
            return;
        }
        logStartBindFile(_filename: string): void {
            return;
        }
        logStopBindFile(): void {
            return;
        }
        logStartScheduledOperation(_operationId: string): void {
            return;
        }
        logStopScheduledOperation(): void {
            return;
        }
    }

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

    export const perfLogger: PerfLogger = etwModule ? etwModule : new NullLogger();
}