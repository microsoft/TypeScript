// @target: es2018
// @lib: esnext
// @noEmit: true
declare const asyncIterable: AsyncIterable<number>;
declare const iterable: Iterable<number>;
async function f() {
    let y: number;
    let z: string;
    for await (const x of {}) {
    }
    for await (y of {}) {
    }
    for await (z of asyncIterable) {
    }
    for await (z of iterable) {
    }
    for (const x of asyncIterable) {
    }
    for (y of asyncIterable) {
    }
}
