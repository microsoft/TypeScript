// @target: esnext
// @lib: esnext
// @noemit: true
// @strict: true

// Basic usage with array
const sum1 = Math.sumPrecise([1, 2, 3]);

// Floating point precision
const sum2 = Math.sumPrecise([1e20, 0.1, -1e20]);

// Empty iterable returns -0
const sum3 = Math.sumPrecise([]);

// Works with any Iterable<number>
const sum4 = Math.sumPrecise(new Set([1, 2, 3]));

function* gen(): Iterable<number> {
    yield 0.1;
    yield 0.2;
}
const sum5 = Math.sumPrecise(gen());

// Return type is number
const result: number = Math.sumPrecise([1, 2, 3]);

// @ts-expect-error - BigInt is not a number
Math.sumPrecise([1n, 2n]);

// @ts-expect-error - string is not a number
Math.sumPrecise(["a", "b"]);
