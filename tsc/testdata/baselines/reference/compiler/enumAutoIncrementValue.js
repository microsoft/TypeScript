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
    E[E["A"] = 0 / 0] = "A";
    E[E["B"] = 0 / 0] = "B";
})(E || (E = {}));
