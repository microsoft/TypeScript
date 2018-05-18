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
exports.__esModule = true;
var _a, _b;
// https://github.com/Microsoft/TypeScript/issues/21962
exports.SYM = Symbol('a unique symbol');
var a = (_a = {}, _a[exports.SYM] = 'sym', _a); // Expect ok
var b = (_b = {}, _b[exports.SYM] = 'str', _b); // Expect error
