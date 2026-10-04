//// [tests/cases/compiler/declarationEmitBigInt.ts] ////

//// [a.ts]
export const a = 0n;
export const b = 10n;
export const c = -0n;
export const d = -10n;


//// [a.js]
export const a = 0n;
export const b = 10n;
export const c = -0n;
export const d = -10n;


//// [a.d.ts]
export declare const a = 0n;
export declare const b = 10n;
export declare const c = 0n;
export declare const d = -10n;
