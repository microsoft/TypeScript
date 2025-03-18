//// [tests/cases/compiler/uniqueSymbolAllowsIndexInObjectWithIndexSignature.ts] ////

//// [uniqueSymbolAllowsIndexInObjectWithIndexSignature.ts]
// https://github.com/Microsoft/TypeScript/issues/21962
export const SYM = Symbol('a unique symbol');

export interface I {
  [SYM]: 'sym';
  [x: string]: 'str';
}

let a: I = {[SYM]: 'sym'}; // Expect ok
let b: I = {[SYM]: 'str'}; // Expect error


//// [uniqueSymbolAllowsIndexInObjectWithIndexSignature.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYM = void 0;
exports.SYM = Symbol('a unique symbol');
let a = { [exports.SYM]: 'sym' };
let b = { [exports.SYM]: 'str' };
