//// [Protected5.ts]
class C {
  protected static m() { }
}

//// [Protected5.js]
var C = (function () {
    function C() {
    }
    C.m = function () { };
    return C;
}());
