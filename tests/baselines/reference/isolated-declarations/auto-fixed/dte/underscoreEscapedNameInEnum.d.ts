//// [tests/cases/compiler/underscoreEscapedNameInEnum.ts] ////

//// [underscoreEscapedNameInEnum.ts]
enum E {
    "__foo" = 1,
    bar = E["__foo"] + 1
}


/// [Declarations] ////



//// [underscoreEscapedNameInEnum.d.ts]
declare enum E {
    "__foo" = 1,
    bar = 2
}

/// [Errors] ////

underscoreEscapedNameInEnum.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== underscoreEscapedNameInEnum.ts (1 errors) ====
    enum E {
        "__foo" = 1,
        bar = E["__foo"] + 1
        ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    