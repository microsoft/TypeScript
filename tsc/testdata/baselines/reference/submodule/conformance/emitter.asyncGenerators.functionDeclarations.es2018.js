//// [tests/cases/conformance/emitter/es2018/asyncGenerators/emitter.asyncGenerators.functionDeclarations.es2018.ts] ////

//// [F1.ts]
async function * f1() {
}
//// [F2.ts]
async function * f2() {
    const x = yield;
}
//// [F3.ts]
async function * f3() {
    const x = yield 1;
}
//// [F4.ts]
async function * f4() {
    const x = yield* [1];
}
//// [F5.ts]
async function * f5() {
    const x = yield* (async function*() { yield 1; })();
}
//// [F6.ts]
async function * f6() {
    const x = await 1;
}
//// [F7.ts]
async function * f7() {
    return 1;
}


//// [F1.js]
async function* f1() {
}
//// [F2.js]
async function* f2() {
    const x = yield;
}
//// [F3.js]
async function* f3() {
    const x = yield 1;
}
//// [F4.js]
async function* f4() {
    const x = yield* [1];
}
//// [F5.js]
async function* f5() {
    const x = yield* (async function* () { yield 1; })();
}
//// [F6.js]
async function* f6() {
    const x = await 1;
}
//// [F7.js]
async function* f7() {
    return 1;
}
