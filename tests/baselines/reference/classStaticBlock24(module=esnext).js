//// [classStaticBlock24.ts]
export class C {
  static x: number;
  static {
    C.x = 1;
  }
}


//// [classStaticBlock24.js]
var _C__;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
export { C };
_C__ = { value: (function () {
        C.x = 1;
    })() };
