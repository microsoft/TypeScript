//// [generatorTypeCheck10.ts]
function* g(): IterableIterator<any> {
    yield;
    return;
}

//// [generatorTypeCheck10.js]
function* g() {
    yield;
    return;
}
