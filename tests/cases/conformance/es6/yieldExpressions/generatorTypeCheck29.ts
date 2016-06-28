//@target: ES6
function* g2(): Iterator<Iterable<(x: string) => number>> {
    yield function* () {
        yield x => x.length;
    } ()
}