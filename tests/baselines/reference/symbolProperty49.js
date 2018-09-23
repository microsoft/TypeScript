//// [symbolProperty49.ts]
module M {
    export var Symbol;

    class C {
        [Symbol.iterator]() { }
    }
}

//// [symbolProperty49.js]
var M = M || (M = {});
(function (M) {
    class C {
        [M.Symbol.iterator]() { }
    }
})(M);
