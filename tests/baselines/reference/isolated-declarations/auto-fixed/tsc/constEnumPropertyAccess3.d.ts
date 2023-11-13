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


/// [Declarations] ////



//// [constEnumPropertyAccess3.d.ts]
declare const enum E {
    A = -2,
    B = -1,
    C = -3,
    D = -3,
    E = -9
}
