//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList3.ts] ////

//// [parserParameterList3.ts]
class C {
  F(A?, B) { }
}

//// [parserParameterList3.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.F = function (A, B) { };
    return C;
}());
