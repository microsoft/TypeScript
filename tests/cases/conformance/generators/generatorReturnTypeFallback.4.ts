// @target: esnext
// @lib: es5,es2015.iterable
// @noemit: true
// @strict: false

// Allow generators to fallback to IterableIterator if they are not in strictNullChecks mode
// NOTE: In non-strictNullChecks mode, `undefined` (the default sent value) is assignable to everything.
function* f() {
    const x: string = yield 1;
}