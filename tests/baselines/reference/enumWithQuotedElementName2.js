//// [tests/cases/compiler/enumWithQuotedElementName2.ts] ////

//// [enumWithQuotedElementName2.ts]
enum E {
   "fo'o",
}

//// [enumWithQuotedElementName2.js]
var E;
(function (E) {
    E[E["fo'o"] = 0] = "fo'o";
})(E || (E = {}));
