//// [parserEnumDeclaration6.ts]
enum E {
    A = 1,
    B,
    C = 1 << 1,
    D,
}

//// [parserEnumDeclaration6.js]
var E;
(function (E) {
    E[E["A"] = 1] = "A";
    E[E["B"] = 2] = "B";
    E[E["C"] = 2] = "C";
    E[E["D"] = 3] = "D";
})(E || (E = {}));
