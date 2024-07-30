// @strict: true
// @declaration: true

const C00 = "a";
const C01 = "b" as const;
const C02: "c" = "c";
declare const C03: "d";

const enum E0 {
    A = C00,
    B = C01,
    C = C02,
    D = C03,
}

const C10 = 1;
const C11 = 2 as const;
const C12: 3 = 3;
declare const C13: 4;

const enum E1 {
    A = C10,
    B = C11,
    C = C12,
    D = C13,
}

const C1: string = "x";
const C2: "x" | "y" = "x";

const enum EE {
    A = C1,  // Error
    B = C2,  // Error
}
