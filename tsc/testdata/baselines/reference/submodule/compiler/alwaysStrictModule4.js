//// [tests/cases/compiler/alwaysStrictModule4.ts] ////

//// [alwaysStrictModule4.ts]
// Module commonjs
export const a = 1

//// [alwaysStrictModule4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;
