//// [enumsWithMultipleDeclarations3.ts]
module E {
}

enum E {
  A
}

//// [enumsWithMultipleDeclarations3.js]
var E = E || (E = {});
(function (E) {
    E[E["A"] = 0] = "A";
})(E);
