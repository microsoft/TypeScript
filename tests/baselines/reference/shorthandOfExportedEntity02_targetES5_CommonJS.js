//// [shorthandOfExportedEntity02_targetES5_CommonJS.ts]

export const test = "test";

export function foo () {
  const x = { test };
}


//// [shorthandOfExportedEntity02_targetES5_CommonJS.js]
"use strict";
exports.test = "test";
function foo() {
    var x = { test: exports.test };
}
exports.foo = foo;
Object.defineProperty(exports, "__esModule", { value: true });


//// [shorthandOfExportedEntity02_targetES5_CommonJS.d.ts]
export declare const test = "test";
export declare function foo(): void;
