// @allowJs: true
// @module: esnext
// @moduleResolution: bundler
// @noEmit: true

// @filename: target.cjs
module.exports = undefined;

// @filename: bridge.mjs
import * as ns from "./target.cjs";
export function read() { return ns; }

// @filename: main.ts
import { read } from "./bridge.mjs";
read();
