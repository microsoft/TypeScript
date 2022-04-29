// @target: es2018
// @lib: esnext
// @noEmit: true
declare const asyncIterable: AsyncIterable<number>;
declare const iterable: Iterable<number>;
declare const iterableOfPromise: Iterable<Promise<number>>;
async function f1() {
    let y: number;
    for await (const x of asyncIterable) {
    }
    for await (const x of iterable) {
    }
    for await (const x of iterableOfPromise) {
    }
    for await (y of asyncIterable) {
    }
    for await (y of iterable) {
    }
    for await (y of iterableOfPromise) {
    }
}
async function * f2() {
    let y: number;
    for await (const x of asyncIterable) {
    }
    for await (const x of iterable) {
    }
    for await (const x of iterableOfPromise) {
    }
    for await (y of asyncIterable) {
    }
    for await (y of iterable) {
    }
    for await (y of iterableOfPromise) {
    }
}
