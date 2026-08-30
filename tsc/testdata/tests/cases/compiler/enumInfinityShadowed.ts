// @target: es2015
// @strict: true

// Fixes https://github.com/microsoft/TypeScript/issues/55091
// Enum values that evaluate to Infinity, -Infinity, or NaN must not emit
// bare Infinity/NaN identifiers, because those can be shadowed by local
// variables. Instead, emit 1/0, -(1/0), and 0/0 respectively.

enum A {
    X = 1 / 0,
    Y = -1 / 0,
    Z = 0 / 0,
}

const enum B {
    X = 1 / 0,
    Y = -1 / 0,
    Z = 0 / 0,
}

{
    let Infinity = 3;
    let NaN = 42;
    console.log(A.X, A.Y, A.Z);
    console.log(B.X, B.Y, B.Z);
}
