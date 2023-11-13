//// [tests/cases/conformance/enums/enumClassification.ts] ////

//// [enumClassification.ts]
// An enum type where each member has no initializer or an initializer that specififes
// a numeric literal, a string literal, or a single identifier naming another member in
// the enum type is classified as a literal enum type. An enum type that doesn't adhere
// to this pattern is classified as a numeric enum type.

// Examples of literal enum types

enum E01 {
    A
}

enum E02 {
    A = 123
}

enum E03 {
    A = "hello"
}

enum E04 {
    A,
    B,
    C
}

enum E05 {
    A,
    B = 10,
    C
}

enum E06 {
    A = "one",
    B = "two",
    C = "three"
}

enum E07 {
    A,
    B,
    C = "hi",
    D = 10,
    E,
    F = "bye"
}

enum E08 {
    A = 10,
    B = "hello",
    C = A,
    D = B,
    E = C,
}

// Examples of numeric enum types with only constant members

enum E10 {}

enum E11 {
    A = +0,
    B,
    C
}

enum E12 {
    A = 1 << 0,
    B = 1 << 1,
    C = 1 << 2
}

// Examples of numeric enum types with constant and computed members

enum E20 {
    A = "foo".length,
    B = A + 1,
    C = +"123",
    D = Math.sin(1)
}


/// [Declarations] ////



//// [enumClassification.d.ts]
declare enum E01 {
    A = 0
}
declare enum E02 {
    A = 123
}
declare enum E03 {
    A = "hello"
}
declare enum E04 {
    A = 0,
    B = 1,
    C = 2
}
declare enum E05 {
    A = 0,
    B = 10,
    C = 11
}
declare enum E06 {
    A = "one",
    B = "two",
    C = "three"
}
declare enum E07 {
    A = 0,
    B = 1,
    C = "hi",
    D = 10,
    E = 11,
    F = "bye"
}
declare enum E08 {
    A = 10,
    B = "hello",
    C = 10,
    D = "hello",
    E = 10
}
declare enum E10 {
}
declare enum E11 {
    A = 0,
    B = 1,
    C = 2
}
declare enum E12 {
    A = 1,
    B = 2,
    C = 4
}
declare enum E20 {
    A,
    B,
    C,
    D
}
