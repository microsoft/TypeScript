//// [tests/cases/compiler/enumsWithMultipleDeclarations3.ts] ////

//// [enumsWithMultipleDeclarations3.ts]
module E {
}

enum E {
  A
}

//// [enumsWithMultipleDeclarations3.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
