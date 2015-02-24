//// [symbolProperty48.ts]
module M {
    var Symbol;

    class C {
        [Symbol.iterator]() { }
    }
}

//// [symbolProperty48.js]
var M;
(function (M) {
    var Symbol;
    var C = (function () {
        function C() {
        }
        C.prototype[Symbol.iterator] = function () { };
        return C;
    })();
})(M || (M = {}));
