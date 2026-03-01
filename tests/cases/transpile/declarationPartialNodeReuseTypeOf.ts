// @strict: true
// @declaration: true
// @emitDeclarationOnly: true
// @target: es2020

// @filename: a.ts
export const nImported = "nImported"
export const nNotImported = "nNotImported"
const nPrivate = "private"
export const o = (p1: typeof nImported, p2: typeof nNotImported, p3: typeof nPrivate) => null! as { foo: typeof nImported, bar: typeof nPrivate, baz: typeof nNotImported }

// @filename: b.ts
import { o, nImported } from "./a";
export const g = o
console.log(nImported);

// @filename: c.ts
import * as a from "./a";
export const g = a.o
