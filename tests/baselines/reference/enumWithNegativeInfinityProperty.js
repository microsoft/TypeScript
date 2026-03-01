//// [tests/cases/compiler/enumWithNegativeInfinityProperty.ts] ////

//// [enumWithNegativeInfinityProperty.ts]
enum A {
    "-Infinity" = 1
}


//// [enumWithNegativeInfinityProperty.js]
"use strict";
var A;
(function (A) {
    A[A["-Infinity"] = 1] = "-Infinity";
})(A || (A = {}));
