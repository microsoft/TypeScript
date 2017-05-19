//// [thisTypeAsConstraint.ts]
class C {
  public m<T extends this>() {
  }
}

//// [thisTypeAsConstraint.js]
var C = (function () {
    function C() {
    }
    C.prototype.m = function () {
    };
    return C;
}());
