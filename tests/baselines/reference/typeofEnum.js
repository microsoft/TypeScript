//// [tests/cases/compiler/typeofEnum.ts] ////

//// [typeofEnum.ts]
enum E {
    e1,
    e2
}

var e1: typeof E;
e1.e1;

//// [typeofEnum.js]
var E;
(function (E) {
    E[E["e1"] = 0] = "e1";
    E[E["e2"] = 1] = "e2";
})(E || (E = {}));
var e1;
e1.e1;
