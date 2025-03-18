//// [tests/cases/conformance/constEnums/constEnumPropertyAccess3.ts] ////

//// [constEnumPropertyAccess3.ts]
const enum E {
    A = ~1,
    B = -1,
    C = ~(1 + 1),
    D = -(1 + 2),
    E = 1 - 10,
}

E.A.toString();
E.B.toString();
E.C.toString();
E.D.toString();

E["A"].toString();
E["B"].toString();
E["C"].toString();
E["D"].toString();
E["E"].toString();


//// [constEnumPropertyAccess3.js]
var E;
(function (E) {
    E[E["A"] = -2] = "A";
    E[E["B"] = -1] = "B";
    E[E["C"] = -3] = "C";
    E[E["D"] = -3] = "D";
    E[E["E"] = -9] = "E";
})(E || (E = {}));
E.A.toString();
E.B.toString();
E.C.toString();
E.D.toString();
E["A"].toString();
E["B"].toString();
E["C"].toString();
E["D"].toString();
E["E"].toString();
