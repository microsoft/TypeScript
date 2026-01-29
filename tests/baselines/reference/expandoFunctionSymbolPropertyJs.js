//// [tests/cases/compiler/expandoFunctionSymbolPropertyJs.ts] ////

//// [types.ts]
export const symb = Symbol();

export interface TestSymb {
  (): void;
  readonly [symb]: boolean;
}

//// [a.js]
import { symb } from "./types";

/**
 * @returns {import("./types").TestSymb}
 */
export function test() {
  function inner() {}
  inner[symb] = true;
  return inner;
}

//// [types.js]
export const symb = Symbol();
//// [a.js]
import { symb } from "./types";
/**
 * @returns {import("./types").TestSymb}
 */
export function test() {
    function inner() { }
    inner[symb] = true;
    return inner;
}


//// [types.d.ts]
export declare const symb: unique symbol;
export interface TestSymb {
    (): void;
    readonly [symb]: boolean;
}
//// [a.d.ts]
/**
 * @returns {import("./types").TestSymb}
 */
export function test(): import("./types").TestSymb;
