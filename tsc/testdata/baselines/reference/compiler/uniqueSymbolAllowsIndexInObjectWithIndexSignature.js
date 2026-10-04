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
// https://github.com/Microsoft/TypeScript/issues/21962
export const SYM = Symbol('a unique symbol');
let a = { [SYM]: 'sym' }; // Expect ok
let b = { [SYM]: 'str' }; // Expect error
