// @module: commonjs
// @moduleResolution: bundler
// @filename: node_modules/a.d.ts
export var x: number;

// @filename: b.ts
import y = require("a");
