// @module: commonjs
// @target: es2020

// @filename: a.ts
export = 2;

// @filename: b.ts
import defer = require("./a");
