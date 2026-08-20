// @target: esnext
// @lib: es5,es2015.iterable
// @noemit: true
// @strict: true

// Allow generators to fallback to IterableIterator if they do not need a type for the sent value while in strictNullChecks mode.
function* f(): IterableIterator<number> {
    yield 1;
}