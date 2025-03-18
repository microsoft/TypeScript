//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClass1.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullLogger = void 0;
class NullLogger {
    information() { return false; }
    debug() { return false; }
    warning() { return false; }
    error() { return false; }
    fatal() { return false; }
    log(s) {
    }
}
exports.NullLogger = NullLogger;
