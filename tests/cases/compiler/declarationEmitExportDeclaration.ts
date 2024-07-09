// @target: es5
// @module: commonjs
// @declaration: true

// @filename: utils.ts
export function foo() { }
export function bar() { }
export interface Buzz { }

// @filename: index.ts
import {foo, bar, Buzz} from "./utils";

foo();
let obj: Buzz;
export {bar};