//// [tests/cases/compiler/ctsFileInEsnextHelpers.ts] ////

//// [notmodule.cts]
export async function foo() {
  await 0;
}

//// [notmodule.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
async function foo() {
    await 0;
}
