// @target: ES5
// @sourcemap: true
// @declaration: true
// @module: commonjs
// @outFile: all.js

// This should be an error

// @Filename: ref/a.ts
export class A { }

// @Filename: b.ts
import {A} from "./ref/a";
export class B extends A { }
