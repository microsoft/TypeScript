//// [parserParameterList1.ts]
class C {
   F(...A, B) { }
}

//// [parserParameterList1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.F = function (B) { };
    return C;
}());
