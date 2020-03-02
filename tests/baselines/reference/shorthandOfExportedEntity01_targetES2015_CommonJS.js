//// [shorthandOfExportedEntity01_targetES2015_CommonJS.ts]
export const test = "test";

export function foo () {
  const x = { test };
}


//// [shorthandOfExportedEntity01_targetES2015_CommonJS.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.test = void 0;
exports.test = "test";
function foo() {
    const x = { test: exports.test };
}
exports.foo = foo;


//// [shorthandOfExportedEntity01_targetES2015_CommonJS.d.ts]
export declare const test = "test";
export declare function foo(): void;
