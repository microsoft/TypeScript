//// [forAwait.8.es2017.ts]
declare const i: Iterable<number>;
function* f() {
    for await (const x of i) {
    }
}

//// [forAwait.8.es2017.js]
function* f() {
    for await (const x of i) {
    }
}
