// @target: ES5
// @sourcemap: true
// @declaration: true
// @module: amd
// @outFile: all.js

// @Filename: ref/a.ts
export class A { }

// @Filename: b.ts
import {A} from "./ref/a";
export class B extends A { }