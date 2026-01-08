//// [tests/cases/conformance/es6/Symbols/symbolProperty49.ts] ////

//// [symbolProperty49.ts]
namespace M {
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
