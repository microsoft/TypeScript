//// [tests/cases/compiler/sourceMapValidationImport.ts] ////

//// [sourceMapValidationImport.ts]
export module m {
    export class c {
    }
}
import a = m.c;
export import b = m.c;
var x = new a();
var y = new b();

//// [sourceMapValidationImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.m = void 0;
var m;
(function (m) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    m.c = c;
})(m || (exports.m = m = {}));
var a = m.c;
exports.b = m.c;
var x = new a();
var y = new exports.b();
//# sourceMappingURL=sourceMapValidationImport.js.map