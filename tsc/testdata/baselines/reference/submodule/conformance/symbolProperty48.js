//// [tests/cases/conformance/es6/Symbols/symbolProperty48.ts] ////

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
    class C {
        [Symbol.iterator]() { }
    }
})(M || (M = {}));
