// @target: esnext
// @lib: esnext
// @noEmit: true
async function * inferReturnType1() {
}
async function * inferReturnType2() {
    yield;
}
async function * inferReturnType3() {
    yield 1;
}
async function * inferReturnType4() {
    yield* [1, 2];
}
async function * inferReturnType5() {
    yield* (async function * () { yield 1; })();
}
const assignability1: () => AsyncIterableIterator<number> = async function * () {
    yield 1;
};
const assignability2: () => AsyncIterableIterator<number> = async function * () {
    yield* [1, 2];
};
const assignability3: () => AsyncIterableIterator<number> = async function * () {
    yield* (async function * () { yield 1; })();
};
const assignability4: () => AsyncIterable<number> = async function * () {
    yield 1;
};
const assignability5: () => AsyncIterable<number> = async function * () {
    yield* [1, 2];
};
const assignability6: () => AsyncIterable<number> = async function * () {
    yield* (async function * () { yield 1; })();
};
const assignability7: () => AsyncIterator<number> = async function * () {
    yield 1;
};
const assignability8: () => AsyncIterator<number> = async function * () {
    yield* [1, 2];
};
const assignability9: () => AsyncIterator<number> = async function * () {
    yield* (async function * () { yield 1; })();
};
async function * explicitReturnType1(): AsyncIterableIterator<number> {
    yield 1;
}
async function * explicitReturnType2(): AsyncIterableIterator<number> {
    yield* [1, 2];
}
async function * explicitReturnType3(): AsyncIterableIterator<number> {
    yield* (async function * () { yield 1; })();
}
async function * explicitReturnType4(): AsyncIterable<number> {
    yield 1;
}
async function * explicitReturnType5(): AsyncIterable<number> {
    yield* [1, 2];
}
async function * explicitReturnType6(): AsyncIterable<number> {
    yield* (async function * () { yield 1; })();
}
async function * explicitReturnType7(): AsyncIterator<number> {
    yield 1;
}
async function * explicitReturnType8(): AsyncIterator<number> {
    yield* [1, 2];
}
async function * explicitReturnType9(): AsyncIterator<number> {
    yield* (async function * () { yield 1; })();
}
async function * explicitReturnType10(): {} {
    yield 1;
}
async function * awaitedType1() {
    const x = await 1;
}
async function * awaitedType2() {
    const x = await Promise.resolve(1);
}