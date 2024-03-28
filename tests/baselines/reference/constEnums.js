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
var A2;
(function (A2) {
    var B;
    (function (B) {
        // module C will be classified as value
        var C;
        (function (C) {
            var x = 1;
        })(C = B.C || (B.C = {}));
    })(B = A2.B || (A2.B = {}));
})(A2 || (A2 = {}));
var I2 = A2.B;
function foo0(e) {
    if (e === 1 /* I.V1 */) {
    }
    else if (e === 101 /* I.V2 */) {
    }
}
function foo1(e) {
    if (e === 10 /* I1.C.E.V1 */) {
    }
    else if (e === 110 /* I1.C.E.V2 */) {
    }
}
function foo2(e) {
    if (e === 10 /* I2.C.E.V1 */) {
    }
    else if (e === 110 /* I2.C.E.V2 */) {
    }
}
function foo(x) {
    switch (x) {
        case 0 /* Enum1.A */:
        case 1 /* Enum1.B */:
        case 10 /* Enum1.C */:
        case 1 /* Enum1.D */:
        case 1 /* Enum1.E */:
        case 1 /* Enum1.F */:
        case 1 /* Enum1.G */:
        case -2 /* Enum1.H */:
        case 0 /* Enum1.I */:
        case 0 /* Enum1.J */:
        case -6 /* Enum1.K */:
        case -2 /* Enum1.L */:
        case 2 /* Enum1.M */:
        case 2 /* Enum1.N */:
        case 0 /* Enum1.O */:
        case 0 /* Enum1.P */:
        case 1 /* Enum1.PQ */:
        case -1 /* Enum1.Q */:
        case 0 /* Enum1.R */:
        case 0 /* Enum1.S */:
        case 11 /* Enum1["T"] */:
        case 11 /* Enum1[`U`] */:
        case 11 /* Enum1.V */:
        case 11 /* Enum1.W */:
        case 100 /* Enum1.W1 */:
        case 100 /* Enum1.W2 */:
        case 100 /* Enum1.W3 */:
        case 11 /* Enum1.W4 */:
            break;
    }
}
function bar(e) {
    switch (e) {
        case 1 /* A.B.C.E.V1 */: return 1;
        case 101 /* A.B.C.E.V2 */: return 1;
        case 64 /* A.B.C.E.V3 */: return 1;
    }
}
function baz(c) {
    switch (c) {
        case 0 /* Comments["//"] */:
        case 1 /* Comments["/*"] */:
        case 2 /* Comments["*_/"] */:
        case 3 /* Comments["///"] */:
        case 4 /* Comments["#"] */:
        case 5 /* Comments["<!--"] */:
        case 6 /* Comments["-->"] */:
            break;
    }
}
