//// [parserParameterList3.ts]
class C {
  F(A?, B) { }
}

//// [parserParameterList3.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.F = function (A, B) { };
    return C;
}());
