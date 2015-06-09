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
    class C {
        [M.Symbol.iterator]() { }
    }
})(M || (M = {}));
