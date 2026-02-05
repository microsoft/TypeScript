//// [tests/cases/compiler/enumWithUnicodeEscape1.ts] ////

//// [enumWithUnicodeEscape1.ts]
enum E {
  'gold \u2730'
}


//// [enumWithUnicodeEscape1.js]
"use strict";
var E;
(function (E) {
    E[E["gold \u2730"] = 0] = "gold \u2730";
})(E || (E = {}));
