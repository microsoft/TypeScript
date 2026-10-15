// @module: commonjs, nodenext
// @target: esnext
// @allowJs: true
// @noEmit: true

// @filename: package.json
{"type":"commonjs"}

// @filename: a.js
export default 1;

// @filename: b.js
import source a from "./a.js";
const b = import.source("./a.js");
