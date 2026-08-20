// @strict: true

// Unqualified enum member references across merged enum declarations
enum E {
    A = 0,
    B = 1,
}

enum E {
    C = A,
    D = B + 1,
}
