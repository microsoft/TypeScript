//// [tests/cases/compiler/forAwaitForUnion.ts] ////

//// [forAwaitForUnion.ts]
async function f<T>(source: Iterable<T> | AsyncIterable<T>) {
    for await (const x of source) {
    }
}


//// [forAwaitForUnion.js]
"use strict";
async function f(source) {
    for await (const x of source) {
    }
}
