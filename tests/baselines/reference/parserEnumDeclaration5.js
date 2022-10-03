//// [parserEnumDeclaration5.ts]
enum E {
    A = 1,
    B,
    C = 2,
    D
}

//// [parserEnumDeclaration5.js]
var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 2] = "C";
    E[E["D"] = 3] = "D";
})(E || (E = {}));
