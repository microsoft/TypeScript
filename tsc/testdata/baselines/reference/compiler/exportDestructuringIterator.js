//// [tests/cases/compiler/exportDestructuringIterator.ts] ////

//// [exportDestructuringIterator.ts]
declare function foo(): any;
export const [A, V] = foo();
export const { x, y } = foo();
export const [a = 1, b = 2] = foo();
export const [c, ...d] = foo();
export const [, e, , f] = foo();
export const [[g, h], { i, j: k }] = foo();
export const { m: [n, o], p: { q } } = foo();


//// [exportDestructuringIterator.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q = exports.o = exports.n = exports.k = exports.i = exports.h = exports.g = exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = exports.y = exports.x = exports.V = exports.A = void 0;
[exports.A, exports.V] = foo();
({ x: exports.x, y: exports.y } = foo());
[exports.a = 1, exports.b = 2] = foo();
[exports.c, ...exports.d] = foo();
[, exports.e, , exports.f] = foo();
[[exports.g, exports.h], { i: exports.i, j: exports.k }] = foo();
({ m: [exports.n, exports.o], p: { q: exports.q } } = foo());
