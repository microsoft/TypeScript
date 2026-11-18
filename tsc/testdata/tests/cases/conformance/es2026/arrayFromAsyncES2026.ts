// @target: esnext
// @lib: es2025,es2026.array
// @noEmit: true
// @strict: true

const resolvedValues: Promise<number[]> = Array.fromAsync([
    Promise.resolve(1),
    Promise.resolve(2),
]);

const mapped: Promise<string[]> = Array.fromAsync([1, 2], async value => value.toString());
