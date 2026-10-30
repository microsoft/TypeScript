//// [tests/cases/compiler/nonexistentPropertyOnThenable.ts] ////

//// [nonexistentPropertyOnThenable.ts]
interface Thenable<T> {
    then(onfulfilled: (value: T) => void): void;
}

declare const thenable: Thenable<{ x: number }>;
thenable.x;

declare const promiseLike: PromiseLike<{ y: string }>;
promiseLike.y;

declare const promise: Promise<{ z: boolean }>;
promise.z;

async function f() {
    thenable.x;
    promiseLike.y;
    promise.z;
}


//// [nonexistentPropertyOnThenable.js]
"use strict";
thenable.x;
promiseLike.y;
promise.z;
async function f() {
    thenable.x;
    promiseLike.y;
    promise.z;
}
