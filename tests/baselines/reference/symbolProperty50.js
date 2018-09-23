//// [symbolProperty50.ts]
module M {
    interface Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}

//// [symbolProperty50.js]
var M = M || (M = {});
(function (M) {
    class C {
        [Symbol.iterator]() { }
    }
})(M);
