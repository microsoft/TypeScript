//// [tests/cases/compiler/declarationEmitTypeofRest.ts] ////

//// [v1.ts]
export const v1 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
} => {
    return null!
}

//// [v2.ts]
const n = Symbol();
export const v2 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
    /** module var */
    n: typeof n,
} => {
    return null!
}

//// [v1.js]
export const v1 = (...a) => {
    return null;
};
//// [v2.js]
const n = Symbol();
export const v2 = (...a) => {
    return null;
};


//// [v1.d.ts]
export declare const v1: (...a: [n: "n", a: "a"]) => {
    /** r rest param */
    a: typeof a;
};
//// [v2.d.ts]
declare const n: unique symbol;
export declare const v2: (...a: [n: "n", a: "a"]) => {
    /** r rest param */
    a: typeof a;
    /** module var */
    n: typeof n;
};
export {};
