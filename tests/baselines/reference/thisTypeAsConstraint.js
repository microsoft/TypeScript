//// [tests/cases/compiler/thisTypeAsConstraint.ts] ////

//// [thisTypeAsConstraint.ts]
class C {
  public m<T extends this>() {
  }
}

//// [thisTypeAsConstraint.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () {
    };
    return C;
}());
