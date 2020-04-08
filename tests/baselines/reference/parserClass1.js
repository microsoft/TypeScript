//// [parserClass1.ts]
    export class NullLogger implements ILogger {
        public information(): boolean { return false; }
        public debug(): boolean { return false; }
        public warning(): boolean { return false; }
        public error(): boolean { return false; }
        public fatal(): boolean { return false; }
        public log(s: string): void {
        }
    }

//// [parserClass1.js]
"use strict";
exports.__esModule = true;
exports.NullLogger = void 0;
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    NullLogger.prototype.information = function () { return false; };
    NullLogger.prototype.debug = function () { return false; };
    NullLogger.prototype.warning = function () { return false; };
    NullLogger.prototype.error = function () { return false; };
    NullLogger.prototype.fatal = function () { return false; };
    NullLogger.prototype.log = function (s) {
    };
    return NullLogger;
}());
exports.NullLogger = NullLogger;
