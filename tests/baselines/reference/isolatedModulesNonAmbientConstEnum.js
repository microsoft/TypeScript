//// [isolatedModulesNonAmbientConstEnum.ts]

const enum E { X = 100 };
var e = E.X;
export var x;

//// [isolatedModulesNonAmbientConstEnum.js]
var E;
(function (E) {
    E[E["X"] = 100] = "X";
})(E || (E = {}));
;
var e = E.X;
export var x;
