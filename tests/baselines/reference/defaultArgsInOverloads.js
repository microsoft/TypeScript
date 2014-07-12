//// [defaultArgsInOverloads.js]
function fun(a) {
    if (typeof a === "undefined") { a = null; }
}

var C = (function () {
    function C() {
    }
    C.prototype.fun = function (a) {
        if (typeof a === "undefined") { a = null; }
    };

    C.fun = function (a) {
        if (typeof a === "undefined") { a = null; }
    };
    return C;
})();

var f;
