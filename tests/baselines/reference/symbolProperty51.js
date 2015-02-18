//// [symbolProperty51.ts]
module M {
    module Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}

//// [symbolProperty51.js]
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        C.prototype[Symbol.iterator] = function () { };
        return C;
    })();
})(M || (M = {}));
