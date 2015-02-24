//// [symbolProperty50.ts]
module M {
    interface Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}

//// [symbolProperty50.js]
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        C.prototype[Symbol.iterator] = function () { };
        return C;
    })();
})(M || (M = {}));
