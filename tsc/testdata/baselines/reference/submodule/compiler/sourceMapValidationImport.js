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
exports.m = void 0;
var m;
(function (m) {
    class c {
    }
    m.c = c;
})(m || (exports.m = m = {}));
var x = new a();
var y = new exports.b();
//# sourceMappingURL=sourceMapValidationImport.js.map