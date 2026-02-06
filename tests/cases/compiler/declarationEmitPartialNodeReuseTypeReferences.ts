// @strict: true
// @declaration: true
// @target: es2020

// @filename: a.ts
export type SpecialString = string;
type PrivateSpecialString = string;

export namespace N {
    export type SpecialString = string;
}
export const o = (p1: SpecialString, p2: PrivateSpecialString, p3: N.SpecialString) => null! as { foo: SpecialString, bar: PrivateSpecialString, baz: N.SpecialString };

// @filename: b.ts
import * as a from "./a";
export const g = a.o

// @filename: c.ts
import { o, SpecialString } from "./a";
export const g = o