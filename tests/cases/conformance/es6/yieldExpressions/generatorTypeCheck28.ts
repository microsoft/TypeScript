//@target: ES6
function* g(): Iterator<(x: string) => number> {
    yield * {
        *[Symbol.iterator]() {
            yield x => x.length;
        }
    };
}