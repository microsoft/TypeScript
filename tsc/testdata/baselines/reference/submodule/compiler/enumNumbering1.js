//// [tests/cases/compiler/enumNumbering1.ts] ////

//// [enumNumbering1.ts]
enum Test {
    A,
    B,
    C = Math.floor(Math.random() * 1000),
    D = 10,
    E // Error but shouldn't be
}


//// [enumNumbering1.js]
var Test;
(function (Test) {
    Test[Test["A"] = 0] = "A";
    Test[Test["B"] = 1] = "B";
    Test["C"] = Math.floor(Math.random() * 1000);
    if (typeof Test.C !== "string") Test[Test.C] = "C";
    Test[Test["D"] = 10] = "D";
    Test[Test["E"] = 11] = "E"; // Error but shouldn't be
})(Test || (Test = {}));
