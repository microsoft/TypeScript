//// [tests/cases/compiler/enumPropertyAccessBeforeInitalisation.ts] ////

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
    E["A"] = E.A;
    if (typeof E.A !== "string") E[E.A] = "A";
    E["B"] = E.B;
    if (typeof E.B !== "string") E[E.B] = "B";
    E["C"] = E["C"];
    if (typeof E.C !== "string") E[E.C] = "C";
    E["D"] = 1 + E.D;
    if (typeof E.D !== "string") E[E.D] = "D";
})(E || (E = {}));
