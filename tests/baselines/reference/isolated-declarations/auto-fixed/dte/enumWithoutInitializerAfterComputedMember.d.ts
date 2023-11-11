//// [tests/cases/compiler/enumWithoutInitializerAfterComputedMember.ts] ////

//// [enumWithoutInitializerAfterComputedMember.ts]
enum E {
    a,
    b = a,
    c
}

/// [Declarations] ////



//// [/.src/enumWithoutInitializerAfterComputedMember.d.ts]
declare enum E {
    a = 0,
    b = 0,
    c = 1
}
/// [Errors] ////

enumWithoutInitializerAfterComputedMember.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumWithoutInitializerAfterComputedMember.ts (1 errors) ====
    enum E {
        a,
        b = a,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        c
    }