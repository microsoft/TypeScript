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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
exports.__esModule = true;
var NullLogger = (function () {
    function NullLogger() {
    }
    NullLogger.prototype.information = function () { return false; };
    NullLogger.prototype.debug = function () { return false; };
    NullLogger.prototype.warning = function () { return false; };
    NullLogger.prototype.error = function () { return false; };
    NullLogger.prototype.fatal = function () { return false; };
    NullLogger.prototype.log = function (s) {
    };
    __names(NullLogger.prototype, ["information", "debug", "warning", "error", "fatal", "log"]);
    return NullLogger;
}());
exports.NullLogger = NullLogger;
