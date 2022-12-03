// @strict: true
// @filename: foo.ts
export const Infinity = "NaN";
export const NaN = "undefined";
export const undefined = "Infinity";

// @filename: bar.ts
import { Infinity, NaN, undefined } from "./foo";
import * as foo from "./foo";

Infinity;
NaN;
-Infinity;
-NaN;
foo.Infinity;
foo.NaN;
foo[Infinity];
foo[NaN];

undefined;
foo.undefined;
foo[undefined];
