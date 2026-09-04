// @target: esnext
// @lib: es2025,es2026.iterator
// @noEmit: true
// @strict: true

const concatenated: IteratorObject<number | string, undefined, unknown> = Iterator.concat(
    [1, 2],
    new Set(["a", "b"]),
);

const empty: IteratorObject<never, undefined, unknown> = Iterator.concat();

// Iterator.concat requires iterable objects; unlike Iterator.from, it does not accept string primitives.
Iterator.concat("abc");
