//// [parserParameterList1.ts]
class C {
   F(...A, B) { }
}

//// [parserParameterList1.js]
var C = (function () {
    function C() {
    }
    C.prototype.F = function (B) { };
    return C;
}());
