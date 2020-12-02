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
    var proto_1 = NullLogger.prototype;
    proto_1.information = function () { return false; };
    proto_1.debug = function () { return false; };
    proto_1.warning = function () { return false; };
    proto_1.error = function () { return false; };
    proto_1.fatal = function () { return false; };
    proto_1.log = function (s) {
    };
    return NullLogger;
}());
exports.NullLogger = NullLogger;
