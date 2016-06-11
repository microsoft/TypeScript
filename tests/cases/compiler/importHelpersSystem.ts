// @importHelpers: true
// @target: es5
// @module: system
// @filename: a.ts
export class A { }
// @filename: b.ts
import { A } from "./a";
export class B extends A { }
