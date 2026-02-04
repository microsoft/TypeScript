//// [tests/cases/compiler/promiseWithResolvers.ts] ////

//// [promiseWithResolvers.ts]
type T = {};
const { promise, resolve, reject } = Promise.withResolvers<T>();


//// [promiseWithResolvers.js]
"use strict";
const { promise, resolve, reject } = Promise.withResolvers();
