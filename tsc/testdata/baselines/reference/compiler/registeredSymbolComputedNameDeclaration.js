//// [tests/cases/compiler/registeredSymbolComputedNameDeclaration.ts] ////

//// [registeredSymbolComputedNameDeclaration.ts]
export const key = Symbol.for("abc");
export function getKey(): typeof key { return key; }

export const value = {
    ordinary: 1,
    [getKey()]: "text",
    [Symbol.for("other")]: true,
};

export const readonlyValue = { [getKey()]: "fixed" } as const;


//// [registeredSymbolComputedNameDeclaration.js]
export const key = Symbol.for("abc");
export function getKey() { return key; }
export const value = {
    ordinary: 1,
    [getKey()]: "text",
    [Symbol.for("other")]: true,
};
export const readonlyValue = { [getKey()]: "fixed" };


//// [registeredSymbolComputedNameDeclaration.d.ts]
export declare const key: RegisteredSymbol<"abc">;
export declare function getKey(): typeof key;
export declare const value: {
    ordinary: number;
} & {
    [K in RegisteredSymbol<"abc">]: string;
} & {
    [K in RegisteredSymbol<"other">]: boolean;
};
export declare const readonlyValue: {
    readonly [K in RegisteredSymbol<"abc">]: "fixed";
};
