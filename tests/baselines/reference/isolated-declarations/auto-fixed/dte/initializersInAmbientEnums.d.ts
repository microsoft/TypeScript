//// [tests/cases/compiler/initializersInAmbientEnums.ts] ////

//// [initializersInAmbientEnums.ts]
declare enum E {
    a = 10,
    b = a,
    e = 10 << 2 * 8,
}

/// [Declarations] ////



//// [initializersInAmbientEnums.d.ts]
declare enum E {
    a = 10,
    b = 10,
    e = 655360
}

/// [Errors] ////

initializersInAmbientEnums.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
initializersInAmbientEnums.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== initializersInAmbientEnums.ts (2 errors) ====
    declare enum E {
        a = 10,
        b = a,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        e = 10 << 2 * 8,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }