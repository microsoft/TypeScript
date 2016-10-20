// @target: es5
// @module: commonjs
// @declaration: true

// @filename: utils.ts
export function foo() { }
export function bar() { }
export interface Buzz { }

// @filename: index.ts
import {foo} from "./utils";
export = foo;