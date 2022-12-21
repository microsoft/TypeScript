// @target: ES5
// @sourcemap: true
// @declaration: true
// @emitDeclarationOnly: true
// @module: commonjs
// @outFile: all.js

// @Filename: ref/a.ts
export class A { }

// @Filename: b.ts
import {A} from "./ref/a";
export class B extends A { }
