//// [tests/cases/conformance/es6/Symbols/symbolProperty50.ts] ////

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
    class C {
        [Symbol.iterator]() { }
    }
})(M || (M = {}));
