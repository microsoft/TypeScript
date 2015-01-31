// @suppressEnumInlining: true

enum E1 {
    A = 1,
    B = A + 10,
    C = E1.B - 5
}

// regular enums should not be inlined
var x0 = E1.A;
var x1 = E1.B;
var x2 = E1.C;

const enum E2 {
    A = 1,
    B = A + 10,
    C = E2.B - 5
}

// const enums should always be inlined
var y0 = E2.A;
var y1 = E2.B;
var y2 = E2.C;
