//// [tests/cases/compiler/comparisonBigIntLiterals.ts] ////

//// [comparisonBigIntLiterals.ts]
export const descending = [100000000000000000000n, 100n, 10n, 2n, 1n, 0n, -1n, -2n, -10n, -100n, -100000000000000000000n] as const;
export const ascending = [-100000000000000000000n, -100n, -10n, -2n, -1n, 0n, 1n, 2n, 10n, 100n, 100000000000000000000n] as const;
export const values = [...descending, ...ascending];


//// [comparisonBigIntLiterals.js]
export const descending = [100000000000000000000n, 100n, 10n, 2n, 1n, 0n, -1n, -2n, -10n, -100n, -100000000000000000000n];
export const ascending = [-100000000000000000000n, -100n, -10n, -2n, -1n, 0n, 1n, 2n, 10n, 100n, 100000000000000000000n];
export const values = [...descending, ...ascending];


//// [comparisonBigIntLiterals.d.ts]
export declare const descending: readonly [100000000000000000000n, 100n, 10n, 2n, 1n, 0n, -1n, -2n, -10n, -100n, -100000000000000000000n];
export declare const ascending: readonly [-100000000000000000000n, -100n, -10n, -2n, -1n, 0n, 1n, 2n, 10n, 100n, 100000000000000000000n];
export declare const values: (-100000000000000000000n | -100n | -10n | -2n | -1n | 0n | 1n | 2n | 10n | 100n | 100000000000000000000n)[];
