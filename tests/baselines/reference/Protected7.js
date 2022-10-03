//// [Protected7.ts]
class C {
  protected private m() { }
}

//// [Protected7.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () { };
    return C;
}());
