//// [tests/cases/compiler/enumWithComputedMember.ts] ////

//// [enumWithComputedMember.ts]
enum A { 
    X = "".length, 
    Y = X,
    Z
}


/// [Declarations] ////



//// [enumWithComputedMember.d.ts]
declare enum A {
    X,
    Y,
    Z
}

/// [Errors] ////

enumWithComputedMember.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumWithComputedMember.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumWithComputedMember.ts(4,5): error TS1061: Enum member must have initializer.


==== enumWithComputedMember.ts (3 errors) ====
    enum A { 
        X = "".length, 
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        Y = X,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        Z
        ~
!!! error TS1061: Enum member must have initializer.
    }
    