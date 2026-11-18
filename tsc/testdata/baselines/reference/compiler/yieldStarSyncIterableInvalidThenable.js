//// [tests/cases/compiler/yieldStarSyncIterableInvalidThenable.ts] ////

//// [yieldStarSyncIterableInvalidThenable.ts]
declare const thenable: { then(onfulfilled: number): void };
declare const iterable: Iterable<number, typeof thenable>;
declare const union: number[] | Iterable<typeof thenable>;
declare const asyncIterable: AsyncIterable<typeof thenable>;

async function* invalid() {
    yield* [thenable];
    yield thenable;
    for await (const value of [thenable]) {}

    yield* iterable;
    yield* iterable;
    yield* union;
    for await (const value of union) {}
    for await (const value of asyncIterable) {}
}

async function* valid() {
    yield* [1];
    yield* [Promise.resolve(1)];
}


//// [yieldStarSyncIterableInvalidThenable.js]
"use strict";
async function* invalid() {
    yield* [thenable];
    yield thenable;
    for await (const value of [thenable]) { }
    yield* iterable;
    yield* iterable;
    yield* union;
    for await (const value of union) { }
    for await (const value of asyncIterable) { }
}
async function* valid() {
    yield* [1];
    yield* [Promise.resolve(1)];
}
