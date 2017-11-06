//// [generatorTypeCheck13.ts]
function* g(): Iterator<number> {
    yield 0;
    return "";
}

//// [generatorTypeCheck13.js]
function* g() {
    yield 0;
    return "";
}
