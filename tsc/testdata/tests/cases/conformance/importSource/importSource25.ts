// @module: esnext
// @target: esnext

// @filename: a.d.ts
declare module "*.txt";

// @filename: b.ts
import source a from "./a.txt";
export { a as value };

// @filename: c.ts
import source a from "././a.txt";
export { a as value };

// @filename: d.ts
export * from "./b.js";
export * from "./c.js";

// @filename: e.ts
import { value } from "./d.js";
value;

// @filename: f.ts
import source a from "./b.txt";
export { a as value };

// @filename: g.ts
export * from "./b.js";
export * from "./f.js";

// @filename: h.ts
import { value } from "./g.js";
value;
