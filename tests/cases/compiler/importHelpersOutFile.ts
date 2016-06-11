// @importHelpers: true
// @target: es5
// @module: amd
// @outfile: out.js
// @filename: a.ts
export class A { }
// @filename: b.ts
import { A } from "./a";
export class B extends A { }
// @filename: c.ts
import { A } from "./a";
export class C extends A { }
