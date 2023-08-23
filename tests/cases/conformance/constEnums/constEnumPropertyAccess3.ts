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
