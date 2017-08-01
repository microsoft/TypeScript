// @declaration: true

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
