//// [tests/cases/compiler/constEnumBadPropertyNames.ts] ////

//// [constEnumBadPropertyNames.ts]
const enum E { A }
var x = E["B"]

//// [constEnumBadPropertyNames.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var x = E["B"];
