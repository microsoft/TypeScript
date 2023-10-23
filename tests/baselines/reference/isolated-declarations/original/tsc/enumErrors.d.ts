//// [tests/cases/conformance/enums/enumErrors.ts] ////

//// [enumErrors.ts]
// Enum named with PredefinedTypes
enum any { }
enum number { }
enum string { }
enum boolean { }

// Enum with computed member initializer of type Number
enum E5 {
    C = new Number(30)
}

enum E9 {
    A,
    B = A
}

//Enum with computed member intializer of different enum type
// Bug 707850: This should be allowed
enum E10 {
    A = E9.A,
    B = E9.B
}

// Enum with computed member intializer of other types
enum E11 {
    A = true,
    B = new Date(),
    C = window,
    D = {},
    E = (() => 'foo')(),
}

// Enum with string valued member and computed member initializers
enum E12 {
    A = '',
    B = new Date(),
    C = window,
    D = {},
    E = 1 + 1,
    F = (() => 'foo')(),
}

// Enum with incorrect syntax
enum E13 {
    postComma,
    postValueComma = 1,

    postSemicolon;
    postColonValueComma: 2,
    postColonValueSemicolon: 3;
};

enum E14 { a, b: any "hello" += 1, c, d}


/// [Declarations] ////



//// [/.src/enumErrors.d.ts]
declare enum any {
}
declare enum number {
}
declare enum string {
}
declare enum boolean {
}
declare enum E5 {
    C
}
declare enum E9 {
    A = 0,
    B = 0
}
declare enum E10 {
    A = 0,
    B = 0
}
declare enum E11 {
    A,
    B,
    C,
    D,
    E
}
declare enum E12 {
    A = "",
    B,
    C,
    D,
    E = 2,
    F
}
declare enum E13 {
    postComma = 0,
    postValueComma = 1,
    postSemicolon = 2,
    postColonValueComma = 3,
    2 = 4,
    postColonValueSemicolon = 5,
    3 = 6
}
declare enum E14 {
    a = 0,
    b = 1,
    any = 2,
    "hello" = 3,
    1 = 4,
    c = 5,
    d = 6
}
/// [Errors] ////

enumErrors.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(14,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(20,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(21,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(27,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(28,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(29,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(30,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(36,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(37,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(38,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(39,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumErrors.ts(40,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumErrors.ts (13 errors) ====
    // Enum named with PredefinedTypes
    enum any { }
    enum number { }
    enum string { }
    enum boolean { }
    
    // Enum with computed member initializer of type Number
    enum E5 {
        C = new Number(30)
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    enum E9 {
        A,
        B = A
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    //Enum with computed member intializer of different enum type
    // Bug 707850: This should be allowed
    enum E10 {
        A = E9.A,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        B = E9.B
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // Enum with computed member intializer of other types
    enum E11 {
        A = true,
        B = new Date(),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        C = window,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        D = {},
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        E = (() => 'foo')(),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // Enum with string valued member and computed member initializers
    enum E12 {
        A = '',
        B = new Date(),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        C = window,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        D = {},
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        E = 1 + 1,
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        F = (() => 'foo')(),
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // Enum with incorrect syntax
    enum E13 {
        postComma,
        postValueComma = 1,
    
        postSemicolon;
        postColonValueComma: 2,
        postColonValueSemicolon: 3;
    };
    
    enum E14 { a, b: any "hello" += 1, c, d}
    