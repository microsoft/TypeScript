//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList2.ts] ////

//// [parserParameterList2.ts]
class C {
  F(A?= 0) { }
}

//// [parserParameterList2.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.F = function (A) {
        if (A === void 0) { A = 0; }
    };
    return C;
}());
