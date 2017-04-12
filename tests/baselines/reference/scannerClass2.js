//// [scannerClass2.ts]
    export class LoggerAdapter implements ILogger {
        constructor (public logger: ILogger) { 
            this._information = this.logger.information();
        }
    }

//// [scannerClass2.js]
"use strict";
exports.__esModule = true;
var LoggerAdapter = (function () {
    function LoggerAdapter(logger) {
        this.logger = logger;
        this._information = this.logger.information();
    }
    return LoggerAdapter;
}());
exports.LoggerAdapter = LoggerAdapter;
