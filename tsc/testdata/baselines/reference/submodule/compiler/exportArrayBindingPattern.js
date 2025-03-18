//// [tests/cases/compiler/exportArrayBindingPattern.ts] ////

//// [exportArrayBindingPattern.ts]
// issue: https://github.com/Microsoft/TypeScript/issues/10778
const [a, , b] = [1, 2, 3];
export { a, b };

//// [exportArrayBindingPattern.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
const [a, , b] = [1, 2, 3];
