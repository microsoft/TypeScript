//// [tests/cases/compiler/declarationEmitPartialReuseComputedProperty.ts] ////

//// [a.ts]
export const n = "A"
export const poz = 1;
export const neg = -1;
export const o = () => null! as { [n]: string, foo: string, [poz]: number, [neg]: number }

//// [b.ts]
import { o } from "./a";
export const g = o

//// [a.js]
export const n = "A";
export const poz = 1;
export const neg = -1;
export const o = () => null;
//// [b.js]
import { o } from "./a";
export const g = o;
