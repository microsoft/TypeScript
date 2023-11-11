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

forwardRefInEnum.ts(4,9): error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
forwardRefInEnum.ts(5,10): error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
forwardRefInEnum.ts(7,9): error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
forwardRefInEnum.ts(8,10): error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.


==== forwardRefInEnum.ts (4 errors) ====
    enum E1 {
        // illegal case
        // forward reference to the element of the same enum
        X = Y, 
            ~
!!! error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
        X1 = E1["Y"], 
             ~~~~~~~
!!! error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
        // forward reference to the element of the same enum
        Y = E1.Z,
            ~~~~
!!! error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
        Y1 = E1["Z"]
             ~~~~~~~
!!! error TS2651: A member initializer in a enum declaration cannot reference members declared after it, including members defined in other enums.
    }
    
    enum E1 {
        Z = 4    
    }
    