// @target: esnext
// @lib: es5,es2015.iterable
// @noemit: true
// @strict: false

// Do not allow generators to fallback to IterableIterator if they need a type for the sent value while not in strictNullChecks mode.
function* f() {
    const x: string = yield 1;
}