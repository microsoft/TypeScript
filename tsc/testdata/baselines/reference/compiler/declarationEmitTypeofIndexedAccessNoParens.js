//// [tests/cases/compiler/declarationEmitTypeofIndexedAccessNoParens.ts] ////

//// [declarationEmitTypeofIndexedAccessNoParens.ts]
export const C = { A: 1 };
export type C = typeof C[keyof typeof C];

// Parenthesized form should also round-trip
export type C2 = (typeof C)[keyof typeof C];

// IndexedAccessType: index access of a parsed typeof should preserve source
export const arr = [C];
export type ArrAlias = typeof arr[number];

// ArrayType: array of a parsed typeof should preserve source
export type CArr = typeof C[];
// Parenthesized array form should also round-trip
export type CArr2 = (typeof C)[];

// OptionalType (tuple element): optional of a parsed typeof should preserve source
export type CTuple = [typeof C?];
// Parenthesized optional form should also round-trip
export type CTuple2 = [(typeof C)?];





//// [declarationEmitTypeofIndexedAccessNoParens.d.ts]
export declare const C: {
    A: number;
};
export type C = typeof C[keyof typeof C];
export type C2 = (typeof C)[keyof typeof C];
export declare const arr: {
    A: number;
}[];
export type ArrAlias = typeof arr[number];
export type CArr = typeof C[];
export type CArr2 = (typeof C)[];
export type CTuple = [typeof C?];
export type CTuple2 = [(typeof C)?];
