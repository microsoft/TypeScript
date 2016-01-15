// @module: commonjs

// @filename: a.ts
export const x = 1;

// @filename: b.ts
import {x} from "./a"
(function() { return 1; }())