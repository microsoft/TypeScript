//// [tests/cases/compiler/declarationEmitNegativeNumericConstLiterals.ts] ////

//// [declarationEmitNegativeNumericConstLiterals.ts]
declare function id<const T>(value: T): T;

export const a = -1e500 as const;
export const b = -123456789012345678901234567890 as const;
export const c = ((-1e500)) as const;
export const d = { value: -1e500 } as const;
export const e = [-1e500] as const;
export const f = id(-1e500);
export const g = -1e500;
export const h = 1e500;
export const i = { [-1e500]: 1 } as const;


//// [declarationEmitNegativeNumericConstLiterals.js]
export const a = -1e500;
export const b = -123456789012345678901234567890;
export const c = ((-1e500));
export const d = { value: -1e500 };
export const e = [-1e500];
export const f = id(-1e500);
export const g = -1e500;
export const h = 1e500;
export const i = { [-1e500]: 1 };


//// [declarationEmitNegativeNumericConstLiterals.d.ts]
export declare const a: -1e500;
export declare const b: -123456789012345678901234567890;
export declare const c: -1e500;
export declare const d: {
    readonly value: -1e999;
};
export declare const e: readonly [-1e999];
export declare const f: -1e999;
export declare const g = -1e999;
export declare const h = 1e999;
export declare const i: {
    readonly [-1e500]: 1;
};
