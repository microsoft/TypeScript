//// [tests/cases/compiler/enumAutoIncrementValue.ts] ////

//// [a.ts]
enum E {
    A = 0 / 0,
    B,
}


//// [a.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = NaN] = "A";
    E[E["B"] = NaN] = "B";
})(E || (E = {}));
