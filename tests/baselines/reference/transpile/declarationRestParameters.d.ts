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


//// [Diagnostics reported]
v1.ts(3,15): error TS9039: Type containing private name 'a' can't be used with --isolatedDeclarations.


==== v1.ts (1 errors) ====
    export const v1 = (...a: [n: "n", a: "a"]): {
        /** r rest param */
        a: typeof a,
                  ~
!!! error TS9039: Type containing private name 'a' can't be used with --isolatedDeclarations.
!!! related TS9027 v1.ts:1:14: Add a type annotation to the variable v1.
    } => {
        return null!
    }
    
//// [v2.d.ts] ////
export declare const v2: (n: "n", a: "a") => {
    /** r rest param */
    a: [n: "n", a: "a"];
    /** module var */
    n: unique symbol;
};


//// [Diagnostics reported]
v2.ts(2,14): error TS2527: The inferred type of 'v2' references an inaccessible 'unique symbol' type. A type annotation is necessary.
v2.ts(4,15): error TS9039: Type containing private name 'a' can't be used with --isolatedDeclarations.
v2.ts(6,5): error TS9013: Expression type can't be inferred with --isolatedDeclarations.
v2.ts(6,15): error TS9039: Type containing private name 'n' can't be used with --isolatedDeclarations.


==== v2.ts (4 errors) ====
    const n = Symbol();
    export const v2 = (...a: [n: "n", a: "a"]): {
                 ~~
!!! error TS2527: The inferred type of 'v2' references an inaccessible 'unique symbol' type. A type annotation is necessary.
        /** r rest param */
        a: typeof a,
                  ~
!!! error TS9039: Type containing private name 'a' can't be used with --isolatedDeclarations.
!!! related TS9027 v2.ts:2:14: Add a type annotation to the variable v2.
        /** module var */
        n: typeof n,
        ~
!!! error TS9013: Expression type can't be inferred with --isolatedDeclarations.
!!! related TS9027 v2.ts:2:14: Add a type annotation to the variable v2.
!!! related TS9035 v2.ts:6:5: Add satisfies and a type assertion to this expression (satisfies T as T) to make the type explicit.
                  ~
!!! error TS9039: Type containing private name 'n' can't be used with --isolatedDeclarations.
!!! related TS9027 v2.ts:2:14: Add a type annotation to the variable v2.
    } => {
        return null!
    }
