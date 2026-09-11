// @module: esnext
// @target: esnext

// @filename: a.ts
export default 1;
export const a = 2;

// @filename: b.ts
import source * as a from "./a.js";

// @filename: c.ts
import source { a } from "./a.js";

// @filename: d.ts
import source a, { a as b } from "./a.js";

// @filename: e.ts
import source "./a.js";

// @filename: f.ts
import source type a from "./a.js";
