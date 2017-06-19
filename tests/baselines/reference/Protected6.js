//// [Protected6.ts]
class C {
  static protected m() { }
}

//// [Protected6.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.m = function () { };
    return C;
}());
