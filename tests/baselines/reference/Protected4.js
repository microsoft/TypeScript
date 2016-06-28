//// [Protected4.ts]
class C {
  protected public m() { }
}

//// [Protected4.js]
var C = (function () {
    function C() {
    }
    C.prototype.m = function () { };
    return C;
}());
