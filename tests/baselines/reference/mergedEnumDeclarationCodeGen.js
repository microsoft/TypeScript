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
    E["b"] = E.a;
})(E || (E = {}));
var E;
(function (E) {
    E["c"] = E.a;
})(E || (E = {}));
