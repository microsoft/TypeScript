//@target: ES6
function* g(): Iterator<(x: string) => number> {
    yield x => x.length;
    yield *[x => x.length];
    return x => x.length;
}