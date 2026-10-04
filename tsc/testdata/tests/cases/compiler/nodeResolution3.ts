// @target: es2015
// @module: commonjs
// @moduleResolution: bundler
// @filename: node_modules/b/index.d.ts
export var x: number;

// @filename: a.ts
import y = require("b");