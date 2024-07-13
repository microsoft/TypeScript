//// [tests/cases/compiler/unconstrainedTypeMapped.ts] ////

//// [unconstrainedTypeMapped.ts]
function f<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}


//// [unconstrainedTypeMapped.js]
"use strict";
function f(obj, key) {
    return obj[key];
}
