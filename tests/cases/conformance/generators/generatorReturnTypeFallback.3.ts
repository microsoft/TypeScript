// @target: esnext
// @lib: es5,es2015.iterable
// @noemit: true
// @strict: true

// Do not allow generators to fallback to IterableIterator while in strictNullChecks mode if they need a type for the sent value.
function* f() {
    const x: string = yield 1;
}