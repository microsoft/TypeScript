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
var tslib_1 = require("tslib");
function f() {
    return tslib_1.__asyncGenerator(this, arguments, function* f_1() {
        yield tslib_1.__await(1);
        yield yield tslib_1.__await(2);
        yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues([3])));
    });
}
