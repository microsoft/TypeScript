// @esModuleInterop: true
// @module: commonjs
// @target: esnext
// @noEmit: true

// Each import of a module whose `export =` is a namespace import of a merged
// function and namespace gets its own copy of the module symbol, with the
// same name and declarations. The array and the async function's return type
// are unions of those copies. The unions of types holding the copies made for
// `x1`, `x2` and for `y1`, `y2` list the copies in the same order, whether the
// import declared first is used first (`x1`) or last (`y1`).

// @filename: base.d.ts
declare function f(): void;
declare namespace f { const p: number }
export = f;

// @filename: reexport.d.ts
import * as o from "./base";
export = o;

// @filename: main.ts
type Pair<A, B> = [A, B];
declare const flag: boolean;
declare const p2: Pair<typeof y2, "y2">;
declare const p1: Pair<typeof y1, "y1">;
export const y = flag ? p2 : p1;

import * as a from "./reexport";
import b = require("./reexport");
import * as x1 from "./reexport";
import * as x2 from "./reexport";
import * as y1 from "./reexport";
import * as y2 from "./reexport";
export const all = [a, b];
export async function g() { return [await import("./reexport"), a]; }

declare const q1: Pair<typeof x1, "x1">;
declare const q2: Pair<typeof x2, "x2">;
export const x = flag ? q2 : q1;
