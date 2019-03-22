//// [forAwaitForUnion.ts]
async function f<T>(source: Iterable<T> | AsyncIterable<T>) {
    for await (const x of source) {
    }
}


//// [forAwaitForUnion.js]
async function f(source) {
    for await (const x of source) {
    }
}
