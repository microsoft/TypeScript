//// [parserClass2.ts]


    export class LoggerAdapter implements ILogger {
        constructor (public logger: ILogger) { 
            this._information = this.logger.information();
        }
    }

//// [parserClass2.js]
"use strict";
var LoggerAdapter = (function () {
    function LoggerAdapter(logger) {
        this.logger = logger;
        this._information = this.logger.information();
    }
    return LoggerAdapter;
})();
exports.LoggerAdapter = LoggerAdapter;
