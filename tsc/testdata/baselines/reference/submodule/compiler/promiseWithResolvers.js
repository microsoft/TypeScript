//// [tests/cases/compiler/promiseWithResolvers.ts] ////

//// [promiseWithResolvers.ts]
type T = {};
const { promise, resolve, reject } = Promise.withResolvers<T>();


//// [promiseWithResolvers.js]
const { promise, resolve, reject } = Promise.withResolvers();
