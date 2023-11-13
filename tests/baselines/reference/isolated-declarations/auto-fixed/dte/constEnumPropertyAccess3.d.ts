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

/// [Errors] ////

constEnumPropertyAccess3.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumPropertyAccess3.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumPropertyAccess3.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
constEnumPropertyAccess3.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== constEnumPropertyAccess3.ts (4 errors) ====
    const enum E {
        A = ~1,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        B = -1,
        C = ~(1 + 1),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        D = -(1 + 2),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        E = 1 - 10,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
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
    