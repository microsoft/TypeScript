// @strict: true
// @filename: foo.ts
export type Foo = 42;
export type Bar = "no";
export type Baz = true;

export const Foo = 42;
export const Bar = "no";
export const Baz = true;

// @filename: bar.ts
import { Foo as Infinity, Bar as NaN, Baz as undefined } from "./foo";

Infinity;
NaN;
-Infinity;
-NaN;
undefined;
type t1 = Infinity;
type t2 = NaN;
type t3 = -Infinity;
type t4 = -NaN;
type t5 = undefined;
