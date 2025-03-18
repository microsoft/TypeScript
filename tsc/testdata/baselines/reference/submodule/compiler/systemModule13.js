//// [tests/cases/compiler/systemModule13.ts] ////

//// [systemModule13.ts]
export let [x,y,z] = [1, 2, 3];
export const {a: z0, b: {c: z1}} = {a: true, b: {c: "123"}};
for ([x] of [[1]]) {}

//// [systemModule13.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z1 = exports.z0 = exports.z = exports.y = exports.x = void 0;
[exports.x, exports.y, exports.z] = [1, 2, 3];
({ a: exports.z0, b: { c: exports.z1 } } = { a: true, b: { c: "123" } });
for ([exports.x] of [[1]]) { }
