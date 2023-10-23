//// [tests/cases/compiler/forwardRefInEnum.ts] ////

//// [forwardRefInEnum.ts]
enum E1 {
    // illegal case
    // forward reference to the element of the same enum
    X = Y, 
    X1 = E1["Y"], 
    // forward reference to the element of the same enum
    Y = E1.Z,
    Y1 = E1["Z"]
}

enum E1 {
    Z = 4    
}


/// [Declarations] ////



//// [/.src/forwardRefInEnum.d.ts]
declare enum E1 {
    X = 0,
    X1 = 0,
    Y = 0,
    Y1 = 0
}
declare enum E1 {
    Z = 4
}
/// [Errors] ////

forwardRefInEnum.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
forwardRefInEnum.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
forwardRefInEnum.ts(7,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
forwardRefInEnum.ts(8,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== forwardRefInEnum.ts (4 errors) ====
    enum E1 {
        // illegal case
        // forward reference to the element of the same enum
        X = Y, 
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        X1 = E1["Y"], 
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        // forward reference to the element of the same enum
        Y = E1.Z,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        Y1 = E1["Z"]
        ~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    enum E1 {
        Z = 4    
    }
    