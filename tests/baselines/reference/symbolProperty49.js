//// [symbolProperty49.ts]
module M {
    export var Symbol;

    class C {
        [Symbol.iterator]() { }
    }
}

//// [symbolProperty49.js]
var M;
(function (M) {
    M.Symbol;
    var C = (function () {
        function C() {
        }
        C.prototype[M.Symbol.iterator] = function () { };
        return C;
    })();
})(M || (M = {}));
