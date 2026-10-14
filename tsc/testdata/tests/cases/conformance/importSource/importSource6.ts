// @module: commonjs
// @target: esnext

// @filename: a.ts
export default 1;

// @filename: b.ts
import source a from "./a.js";
const b = import.source("./a.js");
