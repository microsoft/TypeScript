//// [tests/cases/compiler/enumWithParenthesizedInitializer1.ts] ////

//// [enumWithParenthesizedInitializer1.ts]
enum E {
 e = -(3
}

/// [Declarations] ////



//// [enumWithParenthesizedInitializer1.d.ts]
declare enum E {
    e = -3
}

/// [Errors] ////

enumWithParenthesizedInitializer1.ts(2,2): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumWithParenthesizedInitializer1.ts(3,1): error TS1005: ')' expected.


==== enumWithParenthesizedInitializer1.ts (2 errors) ====
    enum E {
     e = -(3
     ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    ~
!!! error TS1005: ')' expected.