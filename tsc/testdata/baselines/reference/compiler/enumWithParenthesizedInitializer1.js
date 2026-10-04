//// [tests/cases/compiler/enumWithParenthesizedInitializer1.ts] ////

//// [enumWithParenthesizedInitializer1.ts]
enum E {
 e = -(3
}

//// [enumWithParenthesizedInitializer1.js]
"use strict";
var E;
(function (E) {
    E[E["e"] = -3] = "e";
})(E || (E = {}));
