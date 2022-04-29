//// [indexerSignatureWithRestParam.ts]
interface I {
    [...x]: string;
}

class C {
    [...x]: string
}

//// [indexerSignatureWithRestParam.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
