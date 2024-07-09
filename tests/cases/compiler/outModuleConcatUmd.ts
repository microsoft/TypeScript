// @target: ES5
// @sourcemap: true
// @declaration: true
// @module: umd
// @outFile: all.js

// This should error

// @Filename: ref/a.ts
export class A { }

// @Filename: b.ts
import {A} from "./ref/a";
export class B extends A { }