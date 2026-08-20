//// [tests/cases/compiler/forAwaitInAsyncAccessor.ts] ////

//// [a.ts]
class C {
    async get x() {
        for await (const y of []) {
        }
    }
}


//// [a.js]
"use strict";
class C {
    async get x() {
        for await (const y of []) {
        }
    }
}
