//// [tests/cases/compiler/enumUnicodeEscapeMemberName.ts] ////

//// [enumUnicodeEscapeMemberName.ts]
enum E {
  \u0041 = 1,
}
const a = E.A;


//// [enumUnicodeEscapeMemberName.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = 1] = "A";
})(E || (E = {}));
const a = E.A;
