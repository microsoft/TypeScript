//// [tests/cases/compiler/enumsWithMultipleDeclarations2.ts] ////

//// [enumsWithMultipleDeclarations2.ts]
enum E {
  A
}

enum E {
  B = 1
}

enum E {
  C
}

//// [enumsWithMultipleDeclarations2.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
(function (E) {
    E[E["B"] = 1] = "B";
})(E || (E = {}));
(function (E) {
    E[E["C"] = 0] = "C";
})(E || (E = {}));
