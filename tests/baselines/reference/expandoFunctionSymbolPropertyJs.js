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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symb = void 0;
exports.symb = Symbol();
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = test;
var types_1 = require("./types");
/**
 * @returns {import("./types").TestSymb}
 */
function test() {
    function inner() { }
    inner[types_1.symb] = true;
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
