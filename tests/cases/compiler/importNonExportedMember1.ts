// @module: commonjs
// @target: es2015
// @filename: a.ts
declare function foo(): any
declare function bar(): any;
export { foo };

// @filename: b.ts
import { bar } from "./a";
