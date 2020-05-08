// @target: es2018
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
    yield Promise.resolve(1);
}
async function * inferReturnType5() {
    yield 1;
    yield Promise.resolve(2);
}
async function * inferReturnType6() {
    yield* [1, 2];
}
async function * inferReturnType7() {
    yield* [Promise.resolve(1)];
}
async function * inferReturnType8() {
    yield* (async function * () { yield 1; })();
}
const assignability1: () => AsyncIterableIterator<number> = async function * () {
    yield 1;
};
const assignability2: () => AsyncIterableIterator<number> = async function * () {
    yield Promise.resolve(1);
};
const assignability3: () => AsyncIterableIterator<number> = async function * () {
    yield* [1, 2];
};
const assignability4: () => AsyncIterableIterator<number> = async function * () {
    yield* [Promise.resolve(1)];
};
const assignability5: () => AsyncIterableIterator<number> = async function * () {
    yield* (async function * () { yield 1; })();
};
const assignability6: () => AsyncIterable<number> = async function * () {
    yield 1;
};
const assignability7: () => AsyncIterable<number> = async function * () {
    yield Promise.resolve(1);
};
const assignability8: () => AsyncIterable<number> = async function * () {
    yield* [1, 2];
};
const assignability9: () => AsyncIterable<number> = async function * () {
    yield* [Promise.resolve(1)];
};
const assignability10: () => AsyncIterable<number> = async function * () {
    yield* (async function * () { yield 1; })();
};
const assignability11: () => AsyncIterator<number> = async function * () {
    yield 1;
};
const assignability12: () => AsyncIterator<number> = async function * () {
    yield Promise.resolve(1);
};
const assignability13: () => AsyncIterator<number> = async function * () {
    yield* [1, 2];
};
const assignability14: () => AsyncIterator<number> = async function * () {
    yield* [Promise.resolve(1)];
};
const assignability15: () => AsyncIterator<number> = async function * () {
    yield* (async function * () { yield 1; })();
};
async function * explicitReturnType1(): AsyncIterableIterator<number> {
    yield 1;
}
async function * explicitReturnType2(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
}
async function * explicitReturnType3(): AsyncIterableIterator<number> {
    yield* [1, 2];
}
async function * explicitReturnType4(): AsyncIterableIterator<number> {
    yield* [Promise.resolve(1)];
}
async function * explicitReturnType5(): AsyncIterableIterator<number> {
    yield* (async function * () { yield 1; })();
}
async function * explicitReturnType6(): AsyncIterable<number> {
    yield 1;
}
async function * explicitReturnType7(): AsyncIterable<number> {
    yield Promise.resolve(1);
}
async function * explicitReturnType8(): AsyncIterable<number> {
    yield* [1, 2];
}
async function * explicitReturnType9(): AsyncIterable<number> {
    yield* [Promise.resolve(1)];
}
async function * explicitReturnType10(): AsyncIterable<number> {
    yield* (async function * () { yield 1; })();
}
async function * explicitReturnType11(): AsyncIterator<number> {
    yield 1;
}
async function * explicitReturnType12(): AsyncIterator<number> {
    yield Promise.resolve(1);
}
async function * explicitReturnType13(): AsyncIterator<number> {
    yield* [1, 2];
}
async function * explicitReturnType14(): AsyncIterator<number> {
    yield* [Promise.resolve(1)];
}
async function * explicitReturnType15(): AsyncIterator<number> {
    yield* (async function * () { yield 1; })();
}
async function * explicitReturnType16(): {} {
    yield 1;
}
async function * awaitedType1() {
    const x = await 1;
}
async function * awaitedType2() {
    const x = await Promise.resolve(1);
}
async function * nextType1(): { next(...args: [] | [number | PromiseLike<number>]): any } {
    const x = yield; // `number | PromiseLike<number>` (should not await TNext)
}
