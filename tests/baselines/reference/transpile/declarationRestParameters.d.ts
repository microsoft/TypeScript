//// [v1.ts] ////
export const v1 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
} => {
    return null!
}
//// [v2.ts] ////
const n = Symbol();
export const v2 = (...a: [n: "n", a: "a"]): {
    /** r rest param */
    a: typeof a,
    /** module var */
    n: typeof n,
} => {
    return null!
}
//// [v1.d.ts] ////
export declare const v1: (n: "n", a: "a") => {
    /** r rest param */
    a: [n: "n", a: "a"];
};
//// [v2.d.ts] ////
export declare const v2: (n: "n", a: "a") => {
    /** r rest param */
    a: [n: "n", a: "a"];
    /** module var */
    n: unique symbol;
};


//// [Diagnostics reported]
v2.ts(2,14): error TS2527: The inferred type of 'v2' references an inaccessible 'unique symbol' type. A type annotation is necessary.


==== v2.ts (1 errors) ====
    const n = Symbol();
    export const v2 = (...a: [n: "n", a: "a"]): {
                 ~~
!!! error TS2527: The inferred type of 'v2' references an inaccessible 'unique symbol' type. A type annotation is necessary.
        /** r rest param */
        a: typeof a,
        /** module var */
        n: typeof n,
    } => {
        return null!
    }
