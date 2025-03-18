//// [tests/cases/compiler/declarationEmitDuplicateParameterDestructuring.ts] ////

//// [declarationEmitDuplicateParameterDestructuring.ts]
export const fn1 = ({ prop: a, prop: b }: { prop: number }) => a + b;

export const fn2 = ({ prop: a }: { prop: number }, { prop: b }: { prop: number }) => a + b;


//// [declarationEmitDuplicateParameterDestructuring.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn2 = exports.fn1 = void 0;
const fn1 = ({ prop: a, prop: b }) => a + b;
exports.fn1 = fn1;
const fn2 = ({ prop: a }, { prop: b }) => a + b;
exports.fn2 = fn2;
