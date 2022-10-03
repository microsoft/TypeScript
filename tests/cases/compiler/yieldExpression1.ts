// @target: es6
// @strictNullChecks: true

function* a() {
    yield;
    yield 0;
}

function* b(): IterableIterator<number> {
    yield;
    yield 0;
}
