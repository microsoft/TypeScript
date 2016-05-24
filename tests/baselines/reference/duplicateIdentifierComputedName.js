//// [duplicateIdentifierComputedName.ts]
class C {
    ["a"]: string;
    ["a"]: string;
}


//// [duplicateIdentifierComputedName.js]
var C = (function () {
    function C() {
    }
    return C;
}());
