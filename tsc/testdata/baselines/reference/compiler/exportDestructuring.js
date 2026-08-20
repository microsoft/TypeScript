//// [tests/cases/compiler/exportDestructuring.ts] ////

//// [exportDestructuring.ts]
const arr = [1, 2];
export const [a, b] = arr;


//// [exportDestructuring.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
const arr = [1, 2];
[exports.a, exports.b] = arr;
