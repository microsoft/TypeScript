//// [tests/cases/compiler/isolatedModulesNonAmbientConstEnum.ts] ////

//// [file1.ts]
const enum E { X = 100 };
var e = E.X;
export var x;

//// [file1.js]
var E;
(function (E) {
    E[E["X"] = 100] = "X";
})(E || (E = {}));
;
var e = E.X;
export var x;
