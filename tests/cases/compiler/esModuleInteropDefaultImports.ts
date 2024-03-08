// @esModuleInterop: true
// @filename: mod.ts
declare function fun(): void;
export default fun;
// @filename: a.ts
import mod = require("./mod");
export = mod;
// @filename: b.ts
import a from "./a";
import { default as b } from "./a";
import c, { default as d } from "./a";
import * as self from "./b";
export { default } from "./a";
export { default as def } from "./a";

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