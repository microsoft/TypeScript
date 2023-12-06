//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock24.ts] ////

//// [classStaticBlock24.ts]
export class C {
  static x: number;
  static {
    C.x = 1;
  }
}


//// [classStaticBlock24.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
export { C };
(function () {
    C.x = 1;
})();
