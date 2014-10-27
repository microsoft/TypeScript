//// [constantsInEnumMembers.ts]

enum Enum1 {
   A0 = 100,
}

enum Enum1 {
    // correct cases
    A,
    B,
    C = 10,
    D = A + B,
    E = A + 1,
    F = 1 + A,
    G = 1 + 1,
    H = A - B,
    I = A - 1,
    J = 1 - A,
    K = 1 - 1,
    L = ~D,
    M = E << B,
    N = E << 1,
    O = E >> B,
    P = E >> 1,
    Q = -D,
    R = C & 5,
    S = 5 & C,
    T = C | D,
    U = C | 1,
    V = 10 | D,
    W = Enum1.V,

    // correct cases: reference to the enum member from different enum declaration
    W1 = A0,
    W2 = Enum1.A0,
    W3 = Enum1["A0"],
    W4 = Enum1["W"],
    // illegal case
    // forward reference to the element of the same enum
    X = Y, 
    // forward reference to the element of the same enum
    Y = Enum1.Z,
    Y1 = Enum1["Z"],
    Z = 100,
}


module A {
    export module B {
        export module C {
            export enum E {
                V1 = 1,
                V2 = A.B.C.E.V1 + 100
            }
        }
    }
}

module A {
    export module B {
        export module C {
            export enum E {
                V3 = A.B.C.E["V2"] + 200,
            }
        }
    }
}

function foo(x: Enum1) {
    switch (x) {
        case Enum1.A:
        case Enum1.B:
        case Enum1.C:
        case Enum1.D:
        case Enum1.E:
        case Enum1.F:
        case Enum1.G:
        case Enum1.H:
        case Enum1.I:
        case Enum1.J:
        case Enum1.K:
        case Enum1.L:
        case Enum1.M:
        case Enum1.N:
        case Enum1.O:
        case Enum1.P:
        case Enum1.Q:
        case Enum1.R:
        case Enum1.S:
        case Enum1.T:
        case Enum1.U:
        case Enum1.V:
        case Enum1.W:
        case Enum1.W1:
        case Enum1.W2:
        case Enum1.W3:
        case Enum1.W4:
        case Enum1.X:
        case Enum1.Y:
        case Enum1.Y1:
        case Enum1.Z:
            break;
    }
}

function bar(e: A.B.C.E): number {
    switch (e) {
        case A.B.C.E.V1: return 1;
        case A.B.C.E.V2: return 1;
        case A.B.C.E.V3: return 1;
    }
}

//// [constantsInEnumMembers.js]
var Enum1;
(function (Enum1) {
    Enum1[Enum1["A0"] = 100] = "A0";
})(Enum1 || (Enum1 = {}));
var Enum1;
(function (Enum1) {
    // correct cases
    Enum1[Enum1["A"] = 0] = "A";
    Enum1[Enum1["B"] = 1] = "B";
    Enum1[Enum1["C"] = 10] = "C";
    Enum1[Enum1["D"] = A + B] = "D";
    Enum1[Enum1["E"] = A + 1] = "E";
    Enum1[Enum1["F"] = 1 + A] = "F";
    Enum1[Enum1["G"] = 1 + 1] = "G";
    Enum1[Enum1["H"] = A - B] = "H";
    Enum1[Enum1["I"] = A - 1] = "I";
    Enum1[Enum1["J"] = 1 - A] = "J";
    Enum1[Enum1["K"] = 1 - 1] = "K";
    Enum1[Enum1["L"] = ~D] = "L";
    Enum1[Enum1["M"] = E << B] = "M";
    Enum1[Enum1["N"] = E << 1] = "N";
    Enum1[Enum1["O"] = E >> B] = "O";
    Enum1[Enum1["P"] = E >> 1] = "P";
    Enum1[Enum1["Q"] = -D] = "Q";
    Enum1[Enum1["R"] = C & 5] = "R";
    Enum1[Enum1["S"] = 5 & C] = "S";
    Enum1[Enum1["T"] = C | D] = "T";
    Enum1[Enum1["U"] = C | 1] = "U";
    Enum1[Enum1["V"] = 10 | D] = "V";
    Enum1[Enum1["W"] = Enum1.V] = "W";
    // correct cases: reference to the enum member from different enum declaration
    Enum1[Enum1["W1"] = A0] = "W1";
    Enum1[Enum1["W2"] = Enum1.A0] = "W2";
    Enum1[Enum1["W3"] = Enum1["A0"]] = "W3";
    Enum1[Enum1["W4"] = Enum1["W"]] = "W4";
    // illegal case
    // forward reference to the element of the same enum
    Enum1[Enum1["X"] = Enum1.Y] = "X";
    // forward reference to the element of the same enum
    Enum1[Enum1["Y"] = 100 /* Z */] = "Y";
    Enum1[Enum1["Y1"] = Enum1["Z"]] = "Y1";
    Enum1[Enum1["Z"] = 100] = "Z";
})(Enum1 || (Enum1 = {}));
var A;
(function (A) {
    var B;
    (function (B) {
        var C;
        (function (C) {
            (function (E) {
                E[E["V1"] = 1] = "V1";
                E[E["V2"] = A.B.C.E.V1 + 100] = "V2";
            })(C.E || (C.E = {}));
            var E = C.E;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var A;
(function (A) {
    var B;
    (function (B) {
        var C;
        (function (C) {
            (function (E) {
                E[E["V3"] = A.B.C.E["V2"] + 200] = "V3";
            })(C.E || (C.E = {}));
            var E = C.E;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
function foo(x) {
    switch (x) {
        case 0 /* A */:
        case 1 /* B */:
        case 10 /* C */:
        case 1 /* D */:
        case 1 /* E */:
        case 1 /* F */:
        case 2 /* G */:
        case -1 /* H */:
        case -1 /* I */:
        case 1 /* J */:
        case 0 /* K */:
        case -2 /* L */:
        case 2 /* M */:
        case 2 /* N */:
        case 0 /* O */:
        case 0 /* P */:
        case -1 /* Q */:
        case 0 /* R */:
        case 0 /* S */:
        case 11 /* T */:
        case 11 /* U */:
        case 11 /* V */:
        case 11 /* W */:
        case 100 /* W1 */:
        case 100 /* W2 */:
        case 100 /* W3 */:
        case 11 /* W4 */:
        case Enum1.X:
        case Enum1.Y:
        case Enum1.Y1:
        case 100 /* Z */:
            break;
    }
}
function bar(e) {
    switch (e) {
        case 1 /* V1 */:
            return 1;
        case 101 /* V2 */:
            return 1;
        case 301 /* V3 */:
            return 1;
    }
}
