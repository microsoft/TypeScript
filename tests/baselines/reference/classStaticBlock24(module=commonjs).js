//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock24.ts] ////

//// [classStaticBlock24.ts]
export class C {
  static x: number;
  static {
    C.x = 1;
  }
}


//// [classStaticBlock24.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
(function () {
    C.x = 1;
})();
