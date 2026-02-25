//// [tests/cases/compiler/ctsFileInEsnextHelpers.ts] ////

//// [notmodule.cts]
export async function foo() {
  await 0;
}

//// [notmodule.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.foo = foo;
function foo() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield 0;
    });
}
