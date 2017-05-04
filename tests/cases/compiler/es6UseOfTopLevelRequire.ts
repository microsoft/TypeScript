// @target: ES6

// @filename: b.ts
export default function require(s: string): void {
}

// @filename: c.ts
export const exports = 0;
export default exports;

// @filename: a.ts
import require from "./b"
require("arg");

import exports from "./c"
var x = exports + 2;
