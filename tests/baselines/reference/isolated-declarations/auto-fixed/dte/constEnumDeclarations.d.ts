//// [tests/cases/compiler/constEnumDeclarations.ts] ////

//// [constEnumDeclarations.ts]
const enum E {
    A = 1,
    B = 2,
    C = A | B
}

const enum E2 {
    A = 1,
    B,
    C
}

/// [Declarations] ////



//// [constEnumDeclarations.d.ts]
declare const enum E {
    A = 1,
    B = 2,
    C = 3
}
declare const enum E2 {
    A = 1,
    B = 2,
    C = 3
}
/// [Errors] ////

constEnumDeclarations.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== constEnumDeclarations.ts (1 errors) ====
    const enum E {
        A = 1,
        B = 2,
        C = A | B
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    const enum E2 {
        A = 1,
        B,
        C
    }