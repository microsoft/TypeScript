//// [tests/cases/conformance/es6/Symbols/symbolProperty51.ts] ////

//// [symbolProperty51.ts]
namespace M {
    namespace Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}

//// [symbolProperty51.js]
"use strict";
var M;
(function (M) {
    class C {
        [Symbol.iterator]() { }
    }
})(M || (M = {}));
