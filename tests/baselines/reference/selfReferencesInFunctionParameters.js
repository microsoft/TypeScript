//// [selfReferencesInFunctionParameters.js]
function foo(x) {
    if (typeof x === "undefined") { x = x; }
}

function bar(x0, x) {
    if (typeof x0 === "undefined") { x0 = ""; }
    if (typeof x === "undefined") { x = x; }
}

var C = (function () {
    function C(x, y) {
        if (typeof x === "undefined") { x = 1; }
        if (typeof y === "undefined") { y = y; }
    }
    C.prototype.bar = function (a, b) {
        if (typeof a === "undefined") { a = ""; }
        if (typeof b === "undefined") { b = b.toString(); }
    };
    return C;
})();
