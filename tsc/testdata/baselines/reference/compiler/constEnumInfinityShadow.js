//// [tests/cases/compiler/constEnumInfinityShadow.ts] ////

//// [constEnumInfinityShadow.ts]
const Infinity = 0;

const enum E {
    value = 1e999,
}

export const value = E.value;


//// [constEnumInfinityShadow.js]
const Infinity = 0;
export const value = Infinity /* E.value */;


//// [constEnumInfinityShadow.d.ts]
declare const enum E {
    value = Infinity
}
export declare const value = E.value;
export {};
