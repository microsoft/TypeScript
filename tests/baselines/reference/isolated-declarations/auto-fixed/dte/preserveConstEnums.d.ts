//// [tests/cases/compiler/preserveConstEnums.ts] ////

//// [preserveConstEnums.ts]
const enum E {
    Value = 1, Value2 = Value
}

/// [Declarations] ////



//// [preserveConstEnums.d.ts]
declare const enum E {
    Value = 1,
    Value2 = 1
}

/// [Errors] ////

preserveConstEnums.ts(2,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== preserveConstEnums.ts (1 errors) ====
    const enum E {
        Value = 1, Value2 = Value
                   ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }