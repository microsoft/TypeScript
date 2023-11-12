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


/// [Declarations] ////



//// [/.src/constEnums.d.ts]
declare const enum Enum1 {
    A0 = 100
}
declare const enum Enum1 {
    A = 0,
    B = 1,
    C = 10,
    D = 1,
    E = 1,
    F = 1,
    G = 1,
    H = -2,
    I = 0,
    J = 0,
    K = -6,
    L = -2,
    M = 2,
    N = 2,
    O = 0,
    P = 0,
    PQ = 1,
    Q = -1,
    R = 0,
    S = 0,
    T = 11,
    U = 11,
    V = 11,
    W = 11,
    W1,
    W2,
    W3,
    W4 = 11,
    W5 = 11
}
declare const enum Comments {
    "//" = 0,
    "/*" = 1,
    "*/" = 2,
    "///" = 3,
    "#" = 4,
    "<!--" = 5,
    "-->" = 6
}
declare namespace A {
    namespace B {
        namespace C {
            const enum E {
                V1 = 1,
                V2 = 101
            }
        }
    }
}
declare namespace A {
    namespace B {
        namespace C {
            const enum E {
                V3,
                V4
            }
        }
    }
}
declare namespace A1 {
    namespace B {
        namespace C {
            const enum E {
                V1 = 10,
                V2 = 110
            }
        }
    }
}
declare namespace A2 {
    namespace B {
        namespace C {
            const enum E {
                V1 = 10,
                V2 = 110
            }
        }
        namespace C {
        }
    }
}
import I = A.B.C.E;
import I1 = A1.B;
import I2 = A2.B;
declare function foo0(e: I): void;
declare function foo1(e: I1.C.E): void;
declare function foo2(e: I2.C.E): void;
declare function foo(x: Enum1): invalid;
declare function bar(e: A.B.C.E): number;
declare function baz(c: Comments): invalid;
/// [Errors] ////

constEnums.ts(33,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnums.ts(33,10): error TS2474: const enum member initializers must be constant expressions.
constEnums.ts(34,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnums.ts(34,10): error TS2474: const enum member initializers must be constant expressions.
constEnums.ts(35,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnums.ts(35,10): error TS2474: const enum member initializers must be constant expressions.
constEnums.ts(65,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnums.ts(65,22): error TS2474: const enum member initializers must be constant expressions.
constEnums.ts(66,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnums.ts(66,22): error TS2474: const enum member initializers must be constant expressions.
constEnums.ts(124,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnums.ts(166,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== constEnums.ts (12 errors) ====
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
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~
!!! error TS2474: const enum member initializers must be constant expressions.
        W2 = Enum1.A0,
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~~~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
        W3 = Enum1["A0"],
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~~~~~~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
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
                    ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~~~~~~~~~~~~~~~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
                    V4 = A.B.C.E[`V1`] << 1,
                    ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~~~~~~~~~~~~~~~~~~
!!! error TS2474: const enum member initializers must be constant expressions.
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
             ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
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
             ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
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
    