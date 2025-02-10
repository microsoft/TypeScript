//// [tests/cases/compiler/constEnumUsedAsValue.ts] ////

//// [constEnumUsedAsValue.ts]
const enum E {
    A,
    B,
    C,
}

declare const x: E;

E;
E[x];

//// [constEnumUsedAsValue.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));
E;
E[x];
