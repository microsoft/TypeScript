//// [tests/cases/compiler/enumWithInfinityProperty.ts] ////

//// [enumWithInfinityProperty.ts]
enum A {
    Infinity = 1
}


//// [enumWithInfinityProperty.js]
"use strict";
var A;
(function (A) {
    A[A["Infinity"] = 1] = "Infinity";
})(A || (A = {}));
