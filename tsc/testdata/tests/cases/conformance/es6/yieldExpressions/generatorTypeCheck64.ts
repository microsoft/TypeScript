// @strict: true
// @target: esnext
// @noEmit: true

function* g3(): Generator<Generator<(x: string) => number>> {
    yield function* () {
        yield x => x.length;
    } ()
}

function* g4(): Iterator<Iterable<(x: string) => number>> {
  yield (function* () {
    yield (x) => x.length;
  })();
}
