// @target: es5
// @lib: es2017
declare const i: Iterable<number>;
async function* f() {
    for await (const x of i) {
    }
}