// @lib: es2026
// @strict: true
// @strictNullChecks: false
// @noEmit: true

const withNull = Object.assign([Promise.resolve(1)], { [Symbol.asyncIterator]: null });
const withUndefined = Object.assign([Promise.resolve(1)], { [Symbol.asyncIterator]: undefined });
const fromNull: Promise<string[]> = Array.fromAsync(withNull, value => value.toFixed());
const fromUndefined: Promise<string[]> = Array.fromAsync(withUndefined, value => value.toFixed());

declare const dual: AsyncIterable<Promise<number>> & Iterable<number>;
const fromDual: Promise<number[]> = Array.fromAsync(dual, value => value);
Array.fromAsync(dual, value => value.toFixed());
