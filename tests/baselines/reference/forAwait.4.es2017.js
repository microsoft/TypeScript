//// [forAwait.4.es2017.ts]
declare const i: Iterable<number>;
async function f() {
    for await (const x of i) {
    }
}

//// [forAwait.4.es2017.js]
async function f() {
    for await (const x of i) {
    }
}
