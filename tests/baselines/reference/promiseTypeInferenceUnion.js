//// [tests/cases/compiler/promiseTypeInferenceUnion.ts] ////

//// [promiseTypeInferenceUnion.ts]
function f1(x: number): number | Promise<number> {
  return Promise.resolve(x);
}

function f2(x: number): number | PromiseLike<number> {
  return Promise.resolve(x);
}

function f3(x: number): number | Promise<number> | PromiseLike<number> {
  return Promise.resolve(x);
}

const g1: Promise<number> = Promise.resolve(f1(42));
const g2: Promise<number> = Promise.resolve(f2(42));
const g3: Promise<number> = Promise.resolve(f3(42));

//// [promiseTypeInferenceUnion.js]
function f1(x) {
    return Promise.resolve(x);
}
function f2(x) {
    return Promise.resolve(x);
}
function f3(x) {
    return Promise.resolve(x);
}
const g1 = Promise.resolve(f1(42));
const g2 = Promise.resolve(f2(42));
const g3 = Promise.resolve(f3(42));
