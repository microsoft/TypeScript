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
    var NullLogger_prototype = NullLogger.prototype;
    NullLogger_prototype.information = function () { return false; };
    NullLogger_prototype.debug = function () { return false; };
    NullLogger_prototype.warning = function () { return false; };
    NullLogger_prototype.error = function () { return false; };
    NullLogger_prototype.fatal = function () { return false; };
    NullLogger_prototype.log = function (s) {
    };
    return NullLogger;
}());
exports.NullLogger = NullLogger;
