//// [tests/cases/conformance/parser/ecmascript5/EnumDeclarations/parserEnumDeclaration6.ts] ////

//// [parserEnumDeclaration6.ts]
enum E {
    A = 1,
    B,
    C = 1 << 1,
    D,
}

/// [Declarations] ////



//// [parserEnumDeclaration6.d.ts]
declare enum E {
    A = 1,
    B = 2,
    C = 2,
    D = 3
}
/// [Errors] ////

parserEnumDeclaration6.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== parserEnumDeclaration6.ts (1 errors) ====
    enum E {
        A = 1,
        B,
        C = 1 << 1,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        D,
    }