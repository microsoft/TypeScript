//// [tests/cases/compiler/usingDeclarationsNestedRest.ts] ////

//// [usingDeclarationsNestedRest.ts]
using z = { [Symbol.dispose]() {} };
var [...[a, b]] = [0, 1];
var [...{ length: c }] = [0, 1];
var [...[d = 2, , ...[e]]] = [undefined, 1, 3];


//// [usingDeclarationsNestedRest.js]
"use strict";
var z, a, b, c, d, e;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    z = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
    [...[a, b]] = [0, 1];
    [...{ length: c }] = [0, 1];
    [...[d = 2, , ...[e]]] = [undefined, 1, 3];
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
