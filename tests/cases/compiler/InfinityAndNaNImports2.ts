// @strict: true
// @filename: foo.ts
export type Infinity = 42;
export type NaN = "no";
export type undefined = true;

// @filename: bar.ts
import { Infinity, NaN, undefined } from "./foo";
import * as foo from "./foo";

type t1 = Infinity;
type t2 = NaN;
type t3 = -Infinity;
type t4 = -NaN;
type t5 = undefined;
type t6 = foo.Infinity;
type t7 = foo.NaN;
type t8 = foo.undefined;
