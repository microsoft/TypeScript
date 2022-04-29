//// [duplicateIdentifierComputedName.ts]
class C {
    ["a"]: string;
    ["a"]: string;
}


//// [duplicateIdentifierComputedName.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
