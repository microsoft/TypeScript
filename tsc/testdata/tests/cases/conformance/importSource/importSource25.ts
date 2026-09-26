// @module: esnext
// @target: esnext

// @filename: a.d.ts
declare module "*.txt";
declare module "*.asset" with { type: "css" } {}
declare module "*.asset" with { type: "text" } {}

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

// @filename: i.ts
import source a from "./file.asset" with { type: "css" };
export { a as value };

// @filename: j.ts
import source a from "./file.asset" with { type: "text" };
export { a as value };

// @filename: k.ts
export * from "./i.js";
export * from "./j.js";
