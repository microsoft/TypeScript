//// [enumPropertyAccessBeforeInitalisation.ts]
enum E {
    A = A,
    B = E.B,
    C = E["C"],
    D = 1 + D
}


//// [enumPropertyAccessBeforeInitalisation.js]
var E;
(function (E) {
    E[E["A"] = E.A] = "A";
    E[E["B"] = E.B] = "B";
    E[E["C"] = E["C"]] = "C";
    E[E["D"] = 1 + E.D] = "D";
})(E || (E = {}));
