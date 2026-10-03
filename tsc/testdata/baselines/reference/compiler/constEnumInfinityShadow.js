//// [tests/cases/compiler/constEnumInfinityShadow.ts] ////

//// [constEnumInfinityShadow.ts]
const Infinity = 0;

const enum E {
    value = 1e999,
}

export const value = E.value;


//// [constEnumInfinityShadow.js]
const Infinity = 0;
export const value = 1e999 /* E.value */;


//// [constEnumInfinityShadow.d.ts]
declare const enum E {
    value = 1e999
}
export declare const value = E.value;
export {};
