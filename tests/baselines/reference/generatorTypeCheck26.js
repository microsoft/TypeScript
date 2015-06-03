//// [generatorTypeCheck26.ts]
function* g(): IterableIterator<(x: string) => number> {
    yield x => x.length;
    yield *[x => x.length];
    return x => x.length;
}

//// [generatorTypeCheck26.js]
function* g() {
    yield x => x.length;
    yield* [x => x.length];
    return x => x.length;
}
