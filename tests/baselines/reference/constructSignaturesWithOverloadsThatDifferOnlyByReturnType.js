//// [constructSignaturesWithOverloadsThatDifferOnlyByReturnType.js]
// Error for construct signature overloads to differ only by return type
var C = (function () {
    function C(x) {
    }
    return C;
})();

var C2 = (function () {
    function C2(x, y) {
    }
    return C2;
})();

var a;

var b;
