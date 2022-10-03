//// [tests/cases/conformance/emitter/es2018/asyncGenerators/emitter.asyncGenerators.functionExpressions.es2018.ts] ////

//// [F1.ts]
const f1 = async function * () {
}
//// [F2.ts]
const f2 = async function * () {
    const x = yield;
}
//// [F3.ts]
const f3 = async function * () {
    const x = yield 1;
}
//// [F4.ts]
const f4 = async function * () {
    const x = yield* [1];
}
//// [F5.ts]
const f5 = async function * () {
    const x = yield* (async function*() { yield 1; })();
}
//// [F6.ts]
const f6 = async function * () {
    const x = await 1;
}
//// [F7.ts]
const f7 = async function * () {
    return 1;
}


//// [F1.js]
const f1 = async function* () {
};
//// [F2.js]
const f2 = async function* () {
    const x = yield;
};
//// [F3.js]
const f3 = async function* () {
    const x = yield 1;
};
//// [F4.js]
const f4 = async function* () {
    const x = yield* [1];
};
//// [F5.js]
const f5 = async function* () {
    const x = yield* (async function* () { yield 1; })();
};
//// [F6.js]
const f6 = async function* () {
    const x = await 1;
};
//// [F7.js]
const f7 = async function* () {
    return 1;
};
