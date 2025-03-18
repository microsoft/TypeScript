//// [tests/cases/compiler/importHelpersNoHelpersForAsyncGenerators.ts] ////

//// [main.ts]
export async function * f() {
    await 1;
    yield 2;
    yield* [3];
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
async function* f() {
    await 1;
    yield 2;
    yield* [3];
}
