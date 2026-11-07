//// [tests/cases/compiler/declarationEmitNonFiniteNumberLiteral.ts] ////

//// [declarationEmitNonFiniteNumberLiteral.ts]
// Numeric literals that overflow to Infinity have number literal types, but Infinity has no literal
// syntax: `declare const a = Infinity;` is an error in a .d.ts (TS1254), so these get type annotations.

export const a = 1e400;
export const b = -1e400;
export const c = 1.7976931348623159e308;
export const d = 1e308;

export class C {
    static readonly e = 1e400;
    readonly f = -2e308;
}

// References to enum members are valid initializers whatever their value.
export enum E {
    A = NaN,
    B = Infinity,
}
export const g = E.A;
export const h = E.B;

export default 1e400;




//// [declarationEmitNonFiniteNumberLiteral.d.ts]
export declare const a: number;
export declare const b: number;
export declare const c: number;
export declare const d = 1e+308;
export declare class C {
    static readonly e: number;
    readonly f: number;
}
export declare enum E {
    A = NaN,
    B = Infinity
}
export declare const g = E.A;
export declare const h = E.B;
declare const _default: number;
export default _default;
