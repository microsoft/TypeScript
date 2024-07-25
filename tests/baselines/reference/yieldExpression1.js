//// [tests/cases/compiler/yieldExpression1.ts] ////

//// [yieldExpression1.ts]
function* a() {
    yield;
    yield 0;
}

function* b(): IterableIterator<number> {
    yield;
    yield 0;
}


//// [yieldExpression1.js]
function* a() {
    yield;
    yield 0;
}
function* b() {
    yield;
    yield 0;
}
