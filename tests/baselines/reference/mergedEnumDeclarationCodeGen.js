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
    E[E["b"] = E.a] = "b";
})(E || (E = {}));
var E;
(function (E) {
    E[E["c"] = E.a] = "c";
})(E || (E = {}));
