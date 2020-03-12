// @target: es2018
// @lib: esnext
async function f<T>(source: Iterable<T> | AsyncIterable<T>) {
    for await (const x of source) {
    }
}
