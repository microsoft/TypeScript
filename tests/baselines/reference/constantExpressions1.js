//// [tests/cases/compiler/constantExpressions1.ts] ////

//// [constantExpressions1.ts]
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


//// [constantExpressions1.js]
"use strict";
var C00 = "a";
var C01 = "b";
var C02 = "c";
var C10 = 1;
var C11 = 2;
var C12 = 3;
var C1 = "x";
var C2 = "x";


//// [constantExpressions1.d.ts]
declare const C00 = "a";
declare const C01: "b";
declare const C02: "c";
declare const C03: "d";
declare const enum E0 {
    A = "a",
    B = "b",
    C = "c",
    D = "d"
}
declare const C10 = 1;
declare const C11: 2;
declare const C12: 3;
declare const C13: 4;
declare const enum E1 {
    A = 1,
    B = 2,
    C = 3,
    D = 4
}
declare const C1: string;
declare const C2: "x" | "y";
declare const enum EE {
    A,// Error
    B
}
