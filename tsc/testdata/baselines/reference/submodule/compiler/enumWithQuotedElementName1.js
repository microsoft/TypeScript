//// [tests/cases/compiler/enumWithQuotedElementName1.ts] ////

//// [enumWithQuotedElementName1.ts]
enum E {
   'fo"o',
}

//// [enumWithQuotedElementName1.js]
"use strict";
var E;
(function (E) {
    E[E["fo\"o"] = 0] = "fo\"o";
})(E || (E = {}));
