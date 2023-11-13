//// [tests/cases/conformance/enums/enumBasics.ts] ////

//// [enumBasics.ts]
// Enum without initializers have first member = 0 and successive members = N + 1
enum E1 {
    A,
    B,
    C
}

// Enum type is a subtype of Number
var x: number = E1.A;

// Enum object type is anonymous with properties of the enum type and numeric indexer
var e: typeof E1 = E1;
var e: {
    readonly A: E1.A;
    readonly B: E1.B;
    readonly C: E1.C;
    readonly [n: number]: string;
};
var e: typeof E1;

// Reverse mapping of enum returns string name of property 
var s: string = E1[e.A];
var s: string;


// Enum with only constant members
enum E2 {
    A = 1, B = 2, C = 3
}

// Enum with only computed members
enum E3 {
    X = 'foo'.length, Y = 4 + 3, Z = +'foo'
}

// Enum with constant members followed by computed members
enum E4 {
    X = 0, Y, Z = 'foo'.length
}

// Enum with > 2 constant members with no initializer for first member, non zero initializer for second element
enum E5 {
    A,
    B = 3,
    C // 4
}

enum E6 {
    A,
    B = 0,
    C // 1
}

// Enum with computed member initializer of type 'any'
enum E7 {
    A = 'foo'['foo']
}

// Enum with computed member initializer of type number
enum E8 {
    B = 'foo'['foo']
}

//Enum with computed member intializer of same enum type
enum E9 {
    A,
    B = A
}

// (refer to .js to validate)
// Enum constant members are propagated
var doNotPropagate: (E8 | E7 | E4 | E3)[] = [
    E8.B, E7.A, E4.Z, E3.X, E3.Y, E3.Z
];
// Enum computed members are not propagated
var doPropagate: (E9 | E6 | E5)[] = [
    E9.A, E9.B, E6.B, E6.C, E6.A, E5.A, E5.B, E5.C
];



/// [Declarations] ////



//// [enumBasics.d.ts]
declare enum E1 {
    A = 0,
    B = 1,
    C = 2
}
declare var x: number;
declare var e: typeof E1;
declare var e: {
    readonly A: E1.A;
    readonly B: E1.B;
    readonly C: E1.C;
    readonly [n: number]: string;
};
declare var e: typeof E1;
declare var s: string;
declare var s: string;
declare enum E2 {
    A = 1,
    B = 2,
    C = 3
}
declare enum E3 {
    X,
    Y = 7,
    Z
}
declare enum E4 {
    X = 0,
    Y = 1,
    Z
}
declare enum E5 {
    A = 0,
    B = 3,
    C = 4
}
declare enum E6 {
    A = 0,
    B = 0,
    C = 1
}
declare enum E7 {
    A
}
declare enum E8 {
    B
}
declare enum E9 {
    A = 0,
    B = 0
}
declare var doNotPropagate: (E8 | E7 | E4 | E3)[];
declare var doPropagate: (E9 | E6 | E5)[];
/// [Errors] ////

enumBasics.ts(33,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics.ts(33,23): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics.ts(33,34): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics.ts(38,15): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics.ts(56,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics.ts(61,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics.ts(67,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumBasics.ts (7 errors) ====
    // Enum without initializers have first member = 0 and successive members = N + 1
    enum E1 {
        A,
        B,
        C
    }
    
    // Enum type is a subtype of Number
    var x: number = E1.A;
    
    // Enum object type is anonymous with properties of the enum type and numeric indexer
    var e: typeof E1 = E1;
    var e: {
        readonly A: E1.A;
        readonly B: E1.B;
        readonly C: E1.C;
        readonly [n: number]: string;
    };
    var e: typeof E1;
    
    // Reverse mapping of enum returns string name of property 
    var s: string = E1[e.A];
    var s: string;
    
    
    // Enum with only constant members
    enum E2 {
        A = 1, B = 2, C = 3
    }
    
    // Enum with only computed members
    enum E3 {
        X = 'foo'.length, Y = 4 + 3, Z = +'foo'
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                          ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                                     ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // Enum with constant members followed by computed members
    enum E4 {
        X = 0, Y, Z = 'foo'.length
                  ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // Enum with > 2 constant members with no initializer for first member, non zero initializer for second element
    enum E5 {
        A,
        B = 3,
        C // 4
    }
    
    enum E6 {
        A,
        B = 0,
        C // 1
    }
    
    // Enum with computed member initializer of type 'any'
    enum E7 {
        A = 'foo'['foo']
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // Enum with computed member initializer of type number
    enum E8 {
        B = 'foo'['foo']
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    //Enum with computed member intializer of same enum type
    enum E9 {
        A,
        B = A
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    // (refer to .js to validate)
    // Enum constant members are propagated
    var doNotPropagate: (E8 | E7 | E4 | E3)[] = [
        E8.B, E7.A, E4.Z, E3.X, E3.Y, E3.Z
    ];
    // Enum computed members are not propagated
    var doPropagate: (E9 | E6 | E5)[] = [
        E9.A, E9.B, E6.B, E6.C, E6.A, E5.A, E5.B, E5.C
    ];
    
    