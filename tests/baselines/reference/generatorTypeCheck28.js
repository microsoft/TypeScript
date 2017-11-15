//// [generatorTypeCheck28.ts]
function* g(): Iterator<(x: string) => number> {
    yield * {
        *[Symbol.iterator]() {
            yield x => x.length;
        }
    };
}

//// [generatorTypeCheck28.js]
function* g() {
    yield* {
        *[Symbol.iterator]() {
            yield x => x.length;
        }
    };
}
