// @module: preserve
// @target: esnext
// @lib: esnext

// @filename: a.ts
export default 1;
export const a = 2;

// @filename: b.ts
import source from "./a.js";
const a: number = source;

// @filename: c.ts
import source, { a } from "./a.js";
const b: number = source + a;

// @filename: d.ts
import source = require("./a");
const a: typeof source = source;

// @filename: e.ts
const source = 1;
const a: number = source;

// @filename: g.ts
import source from from "./f.wasm";
const a: AbstractModuleSource = from;

// @filename: h.ts
import source type from "./f.wasm";
const a: AbstractModuleSource = type;

// @filename: i.ts
import source source from "./f.wasm";
const a: AbstractModuleSource = source;

// @filename: j.ts
import
source
a
from "./f.wasm";
const b: AbstractModuleSource = a;
