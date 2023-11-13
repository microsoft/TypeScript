//// [tests/cases/compiler/mergedEnumDeclarationCodeGen.ts] ////

//// [mergedEnumDeclarationCodeGen.ts]
enum E {
    a,
    b = a
}
enum E {
    c = a
}

/// [Declarations] ////



//// [mergedEnumDeclarationCodeGen.d.ts]
declare enum E {
    a = 0,
    b = 0
}
declare enum E {
    c
}

/// [Errors] ////

mergedEnumDeclarationCodeGen.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
mergedEnumDeclarationCodeGen.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== mergedEnumDeclarationCodeGen.ts (2 errors) ====
    enum E {
        a,
        b = a
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    enum E {
        c = a
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }