//// [tests/cases/conformance/parser/ecmascript5/Protected/Protected4.ts] ////

//// [Protected4.ts]
class C {
  protected public m() { }
}

//// [Protected4.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () { };
    return C;
}());
