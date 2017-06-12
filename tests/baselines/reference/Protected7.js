//// [Protected7.ts]
class C {
  protected private m() { }
}

//// [Protected7.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.m = function () { };
    return C;
}());
