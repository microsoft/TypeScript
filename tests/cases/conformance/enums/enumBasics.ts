// Enum without initializers have first member = 0 and successive members = N + 1
enum E1 {
    A,
    B,
    C
}

// Enum type is a subtype of Number
var x: number = E1.A;

// Enum object type is anonymous with properties of the enum type and numeric indexer
var e = E1;
var e: {
    readonly A: E1.A;
    readonly B: E1.B;
    readonly C: E1.C;
    readonly [n: number]: string;
};
var e: typeof E1;

// Reverse mapping of enum returns string name of property 
var s = E1[e.A];
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
var doNotPropagate = [
    E8.B, E7.A, E4.Z, E3.X, E3.Y, E3.Z
];
// Enum computed members are not propagated
var doPropagate = [
    E9.A, E9.B, E6.B, E6.C, E6.A, E5.A, E5.B, E5.C
];

