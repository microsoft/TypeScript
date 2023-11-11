//// [tests/cases/compiler/enumWithComputedMember.ts] ////

//// [enumWithComputedMember.ts]
enum A { 
    X = "".length, 
    Y = X,
    Z
}


/// [Declarations] ////



//// [/.src/enumWithComputedMember.d.ts]
declare enum A {
    X,
    Y,
    Z
}
/// [Errors] ////

enumWithComputedMember.ts(4,5): error TS1061: Enum member must have initializer.


==== enumWithComputedMember.ts (1 errors) ====
    enum A { 
        X = "".length, 
        Y = X,
        Z
        ~
!!! error TS1061: Enum member must have initializer.
    }
    