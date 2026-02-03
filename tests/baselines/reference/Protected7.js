//// [tests/cases/conformance/parser/ecmascript5/Protected/Protected7.ts] ////

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
