//// [tests/cases/compiler/constEnumDeclarations.ts] ////

//// [constEnumDeclarations.ts]
const enum E {
    A = 1,
    B = 2,
    C = A | B
}

const enum E2 {
    A = 1,
    B,
    C
}

//// [constEnumDeclarations.js]
var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 3] = "C";
})(E || (E = {}));
var E2;
(function (E2) {
    E2[E2["A"] = 1] = "A";
    E2[E2["B"] = 2] = "B";
    E2[E2["C"] = 3] = "C";
})(E2 || (E2 = {}));
