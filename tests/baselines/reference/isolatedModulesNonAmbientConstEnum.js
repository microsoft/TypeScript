//// [file1.ts]
const enum E { X = 100 };
var e = E.X;
export var x;

//// [file1.js]
const E = {};
(function (E) {
    E[E["X"] = 100] = "X";
})(E);
;
var e = E.X;
export var x;
