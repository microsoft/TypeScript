//// [tests/cases/compiler/mergedEnumDeclarationCodeGen.ts] ////

//// [mergedEnumDeclarationCodeGen.ts]
enum E {
    a,
    b = a
}
enum E {
    c = a
}

//// [mergedEnumDeclarationCodeGen.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 0] = "b";
})(E || (E = {}));
(function (E) {
    E[E["c"] = a] = "c";
})(E || (E = {}));
