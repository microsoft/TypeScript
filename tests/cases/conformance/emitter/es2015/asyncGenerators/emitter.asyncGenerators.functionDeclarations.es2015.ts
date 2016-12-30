// @target: es2015
// @lib: esnext
// @filename: F1.ts
async function * f1() {
}
// @filename: F2.ts
async function * f2() {
    const x = yield;
}
// @filename: F3.ts
async function * f3() {
    const x = yield 1;
}
// @filename: F4.ts
async function * f4() {
    const x = yield* [1];
}
// @filename: F5.ts
async function * f5() {
    const x = yield* (async function*() { yield 1; })();
}
// @filename: F6.ts
async function * f6() {
    const x = await 1;
}
// @filename: F7.ts
async function * f7() {
    return 1;
}
