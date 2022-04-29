// @target: es2015
// @module: commonjs
// @skipLibCheck: true
// @lib: es2015,dom
// @filename: main.ts
import { X } from "./other";
const X = 42;
console.log('X is ' + X);
// @filename: other.ts
export type X = {};