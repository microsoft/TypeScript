// @module: node16,node18,nodenext
// @filename: mod.cts
declare function fun(): void;
export default fun;
// @filename: b.mts
import a from "./mod.cjs";
import { default as b } from "./mod.cjs";
import c, { default as d } from "./mod.cjs";
import * as self from "./b.mjs";
export { default } from "./mod.cjs";
export { default as def } from "./mod.cjs";

a === b;
b === c;
c === d;
d === self.default;
self.default === self.def;

// should all fail
a();
b();
c();
d();
self.default();
self.def();

// should all work
a.default();
b.default();
c.default();
d.default();
self.default.default();
self.def.default();