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
class C {
}
exports.C = C;
(() => {
    C.x = 1;
})();
