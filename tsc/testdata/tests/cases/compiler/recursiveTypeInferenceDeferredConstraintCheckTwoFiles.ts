// @strict: true
// @noEmit: true
// @module: esnext
// @moduleResolution: bundler

// A violated deferred constraint is reported in the file of the call, which is checked before the file of the literal here.

// @filename: a.ts
import "./b";
export const lit = { get y() { return 1; } };

// @filename: b.ts
import { lit } from "./a";
declare function wrap<T extends { y: string }>(t: T): { w: T };
export const w = wrap(lit); // error
