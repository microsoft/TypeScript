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
export declare const v1: (...a: [n: "n", a: "a"]) => {
    /** r rest param */
    a: typeof a;
};
//// [v2.d.ts] ////
declare const n: unique symbol;
export declare const v2: (...a: [n: "n", a: "a"]) => {
    /** r rest param */
    a: typeof a;
    /** module var */
    n: typeof n;
};
export {};


//// [Diagnostics reported]
v2.ts(1,7): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== v2.ts (1 errors) ====
    const n = Symbol();
          ~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 v2.ts:1:7: Add a type annotation to the variable n.
    export const v2 = (...a: [n: "n", a: "a"]): {
        /** r rest param */
        a: typeof a,
        /** module var */
        n: typeof n,
    } => {
        return null!
    }
