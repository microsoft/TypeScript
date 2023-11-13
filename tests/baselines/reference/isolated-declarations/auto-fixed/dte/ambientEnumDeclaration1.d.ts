//// [tests/cases/conformance/ambient/ambientEnumDeclaration1.ts] ////

//// [ambientEnumDeclaration1.ts]
// In ambient enum declarations, all values specified in enum member declarations must be classified as constant enum expressions.

declare enum E {
    a = 10,
    b = 10 + 1,
    c = b,
    d = (c) + 1,
    e = 10 << 2 * 8,
}

/// [Declarations] ////



//// [ambientEnumDeclaration1.d.ts]
declare enum E {
    a = 10,
    b = 11,
    c = 11,
    d = 12,
    e = 655360
}
/// [Errors] ////

ambientEnumDeclaration1.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
ambientEnumDeclaration1.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
ambientEnumDeclaration1.ts(7,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
ambientEnumDeclaration1.ts(8,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== ambientEnumDeclaration1.ts (4 errors) ====
    // In ambient enum declarations, all values specified in enum member declarations must be classified as constant enum expressions.
    
    declare enum E {
        a = 10,
        b = 10 + 1,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c = b,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        d = (c) + 1,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        e = 10 << 2 * 8,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }