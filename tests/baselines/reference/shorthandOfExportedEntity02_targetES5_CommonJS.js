//// [tests/cases/compiler/shorthandOfExportedEntity02_targetES5_CommonJS.ts] ////

//// [shorthandOfExportedEntity02_targetES5_CommonJS.ts]
export const test = "test";

export function foo () {
  const x = { test };
}


//// [shorthandOfExportedEntity02_targetES5_CommonJS.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
exports.foo = foo;
exports.test = "test";
function foo() {
    var x = { test: exports.test };
}


//// [shorthandOfExportedEntity02_targetES5_CommonJS.d.ts]
export declare const test = "test";
export declare function foo(): void;
