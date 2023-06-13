//// [tests/cases/compiler/enumsWithMultipleDeclarations1.ts] ////

//// [enumsWithMultipleDeclarations1.ts]
enum E {
  A
}

enum E {
  B
}

enum E {
  C
}

//// [enumsWithMultipleDeclarations1.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
(function (E) {
    E[E["B"] = 0] = "B";
})(E || (E = {}));
(function (E) {
    E[E["C"] = 0] = "C";
})(E || (E = {}));
