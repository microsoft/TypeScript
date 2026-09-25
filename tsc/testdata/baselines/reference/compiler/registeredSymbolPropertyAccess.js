//// [tests/cases/compiler/registeredSymbolPropertyAccess.ts] ////

//// [registeredSymbolPropertyAccess.ts]
export const single = Symbol.for("single");
export const twin1 = Symbol.for("twin");
export const twin2 = Symbol.for("twin");
export const unique1 = Symbol("unique");
export const unique2 = Symbol("unique");
export const wellKnown = Symbol.match;
export const wellKnown2 = Symbol.toStringTag;

export const record1 = {
    [single]: "single",
    [twin2]: "twin",
    [unique1]: "unique1",
    [unique2]: "unique2",
} as const;
export let singleVal: string = record1[single] satisfies "single";
export let twin1Val: string = record1[twin1] satisfies "twin";
export let twin2Val: string = record1[twin2] satisfies "twin";
export let unique1Val: string = record1[unique1] satisfies "unique1";
export let unique2Val: string = record1[unique2] satisfies "unique2";

export const record2 = {
    ...record1,
    [unique1]: "unique1New",
    [wellKnown]: "wellKnown",
} as const;
singleVal = record2[single] satisfies "single";
twin1Val = record2[twin1] satisfies "twin";
twin2Val = record2[twin2] satisfies "twin";
unique1Val = record2[unique1] satisfies "unique1New";
unique2Val = record2[unique2] satisfies "unique2";
export let wellKnownVal: string = record2[wellKnown] satisfies "wellKnown";

export const record3 = {
    [single]: "single",
    [twin2]: "twin",
    [unique1]: "unique1",
    [unique2]: "unique2",
    [wellKnown]: "wellKnown",
} as const;
singleVal = record3[single] satisfies "single";
twin1Val = record3[twin1] satisfies "twin";
twin2Val = record3[twin2] satisfies "twin";
unique1Val = record3[unique1] satisfies "unique1";
unique2Val = record3[unique2] satisfies "unique2";
wellKnownVal = record3[wellKnown] satisfies "wellKnown";

export const record4 = {
    [wellKnown2]: "wellKnown2",
} as const;
export let wellKnown2Val: string = record4[wellKnown2] satisfies "wellKnown2";




//// [registeredSymbolPropertyAccess.d.ts]
export declare const single: RegisteredSymbol<"single">;
export declare const twin1: RegisteredSymbol<"twin">;
export declare const twin2: RegisteredSymbol<"twin">;
export declare const unique1: unique symbol;
export declare const unique2: unique symbol;
export declare const wellKnown: typeof Symbol.match;
export declare const wellKnown2: typeof Symbol.toStringTag;
export declare const record1: {
    readonly [single]: "single";
    readonly [twin2]: "twin";
    readonly [unique1]: "unique1";
    readonly [unique2]: "unique2";
};
export declare let singleVal: string;
export declare let twin1Val: string;
export declare let twin2Val: string;
export declare let unique1Val: string;
export declare let unique2Val: string;
export declare const record2: {
    readonly [single]: "single";
    readonly [twin2]: "twin";
    readonly [unique2]: "unique2";
    readonly [unique1]: "unique1New";
    readonly [Symbol.match]: "wellKnown";
};
export declare let wellKnownVal: string;
export declare const record3: {
    readonly [single]: "single";
    readonly [twin2]: "twin";
    readonly [unique1]: "unique1";
    readonly [unique2]: "unique2";
    readonly [Symbol.match]: "wellKnown";
};
export declare const record4: {
    readonly [Symbol.toStringTag]: "wellKnown2";
};
export declare let wellKnown2Val: string;
