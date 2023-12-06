//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClass2.ts] ////

//// [parserClass2.ts]
    export class LoggerAdapter implements ILogger {
        constructor (public logger: ILogger) { 
            this._information = this.logger.information();
        }
    }

//// [parserClass2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerAdapter = void 0;
var LoggerAdapter = /** @class */ (function () {
    function LoggerAdapter(logger) {
        this.logger = logger;
        this._information = this.logger.information();
    }
    return LoggerAdapter;
}());
exports.LoggerAdapter = LoggerAdapter;
