//// [tests/cases/compiler/enumWithNaNProperty.ts] ////

//// [enumWithNaNProperty.ts]
enum A {
    NaN = 1
}


//// [enumWithNaNProperty.js]
"use strict";
var A;
(function (A) {
    A[A["NaN"] = 1] = "NaN";
})(A || (A = {}));
