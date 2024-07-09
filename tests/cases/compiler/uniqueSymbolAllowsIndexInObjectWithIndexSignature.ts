// @lib: es6
// https://github.com/Microsoft/TypeScript/issues/21962
export const SYM = Symbol('a unique symbol');

export interface I {
  [SYM]: 'sym';
  [x: string]: 'str';
}

let a: I = {[SYM]: 'sym'}; // Expect ok
let b: I = {[SYM]: 'str'}; // Expect error
