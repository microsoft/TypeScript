//// [Protected4.ts]
class C {
  protected public m() { }
}

//// [Protected4.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.m = function () { };
    return C;
}());
