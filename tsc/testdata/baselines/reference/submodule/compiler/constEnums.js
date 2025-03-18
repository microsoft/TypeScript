//// [tests/cases/compiler/constEnums.ts] ////

//// [constEnums.ts]
const enum Enum1 {
   A0 = 100,
}

const enum Enum1 {
    // correct cases
    A,
    B,
    C = 10,
    D = A | B,
    E = A | 1,
    F = 1 | A,
    G = (1 & 1),
    H = ~(A | B),
    I = A >>> 1,
    J = 1 & A,
    K = ~(1 | 5),
    L = ~D,
    M = E << B,
    N = E << 1,
    O = E >> B,
    P = E >> 1,
    PQ = E ** 2,
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
    W5 = Enum1[`V`],
}

const enum Comments {
    "//",
    "/*",
    "*/",
    "///",
    "#",
    "<!--",
    "-->",
}

module A {
    export module B {
        export module C {
            export const enum E {
                V1 = 1,
                V2 = A.B.C.E.V1 | 100
            }
        }
    }
}

module A {
    export module B {
        export module C {
            export const enum E {
                V3 = A.B.C.E["V2"] & 200,
                V4 = A.B.C.E[`V1`] << 1,
            }
        }
    }
}

module A1 {
    export module B {
        export module C {
            export const enum E {
                V1 = 10,
                V2 = 110,
            }
        }
    }
}

module A2 {
    export module B {
        export module C {
            export const enum E {
                V1 = 10,
                V2 = 110,
            }
        }
        // module C will be classified as value
        export module C {
            var x = 1
        }
    }
}

import I = A.B.C.E;
import I1 = A1.B;
import I2 = A2.B;

function foo0(e: I): void {
    if (e === I.V1) {
    }
    else if (e === I.V2) {
    }
}

function foo1(e: I1.C.E): void {
    if (e === I1.C.E.V1) {
    }
    else if (e === I1.C.E.V2) {
    }
}

function foo2(e: I2.C.E): void {
    if (e === I2.C.E.V1) {
    }
    else if (e === I2.C.E.V2) {
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
        case Enum1.PQ:
        case Enum1.Q:
        case Enum1.R:
        case Enum1.S:
        case Enum1["T"]:
        case Enum1[`U`]:
        case Enum1.V:
        case Enum1.W:
        case Enum1.W1:
        case Enum1.W2:
        case Enum1.W3:
        case Enum1.W4:
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

function baz(c: Comments) {
    switch (c) {
        case Comments["//"]:
        case Comments["/*"]:
        case Comments["*/"]:
        case Comments["///"]:
        case Comments["#"]:
        case Comments["<!--"]:
        case Comments["-->"]:
        break;
    }
}


//// [constEnums.js]
var Enum1;
(function (Enum1) {
    Enum1[Enum1["A0"] = 100] = "A0";
})(Enum1 || (Enum1 = {}));
(function (Enum1) {
    Enum1[Enum1["A"] = 0] = "A";
    Enum1[Enum1["B"] = 1] = "B";
    Enum1[Enum1["C"] = 10] = "C";
    Enum1[Enum1["D"] = 1] = "D";
    Enum1[Enum1["E"] = 1] = "E";
    Enum1[Enum1["F"] = 1] = "F";
    Enum1[Enum1["G"] = 1] = "G";
    Enum1[Enum1["H"] = -2] = "H";
    Enum1[Enum1["I"] = 0] = "I";
    Enum1[Enum1["J"] = 0] = "J";
    Enum1[Enum1["K"] = -6] = "K";
    Enum1[Enum1["L"] = -2] = "L";
    Enum1[Enum1["M"] = 2] = "M";
    Enum1[Enum1["N"] = 2] = "N";
    Enum1[Enum1["O"] = 0] = "O";
    Enum1[Enum1["P"] = 0] = "P";
    Enum1[Enum1["PQ"] = 1] = "PQ";
    Enum1[Enum1["Q"] = -1] = "Q";
    Enum1[Enum1["R"] = 0] = "R";
    Enum1[Enum1["S"] = 0] = "S";
    Enum1[Enum1["T"] = 11] = "T";
    Enum1[Enum1["U"] = 11] = "U";
    Enum1[Enum1["V"] = 11] = "V";
    Enum1[Enum1["W"] = 11] = "W";
    Enum1["W1"] = A0;
    if (typeof Enum1.W1 !== "string") Enum1[Enum1.W1] = "W1";
    Enum1["W2"] = Enum1.A0;
    if (typeof Enum1.W2 !== "string") Enum1[Enum1.W2] = "W2";
    Enum1["W3"] = Enum1["A0"];
    if (typeof Enum1.W3 !== "string") Enum1[Enum1.W3] = "W3";
    Enum1[Enum1["W4"] = 11] = "W4";
    Enum1[Enum1["W5"] = 11] = "W5";
})(Enum1 || (Enum1 = {}));
var Comments;
(function (Comments) {
    Comments[Comments["//"] = 0] = "//";
    Comments[Comments["/*"] = 1] = "/*";
    Comments[Comments["*/"] = 2] = "*/";
    Comments[Comments["///"] = 3] = "///";
    Comments[Comments["#"] = 4] = "#";
    Comments[Comments["<!--"] = 5] = "<!--";
    Comments[Comments["-->"] = 6] = "-->";
})(Comments || (Comments = {}));
var A2;
(function (A2) {
    let B;
    (function (B) {
        let C;
        (function (C) {
            var x = 1;
        })(C = B.C || (B.C = {}));
    })(B = A2.B || (A2.B = {}));
})(A2 || (A2 = {}));
function foo0(e) {
    if (e === I.V1) {
    }
    else if (e === I.V2) {
    }
}
function foo1(e) {
    if (e === I1.C.E.V1) {
    }
    else if (e === I1.C.E.V2) {
    }
}
function foo2(e) {
    if (e === I2.C.E.V1) {
    }
    else if (e === I2.C.E.V2) {
    }
}
function foo(x) {
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
        case Enum1.PQ:
        case Enum1.Q:
        case Enum1.R:
        case Enum1.S:
        case Enum1["T"]:
        case Enum1[`U`]:
        case Enum1.V:
        case Enum1.W:
        case Enum1.W1:
        case Enum1.W2:
        case Enum1.W3:
        case Enum1.W4:
            break;
    }
}
function bar(e) {
    switch (e) {
        case A.B.C.E.V1: return 1;
        case A.B.C.E.V2: return 1;
        case A.B.C.E.V3: return 1;
    }
}
function baz(c) {
    switch (c) {
        case Comments["//"]:
        case Comments["/*"]:
        case Comments["*/"]:
        case Comments["///"]:
        case Comments["#"]:
        case Comments["<!--"]:
        case Comments["-->"]:
            break;
    }
}
