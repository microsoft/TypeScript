// @declaration: true
// @module: esnext

// @filename: a.ts
export interface Foo {
  x: number;
}

// @filename: b.ts
import defer * as ns from "./a.js";

export type X = { foo: ns.Foo };
