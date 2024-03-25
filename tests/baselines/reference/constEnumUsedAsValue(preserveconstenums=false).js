//// [tests/cases/compiler/constEnumUsedAsValue.ts] ////

//// [constEnumUsedAsValue.ts]
const enum E {
    A,
    B,
    C,
}

declare const x: E;

E;
E[x];

//// [constEnumUsedAsValue.js]
"use strict";
E;
E[x];
