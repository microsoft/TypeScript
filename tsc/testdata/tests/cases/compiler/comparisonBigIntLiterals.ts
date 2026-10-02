// @target: esnext
// @strict: true
// @declaration: true

export const descending = [100000000000000000000n, 100n, 10n, 2n, 1n, 0n, -1n, -2n, -10n, -100n, -100000000000000000000n] as const;
export const ascending = [-100000000000000000000n, -100n, -10n, -2n, -1n, 0n, 1n, 2n, 10n, 100n, 100000000000000000000n] as const;
export const values = [...descending, ...ascending];
