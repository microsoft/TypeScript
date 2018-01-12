//// [selfReferencesInFunctionParameters.ts]
function foo(x: number = x) {
}

function bar(x0 = "", x: number = x) {
}

class C {
    constructor(x = 1, y = y) {
    }
     
    bar(a = "", b: string = b.toString()) {
    }
}

//// [selfReferencesInFunctionParameters.js]
function foo(x) {
    if (x === void 0) { x = x; }
}
function bar(x0, x) {
    if (x0 === void 0) { x0 = ""; }
    if (x === void 0) { x = x; }
}
var C = /** @class */ (function () {
    function C(x, y) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = y; }
    }
    C.prototype.bar = function (a, b) {
        if (a === void 0) { a = ""; }
        if (b === void 0) { b = b.toString(); }
    };
    return C;
}());
