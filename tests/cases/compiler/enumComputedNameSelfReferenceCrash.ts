// @target: es2015
// @declaration: true

// Computed enum member names are not allowed, but a computed name that refers back to a member of
// the same enum must not send the checker into infinite recursion while resolving the enum type.
// https://github.com/microsoft/TypeScript/issues/63173

declare const enum E {
    [object] = 1,
    A,
    object = 10,
}
E.A.toString();

const enum F {
    [F.A] = 1,
    A = 2,
}
F.A.toString();

enum G {
    [G.b] = 1,
    b = 2,
}
G.b;
