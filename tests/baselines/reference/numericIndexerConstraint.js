//// [numericIndexerConstraint.ts]
class C {
    0: number;
    [x: number]: RegExp;
}

//// [numericIndexerConstraint.js]
var C = (function () {
    function C() {
    }
    return C;
}());
