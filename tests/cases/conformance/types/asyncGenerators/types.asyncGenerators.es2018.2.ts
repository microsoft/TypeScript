// @target: es2018
// @lib: esnext
// @noEmit: true
async function * inferReturnType1() {
    yield* {};
}
async function * inferReturnType2() {
    yield* inferReturnType2();
}
async function * inferReturnType3() {
    yield* Promise.resolve([1, 2]);
}
const assignability1: () => AsyncIterableIterator<number> = async function * () {
    yield "a";
};
const assignability2: () => AsyncIterableIterator<number> = async function * () {
    yield* ["a", "b"];
};
const assignability3: () => AsyncIterableIterator<number> = async function * () {
    yield* (async function * () { yield "a"; })();
};
const assignability4: () => AsyncIterable<number> = async function * () {
    yield "a";
};
const assignability5: () => AsyncIterable<number> = async function * () {
    yield* ["a", "b"];
};
const assignability6: () => AsyncIterable<number> = async function * () {
    yield* (async function * () { yield "a"; })();
};
const assignability7: () => AsyncIterator<number> = async function * () {
    yield "a";
};
const assignability8: () => AsyncIterator<number> = async function * () {
    yield* ["a", "b"];
};
const assignability9: () => AsyncIterator<number> = async function * () {
    yield* (async function * () { yield "a"; })();
};
async function * explicitReturnType1(): AsyncIterableIterator<number> {
    yield "a";
}
async function * explicitReturnType2(): AsyncIterableIterator<number> {
    yield* ["a", "b"];
}
async function * explicitReturnType3(): AsyncIterableIterator<number> {
    yield* (async function * () { yield "a"; })();
}
async function * explicitReturnType4(): AsyncIterable<number> {
    yield "a";
}
async function * explicitReturnType5(): AsyncIterable<number> {
    yield* ["a", "b"];
}
async function * explicitReturnType6(): AsyncIterable<number> {
    yield* (async function * () { yield "a"; })();
}
async function * explicitReturnType7(): AsyncIterator<number> {
    yield "a";
}
async function * explicitReturnType8(): AsyncIterator<number> {
    yield* ["a", "b"];
}
async function * explicitReturnType9(): AsyncIterator<number> {
    yield* (async function * () { yield "a"; })();
}
async function * explicitReturnType10(): IterableIterator<number> {
    yield 1;
}
async function * explicitReturnType11(): Iterable<number> {
    yield 1;
}
async function * explicitReturnType12(): Iterator<number> {
    yield 1;
}
async function * yieldStar() {
    yield* {};
}
