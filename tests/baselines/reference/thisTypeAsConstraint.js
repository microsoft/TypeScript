//// [thisTypeAsConstraint.ts]
class C {
  public m<T extends this>() {
  }
}

//// [thisTypeAsConstraint.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.m = function () {
    };
    return C;
}());
